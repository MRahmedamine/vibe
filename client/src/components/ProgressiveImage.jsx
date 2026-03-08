import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProgressiveImage({ src, alt, className, blurColor = '#E8E3D8', style }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setImageLoaded(true);
        }
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ ...style, backgroundColor: blurColor }}>
            <motion.img
                ref={imgRef}
                initial={{ opacity: 0, filter: 'blur(20px)' }}
                animate={{
                    opacity: imageLoaded ? 1 : 0,
                    filter: imageLoaded ? 'blur(0px)' : 'blur(20px)',
                    scale: imageLoaded ? 1 : 1.05
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>
    );
}
