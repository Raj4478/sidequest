'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';
import api from '@/lib/api';

export default function SettingsPage() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleSaveProfile = async () => {
    if (!name.trim()) { toast.error('Name cannot be empty'); return; }
    setSavingProfile(true);
    try {
      const res = await api.patch('/users/me', { name });
      setUser(res.data.data);
      toast.success('Profile updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    logout();
    router.push('/');
    toast.success('Logged out');
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== 'DELETE') { toast.error('Type DELETE to confirm'); return; }
    setDeleting(true);
    try {
      await api.delete('/users/me');
      logout();
      router.push('/');
      toast.success('Account deleted');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete account');
    } finally {
      setDeleting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none',
    fontFamily: 'var(--font-body)'
  };

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 20, padding: 28, marginBottom: 20
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Profile</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--accent)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 800, fontSize: 22, color: '#fff',
            fontFamily: 'var(--font-display)'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{user?.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{user?.email}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Display name
          </label>
          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Email
          </label>
          <input value={user?.email || ''} disabled style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} />
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Email cannot be changed</p>
        </div>

        <button onClick={handleSaveProfile} disabled={savingProfile} style={{
          padding: '11px 24px', borderRadius: 10, background: 'var(--accent)',
          color: '#fff', fontWeight: 700, fontSize: 14, border: 'none',
          cursor: savingProfile ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-display)'
        }}>
          {savingProfile ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {/* Account actions */}
      <div style={sectionStyle}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Account</h2>
        <button onClick={handleLogout} style={{
          width: '100%', padding: '12px', borderRadius: 10,
          border: '1px solid var(--border)', background: 'none',
          color: 'var(--text-secondary)', fontWeight: 600, fontSize: 14,
          cursor: 'pointer', textAlign: 'left' as const,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span>Log out</span>
          <span style={{ fontSize: 16 }}>→</span>
        </button>
      </div>

      {/* Danger zone */}
      <div style={{ ...sectionStyle, border: '1px solid #f8717140' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--danger)' }}>
          Danger zone
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
          Deleting your account is permanent and cannot be undone. All your resolutions, milestones, and reflections will be lost forever.
        </p>

        {!showDeleteConfirm ? (
          <button onClick={() => setShowDeleteConfirm(true)} style={{
            padding: '11px 24px', borderRadius: 10, background: '#f8717115',
            color: 'var(--danger)', border: '1px solid #f8717130',
            fontWeight: 600, fontSize: 14, cursor: 'pointer'
          }}>
            Delete my account
          </button>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: 'var(--danger)', marginBottom: 12, fontWeight: 600 }}>
              Type DELETE to confirm:
            </p>
            <input
              value={deleteInput}
              onChange={e => setDeleteInput(e.target.value)}
              placeholder="DELETE"
              style={{ ...inputStyle, border: '1px solid #f8717150', marginBottom: 12 }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setShowDeleteConfirm(false); setDeleteInput(''); }} style={{
                flex: 1, padding: '11px', borderRadius: 10, border: '1px solid var(--border)',
                background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14
              }}>Cancel</button>
              <button onClick={handleDeleteAccount} disabled={deleting || deleteInput !== 'DELETE'} style={{
                flex: 1, padding: '11px', borderRadius: 10,
                background: deleteInput === 'DELETE' ? 'var(--danger)' : '#f8717130',
                color: '#fff', fontWeight: 700, fontSize: 14, border: 'none',
                cursor: deleteInput === 'DELETE' && !deleting ? 'pointer' : 'not-allowed'
              }}>
                {deleting ? 'Deleting...' : 'Delete account'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* App info */}
      <div style={{ textAlign: 'center', paddingTop: 16 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)', fontSize: 16, marginBottom: 4 }}>SideQuest</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>v1.0.0 · One goal. One year.</div>
      </div>
    </div>
  );
}
