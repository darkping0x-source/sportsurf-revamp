import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/category-icons";

export default function CategoryNav() {
  return (
    <div className="border-b border-navy/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3 sm:px-6 lg:justify-center lg:gap-10 lg:px-8">
        {PRODUCT_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.value];
          return (
            <Link
              key={cat.value}
              href={`/products?category=${cat.value}`}
              className="group flex shrink-0 flex-col items-center gap-1.5 text-navy/70 hover:text-blue"
            >
              <Icon className="h-5 w-5 transition group-hover:scale-110" strokeWidth={1.5} />
              <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
