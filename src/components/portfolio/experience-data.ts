export type ZoneKey = "hero" | "projects" | "about" | "contact";

export type ProjectEntry = {
  id: string;
  title: string;
  summary: string;
  stack: string;
  role: string;
  year: string;
  impact: string;
  href: string;
  tags: string[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type ServiceEntry = {
  title: string;
  summary: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  summary: string;
};

export type SocialEntry = {
  label: string;
  href: string;
};

export type ContributionEntry = {
  title: string;
  subtitle: string;
  duration?: string;
  logoText: string;
  highlights: string[];
};

export type MemoryEntry = {
  title: string;
  detail: string;
  year?: string;
};

export type ExperienceEntry = {
  category: "professional" | "leadership";
  title: string;
  org?: string;
  role: string;
  period?: string;
  location?: string;
  summary: string;
  highlights?: string[];
  skills: string[];
  icon: string;
  memories: MemoryEntry[];
};

export type AchievementEntry = {
  title: string;
  year: string;
  summary: string;
  memories: MemoryEntry[];
};

export type CertificationEntry = {
  title: string;
  issuer: string;
  year?: string;
  summary?: string;
  credentialUrl?: string;
};

export type PoapEntry = {
  title: string;
  event: string;
  year?: string;
  summary?: string;
  badgeUrl?: string;
};

export type EventEntry = {
  id: string;
  title: string;
  date: string;
  year: string;
  location: string;
  summary: string;
  description: string;
  role?: string;
  highlights: string[];
  imageIds?: string[];
  tags: string[];
  website?: string;
};

export type HighlightEntry = {
  title: string;
  summary: string;
  details?: string[];
};

export type LeadershipEntry = {
  title: string;
  period?: string;
  summary: string;
  details?: string[];
};

export type WritingEntry = {
  title: string;
  summary: string;
  details?: string[];
};

export type ProjectWorkEntry = {
  title: string;
  summary: string;
  details: string[];
};

export type CommunityEntry = {
  title: string;
  summary: string;
  details?: string[];
};

export type NotableWinEntry = {
  title: string;
  summary: string;
};

export type StatEntry = {
  value: string;
  label: string;
};

export type TestimonialEntry = {
  quote: string;
  author: string;
  role: string;
};

export type GitHubRepoEntry = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  featured?: boolean;
  lastUpdated: string;
  commitActivity?: number;
};

export const ZONES: Array<{ key: ZoneKey; label: string; range: [number, number] }> = [
  { key: "hero", label: "Arrival", range: [0, 0.24] },
  { key: "projects", label: "Works", range: [0.24, 0.53] },
  { key: "about", label: "Origins", range: [0.53, 0.8] },
  { key: "contact", label: "Contact", range: [0.8, 1] },
];

export const PROJECTS: ProjectEntry[] = [
  {
    id: "eth-ed",
    title: "Eth.Ed",
    summary: "AI-powered Web3 learning platform with ENS-based certificates and gamified lessons.",
    stack: "AI agents, ENS, Web3, Micropayments",
    role: "Product Engineer",
    year: "2026",
    impact: "Built an end-to-end learning platform with payments and credentialing.",
    href: "/projects/eth-ed",
    tags: ["Web3", "AI", "Education"],
  },
  {
    id: "eipsinsight",
    title: "EIPsInsight",
    summary: "Ethereum governance analytics platform for tracking EIP lifecycles.",
    stack: "Web3 analytics, UI/UX, Data viz",
    role: "Contributor",
    year: "2024",
    impact: "Helped contributors interpret governance signals with clearer insights.",
    href: "/projects/eipsinsight",
    tags: ["Governance", "Web3", "Analytics"],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend & Interaction",
    skills: ["Next.js App Router", "React", "TypeScript", "Framer Motion", "GSAP"],
  },
  {
    title: "Systems & Cloud",
    skills: ["Node.js", "PostgreSQL", "Cloud Architecture", "API Design"],
  },
  {
    title: "Process & Product",
    skills: ["Architecture", "Performance Audits", "Design Systems", "DX", "Mentoring", "Roadmapping"],
  },
];

export const SERVICES: ServiceEntry[] = [
  {
    title: "Interactive Product Engineering",
    summary: "Building performant web interfaces where motion and usability reinforce each other.",
  },
  {
    title: "Platform & Architecture",
    summary: "Designing maintainable systems, deployment workflows, and observability foundations.",
  },
  {
    title: "Experience Prototyping",
    summary: "Rapid concept-to-demo loops for premium digital storytelling and launch experiences.",
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2022",
    title: "Built First Product Team Stack",
    summary: "Shipped a full internal workflow suite adopted by design, content, and engineering teams.",
  },
  {
    year: "2024",
    title: "Scaled Platform Reliability",
    summary: "Introduced observability and release guardrails across services and environments.",
  },
  {
    year: "2026",
    title: "Focused on Immersive Interfaces",
    summary: "Merged interface architecture with cinematic interaction design for portfolio experiences.",
  },
];

export const SOCIALS: SocialEntry[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "Email", href: "mailto:ayush.avarch@gmail.com" },
];

export const CONTRIBUTIONS: ContributionEntry[] = [
  {
    title: "EIPsInsight",
    subtitle: "Governance analytics + tooling",
    logoText: "EI",
    highlights: [
      "Ethereum governance analytics and EIP lifecycle clarity",
      "Grant milestone via Ethereum Foundation ESP support",
      "Contributions across research, product, and community tooling",
    ],
  },
  {
    title: "Eth.Ed",
    subtitle: "AI-powered Web3 learning platform",
    logoText: "ED",
    highlights: [
      "Gamified learning tracks with AI personalization",
      "Smart contract integration for lesson accessibility",
      "Full-stack Web3 architecture",
    ],
  },
  {
    title: "EtherWorld",
    subtitle: "Ethereum research and publishing",
    logoText: "EW",
    highlights: [
      "200+ published Ethereum research articles",
      "Deep protocol explainers (Partial History Expiry)",
      "Community knowledge building",
    ],
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  // ── Professional ─────────────────────────────────────────────────────────
  {
    category: "professional",
    title: "Avarch",
    role: "Product Engineer (Trainee)",
    period: "Sep 2025 – Present",
    location: "Remote · Cary, North Carolina",
    summary:
      "Building Web3 education platforms, developer tooling, automation systems, backend services, and ecosystem infrastructure. Contributing across engineering, product development, project planning, documentation, and platform architecture.",
    skills: [
      "Product Engineering",
      "Software Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Project Management",
      "Web3",
      "Git",
      "Automation",
    ],
    icon: "AV",
    memories: [],
  },
  {
    category: "professional",
    title: "Avarch",
    role: "Marketing Executive (Intern)",
    period: "Mar 2023 – Sep 2025",
    location: "India · Remote",
    summary:
      "Product marketing, branding, content strategy, technical writing, social media management, graphic design, and community engagement for Web3 products and educational initiatives.",
    skills: [
      "Marketing",
      "Branding",
      "Adobe Illustrator",
      "Canva",
      "Content Strategy",
      "Technical Writing",
      "Social Media",
      "Graphic Design",
    ],
    icon: "AV",
    memories: [],
  },

  // ── University Leadership ────────────────────────────────────────────────
  {
    category: "leadership",
    title: "COPE",
    org: "NMAM Institute of Technology",
    role: "President",
    period: "Jun 2024 – Jul 2025",
    summary:
      "Led one of NMAMIT's largest student mental health organizations, managing a team of 20+ members while planning campus-wide initiatives, awareness campaigns, workshops, and organizational strategy.",
    highlights: [
      "Led executive committee and volunteers",
      "Managed operations and annual planning",
      "Organized mental health workshops and awareness drives",
      "Coordinated with clubs, faculty, and external organizations",
      "Represented the organization at official events",
      "Oversaw recruitment, onboarding, and member training",
    ],
    skills: [
      "Leadership",
      "Project Management",
      "Team Management",
      "Event Management",
      "Public Speaking",
      "Community Building",
      "Strategic Planning",
    ],
    icon: "CP",
    memories: [],
  },
  {
    category: "leadership",
    title: "COPE",
    org: "NMAM Institute of Technology",
    role: "Vice President",
    period: "Aug 2023 – Jul 2024",
    summary:
      "Supported organizational leadership by coordinating volunteers, planning events, managing internal operations, and helping scale outreach across campus.",
    highlights: [
      "Assisted executive decision making",
      "Coordinated volunteer activities",
      "Planned awareness initiatives",
      "Managed logistics for events",
      "Helped recruit and mentor new members",
    ],
    skills: [
      "Leadership",
      "Coordination",
      "Communication",
      "Operations",
      "Volunteer Management",
    ],
    icon: "CP",
    memories: [],
  },
  {
    category: "leadership",
    title: "Developer Student Clubs (Google DSC)",
    org: "NMAM Institute of Technology",
    role: "Social Media Head",
    summary:
      "Managed the club's digital presence by creating promotional campaigns, designing technical content, increasing engagement, and marketing workshops, hackathons, and developer events.",
    highlights: [
      "Planned social media strategy",
      "Designed promotional creatives",
      "Increased engagement for technical events",
      "Worked closely with organizing teams",
    ],
    skills: [
      "Social Media Marketing",
      "Graphic Design",
      "Branding",
      "Canva",
      "Adobe Illustrator",
      "Content Strategy",
    ],
    icon: "DS",
    memories: [],
  },
  {
    category: "leadership",
    title: "CSI Student Branch",
    org: "NMAM Institute of Technology",
    role: "Social Media Head",
    summary:
      "Managed social media communication and digital branding for the Computer Society of India student chapter, promoting workshops, seminars, and technical activities.",
    highlights: [
      "Designed event campaigns",
      "Managed online communications",
      "Created promotional graphics",
      "Increased visibility of technical events",
    ],
    skills: [
      "Marketing",
      "Branding",
      "Graphic Design",
      "Content Creation",
      "Communication",
    ],
    icon: "CS",
    memories: [],
  },
  {
    category: "leadership",
    title: "Club Rachana",
    org: "NMAM Institute of Technology",
    role: "Publicity Head",
    summary:
      "Led publicity and promotional efforts for cultural and student events by coordinating marketing campaigns, designing creatives, and managing event visibility.",
    highlights: [
      "Planned publicity campaigns",
      "Coordinated promotional activities",
      "Managed creative assets",
      "Worked with organizing committee",
    ],
    skills: [
      "Leadership",
      "Marketing",
      "Graphic Design",
      "Branding",
      "Communication",
    ],
    icon: "RC",
    memories: [],
  },
  {
    category: "leadership",
    title: "Vista",
    org: "NMAM Institute of Technology",
    role: "Publicity Head",
    summary:
      "Directed promotional campaigns for campus initiatives, ensuring effective communication, branding, and student engagement.",
    highlights: [
      "Managed publicity strategy",
      "Designed promotional materials",
      "Coordinated event marketing",
      "Increased student participation",
    ],
    skills: [
      "Campaign Management",
      "Marketing",
      "Design",
      "Leadership",
      "Communication",
    ],
    icon: "VI",
    memories: [],
  },
  {
    category: "leadership",
    title: "Incridea",
    org: "NMAM Institute of Technology",
    role: "Publicity Member",
    period: "2024",
    summary:
      "Contributed to the publicity team for NMAMIT's flagship technical festival by supporting event promotions, outreach campaigns, creative design, and marketing initiatives.",
    highlights: [
      "Assisted publicity campaigns",
      "Supported technical festival promotions",
      "Worked with publicity and organizing teams",
      "Helped execute marketing activities",
    ],
    skills: [
      "Marketing",
      "Teamwork",
      "Communication",
      "Design",
      "Event Promotion",
    ],
    icon: "IN",
    memories: [],
  },
];

export const EVENTS: EventEntry[] = [
  {
    id: "ethmumbai-2026",
    title: "ETHMumbai 2026",
    date: "Mar 2026",
    year: "2026",
    location: "Mumbai, India",
    summary: "Built Eth.Ed, an AI-powered Web3 learning platform with smart contract integration.",
    description:
      "Shipped Eth.Ed at ETHMumbai 2026, an AI-powered learning platform integrating personalized learning paths, gamification, and smart contract-based micropayments for lesson accessibility. Collaborated with teammates to deliver a production-ready full-stack application.",
    role: "Full-Stack Product Engineer",
    highlights: [
      "Built AI-powered learning platform with gamification",
      "Integrated smart contract micropayments for lesson accessibility",
      "Led product architecture and user experience design",
      "Deployed production-grade full-stack Web3 application",
    ],
    tags: ["Web3", "AI", "Product"],
    imageIds: ["ethmumbai-2026-01", "ethmumbai-2026-02"],
  },
  {
    id: "ethglobal-delhi",
    title: "ETHGlobal Delhi",
    date: "2024",
    year: "2024",
    location: "Delhi, India",
    summary: "Participated in ETHGlobal Delhi hackathon, building Web3 governance tools.",
    description:
      "Contributed to blockchain projects focused on Ethereum governance and tooling. Explored smart contract development, protocol mechanics, and community solutions during this global hackathon.",
    role: "Blockchain Developer",
    highlights: [
      "Explored governance protocols and EIP mechanisms",
      "Built smart contract prototypes",
      "Networked with global Web3 builders",
    ],
    tags: ["Hackathon", "Web3", "Governance"],
    imageIds: ["ethglobal-delhi-01"],
  },
  {
    id: "incridea-2024",
    title: "Incridea Fest 2024",
    date: "Mar 2024",
    year: "2024",
    location: "NMAMIT, Nitte",
    summary: "Organized and participated in Incridea, a major tech festival and hackathon.",
    description:
      "Led publicity and outreach for Incridea Fest 2024, a college-level technology festival featuring workshops, competitions, and innovation challenges. Contributed to event organization and community engagement.",
    role: "Publicity Committee Member",
    highlights: [
      "Managed marketing and brand awareness",
      "Coordinated participant engagement and logistics",
      "Organized workshops and tech talks",
    ],
    tags: ["Festival", "Community", "Tech"],
    imageIds: ["incridea-2024-01", "incridea-2024-02"],
  },
  {
    id: "ethereumforge-workshops",
    title: "ETHERforge Community Workshops",
    date: "2023-2024",
    year: "2024",
    location: "Online & India",
    summary: "Mentored and guided community members through blockchain development workshops.",
    description:
      "Facilitated hands-on workshops introducing developers to Ethereum, smart contracts, and Web3 tooling. Provided mentorship to junior developers learning blockchain concepts and building their first decentralized applications.",
    role: "Mentor & Workshop Facilitator",
    highlights: [
      "Guided 20+ junior developers through blockchain fundamentals",
      "Created tutorial content and workshop materials",
      "Facilitated peer learning and debugging sessions",
      "Built reusable examples and starter templates",
    ],
    tags: ["Workshop", "Mentorship", "Education"],
    imageIds: ["ethereumforge-01"],
  },
  {
    id: "web3-meetups",
    title: "India Web3 Meetups & Ecosystem Events",
    date: "2023-2026",
    year: "2026",
    location: "Multiple Cities, India",
    summary: "Active participant and contributor to India's Web3 and Ethereum community.",
    description:
      "Regularly attended and contributed to local Web3 meetups, Ethereum community gatherings, and ecosystem events across India. Shared knowledge about protocol developments, governance, and building in Web3.",
    role: "Community Contributor",
    highlights: [
      "Attended 15+ ecosystem events and meetups",
      "Shared insights on Ethereum governance and protocol research",
      "Contributed to community discussions and peer learning",
      "Networked with builders, researchers, and entrepreneurs",
    ],
    tags: ["Community", "Networking", "Web3"],
    imageIds: ["meetup-01", "meetup-02"],
  },
];

export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    title: "Ethereum Foundation Grant Contribution",
    year: "2024",
    summary:
      "Contributed to EIPsInsight, which received funding from the Ethereum Foundation Ecosystem Support Program.",
    memories: [
      {
        title: "Governance tooling milestone",
        detail:
          "Supported a major milestone in Ethereum governance tooling through EIPsInsight contributions.",
      },
    ],
  },
  {
    title: "200+ Published Articles on EtherWorld",
    year: "2023 - Present",
    summary:
      "Consistently wrote and contributed deep-dive Ethereum content to simplify protocol concepts.",
    memories: [
      {
        title: "Deep technical guides",
        detail:
          "Covered topics like Partial History Expiry and protocol-level research breakdowns.",
      },
    ],
  },
  {
    title: "Full-Stack Web3 Product Building",
    year: "2026",
    summary:
      "Shipped production-grade Web3 applications combining AI, smart contracts, and user-centric design.",
    memories: [
      {
        title: "Web3 product delivery",
        detail:
          "Built Eth.Ed as a full-stack Web3 learning platform with AI personalization and smart contract payments.",
      },
    ],
  },
  {
    title: "Web3 + AI Product Development",
    year: "2024 - Present",
    summary:
      "Built full-stack products integrating AI agents, smart contracts, and decentralized infrastructure.",
    memories: [
      {
        title: "Full-stack builds",
        detail: "Delivered AI, smart contract, and Web3 infrastructure integrations in production applications.",
      },
    ],
  },
];

export const TOP_HIGHLIGHTS: HighlightEntry[] = [
  {
    title: "Ethereum Foundation Grant Contribution",
    summary:
      "Contributed to EIPsInsight, which received support from the Ethereum Foundation Ecosystem Support Program.",
  },
  {
    title: "200+ Published Articles",
    summary:
      "Wrote and contributed deep-dive Ethereum content on EtherWorld to make protocol research accessible.",
  },
  {
    title: "Web3 Product Engineering",
    summary:
      "Built and shipped production-grade Web3 applications combining AI personalization, smart contracts, and decentralized infrastructure.",
  },
  {
    title: "COPE President",
    summary:
      "Led a national-level mental health initiative backed by Aditya Birla's Mpower.",
  },
];

export const LEADERSHIP_POSITIONS: LeadershipEntry[] = [
  {
    title: "President - COPE NMAMIT",
    period: "2024-25",
    summary: "Led a national-level mental health initiative backed by Aditya Birla's Mpower.",
  },
  {
    title: "Vice President - COPE NMAMIT",
    period: "2023-24",
    summary: "Scaled mental health awareness and peer support systems.",
  },
  {
    title: "Social Media Head - Google Developers Student Club",
    summary: "Managed community growth and engagement for a major tech club.",
  },
  {
    title: "Publicity Coordinator - Rachana Club",
    summary: "Led branding and creative outreach initiatives.",
  },
  {
    title: "Publicity Co-Head - HackerEarth Hub NMAMIT",
    summary: "Worked on developer community building and hackathon engagement.",
  },
  {
    title: "Operations - Web3Events",
    summary: "Contributed to partnerships, ecosystem events, and large-scale Web3 initiatives.",
  },
  {
    title: "Product Engineer (Trainee) - Avarch",
    period: "Sep 2025 - Present",
    summary: "Worked on Web3 education platforms and ecosystem tooling.",
  },
];

export const WRITING_HIGHLIGHTS: WritingEntry[] = [
  {
    title: "200+ Published Articles on EtherWorld",
    summary:
      "Consistently delivered deep-dive Ethereum content that simplifies protocol-level research.",
    details: [
      "Partial History Expiry breakdowns",
      "EIP lifecycle explainers",
      "Protocol research summaries for the community",
    ],
  },
  {
    title: "Ethereum Research Storytelling",
    summary: "Translated complex governance and protocol updates into actionable community guides.",
  },
];

export const PROJECT_WORK: ProjectWorkEntry[] = [
  {
    title: "Eth.Ed",
    summary: "AI-powered Web3 learning platform.",
    details: [
      "Gamified learning tracks with AI personalization",
      "Smart contract integration for micropayments",
      "Full-stack Web3 architecture and deployment",
    ],
  },
  {
    title: "EIPsInsight",
    summary: "Ethereum governance analytics platform.",
    details: [
      "Helps contributors understand EIP lifecycles",
      "Governance insight dashboards",
    ],
  },
  {
    title: "EtherWorld Contributions",
    summary: "Deep technical guides and protocol research breakdowns.",
    details: [
      "Partial History Expiry guides",
      "Protocol-level research summaries",
    ],
  },
];

export const COMMUNITY_IMPACT: CommunityEntry[] = [
  {
    title: "Mental Health Advocacy (COPE)",
    summary: "Organized open mics, outreach sessions, and awareness campaigns.",
    details: ["Built safe spaces for students and peer support networks."],
  },
  {
    title: "Workshop Mentorship & Guidance",
    summary: "Guided juniors in blockchain workshops (ETHERforge and more).",
  },
  {
    title: "NGO Internship - DiyaGhar",
    summary: "Worked in education for underprivileged children.",
    details: ["Assisted teaching and community development."],
  },
];

export const NOTABLE_WINS: NotableWinEntry[] = [
  {
    title: "Sports Achievement - Basketball",
    summary: "Part of the winning team.",
  },
  {
    title: "Web3 Ecosystem Participation",
    summary: "Active in meetups, hackathons, and ecosystem events.",
  },
  {
    title: "Ethereum Research Presence",
    summary: "Built a strong presence in Ethereum research and community spaces.",
  },
];

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    title: "Japanese Language (Elite Certificate)",
    issuer: "NPTEL (IIT Kanpur)",
  },
  {
    title: "Certified Youth Mental Health First Aider",
    issuer: "Mpower / MHFA International",
  },
  {
    title: "30+ Hours Mental Health Volunteering Recognition",
    issuer: "COPE + Mpower",
  },
  {
    title: "Publicity Committee Certificate",
    issuer: "Incridea Fest",
  },
  {
    title: "COPE Leadership Recognition (President)",
    issuer: "COPE NMAMIT",
  },
  {
    title: "COPE Vice President Certificate of Appreciation",
    issuer: "COPE NMAMIT",
  },
  {
    title: "GDSC Social Media Head Recognition",
    issuer: "Google Developers Student Club",
  },
  {
    title: "HackerEarth Hub Publicity Co-Head Certificate",
    issuer: "HackerEarth Hub NMAMIT",
  },
];

export const POAPS: PoapEntry[] = [];

export const STATS: StatEntry[] = [
  { value: "200+", label: "Ethereum research articles published" },
  { value: "ENS Pool Prize", label: "ETHMumbai 2026 hackathon win" },
  { value: "ESP Grant", label: "Ethereum Foundation-supported milestone" },
  { value: "30+ hrs", label: "mental health volunteering" },
];

export const TESTIMONIALS: TestimonialEntry[] = [];
