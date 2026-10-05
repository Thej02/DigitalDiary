import React from 'react';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { Flame, Lamp, Volume2, VolumeX, Search, Clock, Key } from 'lucide-react';

export const HeaderBar: React.FC = () => {
  const {
    mode,
    toggleMode,
    isMuted,
    toggleMute,
    setCatalogOpen,
    setTimelineOpen,
    setAdminOpen,
  } = useAtmosphere();

  return (
    <header
      style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
        background: 'linear-gradient(180deg, rgba(16, 12, 9, 0.92) 0%, rgba(10, 8, 6, 0.6) 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Ex Libris Monogram Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            border: '1px solid #b08d57',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, #2b1b12 0%, #150d08 100%)',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: '#d4af37',
              fontWeight: 700,
            }}
          >
            ❦
          </span>
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              letterSpacing: '0.22em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#d4af37',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)',
              margin: 0,
            }}
          >
            The Private Folio
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#8c7d6b',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            Reflections & Lessons at Midnight
          </p>
        </div>
      </div>

      {/* Atmospheric Controls & Modals */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        {/* Card Catalog Button */}
        <button
          onClick={() => setCatalogOpen(true)}
          title="Search the Card Catalog"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(38, 25, 17, 0.7)',
            border: '1px solid rgba(176, 141, 87, 0.35)',
            color: '#e5d7be',
            padding: '0.45rem 0.85rem',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#d4af37';
            e.currentTarget.style.background = 'rgba(55, 36, 24, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(176, 141, 87, 0.35)';
            e.currentTarget.style.background = 'rgba(38, 25, 17, 0.7)';
          }}
        >
          <Search size={14} color="#d4af37" />
          <span>Card Catalog</span>
        </button>

        {/* Timeline Chronicle Button */}
        <button
          onClick={() => setTimelineOpen(true)}
          title="View Archival Timeline"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(38, 25, 17, 0.7)',
            border: '1px solid rgba(176, 141, 87, 0.35)',
            color: '#e5d7be',
            padding: '0.45rem 0.85rem',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#d4af37';
            e.currentTarget.style.background = 'rgba(55, 36, 24, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(176, 141, 87, 0.35)';
            e.currentTarget.style.background = 'rgba(38, 25, 17, 0.7)';
          }}
        >
          <Clock size={14} color="#d4af37" />
          <span>Chronicle</span>
        </button>

        {/* Lamp / Candlelight Toggle */}
        <button
          onClick={toggleMode}
          title={`Switch to ${mode === 'lamp' ? 'Candlelight' : 'Lamp'} mode`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: mode === 'candlelight' ? 'rgba(65, 25, 15, 0.8)' : 'rgba(45, 30, 18, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            color: '#f0e0c0',
            padding: '0.45rem 0.85rem',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
          }}
        >
          {mode === 'lamp' ? (
            <>
              <Lamp size={15} color="#ffd479" />
              <span>Lamp On</span>
            </>
          ) : (
            <>
              <Flame size={15} color="#ff9e42" />
              <span>Candlelight</span>
            </>
          )}
        </button>

        {/* Ambient Sound Toggle */}
        <button
          onClick={toggleMute}
          title={isMuted ? 'Turn on subtle room tone & page turns' : 'Mute room tone'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(38, 25, 17, 0.7)',
            border: '1px solid rgba(176, 141, 87, 0.35)',
            color: isMuted ? '#8c7d6b' : '#d4af37',
            padding: '0.45rem 0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {isMuted ? 'Muted' : 'Room Tone'}
          </span>
        </button>

        {/* Admin Scribe Study */}
        <button
          onClick={() => setAdminOpen(true)}
          title="Admin Scribe Portal (Stage 3)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(24, 15, 10, 0.85)',
            border: '1px dashed rgba(176, 141, 87, 0.4)',
            color: '#b08d57',
            padding: '0.45rem 0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#e6c885';
            e.currentTarget.style.borderColor = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#b08d57';
            e.currentTarget.style.borderColor = 'rgba(176, 141, 87, 0.4)';
          }}
        >
          <Key size={13} />
          <span>Scribe Study</span>
        </button>
      </div>
    </header>
  );
};
