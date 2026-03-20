import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import print from '../../assets/print.png'

const ease = [0.25, 0.1, 0.25, 1] as const;
const springEmphatic = { type: "spring" as const, stiffness: 400, damping: 15 };

const testimonials = [
  { text: "Fiz 3 ovos de brownie no primeiro dia e já vendi todos pelo WhatsApp!", name: "Camila R.", city: "Belo Horizonte, MG", dir: "left" },
  { text: "Nunca pensei que pudesse ganhar dinheiro na Páscoa. As receitas são simples e o lucro é real.", name: "Patrícia M.", city: "Curitiba, PR", dir: "up" },
  { text: "O manual de precificação sozinho já vale mais que os R$20. Mudou minha visão sobre vender doces.", name: "Fernanda L.", city: "Recife, PE", dir: "right" },
];

function useCounter(end: number, start: number, inView: boolean) {
  const [val, setVal] = useState(start);
  useEffect(() => {
    if (!inView) return;
    const dur = 1000;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / dur, 1);
      setVal(Math.round(start + (end - start) * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, start]);
  return val;
}

const Stars = ({ inView, baseDelay }: { inView: boolean; baseDelay: number }) => (
  <div className="flex gap-0.5 mb-2">
    {[0, 1, 2, 3, 4].map(i => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ ...springEmphatic, delay: baseDelay + i * 0.08 }}
        className="text-[13px]"
        style={{ color: "var(--gold)" }}
      >
        ⭐
      </motion.span>
    ))}
  </div>
);

const SocialProof = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(1200, 1000, inView);

  return (
    <section ref={ref} className="px-5 py-10" style={{ backgroundColor: "#F5EFE6" }}>
      <div className="max-w-[480px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-[20px] text-center"
          style={{ color: "var(--chocolate)" }}
        >
          O que estão dizendo.
        </motion.h2>

        <div className="mt-6 flex flex-col gap-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: t.dir === "left" ? -32 : t.dir === "right" ? 32 : 0,
                y: t.dir === "up" ? 32 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
              className="bg-white p-5 shadow-card"
              style={{
                borderLeft: "4px solid var(--caramel)",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <Stars inView={inView} baseDelay={0.3 + i * 0.15} />
              <p className="font-body text-[14px] italic" style={{ color: "var(--chocolate)" }}>
                "{t.text}"
              </p>
              <p className="font-body text-[12px] font-bold mt-2" style={{ color: "var(--muted)" }}>
                {t.name} — {t.city}
              </p>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...springEmphatic, delay: 0.3 }}
          className="mt-8 mx-auto rounded-[16px] overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: "#ECE5DD",
            height: 'auto',
            maxWidth: 300,
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
            animation: "gentle-rock 3s ease-in-out infinite",
          }}
        >
          <img src={print} alt="" />
        </motion.div>

        {/* Counter */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="font-body text-[15px] font-bold text-center mt-6"
          style={{ color: "var(--chocolate)" }}
        >
          👩 + de {count.toLocaleString("pt-BR")} mulheres usaram esse cardápio
        </motion.p>
      </div>
    </section>
  );
};

export default SocialProof;
