"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/lib/types";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function validate(name: string, category: string, description: string) {
  return Boolean(name) && Boolean(description) && PRODUCT_CATEGORIES.some((c) => c.value === category);
}

export async function createProduct(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const rating = formData.get("rating") as string;
  const reviewCount = formData.get("reviewCount") as string;

  if (!validate(name, category, description)) {
    redirect(`/admin/products/new?error=${encodeURIComponent("Please fill in all fields correctly.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("products").insert({
    name,
    category,
    description,
    slug: slugify(name),
    image_url: imageUrl || null,
    rating: rating ? Number(rating) : null,
    review_count: reviewCount ? Number(reviewCount) : null,
  });

  if (error) {
    redirect(`/admin/products/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const rating = formData.get("rating") as string;
  const reviewCount = formData.get("reviewCount") as string;

  if (!validate(name, category, description)) {
    redirect(`/admin/products/${id}?error=${encodeURIComponent("Please fill in all fields correctly.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      name,
      category,
      description,
      slug: slugify(name),
      image_url: imageUrl || null,
      rating: rating ? Number(rating) : null,
      review_count: reviewCount ? Number(reviewCount) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/products/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}
