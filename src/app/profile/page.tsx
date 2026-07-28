import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata = {
  title: "Your Profile — SportSurf India",
};

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/profile");
  }

  const [{ data: profile }, { data: quoteRequests }] = await Promise.all([
    supabase.from("profiles").select("full_name, created_at").eq("id", user.id).single(),
    supabase
      .from("quote_requests")
      .select("id, location, estimated_area, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">{profile?.full_name || "Your Profile"}</h1>
          <p className="mt-1 text-navy/60">{user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy transition hover:border-blue hover:text-blue"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-navy">Your Quote Requests</h2>
        {quoteRequests && quoteRequests.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {quoteRequests.map((q) => (
              <li key={q.id} className="rounded-lg border border-navy/10 bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-navy">
                    {q.location}
                    {q.estimated_area ? ` · ${q.estimated_area}` : ""}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[q.status]}`}
                  >
                    {q.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-navy/50">
                  {new Date(q.created_at).toLocaleDateString("en-IN")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-navy/50">You haven&apos;t submitted any quote requests yet.</p>
        )}
      </section>
    </main>
  );
}
