import type { Book } from '../types';

export const initialBook: Book = {
  id: "book-01",
  title: "The Book of Quiet Hours",
  subtitle: "A Private Archive of Solitude, Endurance, and the Ledger of Living",
  author: "The Scribe at Midnight",
  coverImage: "/assets/cover-walnut.jpg",
  theme: "classic-walnut",
  chapters: [
    {
      id: "chap-01",
      bookId: "book-01",
      title: "I. The Architecture of Silence",
      order: 1,
      mood: "Solitude, Nightfall, and Unspoken Truths",
      accentColor: "#5a1a1f",
      deletedAt: null,
      spineStyle: {
        height: 385,
        width: 50,
        pattern: "embossed-ribs",
        foilColor: "#d4af37",
        leatherTone: "oxblood",
      },
      epigraph: "We build monuments to our ambitions, yet it is only in the collapse of noise that the true proportions of our spirit become visible. If you cannot abide five minutes in an empty room, you have not conquered the world; you have merely fled from it.",
      entries: [
        {
          id: "entry-01",
          chapterId: "chap-01",
          title: "On What We Leave in Unlit Rooms",
          readingTime: 4,
          dateWritten: "2024-11-14 23:45",
          published: true,
          isDraft: false,
          visibility: "PUBLIC",
          mood: "Melancholic Stillness",
          order: 1,
          tags: ["Solitude", "Memory", "Stillness"],
          oneLineLesson: "The silence you avoid is not empty; it is simply crowded with the conversations you refuse to have with yourself.",
          deletedAt: null,
          body: `For the better part of youth, silence feels like an indictment. We leave radio receivers hissing on empty counters, summon digital voices through glowing rectangles, and fill our schedules with frantic pledges of allegiance to strangers. We treat an unencumbered evening as an architectural flaw in the day—something that must be boarded up before the cold drafts seep in.

Yet the draft was never cold; it was only clear.

When the last chime strikes and the house settles on its foundations, the room asks nothing of you. It does not ask for your achievements, nor does it inquire after your standing among men. In that vacuum, whatever you have postponed comes to sit at the edge of the chair opposite you.

> *"To endure your own stillness without panic is the beginning of all sovereign thought."*

### The Sovereign Room

I have learned to treat the unlit room not as an exile, but as an altar. It is the only chamber where you cannot strike an impressive posture. The shadows do not applaud your clever retorts, and the dark walnut paneling does not record your grievances. 

Sit there until the agitation subsides like stirred silt in a glass of well water. You will find that the terror you felt was merely the dying gasp of the persona you exhausted yourself maintaining all afternoon. Once that ghost departs, the true person remains: quiet, unburdened, and quietly awake.`,
        },
        {
          id: "entry-02",
          chapterId: "chap-01",
          title: "The Ledger of Small Debts",
          readingTime: 5,
          dateWritten: "2025-01-22 01:15",
          published: true,
          isDraft: false,
          visibility: "PRIVATE",
          mood: "Heavy Regret",
          order: 2,
          tags: ["Memory", "Time", "Grace"],
          oneLineLesson: "Pride will keep your hands warm in the cold, but it will never build you a hearth.",
          deletedAt: null,
          body: `Most estrangements between civilized people do not begin with betrayal. Betrayal is too theatrical, too distinct; it carries the clean severity of a blade. Estrangement, rather, is like moisture seeping into untended floorboards—a silent rot nurtured by petty pride and unreturned letters.

We keep meticulous mental ledgers:
- *I visited them last autumn; it is their turn to knock upon my door.*
- *They replied with four words; I shall reply with three.*
- *They spoke sharply during the winter solstice; I shall wait for them to repent.*

We congratulate ourselves on our composure, mistaking stubbornness for self-respect. Meanwhile, months decay into years.

### The Cost of Being Right

There is an appalling tragedy in watching two people who once shared their innermost confidences become museum curiosities to one another. Each stands guard outside the fortress of their dignity, refusing to cross the moat.

> *"If a bridge is to be rebuilt, someone must be willing to step into the mud first. The one who steps down is not the weaker party; they are the only one with enough strength to carry the lumber."*

Tear up the ledger. Write the letter without requiring a receipt. If they meet your overture with coldness, you have lost nothing save a pocketful of false pride. But if they take your hand, you will have salvaged a life from the encroaching dark.`,
        },
      ],
    },
    {
      id: "chap-02",
      bookId: "book-01",
      title: "II. Cold Seasons and Heavy Timber",
      order: 2,
      mood: "Endurance, Heavy Work, and Winter Dusk",
      accentColor: "#1f2d24",
      deletedAt: null,
      spineStyle: {
        height: 415,
        width: 54,
        pattern: "woven-cloth",
        foilColor: "#c99e58",
        leatherTone: "forest",
      },
      epigraph: "Winter does not ask for your consent; it asks only whether you have gathered sufficient fuel to survive the frost of your own doubt. In the deep snow, vanity freezes first.",
      entries: [
        {
          id: "entry-03",
          chapterId: "chap-02",
          title: "The Art of Slow Burning",
          readingTime: 6,
          dateWritten: "2025-04-18 22:30",
          published: true,
          isDraft: false,
          visibility: "PUBLIC",
          mood: "Fierce Focus",
          order: 1,
          tags: ["Discipline", "Endurance", "Work"],
          oneLineLesson: "Urgency is often cowardice masquerading as passion; endurance is the only proof of devotion that history respects.",
          deletedAt: null,
          body: `We live in a culture intoxicated by ignition. Everyone wants the blinding flash, the explosive ascent, the overnight revelation that renders ten years of quiet labour obsolete. Dry twigs crackle with astonishing noise; they shoot crimson sparks toward the sky and illuminate the clearing with wild drama.

And within four minutes, they are gray ash.

The hearth that keeps a stone cottage warm through three months of sub-zero wind is not stoked with twigs. It requires heavy heartwood—oak, hickory, black walnut—seasoned over two summers under an iron roof. It takes effort to split, it refuses to ignite with a mere match, and it emits almost no theatrical crackle. Yet it burns with an unshakeable blue-gold core for fourteen hours.

### Craftsmanship in Obscurity

Consider the stone masons who carved the vaulted ceilings of cathedral naves. They spent four decades chipping stone that no visitor standing on the marble floor below would ever see clearly. 

> *"Work performed solely for the spectator's applause turns brittle at the first change of weather. Work performed to satisfy an inner standard of integrity withstands both fire and oblivion."*

Cease measuring your days by whether someone noticed your sweat. Build your life out of slow-cured timber. When the winter storms howl against your shuttered windows, you will know the quiet sanctuary of heat that does not falter.`,
        },
        {
          id: "entry-04",
          chapterId: "chap-02",
          title: "Forgiving the Earlier Self",
          readingTime: 5,
          dateWritten: "2025-08-30 00:20",
          published: true,
          isDraft: false,
          visibility: "PRIVATE",
          mood: "Tender Grace",
          order: 2,
          tags: ["Grace", "Identity", "Time"],
          oneLineLesson: "You cannot condemn the traveler for taking the crooked trail when the road was obscured by night.",
          deletedAt: null,
          body: `It is dreadfully easy to summon the person you were seven years ago and conduct a ruthless tribunal in the privacy of your skull. You inspect their missteps with modern eyes. You condemn their poor choices, their naive allegiances, their desperate attempts to be loved by people who were unworthy of their devotion.

*“How could I have been so blind?”* we whisper into the ceiling at two in the morning.

This is not wisdom; it is an injustice masquerading as introspection.

### The Fog and the Map

You are judging someone who had to navigate through dense mountain fog using a hand-drawn map full of errors, and you are doing so from the comfort of a sunlit veranda.

That younger self did not have your scar tissue. They did not have your vocabulary, your cautionary tales, or the bitter wisdom you purchased with tears. They took the crooked trail because every road sign was missing, and they were shivering in the rain.

> *"Mercy must begin within your own chest. If you cannot offer forgiveness to the bewildered soul who bore the blows so you could stand here today, who on earth will?"*

Close the tribunal. Thank that weary, bruised traveler for surviving the trek. Then lay down the gavel and let them sleep in peace.`,
        },
      ],
    },
    {
      id: "chap-03",
      bookId: "book-01",
      title: "III. The Geometry of Loss",
      order: 3,
      mood: "Mourning, Impermanence, and Lingering Shadows",
      accentColor: "#2b1b12",
      deletedAt: null,
      spineStyle: {
        height: 365,
        width: 46,
        pattern: "aged-calfskin",
        foilColor: "#bfa054",
        leatherTone: "walnut",
      },
      epigraph: "Loss is not the subtraction of a person from a room; it is the permanent rearrangement of the air that remains.",
      entries: [
        {
          id: "entry-05",
          chapterId: "chap-03",
          title: "The Geography of an Empty Chair",
          readingTime: 4,
          dateWritten: "2025-10-12 21:10",
          published: true,
          isDraft: false,
          visibility: "PRIVATE",
          mood: "Sorrowful Remembrance",
          order: 1,
          tags: ["Memory", "Solitude", "Grief"],
          oneLineLesson: "Grief is love with no place to lay its head, seeking shelter in the hollows left behind.",
          deletedAt: null,
          body: `In every house with history, there is a piece of furniture that ceases to be wood and cloth. It becomes an anchor. You walk past it without looking, yet your body tilts subtly away from it, as though entering a gravitational field.

We expect grief to strike like thunder. Instead, it arrives in the quietest hours—when you reach for a brand of tea you have not brewed in three years, or when a sudden slant of autumn sunlight cuts across the rug at four in the afternoon.

### Carrying the Shadow

The world advises you to 'move past it'—a phrase coined by people who have never held a dying hand or watched a cherished horizon turn to dust. You do not move past an amputation; you learn to walk with a deliberate limp.

And in that deliberate limp, there is profound reverence. You carry those who left not as ghosts that haunt you, but as quiet company walking half a step behind you through the evening mist.`,
        },
      ],
    },
    {
      id: "chap-04",
      bookId: "book-01",
      title: "IV. Fires Kept in Secret",
      order: 4,
      mood: "Quiet Convictions, Duty, and Midnight Resolve",
      accentColor: "#141923",
      deletedAt: null,
      spineStyle: {
        height: 395,
        width: 58,
        pattern: "gold-tooled",
        foilColor: "#e5c07b",
        leatherTone: "midnight",
      },
      epigraph: "A man who announces his virtues to the town crier has already exchanged them for small copper coins. Keep your greatest fires in the cellar.",
      entries: [
        {
          id: "entry-06",
          chapterId: "chap-04",
          title: "The Dignity of the Unspoken",
          readingTime: 5,
          dateWritten: "2025-12-04 23:15",
          published: true,
          isDraft: false,
          visibility: "PRIVATE",
          mood: "Steely Conviction",
          order: 1,
          tags: ["Discipline", "Identity", "Conviction"],
          oneLineLesson: "A conviction that requires constant public validation is not a conviction; it is an ornament.",
          deletedAt: null,
          body: `We inhabit an age that penalizes discretion. Every secret must be monetized; every private heartbreak must be packaged as educational content; every charitable gesture must be photographed under flattering lights.

To hold something back—to keep a sacrifice between yourself and the stone walls—is regarded as eccentric, or worse, wasteful.

### The Secret Flame

Yet historically, the men and women who shaped centuries did not broadcast their resolve. Marcus Aurelius kept his diary in a military tent beside the frozen Danube, writing to correct his own frailties, never intending for a single Roman citizen to read his confessions.

> *"There is unmatched power in having fires that only you tend. When you don't need anyone to witness your discipline, you become immune to their indifference."*

Let others perform their virtue on the public square. Keep your vows in the dark, where they cannot be tarnished by the applause of fools.`,
        },
      ],
    },
  ],
};
