import { PRODUCT_CATEGORIES } from "@/lib/types";
import { createProduct } from "../actions";

export const metadata = { title: "Add Product | Admin" };

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
        <div>
          <label htmlFor="imageUrl" className="text-sm font-medium text-navy">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://..."
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="rating" className="text-sm font-medium text-navy">
              Rating (0-5)
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              defaultValue="4.8"
              className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="reviewCount" className="text-sm font-medium text-navy">
              Review Count
            </label>
            <input
              id="reviewCount"
              name="reviewCount"
              type="number"
              min="0"
              defaultValue="0"
              className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
            />
          </div>
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
