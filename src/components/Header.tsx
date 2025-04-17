
import React from 'react';
import { Sparkles, Feather, BookOpen, Star } from 'lucide-react';
import AnimatedImage from './AnimatedImage';

const Header = () => {
  return (
    <header className="py-6 relative">
      <div className="absolute top-0 right-0 -mr-10 opacity-20">
        <AnimatedImage 
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
          className="w-28 h-28 animate-float" 
          alt="Decorative lights"
        />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center">
          <div className="relative">
            <Feather className="h-7 w-7 text-primary mr-2 animate-gentle-rotate" />
            <Sparkles className="h-4 w-4 text-amber-400 absolute -top-1 -right-1 animate-soft-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gradient font-serif">StoryMuse</h1>
          <Star className="h-4 w-4 text-amber-300 ml-1 animate-soft-pulse" />
        </div>
        <p className="text-center text-muted-foreground mt-2 font-body-serif">
          AI-powered story generation made beautiful and simple
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-200 via-primary to-amber-200 mx-auto mt-3 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
