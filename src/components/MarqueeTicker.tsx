"use client";

const ITEMS = [
  "Software Engineering",
  "Full-Stack Development",
  "AI Integration",
  "Web3 Architecture",
  "Product Engineering",
  "Next.js · React · TypeScript",
  "Node.js · Python",
  "Smart Contracts · Solidity",
  "Ethereum Ecosystem",
  "Hackathon Winner",
  "200+ Articles Published",
  "Open Source Contributor",
];

export function MarqueeTicker() {
  // Duplicate for seamless loop
  const allItems = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
