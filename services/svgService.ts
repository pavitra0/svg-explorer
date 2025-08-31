import { ApiIcon, SvglIcon, Category } from '../types';

const API_URL = 'https://api.svgl.app';

const mapApiIconToSvglIcon = (icon: ApiIcon): SvglIcon => ({
  id: icon.id,
  name: icon.title,
  category: (Array.isArray(icon.category) ? icon.category.join(', ') : icon.category) || 'Uncategorized',
  route: typeof icon.route === 'string' ? icon.route : icon.route.light,
});

export const fetchIcons = async (searchTerm?: string, category?: string): Promise<SvglIcon[]> => {
  let url = API_URL;
  if (searchTerm) {
    url = `${API_URL}?search=${encodeURIComponent(searchTerm)}`;
  } else if (category && category !== 'all') {
    url = `${API_URL}/category/${category}`;
  }

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      // Not found is not an error, it's just zero results.
      return []; 
    }

    if (response.status === 429) {
      // Rate limited. This is an error we want to show the user.
      throw new Error('Too many requests. Please wait a moment before searching again.');
    }

    if (!response.ok) {
      // Any other non-ok status is a genuine error.
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: ApiIcon[] = await response.json();
    return data.map(mapApiIconToSvglIcon);
  } catch (error) {
    console.error(`Error fetching icons (term: ${searchTerm}, category: ${category}):`, error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
    const url = `${API_URL}/categories`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data: Category[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const fetchSvgContent = async (route: string): Promise<string> => {
  try {
    const filename = route.split('/').pop();
    if (!filename) {
        throw new Error(`Could not determine filename from route: ${route}`);
    }
    
    const apiUrl = `${API_URL}/svg/${filename}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch SVG content from ${apiUrl}`);
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Error fetching SVG content:", error);
    throw error;
  }
};