import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight text-navy">
          SportSurf <span className="text-gold">India</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy/70 transition-colors hover:text-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative ml-auto hidden max-w-sm flex-1 sm:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-navy/40" />
          <input
            type="search"
            placeholder="Search for surface sports, academies, play zones..."
            className="w-full rounded-md border border-navy/15 bg-white py-2 pr-3 pl-9 text-sm text-navy placeholder:text-navy/40 focus:border-blue focus:outline-none"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {user ? (
            <Link
              href="/profile"
              className="hidden items-center gap-1.5 text-sm font-medium text-navy/70 hover:text-blue sm:flex"
            >
              <UserRound className="h-4 w-4" /> Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden text-sm font-medium text-navy/70 hover:text-blue sm:block"
            >
              Login
            </Link>
          )}
          <Link
            href="/quote"
            className="rounded-md bg-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-dark"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
