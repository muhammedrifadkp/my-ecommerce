'use client';

const LoadingSpinner = ({
    size = 'md',
    color = 'primary',
    className = '',
    text = null
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const colorClasses = {
        primary: 'border-primary-600 border-t-primary-200',
        secondary: 'border-secondary-600 border-t-secondary-200',
        white: 'border-white border-t-white/30',
        neutral: 'border-neutral-600 border-t-neutral-200'
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div
                className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          border-2 border-solid rounded-full animate-spin
        `}
            />
            {text && (
                <p className="mt-3 text-sm text-neutral-600 font-medium animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;