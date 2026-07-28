import { generateJSON } from "@/lib/ai/gemini";
import { getProducts, getProjects } from "@/lib/data";
import type { Product, Project } from "@/lib/types";

export interface SearchResultItem {
  type: "product" | "project";
  slug: string;
  title: string;
  description: string;
  category: string;
  reason?: string;
}

interface RankedItem {
  type: "product" | "project";
  slug: string;
  reason: string;
}

function localFallbackSearch(
  query: string,
  products: Product[],
  projects: Project[],
): SearchResultItem[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const score = (haystack: string) => {
    const h = haystack.toLowerCase();
    return terms.reduce((acc, t) => acc + (h.includes(t) ? 1 : 0), 0);
  };

  const productResults = products.map((p) => ({
    type: "product" as const,
    slug: p.slug,
    title: p.name,
    description: p.description,
    category: p.category,
    score: score(`${p.name} ${p.description} ${p.category}`),
  }));

  const projectResults = projects.map((p) => ({
    type: "project" as const,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    score: score(`${p.title} ${p.description} ${p.location} ${p.state} ${p.category}`),
  }));

  return [...productResults, ...projectResults]
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => ({
      type: r.type,
      slug: r.slug,
      title: r.title,
      description: r.description,
      category: r.category,
    }));
}

export async function searchCatalog(query: string): Promise<SearchResultItem[]> {
  const [products, projects] = await Promise.all([getProducts(), getProjects()]);

  const catalog = {
    products: products.map((p) => ({
      slug: p.slug,
      name: p.name,
      description: p.description,
      category: p.category,
    })),
    projects: projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      location: p.location,
      state: p.state,
    })),
  };

  const prompt = `You are the search engine for SportSurf India, a sports-infrastructure company (turf, tracks, courts, pools, academies, play zones). A visitor searched for: "${query}"

Here is the full catalog as JSON:
${JSON.stringify(catalog)}

Return ONLY the items genuinely relevant to this search, most relevant first — exclude
anything with no meaningful connection to the query. Do not return the whole catalog just
to be safe; an empty array is the correct answer if nothing matches. Cap the list at 8
items. Respond with ONLY a JSON array like:
[{"type":"product","slug":"...","reason":"short reason this matches"},{"type":"project","slug":"...","reason":"..."}]`;

  const ranked = await generateJSON<RankedItem[]>(prompt);

  if (!ranked || !Array.isArray(ranked)) {
    return localFallbackSearch(query, products, projects);
  }

  // The model's relevance ORDER is reliable; its self-imposed COUNT isn't —
  // it sometimes returns the whole catalog "just in case". Cap here instead
  // of trusting the prompt's instruction alone.
  return ranked
    .slice(0, 8)
    .map((r): SearchResultItem | null => {
      const source =
        r.type === "product"
          ? products.find((p) => p.slug === r.slug)
          : projects.find((p) => p.slug === r.slug);
      if (!source) return null;

      const title = r.type === "product" ? (source as Product).name : (source as Project).title;
      return {
        type: r.type,
        slug: r.slug,
        title,
        description: source.description,
        category: source.category,
        reason: r.reason,
      };
    })
    .filter((r): r is SearchResultItem => r !== null);
}
