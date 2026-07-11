export type ZoneKey = "hero" | "projects" | "about" | "contact";

export type ProjectCaseStudy = {
  status: string;
  github?: string;
  live?: string;
  overview: string;
  problem: string;
  whyBuilt: string;
  objectives: string[];
  myRole: string;
  architecture?: string; // text description; diagram image paths can go in gallery
  techStack: { category: string; items: string[] }[];
  challenges: { title: string; detail: string }[];
  process: string[];
  features: { title: string; detail: string }[];
  implementation: string;
  futureImprovements: string[];
  lessonsLearned: string[];
};

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
  caseStudy?: ProjectCaseStudy;
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
  month?: string;
  location: string;
  summary: string;
  description: string;
  role?: string;
  highlights: string[];
  lessonsLearned?: string[];
  technologies?: string[];
  quote?: string;
  estimatedImpact?: string;
  imageIds?: string[];
  /** Subfolder under public/events/ containing photos for this event */
  photoFolder?: string;
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

export { PROJECTS_WITH_CASE_STUDIES as PROJECTS } from "./projects-data";

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
    id: "incridea-2023",
    title: "Incridea 2023",
    date: "2023",
    year: "2023",
    location: "NMAM Institute of Technology, Nitte",
    summary: "One of my earliest opportunities to contribute to NMAMIT's flagship technical festival as a publicity committee member.",
    description:
      "Joining the publicity committee introduced me to large-scale event management for the first time. Working behind the scenes taught me how much planning, teamwork, and communication goes into creating memorable experiences for thousands of students. It became the foundation for many leadership opportunities that followed.",
    role: "Publicity Committee Member",
    highlights: [
      "Assisted publicity campaigns",
      "Coordinated promotional activities",
      "Worked with organizing committee",
      "Helped increase event visibility",
      "Supported participant engagement",
    ],
    lessonsLearned: [
      "Team collaboration",
      "Communication",
      "Event planning",
      "Marketing execution",
    ],
    estimatedImpact: "Gained foundational experience in large-scale event management that sparked a multi-year journey in leadership.",
    tags: ["Community", "Publicity", "Leadership", "Technical Festival"],
    photoFolder: "events/incridea-2023",
  },
  {
    id: "incridea-2024",
    title: "Incridea 2024",
    date: "Mar 2024",
    year: "2024",
    month: "March",
    location: "NMAMIT, Nitte",
    summary: "Returned for another edition of Incridea with greater responsibilities, contributing to promotional campaigns, technical event publicity, branding, and participant engagement.",
    description:
      "Building upon my previous experience, I became much more confident in handling responsibilities, collaborating across teams, and ensuring the success of one of NMAMIT's biggest annual events. This edition sharpened my ability to manage timelines, coordinate with multiple teams simultaneously, and deliver consistent output under pressure.",
    role: "Publicity Committee Member",
    highlights: [
      "Planned promotional campaigns",
      "Coordinated with organizing teams",
      "Supported technical workshops",
      "Improved event outreach",
    ],
    lessonsLearned: [
      "Leadership",
      "Planning",
      "Team coordination",
      "Public relations",
    ],
    estimatedImpact: "Strengthened organizational and cross-team coordination skills across one of the institute's largest annual events.",
    tags: ["Leadership", "Community", "Branding", "Events"],
    photoFolder: "events/incridea-2024",
  },
  {
    id: "ethglobal-delhi",
    title: "ETHGlobal Delhi",
    date: "2025",
    year: "2025",
    location: "New Delhi, India",
    summary: "Participated in ETHGlobal Delhi, collaborating with developers from around the world to build innovative Ethereum-based applications.",
    description:
      "ETHGlobal Delhi was one of the biggest milestones in my Web3 journey. It gave me the opportunity to work alongside talented builders, rapidly prototype ideas under hackathon pressure, and immerse myself in the global Ethereum ecosystem. Beyond the project itself, it expanded my perspective on product thinking, collaboration, and open-source development.",
    role: "Blockchain Developer",
    highlights: [
      "Built an Ethereum application",
      "Collaborated during an international hackathon",
      "Learned from protocol researchers",
      "Connected with global builders",
      "Explored emerging Ethereum technologies",
    ],
    lessonsLearned: [
      "Rapid product development",
      "Team collaboration",
      "Product thinking",
      "Technical communication",
    ],
    technologies: ["Ethereum", "Solidity", "Web3.js", "React", "TypeScript"],
    estimatedImpact: "A defining Web3 milestone — deepened protocol knowledge and established connections with global Ethereum builders.",
    tags: ["Hackathon", "Ethereum", "Web3", "Blockchain", "Innovation"],
    photoFolder: "events/ethglobal-delhi",
  },
  {
    id: "incridea-2025",
    title: "Incridea 2025",
    date: "Mar 2025",
    year: "2025",
    month: "March",
    location: "NMAMIT, Nitte",
    summary: "Continued contributing to NMAMIT's flagship technical festival by supporting publicity campaigns, branding initiatives, and technical event promotions.",
    description:
      "By my third year contributing to Incridea, I had developed strong organizational skills and understood how consistent teamwork contributes to successful large-scale events. This edition brought a deeper appreciation for how systems, people, and creativity combine to produce experiences that resonate with thousands of students.",
    role: "Publicity Committee Member",
    highlights: [
      "Event publicity",
      "Team coordination",
      "Branding",
      "Campaign planning",
    ],
    lessonsLearned: [
      "Leadership",
      "Organizational skills",
      "Consistency",
      "Creative execution",
    ],
    estimatedImpact: "Three years of Incridea contributions built a strong foundation in event management, branding, and cross-team execution.",
    tags: ["Community", "Leadership", "Festival", "Marketing"],
    photoFolder: "events/incridea-2025",
  },
  {
    id: "pizza-connections",
    title: "Pizza & Connections",
    date: "2026",
    year: "2026",
    location: "TLC Art Cafe by Web3Events, pizzadAO, DeGen & ENS for the World",
    summary: "Hosted a community pizza day celebration at TLC Art Cafe organized by Web3Events, pizzadAO, DeGen and ENS for the World.",
    description:
      "Pizza & Connections was a community pizza day celebration hosted at TLC Art Cafe by Web3Events, pizzadAO, DeGen and ENS for the World. As the host, I curated a welcoming environment where students, developers, and Web3 enthusiasts came together over pizza to build friendships, share ideas, and strengthen community ties. The event featured networking activities, games, and discussions about the future of Web3.",
    role: "Host & Organizer",
    highlights: [
      "Hosted at TLC Art Cafe by Web3Events",
      "Co-organized with pizzadAO, DeGen, and ENS for the World",
      "Curated a welcoming community environment",
      "Facilitated networking activities and games",
      "Created meaningful connections over pizza",
    ],
    lessonsLearned: [
      "Community building",
      "Event coordination",
      "Collaboration with partners",
      "People management",
      "Creating inclusive spaces",
    ],
    estimatedImpact: "Built genuine community connections in a relaxed setting — pizza day brought people together and sparked conversations that continued long after the event.",
    tags: ["Community", "Networking", "Web3", "Event Management", "Social"],
    photoFolder: "events/pizza-connections",
  },
  {
    id: "blockchain-club-inauguration",
    title: "Guest Speaker – Blockchain Club Inauguration",
    date: "2026",
    year: "2026",
    location: "S-VYASA Deemed to be University – Global City Campus",
    summary: "Invited as the keynote guest speaker for the inauguration of the Blockchain Club at S-VYASA University, delivering sessions on Blockchain, Ethereum, Web3, and decentralized systems.",
    description:
      "Being invited as a guest speaker was a significant milestone in my journey. It represented recognition of my work within the Ethereum ecosystem and provided an opportunity to inspire students by sharing practical industry experiences, career advice, and the exciting future of decentralized technologies. Inaugurating an entire blockchain club felt like a full-circle moment.",
    role: "Guest Speaker",
    highlights: [
      "Invited as keynote speaker",
      "Inaugurated Blockchain Club",
      "Delivered technical session",
      "Introduced Ethereum ecosystem",
      "Explained decentralized technologies",
      "Conducted Q&A session",
      "Shared career guidance",
    ],
    lessonsLearned: [
      "Public speaking",
      "Knowledge sharing",
      "Community leadership",
      "Technical communication",
    ],
    technologies: ["Blockchain", "Ethereum", "Web3", "Cryptography", "Smart Contracts"],
    quote: "Being invited to speak wasn't just an opportunity to teach — it was a chance to show what's possible when you invest in open ecosystems and share knowledge generously.",
    estimatedImpact: "Inspired an entire university cohort to explore blockchain development, potentially sparking the next wave of Web3 builders.",
    tags: ["Blockchain", "Ethereum", "Speaker", "Education", "Leadership", "Web3"],
    photoFolder: "events/blockchain-club-inauguration",
  },
  {
    id: "ethmumbai-2026",
    title: "ETHMumbai 2026",
    date: "Mar 2026",
    year: "2026",
    month: "March",
    location: "Mumbai, India",
    summary: "Built Eth.Ed, an AI-powered Web3 learning platform combining intelligent tutoring, gamification, blockchain credentials, and smart contract incentives.",
    description:
      "ETHMumbai pushed me to combine everything I had learned across AI, product engineering, and Web3 into a single project. Working under hackathon constraints, I focused on creating a polished user experience while integrating blockchain functionality into an education platform designed to make Web3 learning more engaging and accessible.",
    role: "Full-Stack Product Engineer",
    highlights: [
      "Built production-ready application",
      "Designed complete product architecture",
      "Integrated AI-powered learning",
      "Implemented smart contracts",
      "Developed full-stack platform",
      "Presented final solution",
    ],
    lessonsLearned: [
      "Product development",
      "AI integration",
      "User experience",
      "Web3 architecture",
      "Full-stack engineering",
    ],
    technologies: ["Next.js", "TypeScript", "Solidity", "Ethereum", "AI Agents", "ENS"],
    estimatedImpact: "Delivered a production-grade Web3 education platform and won the ENS Pool Prize at ETHMumbai 2026.",
    tags: ["AI", "Product Engineering", "Ethereum", "Hackathon", "Web3", "Education"],
    photoFolder: "events/ethmumbai-2026",
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
    summary: "AI-powered Web3 learning platform. Won ENS Pool Prize at ETHMumbai 2026.",
    details: [
      "Gamified learning tracks with AI personalization",
      "Smart contract micropayments and ENS-based credentials",
      "Full-stack architecture from zero to deployment",
    ],
  },
  {
    title: "Local AI Infrastructure",
    summary: "Distributed local AI workflow platform for autonomous orchestration and LLM execution.",
    details: [
      "Python, Ollama, Docker, Playwright, Open WebUI",
      "Autonomous workflow orchestration across multiple systems",
      "Browser automation and distributed local LLM execution",
    ],
  },
  {
    title: "AI Workflow Automation Engine",
    summary: "Automation framework integrating local AI with browser automation for engineering tasks.",
    details: [
      "Intelligent agent pipelines for repetitive task automation",
      "Document processing with local LLM integration",
      "Python + Playwright + AI agents",
    ],
  },
  {
    title: "Smart Home IoT Platform",
    summary: "ESP32-based smart automation system with modular architecture for home automation.",
    details: [
      "Wireless device control and sensor monitoring",
      "Modular architecture designed to scale",
      "ESP32, embedded C++, IoT protocols",
    ],
  },
  {
    title: "Facial KeyGen",
    summary: "Biometric authentication system generating cryptographic keys from facial recognition.",
    details: [
      "Computer vision pipeline using OpenCV",
      "ML-based facial biometric extraction",
      "Explored as complementary approach for post-quantum security",
    ],
  },
  {
    title: "AirGesture",
    summary: "Real-time hand gesture recognition for touchless presentation control.",
    details: [
      "Python, OpenCV, MediaPipe",
      "Real-time inference for classroom and presentation use",
      "Translates gestures into slide controls",
    ],
  },
  {
    title: "EtherWorld iOS",
    summary: "Designed the architecture and modular structure for the EtherWorld iOS application.",
    details: [
      "Scalable navigation architecture",
      "API integration patterns",
      "Maintainable modular app structure",
    ],
  },
  {
    title: "EIPsInsight",
    summary: "Ethereum governance analytics platform — team project, EF ESP-supported.",
    details: [
      "Frontend contribution to EIP lifecycle tracking",
      "Governance insight dashboards in React + TypeScript",
      "Contributed to an Ethereum Foundation-supported project",
    ],
  },
  {
    title: "This Portfolio",
    summary: "Immersive developer portfolio with 3D dome gallery and editorial design.",
    details: [
      "3D canvas dome built with Three.js",
      "Scroll-driven animations and motion design",
      "Full design system in Next.js + TypeScript",
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
