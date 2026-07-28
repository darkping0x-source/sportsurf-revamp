"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface Props {
  navLinks: { href: string; label: string }[];
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export default function MobileMenu({ navLinks, isAdmin, isLoggedIn }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center text-navy/70 hover:text-blue"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-navy/10 bg-cream px-4 py-3 shadow-sm">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-navy/80 hover:bg-grey hover:text-blue"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-1 border-t border-navy/10" />
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-navy/80 hover:bg-grey hover:text-blue"
              >
                Admin
              </Link>
            )}
            <Link
              href={isLoggedIn ? "/profile" : "/login"}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-navy/80 hover:bg-grey hover:text-blue"
            >
              {isLoggedIn ? "Account" : "Login"}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
