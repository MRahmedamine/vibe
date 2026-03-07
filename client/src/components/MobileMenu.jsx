import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const menuVariants = {
    hidden: { clipPath: 'circle(0% at 90% 10%)', opacity: 0 },
    visible: {
        clipPath: 'circle(150% at 90% 10%)', opacity: 1,
        transition: {
            duration: 0.8, ease: [0.76, 0, 0.24, 1],
            staggerChildren: 0.1, delayChildren: 0.2
        }
    },
    exit: {
        clipPath: 'circle(0% at 90% 10%)', opacity: 0,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
};

const linkWrapVariants = {
    hidden: { overflow: 'hidden' },
    visible: { overflow: 'visible' },
};

const linkVariants = {
    hidden: { y: "150%", opacity: 0, rotate: 5 },
    visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { y: "50%", opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
};

export default function MobileMenu({ isOpen, onClose }) {
    const { t } = useTranslation();
    const location = useLocation();

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const links = [
        { path: '/', label: 'nav.accueil' },
        { path: '/catalogue', label: 'nav.catalogue' },
        { path: '/a-propos', label: 'nav.apropos' },
        { path: '/sur-mesure', label: 'nav.surMesure' },
        { path: '/contact', label: 'nav.contact' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 w-full h-[100dvh] z-[100] bg-obsidian flex flex-col items-center justify-center pointer-events-auto shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-5 p-3 text-gold hover:text-cream hover:rotate-90 hover:scale-110 transition-all duration-500 z-10 bg-black/20 rounded-full"
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>

                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="absolute top-7 left-6 flex flex-col items-start z-10 pointer-events-none"
                    >
                        <span className="font-display font-bold text-[22px] tracking-[0.2em] leading-none text-cream">N O V A</span>
                        <span className="font-body text-[9px] text-gold tracking-[0.3em] block mt-1">D E S I G N</span>
                    </motion.div>

                    <nav className="flex flex-col items-center justify-center gap-8 w-full px-8 relative z-10 my-auto py-20 flex-grow">
                        {links.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <motion.div key={link.path} variants={linkWrapVariants} className="overflow-visible">
                                    <motion.div variants={linkVariants}>
                                        <Link 
                                            to={link.path} 
                                            onClick={onClose} 
                                            className={`block font-display text-[38px] sm:text-[46px] font-medium tracking-wide relative group transition-colors duration-500 ${isActive ? 'text-gold' : 'text-cream hover:text-gold/80'}`}
                                        >
                                            {t(link.label)}
                                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gold/70 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isActive ? 'w-24' : 'w-0 group-hover:w-full max-w-[80px]'}`} />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </nav>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute bottom-10 flex flex-col items-center gap-5 z-10 w-full pointer-events-none"
                    >
                        <div className="h-[40px] w-px bg-gradient-to-b from-gold/50 to-transparent"></div>
                        <div className="text-[10px] sm:text-[11px] font-body tracking-[0.4em] text-gold/70 uppercase text-center w-full px-4">
                            Artisan du Marbre
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
