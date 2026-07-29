import { createClient } from "@/lib/supabase/server";
import { setQuoteStatus } from "./actions";

export const metadata = { title: "Quote Requests | Admin" };

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && ["pending", "approved", "rejected"].includes(status) ? status : undefined;

  const supabase = await createClient();
  let query = supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
  if (filter) query = query.eq("status", filter);
  const { data: quotes } = await query;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Quote Requests</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <a
            key={s}
            href={s === "all" ? "/admin/quotes" : `/admin/quotes?status=${s}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
              (s === "all" && !filter) || filter === s
                ? "border-blue bg-blue text-white"
                : "border-navy/15 text-navy/70 hover:border-blue hover:text-blue"
            }`}
          >
            {s}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {(quotes ?? []).map((q) => (
          <div key={q.id} className="rounded-lg border border-navy/10 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-navy">{q.name}</p>
                <p className="text-sm text-navy/60">
                  {q.email} · {q.phone}
                </p>
                <p className="mt-1 text-sm text-navy/70">
                  {q.location}
                  {q.estimated_area ? ` · ${q.estimated_area}` : ""}
                  {q.urgency ? ` · ${q.urgency}` : ""}
                </p>
                {q.message && <p className="mt-2 text-sm text-navy/50 italic">&ldquo;{q.message}&rdquo;</p>}
                <p className="mt-2 text-xs text-navy/40">
                  {new Date(q.created_at).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[q.status]}`}
                >
                  {q.status}
                </span>
                {q.status !== "approved" && (
                  <form action={setQuoteStatus.bind(null, q.id, "approved")}>
                    <button type="submit" className="text-xs font-medium text-green-700 hover:underline">
                      Approve
                    </button>
                  </form>
                )}
                {q.status !== "rejected" && (
                  <form action={setQuoteStatus.bind(null, q.id, "rejected")}>
                    <button type="submit" className="text-xs font-medium text-red-600 hover:underline">
                      Reject
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
        {(quotes ?? []).length === 0 && <p className="text-navy/50">No quote requests found.</p>}
      </div>
    </div>
  );
}
