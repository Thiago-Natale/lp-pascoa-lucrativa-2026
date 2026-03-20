import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;
const springEmphatic = { type: "spring" as const, stiffness: 400, damping: 15 };

const comparisons = [
  { item: "Um delivery", price: "R$45" },
  { item: "Curso de confeitaria", price: "R$497" },
  { item: "Uma noite fora", price: "R$120" },
];

const StrikethroughPrice = ({ price, delay, inView }: { price: string; delay: number; inView: boolean }) => {
  const [showStrike, setShowStrike] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setShowStrike(true), (delay + 0.3) * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <span className="relative font-body text-[14px] font-bold" style={{ color: "var(--border)" }}>
      {price}
      {showStrike && (
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-0 top-1/2 h-[2px]"
          style={{ backgroundColor: "var(--border)" }}
        />
      )}
    </span>
  );
};

const PriceAnchor = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setFlash(true), 800);
      const t2 = setTimeout(() => setFlash(false), 1000);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="px-5 py-10 transition-colors duration-200"
      style={{ backgroundColor: flash ? "var(--caramel-light)" : "#FFFFFF" }}
    >
      <div className="max-w-[480px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="font-body text-[11px] uppercase tracking-[0.1em]"
          style={{ color: "var(--muted)" }}
        >
          QUANTO VALE O SEU LUCRO?
        </motion.p>

        <div className="mt-5 space-y-2">
          {comparisons.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease }}
              className="flex justify-between items-center"
            >
              <span className="font-body text-[14px]" style={{ color: "var(--muted)" }}>{c.item}</span>
              <StrikethroughPrice price={c.price} delay={0.05 * i} inView={inView} />
            </motion.div>
          ))}
        </div>

        <div className="my-5 h-px" style={{ backgroundColor: "var(--border)" }} />

        <p className="font-body text-[14px]" style={{ color: "var(--chocolate-mid)" }}>
          Esse cardápio completo cabe em
        </p>

        <motion.p
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...springEmphatic, delay: 0.5 }}
          className="font-display font-bold text-[80px] leading-none mt-2 relative inline-block"
          style={{ color: "var(--caramel)" }}
        >
          R$20
          {inView && (
            <span
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                background: "linear-gradient(110deg, transparent 30%, rgba(212,168,67,0.3) 50%, transparent 70%)",
                animation: "shimmer 0.8s ease-out 1.3s forwards",
              }}
            />
          )}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          className="font-body text-[13px] mt-2"
          style={{ color: "var(--muted)" }}
        >
          Acesso imediato após o pagamento.
        </motion.p>
      </div>
    </section>
  );
};

export default PriceAnchor;
