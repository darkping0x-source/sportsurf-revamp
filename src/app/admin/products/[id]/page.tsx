import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { updateProduct } from "../actions";

export const metadata = { title: "Edit Product — Admin" };

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (!product) {
    notFound();
  }

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-navy">Edit Product</h1>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <form action={updateWithId} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={product.name}
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
            defaultValue={product.category}
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
            defaultValue={product.description}
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
            defaultValue={product.image_url ?? ""}
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
              defaultValue={product.rating ?? 4.8}
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
              defaultValue={product.review_count ?? 0}
              className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
            />
          </div>
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
