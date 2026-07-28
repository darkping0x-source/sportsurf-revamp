import { products } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";
import { certifications, timeline, testimonials, companyStats } from "@/lib/data/company";
import type { ProductCategory } from "@/lib/types";

// Seed-data-backed for now. Each function is the seam to swap in a Supabase query
// (see supabase/migrations/0001_init.sql for the matching schema) once a project
// is provisioned — callers don't need to change.

export async function getProducts() {
  return products;
}

export async function getProductsByCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}

export async function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProjects() {
  return projects;
}

export async function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getCertifications() {
  return certifications;
}

export async function getCompanyTimeline() {
  return timeline;
}

export async function getTestimonials() {
  return testimonials;
}

export async function getCompanyStats() {
  return companyStats;
}
