import { describe, it, expect } from "vitest";
import { localFallbackSearch } from "./search";
import type { Product, Project } from "./types";

const products: Product[] = [
  {
    id: "p1",
    category: "surface_sports",
    name: "FIFA-Certified Football Turf",
    slug: "fifa-certified-football-turf",
    description: "Synthetic football turf built to FIFA Quality Pro specification.",
    specs: {},
    images: [],
  },
  {
    id: "p2",
    category: "small_sports",
    name: "Badminton Court Flooring",
    slug: "badminton-court-flooring",
    description: "PU and PVC sports flooring for indoor badminton courts.",
    specs: {},
    images: [],
  },
];

const projects: Project[] = [
  {
    id: "pr1",
    title: "Indoor Badminton Complex",
    slug: "indoor-badminton-complex-kerala",
    location: "Kochi",
    state: "Kerala",
    category: "small_sports",
    description: "An eight-court indoor badminton complex with PU flooring.",
    images: [],
  },
  {
    id: "pr2",
    title: "Competition Swimming Pool",
    slug: "competition-swimming-pool-mumbai",
    location: "Mumbai",
    state: "Maharashtra",
    category: "water_sports",
    description: "A ten-lane competition swimming pool.",
    images: [],
  },
];

describe("localFallbackSearch", () => {
  it("ranks items with more matching terms above items with fewer", () => {
    const results = localFallbackSearch("badminton kerala", products, projects);
    const slugs = results.map((r) => r.slug);

    expect(slugs[0]).toBe("indoor-badminton-complex-kerala");
    expect(slugs).toContain("badminton-court-flooring");
  });

  it("excludes items that match none of the query terms", () => {
    const results = localFallbackSearch("badminton kerala", products, projects);
    const slugs = results.map((r) => r.slug);

    expect(slugs).not.toContain("competition-swimming-pool-mumbai");
    expect(slugs).not.toContain("fifa-certified-football-turf");
  });

  it("returns an empty array when nothing matches", () => {
    const results = localFallbackSearch("asdkjaslkdjalksjd", products, projects);
    expect(results).toEqual([]);
  });

  it("matches on category as well as name/description", () => {
    const results = localFallbackSearch("surface_sports", products, projects);
    expect(results.map((r) => r.slug)).toContain("fifa-certified-football-turf");
  });

  it("caps results at 8 even if more items match", () => {
    const manyProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
      id: `p${i}`,
      category: "surface_sports",
      name: `Turf Product ${i}`,
      slug: `turf-product-${i}`,
      description: "turf",
      specs: {},
      images: [],
    }));

    const results = localFallbackSearch("turf", manyProducts, []);
    expect(results.length).toBe(8);
  });

  it("is case-insensitive", () => {
    const results = localFallbackSearch("BADMINTON", products, projects);
    expect(results.length).toBeGreaterThan(0);
  });
});
