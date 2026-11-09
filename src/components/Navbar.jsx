import React from 'react';
import { Trophy, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem 2rem',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(5, 11, 20, 0.75)',
      borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
        }}>
          <Shield size={20} color="#ffffff" />
        </div>
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            RUTVIK FC
          </div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.1em' }}>
            BIRTHDAY MATCH EDITION
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.9rem',
        borderRadius: '9999px',
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        color: '#fbbf24',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.05em'
      }}>
        <Trophy size={15} />
        <span>SPECIAL EDITION</span>
      </div>
    </header>
  );
}

