import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { ArrowLeft, Clock, Tag as TagIcon } from 'lucide-react';

export const OpenBookModal: React.FC = () => {
  const { activeChapter, activeEntry, closeToShelf, openEntry } = useAtmosphere();

  // Only show when a chapter is selected and no entry is actively reading
  if (!activeChapter || activeEntry) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backgroundColor: 'rgba(5, 3, 2, 0.88)',
          backdropFilter: 'blur(10px)',
          overflowY: 'auto',
        }}
      >
        {/* Navigation Bar / Return to Shelf */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: '100%',
            maxWidth: '1080px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <button
            onClick={closeToShelf}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(28, 18, 12, 0.85)',
              border: '1px solid #b08d57',
              color: '#f0e3cc',
              padding: '0.45rem 1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffd479';
              e.currentTarget.style.background = 'rgba(45, 28, 18, 0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#b08d57';
              e.currentTarget.style.background = 'rgba(28, 18, 12, 0.85)';
            }}
          >
            <ArrowLeft size={16} color="#d4af37" />
            <span>Return to Bookshelf</span>
          </button>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#8f7e6a',
              letterSpacing: '0.1em',
            }}
          >
            ESC to close • Chapter {activeChapter.order} of 4
          </span>
        </motion.div>

        {/* 3D Opened Book Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, rotateX: 10 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            maxWidth: '1080px',
            minHeight: '620px',
            position: 'relative',
            display: 'flex',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 0, 0, 0.7)',
            borderRadius: '4px',
            background: activeChapter.accentColor,
            padding: '12px',
          }}
        >
          {/* Leather Book Cover Border with Gold Foil Stamp */}
          <div
            style={{
              position: 'absolute',
              inset: '6px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              pointerEvents: 'none',
              borderRadius: '2px',
            }}
          />

          {/* Opened Parchment Spread (Left Page & Right Page) */}
          <div
            className="parchment-sheet"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {/* Center Gutter / Crease Shadow */}
            <div
              className="book-gutter-shadow"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '32px',
                marginLeft: '-16px',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />

            {/* Silk Ribbon Bookmark in Center */}
            <div
              className="silk-ribbon"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '12px',
                height: '110%',
                marginLeft: '-6px',
                zIndex: 15,
                boxShadow: '2px 4px 10px rgba(0,0,0,0.4)',
                pointerEvents: 'none',
              }}
            />

            {/* LEFT PAGE: Title, Mood, Epigraph */}
            <div
              style={{
                flex: 1,
                padding: '3rem 3.25rem 2.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRight: '1px solid rgba(138, 110, 75, 0.25)',
                position: 'relative',
              }}
            >
              <div>
                {/* Volume & Chapter Label */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.85rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#7a5a3a',
                      fontWeight: 700,
                    }}
                  >
                    CHAPTER {activeChapter.order}
                  </span>
                  <span style={{ color: '#a3875a' }}>•</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                      color: '#6e5239',
                    }}
                  >
                    {activeChapter.mood}
                  </span>
                </div>

                {/* Chapter Title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.1rem',
                    lineHeight: 1.2,
                    color: '#2a1a10',
                    margin: '0 0 1.5rem 0',
                    fontWeight: 600,
                  }}
                >
                  {activeChapter.title}
                </h2>

                <div
                  style={{
                    width: '45px',
                    height: '2px',
                    background: '#a37b38',
                    marginBottom: '1.75rem',
                  }}
                />

                {/* Epigraph Block */}
                <div
                  style={{
                    position: 'relative',
                    padding: '1.25rem 1.5rem',
                    background: 'rgba(235, 220, 195, 0.5)',
                    borderLeft: '3px solid #8c672b',
                    margin: '1.5rem 0',
                    boxShadow: 'inset 0 0 10px rgba(140, 103, 43, 0.08)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: '#9e7a3a',
                      lineHeight: 0.5,
                      marginBottom: '0.5rem',
                    }}
                  >
                    “
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.18rem',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      color: '#382619',
                      margin: 0,
                    }}
                  >
                    {activeChapter.epigraph}
                  </p>
                </div>
              </div>

              {/* Bottom Colophon / Leaf Stamp */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(138, 110, 75, 0.25)',
                  paddingTop: '0.85rem',
                  marginTop: '1.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#846e59',
                  }}
                >
                  ARCHIVE ENTRY FOLIO
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    color: '#8c672b',
                  }}
                >
                  ❦
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#846e59',
                  }}
                >
                  p. {activeChapter.order * 24 - 1}
                </span>
              </div>
            </div>

            {/* RIGHT PAGE: Table of Contents & Entries */}
            <div
              style={{
                flex: 1,
                padding: '3rem 3rem 2.5rem 3.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(138, 110, 75, 0.3)',
                    paddingBottom: '0.75rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.88rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#5c4028',
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    Table of Writings
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#7d6752',
                    }}
                  >
                    {activeChapter.entries.length} reflections
                  </span>
                </div>

                {/* Entry List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeChapter.entries.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      onClick={() => openEntry(activeChapter.id, entry.id)}
                      whileHover={{ x: 4 }}
                      style={{
                        padding: '1rem 1.15rem',
                        background: 'rgba(255, 250, 240, 0.65)',
                        border: '1px solid rgba(160, 130, 90, 0.35)',
                        borderRadius: '1px',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease, border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.currentTarget.style.borderColor = '#8c672b';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 250, 240, 0.65)';
                        e.currentTarget.style.borderColor = 'rgba(160, 130, 90, 0.35)';
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '0.35rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#846e59',
                          }}
                        >
                          ENTRY 0{idx + 1} • {entry.dateWritten}
                        </span>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#8c672b',
                          }}
                        >
                          <Clock size={11} />
                          <span>{entry.readingTime} min</span>
                        </div>
                      </div>

                      <h4
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.3rem',
                          color: '#2a1a10',
                          margin: '0 0 0.4rem 0',
                          fontWeight: 600,
                        }}
                      >
                        {entry.title}
                      </h4>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          fontStyle: 'italic',
                          color: '#5e4c3b',
                          margin: '0 0 0.65rem 0',
                          lineHeight: 1.4,
                        }}
                      >
                        “{entry.oneLineLesson}”
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {entry.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '2px 6px',
                              background: 'rgba(140, 103, 43, 0.1)',
                              border: '1px solid rgba(140, 103, 43, 0.25)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: '#593f24',
                            }}
                          >
                            <TagIcon size={9} />
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Right Page Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(138, 110, 75, 0.25)',
                  paddingTop: '0.85rem',
                  marginTop: '1.5rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#846e59',
                  }}
                >
                  CLICK ENTRY TO READ
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#846e59',
                  }}
                >
                  p. {activeChapter.order * 24}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
