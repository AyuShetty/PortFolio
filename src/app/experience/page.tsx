import type { Metadata } from "next";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { ExperienceSection } from "./ExperienceSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience spanning software engineering, Web3, product development, technical marketing, and leadership across industry and university organizations.",
};

export default function ExperiencePage() {
  return (
    <main className="content-layout">
      <header className="content-hero">
        <h1>Experience</h1>
        <p>Professional experience spanning software engineering, Web3, product development, technical marketing, and leadership across industry and university organizations.</p>
        <div style={{ marginTop: "1.5rem" }}>
          <ResumeDownloadButton />
        </div>
      </header>

      <ExperienceSection title="Professional Experience" category="professional" />
      <ExperienceSection title="Leadership & Organizations" category="leadership" />
    </main>
  );
}