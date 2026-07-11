import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS_WITH_CASE_STUDIES } from "@/components/portfolio/projects-data";

type ProjectParams = { slug: string };

export async function generateStaticParams() {
  return PROJECTS_WITH_CASE_STUDIES.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_WITH_CASE_STUDIES.find((p) => p.id === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.caseStudy?.overview ?? project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<ProjectParams>;
}) {
  const { slug } = await params;
  const project = PROJECTS_WITH_CASE_STUDIES.find((p) => p.id === slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const relatedProjects = PROJECTS_WITH_CASE_STUDIES.filter(
    (p) => p.id !== project.id
  ).slice(0, 3);

  return (
    <main className="cs-layout">
      {/* ── Back nav ─────────────────────────────── */}
      <nav className="cs-back">
        <Link href="/projects" className="cs-back__link">
          ← All Projects
        </Link>
      </nav>

      {/* ── Hero ──────────────────────────────────── */}
      <header className="cs-hero">
        <div className="cs-hero__eyebrow">
          <span className="cs-hero__year">{project.year}</span>
          <span className={`cs-hero__badge ${project.role.startsWith("Solo") ? "cs-hero__badge--solo" : "cs-hero__badge--team"}`}>
            {project.role.startsWith("Solo") ? "Solo" : "Team"}
          </span>
          {cs?.status && <span className="cs-hero__status">{cs.status}</span>}
        </div>
        <h1 className="cs-hero__title">{project.title}</h1>
        <p className="cs-hero__summary">{project.summary}</p>

        <div className="cs-hero__meta">
          <div className="cs-meta-item">
            <span className="cs-meta-label">Role</span>
            <span className="cs-meta-value">{project.role}</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Year</span>
            <span className="cs-meta-value">{project.year}</span>
          </div>
          <div className="cs-meta-item">
            <span className="cs-meta-label">Stack</span>
            <span className="cs-meta-value">{project.stack}</span>
          </div>
          {cs?.github && (
            <div className="cs-meta-item">
              <span className="cs-meta-label">GitHub</span>
              <a href={cs.github} target="_blank" rel="noopener noreferrer" className="cs-meta-link">↗ Repository</a>
            </div>
          )}
          {cs?.live && (
            <div className="cs-meta-item">
              <span className="cs-meta-label">Live</span>
              <a href={cs.live} target="_blank" rel="noopener noreferrer" className="cs-meta-link">↗ Visit Site</a>
            </div>
          )}
        </div>

        <div className="cs-hero__tags">
          {project.tags.slice(1).map((t) => (
            <span key={t} className="cs-tag">{t}</span>
          ))}
        </div>
      </header>

      {cs ? (
        <div className="cs-body">
          {/* ── Overview ─────────────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Overview</h2>
            <p className="cs-prose">{cs.overview}</p>
            <blockquote className="cs-impact">{project.impact}</blockquote>
          </section>

          {/* ── Problem ──────────────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">The Problem</h2>
            <p className="cs-prose">{cs.problem}</p>
          </section>

          {/* ── Why I Built It ───────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Why I Built It</h2>
            <p className="cs-prose">{cs.whyBuilt}</p>
          </section>

          {/* ── Objectives ───────────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Objectives</h2>
            <ul className="cs-list">
              {cs.objectives.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </section>

          {/* ── My Role ──────────────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">My Role</h2>
            <p className="cs-prose">{cs.myRole}</p>
          </section>

          {/* ── Architecture ─────────────────────── */}
          {cs.architecture && (
            <section className="cs-section">
              <h2 className="cs-section__heading">Architecture</h2>
              <div className="cs-architecture">
                <p className="cs-prose">{cs.architecture}</p>
              </div>
            </section>
          )}

          {/* ── Tech Stack ───────────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Tech Stack</h2>
            <div className="cs-stack-grid">
              {cs.techStack.map((group) => (
                <div key={group.category} className="cs-stack-group">
                  <h3 className="cs-stack-group__label">{group.category}</h3>
                  <div className="cs-stack-group__items">
                    {group.items.map((item) => (
                      <span key={item} className="cs-stack-badge">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Engineering Challenges ───────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Engineering Challenges</h2>
            <div className="cs-challenges">
              {cs.challenges.map((c) => (
                <div key={c.title} className="cs-challenge-card">
                  <h3 className="cs-challenge-card__title">{c.title}</h3>
                  <p className="cs-challenge-card__detail">{c.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Development Process ──────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Development Process</h2>
            <ol className="cs-process-list">
              {cs.process.map((step, i) => (
                <li key={i} className="cs-process-item">
                  <span className="cs-process-item__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Key Features ─────────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Key Features</h2>
            <div className="cs-features-grid">
              {cs.features.map((f) => (
                <div key={f.title} className="cs-feature-card">
                  <h3 className="cs-feature-card__title">{f.title}</h3>
                  <p className="cs-feature-card__detail">{f.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Implementation Details ───────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Implementation Details</h2>
            <p className="cs-prose">{cs.implementation}</p>
          </section>

          {/* ── Future Improvements ──────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Future Improvements</h2>
            <ul className="cs-list">
              {cs.futureImprovements.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </section>

          {/* ── Lessons Learned ──────────────────── */}
          <section className="cs-section">
            <h2 className="cs-section__heading">Lessons Learned</h2>
            <div className="cs-lessons">
              {cs.lessonsLearned.map((l) => (
                <blockquote key={l} className="cs-lesson">{l}</blockquote>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="cs-body">
          <section className="cs-section">
            <h2 className="cs-section__heading">Overview</h2>
            <p className="cs-prose">{project.summary}</p>
            <blockquote className="cs-impact">{project.impact}</blockquote>
          </section>
        </div>
      )}

      {/* ── Related Projects ─────────────────────── */}
      <section className="cs-related">
        <h2 className="cs-related__heading">Related Projects</h2>
        <div className="cs-related-grid">
          {relatedProjects.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className="cs-related-card">
              <div className="cs-related-card__top">
                <span className="cs-related-card__year">{p.year}</span>
                <span className={`cs-related-card__badge ${p.role.startsWith("Solo") ? "cs-related-card__badge--solo" : ""}`}>
                  {p.role.startsWith("Solo") ? "Solo" : "Team"}
                </span>
              </div>
              <h3 className="cs-related-card__title">{p.title}</h3>
              <p className="cs-related-card__summary">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Bottom nav ───────────────────────────── */}
      <div className="cs-bottom-nav">
        <Link href="/projects" className="cs-back__link">← Back to All Projects</Link>
      </div>
    </main>
  );
}
