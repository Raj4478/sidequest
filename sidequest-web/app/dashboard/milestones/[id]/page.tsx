'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Reflection {
  id: string;
  wins?: string;
  blockers?: string;
  next_steps?: string;
  mood?: 'great' | 'good' | 'okay' | 'struggling';
  created_at: string;
}

interface Milestone {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  status: string;
  resolution_id: string;
  resolution?: { id: string; title: string };
}

const moods = [
  { value: 'great', label: 'Great', emoji: '🚀' },
  { value: 'good', label: 'Good', emoji: '😊' },
  { value: 'okay', label: 'Okay', emoji: '😐' },
  { value: 'struggling', label: 'Struggling', emoji: '😤' },
];

const moodColors: Record<string, string> = {
  great: '#4ade80', good: '#60a5fa', okay: '#fbbf24', struggling: '#f87171'
};

export default function MilestoneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [milestone, setMilestone] = useState<Milestone | null>(null);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completing, setCompleting] = useState(false);

  // Form state
  const [wins, setWins] = useState('');
  const [blockers, setBlockers] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [mood, setMood] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        // Fetch reflections for this milestone
        const reflRes = await api.get(`/milestones/${id}/reflections`);
        setReflections(reflRes.data.data);

        // Get milestone details via all user reflections (includes milestone relation)
        const allRes = await api.get('/reflections');
        const allReflections = allRes.data.data as any[];
        const match = allReflections.find((r: any) => r.milestone_id === id);
        if (match?.milestone) {
          setMilestone(match.milestone);
        } else {
          // Fallback: get all resolutions and find the milestone
          const resolutionsRes = await api.get('/resolutions');
          for (const resolution of resolutionsRes.data.data) {
            const detailRes = await api.get(`/resolutions/${resolution.id}`);
            const found = detailRes.data.data.milestones?.find((m: any) => m.id === id);
            if (found) {
              setMilestone({ ...found, resolution: { id: resolution.id, title: resolution.title } });
              break;
            }
          }
        }
      } catch {
        toast.error('Failed to load milestone');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmitReflection = async () => {
    if (!wins && !blockers && !nextSteps) {
      toast.error('Add at least one field — wins, blockers, or next steps');
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/milestones/${id}/reflections`, {
        wins: wins || undefined,
        blockers: blockers || undefined,
        next_steps: nextSteps || undefined,
        mood: mood || undefined,
      });
      toast.success('Reflection saved! 📝');
      setWins(''); setBlockers(''); setNextSteps(''); setMood('');
      const reflRes = await api.get(`/milestones/${id}/reflections`);
      setReflections(reflRes.data.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save reflection');
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await api.patch(`/milestones/${id}/complete`);
      toast.success('Milestone completed! 🎉');
      router.back();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to complete');
    } finally {
      setCompleting(false);
    }
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none',
    fontFamily: 'var(--font-body)', resize: 'vertical', lineHeight: 1.6
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ color: 'var(--text-muted)' }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
      <button onClick={() => router.back()} style={{
        background: 'none', border: 'none', color: 'var(--text-muted)',
        cursor: 'pointer', fontSize: 13, marginBottom: 28, padding: 0
      }}>← Back</button>

      {/* Milestone header */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 24, marginBottom: 28
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Milestone
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>
              {milestone?.title || `Milestone`}
            </h1>
            {milestone?.description && (
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
                {milestone.description}
              </p>
            )}
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Due {milestone?.due_date
                ? new Date(milestone.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                : '—'}
            </div>
          </div>

          {milestone?.status === 'pending' && (
            <button onClick={handleComplete} disabled={completing} style={{
              padding: '10px 20px', borderRadius: 10, background: '#4ade8020',
              color: '#4ade80', border: '1px solid #4ade8040',
              fontWeight: 700, fontSize: 13, cursor: completing ? 'not-allowed' : 'pointer',
              flexShrink: 0, fontFamily: 'var(--font-display)'
            }}>
              {completing ? '...' : '✓ Mark done'}
            </button>
          )}
          {milestone?.status === 'completed' && (
            <div style={{
              padding: '8px 16px', borderRadius: 10, background: '#4ade8015',
              color: '#4ade80', border: '1px solid #4ade8030', fontSize: 13, fontWeight: 700
            }}>✓ Completed</div>
          )}
        </div>
      </div>

      {/* Add reflection form */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 28, marginBottom: 28
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
          Add reflection
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>
          How's this milestone going? Be honest — this is just for you.
        </p>

        {/* Mood selector */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            How are you feeling?
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {moods.map(m => (
              <button key={m.value} type="button" onClick={() => setMood(mood === m.value ? '' : m.value)} style={{
                padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
                background: mood === m.value ? `${moodColors[m.value]}20` : 'var(--bg-elevated)',
                border: `1px solid ${mood === m.value ? moodColors[m.value] : 'var(--border)'}`,
                color: mood === m.value ? moodColors[m.value] : 'var(--text-secondary)',
                fontSize: 13, fontWeight: mood === m.value ? 600 : 400,
                transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span>{m.emoji}</span> {m.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: '✓ WINS', placeholder: "What went well? What are you proud of?", value: wins, onChange: setWins, color: '#4ade80' },
            { label: '⚠ BLOCKERS', placeholder: "What's getting in the way?", value: blockers, onChange: setBlockers, color: '#fbbf24' },
            { label: '→ NEXT STEPS', placeholder: "What will you do differently or next?", value: nextSteps, onChange: setNextSteps, color: '#60a5fa' },
          ].map(({ label, placeholder, value, onChange, color }) => (
            <div key={label}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color, marginBottom: 6, letterSpacing: '0.08em' }}>
                {label}
              </label>
              <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                rows={3}
                style={textareaStyle}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmitReflection}
          disabled={submitting}
          style={{
            width: '100%', padding: '13px', borderRadius: 10, marginTop: 20,
            background: submitting ? 'var(--border)' : 'var(--accent)',
            color: '#fff', fontWeight: 700, fontSize: 15, border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-display)',
            boxShadow: submitting ? 'none' : '0 0 20px var(--accent-glow)',
            transition: 'all 0.2s'
          }}
        >
          {submitting ? 'Saving...' : 'Save reflection →'}
        </button>
      </div>

      {/* Past reflections */}
      {reflections.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            Past reflections ({reflections.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {reflections.map(r => (
              <div key={r.id} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 20
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  {r.mood && (
                    <div style={{
                      fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                      color: moodColors[r.mood], background: `${moodColors[r.mood]}18`
                    }}>
                      {moods.find(m => m.value === r.mood)?.emoji} {r.mood}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {r.wins && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', marginBottom: 4, letterSpacing: '0.08em' }}>✓ WINS</div>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.wins}</p>
                    </div>
                  )}
                  {r.blockers && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', marginBottom: 4, letterSpacing: '0.08em' }}>⚠ BLOCKERS</div>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.blockers}</p>
                    </div>
                  )}
                  {r.next_steps && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', marginBottom: 4, letterSpacing: '0.08em' }}>→ NEXT STEPS</div>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.next_steps}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reflections.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '40px 24px',
          background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📝</div>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No reflections yet. Add your first one above.</p>
        </div>
      )}
    </div>
  );
}
