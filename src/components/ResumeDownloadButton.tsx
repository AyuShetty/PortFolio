"use client";

export function ResumeDownloadButton() {
  return (
    <a
      href="/Ayush N shetty.pdf"
      download
      style={{
        display: "inline-block",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#5a7e7a",
        color: "#ffffff",
        borderRadius: "0.5rem",
        textDecoration: "none",
        fontWeight: "600",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a6b68")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a7e7a")}
    >
      📄 Download Resume
    </a>
  );
}
