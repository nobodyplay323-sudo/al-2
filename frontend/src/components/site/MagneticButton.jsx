import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Sharp, zero-radius button. Fills with bone-white on hover.
export default function MagneticButton({
  children,
  to,
  onClick,
  type = "button",
  variant = "outline",
  className = "",
  testid,
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-mono uppercase tracking-[0.18em] text-xs overflow-hidden border transition-colors duration-500";
  const styles =
    variant === "solid"
      ? "border-bone bg-bone text-obsidian hover:bg-transparent hover:text-bone"
      : "border-border text-bone hover:text-obsidian";

  const inner = (
    <>
      {variant === "outline" && (
        <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
      )}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} data-testid={testid} className={`${base} ${styles} ${className}`}>
        {inner}
      </Link>
    );
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      data-testid={testid}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </motion.button>
  );
}
