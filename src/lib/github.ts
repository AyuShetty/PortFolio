import type { GitHubRepoEntry } from "@/components/portfolio/experience-data";

const GITHUB_USERNAME = "AyuShetty";
// Update these with your actual featured repository names
const FEATURED_REPOS = ["EIPsInsight", "eth-ed"];

export async function fetchGitHubRepos(): Promise<GitHubRepoEntry[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        signal: controller.signal,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("Failed to fetch GitHub repos:", response.statusText);
      return [];
    }

    const repos = await response.json();

    // Transform GitHub API response to our format
    const transformedRepos: GitHubRepoEntry[] = repos
      .filter((repo: any) => !repo.fork) // Filter out forks
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        featured: FEATURED_REPOS.includes(repo.name),
        lastUpdated: new Date(repo.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        commitActivity: repo.watchers_count, // Proxy for activity
      }))
      .sort((a: GitHubRepoEntry, b: GitHubRepoEntry) => {
        // Featured repos first, then by stars
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.stars - a.stars;
      });

    return transformedRepos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export function getCommitActivityLabel(activity: number): string {
  if (activity === 0) return "No activity";
  if (activity === 1) return "Low activity";
  if (activity < 5) return "Moderate activity";
  return "High activity";
}
