import { motion } from "framer-motion";

const UrgencyBar = () => (
  <motion.div
    initial={{ y: -48 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-center overflow-hidden"
    style={{ backgroundColor: "var(--red-urgency)" }}
  >
    <span className="font-body text-[13px] font-bold text-white relative z-10">
     💵 Páscoa Lucrativa 2026 · Acesso imediato
    </span>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
        animation: "shimmer 2.5s linear infinite",
      }}
    />
  </motion.div>
);

export default UrgencyBar;
