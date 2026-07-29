"use server";

import { createClient } from "@/lib/supabase/server";
import { isValidEmail } from "@/lib/validation";

export interface QuoteFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const estimatedArea = (formData.get("estimatedArea") as string)?.trim();
  const urgency = (formData.get("urgency") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !phone || !location) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("quote_requests").insert({
    user_id: user?.id ?? null,
    name,
    email,
    phone,
    location,
    estimated_area: estimatedArea || null,
    urgency: urgency || null,
    message: message || null,
  });

  if (error) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return {
    status: "success",
    message: "Thanks, we've received your details and will get back to you shortly.",
  };
}
