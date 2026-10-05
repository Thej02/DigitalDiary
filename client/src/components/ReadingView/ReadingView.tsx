import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { ArrowLeft, Clock, Bookmark, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export const ReadingView: React.FC = () => {
  const { activeChapter, activeEntry, closeToChapter, closeToShelf, openEntry } = useAtmosphere();
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((scrollTop / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeEntry]);

  // Reset scroll on entry change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeEntry?.id]);

  if (!activeChapter || !activeEntry) return null;

  // Next / Previous entry navigation within chapter or cross-chapter
  const currentEntries = activeChapter.entries;
  const currentIndex = currentEntries.findIndex((e) => e.id === activeEntry.id);
  const prevEntry = currentIndex > 0 ? currentEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < currentEntries.length - 1 ? currentEntries[currentIndex + 1] : null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(7, 5, 3, 0.95)',
        backdropFilter: 'blur(12px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Antique Gold Filament Reading Progress Indicator */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          zIndex: 60,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #aa842b 0%, #d4af37 60%, #fff2be 100%)',
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.8)',
            transition: 'width 0.1s ease-out',
          }}
        />
      </div>

      {/* Reader Floating Navigation Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 55,
          width: '100%',
          maxWidth: '860px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          background: 'linear-gradient(180deg, rgba(14, 10, 7, 0.95) 0%, rgba(14, 10, 7, 0.7) 100%)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(176, 141, 87, 0.2)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={closeToChapter}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(38, 25, 17, 0.8)',
              border: '1px solid #b08d57',
              color: '#f0e3cc',
              padding: '0.4rem 0.85rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ffd479')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#b08d57')}
          >
            <ArrowLeft size={14} color="#d4af37" />
            <span>Table of Contents</span>
          </button>

          <button
            onClick={closeToShelf}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: 'none',
              color: '#a8947d',
              padding: '0.4rem 0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e6c885')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a8947d')}
          >
            <BookOpen size={13} />
            <span>Close to Shelf</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#9e8971',
            }}
          >
            {Math.round(scrollProgress)}% read
          </span>
        </div>
      </div>

      {/* Main Aged Parchment Reading Sheet */}
      <motion.article
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="parchment-sheet"
        style={{
          width: '100%',
          maxWidth: '780px',
          margin: '0 auto 4rem',
          padding: '4rem 4.5rem 5rem',
          borderRadius: '3px',
          position: 'relative',
        }}
      >
        {/* Subtle Silk Ribbon draped down top right */}
        <div
          className="silk-ribbon"
          style={{
            position: 'absolute',
            top: 0,
            right: '48px',
            width: '18px',
            height: '75px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
        />

        {/* Chapter & Date Metadata Header */}
        <header
          style={{
            borderBottom: '1px solid rgba(138, 110, 75, 0.35)',
            paddingBottom: '1.75rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.65rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
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
              {activeChapter.title}
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#6e543c',
              }}
            >
              <span>{activeEntry.dateWritten}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={12} color="#8c672b" />
                {activeEntry.readingTime} min read
              </span>
            </div>
          </div>

          {/* Essay Title */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.75rem',
              lineHeight: 1.18,
              color: '#24140b',
              margin: '0.5rem 0 1rem 0',
              fontWeight: 600,
              textShadow: '0 1px 1px rgba(255,255,255,0.4)',
            }}
          >
            {activeEntry.title}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: '#644f3b',
              margin: 0,
            }}
          >
            Reflections under the theme of {activeChapter.mood.toLowerCase()}
          </div>
        </header>

        {/* Entry Body with Drop Cap on First Paragraph */}
        <div
          className="reading-prose drop-cap"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.24rem',
            lineHeight: 1.82,
            color: '#1d1712',
          }}
        >
          <ReactMarkdown
            components={{
              h3: ({ children }) => (
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.65rem',
                    color: '#2a1a10',
                    margin: '2.5rem 0 1rem',
                    fontWeight: 600,
                    borderBottom: '1px solid rgba(138, 110, 75, 0.25)',
                    paddingBottom: '0.35rem',
                  }}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p
                  style={{
                    marginBottom: '1.6rem',
                    textAlign: 'justify',
                  }}
                >
                  {children}
                </p>
              ),
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: '3px solid #8c672b',
                    background: 'rgba(235, 220, 195, 0.45)',
                    padding: '1rem 1.5rem',
                    margin: '2rem 0',
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    color: '#342215',
                    boxShadow: 'inset 0 0 10px rgba(140, 103, 43, 0.06)',
                  }}
                >
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul
                  style={{
                    paddingLeft: '1.8rem',
                    marginBottom: '1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li
                  style={{
                    color: '#2b1b11',
                    fontSize: '1.18rem',
                  }}
                >
                  {children}
                </li>
              ),
            }}
          >
            {activeEntry.body}
          </ReactMarkdown>
        </div>

        {/* Embossed Leather / Parchment Lesson Bookmark Card */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '2rem',
            position: 'relative',
            background: 'linear-gradient(135deg, #24140e 0%, #150b07 100%)',
            border: '2px solid #b08d57',
            boxShadow: '0 12px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)',
            borderRadius: '2px',
            color: '#f5ead5',
          }}
        >
          {/* Bookmark Top Rib / Accent */}
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#b08d57',
              color: '#1a1009',
              padding: '2px 14px',
              borderRadius: '2px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
            }}
          >
            THE LESSON
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              color: '#d4af37',
            }}
          >
            <Bookmark size={16} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                opacity: 0.9,
              }}
            >
              Principle Inscribed
            </span>
          </div>

          <blockquote
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: 1.5,
              color: '#fdf3de',
              margin: '0 0 1.25rem 0',
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}
          >
            “{activeEntry.oneLineLesson}”
          </blockquote>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(176, 141, 87, 0.3)',
              paddingTop: '0.75rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {activeEntry.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '2px 8px',
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#ffd980',
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#8c775d',
                letterSpacing: '0.08em',
              }}
            >
              FOLIO REF: {activeChapter.id}-{activeEntry.id}
            </span>
          </div>
        </div>

        {/* Bottom Pagination & Adjacent Entries */}
        <footer
          style={{
            marginTop: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(138, 110, 75, 0.35)',
            paddingTop: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {prevEntry ? (
            <button
              onClick={() => openEntry(activeChapter.id, prevEntry.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'transparent',
                border: 'none',
                color: '#5c4129',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
              <span>Prior: {prevEntry.title}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={closeToChapter}
            style={{
              padding: '0.4rem 1rem',
              background: 'rgba(138, 110, 75, 0.15)',
              border: '1px solid rgba(138, 110, 75, 0.4)',
              color: '#3e2a1a',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            Table of Contents
          </button>

          {nextEntry ? (
            <button
              onClick={() => openEntry(activeChapter.id, nextEntry.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'transparent',
                border: 'none',
                color: '#5c4129',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              <span>Next: {nextEntry.title}</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <div />
          )}
        </footer>
      </motion.article>
    </div>
  );
};
