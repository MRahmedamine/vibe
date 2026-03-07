import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useContext(CartContext);
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full h-[64px] lg:h-[72px] z-50 flex items-center justify-between px-5 lg:px-8 xl:px-12 transition-all duration-[350ms] ease-out ${scrolled ? 'backdrop-blur-[20px] saturate-[180%] border-b border-[var(--border)]' : 'backdrop-blur-[8px]'}`} style={{ backgroundColor: 'var(--navbar-bg)' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                >
                    <Link to="/" className="font-display font-bold text-[22px] text-dark tracking-[0.25em] leading-none">{t('brand.nova')}</Link>
                    <span className="font-body text-[9px] text-gold tracking-[0.4em] block -mt-[2px]">{t('brand.design')}</span>
                    <div className="w-full h-[1px] bg-gold opacity-50 mt-1"></div>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden xl:flex items-center gap-10 font-body text-[11px] font-[500] tracking-wider uppercase text-dark">
                    <Link to="/" className="relative group overflow-hidden pb-1">
                        {t('nav.accueil')}
                        <span className="absolute bottom-0 left-0 h-px bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                    <Link to="/catalogue" className="relative group overflow-hidden pb-1">
                        {t('nav.catalogue')}
                        <span className="absolute bottom-0 left-0 h-px bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                    <Link to="/a-propos" className="relative group overflow-hidden pb-1">
                        {t('nav.apropos')}
                        <span className="absolute bottom-0 left-0 h-px bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                    <Link to="/sur-mesure" className="relative group overflow-hidden pb-1">
                        {t('nav.surMesure')}
                        <span className="absolute bottom-0 left-0 h-px bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                    <Link to="/contact" className="relative group overflow-hidden pb-1">
                        {t('nav.contact')}
                        <span className="absolute bottom-0 left-0 h-px bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                >
                    <LanguageSwitcher />
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-colors cursor-pointer"
                        title={theme === 'light' ? t('nav.modeSource') : t('nav.modeClaire')}
                    >
                        {theme === 'light' ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
                    </button>
                    <Link to="/panier" className="relative cursor-pointer">
                        <ShoppingBag size={20} className="text-dark" strokeWidth={1.5} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    key={cartCount}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                    className="absolute -top-1 -right-2 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                    <button className="xl:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu size={20} className="text-dark" strokeWidth={1.5} />
                    </button>
                </motion.div>
            </nav>
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
