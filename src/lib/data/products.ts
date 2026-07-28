import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "p-fifa-turf",
    category: "surface_sports",
    name: "FIFA-Certified Football Turf",
    slug: "fifa-certified-football-turf",
    description:
      "Synthetic football turf built to FIFA Quality Pro specification, engineered for consistent ball bounce and player traction across full-size and academy pitches.",
    specs: { pileHeight: "50-60mm", infill: "Sand + rubber", certification: "FIFA Quality Pro" },
    images: [],
  },
  {
    id: "p-athletics-track",
    category: "surface_sports",
    name: "IAAF-Certified Athletics Track",
    slug: "iaaf-certified-athletics-track",
    description:
      "Polyurethane running tracks meeting IAAF Class 1/2 standards, designed for schools, academies, and competition-grade stadiums.",
    specs: { surface: "Polyurethane", lanes: "6-8", certification: "IAAF Class 1/2" },
    images: [],
  },
  {
    id: "p-badminton-flooring",
    category: "small_sports",
    name: "Badminton Court Flooring",
    slug: "badminton-court-flooring",
    description:
      "PU and PVC sports flooring for indoor badminton courts, tuned for shock absorption and consistent shuttle response.",
    specs: { surface: "PU / PVC", use: "Indoor", courts: "Single or multi-court" },
    images: [],
  },
  {
    id: "p-tennis-court",
    category: "small_sports",
    name: "Synthetic Tennis Courts",
    slug: "synthetic-tennis-courts",
    description:
      "Acrylic and synthetic clay tennis court surfacing built to individual site preferences, indoor or outdoor.",
    specs: { surface: "Acrylic / Synthetic clay", use: "Indoor or outdoor" },
    images: [],
  },
  {
    id: "p-swimming-pool",
    category: "water_sports",
    name: "Competition Swimming Pools",
    slug: "competition-swimming-pools",
    description:
      "Design, build, and outfitting of competition and training swimming pools, including filtration and lane-marking systems.",
    specs: { lanes: "6-10", depth: "1.2m-2m", use: "Training or competition" },
    images: [],
  },
  {
    id: "p-splash-pad",
    category: "water_sports",
    name: "Splash Pads & Water Play Zones",
    slug: "splash-pads-water-play-zones",
    description: "Recreational splash pad installations for community and academy water-play areas.",
    specs: { use: "Recreational", ageGroup: "All ages" },
    images: [],
  },
  {
    id: "p-budget-turf",
    category: "budget_sports",
    name: "Budget Multi-Sport Turf",
    slug: "budget-multi-sport-turf",
    description:
      "Cost-optimized synthetic turf for schools and community grounds needing durable surfacing without full competition-grade specs.",
    specs: { pileHeight: "35-40mm", use: "Multi-sport, community" },
    images: [],
  },
  {
    id: "p-academy-package",
    category: "sports_academies",
    name: "Sports Academy Infrastructure Package",
    slug: "sports-academy-infrastructure-package",
    description:
      "End-to-end infrastructure for sports academies: pitch/court construction, floodlighting, seating, and equipment outfitting.",
    specs: { includes: "Pitch, lighting, seating, equipment" },
    images: [],
  },
  {
    id: "p-play-zone",
    category: "play_zones",
    name: "Kids' Play Zone Surfacing",
    slug: "kids-play-zone-surfacing",
    description:
      "Impact-absorbing rubber and EPDM flooring for children's play zones, built for safety compliance and weather durability.",
    specs: { surface: "EPDM / Rubber", use: "Play zones, parks" },
    images: [],
  },
];
