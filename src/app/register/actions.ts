"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidEmail, isStrongPassword } from "@/lib/validation";

export async function register(formData: FormData) {
  const fullName = (formData.get("fullName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!fullName || fullName.length < 2) {
    redirect(`/register?error=${encodeURIComponent("Please enter your full name.")}`);
  }
  if (!isValidEmail(email)) {
    redirect(`/register?error=${encodeURIComponent("Please enter a valid email address.")}`);
  }
  if (!isStrongPassword(password)) {
    redirect(`/register?error=${encodeURIComponent("Password must be at least 8 characters.")}`);
  }
  if (password !== confirmPassword) {
    redirect(`/register?error=${encodeURIComponent("Passwords do not match.")}`);
  }

  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/register/check-email");
}
