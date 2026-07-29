import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/lib/types";

export const metadata = { title: "Products | Admin" };

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*").order("name");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-dark"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {(products ?? []).map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-navy/10 bg-white p-4"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-gold uppercase">
                {PRODUCT_CATEGORIES.find((c) => c.value === p.category)?.label}
              </p>
              <p className="font-semibold text-navy">{p.name}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/products/${p.id}`}
                className="text-sm font-medium text-blue hover:text-blue-dark"
              >
                Edit
              </Link>
              <Link
                href={`/admin/products/${p.id}/delete`}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
        {(products ?? []).length === 0 && <p className="text-navy/50">No products yet.</p>}
      </div>
    </div>
  );
}
