export type ProductCategory =
  | "surface_sports"
  | "water_sports"
  | "small_sports"
  | "budget_sports"
  | "sports_academies"
  | "play_zones"
  | "adventure_sports"
  | "challenge_courses"
  | "talent_scout";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "surface_sports", label: "Surface Sports" },
  { value: "water_sports", label: "Water Sports" },
  { value: "small_sports", label: "Small Sports" },
  { value: "budget_sports", label: "Budget Sports" },
  { value: "sports_academies", label: "Sports Academies" },
  { value: "play_zones", label: "Play Zones" },
  { value: "adventure_sports", label: "Adventure Sports Games" },
  { value: "challenge_courses", label: "Challenge Courses" },
  { value: "talent_scout", label: "Talent Scout Clubs" },
];

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  slug: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
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
  imageUrl?: string;
  areaSqm?: number;
  infrastructureType?: string;
  completedOn?: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
}

export interface TimelineEntry {
  year: string;
  label: string;
  title: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
  role?: string;
  rating?: number;
}
