import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -36 },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
