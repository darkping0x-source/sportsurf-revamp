import Link from "next/link";
import { getProducts } from "@/lib/data";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/types";

export const metadata = {
  title: "Products — SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

function isProductCategory(value: string | undefined): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((c) => c.value === value);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = isProductCategory(category) ? category : undefined;

  const products = await getProducts();
  const visible = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Products</h1>
      <p className="mt-2 text-navy/60">
        Surface sports, water sports, small sports, budget sports, sports academies, and
        play zones.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            !activeCategory
              ? "border-blue bg-blue text-white"
              : "border-navy/15 text-navy/70 hover:border-blue hover:text-blue"
          }`}
        >
          All
        </Link>
        {PRODUCT_CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={`/products?category=${cat.value}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat.value
                ? "border-blue bg-blue text-white"
                : "border-navy/15 text-navy/70 hover:border-blue hover:text-blue"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-navy/10 bg-white p-5 transition hover:border-blue hover:shadow-sm"
          >
            <p className="text-xs font-medium tracking-wide text-gold uppercase">
              {PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label}
            </p>
            <p className="mt-1 font-semibold text-navy">{product.name}</p>
            <p className="mt-2 text-sm text-navy/60">{product.description}</p>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="col-span-full text-navy/50">No products in this category yet.</p>
        )}
      </div>
    </main>
  );
}
