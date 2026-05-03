'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import api from '@/lib/api';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '⚡' },
  { href: '/dashboard/resolution', label: 'Resolution', icon: '🎯' },
  { href: '/dashboard/reflections', label: 'Reflections', icon: '📝' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { router.push('/login'); return; }
    api.get('/users/me').then(res => {
      setUser(res.data.data);
      setLoading(false);
    }).catch(() => {
      logout();
      router.push('/login');
    });
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar — desktop */}
      <aside style={{
        width: 240, flexShrink: 0, borderRight: '1px solid var(--border-subtle)',
        padding: '28px 16px', display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        background: 'var(--bg-card)'
      }} className="hide-mobile">
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 20, color: 'var(--accent)', marginBottom: 40, paddingLeft: 12
        }}>SideQuest</div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
                background: active ? 'var(--accent-dim)' : 'transparent',
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: active ? 600 : 400, fontSize: 14,
                transition: 'all 0.15s', border: active ? '1px solid var(--accent-glow)' : '1px solid transparent'
              }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {user && (
          <div style={{
            borderTop: '1px solid var(--border-subtle)', paddingTop: 16, marginTop: 16,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--accent)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#fff',
              fontFamily: 'var(--font-display)'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user.email}</div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', paddingBottom: 80 }}>
        {children}
      </main>

      {/* Bottom nav — mobile */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--bg-card)', borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-around', padding: '10px 0 16px',
        zIndex: 50
      }} className="show-mobile">
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, textDecoration: 'none', padding: '4px 16px',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hide-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}
