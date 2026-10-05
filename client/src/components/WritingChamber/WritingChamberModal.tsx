import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useAtmosphere } from '../../context/AtmosphereContext';
import { Visibility } from '../../types';
import {
  X,
  Feather,
  Lock,
  Globe,
  Save,
  Clock,
  Sparkles,
  Eye,
  Edit3,
  Calendar,
  Bookmark,
} from 'lucide-react';

export const WritingChamberModal: React.FC = () => {
  const {
    isWritingOpen,
    closeWritingChamber,
    editingEntryId,
    book,
    createEntry,
    updateEntry,
    draft,
    saveDraft,
    clearDraft,
  } = useAtmosphere();

  // If editing existing entry, find it
  const editingEntry = editingEntryId
    ? book.chapters.flatMap((c) => c.entries).find((e) => e.id === editingEntryId)
    : null;

  // Active chapters for dropdown
  const activeChapters = book.chapters.filter((c) => !c.deletedAt);
  const defaultChapterId = activeChapters[0]?.id || '';

  // Form State
  const [title, setTitle] = useState('');
  const [chapterId, setChapterId] = useState(defaultChapterId);
  const [body, setBody] = useState('');
  const [oneLineLesson, setOneLineLesson] = useState('');
  const [mood, setMood] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('PRIVATE');
  const [dateWritten, setDateWritten] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<string>('');

  // Initial load / reset
  useEffect(() => {
    if (!isWritingOpen) return;

    if (editingEntry) {
      setTitle(editingEntry.title);
      setChapterId(editingEntry.chapterId);
      setBody(editingEntry.body);
      setOneLineLesson(editingEntry.oneLineLesson || '');
      setMood(editingEntry.mood || '');
      setTagsInput(editingEntry.tags.join(', '));
      setVisibility(editingEntry.visibility);
      setDateWritten(editingEntry.dateWritten);
    } else if (draft && !editingEntryId) {
      // Resume draft
      setTitle(draft.title || '');
      setChapterId(draft.chapterId || defaultChapterId);
      setBody(draft.body || '');
      setOneLineLesson(draft.oneLineLesson || '');
      setMood(draft.mood || '');
      setTagsInput(draft.tags || '');
      setVisibility(draft.visibility || 'PRIVATE');
      setDateWritten(draft.dateWritten || formatCurrentDateTime());
      setAutosaveStatus('Restored unsaved draft');
    } else {
      // Fresh new entry for today
      setTitle('');
      setChapterId(defaultChapterId);
      setBody('');
      setOneLineLesson('');
      setMood('');
      setTagsInput('');
      setVisibility('PRIVATE');
      setDateWritten(formatCurrentDateTime());
      setAutosaveStatus('');
    }
  }, [isWritingOpen, editingEntryId, defaultChapterId]);

  function formatCurrentDateTime() {
    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const HH = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}`;
  }

  // Autosave timer (every 3.5 seconds)
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isWritingOpen || editingEntryId) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      if (title.trim() || body.trim()) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        saveDraft({
          title,
          chapterId,
          body,
          oneLineLesson,
          mood,
          tags: tagsInput,
          visibility,
          dateWritten,
          lastSavedAt: timeStr,
        });
        setAutosaveStatus(`Draft sealed in memory at ${timeStr}`);
      }
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isWritingOpen, editingEntryId, title, chapterId, body, oneLineLesson, mood, tagsInput, visibility, dateWritten, saveDraft]);

  const handlePublish = (asDraft = false) => {
    if (!title.trim()) {
      alert('Please inscribe a title for this entry.');
      return;
    }
    if (!chapterId) {
      alert('Please select a volume chapter for this entry.');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingEntry) {
      updateEntry(editingEntry.id, {
        title: title.trim(),
        chapterId,
        body,
        oneLineLesson: oneLineLesson.trim() || undefined,
        mood: mood.trim() || undefined,
        tags: tagsArray,
        visibility,
        dateWritten: dateWritten || formatCurrentDateTime(),
        isDraft: asDraft,
        published: !asDraft,
      });
    } else {
      createEntry({
        title: title.trim(),
        chapterId,
        body,
        oneLineLesson: oneLineLesson.trim() || undefined,
        mood: mood.trim() || undefined,
        tags: tagsArray,
        visibility,
        dateWritten: dateWritten || formatCurrentDateTime(),
        isDraft: asDraft,
      });
    }

    closeWritingChamber();
  };

  if (!isWritingOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(5, 3, 2, 0.96)',
          backdropFilter: 'blur(12px)',
          padding: '1.25rem',
          overflowY: 'auto',
        }}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            maxWidth: '1020px',
            maxHeight: '92vh',
            background: 'linear-gradient(180deg, #1c120a 0%, #100a06 100%)',
            border: '2px solid #8f6f36',
            boxShadow: '0 30px 90px rgba(0,0,0,0.98), inset 0 0 40px rgba(0,0,0,0.9)',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Top Brass Control Bar */}
          <header
            style={{
              padding: '1.1rem 1.75rem',
              borderBottom: '2px solid #3d2616',
              background: 'linear-gradient(180deg, #321e12 0%, #1a0f08 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '2px',
                  border: '1px solid #d4af37',
                  background: 'radial-gradient(circle, #3d2618 0%, #150a04 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)',
                }}
              >
                <Feather size={16} color="#d4af37" />
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.98rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#f5ead5',
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  {editingEntry ? 'Edit Inscribed Reflection' : "The Scribe's Writing Chamber"}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: autosaveStatus ? '#d4af37' : '#947f68',
                  }}
                >
                  {autosaveStatus || 'Distraction-free personal diary • Autosaving active'}
                </span>
              </div>
            </div>

            {/* Actions: Preview Toggle, Save Draft, Publish, Close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  background: isPreviewMode ? 'rgba(80, 52, 28, 0.9)' : 'rgba(38, 24, 15, 0.7)',
                  border: '1px solid #75552b',
                  color: '#e5d5be',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {isPreviewMode ? <Edit3 size={14} color="#ffd479" /> : <Eye size={14} color="#ffd479" />}
                <span>{isPreviewMode ? 'Editor' : 'Parchment Preview'}</span>
              </button>

              <button
                type="button"
                onClick={() => handlePublish(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  background: 'rgba(30, 20, 12, 0.8)',
                  border: '1px solid #5a3d1d',
                  color: '#bfa88d',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                <Save size={13} />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={() => handlePublish(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 1.15rem',
                  background: 'linear-gradient(180deg, #b08d57 0%, #7e5f28 100%)',
                  border: '1px solid #ffd479',
                  color: '#1a1005',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
              >
                <Sparkles size={14} />
                <span>{editingEntry ? 'Save Changes' : 'Inscribe to Folio'}</span>
              </button>

              <button
                type="button"
                onClick={closeWritingChamber}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#a38d74',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f5e4c4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#a38d74')}
              >
                <X size={20} />
              </button>
            </div>
          </header>

          {/* Form Content / Split Area */}
          <div
            style={{
              padding: '1.75rem 2.25rem',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Metadata Configuration Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                background: 'rgba(25, 16, 10, 0.7)',
                border: '1px solid rgba(143, 111, 54, 0.35)',
                padding: '1rem 1.25rem',
                borderRadius: '2px',
              }}
            >
              {/* Chapter Volume Selector */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#c2ab8e',
                    marginBottom: '0.35rem',
                  }}
                >
                  Target Chapter Volume
                </label>
                <select
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    background: '#120b06',
                    border: '1px solid #5a3d1d',
                    color: '#f0e3cc',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                >
                  {activeChapters.map((chap) => (
                    <option key={chap.id} value={chap.id}>
                      {chap.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time (Editable for backdating) */}
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#c2ab8e',
                    marginBottom: '0.35rem',
                  }}
                >
                  <Calendar size={12} color="#d4af37" />
                  <span>Date & Time Inscribed</span>
                </label>
                <input
                  type="text"
                  value={dateWritten}
                  onChange={(e) => setDateWritten(e.target.value)}
                  placeholder="YYYY-MM-DD HH:mm"
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    background: '#120b06',
                    border: '1px solid #5a3d1d',
                    color: '#f0e3cc',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Visibility Switch: Private vs Public */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#c2ab8e',
                    marginBottom: '0.35rem',
                  }}
                >
                  Visibility Privacy
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setVisibility('PRIVATE')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.5rem',
                      background: visibility === 'PRIVATE' ? '#5a1a1f' : '#140c07',
                      border: `1px solid ${visibility === 'PRIVATE' ? '#d4af37' : '#452c16'}`,
                      color: visibility === 'PRIVATE' ? '#fdeced' : '#8f7b67',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Lock size={12} />
                    <span>Private</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibility('PUBLIC')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.5rem',
                      background: visibility === 'PUBLIC' ? '#1f2d24' : '#140c07',
                      border: `1px solid ${visibility === 'PUBLIC' ? '#92c29b' : '#452c16'}`,
                      color: visibility === 'PUBLIC' ? '#e2f7e7' : '#8f7b67',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Globe size={12} />
                    <span>Public</span>
                  </button>
                </div>
              </div>

              {/* Mood */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#c2ab8e',
                    marginBottom: '0.35rem',
                  }}
                >
                  Contemplative Mood (Optional)
                </label>
                <input
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="e.g., Midnight Solitude, Cold Clarity"
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    background: '#120b06',
                    border: '1px solid #5a3d1d',
                    color: '#f0e3cc',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Entry Title */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of this reflection..."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: '#0d0805',
                  border: '1px solid #75552b',
                  color: '#fdf3de',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />
            </div>

            {/* One-Line Lesson */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(30, 20, 12, 0.7)',
                border: '1px solid #8f6f36',
                padding: '0.65rem 1rem',
              }}
            >
              <Bookmark size={16} color="#d4af37" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={oneLineLesson}
                onChange={(e) => setOneLineLesson(e.target.value)}
                placeholder="The One-Line Lesson (bookmark aphorism)..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#f5ead5',
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Tags */}
            <div>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Tags (separated by comma: Solitude, Discipline, Time)..."
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  background: '#120b06',
                  border: '1px solid #4a3421',
                  color: '#d4af37',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Main Editor vs Live Parchment Preview */}
            <div style={{ flex: 1, minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
              {isPreviewMode ? (
                <div
                  className="parchment-sheet drop-cap"
                  style={{
                    padding: '2.5rem 3rem',
                    flex: 1,
                    overflowY: 'auto',
                    borderRadius: '2px',
                  }}
                >
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#24140b', marginBottom: '0.5rem' }}>
                    {title || 'Untitled Reflection'}
                  </h2>
                  {mood && (
                    <div style={{ fontStyle: 'italic', color: '#68513c', marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
                      Mood: {mood}
                    </div>
                  )}
                  <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#1a140f', fontFamily: 'var(--font-body)' }}>
                    <ReactMarkdown>{body || '*No text inscribed yet.*'}</ReactMarkdown>
                  </div>

                  {oneLineLesson && (
                    <div
                      style={{
                        marginTop: '2rem',
                        padding: '1.25rem',
                        background: '#24140e',
                        border: '1px solid #d4af37',
                        color: '#fdf3de',
                        fontStyle: 'italic',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        textAlign: 'center',
                      }}
                    >
                      “{oneLineLesson}”
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Inscribe your thoughts in Markdown... Use > for quotes, ### for subheadings, - for lists."
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '340px',
                    padding: '1.25rem',
                    background: '#0d0805',
                    border: '1px solid #4a3421',
                    color: '#e5d7be',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.2rem',
                    lineHeight: 1.75,
                    outline: 'none',
                    resize: 'vertical',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.9)',
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
