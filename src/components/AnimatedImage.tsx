
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({ 
  src, 
  alt,
  className 
}) => {
  return (
    <div className={cn("overflow-hidden", className)}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default AnimatedImage;
