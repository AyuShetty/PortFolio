"use client";

import { useEffect } from "react";
import type { LinkedInPostEntry } from "@/components/portfolio/linkedin-posts";

interface LinkedInEmbedProps {
  posts: LinkedInPostEntry[];
  showFeaturedOnly?: boolean;
  category?: "technical" | "cultural" | "achievements" | "all";
}

declare global {
  interface Window {
    IN?: {
      parse: () => void;
    };
  }
}

export function LinkedInEmbeds({ posts, category = "all" }: LinkedInEmbedProps) {
  // Filter posts by category
  const filteredPosts =
    category === "all" ? posts : posts.filter((p) => p.category === category);

  const technicalPosts = filteredPosts.filter((p) => p.category === "technical");
  const culturalPosts = filteredPosts.filter((p) => p.category === "cultural");
  const achievementPosts = filteredPosts.filter((p) => p.category === "achievements");

  useEffect(() => {
    // Load LinkedIn embed script
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.IN) {
        window.IN.parse();
      }
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const renderPost = (urn: string) => (
    <div key={urn} className="linkedin-post-wrapper">
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/${urn}?collapsed=1`}
        height="668"
        width="504"
        frameBorder="0"
        allowFullScreen
        title="Embedded post"
      />
    </div>
  );

  return (
    <>
      {technicalPosts.length > 0 && (
        <section className="panel">
          <h2>Technical Insights</h2>
          <p>Deep dives into Web3, governance, and protocol-level research.</p>
          <div className="linkedin-posts-grid">
            {technicalPosts.map((post) => renderPost(post.urn))}
          </div>
        </section>
      )}

      {culturalPosts.length > 0 && (
        <section className="panel">
          <h2>Cultural & Community</h2>
          <p>Thoughts on education, leadership, and building communities.</p>
          <div className="linkedin-posts-grid">
            {culturalPosts.map((post) => renderPost(post.urn))}
          </div>
        </section>
      )}

      {achievementPosts.length > 0 && (
        <section className="panel">
          <h2>Milestones & Wins</h2>
          <p>Notable achievements, recognitions, and major wins.</p>
          <div className="linkedin-posts-grid">
            {achievementPosts.map((post) => renderPost(post.urn))}
          </div>
        </section>
      )}
    </>
  );
}
