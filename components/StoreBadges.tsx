// App-store download badges. NOTE TO OWNER: point these at the real listings
// once the apps are published, swap APP_STORE_URL / PLAY_STORE_URL below.
// Until then they go to the web app (same as the other CTAs).
const APP_STORE_URL = "https://web.onpini.com";
const PLAY_STORE_URL = "https://web.onpini.com";

function Badge({
  href,
  logo,
  top,
  bottom,
  tone = "light",
}: {
  href: string;
  logo: React.ReactNode;
  top: string;
  bottom: string;
  tone?: "light" | "dark";
}) {
  // On dark backgrounds the ink border/shadow vanish, switch to a light border.
  const frame =
    tone === "dark"
      ? "border-2 border-cream/30 hover:border-cream/60"
      : "border-2 border-ink shadow-brutal-sm hover:shadow-brutal";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-ink text-cream ${frame} hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
    >
      {logo}
      <span className="flex flex-col leading-none text-left">
        <span className="text-[10px] font-bold opacity-80">{top}</span>
        <span className="text-lg font-black -mt-0.5 font-[var(--font-fraunces)]">{bottom}</span>
      </span>
    </a>
  );
}

export default function StoreBadges({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}>
      <Badge
        href={APP_STORE_URL}
        tone={tone}
        top="Download on the"
        bottom="App Store"
        logo={
          <svg viewBox="0 0 22 22" className="w-7 h-7 fill-cream shrink-0" aria-hidden>
            <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.88 2.65 3.22 2.6 1.29-.05 1.78-.84 3.34-.84s2 .84 3.36.81c1.39-.02 2.27-1.27 3.12-2.53.98-1.45 1.39-2.85 1.41-2.92-.03-.01-2.7-1.04-2.73-4.13zM14.62 4.6c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-2.99 1.54-.66.76-1.23 1.98-1.08 3.15 1.14.09 2.3-.58 3.01-1.44z" />
          </svg>
        }
      />
      <Badge
        href={PLAY_STORE_URL}
        tone={tone}
        top="Get it on"
        bottom="Google Play"
        logo={
          <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" aria-hidden>
            <defs>
              <linearGradient id="gp" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#00C3FF" />
                <stop offset="0.35" stopColor="#00E676" />
                <stop offset="0.7" stopColor="#FFD600" />
                <stop offset="1" stopColor="#FF3D00" />
              </linearGradient>
            </defs>
            <path d="M3.6 2.1c-.3.16-.5.46-.5.85v18.1c0 .39.2.69.5.85l10.2-9.9L3.6 2.1z" fill="url(#gp)" />
            <path d="M17.3 8.3l-3.1-1.8-2.6 2.6 2.6 2.5 3.2-1.8c.6-.36.6-1.2-.1-1.5z" fill="url(#gp)" />
          </svg>
        }
      />
    </div>
  );
}
