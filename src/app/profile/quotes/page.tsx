import Link from "next/link";
import { Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatRelativeTime } from "@/lib/format";

export const metadata = {
  title: "My Quotes | SportSurf India",
};

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

export default async function MyQuotesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("id, location, estimated_area, urgency, message, status, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const all = quotes ?? [];

  return (
    <div className="rounded-lg border border-navy/10 bg-white">
      <div className="border-b border-navy/10 px-6 py-4">
        <p className="font-display text-lg font-bold text-navy">My Quotes</p>
      </div>

      {all.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <Package className="h-8 w-8 text-navy/20" />
          <p className="mt-4 font-semibold text-navy">No quotes yet</p>
          <p className="mt-1 max-w-xs text-sm text-navy/50">
            Submit a request and we&apos;ll get back to you with a detailed proposal.
          </p>
          <Link
            href="/quote"
            className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:bg-amber"
          >
            Get a Quote
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-navy/10">
          {all.map((q) => (
            <li key={q.id} className="px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy">
                    {q.location}
                    {q.estimated_area ? ` · ${q.estimated_area}` : ""}
                  </p>
                  {q.urgency && <p className="mt-0.5 text-sm text-navy/60">{q.urgency}</p>}
                  {q.message && (
                    <p className="mt-2 text-sm text-navy/50 italic">&ldquo;{q.message}&rdquo;</p>
                  )}
                  <p className="mt-2 text-xs text-navy/40">
                    Submitted {formatRelativeTime(q.created_at)}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[q.status]}`}
                >
                  {q.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
