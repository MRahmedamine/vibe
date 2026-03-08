import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
    initial: { opacity: 0, y: 15 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, scale: 0.99, transition: { duration: 0.4 } }
};

const pageTransition = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
};

export default function PageTransition({ children }) {
    const location = useLocation();
    return (
        <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
}
