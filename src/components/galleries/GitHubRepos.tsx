"use client";

import Link from "next/link";
import type { GitHubRepoEntry } from "@/components/portfolio/experience-data";
import { getCommitActivityLabel } from "@/lib/github";

interface GitHubReposProps {
  repos: GitHubRepoEntry[];
  showFeaturedOnly?: boolean;
}

export function GitHubRepos({ repos, showFeaturedOnly = false }: GitHubReposProps) {
  const displayRepos = showFeaturedOnly ? repos.filter((r) => r.featured) : repos;

  if (displayRepos.length === 0) {
    return <p className="text-gray-400">No repositories found.</p>;
  }

  return (
    <div className="repos-grid">
      {displayRepos.map((repo) => (
        <div key={repo.name} className="repo-card">
          {repo.featured && <div className="featured-badge">Featured</div>}
          <div className="repo-header">
            <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="repo-name">
              {repo.name}
            </Link>
            {repo.language && <span className="language-tag">{repo.language}</span>}
          </div>

          {repo.description && <p className="repo-description">{repo.description}</p>}

          <div className="repo-footer">
            <div className="repo-stats">
              {repo.stars > 0 && (
                <span className="stat">
                  <span aria-hidden="true">⭐</span> {repo.stars}
                </span>
              )}
              {repo.commitActivity !== undefined && (
                <span className="stat" title={getCommitActivityLabel(repo.commitActivity)}>
                  <span aria-hidden="true">📝</span> {getCommitActivityLabel(repo.commitActivity)}
                </span>
              )}
            </div>
            <span className="repo-date">{repo.lastUpdated}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
