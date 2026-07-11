import type { Metadata } from "next";
import Link from "next/link";
import { LinkedInEmbeds } from "@/components/galleries/LinkedInEmbeds";
import { LINKEDIN_POSTS } from "@/components/portfolio/linkedin-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Key milestones in software engineering, community leadership, and technical contributions.",
};

export default function AchievementsPage() {
  return (
    <main className="content-layout">
      <header className="content-hero">
        <h1>Achievements</h1>
        <p>Key milestones in software engineering, community leadership, and technical contributions.</p>
      </header>

      <LinkedInEmbeds posts={LINKEDIN_POSTS} category="achievements" />

      <section className="page-cta">
        <h3>View full experience</h3>
        <p>Explore professional journey and leadership roles</p>
        <Link href="/experience" className="cta-button">Experience</Link>
      </section>
    </main>
  );
}
