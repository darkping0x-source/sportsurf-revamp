import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
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
      <h1 className="font-display text-4xl font-black text-navy">All Products</h1>
      <p className="mt-2 text-navy/60">
        Discover our range of premium sports infrastructure and equipment tailored for all
        sports.
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

      <p className="mt-6 text-sm text-navy/50">
        Showing <span className="font-semibold text-navy">{visible.length}</span> product
        {visible.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <Link
            key={product.id}
            href={`/products?category=${product.category}`}
            className="group overflow-hidden rounded-xl border border-navy/10 bg-white transition hover:shadow-lg"
          >
            <div className="relative h-52 w-full overflow-hidden">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute top-3 left-3 rounded bg-gold px-2.5 py-1 text-[10px] font-bold tracking-wide text-navy uppercase">
                {PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label}
              </span>
            </div>
            <div className="p-5">
              {product.rating && (
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${s < Math.round(product.rating!) ? "fill-gold" : "fill-transparent"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-navy/50">
                    {product.reviewCount?.toLocaleString("en-IN")}+ Reviews
                  </span>
                </div>
              )}
              <p className="mt-2 font-bold text-navy">{product.name}</p>
              <p className="mt-1 text-sm text-navy/60">
                {PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label} Infrastructure
              </p>
            </div>
          </Link>
        ))}
        {visible.length === 0 && (
          <p className="col-span-full text-navy/50">No products in this category yet.</p>
        )}
      </div>
    </main>
  );
}
