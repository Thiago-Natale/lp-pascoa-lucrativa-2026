import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;
const springEmphatic = { type: "spring" as const, stiffness: 400, damping: 15 };

const bullets = [
  "Quanto cobrar sem assustar o cliente",
  "Como abordar pelo WhatsApp sem parecer chata",
  "O que fazer quando disserem que tá caro",
  "Como vender antes de fazer uma única unidade",
];

interface OrderBumpProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

const OrderBump = ({ checked, onChange }: OrderBumpProps) => (
  <section className="px-5 py-10" style={{ backgroundColor: "var(--creme)" }}>
    <div className="max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ ...springEmphatic }}
        className="rounded-card p-6 transition-all duration-300"
        style={{
          backgroundColor: checked ? "var(--green-light)" : "#FFFDE7",
          border: checked ? "2px solid var(--green-dark)" : "2px dashed var(--caramel)",
        }}
      >
        {/* Badge */}
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.4, repeat: 3, repeatDelay: 2 }}
          className="inline-block font-body text-[11px] font-bold uppercase text-white px-3.5 py-1 rounded-pill"
          style={{ backgroundColor: "var(--red-urgency)" }}
        >
          🎁 OFERTA EXCLUSIVA — SÓ NESSA PÁGINA
        </motion.span>

        <h3 className="font-body text-[16px] font-bold mt-3.5" style={{ color: "var(--chocolate)" }}>
          Complete seu pedido por mais R$5,00.
        </h3>

        <p className="font-body text-[15px] font-bold mt-1" style={{ color: "var(--caramel)" }}>
          Manual de Precificação e Estratégias de Venda
        </p>

        <div className="mt-4 space-y-2">
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
              className="flex items-start gap-2"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...springEmphatic, delay: 0.3 + i * 0.08 }}
                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white mt-0.5"
                style={{ backgroundColor: "var(--green-dark)" }}
              >
                ✓
              </motion.span>
              <span className="font-body text-[13px]" style={{ color: "var(--chocolate)" }}>{b}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="font-body text-[13px] line-through" style={{ color: "var(--muted)" }}>De R$15</span>
          <span className="font-body text-[18px] font-bold" style={{ color: "var(--green-dark)" }}>por R$5,00</span>
        </div>

        <motion.label
          animate={checked ? { x: [0, 3, -3, 2, -2, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mt-4 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
            className="w-6 h-6 rounded accent-green-700 cursor-pointer"
          />
          <span className="font-body text-[14px]" style={{ color: "var(--chocolate)" }}>
            Sim, quero o Manual também (+R$5)
          </span>
        </motion.label>

        {checked && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-[13px] font-bold mt-3"
            style={{ color: "var(--green-dark)" }}
          >
            ✅ Adicionado ao seu pedido!
          </motion.p>
        )}
      </motion.div>
    </div>
  </section>
);

export default OrderBump;
