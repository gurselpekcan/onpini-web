import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream border-t-[3px] border-ink">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-3">
            <Logo tone="cream" />
          </div>
          <p className="text-cream/70 text-sm leading-relaxed mb-5">
            The social network where your opinions are your profile.
          </p>
          <StoreBadges tone="dark" className="!flex-col !items-start gap-2.5" />
        </div>

        <div>
          <p className="font-black text-sm uppercase tracking-widest text-cream/50 mb-3">Pages</p>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/circles", label: "Circles" },
              { href: "/team", label: "Team" },
              { href: "/roadmap", label: "Roadmap" },
              { href: "/careers", label: "Careers" },
              { href: "/press", label: "Press" },
              { href: "/support", label: "Support" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/70 hover:text-cream transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-black text-sm uppercase tracking-widest text-cream/50 mb-3">Connect</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:hello@onpini.com" className="text-cream/70 hover:text-cream transition-colors">
                hello@onpini.com
              </a>
            </li>
            <li>
              <a href="https://instagram.com/onpini" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-cream transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/onpini" target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-cream transition-colors">
                X / Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-4 max-w-6xl mx-auto flex items-center justify-between text-xs text-cream/40">
        <span>© {new Date().getFullYear()} OnPini. OnPini is a trade name of GPM Holding B.V. · KVK 89817583</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block animate-wiggle" />
          Early Access · v1.0
        </span>
      </div>
    </footer>
  );
}
