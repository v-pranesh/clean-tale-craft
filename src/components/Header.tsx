
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold text-gradient">StoryMuse</h1>
        </div>
        <p className="text-center text-muted-foreground mt-2">AI-powered story generation made beautiful and simple</p>
      </div>
    </header>
  );
};

export default Header;
