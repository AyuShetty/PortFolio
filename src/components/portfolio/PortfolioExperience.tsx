"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { CanvasErrorBoundary } from "@/components/portfolio/CanvasErrorBoundary";
import DomeGallery, { type DomeGalleryImage } from "@/components/portfolio/DomeGallery";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import {
	EXPERIENCES,
	PROJECTS,
	SKILL_GROUPS,
	SOCIALS,
	STATS,
	TOP_HIGHLIGHTS,
} from "@/components/portfolio/experience-data";

interface PortfolioExperienceProps {
	galleryImages?: DomeGalleryImage[];
}

export function PortfolioExperience({ galleryImages = [] }: PortfolioExperienceProps) {
	useSmoothScroll();
	const rootRef = useRef<HTMLDivElement | null>(null);

	const [contactStatus, setContactStatus] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const blur = Math.min(scrollY / 100, 12);
			const opacity = Math.min(scrollY / 500, 0.6);
			const introOpacity = Math.max(1 - scrollY / 200, 0);

			const blurLayer = document.querySelector(".blur-layer");
			if (blurLayer) {
				(blurLayer as HTMLElement).style.backdropFilter = `blur(${blur}px)`;
				(blurLayer as HTMLElement).style.background = `rgba(10, 10, 30, ${opacity})`;
			}

			const introText = document.querySelector(".intro-text");
			if (introText) {
				(introText as HTMLElement).style.opacity = introOpacity.toString();
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const sections = Array.from(root.querySelectorAll<HTMLElement>(".content-section"));
		if (sections.length === 0) return;

		if (!("IntersectionObserver" in window)) {
			sections.forEach((section) => {
				section.dataset.visible = "true";
			});
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).dataset.visible = "true";
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: "0px 0px -12% 0px",
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, []);

	const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setContactStatus("Thanks for the note. I will reply within 48 hours.");
	};

	return (
		<div ref={rootRef} className="portfolio-root">
			{/* Fixed Background */}
			<div className="background" aria-hidden="true">
				<CanvasErrorBoundary
					fallback={
						<div className="canvas-fallback">
							<h2>Gallery loading</h2>
							<p>Warming up the landing visuals. Keep scrolling to explore the work.</p>
						</div>
					}
				>
					<DomeGallery
						images={galleryImages}
						maxVerticalRotationDeg={0}
						segments={34}
						dragDampening={2}
						grayscale
					/>
				</CanvasErrorBoundary>
			</div>

			{/* Blur Layer */}
			<div className="blur-layer" aria-hidden="true" />

			{/* Fixed Intro Text */}
			<div className="intro-text" aria-hidden="true">
				Scroll to enter
			</div>

			{/* Content Starts Below */}
			<main className="content portfolio-layout">
				<header className="hero-content hero-content--below">
					<PrimaryNav />
					<div className="hero-copy">
						<h1 className="hero-title">Ayush Shetty</h1>
						<p className="hero-subtitle">
							Product engineer focused on Web3, AI, and Ethereum governance tooling.
						</p>
						<div className="hero-actions">
							<Link href="#projects" className="action-button">
								Explore Projects
							</Link>
							<Link href="#contact" className="action-button">
								Start a Project
							</Link>
						</div>
					</div>
				</header>

				<section id="projects" className="content-section">
						<h2 className="section-title">Featured Projects</h2>
						<p className="section-intro">
							Shipped products across governance analytics, AI education, and community platforms.
						</p>
						<div className="project-grid">
							{PROJECTS.map((project) => (
								<div key={project.title} className="project-card">
									<div className="project-header">
										<span className="project-year">{project.year}</span>
										<h3 className="project-title">{project.title}</h3>
									</div>
									<p className="project-summary">{project.summary}</p>
									<p className="project-desc">{project.impact}</p>
									<div className="project-tags">
										{project.tags.map((tag) => (
											<span key={tag} className="tag">
												{tag}
											</span>
										))}
									</div>
									<div className="project-links">
										{project.href && (
											<Link href={project.href} className="project-link">
												Case Study
											</Link>
										)}
										<Link href="/projects" className="project-link">
											All Projects
										</Link>
									</div>
								</div>
							))}
						</div>
					</section>

				<section id="highlights" className="content-section">
						<h2 className="section-title">Highlights &amp; Milestones</h2>
						<div className="highlight-grid">
							{TOP_HIGHLIGHTS.map((highlight) => (
								<div key={highlight.title} className="highlight-card">
									<h3 className="highlight-title">{highlight.title}</h3>
									<p className="highlight-desc">{highlight.summary}</p>
								</div>
							))}
						</div>
					</section>

				<section id="stats" className="content-section">
						<h2 className="section-title">By the Numbers</h2>
						<div className="stat-grid">
							{STATS.map((stat) => (
								<div key={stat.label} className="stat-card">
									<span className="stat-value">{stat.value}</span>
									<span className="stat-label">{stat.label}</span>
								</div>
							))}
						</div>
					</section>

				<section id="about" className="content-section">
						<h2 className="section-title">Skills &amp; Capabilities</h2>
						<p className="section-intro">
							Signal the tone: immersive product work across Web3 governance, AI tooling, and community
							platforms.
						</p>
						<div className="skill-group-grid">
							{SKILL_GROUPS.map((group) => (
								<div key={group.title} className="skill-group-card">
									<h3 className="skill-group-title">{group.title}</h3>
									<ul className="skill-list">
										{group.skills.map((skill) => (
											<li key={skill} className="skill-item">
												{skill}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>

				<section id="experience" className="content-section">
						<h2 className="section-title">Experience Timeline</h2>
						<div className="experience-list">
							{EXPERIENCES.slice(0, 3).map((exp, index) => (
								<div key={`${exp.title}-${index}`} className="experience-card">
									<div className="experience-header">
										<h3 className="experience-company">{exp.title}</h3>
										<span className="experience-date">{exp.period}</span>
									</div>
									<p className="experience-role">{exp.role}</p>
								</div>
							))}
						</div>
						<div className="experience-actions">
							<Link href="/experience" className="action-button">
								Full Timeline
							</Link>
							<a
								href="/resume.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="action-button"
							>
								Download Resume
							</a>
						</div>
					</section>

				<section id="contact" className="content-section">
						<h2 className="section-title">Start a Project</h2>
						<p className="section-intro">
							Ready to build? Share the scope and timeline so we can map the launch together.
						</p>
						{contactStatus ? (
							<div className="contact-success">{contactStatus}</div>
						) : (
							<form className="contact-form" onSubmit={handleContactSubmit}>
								<div className="form-row">
									<input type="text" name="name" placeholder="Your Name" required />
									<input type="email" name="email" placeholder="Email Address" required />
								</div>
								<textarea name="message" placeholder="Tell me about the project..." required />
								<button type="submit" className="action-button">
									Send
								</button>
							</form>
						)}
						<div className="social-links">
							{SOCIALS.map((social) => (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
								>
									{social.label}
								</a>
							))}
						</div>
					</section>
			</main>

			<footer className="page-footer">
				<p>&copy; {new Date().getFullYear()} Ayush Shetty. All rights reserved.</p>
			</footer>
		</div>
	);
}
