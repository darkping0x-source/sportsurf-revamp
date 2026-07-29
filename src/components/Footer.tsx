import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";
import { getCertifications } from "@/lib/data";
import { PRODUCT_CATEGORIES } from "@/lib/types";

export default async function Footer() {
  const certifications = await getCertifications();

  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-white/10 pb-6 text-xs tracking-wider text-white/60 uppercase">
          {certifications.map((cert) => (
            <span key={cert.id} className="hover:text-gold transition-colors">
              {cert.name}
            </span>
          ))}
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gold text-sm font-bold text-navy">
                S
              </span>
              <p className="font-display text-lg font-bold tracking-tight">
                SportSurf <span className="text-gold">India</span>
              </p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              India&apos;s leading sports infrastructure company, designing, building, and
              outfitting arenas for sport, play, and excellence.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-gold transition-colors"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-gold transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-gold transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-white/40 uppercase">
              Quick Links
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-gold transition-colors">Products</Link></li>
              <li><Link href="/projects" className="hover:text-gold transition-colors">Projects</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link href="/quote" className="hover:text-gold transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-white/40 uppercase">
              Categories
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/products?category=${cat.value}`}
                    className="hover:text-gold transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wider text-white/40 uppercase">
              Contact Us
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="text-gold mt-0.5 h-4 w-4 shrink-0" />
                Gurgaon, Haryana, India (Pan India Service Availability)
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-gold h-4 w-4 shrink-0" />
                +91 91886 71109
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-gold h-4 w-4 shrink-0" />
                info@sportsurf.in
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} SportSurf India. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
