import { useEffect, useState } from "react";
import { useInView, usePlayAnimations } from "./useInView";

// Masked line-by-line reveal via CSS transitions (robust). Visible by default;
// armed + released only when the page is actually visible.
export function RevealText({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.1,
  as: Tag = "span",
}) {
  const play = usePlayAnimations();
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!play) return undefined;
    const t = setTimeout(() => setGo(true), 60);
    return () => clearTimeout(t);
  }, [play]);

  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden" aria-hidden="true">
          <span
            className={`mask ${play ? "armed" : ""} ${play && go ? "go" : ""} ${lineClassName}`}
            style={{ transitionDelay: `${delay + i * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

// Same reveal, triggered when scrolled into view.
export function RevealOnView({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.09,
  as: Tag = "span",
}) {
  const play = usePlayAnimations();
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden" aria-hidden="true">
          <span
            className={`mask ${play ? "armed" : ""} ${play && inView ? "go" : ""} ${lineClassName}`}
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
