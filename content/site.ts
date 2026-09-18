/**
 * Edit this file to personalize copy, media, and outbound links.
 * Résumé body copy lives in `resumeContent` below. The PDF download uses
 * `resumeContent.pdfHref` (e.g. a file under `public/assets/`).
 *
 * Photography files live under `public/assets/` (served as `/assets/...`).
 * Personal: Norway / Sweeden. Headshots: `public/assets/Headshots/`.
 */

export const site = {
  displayName: "Reuben Varghese",
  /** Shown on entertainment page corner */
  coordinates: "—° N, —° W",
  timeZone: "America/New_York",
  /** Idle pulse on entertainment lists (ms) */
  idleDelay: 4200,
  spotifyProfile: "https://open.spotify.com/",
  imdbProfile: "https://www.imdb.com/",
  email: "reubengvarghese@gmail.com",
  phone: "647-548-5434",
  linkedin: "https://www.linkedin.com/in/reubengvarghese",
  website: "https://reubenvarghese.ca",
  socialX: "https://x.com/",
} as const;

export type ResumeExperience = {
  organization: string;
  title: string;
  period: string;
  location?: string;
  bullets: string[];
};

export type ResumeEducation = {
  school: string;
  credential: string;
  year: string;
  location?: string;
};

export type ResumeProject = {
  name: string;
  period: string;
  stack: string;
  location?: string;
  bullets: string[];
};

export type ResumeSkillGroup = {
  heading: string;
  items: string[];
};

export type ResumeContent = {
  /** Set to `null` to hide the download control until a PDF exists. */
  pdfHref: string | null;
  summary: string;
  education: ResumeEducation[];
  projects: ResumeProject[];
  experience: ResumeExperience[];
  skillGroups: ResumeSkillGroup[];
};

export const resumeContent: ResumeContent = {
  pdfHref: "/assets/Reuben%20Varghese%20Resume%20copy.pdf",
  summary:
    "Computer Science student at Western University (Ivey Advanced Entry Opportunity) with experience across private equity deal sourcing, applied AI consulting, clinical ML research, and nonprofit operations.",
  education: [
    {
      school: "Western University",
      credential: "B.Sc. in Computer Science with Ivey Advanced Entry Opportunity (AEO)",
      year: "Sept 2025 — May 2029",
      location: "London, ON",
    },
  ],
  experience: [
    {
      organization: "Buchan Capital",
      title: "Private Equity Analyst Intern",
      period: "Aug 2026 — Dec 2026",
      location: "Vancouver, BC",
      bullets: [
        "Screened privately held companies against the fund’s acquisition mandate, mapping fragmented sectors on revenue scale, margin profile, and owner-succession dynamics to build proprietary target lists.",
        "Conducted company and sector diligence across 1,000+ targets using Apollo, Inven, and public filings to qualify leads and prioritize high-conviction deal flow for principal review.",
        "Supported direct-to-owner origination campaigns and observed owner calls alongside the principal, tracking valuation expectations and deal considerations through qualification.",
      ],
    },
    {
      organization: "Intercept",
      title: "AI Consulting Intern",
      period: "May 2026 — August 2026",
      location: "Toronto, ON",
      bullets: [
        "Collaborated with the CTO to translate business requirements into AI-driven technical solutions and workflows for Fortune-500 companies.",
        "Researched and evaluated 12+ emerging AI tools while developing prototypes and built 3 internal product solutions across agentic workflows.",
        "Authored 3 strategic slide decks presented directly to C-suite and VP-level stakeholders.",
      ],
    },
    {
      organization: "University Health Network",
      title: "AI/ML Research Analyst",
      period: "Jan 2026 — May 2026",
      location: "Toronto, ON",
      bullets: [
        "Analyzed large structured clinical datasets in Python (Pandas) to identify and quantify risk-adjusted outcomes.",
        "Implemented Kaplan–Meier estimators, Cox proportional hazards models, and DeepSurv neural networks to analyze time-to-event outcomes for liver failure.",
      ],
    },
    {
      organization: "Gen Connect",
      title: "Director of Operations",
      period: "Sept 2023 — Present",
      location: "Toronto, ON",
      bullets: [
        "Founded a registered non-profit from inception with full P&L accountability, overseeing budget management, financial planning, and long-term capital allocation.",
        "Directed logistics and digital tools for 15+ community events hosting 1000+ total participants.",
        "Executed data-driven marketing strategies that increased attendance and volunteer engagement by 40%.",
      ],
    },
    {
      organization: "Western Founders Network",
      title: "Vice President of Projects",
      period: "Oct 2025 — May 2027",
      location: "London, ON",
      bullets: [
        "Oversaw a portfolio of student-led ventures, applying project governance and milestone-tracking frameworks to keep initiatives on scope and on budget.",
        "Synthesized complex technical concepts (React, APIs, Git) into structured workshops for non-technical audiences.",
      ],
    },
  ],
  projects: [
    {
      name: "Equity Research & Valuation — Micron Technology (NASDAQ: MU)",
      period: "2026",
      stack: "Excel, Python (Pandas), Financial Modeling",
      location: "Toronto, ON",
      bullets: [
        "Built a three-statement model and five-year DCF for Micron, discounting unlevered FCF at WACC with terminal value cross-checked via perpetuity-growth and exit-multiple methods.",
        "Triangulated price target via comps analysis (EV/EBITDA, P/B), identifying HBM mix shift and memory-pricing cycle as primary valuation drivers.",
      ],
    },
    {
      name: "Commercial Real Estate Financial Modeling",
      period: "2026",
      stack: "Excel, Python (Pandas), Financial Modeling",
      location: "Toronto, ON",
      bullets: [
        "Constructed a multi-scenario DCF and cash-flow model for an income-producing property in Excel, sizing cap rate, unlevered IRR, and equity returns across base, upside, and stress cases.",
        "Modeled debt structures using leverage assumptions, interest rates, and DSCR constraints to evaluate returns.",
      ],
    },
  ],
  skillGroups: [
    {
      heading: "Analytics & tools",
      items: [
        "Excel (Pivot Tables, VLOOKUP, Modeling)",
        "SQL",
        "Tableau",
        "PowerPoint",
        "Microsoft Office",
      ],
    },
    {
      heading: "Programming",
      items: [
        "Python (Pandas / NumPy)",
        "JavaScript (React)",
        "Node",
        "C / C++",
        "HTML / CSS",
        "Java",
      ],
    },
    {
      heading: "Interests",
      items: [
        "Photography",
        "Cooking",
        "Detective movies",
        "NBA (OKC & Raptors)",
        "Tennis",
        "Chicken sandwiches",
      ],
    },
  ],
};

/** Every file under `public/assets/Norway` (11× .jpg) and `public/assets/Sweeden` (10× .jpeg). */
export const photographyImages: Array<string | { src: string; alt?: string }> = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({
    src: `/assets/Norway/photo${n}.jpg`,
    alt: `Norway — ${n}`,
  })),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
    src: `/assets/Sweeden/photo${n}.jpeg`,
    alt: `Sweden — ${n}`,
  })),
];

/** Headshots under `public/assets/Headshots`. */
export const headshotImages: Array<{ src: string; alt: string }> = [
  { src: "/assets/Headshots/Jak%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Nicho-4%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Nicho-5%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Nicho-6%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Nicho-11%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/rhea-1%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Rheya-03%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Rheya-07%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Rheya-10%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Ryan-2%20copy.jpg", alt: "Headshot" },
  { src: "/assets/Headshots/Ryan-3%20copy.jpg", alt: "Headshot" },
];

export type EntertainmentRow = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  label: string;
  year: string;
  image: string;
  href: string;
};

export const favoriteTracks: EntertainmentRow[] = [
  {
    id: "t1",
    title: "Like a Rainbow",
    subtitle: "The Rolling Stones",
    category: "Song",
    label: "Between the Buttons",
    year: "1967",
    image: "/assets/Spotify/Shes%20A%20Rainbow.jpg",
    href: "https://open.spotify.com/track/6KOtheMY0KN4s9TrQHr9It",
  },
  {
    id: "t2",
    title: "Have a Cigar",
    subtitle: "Pink Floyd",
    category: "Song",
    label: "Wish You Were Here",
    year: "1975",
    image: "/assets/Spotify/have%20a%20cigar.jpg",
    href: "https://open.spotify.com/track/3CmHvyZQQAGkKkTjTBFWN6",
  },
  {
    id: "t3",
    title: "Like Him",
    subtitle: "Tyler, the Creator",
    category: "Song",
    label: "Chromakopia",
    year: "2024",
    image: "/assets/Spotify/like%20him.jpeg",
    href: "https://open.spotify.com/track/6PnYjlV1rMGJJFk5o2uJDd",
  },
];

export const favoriteFilms: EntertainmentRow[] = [
  {
    id: "f1",
    title: "Knives Out",
    subtitle: "Rian Johnson",
    category: "Film",
    label: "Mystery / Thriller",
    year: "2019",
    image: "/assets/Movies/knives%20out.jpg",
    href: "https://www.imdb.com/title/tt4653584/",
  },
  {
    id: "f2",
    title: "Everything Everywhere All at Once",
    subtitle: "Daniel Kwan & Daniel Scheinert",
    category: "Film",
    label: "Sci-Fi / Comedy",
    year: "2022",
    image: "/assets/Movies/Everything%20Everywhere%20all%20at%20once.jpg",
    href: "https://www.imdb.com/title/tt6710474/",
  },
  {
    id: "f3",
    title: "Ted Lasso",
    subtitle: "Jason Sudeikis & Bill Lawrence",
    category: "Series",
    label: "Comedy / Drama",
    year: "2020",
    image: "/assets/Movies/ted%20lasso.jpg",
    href: "https://www.imdb.com/title/tt8488920/",
  },
];
