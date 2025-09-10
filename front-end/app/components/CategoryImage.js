'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function CategoryImage({ category, className = "" }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                src={imageError ? category.fallbackImage : category.image}
                alt={category.name}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                    if (!imageError) {
                        setImageError(true);
                        setImageLoaded(false);
                    }
                }}
                priority={category.id <= 3}
            />

            {/* Loading placeholder */}
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 animate-pulse flex items-center justify-center">
                    <div className="text-center text-neutral-500">
                        <div className="text-4xl mb-2">{category.icon}</div>
                        <div className="text-xs font-medium">Loading Image...</div>
                    </div>
                </div>
            )}
        </div>
    );
}