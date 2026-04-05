import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { LinkedInEmbeds } from "@/components/galleries/LinkedInEmbeds";
import { LINKEDIN_POSTS } from "@/components/portfolio/linkedin-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Academic credentials, certifications, and recognitions earned along the journey.",
};

export default function CertificationsPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />
      <LinkedInEmbeds posts={LINKEDIN_POSTS} />
    </main>
  );
}
