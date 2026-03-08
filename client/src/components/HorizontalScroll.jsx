import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HorizontalScroll({ 
    title, 
    tag, 
    seeAllLink, 
    seeAllText, 
    items, 
    renderItem, 
    isReverse, 
    bgClass = 'bg-[var(--bg-secondary)]' 
}) {
    const targetRef = useRef(null);
    const carouselRef = useRef(null);
    const distRef = useRef(0);
    const [sectionHeight, setSectionHeight] = useState('100vh');
    const [isClient, setIsClient] = useState(false);

    const { scrollYProgress } = useScroll({ 
        target: targetRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        setIsClient(true);
        const updateWidths = () => {
             if (carouselRef.current) {
                 const containerW = carouselRef.current.scrollWidth;
                 const viewW = window.innerWidth;
                 const dist = Math.max(0, containerW - viewW);
                 distRef.current = dist;
                 
                 if (dist > 0) {
                     // Add vertical height proportional to horizontal distance + 1 viewport height for the pinning
                     setSectionHeight(`${dist + window.innerHeight}px`);
                 } else {
                     setSectionHeight('auto');
                 }
             }
        };
        
        setTimeout(updateWidths, 100);
        
        const observer = new ResizeObserver(updateWidths);
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }
        
        window.addEventListener('resize', updateWidths);
        return () => {
            window.removeEventListener('resize', updateWidths);
            observer.disconnect();
        };
    }, [items]);

    const x = useTransform(scrollYProgress, v => {
        return isReverse 
            ? -distRef.current * (1 - v)
            : -distRef.current * v;
    });

    return (
        <section ref={targetRef} className={`relative ${bgClass}`} style={{ height: sectionHeight }}>
            <div className={`sticky top-0 w-full overflow-hidden flex flex-col justify-center py-20 ${sectionHeight === 'auto' ? 'relative' : 'h-screen'}`}>
                {/* Header Container */}
                <div className="w-full px-5 xl:px-20 mx-auto max-w-7xl mb-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="font-body text-[10px] uppercase tracking-[0.2em] block mb-3 text-[#C8A96E]">
                            {tag}
                        </span>
                        <div className="flex justify-between items-end mb-3">
                            <h2 className="font-display text-[36px] xl:text-[42px] text-[var(--text-primary)] leading-none">
                                {title}
                            </h2>
                            {seeAllLink && (
                                <Link to={seeAllLink} className="font-body text-[11px] tracking-[0.1em] mb-1 text-[#C8A96E] hover:opacity-70 transition-opacity whitespace-nowrap ml-4">
                                    {seeAllText}
                                </Link>
                            )}
                        </div>
                        <div className="gold-separator" />
                    </motion.div>
                </div>
                
                {/* Scroll Track */}
                <div className="flex w-full items-center max-w-[100vw]">
                    {isClient && (
                        <motion.div 
                            ref={carouselRef} 
                            style={sectionHeight === 'auto' ? {} : { x }} 
                            className="flex gap-6 w-max px-5 xl:px-20 will-change-transform"
                        >
                            {items?.map((item, i) => (
                                <div key={item._id || i} className="w-[80vw] sm:w-[50vw] md:w-[380px] xl:w-[420px] shrink-0">
                                    {renderItem(item)}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
