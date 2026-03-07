import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex items-center bg-gold/5 rounded-full p-[3px] border border-gold/20 transition-all duration-300">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-body font-[600] tracking-widest transition-all duration-300 uppercase ${
          language === 'fr' 
            ? 'bg-gold text-white shadow-[0_2px_8px_rgba(200,169,110,0.3)]' 
            : 'text-gold/60 hover:text-gold'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-body font-[600] tracking-widest transition-all duration-300 uppercase ${
          language === 'ar' 
            ? 'bg-gold text-white shadow-[0_2px_8px_rgba(200,169,110,0.3)]' 
            : 'text-gold/60 hover:text-gold'
        }`}
      >
        AR
      </button>
    </div>
  );
}
