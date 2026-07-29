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

// Real, thematically-matched photos (LoremFlickr, tag-searched and each one
// manually reviewed for relevance and to avoid identifiable people/branding —
// see PROMPTS.md). `lock` pins a specific photo per tag set so it's stable.
export const CATEGORY_IMAGES: Record<ProductCategory, string> = {
  surface_sports: "https://loremflickr.com/900/700/artificial-turf,football-field?lock=501",
  water_sports: "https://loremflickr.com/900/700/swimming-pool,lanes?lock=505",
  small_sports: "https://loremflickr.com/900/700/badminton-court,indoor?lock=503",
  budget_sports: "https://loremflickr.com/900/700/artificial-turf,football-field?lock=501",
  sports_academies:
    "https://images.unsplash.com/photo-1771909713569-356610d7e192?w=900&h=700&fit=crop&q=80",
  play_zones: "https://loremflickr.com/900/700/playground,park?lock=709",
  adventure_sports: "https://loremflickr.com/900/700/bouldering,wall?lock=1003",
  challenge_courses: "https://loremflickr.com/900/700/ninja,warrior,course?lock=1011",
  talent_scout: "https://loremflickr.com/900/700/control,room,screens?lock=514",
};
