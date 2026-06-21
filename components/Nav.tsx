"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/circles", label: "Circles" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes (a link was tapped).
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Close on Escape, and lock body scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b-[3px] border-ink">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="OnPini home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
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

        {/* Desktop CTA */}
        <a
          href="https://app.onpini.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex px-5 py-2 rounded-full bg-ink text-cream text-sm font-black border-2 border-ink shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          Get Early Access
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-paper border-2 border-ink shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          <span className="relative block w-5 h-4" aria-hidden>
            <span className={`absolute left-0 top-0 h-[3px] w-5 bg-ink rounded transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-[3px] w-5 bg-ink rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-[3px] w-5 bg-ink rounded transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu panel — slides down under the bar */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-ink transition-all duration-300 ease-out ${
          open ? "max-h-[80vh] border-b-[3px]" : "max-h-0"
        }`}
      >
        <nav className="bg-cream px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-2xl text-lg font-black border-2 transition-all ${
                path === l.href
                  ? "bg-ink text-cream border-ink"
                  : "bg-paper border-ink hover:bg-amber"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://app.onpini.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-2xl text-lg font-black text-center bg-ink text-cream border-2 border-ink shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Get Early Access →
          </a>
        </nav>
      </div>
    </header>
  );
}
