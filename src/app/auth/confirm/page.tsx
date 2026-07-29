"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

// Implicit-flow confirmation links carry the session as a URL fragment
// (#access_token=...&refresh_token=...), never as a query param, since
// fragments are never sent to any server. That means this has to run in the
// browser: read the fragment, hand it to the browser Supabase client, which
// writes matching cookies so the rest of the (server-rendered) app sees the
// session too, then move on to wherever the link was meant to land.
export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmEmailContent />
    </Suspense>
  );
}

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const next = searchParams.get("next") ?? "/profile";

    async function run() {
      const hash = window.location.hash.replace(/^#/, "");
      const hashParams = new URLSearchParams(hash);
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (!accessToken || !refreshToken) {
        setError("This link is invalid or has expired. Please try registering again.");
        return;
      }

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.replace(next);
    }

    run();
  }, [router, searchParams]);

  return (
    <main className="mx-auto flex-1 max-w-md px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-navy">
        {error ? "Verification Failed" : "Confirming Your Email"}
      </h1>
      <p className="mt-3 text-navy/60">
        {error ?? "Hang tight, this only takes a second."}
      </p>
      {error && (
        <a
          href="/login"
          className="mt-6 inline-block text-sm font-semibold text-blue hover:text-blue-dark"
        >
          Back to login
        </a>
      )}
    </main>
  );
}
