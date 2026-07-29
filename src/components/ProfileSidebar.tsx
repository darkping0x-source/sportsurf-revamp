"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Bell, Settings, LogOut } from "lucide-react";
import { signOut } from "@/app/profile/actions";

const NAV = [
  { href: "/profile", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile/quotes", label: "My Quotes", icon: Package },
  { href: "/profile/notifications", label: "Notifications", icon: Bell },
  { href: "/profile/settings", label: "Account Settings", icon: Settings },
];

export default function ProfileSidebar({ notificationCount }: { notificationCount: number }) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="space-y-1.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm font-semibold tracking-wide uppercase transition ${
                  active ? "bg-navy text-white" : "text-navy/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" /> {item.label}
                </span>
                {item.href === "/profile/notifications" && notificationCount > 0 && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                      active ? "bg-white text-navy" : "bg-navy text-white"
                    }`}
                  >
                    {notificationCount}
                  </span>
                )}
              </Link>
            );
          })}
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold tracking-wide text-red-600 uppercase transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </form>
        </nav>
      </aside>

      <nav className="flex flex-wrap gap-2 md:hidden">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                active
                  ? "border-navy bg-navy text-white"
                  : "border-navy/15 text-navy/70 hover:border-blue hover:text-blue"
              }`}
            >
              {item.label}
              {item.href === "/profile/notifications" && notificationCount > 0
                ? ` (${notificationCount})`
                : ""}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
