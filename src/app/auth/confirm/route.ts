import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/profile";

  const supabase = await createClient();
  let failureReason = "No verification code or token found in the link.";

  // The @supabase/ssr client defaults to the PKCE flow, so the *default*
  // "Confirm signup" email template (which we can't edit without custom SMTP)
  // sends a `?code=` param after Supabase's own hosted verify redirect,
  // rather than the `token_hash`/`type` pair a custom template would send.
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      redirect(next);
    }
    failureReason = error.message;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      redirect(next);
    }
    failureReason = error.message;
  }

  redirect(`/login?error=${encodeURIComponent(failureReason)}`);
}
