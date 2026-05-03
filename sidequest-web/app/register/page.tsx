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
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', data);
      const { user, access_token, refresh_token } = res.data.data;
      login(user, access_token, refresh_token);
      toast.success(`Welcome to SideQuest, ${user.name}! 🎯`);
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%', padding: '12px 14px', borderRadius: 10,
    background: 'var(--bg-card)', border: `1px solid ${hasError ? 'var(--danger)' : 'var(--border)'}`,
    color: 'var(--text-primary)', fontSize: 15, outline: 'none',
  });

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
          }}>Begin your quest</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>One goal. One year. Let's go.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { key: 'name', label: 'Full name', type: 'text', placeholder: 'Rajeshwar Singh', error: errors.name },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', error: errors.email },
            { key: 'password', label: 'Password', type: 'password', placeholder: '8+ characters', error: errors.password },
          ].map(({ key, label, type, placeholder, error }) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--text-secondary)' }}>
                {label}
              </label>
              <input
                {...register(key as any)}
                type={type}
                placeholder={placeholder}
                style={inputStyle(!!error)}
              />
              {error && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 4 }}>{error.message}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', borderRadius: 10,
              background: loading ? 'var(--border)' : 'var(--accent)',
              color: '#fff', fontWeight: 700, fontSize: 15,
              fontFamily: 'var(--font-display)', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8,
              boxShadow: loading ? 'none' : '0 0 24px var(--accent-glow)',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Creating account...' : 'Start my quest →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 28, color: 'var(--text-secondary)', fontSize: 14 }}>
          Already on a quest?{' '}
          <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
