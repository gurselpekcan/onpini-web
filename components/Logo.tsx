// The real OnPini "OP" monogram (matches production /icon.svg) + wordmark.
export default function Logo({
  size = 30,
  wordmark = true,
  tone = "ink",
  className = "",
}: {
  size?: number;
  wordmark?: boolean;
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="shrink-0"
        role="img"
        aria-label="OnPini"
      >
        <g transform="rotate(-4 100 100)">
          <rect x="22" y="22" width="156" height="156" rx="36" fill="#fbbf24" stroke="#1a1a1a" strokeWidth="7" />
          <circle cx="78" cy="100" r="34" fill="none" stroke="#1a1a1a" strokeWidth="14" />
          <rect x="110" y="62" width="14" height="84" rx="3" fill="#1a1a1a" />
          <circle cx="138" cy="86" r="22" fill="#ffffff" stroke="#1a1a1a" strokeWidth="14" />
          <circle cx="138" cy="86" r="7" fill="#f97316" />
        </g>
      </svg>
      {wordmark && (
        <span className={`font-[var(--font-fraunces)] font-black text-xl ${tone === "cream" ? "text-cream" : "text-ink"}`}>
          OnPini
        </span>
      )}
    </span>
  );
}
