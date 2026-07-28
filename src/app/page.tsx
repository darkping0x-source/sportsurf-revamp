import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Star, Quote, MessageCircle } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import { CATEGORY_IMAGES } from "@/lib/category-icons";
import ProjectCard from "@/components/ProjectCard";
import {
  getCertifications,
  getCompanyStats,
  getProjects,
  getTestimonials,
} from "@/lib/data";

const HERO_IMAGE = "https://picsum.photos/seed/sportsurf-hero-stadium/1920/1080";

export default async function Home() {
  const [certifications, stats, projects, testimonials] = await Promise.all([
    getCertifications(),
    getCompanyStats(),
    getProjects(),
    getTestimonials(),
  ]);

  const featuredCategories = PRODUCT_CATEGORIES.slice(0, 6);
  const spans = [
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
    "lg:col-span-2",
  ];

  return (
    <main className="flex-1 bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        <div className="relative mx-auto max-w-5xl px-4 py-28 text-center text-white sm:px-6 sm:py-36 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
            Sports Design + Execution + AI Sports Tech
          </p>
          <h1 className="font-display mx-auto mt-5 max-w-3xl text-4xl leading-tight font-black sm:text-6xl">
            Leader in Sports Surfaces &amp; Infrastructure
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/80">
            {stats.projectsCompleted} projects completed across {stats.statesServed} states —
            from FIFA-certified turf to full academy build-outs.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quote"
              className="rounded-md bg-gold px-6 py-3 font-semibold text-navy transition hover:bg-amber"
            >
              Get a Free Consultation
            </Link>
            <Link
              href="/products"
              className="rounded-md border border-white/30 px-6 py-3 font-medium text-white transition hover:border-white hover:bg-white/10"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio bento grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Our Portfolio
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold text-navy sm:text-4xl">
              Every Sport, <span className="italic">Elevated.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-blue hover:text-blue-dark"
          >
            View All <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
          {featuredCategories.map((cat, i) => (
            <Link
              key={cat.value}
              href={`/products?category=${cat.value}`}
              className={`group relative overflow-hidden rounded-xl ${spans[i]}`}
            >
              <Image
                src={CATEGORY_IMAGES[cat.value]}
                alt={cat.label}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-lg font-bold">{cat.label}</p>
                <p className="mt-1 text-sm text-white/70">
                  Premium {cat.label.toLowerCase()} solutions customized for performance.
                </p>
                <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-gold uppercase">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-navy py-10 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: stats.projectsCompleted, label: "Projects Completed" },
            { value: stats.statesServed, label: "States Served" },
            { value: stats.institutionalClients, label: "Institutional Clients" },
            { value: stats.yearsOfTrust, label: "Years of Trust" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs tracking-wide text-white/60 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Landmark installations */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Our Work
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold text-navy sm:text-4xl">
              Landmark <span className="italic">Installations</span>
            </h2>
            <p className="mt-2 text-navy/60">
              Explore our portfolio of {stats.projectsCompleted} missions delivered across
              India.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold text-blue underline-offset-4 hover:text-blue-dark hover:underline"
          >
            All Projects
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-grey py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Client Reviews
          </p>
          <h2 className="font-display mt-2 text-center text-3xl font-bold text-navy sm:text-4xl">
            Trusted by <span className="italic">Leading Institutions</span>
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="relative rounded-xl bg-white p-6 shadow-sm">
                <Quote className="absolute top-5 right-5 h-8 w-8 text-gold/20" />
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: t.rating ?? 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <p className="mt-3 text-navy/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {t.attribution.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy">
                      {t.attribution}
                    </span>
                    {t.role && (
                      <span className="block text-xs text-navy/50">{t.role}</span>
                    )}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-navy/40 uppercase">
          Certified Quality Standards
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {certifications.map((cert) => (
            <span
              key={cert.id}
              className="rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-gold"
            >
              {cert.name}
            </span>
          ))}
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gold uppercase">
              Available 24/7 — Pan India
            </p>
            <h2 className="font-display mt-2 max-w-lg text-3xl font-bold text-white">
              Ready to Build Your Dream Sports Facility?
            </h2>
            <p className="mt-2 text-white/60">
              Get a free consultation and site visit across India.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link
              href="/quote"
              className="rounded-md bg-gold px-6 py-3 font-semibold text-navy transition hover:bg-amber"
            >
              Request Free Estimate
            </Link>
            <a
              href="https://wa.me/919966109191"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 font-medium text-white transition hover:border-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
