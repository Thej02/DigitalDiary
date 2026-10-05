# The Dimly Lit Library — Digital Book

A melodramatic, realistic digital bookshelf and private introspective archive for personal writings, essays, and life lessons.

## Visual Identity & Atmosphere
- **Atmosphere**: Dimly lit private library at night, single warm brass desk lamp, deep walnut shelves, worn leather spines with gold foil tooling, floating dust motes, and aged parchment paper.
- **Aesthetic**: Cinematic, mature, moody, contemplative. No emojis, no bubble UI, no pastel or playful colors.
- **Color Palette**: 
  - Deep Charcoal / Near-Black: `#0e0b09`
  - Dark Walnut: `#2b1b12`
  - Aged Parchment: `#e8dcc2`
  - Antique Gold Foil: `#b08d57`
  - Oxblood Leather: `#5a1a1f`
  - Muted Forest Cloth: `#1f2d24`
- **Typography**: Playfair Display / Cormorant Garamond for titles & chapter spines; EB Garamond for reading body; Vintage Monospace / Typewriter for dates, ledger stamps, and catalog cards.

---

## Architecture & Folder Structure

```
DigitalBook/
├── client/                     # Frontend Application (React + Vite + TS)
│   ├── public/                 # Static assets, fonts, sounds
│   ├── src/
│   │   ├── assets/             # Textures (leather, paper, wood)
│   │   ├── components/         # Modular components
│   │   │   ├── Bookshelf/      # Realistic 3D walnut shelf, spines & book pulling
│   │   │   ├── BookView/       # 3D Book open/close, Table of Contents, Epigraph
│   │   │   ├── ReadingView/    # Aged paper, drop cap, progress bar, lesson bookmark
│   │   │   ├── CardCatalog/    # Vintage library card catalog search & tag filter
│   │   │   ├── Timeline/       # Archival ribbon timeline of entries
│   │   │   ├── Ambient/        # Warm lamp cursor, candlelight toggle, dust particles, audio
│   │   │   └── Layout/         # Header, navigation, mood toggles
│   │   ├── data/               # Realistic mock data matching Prisma models
│   │   ├── context/            # Atmosphere context (Lamp/Candlelight, Audio, Reader settings)
│   │   ├── utils/              # Sound synthesis & audio effects
│   │   ├── App.tsx             # Main routing and stage 1 application
│   │   └── index.css           # Global tokens, wood grain, leather, gold foil, paper textures
│   ├── index.html
│   ├── package.json
│   └── tsconfig.json
├── server/                     # Backend REST API (Node.js + Express) - Stage 2
│   ├── src/
│   │   ├── controllers/        # Books, Chapters, Entries, Auth
│   │   ├── middleware/         # JWT Auth, error handling
│   │   ├── routes/             # REST API endpoints
│   │   └── index.ts
│   └── package.json
├── prisma/                     # Database ORM (PostgreSQL)
│   ├── schema.prisma           # Book, Chapter, Entry, Tag, User models
│   └── seed.ts                 # Realistic seed data with chapters & introspective entries
├── .env.example
└── README.md
```

---

## Prisma Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Book {
  id          String    @id @default(uuid())
  title       String
  subtitle    String?
  author      String
  coverImage  String?
  theme       String?   @default("classic-walnut")
  chapters    Chapter[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Chapter {
  id          String   @id @default(uuid())
  bookId      String
  book        Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)
  title       String
  order       Int      @default(0)
  mood        String?
  accentColor String?
  epigraph    String?  @db.Text
  entries     Entry[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([bookId])
}

model Entry {
  id            String    @id @default(uuid())
  chapterId     String
  chapter       Chapter   @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  title         String
  body          String    @db.Text
  oneLineLesson String    @db.Text
  dateWritten   DateTime  @default(now())
  readingTime   Int       @default(4)
  published     Boolean   @default(true)
  order         Int       @default(0)
  tags          Tag[]     @relation("EntryTags")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([chapterId])
  @@index([published])
  @@index([dateWritten])
}

model Tag {
  id        String   @id @default(uuid())
  name      String   @unique
  entries   Entry[]  @relation("EntryTags")
  createdAt DateTime @default(now())
}

model User {
  id           String   @id @default(uuid())
  username     String   @unique
  passwordHash String
  role         String   @default("ADMIN")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## Build Stages
1. **Stage 1 (Current)**: Static interactive UI with full aesthetic depth, realistic mock data, spine hover/pull interactions, 3D book open/close animations, aged paper reading view with drop caps & embossed lesson bookmark, library card catalog search, timeline, warm lamp & candlelight modes, dust particles, and ambient sound.
2. **Stage 2**: Express API server + PostgreSQL + Prisma ORM + seed script execution.
3. **Stage 3**: Admin Panel with JWT authentication, Markdown live preview editor, chapter/entry reordering, tag management, and spine color customization.
4. **Stage 4**: Advanced polish, audio/motion refinement, accessibility & performance verification.
