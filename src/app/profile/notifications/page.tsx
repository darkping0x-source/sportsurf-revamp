import { Bell, CheckCircle2, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatRelativeTime } from "@/lib/format";

export const metadata = {
  title: "Notifications | SportSurf India",
};

export default async function NotificationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("id, location, status, updated_at")
    .eq("user_id", user!.id)
    .neq("status", "pending")
    .order("updated_at", { ascending: false });

  const notifications = quotes ?? [];

  return (
    <div className="rounded-lg border border-navy/10 bg-white">
      <div className="border-b border-navy/10 px-6 py-4">
        <p className="font-display text-lg font-bold text-navy">Notifications</p>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <Bell className="h-8 w-8 text-navy/20" />
          <p className="mt-4 font-semibold text-navy">You&apos;re all caught up</p>
          <p className="mt-1 max-w-xs text-sm text-navy/50">
            We&apos;ll let you know here as soon as there&apos;s an update on one of your quotes.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-navy/10">
          {notifications.map((q) => {
            const approved = q.status === "approved";
            const Icon = approved ? CheckCircle2 : XCircle;
            return (
              <li key={q.id} className="flex items-start gap-3 px-6 py-4">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    approved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-navy">
                    Your quote for {q.location} was {q.status}
                  </p>
                  <p className="mt-0.5 text-xs text-navy/50">
                    {formatRelativeTime(q.updated_at)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
