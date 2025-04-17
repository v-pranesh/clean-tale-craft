
import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="h-4 w-4 text-primary/60 mr-2" />
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground font-body-serif">
          Powered by Gemini AI models | © {new Date().getFullYear()} StoryMuse
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1 flex items-center justify-center">
          Created with <Heart className="h-3 w-3 text-primary mx-1 animate-pulse" /> and imagination
        </p>
      </div>
    </footer>
  );
};

export default Footer;
