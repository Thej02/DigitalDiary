export interface Tag {
  id: string;
  name: string;
}

export interface Entry {
  id: string;
  chapterId: string;
  title: string;
  body: string;
  oneLineLesson: string;
  dateWritten: string;
  readingTime: number; // in minutes
  published: boolean;
  order: number;
  tags: string[];
}

export interface SpineVisual {
  height: number;      // px, e.g. 360 - 410
  width: number;       // px, e.g. 44 - 56
  pattern: 'embossed-ribs' | 'woven-cloth' | 'aged-calfskin' | 'gold-tooled';
  foilColor: string;
  leatherTone: 'oxblood' | 'forest' | 'walnut' | 'midnight';
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
