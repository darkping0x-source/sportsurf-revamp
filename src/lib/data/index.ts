import { createClient } from "@/lib/supabase/server";
import { timeline, testimonials, companyStats } from "@/lib/data/company";
import type { Product, Project, Certification, ProductCategory } from "@/lib/types";

// Static site copy that has no matching table (About-page storytelling).
export async function getCompanyTimeline() {
  return timeline;
}

export async function getTestimonials() {
  return testimonials;
}

export async function getCompanyStats() {
  return companyStats;
}

// Everything below reads from the live Supabase project seeded via
// supabase/migrations/0002_seed.sql — this is what the admin dashboard
// (Phase 6) manages.

function toProduct(row: {
  id: string;
  category: ProductCategory;
  name: string;
  slug: string;
  description: string;
  specs: Record<string, string> | null;
  images: string[] | null;
}): Product {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    slug: row.slug,
    description: row.description,
    specs: row.specs ?? {},
    images: row.images ?? [],
  };
}

function toProject(row: {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  location: string;
  state: string;
  category: ProductCategory;
  description: string;
  images: string[] | null;
  completed_on: string | null;
}): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    clientName: row.client_name ?? undefined,
    location: row.location,
    state: row.state,
    category: row.category,
    description: row.description,
    images: row.images ?? [],
    completedOn: row.completed_on ?? undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").order("name");
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("name");
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? toProduct(data) : null;
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("completed_on", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? toProject(data) : null;
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("id, name, description")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((c) => ({ ...c, description: c.description ?? "" }));
}
