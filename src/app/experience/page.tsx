import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceHero } from "./ExperienceHero";
import { ExperienceSection } from "./ExperienceSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience spanning software engineering, full-stack development, AI integration, and leadership across industry and university organizations.",
};

export default function ExperiencePage() {
  return (
    <main className="content-layout">
      <ExperienceHero />

      <ExperienceSection title="Professional Experience" category="professional" />
      <ExperienceSection title="Leadership & Organizations" category="leadership" />

      <section className="page-cta">
        <h3>Explore project work</h3>
        <p>See what I've built across software engineering, AI, and product development</p>
        <Link href="/projects" className="cta-button">View Projects</Link>
      </section>
    </main>
  );
}