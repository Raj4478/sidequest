'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Reflection {
  id: string;
  wins?: string;
  blockers?: string;
  next_steps?: string;
  mood?: string;
  created_at: string;
  milestone?: { id: string; title: string };
}

const moodColors: Record<string, string> = {
  great: '#4ade80', good: '#60a5fa', okay: '#fbbf24', struggling: '#f87171'
};
const moodEmojis: Record<string, string> = {
  great: '🚀', good: '😊', okay: '😐', struggling: '😤'
};

function groupByMonth(reflections: Reflection[]) {
  const groups: Record<string, Reflection[]> = {};
  reflections.forEach(r => {
    const key = new Date(r.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });
  return groups;
}

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reflections').then(res => {
      setReflections(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const grouped = groupByMonth(reflections);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ color: 'var(--text-muted)' }}>Loading reflections...</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Reflections
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Your journey, in your own words. {reflections.length} total entries.
        </p>
      </div>

      {reflections.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>📝</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            No reflections yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 360, margin: '0 auto' }}>
            Start reflecting on your milestones to build a record of your growth throughout the year.
          </p>
        </div>
      ) : (
        Object.entries(grouped).map(([month, entries]) => (
          <div key={month} style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              {month}
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>{entries.length} entries</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {entries.map(r => (
                <div key={r.id} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: 22,
                  transition: 'border-color 0.15s'
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      {r.milestone && (
                        <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 2 }}>
                          🎯 {r.milestone.title}
                        </div>
                      )}
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {new Date(r.created_at).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </div>
                    </div>
                    {r.mood && (
                      <div style={{
                        padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                        color: moodColors[r.mood] || 'var(--text-secondary)',
                        background: `${moodColors[r.mood] || '#888'}18`,
                        border: `1px solid ${moodColors[r.mood] || '#888'}30`
                      }}>
                        {moodEmojis[r.mood]} {r.mood}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {r.wins && (
                      <div style={{ borderLeft: '3px solid #4ade80', paddingLeft: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#4ade80', marginBottom: 3, letterSpacing: '0.1em' }}>WIN</div>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.wins}</p>
                      </div>
                    )}
                    {r.blockers && (
                      <div style={{ borderLeft: '3px solid #fbbf24', paddingLeft: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#fbbf24', marginBottom: 3, letterSpacing: '0.1em' }}>BLOCKER</div>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.blockers}</p>
                      </div>
                    )}
                    {r.next_steps && (
                      <div style={{ borderLeft: '3px solid #60a5fa', paddingLeft: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa', marginBottom: 3, letterSpacing: '0.1em' }}>NEXT</div>
                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.next_steps}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
