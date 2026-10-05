import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { X, Lock, Key, Feather, Palette, CheckCircle2 } from 'lucide-react';

export const AdminPreviewModal: React.FC = () => {
  const { isAdminOpen, setAdminOpen } = useAtmosphere();
  const [activeTab, setActiveTab] = useState<'overview' | 'editor' | 'spine'>('overview');

  if (!isAdminOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backgroundColor: 'rgba(6, 4, 3, 0.93)',
          backdropFilter: 'blur(10px)',
          overflowY: 'auto',
        }}
        onClick={() => setAdminOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '840px',
            maxHeight: '85vh',
            background: 'linear-gradient(180deg, #24160e 0%, #150c07 100%)',
            border: '2px solid #8f6f36',
            boxShadow: '0 25px 70px rgba(0,0,0,0.95), inset 0 0 30px rgba(0,0,0,0.8)',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Admin Header */}
          <div
            style={{
              padding: '1.25rem 2rem',
              borderBottom: '2px solid #3d2616',
              background: 'linear-gradient(180deg, #321e12 0%, #1d1109 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Lock size={18} color="#d4af37" />
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#f0dfc0',
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  The Scribe's Private Study (Admin)
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#9e8971',
                  }}
                >
                  Stage 3 CMS Architecture • Protected Authentication & Authoring
                </span>
              </div>
            </div>

            <button
              onClick={() => setAdminOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#a8947e',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f5e4c4')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#a8947e')}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid rgba(143, 111, 54, 0.3)',
              background: 'rgba(20, 12, 7, 0.8)',
            }}
          >
            {[
              { id: 'overview', label: 'Architecture & Auth', icon: Key },
              { id: 'editor', label: 'Markdown Authoring Desk', icon: Feather },
              { id: 'spine', label: 'Leather & Foil Customizer', icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1rem',
                    background: isActive ? 'rgba(56, 35, 21, 0.85)' : 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #d4af37' : '2px solid transparent',
                    color: isActive ? '#f5ead5' : '#8f7d6a',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={14} color={isActive ? '#d4af37' : '#8f7d6a'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, color: '#e5d7be' }}>
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div
                  style={{
                    background: 'rgba(35, 22, 14, 0.6)',
                    border: '1px solid rgba(176, 141, 87, 0.3)',
                    padding: '1.25rem',
                    borderRadius: '2px',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.88rem',
                      color: '#d4af37',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    Stage 3 Backend Authentication Pipeline
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                      color: '#cbb69d',
                      margin: 0,
                    }}
                  >
                    The private admin panel will be secured using JWT tokens issued by Express backend (Node.js + PostgreSQL + Prisma ORM). Only authenticated requests carrying the bearer token will have write, delete, and reorder permissions.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {[
                    { title: 'Chapter Management', desc: 'Add new volumes, write epigraphs, configure leather tones and spine widths.' },
                    { title: 'Draft / Publish Switch', desc: 'Keep raw unfinished musings hidden in the dark until ready for public display.' },
                    { title: 'Tactile Drag & Drop', desc: 'Reorder chapters on the shelf and entries inside each volume.' },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      style={{
                        padding: '1rem',
                        background: 'rgba(25, 15, 10, 0.7)',
                        border: '1px solid rgba(138, 110, 75, 0.25)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#d4af37', marginBottom: '0.4rem' }}>
                        <CheckCircle2 size={15} />
                        <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>{feature.title}</strong>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#9e8971', margin: 0 }}>
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.05rem',
                    color: '#cbb69d',
                    margin: 0,
                  }}
                >
                  The Scribe's Writing Desk features split-screen Markdown authoring with live parchment preview, instant reading-time calculation, and auto-lesson extraction.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    height: '240px',
                  }}
                >
                  {/* Mock Raw Markdown Editor */}
                  <div
                    style={{
                      background: '#0d0805',
                      border: '1px solid #4a3421',
                      padding: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: '#c4ad8d',
                      overflowY: 'auto',
                    }}
                  >
                    <span style={{ color: '#8c6e48' }}># Draft Entry</span>
                    <br /><br />
                    ### The Cost of Postponement
                    <br /><br />
                    We measure our lives by the dates we circle in red ink...
                    <br /><br />
                    &gt; *"The hour that is given away to vanity cannot be repurchased."*
                  </div>

                  {/* Mock Live Parchment Render */}
                  <div
                    className="parchment-sheet"
                    style={{
                      padding: '1rem',
                      overflowY: 'auto',
                    }}
                  >
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '0 0 0.5rem', color: '#24140b' }}>
                      The Cost of Postponement
                    </h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: '#382619', margin: 0 }}>
                      We measure our lives by the dates we circle in red ink...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'spine' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.05rem',
                    color: '#cbb69d',
                    margin: 0,
                  }}
                >
                  Customize how each volume appears on the bookshelf: leather tone, spine thickness, height, raised band count, and metallic foil reflection.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {[
                    { name: 'Oxblood Calfskin', color: '#5a1a1f' },
                    { name: 'Forest Bookcloth', color: '#1f2d24' },
                    { name: 'Antique Walnut', color: '#2b1b12' },
                    { name: 'Midnight Navy', color: '#171c26' },
                  ].map((tone) => (
                    <div
                      key={tone.name}
                      style={{
                        padding: '0.75rem 1rem',
                        background: tone.color,
                        border: '1px solid #d4af37',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                      }}
                    >
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d4af37' }} />
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: '#f5ead5' }}>
                        {tone.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div
            style={{
              padding: '1rem 2rem',
              borderTop: '1px solid #3d2616',
              background: '#120b06',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#8c775d',
              }}
            >
              Stage 1 (Frontend UI) Active • Stage 2 (API/Database) Pending Your Confirmation
            </span>
            <button
              onClick={() => setAdminOpen(false)}
              style={{
                background: '#8f6f36',
                border: 'none',
                color: '#1a1006',
                padding: '0.35rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Close Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
