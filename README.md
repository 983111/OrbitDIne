# OrbitDine

OrbitDine is a QR-based restaurant management platform with real-time ordering, kitchen workflows, and owner analytics.

## Run locally

**Prerequisites:** Node.js, PostgreSQL, Redis

1. Install dependencies:
   `npm install`
2. Copy environment values:
   `cp .env.example .env.local`
3. Configure `DATABASE_URL`, `REDIS_URL`, and `JWT_SECRET`.
4. Start the app:
   `npm run dev`

## Authentication

Use the seeded staff credentials (or override in `.env.local`):

- Manager: `manager / manager123`
- Owner: `owner / owner123`

Login at `/login` to access `/manager/*` and `/owner` dashboards.
