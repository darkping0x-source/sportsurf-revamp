import Link from "next/link";
import { ClipboardList, Clock3, CheckCircle2, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatRelativeTime } from "@/lib/format";

export const metadata = {
  title: "Dashboard | SportSurf India",
};

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("id, location, estimated_area, status, created_at, updated_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const all = quotes ?? [];
  const pending = all.filter((q) => q.status === "pending").length;
  const approved = all.filter((q) => q.status === "approved").length;
  const recent = all.slice(0, 4);

  const STATS = [
    { label: "Total Quotes", value: all.length, icon: ClipboardList },
    { label: "Pending Review", value: pending, icon: Clock3 },
    { label: "Approved", value: approved, icon: CheckCircle2 },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-lg border border-navy/10 bg-white p-5 text-center"
            >
              <Icon className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-3 text-xs font-semibold tracking-[0.15em] text-navy/50 uppercase">
                {stat.label}
              </p>
              <p className="font-display mt-1 text-3xl font-bold text-navy">
                {String(stat.value).padStart(2, "0")}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-navy/10 bg-white">
        <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
          <p className="text-xs font-semibold tracking-[0.15em] text-navy/50 uppercase">
            Recent Activity
          </p>
          <Link
            href="/profile/quotes"
            className="text-xs font-semibold tracking-wide text-blue uppercase hover:text-blue-dark"
          >
            View All
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-navy/50">You haven&apos;t submitted any quote requests yet.</p>
            <Link
              href="/quote"
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:bg-amber"
            >
              Get a Quote
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-navy/10">
            {recent.map((q) => (
              <li key={q.id}>
                <Link
                  href="/profile/quotes"
                  className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-cream"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-navy">
                      Quote for {q.location}
                      {q.estimated_area ? ` · ${q.estimated_area}` : ""}
                    </p>
                    <p className="mt-0.5 text-xs text-navy/50">
                      {formatRelativeTime(q.updated_at ?? q.created_at)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[q.status]}`}
                    >
                      {q.status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-navy/30" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
