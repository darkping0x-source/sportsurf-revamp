"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/lib/types";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ProjectInput {
  title: string;
  clientName: string;
  location: string;
  state: string;
  category: string;
  description: string;
  completedOn: string;
  imageUrl: string;
  areaSqm: string;
  infrastructureType: string;
}

function readForm(formData: FormData): ProjectInput {
  return {
    title: ((formData.get("title") as string) ?? "").trim(),
    clientName: ((formData.get("clientName") as string) ?? "").trim(),
    location: ((formData.get("location") as string) ?? "").trim(),
    state: ((formData.get("state") as string) ?? "").trim(),
    category: (formData.get("category") as string) ?? "",
    description: ((formData.get("description") as string) ?? "").trim(),
    completedOn: ((formData.get("completedOn") as string) ?? "").trim(),
    imageUrl: ((formData.get("imageUrl") as string) ?? "").trim(),
    areaSqm: ((formData.get("areaSqm") as string) ?? "").trim(),
    infrastructureType: ((formData.get("infrastructureType") as string) ?? "").trim(),
  };
}

function validate(input: ProjectInput) {
  return (
    Boolean(input.title) &&
    Boolean(input.location) &&
    Boolean(input.state) &&
    Boolean(input.description) &&
    PRODUCT_CATEGORIES.some((c) => c.value === input.category)
  );
}

export async function createProject(formData: FormData) {
  const input = readForm(formData);

  if (!validate(input)) {
    redirect(`/admin/projects/new?error=${encodeURIComponent("Please fill in all required fields correctly.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert({
    title: input.title,
    slug: slugify(input.title),
    client_name: input.clientName || null,
    location: input.location,
    state: input.state,
    category: input.category,
    description: input.description,
    completed_on: input.completedOn || null,
    image_url: input.imageUrl || null,
    area_sqm: input.areaSqm ? Number(input.areaSqm) : null,
    infrastructure_type: input.infrastructureType || null,
  });

  if (error) {
    redirect(`/admin/projects/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const input = readForm(formData);

  if (!validate(input)) {
    redirect(`/admin/projects/${id}?error=${encodeURIComponent("Please fill in all required fields correctly.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      title: input.title,
      slug: slugify(input.title),
      client_name: input.clientName || null,
      location: input.location,
      state: input.state,
      category: input.category,
      description: input.description,
      completed_on: input.completedOn || null,
      image_url: input.imageUrl || null,
      area_sqm: input.areaSqm ? Number(input.areaSqm) : null,
      infrastructure_type: input.infrastructureType || null,
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/projects/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}
