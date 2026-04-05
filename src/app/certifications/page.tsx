import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { LinkedInEmbeds } from "@/components/galleries/LinkedInEmbeds";
import { CERTIFICATIONS } from "@/components/portfolio/experience-data";
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

      <header className="content-hero">
        <h1>Certifications & Recognitions</h1>
        <p>Academic credentials, certifications, and recognitions earned along the journey.</p>
      </header>

      <section className="panel">
        <h2>Certifications</h2>
        {CERTIFICATIONS.length > 0 ? (
          <div className="highlight-grid">
            {CERTIFICATIONS.map((cert) => (
              <div key={`${cert.title}-${cert.issuer}`} className="panel-card">
                <p className="meta">
                  {cert.year ? `${cert.year} · ${cert.issuer}` : cert.issuer}
                </p>
                <h3>{cert.title}</h3>
                {cert.summary && <p>{cert.summary}</p>}
                {cert.credentialUrl && (
                  <div className="card-actions">
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                      View credential
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Certification details will be added as they are finalized.</p>
        )}
      </section>

      <LinkedInEmbeds posts={LINKEDIN_POSTS} />
    </main>
  );
}
