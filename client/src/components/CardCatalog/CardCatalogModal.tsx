import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { initialBook } from '../../data/libraryData';
import { Search, X, Clock, ArrowRight } from 'lucide-react';

export const CardCatalogModal: React.FC = () => {
  const { isCatalogOpen, setCatalogOpen, openEntry } = useAtmosphere();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Flatten all entries with chapter metadata
  const allEntries = useMemo(() => {
    return initialBook.chapters.flatMap((chap) =>
      chap.entries.map((entry) => ({
        ...entry,
        chapterTitle: chap.title,
        chapterOrder: chap.order,
        chapterMood: chap.mood,
      }))
    );
  }, []);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    allEntries.forEach((e) => e.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [allEntries]);

  // Filter entries by search term and active tag
  const filtered = useMemo(() => {
    return allEntries.filter((item) => {
      const matchSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.oneLineLesson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTag = !activeTag || item.tags.includes(activeTag);

      return matchSearch && matchTag;
    });
  }, [allEntries, searchTerm, activeTag]);

  if (!isCatalogOpen) return null;

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
        onClick={() => setCatalogOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '860px',
            maxHeight: '85vh',
            background: 'linear-gradient(180deg, #241710 0%, #170e08 100%)',
            border: '2px solid #8f6f36',
            boxShadow: '0 25px 70px rgba(0,0,0,0.95), inset 0 0 30px rgba(0,0,0,0.8)',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Wooden Drawer Header with Brass Pull Handle */}
          <div
            style={{
              padding: '1.5rem 2rem 1.25rem',
              borderBottom: '2px solid #3d2616',
              background: 'linear-gradient(180deg, #352115 0%, #20130a 100%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
            }}
          >
            {/* Top Bar with Brass Plaque & Close */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Brass Card Catalog Plaque */}
              <div
                className="brass-handle"
                style={{
                  padding: '4px 18px',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#301e06' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.78rem',
                    color: '#211406',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                  }}
                >
                  DRAWER VII • SUBJECT INDEX & CATALOG
                </span>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#301e06' }} />
              </div>

              <button
                onClick={() => setCatalogOpen(false)}
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

            {/* Typewriter Search Input */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search
                size={18}
                color="#b08d57"
                style={{ position: 'absolute', left: '16px', pointerEvents: 'none' }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type title, life lesson, or contemplation keyword..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 3rem',
                  background: '#130c07',
                  border: '1px solid #75552b',
                  color: '#f5ead5',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  borderRadius: '1px',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    background: 'none',
                    border: 'none',
                    color: '#8f7e6a',
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Tag Filter Pills */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#a38d72',
                  marginRight: '4px',
                }}
              >
                FILTER TAG:
              </span>
              <button
                onClick={() => setActiveTag(null)}
                style={{
                  padding: '3px 10px',
                  background: activeTag === null ? '#b08d57' : 'rgba(38, 25, 17, 0.7)',
                  color: activeTag === null ? '#1a1007' : '#c7b49d',
                  border: '1px solid #75552b',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: activeTag === null ? 700 : 400,
                  cursor: 'pointer',
                }}
              >
                All Index Cards
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  style={{
                    padding: '3px 10px',
                    background: activeTag === tag ? '#b08d57' : 'rgba(38, 25, 17, 0.7)',
                    color: activeTag === tag ? '#1a1007' : '#c7b49d',
                    border: '1px solid #75552b',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: activeTag === tag ? 700 : 400,
                    cursor: 'pointer',
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results: Vintage Library Index Cards Stack */}
          <div
            style={{
              padding: '1.5rem 2rem',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              background: '#100a06',
            }}
          >
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  color: '#846e59',
                }}
              >
                No library card was found under these parameters. Try a different query.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    openEntry(item.chapterId, item.id);
                    setCatalogOpen(false);
                  }}
                  className="parchment-sheet"
                  style={{
                    padding: '1.25rem 1.6rem',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Red/Blue Catalog Top Stamped Line */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #b54747',
                      paddingBottom: '0.35rem',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#702222',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                      }}
                    >
                      CALL NO. FOLIO-{item.chapterOrder}.0{item.order}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#423326',
                      }}
                    >
                      <span>STAMPED: {item.dateWritten}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={11} /> {item.readingTime}m
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.45rem',
                          color: '#24140b',
                          margin: '0 0 0.35rem 0',
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1rem',
                          fontStyle: 'italic',
                          color: '#5e4835',
                          margin: '0 0 0.75rem 0',
                        }}
                      >
                        “{item.oneLineLesson}”
                      </p>
                    </div>

                    <ArrowRight size={18} color="#8c672b" style={{ flexShrink: 0, marginTop: '4px' }} />
                  </div>

                  {/* Card Bottom Meta */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(138, 110, 75, 0.25)',
                      paddingTop: '0.5rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: '#7a6450',
                      }}
                    >
                      {item.chapterTitle}
                    </span>

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
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
