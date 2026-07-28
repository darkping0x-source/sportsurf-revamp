import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/types";
import {
  getCertifications,
  getCompanyStats,
  getProjects,
  getTestimonials,
} from "@/lib/data";

export default async function Home() {
  const [certifications, stats, projects, testimonials] = await Promise.all([
    getCertifications(),
    getCompanyStats(),
    getProjects(),
    getTestimonials(),
  ]);

  return (
    <main className="flex-1 bg-cream">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-gold uppercase">
          Sports Design + Execution + AI Sports Tech
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-navy sm:text-5xl">
          Leader in Sports Surfaces &amp; Infrastructure
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-navy/70">
          {stats.projectsCompleted} projects completed across {stats.statesServed} states —
          from FIFA-certified turf to full academy build-outs.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/quote"
            className="rounded-md bg-blue px-6 py-3 font-medium text-white transition hover:bg-blue-dark"
          >
            Get a Free Consultation
          </Link>
          <Link
            href="/products"
            className="rounded-md border border-navy/20 px-6 py-3 font-medium text-navy transition hover:border-blue hover:text-blue"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Product categories */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-navy">Product Categories</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/products?category=${cat.value}`}
              className="rounded-lg border border-navy/10 bg-white p-6 transition hover:border-blue hover:shadow-sm"
            >
              <p className="font-semibold text-navy">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Featured Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-blue hover:text-blue-dark">
            View all projects &rarr;
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.slice(0, 4).map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="rounded-lg border border-navy/10 bg-white p-5 transition hover:border-blue hover:shadow-sm"
            >
              <p className="text-xs font-medium tracking-wide text-gold uppercase">
                {project.state}
              </p>
              <p className="mt-1 font-semibold text-navy">{project.title}</p>
              <p className="mt-2 text-sm text-navy/60">{project.location}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-grey py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="text-navy/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-medium text-navy/50">
                  {t.attribution}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-navy">Certified &amp; Approved</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="rounded-lg border border-gold/30 bg-white p-5 text-center">
              <p className="font-semibold text-gold">{cert.name}</p>
              <p className="mt-1 text-sm text-navy/60">{cert.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
