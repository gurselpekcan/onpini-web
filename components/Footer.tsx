import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream border-t-[3px] border-ink">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-[var(--font-fraunces)] font-black text-xl mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-orange inline-block" />
            OnPini
          </div>
          <p className="text-cream/70 text-sm leading-relaxed">
            The social network where your opinions are your profile.
          </p>
        </div>

        <div>
          <p className="font-black text-sm uppercase tracking-widest text-cream/50 mb-3">Pages</p>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/team", label: "Team" },
              { href: "/roadmap", label: "Roadmap" },
              { href: "/careers", label: "Careers" },
              { href: "/press", label: "Press" },
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
        <span>© {new Date().getFullYear()} OnPini. All rights reserved.</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block animate-wiggle" />
          Early Access · v1.0
        </span>
      </div>
    </footer>
  );
}
