
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Wand2, Sparkles, BookOpen } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import StoryDisplay from './StoryDisplay';
import StoryPrompt from './StoryPrompt';
import { generateStory } from '@/api/storyApi';
import { useToast } from "@/components/ui/use-toast";

const StoryGenerator = () => {
  const [theme, setTheme] = useState('fantasy');
  const [wordCount, setWordCount] = useState(300);
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Add a random ID to ensure each request is treated as unique
  const [requestId, setRequestId] = useState(Math.random().toString(36).substring(2, 15));
  const { toast } = useToast();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleWordCountChange = (newValue: number[]) => {
    setWordCount(newValue[0]);
  };

  const handleGenerateStory = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a brief prompt for your story.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a new request ID for each story generation
    setRequestId(Math.random().toString(36).substring(2, 15));
    setIsLoading(true);
    
    try {
      // Add the requestId to ensure we get a unique story each time
      const generatedStory = await generateStory(theme, wordCount, prompt + ` [${requestId}]`);
      // Strip out any requestId that might have leaked into the response
      const cleanedStory = generatedStory.replace(new RegExp(`\\[${requestId}\\]`, 'g'), '').trim();
      setStory(cleanedStory);
      toast({
        title: "Story Generated!",
        description: "Enjoy your unique tale.",
        variant: "default"
      });
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
      <div className="bg-gradient-to-br from-white to-secondary/40 rounded-xl p-6 shadow-lg border border-secondary/30 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Story Generator</h2>
        </div>
        
        <div className="space-y-6 mb-6">
          <StoryPrompt prompt={prompt} setPrompt={setPrompt} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ThemeSelector selectedTheme={theme} onThemeChange={handleThemeChange} />
            
            <div className="bg-white/50 p-4 rounded-lg border border-primary/10">
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary/70" />
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
        </div>
        
        <Button
          onClick={handleGenerateStory}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isLoading ? 'Crafting your tale...' : 'Generate Story'}
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

