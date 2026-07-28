"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setQuoteStatus(id: string, status: "approved" | "rejected" | "pending") {
  const supabase = await createClient();
  await supabase.from("quote_requests").update({ status }).eq("id", id);
  revalidatePath("/admin/quotes");
  revalidatePath("/profile");
}
