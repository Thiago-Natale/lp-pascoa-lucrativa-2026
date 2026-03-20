import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;
const springEmphatic = { type: "spring" as const, stiffness: 400, damping: 15 };

const Guarantee = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    left: `${10 + Math.random() * 80}%`,
    size: 2 + Math.random() * 2,
    dur: 8 + Math.random() * 6,
    delay: i * 1.5,
  }));

  return (
    <section className="px-5 py-10" style={{ backgroundColor: "var(--creme)" }}>
      <div className="max-w-[480px] mx-auto">
        <motion.div
          initial={{ backgroundColor: "#0A1A0A" }}
          whileInView={{ backgroundColor: "#1B3A1F" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="rounded-[24px] px-6 py-10 text-center relative overflow-hidden"
        >
          {/* Floating light particles */}
          {particles.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: p.left,
                bottom: "-10px",
                width: p.size,
                height: p.size,
                backgroundColor: "rgba(255,255,255,0.04)",
                animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}

          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...springEmphatic }}
            animate={{ rotate: [-3, 3, -3] }}
            className="inline-block text-[48px]"
            style={{ animationDuration: "2.5s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }}
          >
            🔒
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="font-display font-bold text-[24px] text-white mt-4"
          >
            Risco zero. Sério.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="font-body text-[15px] leading-[1.8] mt-3"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Se em 7 dias você achar que não valeu — manda uma mensagem e eu devolvo seu dinheiro. Sem perguntas. Sem formulário. Sem burocracia.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="font-body text-[15px] italic font-bold mt-3 relative overflow-hidden"
            style={{ color: "var(--caramel)" }}
          >
            Você tem tudo a ganhar. E absolutamente nada a perder.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
