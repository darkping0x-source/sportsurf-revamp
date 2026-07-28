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
