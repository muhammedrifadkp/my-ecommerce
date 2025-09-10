'use client';
import { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = ({
    src,
    fallbackSrc,
    alt,
    className = '',
    width,
    height,
    fill = false,
    priority = false,
    placeholder,
    onLoad,
    onError,
    ...props
}) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
        if (onLoad) onLoad();
    };

    const handleError = () => {
        if (!error && fallbackSrc) {
            setError(true);
            setLoading(false);
        }
        if (onError) onError();
    };

    const imageSrc = error && fallbackSrc ? fallbackSrc : src;

    return (
        <div className={`relative ${className}`}>
            <Image
                src={imageSrc}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                priority={priority}
                className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'
                    }`}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />

            {/* Loading skeleton */}
            {loading && (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 animate-pulse flex items-center justify-center">
                    {placeholder && (
                        <div className="text-center text-neutral-400">
                            {placeholder}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageWithFallback;