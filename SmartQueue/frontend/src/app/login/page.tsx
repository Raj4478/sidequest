'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = isLogin
        ? await authApi.login({ email: form.email, password: form.password })
        : await authApi.register(form);
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1rem' }}>
      {/* Background grid */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #4f8ef7, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }} className="text-gradient">SmartQueue</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Job Processing Infrastructure</p>
        </div>

        {/* Card */}
        <div className="glass" style={{ borderRadius: 16, padding: '2rem' }}>
          {/* Toggle */}
          <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: 10, padding: 4, marginBottom: '1.5rem' }}>
            {['Login', 'Register'].map((tab) => (
              <button key={tab} onClick={() => { setIsLogin(tab === 'Login'); setError(''); }}
                style={{ flex: 1, padding: '0.5rem', borderRadius: 7, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.2s',
                  background: (tab === 'Login') === isLogin ? 'var(--accent)' : 'transparent',
                  color: (tab === 'Login') === isLogin ? '#fff' : 'var(--text-muted)' }}>
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rajeshwar Singh" required={!isLogin}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
              </div>
            )}
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required
                style={{ width: '100%', padding: '0.65rem 0.9rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required
                style={{ width: '100%', padding: '0.65rem 0.9rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
            </div>

            {error && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: 6, border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}

            <button type="submit" disabled={loading}
              style={{ padding: '0.75rem', background: loading ? 'var(--border)' : 'linear-gradient(135deg, #4f8ef7, #7c6af7)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', marginTop: '0.5rem' }}>
              {loading ? 'Please wait...' : isLogin ? '→ Login' : '→ Create Account'}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Built with NestJS · Bull · PostgreSQL · Next.js
        </p>
      </div>
    </div>
  );
}
