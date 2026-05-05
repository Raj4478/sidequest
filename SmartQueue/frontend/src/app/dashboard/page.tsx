'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jobsApi, queueApi, authApi } from '@/lib/api';

const STATUS_COLORS: Record<string, string> = {
  pending: '#8b5cf6',
  processing: '#4f8ef7',
  completed: '#22c55e',
  failed: '#ef4444',
  retrying: '#f59e0b',
};

const JOB_TYPES = [
  'data_processing',
  'document_parsing',
  'email_notification',
  'report_generation',
  'image_processing',
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [queueStats, setQueueStats] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ name: '', type: 'data_processing', priority: 5 });

  const fetchData = useCallback(async () => {
    try {
      const [jobsRes, statsRes, queueRes] = await Promise.all([
        jobsApi.list({ status: filter || undefined, limit: 20 }),
        jobsApi.stats(),
        queueApi.stats(),
      ]);
      setJobs(jobsRes.data.data);
      setStats(statsRes.data);
      setQueueStats(queueRes.data);
    } catch (err) {}
  }, [filter]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.replace('/login'); return; }
    authApi.profile().then(r => setUser(r.data)).catch(() => router.replace('/login'));
    fetchData().finally(() => setLoading(false));
  }, [fetchData, router]);

  // Auto-refresh every 4 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const submitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await jobsApi.create(form);
      setShowForm(false);
      setForm({ name: '', type: 'data_processing', priority: 5 });
      await fetchData();
    } catch (err) {} finally { setSubmitting(false); }
  };

  const retryJob = async (id: string) => {
    await jobsApi.retry(id);
    fetchData();
  };

  const deleteJob = async (id: string) => {
    await jobsApi.delete(id);
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'Space Grotesk, sans-serif' }}>Loading SmartQueue...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(79,142,247,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '0.85rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: 'linear-gradient(135deg, #4f8ef7, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>⚡</div>
          <span style={{ fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem' }} className="text-gradient">SmartQueue</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 20 }}>
            <div className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 600 }}>LIVE</span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user?.name}</span>
          <button onClick={logout} style={{ padding: '4px 12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats Row */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }} className="animate-fade-in">
            {[
              { label: 'Total Jobs', value: stats.total, color: '#e8e8f0', icon: '📋' },
              { label: 'Pending', value: stats.pending, color: '#8b5cf6', icon: '⏳' },
              { label: 'Processing', value: stats.processing, color: '#4f8ef7', icon: '⚙️' },
              { label: 'Completed', value: stats.completed, color: '#22c55e', icon: '✅' },
              { label: 'Failed', value: stats.failed, color: '#ef4444', icon: '❌' },
              { label: 'Success Rate', value: stats.successRate, color: '#22c55e', icon: '📈' },
            ].map((s) => (
              <div key={s.label} className="glass" style={{ borderRadius: 12, padding: '1.2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.6 }} />
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: s.color, fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Queue Stats */}
        {queueStats && (
          <div className="glass animate-fade-in" style={{ borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>BULL QUEUE</span>
            {[
              { label: 'Waiting', value: queueStats.waiting, color: '#8b5cf6' },
              { label: 'Active', value: queueStats.active, color: '#4f8ef7' },
              { label: 'Completed', value: queueStats.completed, color: '#22c55e' },
              { label: 'Failed', value: queueStats.failed, color: '#ef4444' },
              { label: 'Delayed', value: queueStats.delayed, color: '#f59e0b' },
            ].map(q => (
              <div key={q.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: q.color }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{q.label}:</span>
                <span style={{ color: q.color, fontWeight: 600, fontSize: '0.9rem' }}>{q.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['', 'pending', 'processing', 'completed', 'failed'].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid', cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'inherit', fontWeight: 500, transition: 'all 0.2s',
                  background: filter === s ? (STATUS_COLORS[s] || 'var(--accent)') : 'transparent',
                  borderColor: filter === s ? (STATUS_COLORS[s] || 'var(--accent)') : 'var(--border)',
                  color: filter === s ? '#fff' : 'var(--text-muted)' }}>
                {s || 'All'}
              </button>
            ))}
          </div>
          <button onClick={() => setShowForm(!showForm)}
            style={{ padding: '0.6rem 1.2rem', background: 'linear-gradient(135deg, #4f8ef7, #7c6af7)', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem' }}>
            {showForm ? '✕ Cancel' : '+ Submit Job'}
          </button>
        </div>

        {/* Submit Job Form */}
        {showForm && (
          <div className="glass animate-fade-in" style={{ borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(79,142,247,0.3)' }}>
            <h3 style={{ marginBottom: '1rem', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', color: 'var(--accent)' }}>▸ New Job</h3>
            <form onSubmit={submitJob} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Job Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Process Q4 Report" required
                  style={{ width: '100%', padding: '0.6rem 0.8rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 7, color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Job Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 7, color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.85rem', outline: 'none' }}>
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>Priority (1=High, 10=Low): {form.priority}</label>
                <input type="range" min={1} max={10} value={form.priority} onChange={e => setForm({ ...form, priority: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--accent)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button type="submit" disabled={submitting}
                  style={{ width: '100%', padding: '0.6rem', background: submitting ? 'var(--border)' : 'linear-gradient(135deg, #4f8ef7, #7c6af7)', border: 'none', borderRadius: 7, color: '#fff', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem' }}>
                  {submitting ? 'Queuing...' : '→ Queue Job'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jobs Table */}
        <div className="glass" style={{ borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 600 }}>Jobs Queue</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-refreshes every 4s</span>
          </div>

          {jobs.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
              <p>No jobs found. Submit your first job!</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-2)' }}>
                    {['Name', 'Type', 'Status', 'Attempts', 'Time', 'Created', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, i) => (
                    <tr key={job.id} style={{ borderTop: '1px solid var(--border)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: 500, maxWidth: 200 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{job.id.slice(0, 8)}...</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {job.type.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: 20, fontWeight: 600, border: '1px solid', whiteSpace: 'nowrap',
                          color: STATUS_COLORS[job.status] || '#fff',
                          borderColor: STATUS_COLORS[job.status] || 'var(--border)',
                          background: `${STATUS_COLORS[job.status]}18` || 'transparent' }}>
                          {job.status === 'processing' && '⚙ '}
                          {job.status === 'pending' && '⏳ '}
                          {job.status === 'completed' && '✓ '}
                          {job.status === 'failed' && '✗ '}
                          {job.status === 'retrying' && '↺ '}
                          {job.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        {job.attempts}/{job.maxAttempts}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {job.processingTime ? `${job.processingTime}ms` : '—'}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(job.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {job.status === 'failed' && (
                            <button onClick={() => retryJob(job.id)}
                              style={{ padding: '3px 8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 5, color: '#f59e0b', cursor: 'pointer', fontSize: '0.72rem', fontFamily: 'inherit' }}>
                              ↺ Retry
                            </button>
                          )}
                          <button onClick={() => deleteJob(job.id)}
                            style={{ padding: '3px 8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 5, color: '#ef4444', cursor: 'pointer', fontSize: '0.72rem', fontFamily: 'inherit' }}>
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2rem', fontFamily: 'Space Grotesk, sans-serif' }}>
          Built by Rajeshwar Singh · NestJS · Bull · PostgreSQL · Redis · Next.js · Docker
        </p>
      </div>
    </div>
  );
}
