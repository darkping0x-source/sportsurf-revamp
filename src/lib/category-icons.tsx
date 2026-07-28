import {
  CircleDot,
  Waves,
  Layers,
  Home,
  GraduationCap,
  PersonStanding,
  Mountain,
  Blocks,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { ProductCategory } from "@/lib/types";

export const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  surface_sports: CircleDot,
  water_sports: Waves,
  small_sports: Layers,
  budget_sports: Home,
  sports_academies: GraduationCap,
  play_zones: PersonStanding,
  adventure_sports: Mountain,
  challenge_courses: Blocks,
  talent_scout: Star,
};

export const CATEGORY_IMAGES: Record<ProductCategory, string> = {
  surface_sports: "https://picsum.photos/seed/sportsurf-cat-surface/900/700",
  water_sports: "https://picsum.photos/seed/sportsurf-cat-water/900/700",
  small_sports: "https://picsum.photos/seed/sportsurf-cat-small/900/700",
  budget_sports: "https://picsum.photos/seed/sportsurf-cat-budget/900/700",
  sports_academies: "https://picsum.photos/seed/sportsurf-cat-academies/900/700",
  play_zones: "https://picsum.photos/seed/sportsurf-cat-play/900/700",
  adventure_sports: "https://picsum.photos/seed/sportsurf-cat-adventure/900/700",
  challenge_courses: "https://picsum.photos/seed/sportsurf-cat-challenge/900/700",
  talent_scout: "https://picsum.photos/seed/sportsurf-cat-talent/900/700",
};
