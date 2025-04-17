
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Wand2, Sparkles, BookOpen, Feather, Scroll, Bookmark, Palette, PenTool } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import StoryDisplay from './StoryDisplay';
import StoryPrompt from './StoryPrompt';
import { generateStory } from '@/api/storyApi';
import { useToast } from "@/components/ui/use-toast";
import AnimatedImage from './AnimatedImage';

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
    <div className="container mx-auto px-4 max-w-3xl relative">
      <AnimatedImage 
        src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
        className="absolute -top-10 -right-20 w-24 h-24 opacity-20 animate-gentle-rotate"
        alt="Decorative leaf"
      />
      
      <AnimatedImage 
        src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
        className="absolute -bottom-10 -left-16 w-20 h-20 opacity-20 animate-float"
        alt="Decorative leaf"
      />
      
      <div className="parchment-texture rounded-xl p-6 shadow-lg animate-fade-in relative overflow-hidden">
        <div className="absolute -bottom-4 -right-4 opacity-10">
          <Bookmark className="w-20 h-20 text-amber-700 transform rotate-12" />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Scroll className="h-6 w-6 text-primary animate-gentle-rotate" />
          <h2 className="text-xl font-serif font-semibold">Story Enchanter</h2>
        </div>
        
        <div className="space-y-6 mb-6">
          <StoryPrompt prompt={prompt} setPrompt={setPrompt} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ThemeSelector selectedTheme={theme} onThemeChange={handleThemeChange} />
            
            <div className="bg-gradient-to-br from-amber-50/60 to-amber-100/40 p-4 rounded-lg border border-primary/10 ink-splash">
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary/70 animate-soft-pulse" />
                <span className="font-body-serif">Word Count: {wordCount}</span>
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
          className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 font-serif shadow-md"
          disabled={isLoading}
        >
          <Feather className="h-4 w-4 mr-2 animate-float" />
          {isLoading ? 'Weaving your tale...' : 'Enchant My Story'}
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
