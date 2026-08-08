import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative bg-obsidian border-t border-border overflow-hidden"
      data-testid="site-footer"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel mb-6">
              [ Start a conversation ]
            </p>
            <Link
              to="/contact"
              data-testid="footer-cta"
              className="group inline-flex items-center gap-4 font-heading text-4xl md:text-6xl font-black uppercase tracking-tight text-bone"
            >
              Let&apos;s build
              <ArrowUpRight
                className="text-brand transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                size={48}
              />
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {[
                ["Index", "/"],
                ["Capabilities", "/services"],
                ["Studio", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-steel hover:text-bone transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel mb-5">
              Studio
            </p>
            <p className="text-sm text-steel leading-relaxed">
              Berlin — Remote
              <br />
              hello@vantera.io
              <br />
              +49 30 5555 0192
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <h2 className="font-heading font-black uppercase tracking-tighter leading-[0.8] text-[24vw] md:text-[19vw] text-outline select-none">
            Vantera
          </h2>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
            © {year} Vantera Labs — A fictional studio
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
            Engineering the intelligence of tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
