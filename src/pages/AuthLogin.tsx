import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAuthSession } from '@/lib/sessionAuth';

export default function AuthLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? 'Login failed');
      }

      saveAuthSession(data.token, data.user);
      navigate((location.state as any)?.from ?? '/manager/dashboard', { replace: true });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h1 className="text-xl font-bold text-gray-900">Staff Login</h1>
        <p className="text-sm text-gray-500">Managers and owners must login to access dashboards.</p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium disabled:opacity-50">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
