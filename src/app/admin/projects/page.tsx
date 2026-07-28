import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/lib/types";

export const metadata = { title: "Projects — Admin" };

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("completed_on", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-dark"
        >
          Add Project
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {(projects ?? []).map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-navy/10 bg-white p-4"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-gold uppercase">
                {PRODUCT_CATEGORIES.find((c) => c.value === p.category)?.label} · {p.state}
              </p>
              <p className="font-semibold text-navy">{p.title}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/projects/${p.id}`}
                className="text-sm font-medium text-blue hover:text-blue-dark"
              >
                Edit
              </Link>
              <Link
                href={`/admin/projects/${p.id}/delete`}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
        {(projects ?? []).length === 0 && <p className="text-navy/50">No projects yet.</p>}
      </div>
    </div>
  );
}
