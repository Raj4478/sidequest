'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const features = [
  { icon: '🎯', title: 'One Resolution', desc: 'Focus on what actually matters. One goal, pursued with intention.' },
  { icon: '🗺️', title: 'Milestone Map', desc: 'Break your year into checkpoints. See your journey as a visual roadmap.' },
  { icon: '📝', title: 'Reflections', desc: 'Track wins, blockers, and next steps. Build a record of your growth.' },
  { icon: '🔔', title: 'Smart Reminders', desc: 'Weekly check-ins that keep you honest without overwhelming you.' },
];

const steps = [
  { num: '01', title: 'Set your quest', desc: 'Define your one big resolution for the year with a clear end goal.' },
  { num: '02', title: 'Map milestones', desc: 'Break it into monthly or weekly checkpoints you can actually hit.' },
  { num: '03', title: 'Check in weekly', desc: 'Reflect on progress, log wins and blockers, stay on track.' },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '20px 40px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(12px)'
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--accent)' }}>
          SideQuest
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/login" style={{
            padding: '8px 20px', borderRadius: 8, color: 'var(--text-secondary)',
            textDecoration: 'none', fontSize: 14, fontWeight: 500
          }}>Log in</Link>
          <Link href="/register" style={{
            padding: '8px 20px', borderRadius: 8, background: 'var(--accent)',
            color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600
          }}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '120px 24px 80px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 600, height: 600, background: 'radial-gradient(circle, #7c6af730 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 100, border: '1px solid var(--border)',
          background: 'var(--bg-card)', marginBottom: 32,
          fontSize: 13, color: 'var(--text-secondary)',
          opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
          One goal. Relentless focus. Real progress.
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 88px)',
          fontWeight: 800, lineHeight: 1.05, marginBottom: 24,
          opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s'
        }}>
          Your year.<br />
          <span className="gradient-text">One quest.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)',
          maxWidth: 520, lineHeight: 1.7, marginBottom: 48,
          opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.2s'
        }}>
          Stop drowning in habit trackers. SideQuest helps you commit to one meaningful resolution,
          map it into milestones, and actually see it through.
        </p>

        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.3s'
        }}>
          <Link href="/register" style={{
            padding: '14px 32px', borderRadius: 10, background: 'var(--accent)',
            color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 700,
            fontFamily: 'var(--font-display)', letterSpacing: '-0.02em',
            boxShadow: '0 0 32px var(--accent-glow)'
          }}>
            Start your quest →
          </Link>
          <Link href="/login" style={{
            padding: '14px 32px', borderRadius: 10,
            border: '1px solid var(--border)', color: 'var(--text-primary)',
            textDecoration: 'none', fontSize: 16, fontWeight: 500
          }}>
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 800, textAlign: 'center', marginBottom: 16
        }}>Built different.</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 60, fontSize: 17 }}>
          Not another habit app. A focused system for your one big goal.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 16, background: 'var(--bg-card)',
              border: '1px solid var(--border)', transition: 'border-color 0.2s'
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 8, fontSize: 18 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 14 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 800, textAlign: 'center', marginBottom: 60
        }}>How it works</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800,
                color: 'var(--accent)', opacity: 0.4, lineHeight: 1, minWidth: 64
              }}>{s.num}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 16 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px', textAlign: 'center',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 800, marginBottom: 24
        }}>Ready to commit?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 40, fontSize: 17 }}>
          One resolution. One year. Start today.
        </p>
        <Link href="/register" style={{
          padding: '16px 40px', borderRadius: 10, background: 'var(--accent)',
          color: '#fff', textDecoration: 'none', fontSize: 18, fontWeight: 700,
          fontFamily: 'var(--font-display)', boxShadow: '0 0 40px var(--accent-glow)'
        }}>
          Begin your quest →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 40px', borderTop: '1px solid var(--border-subtle)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)' }}>SideQuest</span>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>© 2026 SideQuest. All rights reserved.</span>
      </footer>
    </div>
  );
}
