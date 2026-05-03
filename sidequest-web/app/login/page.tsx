'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      const { user, access_token, refresh_token } = res.data.data;
      login(user, access_token, refresh_token);
      toast.success(`Welcome back, ${user.name}!`);
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24,
      background: 'radial-gradient(ellipse at 50% 0%, #7c6af715 0%, var(--bg) 60%)'
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 26, color: 'var(--accent)', textDecoration: 'none'
          }}>SideQuest</Link>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
            marginTop: 24, marginBottom: 8
          }}>Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Continue your quest</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--text-secondary)' }}>Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                background: 'var(--bg-card)', border: `1px solid ${errors.email ? 'var(--danger)' : 'var(--border)'}`,
                color: 'var(--text-primary)', fontSize: 15, outline: 'none',
              }}
            />
            {errors.email && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 4 }}>{errors.email.message}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--text-secondary)' }}>Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                background: 'var(--bg-card)', border: `1px solid ${errors.password ? 'var(--danger)' : 'var(--border)'}`,
                color: 'var(--text-primary)', fontSize: 15, outline: 'none',
              }}
            />
            {errors.password && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 4 }}>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', borderRadius: 10,
              background: loading ? 'var(--border)' : 'var(--accent)',
              color: '#fff', fontWeight: 700, fontSize: 15,
              fontFamily: 'var(--font-display)', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8,
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 28, color: 'var(--text-secondary)', fontSize: 14 }}>
          No account?{' '}
          <Link href="/register" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            Start your quest
          </Link>
        </p>
      </div>
    </div>
  );
}
