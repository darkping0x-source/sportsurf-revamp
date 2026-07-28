import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "../../actions";

export const metadata = { title: "Delete Project — Admin" };

export default async function DeleteProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("id, title").eq("id", id).maybeSingle();

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-navy">Delete Project</h1>
      <p className="mt-3 text-navy/70">
        Are you sure you want to delete <span className="font-semibold">{project.title}</span>?
        This cannot be undone.
      </p>

      <div className="mt-6 flex gap-3">
        <form action={deleteProject}>
          <input type="hidden" name="id" value={project.id} />
          <button
            type="submit"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </form>
        <Link
          href="/admin/projects"
          className="rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy hover:border-blue hover:text-blue"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
