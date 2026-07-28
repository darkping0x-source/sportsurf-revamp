import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { setUserRole } from "./actions";

export const metadata = { title: "Users — Admin" };

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .order("created_at", { ascending: false });

  const admin = createAdminClient();
  const { data: authData } = await admin.auth.admin.listUsers();
  const emailById = new Map(authData?.users.map((u) => [u.id, u.email]) ?? []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Users</h1>

      <div className="mt-6 space-y-3">
        {(profiles ?? []).map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-navy/10 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-navy">{p.full_name || "—"}</p>
              <p className="text-sm text-navy/60">{emailById.get(p.id) ?? "—"}</p>
              <p className="mt-1 text-xs text-navy/40">
                Joined {new Date(p.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  p.role === "admin" ? "bg-blue/10 text-blue" : "bg-navy/10 text-navy/60"
                }`}
              >
                {p.role}
              </span>
              <form action={setUserRole.bind(null, p.id, p.role === "admin" ? "visitor" : "admin")}>
                <button type="submit" className="text-sm font-medium text-blue hover:text-blue-dark">
                  {p.role === "admin" ? "Revoke Admin" : "Make Admin"}
                </button>
              </form>
            </div>
          </div>
        ))}
        {(profiles ?? []).length === 0 && <p className="text-navy/50">No users yet.</p>}
      </div>
    </div>
  );
}
