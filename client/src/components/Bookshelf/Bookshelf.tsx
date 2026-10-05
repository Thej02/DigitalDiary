import React from 'react';
import { initialBook } from '../../data/libraryData';
import { BookSpine } from './BookSpine';
import { LessonOfTheNight } from './LessonOfTheNight';
import { motion } from 'framer-motion';

export const Bookshelf: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem 1rem 4rem',
        position: 'relative',
        zIndex: 12,
      }}
    >
      {/* Shelf Header Plaque */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#a38f73',
            marginBottom: '0.35rem',
          }}
        >
          PRIVATE ARCHIVE • VOLUMES OF CONVICTION
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.4rem',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: '#f5ead5',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            margin: 0,
          }}
        >
          {initialBook.title}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#baa68b',
            maxWidth: '560px',
            margin: '0.5rem auto 0',
          }}
        >
          {initialBook.subtitle}
        </p>
      </motion.div>

      {/* The Walnut Bookshelf Structure */}
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          position: 'relative',
          marginBottom: '3.5rem',
        }}
      >
        {/* Top Crown Molding */}
        <div
          className="walnut-shelf-top"
          style={{
            height: '24px',
            width: '100%',
            borderRadius: '4px 4px 0 0',
          }}
        />

        {/* Shelf Alcove / Shadow Chamber */}
        <div
          style={{
            minHeight: '440px',
            background: 'radial-gradient(ellipse at 50% 30%, #17100b 0%, #0c0805 75%, #050302 100%)',
            boxShadow: 'inset 0 10px 30px rgba(0, 0, 0, 0.95), inset 0 0 100px rgba(0, 0, 0, 0.9)',
            borderLeft: '14px solid #1f140d',
            borderRight: '14px solid #1f140d',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'relative',
            padding: '0 2rem',
            overflowX: 'auto',
          }}
        >
          {/* Subtle Backboard Wood Slats */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.12,
              backgroundImage: 'repeating-linear-gradient(90deg, #3d2618 0, #3d2618 1px, transparent 1px, transparent 120px)',
              pointerEvents: 'none',
            }}
          />

          {/* Left Antique Cast Iron Bookend */}
          <div
            style={{
              width: '26px',
              height: '180px',
              background: 'linear-gradient(90deg, #120d09 0%, #2b1f16 60%, #150f0a 100%)',
              borderTop: '2px solid #5a412b',
              marginRight: '14px',
              borderRadius: '2px 0 0 0',
              boxShadow: '-4px 0 10px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6e543c',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '0.15em',
            }}
          >
            I
          </div>

          {/* Book Spines Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '6px',
              zIndex: 10,
              paddingBottom: '0',
            }}
          >
            {initialBook.chapters.map((chapter, index) => (
              <BookSpine key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>

          {/* Right Antique Cast Iron Bookend */}
          <div
            style={{
              width: '26px',
              height: '180px',
              background: 'linear-gradient(90deg, #150f0a 0%, #2b1f16 40%, #120d09 100%)',
              borderTop: '2px solid #5a412b',
              marginLeft: '14px',
              borderRadius: '0 2px 0 0',
              boxShadow: '4px 0 10px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6e543c',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              writingMode: 'vertical-rl',
              letterSpacing: '0.15em',
            }}
          >
            IV
          </div>
        </div>

        {/* Bottom Thick Walnut Plank */}
        <div
          className="walnut-shelf-plank"
          style={{
            height: '38px',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Brass Ex Libris Inset Label */}
          <div
            style={{
              background: 'linear-gradient(180deg, #c7a75c 0%, #8c6a26 100%)',
              border: '1px solid #4a3610',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), 0 2px 5px rgba(0,0,0,0.8)',
              padding: '3px 18px',
              borderRadius: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.68rem',
                color: '#261706',
                fontWeight: 700,
                letterSpacing: '0.18em',
              }}
            >
              SECTION I • PHILOSOPHIA PRIVATA
            </span>
          </div>
        </div>
      </div>

      {/* Lesson of the Night Desk Feature */}
      <LessonOfTheNight />
    </div>
  );
};
