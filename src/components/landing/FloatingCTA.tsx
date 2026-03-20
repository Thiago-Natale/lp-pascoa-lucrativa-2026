import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const CTA_URL = "https://pay.cakto.com.br/gxdfbrh_795736";

const FloatingCTA = () => {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const [nearCTA, setNearCTA] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => {
      setShow(v > 0.4);
      setNearCTA(v > 0.9);
    });
    return unsub;
  }, [scrollYProgress]);

  if (!show || nearCTA) return null;

  return (
    <motion.a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 h-[52px] flex items-center justify-center font-body text-[15px] font-bold text-white no-underline"
      style={{
        backgroundColor: "var(--caramel)",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -4px 24px rgba(200,120,26,0.3)",
        animation: "pulse-shadow 2s ease-in-out infinite",
      }}
    >
      Garantir meu cardápio — R$20 →
    </motion.a>
  );
};

export default FloatingCTA;
