import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { LinkedInEmbeds } from "@/components/galleries/LinkedInEmbeds";
import { LINKEDIN_POSTS } from "@/components/portfolio/linkedin-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Governance milestones, research output, and hackathon wins.",
};

export default function AchievementsPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />
      <LinkedInEmbeds posts={LINKEDIN_POSTS} category="achievements" />
    </main>
  );
}
