import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserWithProfile } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/quotes", label: "Quote Requests" },
  { href: "/admin/queries", label: "Search & Chat Queries" },
  { href: "/admin/users", label: "Users" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getCurrentUserWithProfile();

  if (!user) {
    redirect("/login?next=/admin");
  }
  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <aside className="hidden w-48 shrink-0 md:block">
        <p className="px-3 text-xs font-semibold tracking-wider text-navy/40 uppercase">
          Admin
        </p>
        <nav className="mt-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-navy/70 transition hover:bg-grey hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <nav className="mb-6 flex flex-wrap gap-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-navy/15 px-3 py-1 text-xs font-medium text-navy/70 hover:border-blue hover:text-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </main>
  );
}
