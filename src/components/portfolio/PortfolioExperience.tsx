"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { CanvasErrorBoundary } from "@/components/portfolio/CanvasErrorBoundary";
import DomeGallery, { type DomeGalleryImage } from "@/components/portfolio/DomeGallery";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { PixelText } from "@/components/PixelText";
import { CardGlowWrapper } from "@/components/CardGlowWrapper";
import { ProjectTiltStack } from "@/components/ProjectTiltStack";
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
				const rgbValues = getComputedStyle(document.documentElement).getPropertyValue('--color-surface-rgb').trim();
				(blurLayer as HTMLElement).style.background = `rgba(${rgbValues}, ${opacity})`;
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
				threshold: 0.08,
				rootMargin: "0px 0px -5% 0px",
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

		{/* Content Starts Below */}
		<main className="content portfolio-layout">
			<header className="hero-content hero-content--below">
					<div className="hero-copy">
						<PixelText
							text="AYUSH SHETTY"
							tag="h1"
							className="hero-title pixel-heading"
							scramble
						/>
						<p className="hero-subtitle">
							Software engineer and product developer building full-stack applications, AI integrations, and scalable systems.
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

				{/* Marquee between hero and first section */}
				<div style={{ margin: "2rem 0" }}>
					<MarqueeTicker />
				</div>

				<section id="projects" className="content-section">
						<ProjectTiltStack projects={PROJECTS} />
					</section>

				<section id="highlights" className="content-section">
						<h2 className="section-title">Highlights &amp; Milestones</h2>
						<div className="highlight-grid">
							{TOP_HIGHLIGHTS.map((highlight) => (
								<CardGlowWrapper key={highlight.title} className="highlight-card">
									<h3 className="highlight-title">{highlight.title}</h3>
									<p className="highlight-desc">{highlight.summary}</p>
								</CardGlowWrapper>
							))}
						</div>
					</section>

				<section id="stats" className="content-section">
						<div className="stats-bar">
							{STATS.map((stat) => (
								<div key={stat.label} className="stat-item">
									<span className="stat-value">{stat.value}</span>
									<span className="stat-label">{stat.label}</span>
								</div>
							))}
						</div>
					</section>

				<section id="about" className="content-section">
						<h2 className="section-title">Skills &amp; Capabilities</h2>
						<p className="section-intro">
							Full-stack engineering across frontend, systems, and product development.
						</p>
						<div className="skill-group-grid">
							{SKILL_GROUPS.map((group) => (
								<CardGlowWrapper key={group.title} className="skill-group-card">
									<h3 className="skill-group-title">{group.title}</h3>
									<ul className="skill-list">
										{group.skills.map((skill) => (
											<li key={skill} className="skill-item">
												{skill}
											</li>
										))}
									</ul>
								</CardGlowWrapper>
							))}
						</div>
					</section>

				<section id="experience" className="content-section">
						<h2 className="section-title">Experience Timeline</h2>
						<div className="experience-list">
							{EXPERIENCES.slice(0, 3).map((exp, index) => (
								<CardGlowWrapper key={`${exp.title}-${index}`} className="experience-card">
									<div className="experience-header">
										<h3 className="experience-company">{exp.title}</h3>
										<span className="experience-date">{exp.period}</span>
									</div>
									<p className="experience-role">{exp.role}</p>
								</CardGlowWrapper>
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
		</div>
	);
}
