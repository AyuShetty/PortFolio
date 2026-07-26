"use client";

type DocumentDownloadButtonProps = {
  href: string;
  label: string;
};

function DocumentDownloadButton({ href, label }: DocumentDownloadButtonProps) {
  return (
    <a
      href={href}
      download
      style={{
        display: "inline-block",
        padding: "0.75rem 1.5rem",
        backgroundColor: "var(--button-resume-bg)",
        color: "#ffffff",
        borderRadius: "0.5rem",
        textDecoration: "none",
        fontWeight: "600",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--button-resume-bg-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--button-resume-bg)")}
    >
      📄 {label}
    </a>
  );
}

export function ResumeDownloadButton() {
  return (
    <DocumentDownloadButton
      href="/Ayush N shetty.pdf"
      label="Download Resume"
    />
  );
}

export function CVDownloadButton() {
  return (
    <DocumentDownloadButton
      href="/Ayush N shetty_CV.pdf"
      label="Download CV"
    />
  );
}
