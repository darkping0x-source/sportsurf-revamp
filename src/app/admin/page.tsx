import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin Overview | SportSurf India" };

async function count(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  match?: Record<string, string>,
) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (match) {
    for (const [key, value] of Object.entries(match)) {
      query = query.eq(key, value);
    }
  }
  const { count: total } = await query;
  return total ?? 0;
}

function sevenDaysAgoIso() {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    productsCount,
    projectsCount,
    pendingQuotes,
    approvedQuotes,
    rejectedQuotes,
    searchQueries,
    chatQueries,
  ] = await Promise.all([
    count(supabase, "products"),
    count(supabase, "projects"),
    count(supabase, "quote_requests", { status: "pending" }),
    count(supabase, "quote_requests", { status: "approved" }),
    count(supabase, "quote_requests", { status: "rejected" }),
    count(supabase, "chat_queries", { source: "search" }),
    count(supabase, "chat_queries", { source: "chatbot" }),
  ]);

  const sevenDaysAgo = sevenDaysAgoIso();
  const { data: recentSearches } = await supabase
    .from("chat_queries")
    .select("query")
    .eq("source", "search")
    .gte("created_at", sevenDaysAgo);

  const termCounts = new Map<string, number>();
  for (const row of recentSearches ?? []) {
    const key = row.query.trim().toLowerCase();
    termCounts.set(key, (termCounts.get(key) ?? 0) + 1);
  }
  const topTerms = [...termCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  const stats = [
    { label: "Products", value: productsCount },
    { label: "Projects", value: projectsCount },
    { label: "Pending Quotes", value: pendingQuotes },
    { label: "Approved Quotes", value: approvedQuotes },
    { label: "Rejected Quotes", value: rejectedQuotes },
    { label: "Search Queries", value: searchQueries },
    { label: "Chatbot Messages", value: chatQueries },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Admin Overview</h1>
      <p className="mt-1 text-navy/60">Content, quotes, and query activity at a glance.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-navy/10 bg-white p-4">
            <p className="text-2xl font-bold text-navy">{s.value}</p>
            <p className="mt-1 text-xs font-medium text-navy/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-navy">Top Search Terms (Last 7 Days)</h2>
        {topTerms.length > 0 ? (
          <ol className="mt-3 space-y-2">
            {topTerms.map(([term, n]) => (
              <li
                key={term}
                className="flex items-center justify-between rounded-md border border-navy/10 bg-white px-4 py-2 text-sm"
              >
                <span className="text-navy">{term}</span>
                <span className="font-medium text-navy/50">{n}×</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-sm text-navy/50">No searches in the last 7 days.</p>
        )}
      </div>
    </div>
  );
}
