import { useEffect, useRef, useState } from "react";

// Reliable IntersectionObserver-based visibility (not rAF dependent).
export function useInView({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

// Only arm entrance animations when the page is actually visible and motion
// is allowed. Otherwise content renders in its final, fully-visible state.
export function usePlayAnimations() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    if (document.visibilityState === "visible") {
      setPlay(true);
      return undefined;
    }
    const onChange = () => {
      if (document.visibilityState === "visible") {
        setPlay(true);
        document.removeEventListener("visibilitychange", onChange);
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return play;
}
