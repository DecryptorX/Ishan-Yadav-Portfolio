"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Activity, FolderGit2, MessageSquare, Settings as SettingsIcon, 
  Trash2, ShieldAlert, CheckCircle, XCircle, Search, ArrowUpDown, ChevronDown, 
  Plus, Edit, Eye, ShieldCheck, UserCheck, X, FileEdit, HelpCircle, Image as ImageIcon
} from 'lucide-react';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '1.5rem',
  padding: '2rem',
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
};

const inputStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  background: 'rgba(255,255,255,0.01)',
  border: '1px solid rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: '0.88rem',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.3s',
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'content' | 'messages' | 'settings'>('dashboard');

  // Stats & Activities States
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  
  // Users Page States
  const [usersData, setUsersData] = useState<any>(null);
  const [usersSearch, setUsersSearch] = useState('');
  const [usersRole, setUsersRole] = useState('');
  const [usersStatus, setUsersStatus] = useState('');
  const [usersSortBy, setUsersSortBy] = useState('createdAt');
  const [usersSortOrder, setUsersSortOrder] = useState<'asc' | 'desc'>('desc');
  const [usersPage, setUsersPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Content States
  const [contentSection, setContentSection] = useState<'projects' | 'experience' | 'skills' | 'journey' | 'socials' | 'seo' | 'contact-info' | 'hero'>('projects');
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Skills specific states
  const [skillCategories, setSkillCategories] = useState<any[]>([]);

  // Messages States
  const [messagesData, setMessagesData] = useState<any>(null);
  const [messagesSearch, setMessagesSearch] = useState('');
  const [messagesFilter, setMessagesFilter] = useState(''); // 'read', 'unread'
  const [messagesPage, setMessagesPage] = useState(1);

  // Settings States
  const [settings, setSettings] = useState<any[]>([]);

  // Modals / Confirm Dialogs
  const [confirmDialog, setConfirmDialog] = useState<{ show: boolean; title: string; desc: string; onConfirm: () => void } | null>(null);

  // Loading States
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);

  // Fetch Dashboard Stats & Activities
  const fetchDashboardData = async () => {
    try {
      setLoadingStats(true);
      const [statsRes, actRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/activities')
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (actRes.ok) setActivities(await actRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const query = new URLSearchParams({
        search: usersSearch,
        role: usersRole,
        status: usersStatus,
        sortBy: usersSortBy,
        sortOrder: usersSortOrder,
        page: String(usersPage),
        limit: '10'
      });
      const res = await fetch(`/api/admin/users?${query}`);
      if (res.ok) setUsersData(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch Content Area Items
  const fetchContentItems = async () => {
    try {
      setLoadingContent(true);
      const res = await fetch(`/api/admin/content/${contentSection}`);
      if (res.ok) {
        const data = await res.json();
        setContentItems(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingContent(false);
    }
  };

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const query = new URLSearchParams({
        search: messagesSearch,
        filter: messagesFilter,
        page: String(messagesPage),
        limit: '8'
      });
      const res = await fetch(`/api/admin/messages?${query}`);
      if (res.ok) setMessagesData(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Fetch Settings
  const fetchSettings = async () => {
    try {
      setLoadingSettings(true);
      const res = await fetch('/api/admin/content/settings');
      if (res.ok) setSettings(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSettings(false);
    }
  };

  // Trigger loads based on active tab
  useEffect(() => {
    if (status !== 'authenticated') return;
    if (session?.user?.role !== 'ADMIN') return;

    if (activeTab === 'dashboard') {
      fetchDashboardData();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'content') {
      fetchContentItems();
    } else if (activeTab === 'messages') {
      fetchMessages();
    } else if (activeTab === 'settings') {
      fetchSettings();
    }
  }, [activeTab, status, session, contentSection]);

  // Handle User Search/Filters change
  useEffect(() => {
    if (activeTab === 'users') {
      setUsersPage(1);
      fetchUsers();
    }
  }, [usersSearch, usersRole, usersStatus, usersSortBy, usersSortOrder]);

  // Handle Messages Search/Filter change
  useEffect(() => {
    if (activeTab === 'messages') {
      setMessagesPage(1);
      fetchMessages();
    }
  }, [messagesSearch, messagesFilter]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
        Authenticating administrative session...
      </div>
    );
  }

  // Gate Check
  if (!session?.user || session.user.role !== 'ADMIN') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#09090b', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          background: 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
        }}>
          <ShieldAlert size={64} color="#ff5f56" style={{ marginInline: 'auto', marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Access Denied</h1>
          <p style={{ color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            This account does not have developer administrator privileges to access this area.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <a href="/" style={{
              padding: '0.65rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
              background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer'
            }}>Return Home</a>
            <button onClick={() => signOut({ callbackUrl: '/login' })} style={{
              padding: '0.65rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
              background: '#ff5f56', color: '#fff', border: 'none', cursor: 'pointer'
            }}>Sign Out</button>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic Content Operations
  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const method = isCreating ? 'POST' : 'PUT';
    try {
      const res = await fetch(`/api/admin/content/${contentSection}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        setEditingItem(null);
        setIsCreating(false);
        fetchContentItems();
        fetchDashboardData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save changes.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleContentDelete = (id: string, name: string) => {
    setConfirmDialog({
      show: true,
      title: 'Confirm Deletion',
      desc: `Are you sure you want to delete "${name}" from ${contentSection}? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/content/${contentSection}?id=${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            fetchContentItems();
            fetchDashboardData();
          }
        } catch (err) {
          console.error(err);
        }
        setConfirmDialog(null);
      }
    });
  };

  // User Actions
  const handleUserUpdate = (id: string, name: string, payload: { role?: string; isDeactivated?: boolean }) => {
    const actionLabel = payload.role ? `change role to ${payload.role}` : payload.isDeactivated ? 'suspend/deactivate' : 'reactivate';
    setConfirmDialog({
      show: true,
      title: 'Confirm Admin Action',
      desc: `Are you sure you want to ${actionLabel} user "${name}"?`,
      onConfirm: async () => {
        try {
          const res = await fetch('/api/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...payload }),
          });
          if (res.ok) {
            fetchUsers();
            setSelectedUser(null);
            fetchDashboardData();
          } else {
            const data = await res.json();
            alert(data.error || 'Failed to update user.');
          }
        } catch (err) {
          console.error(err);
        }
        setConfirmDialog(null);
      }
    });
  };

  const handleUserDelete = (id: string, name: string) => {
    setConfirmDialog({
      show: true,
      title: 'Confirm Deletion',
      desc: `Are you sure you want to permanently delete user "${name}"? All associated data and activity history will be deleted.`,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/users/${id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            fetchUsers();
            setSelectedUser(null);
            fetchDashboardData();
          } else {
            const data = await res.json();
            alert(data.error || 'Failed to delete user.');
          }
        } catch (err) {
          console.error(err);
        }
        setConfirmDialog(null);
      }
    });
  };

  // Message Actions
  const handleMessageStatus = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead }),
      });
      if (res.ok) fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMessageDelete = (id: string, name: string) => {
    setConfirmDialog({
      show: true,
      title: 'Confirm Deletion',
      desc: `Are you sure you want to delete message from "${name}"?`,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
          if (res.ok) fetchMessages();
        } catch (err) {
          console.error(err);
        }
        setConfirmDialog(null);
      }
    });
  };

  // Settings Actions
  const handleSettingSubmit = async (key: string, value: string) => {
    try {
      const res = await fetch('/api/admin/content/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) fetchSettings();
    } catch (err) {
      console.error(err);
    }
  };

  // Image Upload helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setEditingItem((prev: any) => ({ ...prev, [fieldName]: data.url }));
      } else {
        alert('File upload failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: '#09090b', color: '#eaeaea' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div>
            <p style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Administration</p>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.04em' }}>Developer Core CMS</h1>
            <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.88rem', marginTop: '0.3rem' }}>Logged in as {session.user.name}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => router.push('/')} style={{
              padding: '0.55rem 1.25rem', borderRadius: '0.5rem', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)', color: '#eaeaea', fontSize: '0.82rem',
              cursor: 'pointer', fontWeight: 700
            }}>View Site</button>
            <button onClick={() => signOut({ callbackUrl: '/' })} style={{
              padding: '0.55rem 1.25rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)', color: '#ff5f56', fontSize: '0.82rem',
              cursor: 'pointer', fontWeight: 700
            }}>Sign Out</button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
          {[
            { id: 'dashboard', label: 'Overview', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'content', label: 'Portfolio Content', icon: FolderGit2 },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: SettingsIcon },
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.55rem 1.25rem', borderRadius: '0.5rem',
                  background: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(226,232,240,0.65)',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div style={{ minHeight: '50vh' }}>
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                {[
                  { label: 'Total Users', value: stats?.totalUsers ?? '0', color: '#ffffff' },
                  { label: 'Admins', value: stats?.admins ?? '0', color: '#00e5ff' },
                  { label: 'Total Logins', value: stats?.totalLogins ?? '0', color: '#a855f7' },
                  { label: 'Today\'s Logins', value: stats?.todayLogins ?? '0', color: '#ec4899' },
                ].map(card => (
                  <div key={card.label} style={cardStyle}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: card.color, lineHeight: 1 }}>{card.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.5)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Sub Metrics Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '0.9rem', color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem', fontWeight: 800 }}>System Milestones</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.5rem' }}>
                      <span>Newest Authenticated User:</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>{stats?.newestUser?.name || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.5rem' }}>
                      <span>Newest Sign-in date:</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{stats?.newestUser?.createdAt ? new Date(stats.newestUser.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Last Sign-in event by:</span>
                      <span style={{ color: '#00e5ff', fontWeight: 700 }}>{stats?.lastLogin?.name || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Log Log table */}
              <div style={{ ...cardStyle, padding: 0 }}>
                <div style={{ padding: '1.5rem 1.75rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>Live Transaction Activity Audit ({activities.length})</h2>
                </div>

                <div style={{ maxHeight: '420px', overflowY: 'auto', paddingInline: '1rem' }}>
                  {activities.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>No activities logged.</div>
                  ) : (
                    activities.map((act) => (
                      <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.85rem' }}>
                        <div>
                          <span style={{
                            padding: '0.15rem 0.45rem', borderRadius: '0.3rem', fontSize: '0.65rem', fontWeight: 800, marginRight: '0.75rem',
                            background: act.action.includes('ADMIN') ? 'rgba(0, 229, 255, 0.12)' : act.action.includes('DELETE') ? 'rgba(255, 95, 86, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                            color: act.action.includes('ADMIN') ? '#00e5ff' : act.action.includes('DELETE') ? '#ff5f56' : 'rgba(255,255,255,0.6)',
                          }}>{act.action}</span>
                          <span>{act.details}</span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{new Date(act.createdAt).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: USERS */}
          {activeTab === 'users' && (
            <div>
              {/* Search & Filter Bar */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                  <input
                    value={usersSearch}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    placeholder="Search users by name, email, or account ID..."
                    style={{ ...inputStyle, paddingLeft: '2.25rem' }}
                  />
                </div>
                <select value={usersRole} onChange={(e) => setUsersRole(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
                  <option value="">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
                <select value={usersStatus} onChange={(e) => setUsersStatus(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="deactivated">Suspended</option>
                </select>
              </div>

              {/* Table */}
              <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Profile</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Email</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Provider</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Role</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Status</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Last Login</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'right', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingUsers ? (
                        <tr>
                          <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#00ff88' }}>Resolving records...</td>
                        </tr>
                      ) : !usersData?.users || usersData.users.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No users found matching parameters.</td>
                        </tr>
                      ) : (
                        usersData.users.map((u: any) => (
                          <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', background: 'transparent' }}>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', background: '#222' }}>
                                  {u.image ? (
                                    <img src={u.image} alt={u.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#00ff88', fontWeight: 800 }}>{u.name[0]}</div>
                                  )}
                                </div>
                                <span style={{ fontWeight: 700 }}>{u.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', color: 'rgba(255,255,255,0.6)' }}>{u.email || '—'}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span style={{ padding: '0.15rem 0.45rem', borderRadius: '0.3rem', fontSize: '0.68rem', fontWeight: 700, background: 'rgba(255,255,255,0.04)' }}>{u.provider}</span>
                            </td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span style={{ color: u.role === 'ADMIN' ? '#00e5ff' : 'inherit', fontWeight: u.role === 'ADMIN' ? 800 : 500 }}>{u.role}</span>
                            </td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span style={{ color: u.isDeactivated ? '#ff5f56' : '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: u.isDeactivated ? '#ff5f56' : '#10b981' }} />
                                {u.isDeactivated ? 'Suspended' : 'Active'}
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', color: 'rgba(255,255,255,0.45)' }}>{new Date(u.lastLogin).toLocaleString()}</td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                                <button onClick={() => setSelectedUser(u)} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#eaeaea', cursor: 'pointer' }} title="View details"><Eye size={14} /></button>
                                {u.role === 'ADMIN' ? (
                                  <button onClick={() => handleUserUpdate(u.id, u.name, { role: 'USER' })} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', color: '#00e5ff', cursor: 'pointer' }} title="Demote to User"><ShieldAlert size={14} /></button>
                                ) : (
                                  <button onClick={() => handleUserUpdate(u.id, u.name, { role: 'ADMIN' })} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.15)', color: '#00ff88', cursor: 'pointer' }} title="Promote to Admin"><ShieldCheck size={14} /></button>
                                )}
                                {u.isDeactivated ? (
                                  <button onClick={() => handleUserUpdate(u.id, u.name, { isDeactivated: false })} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', color: '#10b981', cursor: 'pointer' }} title="Reactivate user"><UserCheck size={14} /></button>
                                ) : (
                                  <button onClick={() => handleUserUpdate(u.id, u.name, { isDeactivated: true })} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(255,95,86,0.05)', border: '1px solid rgba(255,95,86,0.15)', color: '#ff5f56', cursor: 'pointer' }} title="Suspend / Deactivate user"><XCircle size={14} /></button>
                                )}
                                <button onClick={() => handleUserDelete(u.id, u.name)} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(255,95,86,0.05)', border: '1px solid rgba(255,95,86,0.15)', color: '#ff5f56', cursor: 'pointer' }} title="Delete user permanently"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {usersData?.pages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Page {usersData.page} of {usersData.pages}</span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button disabled={usersPage <= 1} onClick={() => setUsersPage(p => p - 1)} style={{ padding: '0.35rem 0.75rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', cursor: usersPage <= 1 ? 'not-allowed' : 'pointer', color: '#fff' }}>Prev</button>
                      <button disabled={usersPage >= usersData.pages} onClick={() => setUsersPage(p => p + 1)} style={{ padding: '0.35rem 0.75rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', cursor: usersPage >= usersData.pages ? 'not-allowed' : 'pointer', color: '#fff' }}>Next</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: CONTENT MANAGER */}
          {activeTab === 'content' && (
            <div>
              {/* Category selector row */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {[
                  { id: 'projects', label: 'Projects' },
                  { id: 'experience', label: 'Experiences' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'journey', label: 'Timeline Milestones' },
                  { id: 'socials', label: 'Social links' },
                  { id: 'seo', label: 'SEO Config' },
                  { id: 'hero', label: 'Hero Section' },
                  { id: 'contact-info', label: 'Contact Info' },
                ].map(sec => {
                  const isActive = contentSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => { setContentSection(sec.id as any); setEditingItem(null); setIsCreating(false); }}
                      style={{
                        padding: '0.45rem 1rem', borderRadius: '0.4rem', fontSize: '0.8rem', fontWeight: 700,
                        background: isActive ? '#00e5ff' : 'rgba(255,255,255,0.02)',
                        color: isActive ? '#000' : 'rgba(226, 232, 240, 0.65)',
                        border: isActive ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.06)',
                        cursor: 'pointer'
                      }}
                    >
                      {sec.label}
                    </button>
                  );
                })}
              </div>

              {/* View / Edit area */}
              {editingItem ? (
                <div style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{isCreating ? 'Create New Entry' : 'Edit Entry details'}</h3>
                    <button onClick={() => { setEditingItem(null); setIsCreating(false); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <form onSubmit={handleContentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Projects Form fields */}
                    {contentSection === 'projects' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Number prefix (e.g. 01)</label>
                            <input value={editingItem.num || ''} onChange={e => setEditingItem((p: any) => ({ ...p, num: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Project Title</label>
                            <input value={editingItem.title || ''} onChange={e => setEditingItem((p: any) => ({ ...p, title: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Tagline summary</label>
                          <input value={editingItem.tagline || ''} onChange={e => setEditingItem((p: any) => ({ ...p, tagline: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Roles list (comma-separated)</label>
                          <input value={editingItem.role || ''} onChange={e => setEditingItem((p: any) => ({ ...p, role: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Description</label>
                          <textarea value={editingItem.description || ''} onChange={e => setEditingItem((p: any) => ({ ...p, description: e.target.value }))} required style={{ ...inputStyle, minHeight: '90px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Features (newline-separated list)</label>
                          <textarea value={editingItem.features || ''} onChange={e => setEditingItem((p: any) => ({ ...p, features: e.target.value }))} required style={{ ...inputStyle, minHeight: '90px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Tech stack (comma-separated list)</label>
                          <input value={editingItem.tech || ''} onChange={e => setEditingItem((p: any) => ({ ...p, tech: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Highlights / Milestones</label>
                          <textarea value={editingItem.highlights || ''} onChange={e => setEditingItem((p: any) => ({ ...p, highlights: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>GitHub repository link</label>
                            <input value={editingItem.github || ''} onChange={e => setEditingItem((p: any) => ({ ...p, github: e.target.value }))} style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Live Demo link</label>
                            <input value={editingItem.demo || ''} onChange={e => setEditingItem((p: any) => ({ ...p, demo: e.target.value }))} style={inputStyle} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Status (e.g. live, open-source, in-development)</label>
                            <input value={editingItem.status || ''} onChange={e => setEditingItem((p: any) => ({ ...p, status: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Accent Color hex code</label>
                            <input value={editingItem.accent || ''} onChange={e => setEditingItem((p: any) => ({ ...p, accent: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Sort Order index</label>
                            <input type="number" value={editingItem.order ?? 0} onChange={e => setEditingItem((p: any) => ({ ...p, order: Number(e.target.value) }))} required style={inputStyle} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Experience Form fields */}
                    {contentSection === 'experience' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Role Title</label>
                            <input value={editingItem.role || ''} onChange={e => setEditingItem((p: any) => ({ ...p, role: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Company / Organization</label>
                            <input value={editingItem.company || ''} onChange={e => setEditingItem((p: any) => ({ ...p, company: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Period (e.g. 2024 — Present)</label>
                            <input value={editingItem.period || ''} onChange={e => setEditingItem((p: any) => ({ ...p, period: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Category Label (e.g. Freelance Engineering)</label>
                            <input value={editingItem.description || ''} onChange={e => setEditingItem((p: any) => ({ ...p, description: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Responsibilities list (newline-separated)</label>
                          <textarea value={editingItem.points || ''} onChange={e => setEditingItem((p: any) => ({ ...p, points: e.target.value }))} required style={{ ...inputStyle, minHeight: '120px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Sort Order index</label>
                          <input type="number" value={editingItem.order ?? 0} onChange={e => setEditingItem((p: any) => ({ ...p, order: Number(e.target.value) }))} required style={inputStyle} />
                        </div>
                      </div>
                    )}

                    {/* Skills Form fields */}
                    {contentSection === 'skills' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {editingItem.categoryId ? (
                          // editing a sub-skill
                          <>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Skill Name</label>
                              <input value={editingItem.name || ''} onChange={e => setEditingItem((p: any) => ({ ...p, name: e.target.value }))} required style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Proficiency level (e.g. Proficient, Amateur)</label>
                                <input value={editingItem.level || ''} onChange={e => setEditingItem((p: any) => ({ ...p, level: e.target.value }))} required style={inputStyle} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Years of Experience (e.g. 3 Years)</label>
                                <input value={editingItem.exp || ''} onChange={e => setEditingItem((p: any) => ({ ...p, exp: e.target.value }))} required style={inputStyle} />
                              </div>
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Project integrations (comma-separated list)</label>
                              <input value={editingItem.projects || ''} onChange={e => setEditingItem((p: any) => ({ ...p, projects: e.target.value }))} style={inputStyle} />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Skill description details</label>
                              <textarea value={editingItem.desc || ''} onChange={e => setEditingItem((p: any) => ({ ...p, desc: e.target.value }))} required style={inputStyle} />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Sort Order index</label>
                              <input type="number" value={editingItem.order ?? 0} onChange={e => setEditingItem((p: any) => ({ ...p, order: Number(e.target.value) }))} required style={inputStyle} />
                            </div>
                          </>
                        ) : (
                          // editing a category
                          <>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Category Name</label>
                              <input value={editingItem.name || ''} onChange={e => setEditingItem((p: any) => ({ ...p, name: e.target.value }))} required style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Color representation hex code</label>
                                <input value={editingItem.color || ''} onChange={e => setEditingItem((p: any) => ({ ...p, color: e.target.value }))} required style={inputStyle} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Sort Order index</label>
                                <input type="number" value={editingItem.order ?? 0} onChange={e => setEditingItem((p: any) => ({ ...p, order: Number(e.target.value) }))} required style={inputStyle} />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Timeline Milestones Form fields */}
                    {contentSection === 'journey' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Year</label>
                            <input value={editingItem.year || ''} onChange={e => setEditingItem((p: any) => ({ ...p, year: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Milestone Title</label>
                            <input value={editingItem.title || ''} onChange={e => setEditingItem((p: any) => ({ ...p, title: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Milestone Subtitle</label>
                          <input value={editingItem.subtitle || ''} onChange={e => setEditingItem((p: any) => ({ ...p, subtitle: e.target.value }))} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Milestone Description</label>
                          <textarea value={editingItem.description || ''} onChange={e => setEditingItem((p: any) => ({ ...p, description: e.target.value }))} required style={{ ...inputStyle, minHeight: '90px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Achievements achievements (newline-separated list)</label>
                          <textarea value={editingItem.achievements || ''} onChange={e => setEditingItem((p: any) => ({ ...p, achievements: e.target.value }))} required style={{ ...inputStyle, minHeight: '90px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Sort Order index</label>
                          <input type="number" value={editingItem.order ?? 0} onChange={e => setEditingItem((p: any) => ({ ...p, order: Number(e.target.value) }))} required style={inputStyle} />
                        </div>
                      </div>
                    )}

                    {/* Social links Form fields */}
                    {contentSection === 'socials' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Platform Name</label>
                            <input value={editingItem.platform || ''} onChange={e => setEditingItem((p: any) => ({ ...p, platform: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>URL</label>
                            <input value={editingItem.url || ''} onChange={e => setEditingItem((p: any) => ({ ...p, url: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Icon key representation</label>
                            <input value={editingItem.icon || ''} onChange={e => setEditingItem((p: any) => ({ ...p, icon: e.target.value }))} style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Sort Order index</label>
                            <input type="number" value={editingItem.order ?? 0} onChange={e => setEditingItem((p: any) => ({ ...p, order: Number(e.target.value) }))} required style={inputStyle} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SEO Config Form fields */}
                    {contentSection === 'seo' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Page name key (e.g. home, about, resume)</label>
                            <input value={editingItem.page || ''} onChange={e => setEditingItem((p: any) => ({ ...p, page: e.target.value }))} required disabled={!isCreating} style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Browser Title tag</label>
                            <input value={editingItem.title || ''} onChange={e => setEditingItem((p: any) => ({ ...p, title: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Meta Description</label>
                          <textarea value={editingItem.description || ''} onChange={e => setEditingItem((p: any) => ({ ...p, description: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Keywords keywords (comma-separated list)</label>
                          <input value={editingItem.keywords || ''} onChange={e => setEditingItem((p: any) => ({ ...p, keywords: e.target.value }))} style={inputStyle} />
                        </div>
                      </div>
                    )}
                    
                    {/* Hero Section Form fields */}
                    {contentSection === 'hero' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Name / Title</label>
                          <input value={editingItem.title || ''} onChange={e => setEditingItem((p: any) => ({ ...p, title: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Subtitle</label>
                          <input value={editingItem.subtitle || ''} onChange={e => setEditingItem((p: any) => ({ ...p, subtitle: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Roles list (comma-separated)</label>
                          <input value={editingItem.roles || ''} onChange={e => setEditingItem((p: any) => ({ ...p, roles: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Bio</label>
                          <textarea value={editingItem.bio || ''} onChange={e => setEditingItem((p: any) => ({ ...p, bio: e.target.value }))} required style={{ ...inputStyle, minHeight: '90px' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Avatar Image</label>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input value={editingItem.avatarUrl || ''} onChange={e => setEditingItem((p: any) => ({ ...p, avatarUrl: e.target.value }))} style={inputStyle} />
                            <label style={{ padding: '0.65rem 1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                              <ImageIcon size={16} /> Upload
                              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatarUrl')} style={{ display: 'none' }} />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Info Form fields */}
                    {contentSection === 'contact-info' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Email Address</label>
                          <input value={editingItem.email || ''} onChange={e => setEditingItem((p: any) => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Phone Number</label>
                          <input value={editingItem.phone || ''} onChange={e => setEditingItem((p: any) => ({ ...p, phone: e.target.value }))} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.35rem' }}>Location</label>
                          <input value={editingItem.location || ''} onChange={e => setEditingItem((p: any) => ({ ...p, location: e.target.value }))} required style={inputStyle} />
                        </div>
                      </div>
                    )}


                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                      <button type="button" onClick={() => { setEditingItem(null); setIsCreating(false); }} style={{
                        padding: '0.55rem 1.25rem', borderRadius: '0.5rem', background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.1)', color: '#eaeaea', fontSize: '0.82rem', cursor: 'pointer'
                      }}>Cancel</button>
                      <button type="submit" style={{
                        padding: '0.55rem 1.25rem', borderRadius: '0.5rem', background: '#00ff88',
                        color: '#000', border: 'none', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer'
                      }}>Save Entry</button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Item Lists by category */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'capitalize' }}>Manage {contentSection}</h3>
                    {contentSection !== 'contact-info' && contentSection !== 'hero' && (
                      <button onClick={() => { setIsCreating(true); setEditingItem(contentSection === 'skills' ? { categoryId: 'category-placeholder' } : {}); }} style={{
                        display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 1rem', borderRadius: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)',
                        color: '#ffffff', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer'
                      }}>
                        <Plus size={14} /> Add Entry
                      </button>
                    )}
                  </div>

                  {loadingContent ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>Resolving dynamic records...</div>
                  ) : contentItems.length === 0 ? (
                    <div style={{ ...cardStyle, padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No items created yet in this section. Add one above!</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {contentItems.map((item) => (
                        <div key={item.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.title || item.name || item.platform || item.role || item.page || 'Portfolio Section'}</div>
                            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>
                              {item.tagline || item.company || item.url || item.year || item.description || 'Dynamic database entry'}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {contentSection === 'skills' && (
                              <button onClick={() => { setIsCreating(true); setEditingItem({ categoryId: item.id }); }} style={{
                                padding: '0.35rem 0.75rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)', color: '#00ff88', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer'
                              }}>+ Skill</button>
                            )}
                            <button onClick={() => { setIsCreating(false); setEditingItem(item); }} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#eaeaea', cursor: 'pointer' }}><Edit size={14} /></button>
                            <button onClick={() => handleContentDelete(item.id, item.title || item.name || item.platform || item.role)} style={{ padding: '0.35rem', borderRadius: '0.3rem', background: 'rgba(255,95,86,0.05)', border: '1px solid rgba(255,95,86,0.15)', color: '#ff5f56', cursor: 'pointer' }}><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              {/* Search & Filter */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                  <input
                    value={messagesSearch}
                    onChange={(e) => setMessagesSearch(e.target.value)}
                    placeholder="Search contact form submissions..."
                    style={{ ...inputStyle, paddingLeft: '2.25rem' }}
                  />
                </div>
                <select value={messagesFilter} onChange={(e) => setMessagesFilter(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
                  <option value="">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>

              {/* Messages Lists */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {loadingMessages ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#00ff88', fontFamily: 'monospace' }}>Resolving inbox...</div>
                ) : !messagesData?.messages || messagesData.messages.length === 0 ? (
                  <div style={{ ...cardStyle, padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No submissions found in messages inbox.</div>
                ) : (
                  messagesData.messages.map((msg: any) => (
                    <div key={msg.id} style={{
                      ...cardStyle,
                      borderLeft: msg.isRead ? '1px solid rgba(255,255,255,0.05)' : '3px solid #ffffff',
                      background: msg.isRead ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.02)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.98rem' }}>{msg.name}</span>
                            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>&lt;{msg.email}&gt;</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#00e5ff', marginTop: '0.2rem', fontWeight: 600 }}>{msg.subject}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginRight: '0.5rem' }}>{new Date(msg.createdAt).toLocaleString()}</span>
                          <button onClick={() => handleMessageStatus(msg.id, !msg.isRead)} style={{
                            padding: '0.3rem 0.6rem', borderRadius: '0.3rem', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                            background: msg.isRead ? 'rgba(255,255,255,0.02)' : 'rgba(255, 255, 255, 0.04)',
                            border: msg.isRead ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255, 255, 255, 0.15)',
                            color: msg.isRead ? 'rgba(255,255,255,0.6)' : '#ffffff'
                          }}>{msg.isRead ? 'Mark Unread' : 'Mark Read'}</button>
                          <button onClick={() => handleMessageDelete(msg.id, msg.name)} style={{ padding: '0.3rem', borderRadius: '0.3rem', background: 'rgba(255,95,86,0.05)', border: '1px solid rgba(255,95,86,0.15)', color: '#ff5f56', cursor: 'pointer' }}><Trash2 size={13} /></button>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(226,232,240,0.85)', lineHeight: 1.6, whiteSpace: 'pre-wrap', background: 'rgba(0,0,0,0.15)', padding: '0.85rem', borderRadius: '0.5rem' }}>{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {loadingSettings ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#00ff88', fontFamily: 'monospace' }}>Resolving global settings...</div>
              ) : settings.length === 0 ? (
                <div style={{ ...cardStyle, padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No settings records found in database.</div>
              ) : (
                settings.map((set) => (
                  <div key={set.id} style={cardStyle}>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 800 }}>Setting Key: {set.key}</div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <input
                        defaultValue={set.value}
                        onBlur={(e) => {
                          if (e.target.value !== set.value) {
                            handleSettingSubmit(set.key, e.target.value);
                          }
                        }}
                        placeholder={`Value representation for ${set.key}...`}
                        style={inputStyle}
                      />
                      <button onClick={(e) => {
                        const sibling = (e.currentTarget.previousSibling as HTMLInputElement);
                        if (sibling && sibling.value !== set.value) {
                          handleSettingSubmit(set.key, sibling.value);
                        }
                      }} style={{
                        padding: '0.65rem 1.25rem', borderRadius: '0.5rem', background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)', color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer'
                      }}>Save</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>

      {/* MODAL: USER DETAILS */}
      <AnimatePresence>
        {selectedUser && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ ...cardStyle, maxWidth: '500px', width: '100%', position: 'relative' }}>
              <button onClick={() => setSelectedUser(null)} style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={18} /></button>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', background: '#222' }}>
                  {selectedUser.image ? (
                    <img src={selectedUser.image} alt={selectedUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#ffffff', fontWeight: 800 }}>{selectedUser.name[0]}</div>
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{selectedUser.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>{selectedUser.email || 'No email address'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>OAuth Provider:</span>
                  <span style={{ fontWeight: 700 }}>{selectedUser.provider}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Provider Account ID:</span>
                  <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{selectedUser.providerAccountId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>System Role:</span>
                  <span style={{ color: selectedUser.role === 'ADMIN' ? '#00e5ff' : 'inherit', fontWeight: 800 }}>{selectedUser.role}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Status:</span>
                  <span style={{ color: selectedUser.isDeactivated ? '#ff5f56' : '#10b981', fontWeight: 800 }}>{selectedUser.isDeactivated ? 'Suspended' : 'Active'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Account Created:</span>
                  <span>{new Date(selectedUser.createdAt).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Last Logged In:</span>
                  <span>{new Date(selectedUser.lastLogin).toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                {selectedUser.isDeactivated ? (
                  <button onClick={() => handleUserUpdate(selectedUser.id, selectedUser.name, { isDeactivated: false })} style={{
                    padding: '0.5rem 1rem', borderRadius: '0.4rem', border: 'none', background: '#10b981', color: '#fff', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                  }}>Reactivate</button>
                ) : (
                  <button onClick={() => handleUserUpdate(selectedUser.id, selectedUser.name, { isDeactivated: true })} style={{
                    padding: '0.5rem 1rem', borderRadius: '0.4rem', border: 'none', background: '#ff5f56', color: '#fff', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                  }}>Suspend</button>
                )}
                {selectedUser.role === 'ADMIN' ? (
                  <button onClick={() => handleUserUpdate(selectedUser.id, selectedUser.name, { role: 'USER' })} style={{
                    padding: '0.5rem 1rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                  }}>Demote to User</button>
                ) : (
                  <button onClick={() => handleUserUpdate(selectedUser.id, selectedUser.name, { role: 'ADMIN' })} style={{
                    padding: '0.5rem 1rem', borderRadius: '0.4rem', border: 'none', background: '#00e5ff', color: '#000', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer'
                  }}>Make Admin</button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRMATION DIALOG */}
      <AnimatePresence>
        {confirmDialog && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ ...cardStyle, maxWidth: '400px', width: '100%', textAlign: 'center' }}>
              <ShieldAlert size={48} color="#ff5f56" style={{ marginInline: 'auto', marginBottom: '1.25rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 850, marginBottom: '0.75rem' }}>{confirmDialog.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>{confirmDialog.desc}</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button onClick={() => setConfirmDialog(null)} style={{
                  padding: '0.5rem 1.25rem', borderRadius: '0.4rem', background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)', color: '#eaeaea', fontSize: '0.8rem', cursor: 'pointer'
                }}>No, Cancel</button>
                <button onClick={confirmDialog.onConfirm} style={{
                  padding: '0.5rem 1.25rem', borderRadius: '0.4rem', background: '#ff5f56',
                  color: '#fff', border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer'
                }}>Yes, Confirm</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
