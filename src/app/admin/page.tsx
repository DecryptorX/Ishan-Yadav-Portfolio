import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions, isOwner } from '../../lib/auth';
import { getAllVisitors, getStats } from '../../lib/store';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // If not authenticated, redirect to login page
  if (!session?.user) {
    redirect('/login');
  }

  // If authenticated but not whitelisted owner/administrator
  if (!isOwner(session.user.id)) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#09090b', position: 'relative', overflow: 'hidden' }}>
        {/* Background glows */}
        <div aria-hidden style={{ position: 'absolute', top: '30%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)', filter: 'blur(35px)', pointerEvents: 'none' }} />
        
        <div style={{
          background: 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(239, 68, 68, 0.15)',
          borderRadius: '1.5rem',
          padding: '3rem 2rem',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.03)',
        }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ff5f56', lineHeight: 1, marginBottom: '0.5rem' }}>403</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>Access Denied</h1>
          <p style={{ color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2.25rem' }}>
            You are authenticated, but this account does not have administrator privileges.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <a href="/" style={{
              padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.85rem',
              background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            >
              Return Home
            </a>
            <form action="/api/auth/signout" method="POST">
              <button type="submit" style={{
                padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.85rem',
                background: '#ff5f56', color: '#fff', border: 'none',
                boxShadow: '0 0 15px rgba(255,95,86,0.2)', cursor: 'pointer', transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const visitors = getAllVisitors();
  const stats = getStats();

  const th: React.CSSProperties = {
    padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem',
    fontWeight: 800, color: 'rgba(148,163,184,0.5)', letterSpacing: '0.08em',
    textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)',
  };
  const td: React.CSSProperties = {
    padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'rgba(226,232,240,0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.04)', verticalAlign: 'middle',
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '1.25rem',
    padding: '1.75rem',
    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Owner Administration</p>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.04em' }}>Visitor Intelligence</h1>
            <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.88rem', marginTop: '0.3rem' }}>Logged in as {session.user.name}</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" style={{
              padding: '0.6rem 1.4rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(226,232,240,0.85)', fontSize: '0.82rem',
              cursor: 'pointer', fontWeight: 800, transition: 'all 0.2s'
            }}>Sign Out</button>
          </form>
        </div>

        {/* Top metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { label: 'Total Visitors', value: stats.total, color: '#00ff88' },
            { label: 'Anonymous Hits', value: stats.anonymous, color: '#00e5ff' },
            { label: 'OAuth Sign-Ins', value: stats.linkedin, color: '#0a66c2' },
            { label: 'Contact Submits', value: stats.form, color: '#ec4899' },
            { label: 'Total Logs Hits', value: stats.totalEvents, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ ...cardStyle, padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 850, color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.55)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Telemetry Visual Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Most Visited Pages */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.5rem' }}>📄 Page views Breakdown</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {stats.pages.length === 0 ? (
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>No page hits registered yet.</div>
              ) : (
                stats.pages.sort((a,b) => b.count - a.count).map(p => {
                  const max = Math.max(...stats.pages.map(x => x.count), 1);
                  const pct = Math.min((p.count / max) * 100, 100);
                  return (
                    <div key={p.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontFamily: 'monospace', color: '#00e5ff' }}>{p.name}</span>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>{p.count} views</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: '#00e5ff' }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Browser / Device share */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.5rem' }}>💻 User Systems Telemetry</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>Device Type</div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>🖥️ Desktop: <span style={{ color: '#00ff88', fontWeight: 700 }}>{stats.devices.desktop}</span></div>
                  <div>📱 Mobile: <span style={{ color: '#ec4899', fontWeight: 700 }}>{stats.devices.mobile}</span></div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>Browsers</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {stats.browsers.map(b => (
                    <div key={b.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: 'rgba(226,232,240,0.85)' }}>{b.name}</span>
                      <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>{b.count} hits</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Referral & Geography */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.5rem' }}>🌍 Traffic Sources &amp; Geolocation</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>Referrers</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem' }}>
                  {stats.referrers.slice(0, 5).map(r => (
                    <div key={r.name} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={r.name}>
                      🌐 {r.name === 'Direct' ? 'Direct visit' : r.name.split('/')[2] || r.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>Country Code</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                  {stats.countries.map(c => (
                    <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>📍 {c.name}</span>
                      <span style={{ fontWeight: 700, color: '#00e5ff' }}>{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Visitors Table */}
        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem 1.75rem 0.5rem' }}>
            <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>Live Sessions Log ({visitors.length})</h2>
          </div>
          
          {visitors.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'rgba(148,163,184,0.4)', fontSize: '0.9rem' }}>
              No visitors yet. Share your resume link to audit session telemetry.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.01)' }}>
                    <th style={th}>#</th>
                    <th style={th}>Visitor Profile</th>
                    <th style={th}>Email</th>
                    <th style={th}>Origin / Source</th>
                    <th style={th}>Device / OS</th>
                    <th style={th}>Resolution</th>
                    <th style={th}>Date</th>
                    <th style={th}>Access Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v, idx) => (
                    <tr key={v.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ ...td, color: 'rgba(148,163,184,0.4)', fontSize: '0.75rem' }}>{idx + 1}</td>
                      <td style={td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          {v.linkedinImage && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={v.linkedinImage} alt={v.name} width={26} height={26} style={{ borderRadius: '50%', flexShrink: 0 }} />
                          )}
                          <div>
                            <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{v.name}</div>
                            <span style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.45)', fontFamily: 'monospace' }}>IP: {v.ip?.split(',')[0] || '127.0.0.1'}</span>
                          </div>
                        </div>
                      </td>
                      <td style={td}>{v.email.includes('@portfolio.local') ? '— (Anon)' : v.email}</td>
                      <td style={td}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <span style={{
                            padding: '0.15rem 0.55rem', borderRadius: 6, fontSize: '0.68rem', fontWeight: 800, width: 'fit-content',
                            background: v.source === 'linkedin' ? 'rgba(10,102,194,0.12)' : v.source === 'form' ? 'rgba(236,72,153,0.12)' : 'rgba(0,255,136,0.12)',
                            color: v.source === 'linkedin' ? '#60a5fa' : v.source === 'form' ? '#ec4899' : '#00ff88',
                          }}>
                            {v.source}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.5)' }}>📍 Country: {v.country || 'IN'}</span>
                        </div>
                      </td>
                      <td style={td}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span>{v.device === 'mobile' ? '📱 Mobile' : '🖥️ Desktop'}</span>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>{v.os} ({v.browser})</span>
                        </div>
                      </td>
                      <td style={{ ...td, fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(148,163,184,0.5)' }}>
                        {v.resolution || '—'}
                      </td>
                      <td style={{ ...td, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        {new Date(v.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={td}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '72px', overflowY: 'auto' }}>
                          {v.events.length === 0 ? (
                            <span style={{ color: 'rgba(148,163,184,0.35)', fontSize: '0.75rem' }}>No page actions</span>
                          ) : v.events.map((ev, ei) => (
                            <span key={ei} style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.7)', display: 'block' }}>
                              <span style={{ color: '#00ff88' }}>{ev.action}</span>: <span style={{ fontFamily: 'monospace' }}>{ev.page}</span>
                              <span style={{ color: 'rgba(148,163,184,0.35)', marginLeft: '0.3rem' }}>
                                {new Date(ev.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
