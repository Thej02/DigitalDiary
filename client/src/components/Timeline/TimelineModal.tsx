import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { initialBook } from '../../data/libraryData';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';

export const TimelineModal: React.FC = () => {
  const { isTimelineOpen, setTimelineOpen, openEntry } = useAtmosphere();

  // Sort all entries chronologically by dateWritten
  const sortedEntries = useMemo(() => {
    const list = initialBook.chapters.flatMap((chap) =>
      chap.entries.map((entry) => ({
        ...entry,
        chapterTitle: chap.title,
        chapterOrder: chap.order,
      }))
    );
    return list.sort((a, b) => new Date(a.dateWritten).getTime() - new Date(b.dateWritten).getTime());
  }, []);

  if (!isTimelineOpen) return null;

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
          backgroundColor: 'rgba(6, 4, 3, 0.92)',
          backdropFilter: 'blur(10px)',
          overflowY: 'auto',
        }}
        onClick={() => setTimelineOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '820px',
            maxHeight: '85vh',
            background: 'linear-gradient(180deg, #22160f 0%, #150d07 100%)',
            border: '2px solid #8f6f36',
            boxShadow: '0 25px 70px rgba(0,0,0,0.95), inset 0 0 30px rgba(0,0,0,0.8)',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Timeline Header */}
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
              <Calendar size={18} color="#d4af37" />
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
                  Archival Chronicle
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#9e8971',
                  }}
                >
                  Chronological record of writings across the seasons
                </span>
              </div>
            </div>

            <button
              onClick={() => setTimelineOpen(false)}
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

          {/* Timeline Ribbon Spine & Nodes */}
          <div
            style={{
              padding: '2.5rem 2rem',
              overflowY: 'auto',
              flex: 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Center Vertical Ribbon Line */}
            <div
              style={{
                position: 'absolute',
                top: '2rem',
                bottom: '2rem',
                left: '42px',
                width: '3px',
                background: 'linear-gradient(180deg, #aa842b 0%, #5a3d1c 100%)',
                boxShadow: '0 0 6px rgba(212, 175, 55, 0.4)',
              }}
            />

            {sortedEntries.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.75rem',
                  position: 'relative',
                }}
              >
                {/* Timeline Wax Stamp Node */}
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #d4af37 0%, #7d591c 100%)',
                    border: '2px solid #241710',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#211306',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    zIndex: 2,
                    flexShrink: 0,
                    marginTop: '4px',
                  }}
                >
                  {idx + 1}
                </div>

                {/* Entry Card */}
                <div
                  onClick={() => {
                    openEntry(item.chapterId, item.id);
                    setTimelineOpen(false);
                  }}
                  className="parchment-sheet"
                  style={{
                    flex: 1,
                    padding: '1.25rem 1.6rem',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.4rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#6e543c',
                        fontWeight: 700,
                      }}
                    >
                      {item.dateWritten} • {item.chapterTitle}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#8c672b',
                      }}
                    >
                      <Clock size={11} /> {item.readingTime} min
                    </div>
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      color: '#2a1a10',
                      margin: '0 0 0.35rem 0',
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.96rem',
                      fontStyle: 'italic',
                      color: '#5e4835',
                      margin: '0 0 0.85rem 0',
                    }}
                  >
                    “{item.oneLineLesson}”
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(138, 110, 75, 0.25)',
                      paddingTop: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: '1px 6px',
                            background: 'rgba(140, 103, 43, 0.12)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            color: '#543b22',
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        color: '#8c672b',
                        fontWeight: 600,
                      }}
                    >
                      <span>Read</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
