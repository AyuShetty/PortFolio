"use client";

import { useEffect } from "react";
import type { LinkedInPostEntry } from "@/components/portfolio/linkedin-posts";

interface LinkedInEmbedProps {
  posts: LinkedInPostEntry[];
  showFeaturedOnly?: boolean;
  category?: "technical" | "cultural" | "achievements" | "all";
}

export function LinkedInEmbeds({ posts, category = "all" }: LinkedInEmbedProps) {
  const filteredPosts = category === "all" ? posts : posts.filter((p) => p.category === category);

  const technicalPosts = filteredPosts.filter((p) => p.category === "technical");
  const culturalPosts = filteredPosts.filter((p) => p.category === "cultural");
  const achievementPosts = filteredPosts.filter((p) => p.category === "achievements");

  useEffect(() => {
    // Pause Lenis while hovering over iframes so LinkedIn embeds scroll natively
    const wrappers = document.querySelectorAll<HTMLElement>(".linkedin-post-wrapper");
    const lenisEl = document.documentElement;

    const pause = () => lenisEl.setAttribute("data-lenis-prevent", "true");
    const resume = () => lenisEl.removeAttribute("data-lenis-prevent");

    wrappers.forEach((el) => {
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);
    });

    return () => {
      wrappers.forEach((el) => {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
      });
      resume();
    };
  }, [posts]);

  const renderPost = (urn: string) => (
    <div key={urn} className="linkedin-post-wrapper" data-lenis-prevent>
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/${urn}?collapsed=1`}
        height="400"
        width="504"
        frameBorder="0"
        allowFullScreen
        title="Embedded post"
        loading="lazy"
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
