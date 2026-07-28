import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "../../actions";

export const metadata = { title: "Delete Product — Admin" };

export default async function DeleteProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("id, name").eq("id", id).maybeSingle();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-navy">Delete Product</h1>
      <p className="mt-3 text-navy/70">
        Are you sure you want to delete <span className="font-semibold">{product.name}</span>?
        This cannot be undone.
      </p>

      <div className="mt-6 flex gap-3">
        <form action={deleteProduct}>
          <input type="hidden" name="id" value={product.id} />
          <button
            type="submit"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </form>
        <Link
          href="/admin/products"
          className="rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy hover:border-blue hover:text-blue"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
