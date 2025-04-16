
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LightbulbIcon } from 'lucide-react';

interface StoryPromptProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const StoryPrompt: React.FC<StoryPromptProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <LightbulbIcon className="h-4 w-4 text-primary" />
        <Label htmlFor="storyPrompt" className="text-sm font-medium text-muted-foreground">
          Story Idea (One Line)
        </Label>
      </div>
      <Input
        id="storyPrompt"
        placeholder="Enter a one-line idea for your story..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full"
      />
      <p className="text-xs text-muted-foreground">
        Provide a brief concept, character, or setting to inspire your story.
      </p>
    </div>
  );
};

export default StoryPrompt;
