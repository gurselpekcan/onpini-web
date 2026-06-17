"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/careers", label: "Careers" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-cream border-b-[3px] border-ink">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="OnPini home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 border-transparent transition-all
                ${path === l.href
                  ? "bg-ink text-cream border-ink"
                  : "hover:border-ink hover:bg-amber"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://app.onpini.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full bg-ink text-cream text-sm font-black border-2 border-ink shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          Get Early Access
        </a>
      </div>
    </header>
  );
}
