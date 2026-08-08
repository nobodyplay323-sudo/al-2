import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { RevealText, RevealOnView } from "@/components/site/RevealText";
import Reveal from "@/components/site/Reveal";
import ClipReveal from "@/components/site/ClipReveal";
import MagneticButton from "@/components/site/MagneticButton";
import EditorialMarquee from "@/components/site/EditorialMarquee";
import { MEDIA } from "@/assets/media";

const WORK = [
  { id: "01", title: "Helix", tag: "AI Platform", year: "2025", span: "md:col-span-8", img: MEDIA.archAngle },
  { id: "02", title: "Ordo", tag: "Data Tooling", year: "2025", span: "md:col-span-4", img: MEDIA.productSpotlight },
  { id: "03", title: "Northlight", tag: "Design System", year: "2024", span: "md:col-span-4", img: MEDIA.archStairs },
  { id: "04", title: "Meridian", tag: "Product Engineering", year: "2024", span: "md:col-span-8", img: MEDIA.archBlue },
];

const MANIFESTO = [
  {
    n: "01",
    title: "Intelligence with intent",
    body: "We treat machine intelligence as a material, not a mascot. Every model we ship answers to a human outcome — never the other way around.",
  },
  {
    n: "02",
    title: "Restraint is a feature",
    body: "The best software disappears. We remove until only the essential remains, then obsess over the millimetres that are left.",
  },
  {
    n: "03",
    title: "Built to be trusted",
    body: "Speed means nothing without integrity. We engineer for observability, safety and the quiet confidence of systems that simply hold.",
  },
];

const STATS = [
  ["06", "Years shipping"],
  ["40+", "Products launched"],
  ["12", "People, no bloat"],
  ["99.98%", "Median uptime"],
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.35], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-10">
          <img
            src={MEDIA.heroAbstract}
            alt="Abstract architecture"
            className="h-full w-full object-cover opacity-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/45 via-obsidian/20 to-obsidian" />
        </motion.div>

        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10 pt-28 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-brand" />
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-steel">
              Software Studio — Est. 2019
            </span>
          </div>

          <RevealText
            as="h1"
            lines={["Engineering", "the intelligence", "of tomorrow."]}
            className="font-heading font-black uppercase tracking-tighter leading-[0.82] text-[13vw] sm:text-[10vw] lg:text-[7.4vw] text-bone"
            delay={0.1}
          />

          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <Reveal as="p" delay={0.55} className="md:col-span-5 text-base lg:text-lg font-light leading-relaxed text-steel">
              Vantera is a small studio of engineers and designers building AI
              platforms, data tooling and products that feel inevitable.
            </Reveal>
            <Reveal delay={0.65} className="md:col-span-4 md:col-start-9 flex md:justify-end">
              <MagneticButton to="/services" testid="hero-cta">
                Explore capabilities
              </MagneticButton>
            </Reveal>
          </div>
        </div>

        <motion.div style={{ opacity: fade }} className="absolute bottom-8 right-5 md:right-10 flex items-center gap-3 text-steel">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      <EditorialMarquee />

      {/* STATS */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border">
          {STATS.map(([num, label], i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className="border-b md:border-b-0 border-r border-border p-6 md:p-8 last:border-r-0"
            >
              <div className="font-heading text-5xl md:text-6xl font-black tracking-tighter text-bone">
                {num}
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
                {label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-20 md:pb-28" data-testid="selected-work">
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <RevealOnView
            as="h2"
            lines={["Selected", "work"]}
            className="font-heading font-black uppercase tracking-tighter leading-[0.85] text-6xl md:text-8xl text-bone"
          />
          <span className="hidden md:block font-mono text-xs uppercase tracking-[0.2em] text-steel">
            2024 — 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {WORK.map((w) => (
            <a
              key={w.id}
              href="/services"
              onClick={(e) => e.preventDefault()}
              data-testid={`work-card-${w.id}`}
              className={`group block ${w.span}`}
            >
              <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                <ClipReveal
                  src={w.img}
                  alt={w.title}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 z-10 font-mono text-[11px] text-brand">
                  {w.id}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-bone">
                    {w.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel mt-1">
                    {w.tag}
                  </p>
                </div>
                <span className="font-mono text-xs text-steel">{w.year}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-t border-border bg-obsidian" data-testid="manifesto">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-steel mb-16">
            [ Manifesto ]
          </p>
          <div>
            {MANIFESTO.map((m) => (
              <Reveal
                key={m.n}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 border-t border-border py-10 md:py-14"
              >
                <div className="md:col-span-2">
                  <span className="font-heading text-6xl md:text-7xl font-black text-brand tracking-tighter">
                    {m.n}
                  </span>
                </div>
                <h3 className="md:col-span-4 font-heading text-3xl md:text-4xl font-bold tracking-tight text-bone leading-none">
                  {m.title}
                </h3>
                <p className="md:col-span-5 md:col-start-8 text-base lg:text-lg font-light leading-relaxed text-steel">
                  {m.body}
                </p>
              </Reveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <RevealOnView
            as="h2"
            lines={["Have something", "worth building?"]}
            className="md:col-span-8 font-heading font-black uppercase tracking-tighter leading-[0.85] text-5xl md:text-7xl text-bone"
          />
          <Reveal delay={0.15} className="md:col-span-4 flex md:justify-end">
            <MagneticButton to="/contact" variant="solid" testid="home-bottom-cta">
              Initiate a project
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
