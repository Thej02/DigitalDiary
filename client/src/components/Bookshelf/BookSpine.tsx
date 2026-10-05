import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Chapter } from '../../types';
import { useAtmosphere } from '../../context/AtmosphereContext';

interface BookSpineProps {
  chapter: Chapter;
  index: number;
}

export const BookSpine: React.FC<BookSpineProps> = ({ chapter }) => {
  const { openChapter, playSpinePull } = useAtmosphere();
  const [isHovered, setIsHovered] = useState(false);
  const { spineStyle } = chapter;

  // Leather and cloth textures
  const getBackgroundStyle = () => {
    switch (spineStyle.leatherTone) {
      case 'oxblood':
        return {
          background: 'linear-gradient(90deg, #3d0d12 0%, #5e1820 22%, #6f1f28 50%, #4f141b 80%, #2e080c 100%)',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.65)',
        };
      case 'forest':
        return {
          background: 'linear-gradient(90deg, #101a14 0%, #1c2e22 25%, #243a2c 50%, #1a2a1f 78%, #0d1510 100%)',
          backgroundImage: `
            linear-gradient(90deg, #101a14 0%, #1c2e22 25%, #243a2c 50%, #1a2a1f 78%, #0d1510 100%),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)
          `,
          boxShadow: 'inset 0 0 12px rgba(0,0,0,0.7)',
        };
      case 'walnut':
        return {
          background: 'linear-gradient(90deg, #1b1009 0%, #2e1d13 25%, #3c2618 50%, #2c1a11 78%, #160c07 100%)',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.75)',
        };
      case 'midnight':
      default:
        return {
          background: 'linear-gradient(90deg, #0d1118 0%, #151c27 25%, #1b2432 50%, #131b26 80%, #090c12 100%)',
          boxShadow: 'inset 0 0 14px rgba(0,0,0,0.8)',
        };
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSpinePull();
  };

  return (
    <motion.div
      onClick={() => openChapter(chapter.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: `${spineStyle.width}px`,
        height: `${spineStyle.height}px`,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '3px 3px 0 0',
        transformOrigin: 'bottom center',
        zIndex: isHovered ? 15 : 2,
        ...getBackgroundStyle(),
        borderTop: '2px solid rgba(255, 220, 160, 0.25)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
        borderRight: '1px solid rgba(0, 0, 0, 0.7)',
      }}
      animate={{
        y: isHovered ? -34 : 0,
        z: isHovered ? 40 : 0,
        boxShadow: isHovered
          ? '-12px 18px 30px rgba(0, 0, 0, 0.95), 0 0 25px rgba(212, 175, 55, 0.22)'
          : '-4px 8px 16px rgba(0, 0, 0, 0.75)',
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open chapter: ${chapter.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openChapter(chapter.id);
        }
      }}
    >
      {/* Decorative Headband (woven silk edge) */}
      <div
        style={{
          width: '80%',
          height: '4px',
          background: 'repeating-linear-gradient(90deg, #d4af37 0, #d4af37 3px, #5a1a1f 3px, #5a1a1f 6px)',
          marginTop: '4px',
          borderRadius: '1px',
        }}
      />

      {/* Raised Band / Rib Top */}
      <div className="spine-rib" style={{ marginTop: '16px' }} />

      {/* Gold Tooled Top Flourish */}
      <div
        style={{
          color: spineStyle.foilColor,
          fontSize: '0.85rem',
          opacity: 0.85,
          marginTop: '8px',
          textShadow: '0 1px 2px rgba(0,0,0,0.9)',
        }}
      >
        ✦
      </div>

      {/* Vertical Spine Title */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          padding: '12px 0',
        }}
      >
        <span
          className="gold-foil-lettering"
          style={{
            fontSize: spineStyle.width > 50 ? '0.98rem' : '0.88rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: spineStyle.foilColor,
          }}
        >
          {chapter.title}
        </span>
      </div>

      {/* Raised Band Middle */}
      <div className="spine-rib" />

      {/* Author / Number Monogram Bottom */}
      <div
        style={{
          padding: '12px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: spineStyle.foilColor,
            opacity: 0.9,
            letterSpacing: '0.1em',
          }}
        >
          VOL. {chapter.order}
        </span>
        <div
          style={{
            width: '16px',
            height: '1px',
            backgroundColor: spineStyle.foilColor,
            opacity: 0.6,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            color: '#cbb68f',
            opacity: 0.75,
            letterSpacing: '0.12em',
          }}
        >
          {chapter.entries.length} {chapter.entries.length === 1 ? 'ESSAY' : 'ESSAYS'}
        </span>
      </div>

      {/* Raised Band Bottom */}
      <div className="spine-rib" style={{ marginBottom: '6px' }} />

      {/* Pull Out Indicator on Hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '-28px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(18, 12, 8, 0.95)',
            border: '1px solid #d4af37',
            padding: '3px 8px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: '#f4ebd8',
            letterSpacing: '0.08em',
            pointerEvents: 'none',
            zIndex: 30,
            boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
          }}
        >
          PULL FROM SHELF
        </motion.div>
      )}
    </motion.div>
  );
};
