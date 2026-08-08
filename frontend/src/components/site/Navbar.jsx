import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { to: "/", label: "Index", num: "01" },
  { to: "/services", label: "Capabilities", num: "02" },
  { to: "/about", label: "Studio", num: "03" },
  { to: "/contact", label: "Contact", num: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-obsidian/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="flex h-20 items-center justify-between">
            <Link
              to="/"
              data-testid="nav-logo"
              className="flex items-center gap-3 group"
            >
              <span className="h-2.5 w-2.5 bg-brand transition-transform duration-500 group-hover:rotate-45" />
              <span className="font-heading text-xl font-black uppercase tracking-tight text-bone">
                Vantera
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {LINKS.map((l) => {
                const active = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    data-testid={`nav-link-${l.label.toLowerCase()}`}
                    className="group relative flex items-baseline gap-2"
                  >
                    <span className="font-mono text-[10px] text-brand">{l.num}</span>
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                        active ? "text-bone" : "text-steel hover:text-bone"
                      }`}
                    >
                      {l.label}
                    </span>
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-brand transition-all duration-500 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <button
              data-testid="nav-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden text-bone"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-obsidian md:hidden flex flex-col justify-center px-8"
            data-testid="mobile-menu"
          >
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`mobile-link-${l.label.toLowerCase()}`}
                className="flex items-baseline gap-4 border-b border-border py-6"
              >
                <span className="font-mono text-xs text-brand">{l.num}</span>
                <span className="font-heading text-4xl font-black uppercase tracking-tight text-bone">
                  {l.label}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
