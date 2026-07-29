"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, ChevronDown } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/category-icons";

const FLASH_STORAGE_KEY = "categoryMenuFlashedOn";

function subscribe() {
  return () => {};
}

function getAlreadyFlashedTodaySnapshot() {
  return window.localStorage.getItem(FLASH_STORAGE_KEY) === new Date().toDateString();
}

function getServerSnapshot() {
  return true;
}

export default function CategoryMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const alreadyFlashedToday = useSyncExternalStore(
    subscribe,
    getAlreadyFlashedTodaySnapshot,
    getServerSnapshot,
  );
  const shouldFlash = pathname === "/" && !alreadyFlashedToday && !dismissed;

  useEffect(() => {
    if (shouldFlash) {
      window.localStorage.setItem(FLASH_STORAGE_KEY, new Date().toDateString());
    }
  }, [shouldFlash]);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => {
        setOpen(true);
        setDismissed(true);
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setDismissed(true);
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Browse categories"
        className={`flex h-9 items-center gap-0.5 rounded-md px-2 text-navy/70 hover:bg-navy/5 hover:text-blue ${
          shouldFlash ? "animate-category-flash" : ""
        }`}
      >
        <LayoutGrid className="h-5 w-5" />
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-64 rounded-lg border border-navy/10 bg-white p-2 shadow-lg">
          {PRODUCT_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.value];
            return (
              <Link
                key={cat.value}
                href={`/products?category=${cat.value}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-navy/80 hover:bg-cream hover:text-blue"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {cat.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
