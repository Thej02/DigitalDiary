import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AtmosphereMode, Chapter, Entry } from '../types';
import { initialBook } from '../data/libraryData';
import { soundEngine } from '../utils/soundSynth';

interface AtmosphereContextType {
  mode: AtmosphereMode;
  toggleMode: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  playPageTurn: () => void;
  playSpinePull: () => void;
  
  // Navigation & Reader State
  activeChapter: Chapter | null;
  activeEntry: Entry | null;
  openChapter: (chapterId: string) => void;
  openEntry: (chapterId: string, entryId: string) => void;
  closeToChapter: () => void;
  closeToShelf: () => void;
  
  // Modals
  isCatalogOpen: boolean;
  setCatalogOpen: (open: boolean) => void;
  isTimelineOpen: boolean;
  setTimelineOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setAdminOpen: (open: boolean) => void;

  // Search & Filter
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

const AtmosphereContext = createContext<AtmosphereContextType | undefined>(undefined);

export const AtmosphereProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AtmosphereMode>('lamp');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  const [isCatalogOpen, setCatalogOpen] = useState(false);
  const [isTimelineOpen, setTimelineOpen] = useState(false);
  const [isAdminOpen, setAdminOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'lamp' ? 'candlelight' : 'lamp'));
    soundEngine.playPageTurn();
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      soundEngine.setMuted(next);
      return next;
    });
  };

  const playPageTurn = () => {
    soundEngine.playPageTurn();
  };

  const playSpinePull = () => {
    soundEngine.playSpinePull();
  };

  const openChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setActiveEntryId(null);
    soundEngine.playPageTurn();
  };

  const openEntry = (chapterId: string, entryId: string) => {
    setActiveChapterId(chapterId);
    setActiveEntryId(entryId);
    soundEngine.playPageTurn();
  };

  const closeToChapter = () => {
    setActiveEntryId(null);
    soundEngine.playPageTurn();
  };

  const closeToShelf = () => {
    setActiveChapterId(null);
    setActiveEntryId(null);
    soundEngine.playPageTurn();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCatalogOpen) setCatalogOpen(false);
        else if (isTimelineOpen) setTimelineOpen(false);
        else if (isAdminOpen) setAdminOpen(false);
        else if (activeEntryId) closeToChapter();
        else if (activeChapterId) closeToShelf();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChapterId, activeEntryId, isCatalogOpen, isTimelineOpen, isAdminOpen]);

  const activeChapter = initialBook.chapters.find((c) => c.id === activeChapterId) || null;
  const activeEntry = activeChapter?.entries.find((e) => e.id === activeEntryId) || null;

  return (
    <AtmosphereContext.Provider
      value={{
        mode,
        toggleMode,
        isMuted,
        toggleMute,
        playPageTurn,
        playSpinePull,
        activeChapter,
        activeEntry,
        openChapter,
        openEntry,
        closeToChapter,
        closeToShelf,
        isCatalogOpen,
        setCatalogOpen,
        isTimelineOpen,
        setTimelineOpen,
        isAdminOpen,
        setAdminOpen,
        selectedTag,
        setSelectedTag,
      }}
    >
      {children}
    </AtmosphereContext.Provider>
  );
};

export const useAtmosphere = () => {
  const context = useContext(AtmosphereContext);
  if (!context) {
    throw new Error('useAtmosphere must be used within an AtmosphereProvider');
  }
  return context;
};
