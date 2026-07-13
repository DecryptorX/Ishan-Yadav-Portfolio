import React from 'react';

export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#09090b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      color: '#00ff88',
      fontSize: '0.9rem',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <span style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '2px solid rgba(0, 255, 136, 0.2)',
          borderTopColor: '#00ff88',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span>Decrypting secure route context...</span>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
