import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function UtilityBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="hidden bg-navy text-xs text-white/70 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <a href="mailto:info@sportsurf.in" className="flex items-center gap-1.5 hover:text-gold">
            <Mail className="h-3.5 w-3.5" /> info@sportsurf.in
          </a>
          <a href="tel:+919966109191" className="flex items-center gap-1.5 hover:text-gold">
            <Phone className="h-3.5 w-3.5" /> +91 99661 09191
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <a href="#" aria-label="Facebook" className="hover:text-gold">
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gold">
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gold">
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>
          </div>
          <span className="h-3 w-px bg-white/20" />
          {isLoggedIn ? (
            <Link href="/profile" className="font-medium tracking-wide uppercase hover:text-gold">
              Account
            </Link>
          ) : (
            <>
              <Link href="/register" className="font-medium tracking-wide uppercase hover:text-gold">
                Registration
              </Link>
              <Link href="/login" className="font-medium tracking-wide uppercase hover:text-gold">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
