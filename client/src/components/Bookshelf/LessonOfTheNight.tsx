import React, { useState, useEffect } from 'react';
import { initialBook } from '../../data/libraryData';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const LessonOfTheNight: React.FC = () => {
  const { openEntry, playPageTurn } = useAtmosphere();

  // Flatten all entries
  const allEntries = initialBook.chapters.flatMap((c) =>
    c.entries.map((e) => ({ ...e, chapterTitle: c.title, chapterMood: c.mood }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Pick random on initial load
    const rand = Math.floor(Math.random() * allEntries.length);
    setCurrentIndex(rand);
  }, [allEntries.length]);

  const handleNext = () => {
    playPageTurn();
    setCurrentIndex((prev) => (prev + 1) % allEntries.length);
  };

  const current = allEntries[currentIndex];
  if (!current) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        maxWidth: '840px',
        width: '100%',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}
      aria-label="Lesson of the Night"
    >
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #1c130d 0%, #120b07 100%)',
          border: '1px solid #947133',
          boxShadow: 
            'inset 0 0 25px rgba(0, 0, 0, 0.9), 0 16px 36px rgba(0, 0, 0, 0.85), 0 0 1px rgba(255, 215, 120, 0.25)',
          padding: '1.75rem 2.25rem',
          borderRadius: '2px',
        }}
      >
        {/* Brass Plate Screws in 4 Corners */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
          <div
            key={corner}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #f0d075 0%, #8a6a24 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.8)',
              top: corner.includes('top') ? '10px' : 'auto',
              bottom: corner.includes('bottom') ? '10px' : 'auto',
              left: corner.includes('left') ? '10px' : 'auto',
              right: corner.includes('right') ? '10px' : 'auto',
            }}
          />
        ))}

        {/* Header Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(176, 141, 87, 0.25)',
            paddingBottom: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={14} color="#d4af37" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#d4af37',
                fontWeight: 700,
              }}
            >
              Lesson of the Night
            </span>
          </div>

          <button
            onClick={handleNext}
            title="Summon another reflection from the shelf"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#a38f7a',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e6c885')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a38f7a')}
          >
            <RotateCcw size={12} />
            <span>Another Reflection</span>
          </button>
        </div>

        {/* The One-Line Lesson */}
        <blockquote
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            lineHeight: 1.45,
            color: '#f5ead5',
            margin: '0 0 1.25rem 0',
            textShadow: '0 1px 3px rgba(0,0,0,0.85)',
          }}
        >
          “{current.oneLineLesson}”
        </blockquote>

        {/* Source Entry & Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#d4af37',
                letterSpacing: '0.05em',
              }}
            >
              {current.chapterTitle}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: '#bfae99',
              }}
            >
              Entry: {current.title} • {current.readingTime} min reflection
            </div>
          </div>

          <button
            onClick={() => openEntry(current.chapterId, current.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(180deg, #3d2618 0%, #29180e 100%)',
              border: '1px solid #b08d57',
              color: '#f9f1e1',
              padding: '0.5rem 1.1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffd479';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#b08d57';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Read Reflection</span>
            <ArrowRight size={14} color="#ffd479" />
          </button>
        </div>
      </div>
    </motion.section>
  );
};
