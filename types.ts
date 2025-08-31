
export type ThemeOptions = {
  dark: string;
  light: string;
};

// API response shape for a category
export interface Category {
  category: string;
  total: number;
}

// Shape of the icon data from the svgl.app API
export interface ApiIcon {
  id: number;
  title: string;
  category: string | string[];
  route: string | ThemeOptions;
  url: string;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
}

// Shape of the icon data used throughout the application
export interface SvglIcon {
  id: number;
  name: string;
  category: string;
  route: string; // URL to the .svg file
}