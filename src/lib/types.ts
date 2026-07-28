export type ProductCategory =
  | "surface_sports"
  | "water_sports"
  | "small_sports"
  | "budget_sports"
  | "sports_academies"
  | "play_zones";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "surface_sports", label: "Surface Sports" },
  { value: "water_sports", label: "Water Sports" },
  { value: "small_sports", label: "Small Sports" },
  { value: "budget_sports", label: "Budget Sports" },
  { value: "sports_academies", label: "Sports Academies" },
  { value: "play_zones", label: "Play Zones" },
];

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  slug: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  location: string;
  state: string;
  category: ProductCategory;
  description: string;
  images: string[];
  completedOn?: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
}
