export type Visibility = 'PRIVATE' | 'PUBLIC';

export interface Tag {
  id: string;
  name: string;
}

export interface Entry {
  id: string;
  chapterId: string;
  title: string;
  body: string;
  oneLineLesson?: string;
  dateWritten: string; // ISO date string or YYYY-MM-DD HH:mm
  readingTime: number; // in minutes
  published: boolean;
  isDraft: boolean;
  visibility: Visibility;
  mood?: string;
  order: number;
  tags: string[];
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface SpineVisual {
  height: number;      // px, e.g. 360 - 415
  width: number;       // px, e.g. 44 - 58
  pattern: 'embossed-ribs' | 'woven-cloth' | 'aged-calfskin' | 'gold-tooled';
  foilColor: string;
  leatherTone: 'oxblood' | 'forest' | 'walnut' | 'midnight' | 'plum' | 'gold';
}

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  order: number;
  mood: string;
  accentColor: string;
  epigraph: string;
  spineStyle: SpineVisual;
  entries: Entry[];
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  coverImage?: string;
  theme?: string;
  chapters: Chapter[];
}

export type AtmosphereMode = 'lamp' | 'candlelight';

export interface DraftState {
  title: string;
  body: string;
  chapterId: string;
  visibility: Visibility;
  mood: string;
  tags: string;
  oneLineLesson: string;
  dateWritten: string;
  lastSavedAt?: string;
}
