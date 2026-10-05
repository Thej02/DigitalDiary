import React, { useEffect } from 'react';
import { AtmosphereProvider, useAtmosphere } from './context/AtmosphereContext';
import { HeaderBar } from './components/Ambient/HeaderBar';
import { LampCursor } from './components/Ambient/LampCursor';
import { DustParticles } from './components/Ambient/DustParticles';
import { Bookshelf } from './components/Bookshelf/Bookshelf';
import { OpenBookModal } from './components/BookView/OpenBookModal';
import { ReadingView } from './components/ReadingView/ReadingView';
import { CardCatalogModal } from './components/CardCatalog/CardCatalogModal';
import { TimelineModal } from './components/Timeline/TimelineModal';
import { AdminPreviewModal } from './components/AdminPreview/AdminPreviewModal';

const LibraryAppContent: React.FC = () => {
  const { mode } = useAtmosphere();

  // Apply mode class to document body
  useEffect(() => {
    if (mode === 'candlelight') {
      document.body.classList.add('mode-candlelight');
    } else {
      document.body.classList.remove('mode-candlelight');
    }
  }, [mode]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: 'var(--bg-room-gradient)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Visual Ambient Layers */}
      <div className="film-grain" aria-hidden="true" />
      <div className="room-vignette" aria-hidden="true" />
      <LampCursor />
      <DustParticles />

      {/* Library Top Atmosphere Bar */}
      <HeaderBar />

      {/* Main Sanctuary: Walnut Bookshelf & Focal Shelf */}
      <main style={{ flex: 1, position: 'relative' }}>
        <Bookshelf />
      </main>

      {/* Chapter View (3D Opened Book) */}
      <OpenBookModal />

      {/* Reading View (Aged Parchment with Drop Cap & Lesson Bookmark) */}
      <ReadingView />

      {/* Card Catalog Drawer Modal */}
      <CardCatalogModal />

      {/* Archival Chronicle Timeline Modal */}
      <TimelineModal />

      {/* Admin Scribe Study Preview Modal */}
      <AdminPreviewModal />

      {/* Subtle Library Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 15,
          padding: '1.5rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(138, 110, 75, 0.15)',
          background: 'rgba(8, 5, 3, 0.9)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#706050',
            letterSpacing: '0.12em',
            margin: 0,
          }}
        >
          THE PRIVATE FOLIO • INSCRIBED IN SILENCE • ALL REFLECTIONS RESERVED
        </p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AtmosphereProvider>
      <LibraryAppContent />
    </AtmosphereProvider>
  );
};

export default App;
