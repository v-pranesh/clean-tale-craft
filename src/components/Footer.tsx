
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 mt-12">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          Powered by Hugging Face AI models | © {new Date().getFullYear()} StoryMuse
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          Created with ❤️ and imagination
        </p>
      </div>
    </footer>
  );
};

export default Footer;
