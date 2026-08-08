import { useInView, usePlayAnimations } from "./useInView";

// Block fade/slide reveal. Visible by default; armed only when page is visible.
export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...rest
}) {
  const play = usePlayAnimations();
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${play ? "armed" : ""} ${play && inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
