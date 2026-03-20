import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;
const springEmphatic = { type: "spring" as const, stiffness: 400, damping: 15 };

const recipes = [
  { emoji: "🍫", name: "Ovo de Brownie", profit: "+R$76,50/un" },
  { emoji: "🥛", name: "Ovo Leitinho com Avelã", profit: "+R$62,00/un" },
  { emoji: "🍮", name: "Mousse de Chocolate", profit: "+R$40,00/pote" },
  { emoji: "🦕", name: "Ovo de Dinossauro", profit: "+R$93,00/un" },
  { emoji: "🍋", name: "Ovo Torta de Limão", profit: "+R$41,00/un" },
  { emoji: "🥚", name: "Mini Ovinhos Recheados", profit: "+R$70,00/kit" },
];

const RecipeCards = () => (
  <section className="px-5 py-10" style={{ backgroundColor: "var(--creme)" }}>
    <div className="max-w-[480px] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="font-display font-bold text-[22px] leading-[1.3]"
        style={{ color: "var(--chocolate)" }}
      >
        12 receitas prontas pra vender.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
        className="font-body text-[13px] mt-1"
        style={{ color: "var(--muted)" }}
      >
        Com a margem de lucro calculada em cada uma.
      </motion.p>

      <div className="mt-5 flex flex-col gap-2.5">
        {recipes.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
            whileHover={{ x: 4, boxShadow: "0 8px 32px rgba(61,31,13,0.14)" }}
            className="flex items-center gap-3 bg-white rounded-card-inner p-4 shadow-card transition-shadow duration-200"
            style={{ border: "1px solid var(--border)" }}
          >
            <span className="text-[28px] flex-shrink-0">{r.emoji}</span>
            <span className="font-body text-[14px] font-bold flex-1" style={{ color: "var(--chocolate)" }}>{r.name}</span>
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...springEmphatic, delay: 0.25 + i * 0.07 }}
              className="font-body text-[13px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
              style={{ color: "var(--green-dark)", backgroundColor: "var(--green-light)" }}
            >
              {r.profit}
            </motion.span>
          </motion.div>
        ))}

        {/* Locked card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="rounded-card-inner p-5 text-center font-body text-[13px]"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(5px)",
            border: "2px dashed var(--border)",
            color: "var(--muted)",
          }}
        >
          🔒 + 6 receitas exclusivas desbloqueadas após a compra.
        </motion.div>
      </div>
    </div>
  </section>
);

export default RecipeCards;
