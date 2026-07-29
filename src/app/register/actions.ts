"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
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

  // A plain, non-SSR client here on purpose: @supabase/ssr's createServerClient
  // hardcodes flowType to "pkce", which requires the code verifier it stashes
  // in a cookie to still be present when the confirmation link is clicked.
  // That breaks the moment the link is opened in a different browser, app, or
  // device than the one used to sign up, which is completely normal for an
  // email link. The implicit flow embeds the session directly in the link
  // instead, so it works no matter where it's opened. No session needs to be
  // persisted from this call, so a throwaway client is fine.
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { flowType: "implicit", persistSession: false, autoRefreshToken: false } },
  );

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
