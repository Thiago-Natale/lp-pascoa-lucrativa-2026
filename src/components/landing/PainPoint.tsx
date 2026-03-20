import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const lines = [
  { text: "Você quer vender, mas não sabe por onde começar.", dir: "left" as const, delay: 0.1 },
  { text: "Tem medo de investir e não dar retorno.", dir: "left" as const, delay: 0.25 },
  { text: "E se eu te dissesse que o caminho já tá pronto?", dir: "right" as const, delay: 0.45, emphasis: true },
];

const PainPoint = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setShowCursor(true), 900);
      const t2 = setTimeout(() => setShowCursor(false), 2400);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      initial={{ backgroundColor: "#1A0E06" }}
      whileInView={{ backgroundColor: "#2A1A0E" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="w-full px-5 py-10"
    >
      <div className="max-w-[480px] mx-auto space-y-4">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: line.dir === "left" ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: line.delay, ease }}
            className={`font-body ${line.emphasis ? "text-[18px] font-bold italic" : "text-[16px] font-normal"}`}
            style={{ color: line.emphasis ? "var(--caramel)" : "#ffffff" }}
          >
            {line.emphasis ? (
              <motion.span
                animate={inView ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: 2, delay: 0.8 }}
              >
                {line.text}
                {showCursor && (
                  <span className="inline-block w-[2px] h-[1.1em] ml-1 align-middle animate-pulse" style={{ backgroundColor: "var(--caramel)" }} />
                )}
              </motion.span>
            ) : (
              line.text
            )}
          </motion.p>
        ))}
      </div>
    </motion.section>
  );
};

export default PainPoint;
