'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Milestone {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'completed' | 'skipped' | 'overdue';
  order_index: number;
  completed_at?: string;
}

interface Resolution {
  id: string;
  title: string;
  description?: string;
  category: string;
  start_date: string;
  end_date: string;
  progress_percent: number;
  status: string;
  milestones: Milestone[];
}

const categoryColors: Record<string, string> = {
  health: '#4ade80', career: '#60a5fa', education: '#a78bfa',
  finance: '#fbbf24', personal: '#f472b6', other: '#94a3b8'
};

const statusColors: Record<string, string> = {
  pending: 'var(--text-muted)',
  completed: '#4ade80',
  skipped: '#94a3b8',
  overdue: '#f87171',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  completed: 'Done ✓',
  skipped: 'Skipped',
  overdue: 'Overdue',
};

function AddMilestoneModal({ resolutionId, onAdded, onClose }: {
  resolutionId: string;
  onAdded: () => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !dueDate) { toast.error('Title and due date are required'); return; }
    setLoading(true);
    try {
      await api.post(`/resolutions/${resolutionId}/milestones`, {
        title, due_date: dueDate, description, order_index: 0,
      });
      toast.success('Milestone added!');
      onAdded();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add milestone');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none',
    fontFamily: 'var(--font-body)'
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: 24
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 32, width: '100%', maxWidth: 440
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
          Add milestone
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>MILESTONE TITLE *</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Complete first 5K run" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>DUE DATE *</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>NOTES (optional)</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              rows={3} placeholder="What does achieving this look like?"
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px', borderRadius: 10, border: '1px solid var(--border)',
            background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 2, padding: '11px', borderRadius: 10, background: 'var(--accent)',
            color: '#fff', fontWeight: 700, fontSize: 14, border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)'
          }}>
            {loading ? 'Adding...' : 'Add milestone'}
          </button>
        </div>
      </div>
    </div>
  );
}

function JourneyMap({ milestones }: { milestones: Milestone[] }) {
  const sorted = [...milestones].sort((a, b) => a.order_index - b.order_index || a.due_date.localeCompare(b.due_date));

  return (
    <div style={{ padding: '8px 0' }}>
      {sorted.map((m, i) => {
        const isLast = i === sorted.length - 1;
        const color = m.status === 'completed' ? '#4ade80'
          : m.status === 'overdue' ? '#f87171'
          : m.status === 'skipped' ? '#94a3b8'
          : 'var(--accent)';

        return (
          <div key={m.id} style={{ display: 'flex', gap: 16 }}>
            {/* Timeline column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                background: m.status === 'completed' ? color : 'var(--bg-card)',
                border: `2px solid ${color}`,
                boxShadow: m.status === 'pending' ? `0 0 8px ${color}60` : 'none',
                zIndex: 1
              }} />
              {!isLast && (
                <div style={{
                  width: 2, flex: 1, minHeight: 32,
                  background: m.status === 'completed' ? '#4ade8060' : 'var(--border)',
                  margin: '4px 0'
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: isLast ? 0 : 24, flex: 1 }}>
              <Link href={`/dashboard/milestones/${m.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '14px 16px', borderRadius: 12,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  transition: 'border-color 0.15s', cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div style={{
                        fontWeight: 600, fontSize: 15, color: 'var(--text-primary)',
                        textDecoration: m.status === 'completed' ? 'line-through' : 'none',
                        marginBottom: 4
                      }}>{m.title}</div>
                      {m.description && (
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {m.description}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 11, fontWeight: 700, color, marginBottom: 4,
                        textTransform: 'uppercase', letterSpacing: '0.06em'
                      }}>{statusLabels[m.status]}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {new Date(m.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ResolutionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState<'list' | 'journey'>('journey');
  const [completing, setCompleting] = useState<string | null>(null);

  const fetchResolution = async () => {
    try {
      const res = await api.get(`/resolutions/${id}`);
      setResolution(res.data.data);
    } catch {
      toast.error('Failed to load resolution');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResolution(); }, [id]);

  const handleComplete = async (milestoneId: string) => {
    setCompleting(milestoneId);
    try {
      await api.patch(`/milestones/${milestoneId}/complete`);
      toast.success('Milestone completed! 🎉');
      fetchResolution();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to complete milestone');
    } finally {
      setCompleting(null);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ color: 'var(--text-muted)' }}>Loading your quest...</div>
    </div>
  );

  if (!resolution) return null;

  const catColor = categoryColors[resolution.category] || 'var(--accent)';
  const sorted = [...(resolution.milestones || [])].sort((a, b) =>
    a.order_index - b.order_index || a.due_date.localeCompare(b.due_date)
  );

  const circ = 2 * Math.PI * 52;
  const offset = circ - (resolution.progress_percent / 100) * circ;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      {/* Back */}
      <Link href="/dashboard" style={{
        color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none',
        display: 'inline-block', marginBottom: 28
      }}>← Dashboard</Link>

      {/* Header card */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: 28, marginBottom: 28
      }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Progress ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={60} cy={60} r={52} fill="none" stroke="var(--border)" strokeWidth={8} />
              <circle cx={60} cy={60} r={52} fill="none" stroke={catColor}
                strokeWidth={8} strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: catColor }}>
                {resolution.progress_percent}%
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>done</span>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: 20, marginBottom: 10,
              background: `${catColor}20`, color: catColor, fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.06em'
            }}>{resolution.category}</div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 26px)',
              fontWeight: 800, lineHeight: 1.3, marginBottom: 8
            }}>{resolution.title}</h1>

            {resolution.description && (
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                {resolution.description}
              </p>
            )}

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { label: 'Started', value: new Date(resolution.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) },
                { label: 'Ends', value: new Date(resolution.end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                { label: 'Milestones', value: `${sorted.filter(m => m.status === 'completed').length}/${sorted.length} done` },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => setShowAddModal(true)} style={{
          padding: '10px 20px', borderRadius: 10, background: 'var(--accent)',
          color: '#fff', fontWeight: 700, fontSize: 13, border: 'none',
          cursor: 'pointer', fontFamily: 'var(--font-display)',
          boxShadow: '0 0 20px var(--accent-glow)'
        }}>+ Add milestone</button>

        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', borderRadius: 10, padding: 4, border: '1px solid var(--border)' }}>
          {(['journey', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: view === v ? 'var(--accent)' : 'none',
              color: view === v ? '#fff' : 'var(--text-muted)',
              fontSize: 13, fontWeight: view === v ? 600 : 400,
              transition: 'all 0.15s', textTransform: 'capitalize'
            }}>{v === 'journey' ? '🗺️ Journey' : '☰ List'}</button>
          ))}
        </div>
      </div>

      {/* Milestones */}
      {sorted.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 24px',
          background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            No milestones yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
            Break your resolution into checkpoints. Where do you want to be in 30 days? 60?
          </p>
          <button onClick={() => setShowAddModal(true)} style={{
            padding: '12px 28px', borderRadius: 10, background: 'var(--accent)',
            color: '#fff', fontWeight: 700, fontSize: 14, border: 'none',
            cursor: 'pointer', fontFamily: 'var(--font-display)'
          }}>Add first milestone</button>
        </div>
      ) : view === 'journey' ? (
        <JourneyMap milestones={sorted} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.map(m => (
            <div key={m.id} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '16px 20px',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', gap: 16, flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 600, fontSize: 15,
                  textDecoration: m.status === 'completed' ? 'line-through' : 'none',
                  color: m.status === 'completed' ? 'var(--text-muted)' : 'var(--text-primary)',
                  marginBottom: 4
                }}>{m.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Due {new Date(m.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  color: statusColors[m.status], background: `${statusColors[m.status]}18`,
                  textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>{statusLabels[m.status]}</span>
                {m.status === 'pending' && (
                  <button onClick={() => handleComplete(m.id)} disabled={completing === m.id} style={{
                    padding: '6px 14px', borderRadius: 8, background: 'var(--accent-dim)',
                    color: 'var(--accent)', border: '1px solid var(--accent-glow)',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer'
                  }}>
                    {completing === m.id ? '...' : 'Complete'}
                  </button>
                )}
                <Link href={`/dashboard/milestones/${m.id}`} style={{
                  padding: '6px 14px', borderRadius: 8, background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)', border: '1px solid var(--border)',
                  fontSize: 12, fontWeight: 500, textDecoration: 'none'
                }}>Reflect</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddMilestoneModal
          resolutionId={id}
          onAdded={fetchResolution}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
