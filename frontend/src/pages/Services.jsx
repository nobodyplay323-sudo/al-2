import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { RevealText, RevealOnView } from "@/components/site/RevealText";
import Reveal from "@/components/site/Reveal";
import MagneticButton from "@/components/site/MagneticButton";
import { MEDIA } from "@/assets/media";

const EASE = [0.76, 0, 0.24, 1];

const SERVICES = [
  {
    id: "01",
    title: "AI Platforms",
    desc: "End-to-end intelligent systems — from retrieval and evaluation to safe, observable production deployment.",
    tags: ["LLM apps", "RAG", "Evals", "Guardrails"],
    img: MEDIA.archAngle,
  },
  {
    id: "02",
    title: "Data Tooling",
    desc: "Pipelines, warehouses and internal tools that turn raw signal into decisions your team can trust.",
    tags: ["Pipelines", "Warehousing", "Dashboards"],
    img: MEDIA.productSpotlight,
  },
  {
    id: "03",
    title: "Product Engineering",
    desc: "Zero-to-one product builds. Full-stack teams shipping fast without accumulating regret.",
    tags: ["Web", "Mobile", "APIs", "Infra"],
    img: MEDIA.archBlue,
  },
  {
    id: "04",
    title: "Design Systems",
    desc: "Interface architecture and design systems engineered for scale, motion and clarity.",
    tags: ["Design ops", "Motion", "Tokens"],
    img: MEDIA.archStairs,
  },
];

const PROCESS = [
  ["Diagnose", "We map the real problem before touching a keyboard."],
  ["Prototype", "Sharp, throwaway builds to find the truth quickly."],
  ["Engineer", "Production systems built to be observed and trusted."],
  ["Compound", "We stay to iterate — value accrues over time."],
];

function ServiceRow({ s, onMove, onEnter, onLeave }) {
  return (
    <a
      href="/contact"
      onClick={(e) => e.preventDefault()}
      data-testid={`service-row-${s.id}`}
      onMouseMove={onMove}
      onMouseEnter={() => onEnter(s.img)}
      onMouseLeave={onLeave}
      className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-t border-border py-8 md:py-12 transition-colors duration-500 hover:bg-surface/60"
    >
      <div className="md:col-span-1 flex items-start">
        <span className="font-mono text-xs text-brand">{s.id}</span>
      </div>
      <div className="md:col-span-6">
        <h3 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter text-bone leading-[0.9] transition-transform duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4">
          {s.title}
        </h3>
      </div>
      <div className="md:col-span-5 flex flex-col gap-4">
        <p className="text-base font-light leading-relaxed text-steel">{s.desc}</p>
        <div className="flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span
              key={t}
              className="border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-steel"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Services() {
  const areaRef = useRef(null);
  const [hoverImg, setHoverImg] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  const onMove = (e) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - 160);
    y.set(e.clientY - rect.top - 100);
  };

  return (
    <div data-testid="services-page" className="pt-32 md:pt-40">
      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-10 bg-brand" />
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-steel">
            02 — Capabilities
          </span>
        </div>
        <RevealText
          as="h1"
          lines={["What we", "engineer."]}
          className="font-heading font-black uppercase tracking-tighter leading-[0.85] text-6xl md:text-9xl text-bone"
          delay={0.08}
        />
        <Reveal as="p" delay={0.3} className="mt-10 max-w-xl text-base lg:text-lg font-light leading-relaxed text-steel">
          Four disciplines, one team. We move between them fluidly so the
          solution — not the org chart — decides the shape of the work.
        </Reveal>
      </section>

      <section ref={areaRef} className="relative mx-auto max-w-[1600px] px-5 md:px-10 mt-16 md:mt-24">
        <AnimatePresence>
          {hoverImg && (
            <motion.div
              key={hoverImg}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ x: sx, y: sy }}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block h-[220px] w-[320px] overflow-hidden"
            >
              <img src={hoverImg} alt="" className="h-full w-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {SERVICES.map((s) => (
          <ServiceRow key={s.id} s={s} onMove={onMove} onEnter={setHoverImg} onLeave={() => setHoverImg(null)} />
        ))}
        <div className="border-t border-border" />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32">
        <RevealOnView
          as="h2"
          lines={["How we", "operate"]}
          className="font-heading font-black uppercase tracking-tighter leading-[0.85] text-5xl md:text-7xl text-bone mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {PROCESS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="bg-obsidian p-8 min-h-[220px] flex flex-col justify-between">
              <span className="font-mono text-xs text-brand">0{i + 1}</span>
              <div>
                <h3 className="font-heading text-2xl font-bold tracking-tight text-bone">{t}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-steel">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-t border-border pt-16">
          <RevealOnView
            as="h2"
            lines={["Ready when", "you are."]}
            className="md:col-span-8 font-heading font-black uppercase tracking-tighter leading-[0.85] text-5xl md:text-7xl text-bone"
          />
          <Reveal delay={0.15} className="md:col-span-4 flex md:justify-end">
            <MagneticButton to="/contact" variant="solid" testid="services-cta">
              Start a project
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
