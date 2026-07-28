import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Search & Chat Queries — Admin" };

export default async function AdminQueriesPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; q?: string }>;
}) {
  const { source, q } = await searchParams;
  const filterSource = source === "search" || source === "chatbot" ? source : undefined;
  const searchText = (q ?? "").trim();

  const supabase = await createClient();
  let query = supabase
    .from("chat_queries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (filterSource) query = query.eq("source", filterSource);
  if (searchText) query = query.ilike("query", `%${searchText}%`);
  const { data: queries } = await query;

  const tabHref = (s?: string) => {
    const params = new URLSearchParams();
    if (s) params.set("source", s);
    if (searchText) params.set("q", searchText);
    const qs = params.toString();
    return qs ? `/admin/queries?${qs}` : "/admin/queries";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Search &amp; Chat Queries</h1>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {[
            { label: "All", value: undefined },
            { label: "Search", value: "search" },
            { label: "Chatbot", value: "chatbot" },
          ].map((tab) => (
            <a
              key={tab.label}
              href={tabHref(tab.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                filterSource === tab.value
                  ? "border-blue bg-blue text-white"
                  : "border-navy/15 text-navy/70 hover:border-blue hover:text-blue"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        <form method="get" className="flex items-center gap-2">
          {filterSource && <input type="hidden" name="source" value={filterSource} />}
          <input
            type="search"
            name="q"
            defaultValue={searchText}
            placeholder="Filter by text..."
            className="rounded-md border border-navy/15 px-3 py-2 text-sm text-navy focus:border-blue focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-dark"
          >
            Filter
          </button>
        </form>
      </div>

      <div className="mt-6 space-y-3">
        {(queries ?? []).map((row) => (
          <div key={row.id} className="rounded-lg border border-navy/10 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium uppercase ${
                  row.source === "search" ? "bg-blue/10 text-blue" : "bg-gold/10 text-gold"
                }`}
              >
                {row.source}
              </span>
              <span className="text-xs text-navy/40">
                {new Date(row.created_at).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-2 font-medium text-navy">{row.query}</p>
            {row.response && (
              <p className="mt-1 line-clamp-2 text-sm text-navy/60">{row.response}</p>
            )}
            {row.result_count !== null && (
              <p className="mt-1 text-xs text-navy/40">{row.result_count} result(s)</p>
            )}
          </div>
        ))}
        {(queries ?? []).length === 0 && <p className="text-navy/50">No queries found.</p>}
      </div>
    </div>
  );
}
