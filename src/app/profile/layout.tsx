import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileSidebar from "@/components/ProfileSidebar";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/profile");
  }

  const [{ data: profile }, { count: notificationCount }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
    supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .neq("status", "pending"),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
      <div className="lg:w-56 lg:shrink-0">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-wide text-navy/50 uppercase">
            Welcome back
          </p>
          <p className="font-display text-xl font-bold text-navy">
            {profile?.full_name || user.email}
          </p>
        </div>
        <ProfileSidebar notificationCount={notificationCount ?? 0} />
      </div>

      <div className="min-w-0 flex-1">{children}</div>
    </main>
  );
}
