
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { value: "fantasy", label: "Fantasy" },
  { value: "scifi", label: "Science Fiction" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "adventure", label: "Adventure" },
  { value: "horror", label: "Horror" },
  { value: "historical", label: "Historical" },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  selectedTheme, 
  onThemeChange 
}) => {
  return (
    <div className="w-full max-w-xs">
      <label htmlFor="theme-select" className="block text-sm font-medium text-muted-foreground mb-2">
        Story Theme
      </label>
      <Select value={selectedTheme} onValueChange={onThemeChange}>
        <SelectTrigger id="theme-select" className="w-full">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.value} value={theme.value}>
              {theme.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
