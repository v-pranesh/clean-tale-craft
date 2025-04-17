
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LightbulbIcon, Feather, Sparkles } from 'lucide-react';

interface StoryPromptProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const StoryPrompt: React.FC<StoryPromptProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="space-y-2 relative">
      <div className="absolute -top-1 -right-1 opacity-20">
        <Feather className="h-6 w-6 text-amber-600 animate-gentle-rotate" />
      </div>
      
      <div className="flex items-center gap-2">
        <LightbulbIcon className="h-4 w-4 text-primary animate-soft-pulse" />
        <Label htmlFor="storyPrompt" className="text-sm font-medium text-muted-foreground">
          <span className="font-body-serif">Story Idea (One Line)</span>
        </Label>
      </div>
      <Input
        id="storyPrompt"
        placeholder="Enter a one-line idea for your story..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full bg-gradient-to-br from-white/90 to-amber-50/60 border-amber-200/40"
      />
      <p className="text-xs text-muted-foreground flex items-center">
        <Sparkles className="h-3 w-3 mr-1 text-amber-400/70" />
        <span className="font-body-serif">Provide a brief concept, character, or setting to inspire your story.</span>
      </p>
    </div>
  );
};

export default StoryPrompt;
