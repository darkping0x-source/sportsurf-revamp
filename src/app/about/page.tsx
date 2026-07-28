import { getCompanyTimeline, getCompanyStats, getTestimonials } from "@/lib/data";

export const metadata = {
  title: "About — SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

export default async function AboutPage() {
  const [timeline, stats, testimonials] = await Promise.all([
    getCompanyTimeline(),
    getCompanyStats(),
    getTestimonials(),
  ]);

  return (
    <main className="flex-1 bg-cream">
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">About SportSurf India</h1>
        <p className="mt-4 text-navy/70">
          We design, build, and outfit sports facilities with integrated technology —
          {" "}
          {stats.projectsCompleted} projects delivered across {stats.statesServed} states,
          for schools, academies, and institutional clients nationwide.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-navy">Our Story</h2>
        <ol className="mt-6 space-y-6 border-l-2 border-blue/30 pl-6">
          {timeline.map((entry) => (
            <li key={entry.year} className="relative">
              <span className="absolute top-1 -left-[1.95rem] h-3 w-3 rounded-full bg-blue" />
              <p className="text-sm font-semibold text-gold">{entry.year}</p>
              <p className="mt-1 text-navy">{entry.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-grey py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-navy">What We Stand For</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
    </main>
  );
}
