import Link from "next/link";
import { Search, UserRound, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import MobileMenu from "@/components/MobileMenu";
import CategoryMenu from "@/components/CategoryMenu";
import PromoTicker from "@/components/PromoTicker";

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

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.role === "admin";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy text-lg font-bold text-white">
            S
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-navy">
              SportSurf
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
              India
            </span>
          </span>
        </Link>

        <CategoryMenu />

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

        <a
          href="tel:+919966109191"
          className="hidden items-center gap-1.5 text-sm font-medium text-navy/70 hover:text-blue lg:flex"
        >
          <Phone className="h-4 w-4" /> +91 99661 09191
        </a>

        <MobileMenu navLinks={NAV_LINKS} isAdmin={isAdmin} isLoggedIn={Boolean(user)} />

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <form action="/search" className="relative hidden w-48 sm:block lg:w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-navy/40" />
            <input
              type="search"
              name="q"
              placeholder="Search products, academies..."
              className="w-full rounded-md border border-navy/15 bg-white py-2 pr-3 pl-9 text-sm text-navy placeholder:text-navy/40 focus:border-blue focus:outline-none"
            />
          </form>

          <Link
            href="/search"
            aria-label="Search"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-navy/70 hover:text-blue sm:hidden"
          >
            <Search className="h-5 w-5" />
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="hidden items-center gap-1.5 text-sm font-medium text-navy/70 hover:text-blue sm:flex"
            >
              <ShieldCheck className="h-4 w-4" /> Admin
            </Link>
          )}
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
            className="flex items-center gap-1.5 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:bg-amber"
          >
            Get a Quote <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <PromoTicker />
    </header>
  );
}
