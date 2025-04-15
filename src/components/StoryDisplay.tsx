
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, RefreshCw } from 'lucide-react';

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
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(story);
  };

  return (
    <Card className="w-full mt-6 shadow-sm">
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Crafting your story...</p>
          </div>
        ) : (
          <>
            <div className="prose prose-lg max-w-none mb-6">
              {story ? (
                <div className="whitespace-pre-wrap animate-fade-in">{story}</div>
              ) : (
                <div className="text-center text-muted-foreground h-64 flex items-center justify-center">
                  <p>Your story will appear here</p>
                </div>
              )}
            </div>
            {story && (
              <div className="flex flex-wrap gap-2 justify-end mt-4">
                <Button variant="outline" size="sm" onClick={onRegenerate}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadStory}>
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
