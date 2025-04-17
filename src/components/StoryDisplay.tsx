
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, RefreshCw, Copy, Check, Feather, BookOpen, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface StoryDisplayProps {
  story: string;
  isLoading: boolean;
  onRegenerate: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ 
  story, 
  isLoading,
  onRegenerate
}) => {
  const [copied, setCopied] = useState(false);

  const downloadStory = () => {
    const blob = new Blob([story], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `storymuse-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Story downloaded!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    toast('Story copied to clipboard!');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="w-full mt-6 shadow-md border border-amber-200/40 overflow-hidden parchment-texture">
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative">
              <Feather className="w-12 h-12 text-primary/70 animate-gentle-rotate" />
              <Sparkles className="w-6 h-6 text-amber-400/80 absolute -top-2 -right-2 animate-soft-pulse" />
            </div>
            <p className="mt-4 text-muted-foreground font-serif font-medium">Weaving your story...</p>
            <p className="text-sm text-muted-foreground/70 mt-2 max-w-md text-center font-body-serif">
              Our enchanted quill is crafting a unique tale just for you. This might take a moment as the magic unfolds...
            </p>
          </div>
        ) : (
          <>
            <div className="prose prose-lg max-w-none mb-6">
              {story ? (
                <div className="font-body-serif story-text whitespace-pre-wrap animate-fade-in leading-relaxed p-6 rounded-lg bg-white/50 ink-splash">
                  {story}
                </div>
              ) : (
                <div className="text-center text-muted-foreground h-64 flex flex-col items-center justify-center p-4 border border-dashed border-amber-200/60 rounded-lg">
                  <BookOpen className="h-8 w-8 text-amber-600/40 mb-4 animate-gentle-rotate" />
                  <p className="mb-2 font-serif font-medium">Your story will appear here</p>
                  <p className="text-sm text-muted-foreground/70 max-w-md font-body-serif">
                    Fill in the prompt above, select a theme and word count, then click "Enchant My Story" to begin your literary adventure.
                  </p>
                </div>
              )}
            </div>
            {story && (
              <div className="flex flex-wrap gap-2 justify-end mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRegenerate}
                  className="hover:bg-secondary/50 transition-all duration-200 font-serif"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Tale
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="hover:bg-secondary/50 transition-all duration-200 font-serif"
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadStory}
                  className="hover:bg-secondary/50 transition-all duration-200 font-serif"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StoryDisplay;
