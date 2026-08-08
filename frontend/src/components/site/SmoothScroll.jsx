import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

// Enable Lenis smooth scrolling ONLY when requestAnimationFrame is actually
// running. In environments where rAF is paused (some headless/automation
// contexts), Lenis would hijack and freeze scrolling — so we fall back to
// native scrolling there. Real users always get the smooth momentum scroll.
export default function SmoothScroll({ children }) {
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    let firstFired = false;
    const id1 = requestAnimationFrame(() => {
      firstFired = true;
      requestAnimationFrame(() => setSmooth(true));
    });
    const timeout = setTimeout(() => {
      if (!firstFired) setSmooth(false);
    }, 600);
    return () => {
      cancelAnimationFrame(id1);
      clearTimeout(timeout);
    };
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
