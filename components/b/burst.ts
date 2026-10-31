// Gold paper, the colour of a reveal. Loaded only when it's needed.
export const goldBurst = async (x = 0.5, y = 0.5) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { default: confetti } = await import("canvas-confetti");
  confetti({
    origin: { x, y },
    particleCount: 70,
    spread: 95,
    startVelocity: 34,
    gravity: 0.9,
    scalar: 0.95,
    ticks: 130,
    colors: ["#fbbf24", "#fde68a", "#f59e0b", "#fff4c2"],
    disableForReducedMotion: true,
  });
};
