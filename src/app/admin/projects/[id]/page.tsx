import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { updateProject } from "../actions";

export const metadata = { title: "Edit Project — Admin" };

const inputClass =
  "mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();

  if (!project) {
    notFound();
  }

  const updateWithId = updateProject.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-navy">Edit Project</h1>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <form action={updateWithId} className="mt-6 space-y-4">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-navy">Title</label>
          <input id="title" name="title" required defaultValue={project.title} className={inputClass} />
        </div>
        <div>
          <label htmlFor="clientName" className="text-sm font-medium text-navy">Client Name</label>
          <input id="clientName" name="clientName" defaultValue={project.client_name ?? ""} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="text-sm font-medium text-navy">Location</label>
            <input id="location" name="location" required defaultValue={project.location} className={inputClass} />
          </div>
          <div>
            <label htmlFor="state" className="text-sm font-medium text-navy">State</label>
            <input id="state" name="state" required defaultValue={project.state} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium text-navy">Category</label>
          <select id="category" name="category" required defaultValue={project.category} className={inputClass}>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="completedOn" className="text-sm font-medium text-navy">Completed On</label>
            <input
              id="completedOn"
              name="completedOn"
              type="date"
              defaultValue={project.completed_on ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="infrastructureType" className="text-sm font-medium text-navy">Infrastructure Type</label>
            <input
              id="infrastructureType"
              name="infrastructureType"
              defaultValue={project.infrastructure_type ?? ""}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="text-sm font-medium text-navy">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={project.image_url ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="areaSqm" className="text-sm font-medium text-navy">Area (sqm)</label>
          <input
            id="areaSqm"
            name="areaSqm"
            type="number"
            min="0"
            defaultValue={project.area_sqm ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium text-navy">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={project.description}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue px-5 py-2.5 font-medium text-white transition hover:bg-blue-dark"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
