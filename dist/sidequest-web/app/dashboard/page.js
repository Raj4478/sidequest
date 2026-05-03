'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const api_1 = __importDefault(require("@/lib/api"));
const auth_store_1 = require("@/store/auth.store");
function ProgressRing({ percent, size = 120 }) {
    const r = (size - 16) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    return (<svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={8}/>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={8} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }}/>
    </svg>);
}
function DashboardPage() {
    const { user } = (0, auth_store_1.useAuthStore)();
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        api_1.default.get('/dashboard').then(res => {
            setData(res.data.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);
    if (loading)
        return (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>Loading your quest...</div>
    </div>);
    if (!data?.hasResolution)
        return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎯</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
        No active quest
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 400, lineHeight: 1.7, marginBottom: 32, fontSize: 16 }}>
        You haven't set a resolution yet. Start by defining your one big goal for the year.
      </p>
      <link_1.default href="/dashboard/resolution/new" style={{
                padding: '14px 32px', borderRadius: 10, background: 'var(--accent)',
                color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15,
                fontFamily: 'var(--font-display)', boxShadow: '0 0 32px var(--accent-glow)'
            }}>
        Create my resolution →
      </link_1.default>
    </div>);
    const { resolution, stats, upcoming_milestone, last_reflection } = data;
    const categoryColors = {
        health: '#4ade80', career: '#60a5fa', education: '#a78bfa',
        finance: '#fbbf24', personal: '#f472b6', other: '#94a3b8'
    };
    const catColor = categoryColors[resolution.category] || 'var(--accent)';
    return (<div style={{ padding: '40px 32px', maxWidth: 900, margin: '0 auto' }}>
      
      <div className="animate-fade-up" style={{ marginBottom: 40 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800 }}>
          Hey {user?.name?.split(' ')[0]} 👋
        </h1>
      </div>

      
      <div className="animate-fade-up animate-delay-1" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 20, padding: 28, marginBottom: 24,
            display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap'
        }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <ProgressRing percent={resolution.progress_percent} size={120}/>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--accent)' }}>
              {resolution.progress_percent}%
            </span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>done</span>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', borderRadius: 20, marginBottom: 10,
            background: `${catColor}20`, color: catColor, fontSize: 12, fontWeight: 600
        }}>
            {resolution.category.toUpperCase()}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
            {resolution.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            {resolution.description}
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
            { label: 'Days left', value: stats?.days_remaining },
            { label: 'Completed', value: `${stats?.milestones_completed}/${stats?.milestones_total}` },
            { label: 'Overdue', value: stats?.milestones_overdue, danger: (stats?.milestones_overdue ?? 0) > 0 },
        ].map((s, i) => (<div key={i}>
                <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20,
                color: s.danger ? 'var(--danger)' : 'var(--text-primary)'
            }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>))}
          </div>
        </div>

        <link_1.default href={`/dashboard/resolution/${resolution.id}`} style={{
            padding: '10px 20px', borderRadius: 10, border: '1px solid var(--border)',
            color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13,
            fontWeight: 500, flexShrink: 0, whiteSpace: 'nowrap'
        }}>
          View details →
        </link_1.default>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        
        <div className="animate-fade-up animate-delay-2" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, padding: 24
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Next Milestone
          </h3>
          {upcoming_milestone ? (<>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)',
                marginTop: 5, flexShrink: 0, boxShadow: '0 0 8px var(--accent)'
            }}/>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{upcoming_milestone.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                    Due {new Date(upcoming_milestone.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>
              <link_1.default href={`/dashboard/milestones/${upcoming_milestone.id}`} style={{
                display: 'block', marginTop: 16, padding: '9px 16px', borderRadius: 8,
                background: 'var(--accent-dim)', color: 'var(--accent)', textDecoration: 'none',
                fontSize: 13, fontWeight: 600, textAlign: 'center',
                border: '1px solid var(--accent-glow)'
            }}>
                Add reflection
              </link_1.default>
            </>) : (<p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No upcoming milestones. Add some to track progress.</p>)}
        </div>

        
        <div className="animate-fade-up animate-delay-3" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, padding: 24
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Last Reflection
          </h3>
          {last_reflection ? (<>
              <div style={{ marginBottom: 8 }}>
                {last_reflection.wins && (<div style={{ marginBottom: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>✓ WIN</span>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.5 }}>
                      {last_reflection.wins.slice(0, 100)}{last_reflection.wins.length > 100 ? '...' : ''}
                    </p>
                  </div>)}
                {last_reflection.blockers && (<div>
                    <span style={{ fontSize: 11, color: 'var(--warning)', fontWeight: 600 }}>⚠ BLOCKER</span>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.5 }}>
                      {last_reflection.blockers.slice(0, 100)}{last_reflection.blockers.length > 100 ? '...' : ''}
                    </p>
                  </div>)}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {new Date(last_reflection.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </div>
            </>) : (<div>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>No reflections yet. Start tracking your journey.</p>
              {upcoming_milestone && (<link_1.default href={`/dashboard/milestones/${upcoming_milestone.id}`} style={{
                    display: 'block', padding: '9px 16px', borderRadius: 8,
                    background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
                    textDecoration: 'none', fontSize: 13, fontWeight: 500, textAlign: 'center',
                    border: '1px solid var(--border)'
                }}>Write first reflection</link_1.default>)}
            </div>)}
        </div>
      </div>

      
      <div className="animate-fade-up animate-delay-4" style={{
            marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap'
        }}>
        <link_1.default href={`/dashboard/resolution/${resolution.id}`} style={{
            padding: '10px 18px', borderRadius: 10, border: '1px solid var(--border)',
            color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, fontWeight: 500
        }}>🗺️ View journey map</link_1.default>
        <link_1.default href={`/dashboard/resolution/${resolution.id}`} style={{
            padding: '10px 18px', borderRadius: 10, border: '1px solid var(--border)',
            color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, fontWeight: 500
        }}>➕ Add milestone</link_1.default>
        <link_1.default href="/dashboard/reflections" style={{
            padding: '10px 18px', borderRadius: 10, border: '1px solid var(--border)',
            color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, fontWeight: 500
        }}>📝 All reflections</link_1.default>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map