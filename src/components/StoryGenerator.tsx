
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Wand2 } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import StoryDisplay from './StoryDisplay';
import { generateStory } from '@/api/storyApi';
import { useToast } from "@/components/ui/use-toast";

const StoryGenerator = () => {
  const [theme, setTheme] = useState('fantasy');
  const [wordCount, setWordCount] = useState(300);
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleWordCountChange = (newValue: number[]) => {
    setWordCount(newValue[0]);
  };

  const handleGenerateStory = async () => {
    setIsLoading(true);
    try {
      const generatedStory = await generateStory(theme, wordCount);
      setStory(generatedStory);
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Unable to generate a story at this time. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="bg-card rounded-xl p-6 shadow-sm border animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Story Generation Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ThemeSelector selectedTheme={theme} onThemeChange={handleThemeChange} />
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Word Count: {wordCount}
            </label>
            <Slider
              defaultValue={[wordCount]}
              min={100}
              max={500}
              step={50}
              onValueChange={handleWordCountChange}
              className="w-full"
            />
          </div>
        </div>
        
        <Button
          onClick={handleGenerateStory}
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isLoading ? 'Generating...' : 'Generate Story'}
        </Button>
      </div>
      
      <StoryDisplay 
        story={story} 
        isLoading={isLoading} 
        onRegenerate={handleGenerateStory} 
      />
    </div>
  );
};

export default StoryGenerator;
