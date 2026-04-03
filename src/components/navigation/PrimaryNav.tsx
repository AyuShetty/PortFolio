"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Highlights", href: "/highlights" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Leadership", href: "/leadership" },
  { label: "Writing", href: "/writing" },
  { label: "Community", href: "/community" },
  { label: "Certifications", href: "/certifications" },
  { label: "POAPs", href: "/poaps" },
  { label: "Results", href: "/results" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/#contact" },
];

type PrimaryNavProps = {
  className?: string;
};

export function PrimaryNav({ className }: PrimaryNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className={"primary-nav" + (className ? ` ${className}` : "")} aria-label="Primary">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={active ? "true" : "false"}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
