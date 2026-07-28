import { PRODUCT_CATEGORIES } from "@/lib/types";
import { createProduct } from "../actions";

export const metadata = { title: "Add Product — Admin" };

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-navy">Add Product</h1>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <form action={createProduct} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium text-navy">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium text-navy">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue px-5 py-2.5 font-medium text-white transition hover:bg-blue-dark"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
