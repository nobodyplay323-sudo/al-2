import { RevealText, RevealOnView } from "@/components/site/RevealText";
import Reveal from "@/components/site/Reveal";
import ClipReveal from "@/components/site/ClipReveal";
import MagneticButton from "@/components/site/MagneticButton";
import { MEDIA } from "@/assets/media";

const VALUES = [
  ["Small by design", "Twelve people. No account managers, no relay. You talk to the people building."],
  ["Taste as discipline", "We sweat kerning and latency with equal seriousness. Craft is not decoration."],
  ["Honest velocity", "Fast, but never at the cost of the truth. We say no more than we say yes."],
  ["Own the outcome", "We measure ourselves by what ships and what it does in the real world."],
];

const TEAM = [
  ["Ivo Marchetti", "Founder / Principal Engineer"],
  ["Lena Roth", "Head of Design"],
  ["Kwame Osei", "ML Lead"],
  ["Sofia Kallio", "Product Engineering"],
];

export default function About() {
  return (
    <div data-testid="about-page" className="pt-32 md:pt-40">
      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-10 bg-brand" />
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-steel">
            03 — Studio
          </span>
        </div>
        <RevealText
          as="h1"
          lines={["A studio", "with a point", "of view."]}
          className="font-heading font-black uppercase tracking-tighter leading-[0.85] text-6xl md:text-9xl text-bone"
          delay={0.08}
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-border pt-12">
          <p className="md:col-span-3 font-mono text-xs uppercase tracking-[0.2em] text-steel">
            [ The premise ]
          </p>
          <div className="md:col-span-9 space-y-8">
            <Reveal as="p" className="font-heading text-2xl md:text-4xl font-medium tracking-tight text-bone leading-tight">
              Vantera began in 2019 with a stubborn belief: the most valuable
              software is quiet, fast and almost invisible — and getting there
              is an act of relentless subtraction.
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Reveal as="p" delay={0.1} className="text-base lg:text-lg font-light leading-relaxed text-steel">
                We are engineers who care about design and designers who read
                stack traces. That overlap is the whole point. We keep the team
                deliberately small so the distance between an idea and a
                shipped, observable system stays measured in days.
              </Reveal>
              <Reveal as="p" delay={0.18} className="text-base lg:text-lg font-light leading-relaxed text-steel">
                We work with founders and product teams who want intelligence
                woven into their product without the theatre. No hype decks —
                just systems that hold under load and get better the longer we
                stay.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-20 md:mt-28">
        <ClipReveal
          src={MEDIA.office}
          alt="The Vantera studio"
          className="h-[50vh] md:h-[75vh] w-full"
        />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
          Studio — Kreuzberg, Berlin
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 md:py-32">
        <RevealOnView
          as="h2"
          lines={["What we", "value"]}
          className="font-heading font-black uppercase tracking-tighter leading-[0.85] text-5xl md:text-7xl text-bone mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {VALUES.map(([t, d], i) => (
            <Reveal
              key={t}
              delay={(i % 2) * 0.08}
              className="border-t border-border py-10 md:[&:nth-child(odd)]:pr-16 md:[&:nth-child(even)]:pl-16 md:[&:nth-child(even)]:border-l"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-brand">0{i + 1}</span>
                <h3 className="font-heading text-3xl font-bold tracking-tight text-bone">{t}</h3>
              </div>
              <p className="mt-4 text-base font-light leading-relaxed text-steel">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel mb-10">[ People ]</p>
        <div className="border-t border-border">
          {TEAM.map(([name, role], i) => (
            <Reveal
              key={name}
              delay={i * 0.05}
              className="group flex items-center justify-between border-b border-border py-6 transition-colors duration-500 hover:bg-surface/60"
            >
              <span className="font-heading text-2xl md:text-4xl font-bold tracking-tight text-bone transition-transform duration-500 group-hover:translate-x-2">
                {name}
              </span>
              <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.16em] text-steel text-right">
                {role}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-t border-border pt-16">
          <RevealOnView
            as="h2"
            lines={["Come build", "with us."]}
            className="md:col-span-8 font-heading font-black uppercase tracking-tighter leading-[0.85] text-5xl md:text-7xl text-bone"
          />
          <Reveal delay={0.15} className="md:col-span-4 flex md:justify-end">
            <MagneticButton to="/contact" variant="solid" testid="about-cta">
              Get in touch
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
