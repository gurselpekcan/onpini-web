// Android browsers can vibrate inside a tap. iPhones can't from a web page: Safari has
// no Vibration API and the hidden-switch trick is reported dead since iOS 26.5, so
// iPhones stay silent and get the visual press instead. Only for the moments that
// matter: an answer, opening the reveal.
export const haptic = (ms = 12) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  navigator.vibrate?.(ms);
};
