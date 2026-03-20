import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;
const TARGET = new Date("2026-04-05T00:00:00");

function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

const Digit = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      setPrev(value);
      const t = setTimeout(() => setFlip(false), 200);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease }}
      className="flex flex-col items-center"
    >
      <span
        className="font-display font-bold text-[52px] text-white leading-none tabular-nums"
        style={{
          animation: flip ? "flip-digit 0.2s ease-out" : undefined,
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-body text-[10px] uppercase mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
        {label}
      </span>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeLeft);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ backgroundColor: "#5C0000" }}
      whileInView={{ backgroundColor: "#8B0000" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="w-full px-5 py-10 relative overflow-hidden"
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
          animation: "vignette-pulse 6s ease-in-out infinite",
        }}
      />

      <div className="max-w-[480px] mx-auto relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-body text-[11px] uppercase tracking-[0.1em]"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          TEMPO RESTANTE ATÉ A PÁSCOA
        </motion.p>

        <div className="flex justify-center items-center gap-4 mt-5">
          <Digit value={time.days} label="DIAS" delay={0.1} />
          <span className="font-body text-[40px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>:</span>
          <Digit value={time.hours} label="HORAS" delay={0.2} />
          <span className="font-body text-[40px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>:</span>
          <Digit value={time.mins} label="MIN" delay={0.3} />
          <span className="font-body text-[40px] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>:</span>
          <Digit value={time.secs} label="SEG" delay={0.4} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          animate={inView ? { scale: [1, 1.015, 1] } : {}}
          className="font-body text-[15px] mt-6"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          Cada dia sem começar é dinheiro deixado na mesa.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default CountdownTimer;
