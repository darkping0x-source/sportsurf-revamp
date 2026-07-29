import Link from "next/link";
import { searchCatalog } from "@/lib/search";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/lib/types";

export const metadata = {
  title: "Search | SportSurf India",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const results = query ? await searchCatalog(query) : [];

  if (query) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("chat_queries").insert({
      user_id: user?.id ?? null,
      source: "search",
      query,
      result_count: results.length,
    });
  }

  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-navy">
        {query ? (
          <>
            Search results for &ldquo;{query}&rdquo;
          </>
        ) : (
          "Search"
        )}
      </h1>

      {!query && (
        <p className="mt-2 text-navy/60">
          Try something like &ldquo;outdoor badminton court flooring in Kerala&rdquo; or
          &ldquo;FIFA turf&rdquo;.
        </p>
      )}

      <div className="mt-8 space-y-4">
        {results.map((r) => (
          <Link
            key={`${r.type}-${r.slug}`}
            href={r.type === "product" ? `/products?category=${r.category}` : `/projects/${r.slug}`}
            className="block rounded-lg border border-navy/10 bg-white p-5 transition hover:border-blue hover:shadow-sm"
          >
            <p className="text-xs font-medium tracking-wide text-gold uppercase">
              {r.type} ·{" "}
              {PRODUCT_CATEGORIES.find((c) => c.value === r.category)?.label ?? r.category}
            </p>
            <p className="mt-1 font-semibold text-navy">{r.title}</p>
            <p className="mt-2 text-sm text-navy/60">{r.description}</p>
            {r.reason && <p className="mt-2 text-xs text-blue">{r.reason}</p>}
          </Link>
        ))}

        {query && results.length === 0 && (
          <p className="text-navy/50">No matches found. Try a different search.</p>
        )}
      </div>
    </main>
  );
}
