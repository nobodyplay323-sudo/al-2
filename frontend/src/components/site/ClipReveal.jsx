import { useInView, usePlayAnimations } from "./useInView";

// Editorial clip-path image reveal. Image is visible by default.
export default function ClipReveal({
  src,
  alt = "",
  className = "",
  imgClassName = "",
}) {
  const play = usePlayAnimations();
  const [ref, inView] = useInView({ rootMargin: "0px 0px -5% 0px" });
  return (
    <div
      ref={ref}
      className={`clip-reveal ${play ? "armed" : ""} ${play && inView ? "in" : ""} overflow-hidden bg-surface ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
