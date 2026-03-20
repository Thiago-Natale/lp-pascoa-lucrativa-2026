import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-12 left-0 right-0 h-[3px] z-40 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, var(--caramel), var(--gold))",
      }}
    />
  );
};

export default ScrollProgress;
