import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;
const springEmphatic = { type: "spring" as const, stiffness: 400, damping: 15 };
const CTA_URL = "https://pay.cakto.com.br/gxdfbrh_795736";

const badges = [
  { icon: "🔒", text: "Compra segura" },
  { icon: "✅", text: "Garantia 7 dias" },
  { icon: "📲", text: "Acesso imediato" },
];

interface FinalCTAProps {
  orderBump: boolean;
  onOrderBumpChange: (v: boolean) => void;
}

const confettiEmojis = ["🍫", "🥚", "🐣", "🌷"];

const FinalCTA = ({ orderBump, onOrderBumpChange }: FinalCTAProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(true), 1500);
    const t2 = setTimeout(() => setShowConfetti(false), 4000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <section id="cta-final" className="px-5 py-12 relative overflow-hidden" style={{ backgroundColor: "var(--creme)" }}>
      {/* Easter egg confetti */}
      {showConfetti && confettiEmojis.map((e, i) => (
        <motion.span
          key={i}
          initial={{ y: -60, x: 40 + Math.random() * 280, opacity: 1, rotate: 0 }}
          animate={{ y: 600, opacity: 0, rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 2.5, ease: "easeIn" }}
          className="absolute text-[24px] pointer-events-none z-0"
        >
          {e}
        </motion.span>
      ))}

      <div className="max-w-[480px] mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-[26px]"
          style={{ color: "var(--chocolate)" }}
        >
          Você chegou até aqui.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="font-body text-[14px] mt-2"
          style={{ color: "var(--muted)" }}
        >
          Isso não foi por acaso. A decisão já tá tomada por dentro. Só falta clicar.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="h-[3px] mx-auto my-6 rounded-full"
          style={{ background: "linear-gradient(90deg, var(--caramel), var(--gold))" }}
        />

        {/* Order bump checkbox */}
        <label className="flex items-center justify-center gap-2 cursor-pointer select-none mb-6">
          <input
            type="checkbox"
            checked={orderBump}
            onChange={e => onOrderBumpChange(e.target.checked)}
            className="w-5 h-5 rounded accent-green-700 cursor-pointer"
          />
          <span className="font-body text-[14px]" style={{ color: "var(--chocolate)" }}>
            ✅ Sim, quero o Manual de Precificação (+R$5)
          </span>
        </label>

        {/* CTA Button */}
        <motion.a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...springEmphatic, delay: 0.4 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="block w-full py-5 rounded-button font-body text-[18px] font-bold text-white text-center no-underline"
          style={{
            background: "linear-gradient(135deg, #C8781A, #A85C10)",
            boxShadow: "0 8px 24px rgba(200,120,26,0.4)",
            animation: "pulse-shadow 2s ease-in-out infinite",
          }}
        >
          Quero meu cardápio agora →
        </motion.a>

        {/* Badges */}
        <div className="flex justify-center gap-3 flex-wrap mt-4">
          {badges.map((b, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.05, ease }}
              className="font-body text-[12px] px-3 py-1.5 rounded-pill"
              style={{ color: "var(--muted)", backgroundColor: "rgba(0,0,0,0.04)" }}
            >
              {b.icon} {b.text}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
