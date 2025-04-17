
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { BookOpen, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { value: "fantasy", label: "Fantasy", icon: "✨" },
  { value: "scifi", label: "Science Fiction", icon: "🚀" },
  { value: "mystery", label: "Mystery", icon: "🔍" },
  { value: "romance", label: "Romance", icon: "💖" },
  { value: "adventure", label: "Adventure", icon: "🗺️" },
  { value: "horror", label: "Horror", icon: "👻" },
  { value: "historical", label: "Historical", icon: "📜" },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  selectedTheme, 
  onThemeChange 
}) => {
  return (
    <div className="w-full max-w-xs relative">
      <div className="absolute -top-1 -left-1 opacity-20">
        <BookOpen className="h-6 w-6 text-amber-600 animate-gentle-rotate" />
      </div>
      
      <label htmlFor="theme-select" className="block text-sm font-medium text-muted-foreground mb-2 flex items-center">
        <Sparkles className="h-4 w-4 mr-2 text-primary/70" />
        <span className="font-body-serif">Story Theme</span>
      </label>
      <Select value={selectedTheme} onValueChange={onThemeChange}>
        <SelectTrigger id="theme-select" className="w-full bg-gradient-to-br from-amber-50/60 to-amber-100/40 border-amber-200/40">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border-amber-200/40">
          {themes.map((theme) => (
            <SelectItem key={theme.value} value={theme.value} className="font-body-serif">
              <span className="mr-2">{theme.icon}</span> {theme.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
