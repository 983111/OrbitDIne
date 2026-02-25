type RedisClientLike = {
  connect: () => Promise<void>;
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, opts?: { EX?: number }) => Promise<any>;
  del: (key: string) => Promise<number>;
};

const dynamicImport = (moduleName: string) => new Function("m", "return import(m)")(moduleName) as Promise<any>;

class CartCache {
  private client: RedisClientLike | null = null;

  async init() {
    try {
      const { createClient } = await dynamicImport("redis");
      const redisUrl = process.env.REDIS_URL;

      if (!redisUrl) {
        throw new Error("Missing REDIS_URL environment variable.");
      }

      this.client = createClient({ url: redisUrl });
      this.client.connect();
    } catch (error) {
      throw new Error(`Redis client is required but unavailable. Install 'redis' and set REDIS_URL. Root cause: ${String(error)}`);
    }
  }

  private key(sessionId: string, tableId: string) {
    return `cart:${sessionId}:${tableId}`;
  }

  async getCart(sessionId: string, tableId: string) {
    if (!this.client) throw new Error("Redis has not been initialized.");
    const raw = await this.client.get(this.key(sessionId, tableId));
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async setCart(sessionId: string, tableId: string, items: any[]) {
    if (!this.client) throw new Error("Redis has not been initialized.");
    await this.client.set(this.key(sessionId, tableId), JSON.stringify(items), { EX: 60 * 60 * 24 });
  }

  async clearCart(sessionId: string, tableId: string) {
    if (!this.client) throw new Error("Redis has not been initialized.");
    await this.client.del(this.key(sessionId, tableId));
  }
}

const cartCache = new CartCache();

export default cartCache;
