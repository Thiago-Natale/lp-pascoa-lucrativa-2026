import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;
const springEmphatic = { type: "spring" as const, stiffness: 400, damping: 15 };

const particles = [
  { emoji: "🍫", top: "12%", left: "8%", size: "1.2rem", dur: 6 },
  { emoji: "🥚", top: "25%", right: "10%", size: "0.9rem", dur: 7.5 },
  { emoji: "🌸", top: "55%", left: "5%", size: "1.1rem", dur: 8 },
  { emoji: "🐣", top: "70%", right: "6%", size: "1.4rem", dur: 5.5 },
  { emoji: "🐰", top: "40%", right: "15%", size: "1rem", dur: 9 },
  { emoji: "🌷", top: "85%", left: "12%", size: "0.8rem", dur: 6.5 },
];

const headlineWords = ["Agora", "só", "falta"];
const emphasisWords = ["uma", "decisão."];

const HeroHeadline = () => (
  <section className="relative pt-[80px] px-5 pb-10 overflow-hidden" style={{ backgroundColor: "var(--creme)" }}>
    {/* Floating particles */}
    {particles.map((p, i) => (
      <span
        key={i}
        className="absolute pointer-events-none select-none opacity-[0.07]"
        style={{
          top: p.top,
          left: p.left,
          right: p.right,
          fontSize: p.size,
          animation: `float ${p.dur}s ease-in-out ${i * 0.8}s infinite`,
        }}
      >
        {p.emoji}
      </span>
    ))}

    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease }}
      className="flex justify-center"
    >
      <span
        className="inline-block font-body text-[11px] font-bold uppercase tracking-[0.08em] px-4 py-1.5 rounded-pill"
        style={{ backgroundColor: "var(--caramel-light)", color: "var(--caramel)" }}
      >
        ✦ SEU PERFIL ESTÁ PRONTO ✦
      </span>
    </motion.div>

    {/* Headline */}
    <h1 className="font-display font-bold text-[32px] leading-[1.2] text-center mt-4" style={{ color: "var(--chocolate)" }}>
      {headlineWords.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
      <br />
      {emphasisWords.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...springEmphatic, delay: 0.24 + i * 0.06 }}
          className="inline-block mr-[0.3em] italic"
          style={{ color: "var(--caramel)" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.4, ease }}
      className="font-body text-[15px] text-center mt-3 max-w-[340px] mx-auto"
      style={{ color: "var(--muted)" }}
    >
      Você respondeu as perguntas. Eu analisei seu perfil. O cardápio ideal pra você cabe em R$20.
    </motion.p>

    {/* Decorative line */}
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 48 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
      className="h-[3px] mx-auto mt-6 rounded-full"
      style={{ background: "linear-gradient(90deg, var(--caramel), var(--gold))" }}
    />
  </section>
);

export default HeroHeadline;
