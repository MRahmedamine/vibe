import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'light';
        return localStorage.getItem('nova_theme') || 'light';
    });
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('nova_theme', theme);
    }, [theme]);

    // Apply 'dark' class only on public pages — never on admin
    useEffect(() => {
        const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
        const root = document.documentElement;
        if (!isAdmin) {
            root.classList.toggle('dark', theme === 'dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme, location.pathname]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
