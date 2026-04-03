import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { PROJECTS, PROJECT_WORK } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

type ProjectParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.id === slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<ProjectParams>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.id === slug);

  if (!project) {
    notFound();
  }

  const work = PROJECT_WORK.find(
    (item) => item.title === project.title || item.title.includes(project.title),
  );

  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </header>

      <section className="panel">
        <h2>Overview</h2>
        <p className="meta">{project.year} · {project.role}</p>
        <p>{project.impact}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={`${project.id}-${tag}`}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Stack & Highlights</h2>
        <p>{project.stack}</p>
        {work && (
          <ul className="detail-list">
            {work.details.map((detail) => (
              <li key={`${project.title}-${detail}`}>{detail}</li>
            ))}
          </ul>
        )}
      </section>

      <div className="section-actions">
        <Link href="/projects">Back to projects</Link>
      </div>
    </main>
  );
}
