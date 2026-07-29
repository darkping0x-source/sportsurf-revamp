import { PRODUCT_CATEGORIES } from "@/lib/types";
import { createProject } from "../actions";

export const metadata = { title: "Add Project | Admin" };

const inputClass =
  "mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-navy">Add Project</h1>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <form action={createProject} className="mt-6 space-y-4">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-navy">Title</label>
          <input id="title" name="title" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="clientName" className="text-sm font-medium text-navy">Client Name</label>
          <input id="clientName" name="clientName" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="text-sm font-medium text-navy">Location</label>
            <input id="location" name="location" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="state" className="text-sm font-medium text-navy">State</label>
            <input id="state" name="state" required className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium text-navy">Category</label>
          <select id="category" name="category" required className={inputClass}>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="completedOn" className="text-sm font-medium text-navy">Completed On</label>
            <input id="completedOn" name="completedOn" type="date" className={inputClass} />
          </div>
          <div>
            <label htmlFor="infrastructureType" className="text-sm font-medium text-navy">Infrastructure Type</label>
            <input id="infrastructureType" name="infrastructureType" placeholder="Synthetic Turf" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="text-sm font-medium text-navy">Image URL</label>
          <input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." className={inputClass} />
        </div>
        <div>
          <label htmlFor="areaSqm" className="text-sm font-medium text-navy">Area (sqm)</label>
          <input id="areaSqm" name="areaSqm" type="number" min="0" className={inputClass} />
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium text-navy">Description</label>
          <textarea id="description" name="description" required rows={4} className={inputClass} />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue px-5 py-2.5 font-medium text-white transition hover:bg-blue-dark"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
