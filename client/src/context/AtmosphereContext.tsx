import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { AtmosphereMode, Chapter, Entry, Book, Visibility, DraftState } from '../types';
import { initialBook } from '../data/libraryData';
import { soundEngine } from '../utils/soundSynth';

const STORAGE_KEY = 'the_private_folio_book_v2';
const DRAFT_STORAGE_KEY = 'the_private_folio_writing_draft_v2';
const AUTH_KEY = 'the_private_folio_authenticated_v2';

interface AtmosphereContextType {
  mode: AtmosphereMode;
  toggleMode: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  playPageTurn: () => void;
  playSpinePull: () => void;
  
  // Privacy & Auth
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  isPublicViewOnly: boolean;
  togglePublicViewOnly: () => void;

  // Active Navigation & Reader State
  book: Book;
  activeChapter: Chapter | null;
  activeEntry: Entry | null;
  openChapter: (chapterId: string) => void;
  openEntry: (chapterId: string, entryId: string) => void;
  closeToChapter: () => void;
  closeToShelf: () => void;

  // Chapter Management (Diary Mode)
  createChapter: (data: {
    title: string;
    epigraph: string;
    mood: string;
    accentColor: string;
    texture?: string;
    spineWidth?: number;
    spineHeight?: number;
  }) => string;
  updateChapter: (id: string, data: Partial<Chapter>) => void;
  deleteChapterSoft: (id: string) => void;
  restoreChapter: (id: string) => void;
  deleteChapterPermanent: (id: string) => void;
  reorderChapters: (startIndex: number, endIndex: number) => void;

  // Entry Management (Diary Mode)
  createEntry: (data: {
    chapterId: string;
    title: string;
    body: string;
    oneLineLesson?: string;
    dateWritten: string;
    visibility: Visibility;
    mood?: string;
    tags: string[];
    isDraft?: boolean;
  }) => string;
  updateEntry: (id: string, data: Partial<Entry>) => void;
  moveEntry: (entryId: string, targetChapterId: string) => void;
  deleteEntrySoft: (id: string) => void;
  restoreEntry: (id: string) => void;
  deleteEntryPermanent: (id: string) => void;

  // Writing Chamber (Distraction-Free Editor)
  isWritingOpen: boolean;
  editingEntryId: string | null;
  openWritingChamber: (entryId?: string) => void;
  closeWritingChamber: () => void;
  draft: DraftState | null;
  saveDraft: (draft: DraftState) => void;
  clearDraft: () => void;

  // Discarded Pages (Soft Delete Trash)
  isTrashOpen: boolean;
  setTrashOpen: (open: boolean) => void;
  trashChapters: Chapter[];
  trashEntries: (Entry & { chapterTitle: string })[];

  // Modals & Navigation
  isCatalogOpen: boolean;
  setCatalogOpen: (open: boolean) => void;
  isTimelineOpen: boolean;
  setTimelineOpen: (open: boolean) => void;
  isChapterModalOpen: boolean;
  setChapterModalOpen: (open: boolean) => void;
  editingChapterId: string | null;
  openChapterEditModal: (chapterId?: string) => void;
  closeChapterModal: () => void;

  // Archival Export
  exportArchive: (type: 'json' | 'markdown') => void;
}

const AtmosphereContext = createContext<AtmosphereContextType | undefined>(undefined);

export const AtmosphereProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AtmosphereMode>('lamp');
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Authentication State: persist in sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isPublicViewOnly, setIsPublicViewOnly] = useState(false);

  // Persistent Book Data: load from localStorage
  const [book, setBook] = useState<Book>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return initialBook;
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
    } catch {
      // Fallback
    }
  }, [book]);

  // Reader & Navigation State
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  // Modals
  const [isCatalogOpen, setCatalogOpen] = useState(false);
  const [isTimelineOpen, setTimelineOpen] = useState(false);
  const [isTrashOpen, setTrashOpen] = useState(false);
  const [isWritingOpen, setWritingOpen] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [isChapterModalOpen, setChapterModalOpen] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);

  // Autosave Draft State
  const [draft, setDraftState] = useState<DraftState | null>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return null;
  });

  const saveDraft = (newDraft: DraftState) => {
    setDraftState(newDraft);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(newDraft));
  };

  const clearDraft = () => {
    setDraftState(null);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

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

  // Auth methods
  const login = (password: string): boolean => {
    // Scribe password (default "thejaswi" or "scribe" or "password123")
    if (password === 'thejaswi' || password === 'scribe' || password === 'secret') {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      setLoginModalOpen(false);
      soundEngine.playPageTurn();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    soundEngine.playPageTurn();
  };

  const togglePublicViewOnly = () => {
    setIsPublicViewOnly((prev) => !prev);
    soundEngine.playPageTurn();
  };

  // Active views
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

  // Writing Chamber
  const openWritingChamber = (entryId?: string) => {
    setEditingEntryId(entryId || null);
    setWritingOpen(true);
    soundEngine.playPageTurn();
  };

  const closeWritingChamber = () => {
    setWritingOpen(false);
    setEditingEntryId(null);
  };

  // Chapter Modal
  const openChapterEditModal = (chapterId?: string) => {
    setEditingChapterId(chapterId || null);
    setChapterModalOpen(true);
  };

  const closeChapterModal = () => {
    setChapterModalOpen(false);
    setEditingChapterId(null);
  };

  // Calculate reading time (~180 words per minute for contemplative text)
  const calcReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
  };

  // Chapter Management (Create, Edit, Soft Delete, Restore, Permanent Delete, Reorder)
  const createChapter = (data: {
    title: string;
    epigraph: string;
    mood: string;
    accentColor: string;
    texture?: string;
    spineWidth?: number;
    spineHeight?: number;
  }): string => {
    const newId = `chap-${Date.now()}`;
    const newOrder = book.chapters.length + 1;

    const newChapter: Chapter = {
      id: newId,
      bookId: book.id,
      title: data.title,
      order: newOrder,
      mood: data.mood || 'Quiet Conviction',
      accentColor: data.accentColor || '#5a1a1f',
      epigraph: data.epigraph,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      spineStyle: {
        height: data.spineHeight || 385,
        width: data.spineWidth || 50,
        pattern: (data.texture as Chapter['spineStyle']['pattern']) || 'embossed-ribs',
        foilColor: '#d4af37',
        leatherTone:
          data.accentColor.toLowerCase().includes('5a1a1f') || data.accentColor.toLowerCase().includes('oxblood')
            ? 'oxblood'
            : data.accentColor.toLowerCase().includes('1f2d24') || data.accentColor.toLowerCase().includes('forest')
            ? 'forest'
            : data.accentColor.toLowerCase().includes('141923') || data.accentColor.toLowerCase().includes('midnight')
            ? 'midnight'
            : 'walnut',
      },
      entries: [],
    };

    setBook((prev) => ({
      ...prev,
      chapters: [...prev.chapters, newChapter],
    }));

    soundEngine.playPageTurn();
    return newId;
  };

  const updateChapter = (id: string, data: Partial<Chapter>) => {
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => {
        if (chap.id !== id) return chap;
        return {
          ...chap,
          ...data,
          updatedAt: new Date().toISOString(),
          spineStyle: {
            ...chap.spineStyle,
            ...(data.spineStyle || {}),
          },
        };
      }),
    }));
  };

  const deleteChapterSoft = (id: string) => {
    const now = new Date().toISOString();
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => {
        if (chap.id !== id) return chap;
        return {
          ...chap,
          deletedAt: now,
          entries: chap.entries.map((e) => ({ ...e, deletedAt: now })),
        };
      }),
    }));
    if (activeChapterId === id) {
      closeToShelf();
    }
    soundEngine.playPageTurn();
  };

  const restoreChapter = (id: string) => {
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => {
        if (chap.id !== id) return chap;
        return {
          ...chap,
          deletedAt: null,
          entries: chap.entries.map((e) => ({ ...e, deletedAt: null })),
        };
      }),
    }));
    soundEngine.playPageTurn();
  };

  const deleteChapterPermanent = (id: string) => {
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((chap) => chap.id !== id),
    }));
  };

  const reorderChapters = (startIndex: number, endIndex: number) => {
    setBook((prev) => {
      const activeChaps = prev.chapters.filter((c) => !c.deletedAt);
      const deletedChaps = prev.chapters.filter((c) => c.deletedAt);

      const [moved] = activeChaps.splice(startIndex, 1);
      activeChaps.splice(endIndex, 0, moved);

      const updatedActive = activeChaps.map((chap, idx) => ({
        ...chap,
        order: idx + 1,
      }));

      return {
        ...prev,
        chapters: [...updatedActive, ...deletedChaps],
      };
    });
    soundEngine.playSpinePull();
  };

  // Entry Management (Create, Edit, Move, Soft Delete, Restore, Permanent Delete)
  const createEntry = (data: {
    chapterId: string;
    title: string;
    body: string;
    oneLineLesson?: string;
    dateWritten: string;
    visibility: Visibility;
    mood?: string;
    tags: string[];
    isDraft?: boolean;
  }): string => {
    const newId = `entry-${Date.now()}`;
    const readingTime = calcReadingTime(data.body);

    const newEntry: Entry = {
      id: newId,
      chapterId: data.chapterId,
      title: data.title,
      body: data.body,
      oneLineLesson: data.oneLineLesson,
      dateWritten: data.dateWritten || new Date().toISOString().slice(0, 16).replace('T', ' '),
      readingTime,
      published: !data.isDraft,
      isDraft: !!data.isDraft,
      visibility: data.visibility || 'PRIVATE',
      mood: data.mood,
      tags: data.tags,
      order: 1,
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => {
        if (chap.id !== data.chapterId) return chap;
        return {
          ...chap,
          entries: [...chap.entries, newEntry],
        };
      }),
    }));

    clearDraft();
    soundEngine.playPageTurn();
    return newId;
  };

  const updateEntry = (id: string, data: Partial<Entry>) => {
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => ({
        ...chap,
        entries: chap.entries.map((entry) => {
          if (entry.id !== id) return entry;
          const updatedBody = data.body !== undefined ? data.body : entry.body;
          const readingTime = data.body !== undefined ? calcReadingTime(updatedBody) : entry.readingTime;
          return {
            ...entry,
            ...data,
            readingTime,
            updatedAt: new Date().toISOString(),
          };
        }),
      })),
    }));
    soundEngine.playPageTurn();
  };

  const moveEntry = (entryId: string, targetChapterId: string) => {
    setBook((prev) => {
      let movedEntry: Entry | null = null;

      // Extract entry
      const updatedChapters = prev.chapters.map((chap) => {
        const found = chap.entries.find((e) => e.id === entryId);
        if (found) {
          movedEntry = { ...found, chapterId: targetChapterId };
          return {
            ...chap,
            entries: chap.entries.filter((e) => e.id !== entryId),
          };
        }
        return chap;
      });

      // Insert into target
      if (movedEntry) {
        return {
          ...prev,
          chapters: updatedChapters.map((chap) => {
            if (chap.id === targetChapterId) {
              return {
                ...chap,
                entries: [...chap.entries, movedEntry!],
              };
            }
            return chap;
          }),
        };
      }
      return prev;
    });
    soundEngine.playPageTurn();
  };

  const deleteEntrySoft = (id: string) => {
    const now = new Date().toISOString();
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => ({
        ...chap,
        entries: chap.entries.map((entry) => {
          if (entry.id !== id) return entry;
          return { ...entry, deletedAt: now };
        }),
      })),
    }));
    if (activeEntryId === id) {
      closeToChapter();
    }
    soundEngine.playPageTurn();
  };

  const restoreEntry = (id: string) => {
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => ({
        ...chap,
        entries: chap.entries.map((entry) => {
          if (entry.id !== id) return entry;
          return { ...entry, deletedAt: null };
        }),
      })),
    }));
    soundEngine.playPageTurn();
  };

  const deleteEntryPermanent = (id: string) => {
    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chap) => ({
        ...chap,
        entries: chap.entries.filter((entry) => entry.id !== id),
      })),
    }));
  };

  // Discarded Pages lists
  const trashChapters = useMemo(() => {
    return book.chapters.filter((c) => !!c.deletedAt);
  }, [book]);

  const trashEntries = useMemo(() => {
    return book.chapters.flatMap((chap) =>
      chap.entries
        .filter((e) => !!e.deletedAt)
        .map((e) => ({ ...e, chapterTitle: chap.title }))
    );
  }, [book]);

  // Export Archive (JSON or Markdown)
  const exportArchive = (format: 'json' | 'markdown') => {
    if (format === 'json') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(book, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `the_private_folio_archive_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else {
      // Create concatenated Markdown archive with frontmatter
      let mdContent = `# ${book.title}\n*${book.subtitle}*\n\n---\n\n`;
      book.chapters.forEach((chap) => {
        mdContent += `\n# Chapter: ${chap.title}\n`;
        if (chap.mood) mdContent += `*Mood: ${chap.mood}*\n`;
        if (chap.epigraph) mdContent += `\n> "${chap.epigraph}"\n\n`;

        chap.entries.forEach((entry) => {
          mdContent += `\n## ${entry.title}\n`;
          mdContent += `**Date:** ${entry.dateWritten} | **Visibility:** ${entry.visibility} | **Tags:** ${entry.tags.join(', ')}\n\n`;
          if (entry.oneLineLesson) {
            mdContent += `> **Lesson:** ${entry.oneLineLesson}\n\n`;
          }
          mdContent += `${entry.body}\n\n---\n`;
        });
      });

      const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', url);
      downloadAnchor.setAttribute('download', `the_private_folio_writings_${new Date().toISOString().slice(0, 10)}.md`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      URL.revokeObjectURL(url);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isWritingOpen) closeWritingChamber();
        else if (isChapterModalOpen) closeChapterModal();
        else if (isTrashOpen) setTrashOpen(false);
        else if (isCatalogOpen) setCatalogOpen(false);
        else if (isTimelineOpen) setTimelineOpen(false);
        else if (isLoginModalOpen) setLoginModalOpen(false);
        else if (activeEntryId) closeToChapter();
        else if (activeChapterId) closeToShelf();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeChapterId,
    activeEntryId,
    isCatalogOpen,
    isTimelineOpen,
    isWritingOpen,
    isTrashOpen,
    isChapterModalOpen,
    isLoginModalOpen,
  ]);

  // Filter book for Public-only mode or unauthenticated visitor
  const effectiveBook = useMemo(() => {
    // If not authenticated, or if user toggled "Public View Only", show only chapters with public entries
    if (!isAuthenticated || isPublicViewOnly) {
      return {
        ...book,
        chapters: book.chapters
          .filter((chap) => !chap.deletedAt)
          .map((chap) => ({
            ...chap,
            entries: chap.entries.filter((entry) => !entry.deletedAt && entry.visibility === 'PUBLIC'),
          }))
          .filter((chap) => chap.entries.length > 0),
      };
    }

    // Authenticated user sees all active chapters and entries
    return {
      ...book,
      chapters: book.chapters.filter((chap) => !chap.deletedAt),
    };
  }, [book, isAuthenticated, isPublicViewOnly]);

  const activeChapter =
    effectiveBook.chapters.find((c) => c.id === activeChapterId) ||
    book.chapters.find((c) => c.id === activeChapterId) ||
    null;

  const activeEntry =
    activeChapter?.entries.find((e) => e.id === activeEntryId) || null;

  return (
    <AtmosphereContext.Provider
      value={{
        mode,
        toggleMode,
        isMuted,
        toggleMute,
        playPageTurn,
        playSpinePull,
        isAuthenticated,
        login,
        logout,
        isLoginModalOpen,
        setLoginModalOpen,
        isPublicViewOnly,
        togglePublicViewOnly,
        book: effectiveBook,
        activeChapter,
        activeEntry,
        openChapter,
        openEntry,
        closeToChapter,
        closeToShelf,
        createChapter,
        updateChapter,
        deleteChapterSoft,
        restoreChapter,
        deleteChapterPermanent,
        reorderChapters,
        createEntry,
        updateEntry,
        moveEntry,
        deleteEntrySoft,
        restoreEntry,
        deleteEntryPermanent,
        isWritingOpen,
        editingEntryId,
        openWritingChamber,
        closeWritingChamber,
        draft,
        saveDraft,
        clearDraft,
        isTrashOpen,
        setTrashOpen,
        trashChapters,
        trashEntries,
        isCatalogOpen,
        setCatalogOpen,
        isTimelineOpen,
        setTimelineOpen,
        isChapterModalOpen,
        setChapterModalOpen,
        editingChapterId,
        openChapterEditModal,
        closeChapterModal,
        exportArchive,
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
