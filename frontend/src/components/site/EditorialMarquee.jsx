import Marquee from "react-fast-marquee";

const ITEMS = [
  "AI PLATFORMS",
  "DATA TOOLING",
  "PRODUCT ENGINEERING",
  "APPLIED ML",
  "DESIGN SYSTEMS",
];

export default function EditorialMarquee() {
  return (
    <div
      className="border-y border-border py-6 md:py-10 bg-obsidian"
      data-testid="editorial-marquee"
    >
      <Marquee speed={38} autoFill gradient={false}>
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-heading font-black uppercase tracking-tighter text-[13vw] md:text-[8vw] leading-none text-outline px-6 md:px-10">
              {item}
            </span>
            <span className="text-brand text-[6vw] md:text-[3vw]">✳</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
