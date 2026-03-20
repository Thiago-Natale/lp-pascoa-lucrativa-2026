import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const tiers = [
  { icon: "🕐", label: "Até 1h por dia", min: 400, max: 700, delay: 0.15, dir: "left" },
  { icon: "🕒", label: "2–3h por dia", min: 800, max: 1500, delay: 0.25, dir: "up" },
  { icon: "🕗", label: "O quanto precisar", min: 1500, max: 2000, delay: 0.35, dir: "right", plus: true },
];

function useCounter(end: number, inView: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * end));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);
  return val;
}

const CounterValue = ({ min, max, plus, inView }: { min: number; max: number; plus?: boolean; inView: boolean }) => {
  const v1 = useCounter(min, inView);
  const v2 = useCounter(max, inView);
  return (
    <span className="font-display text-[22px] font-bold" style={{ color: "#A8D5A2" }}>
      R${v1.toLocaleString("pt-BR")}–R${v2.toLocaleString("pt-BR")}{plus ? "+" : ""}
    </span>
  );
};

const FinancialProjection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="w-full px-5 py-10 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #3D1F0D, #7B4621)" }}
    >
      {/* Shine sweep */}
      {inView && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
            transform: "skewX(-20deg)",
            animation: "shimmer 1.5s ease-out forwards",
          }}
        />
      )}

      <div className="max-w-[480px] mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-[22px] text-white text-center"
        >
          Quanto você pode lucrar?
        </motion.h2>

        <div className="mt-6 flex flex-col gap-3">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: t.dir === "left" ? -32 : t.dir === "right" ? 32 : 0,
                y: t.dir === "up" ? 32 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: t.delay, ease }}
              className="flex items-center justify-between p-5 rounded-[14px]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[20px]">{t.icon}</span>
                <span className="font-body text-[13px] text-white">{t.label}</span>
              </div>
              <CounterValue min={t.min} max={t.max} plus={t.plus} inView={inView} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-body text-[11px] italic text-center mt-4"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Projeção baseada nas margens reais do cardápio.
        </motion.p>
      </div>
    </section>
  );
};

export default FinancialProjection;
