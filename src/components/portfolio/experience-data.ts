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
  title: string;
  role: string;
  period?: string;
  summary: string;
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
    skills: ["Next.js App Router", "React", "TypeScript", "Framer Motion", "GSAP", "WebGL"],
  },
  {
    title: "Systems & Cloud",
    skills: ["Node.js", "Rust", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
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
    duration: "Hackathon build",
    logoText: "ED",
    highlights: [
      "ENS-based certificates and credentialing",
      "Gamified learning tracks",
      "Micro-payments for lessons",
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
  {
    title: "Avarch",
    role: "Product Engineer (Trainee)",
    period: "Sep 2025 - Present",
    summary:
      "Remote role based in Cary, North Carolina, focused on Web3 education platforms and ecosystem tooling.",
    memories: [
      {
        title: "Web3 education tooling",
        detail:
          "Skills focus: Project Engineering, Software Project Management, +7 skills.",
        year: "2025",
      },
    ],
  },
  {
    title: "Avarch",
    role: "Marketing Executive (Internship)",
    period: "Mar 2023 - Sep 2025",
    summary:
      "Marketing Executive internship in India supporting brand communication and design assets.",
    memories: [
      {
        title: "Design and communication work",
        detail:
          "Skills focus: Adobe Illustrator, Oral Communication, +8 skills.",
        year: "2023",
      },
    ],
  },
  {
    title: "DiyaGhar NGO",
    role: "Volunteer Intern",
    summary: "Volunteer internship supporting NGO initiatives.",
    memories: [
      {
        title: "Community support",
        detail: "Contributed as a volunteer intern for DiyaGhar NGO.",
      },
    ],
  },
];

export const EVENTS: EventEntry[] = [
  {
    id: "ethmumbai-2026",
    title: "ETHMumbai 2026",
    date: "Mar 2026",
    year: "2026",
    location: "Mumbai, India",
    summary: "Won the ENS Pool Prize for Eth.Ed, an AI-powered Web3 learning platform.",
    description:
      "Built and shipped Eth.Ed at ETHMumbai 2026, winning the ENS Pool Prize. The project integrates AI agents for personalized learning, ENS-based certificates for credentialing, and micropayments for lesson accessibility. Collaborated with teammates to deliver a production-ready full-stack application.",
    role: "Full-Stack Product Engineer",
    highlights: [
      "Won ENS Pool Prize",
      "Built AI-powered learning platform with gamification",
      "Integrated ENS certificates and smart contract micropayments",
      "Led product architecture and user experience design",
    ],
    tags: ["Hackathon", "Web3", "AI", "ENS"],
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
    title: "Hackathon Builder (ETHGlobal Delhi + ETHMumbai 2026)",
    year: "2026",
    summary:
      "Shipped Eth.Ed and won the ENS Pool Prize at ETHMumbai 2026.",
    memories: [
      {
        title: "Hackathon delivery",
        detail:
          "Built Eth.Ed and earned the ENS Pool Prize for the team.",
      },
    ],
  },
  {
    title: "Web3 + AI Product Development",
    year: "2024 - Present",
    summary:
      "Built full-stack products integrating AI agents, ENS, smart contracts, and micropayments.",
    memories: [
      {
        title: "Full-stack builds",
        detail: "Delivered AI, ENS, smart contract, and micropayment integrations in real products.",
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
    title: "Hackathon Wins (ETHGlobal Delhi + ETHMumbai 2026)",
    summary:
      "Shipped Eth.Ed and won the ENS Pool Prize at ETHMumbai 2026.",
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
      "ENS-based certificates",
      "Gamified learning tracks",
      "Micro-payments for lessons",
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
