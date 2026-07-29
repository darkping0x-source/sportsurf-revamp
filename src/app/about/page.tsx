import { History, Target, Users, ShieldCheck } from "lucide-react";
import { getCompanyTimeline, getCompanyStats } from "@/lib/data";

export const metadata = {
  title: "About | SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

const VALUES = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every millimeter of our turf and flooring is tested for consistent ball bounce and player traction.",
  },
  {
    icon: Users,
    title: "People",
    description:
      "A team of 50+ certified installers and sports engineers dedicated to zero-compromise performance.",
  },
  {
    icon: ShieldCheck,
    title: "Protection",
    description:
      "Safety is not an afterthought. Our surfaces feature advanced shock absorption layers.",
  },
];

export default async function AboutPage() {
  const [timeline, stats] = await Promise.all([getCompanyTimeline(), getCompanyStats()]);
  const foundedYear = timeline[0]?.year ?? "2016";

  return (
    <main className="flex-1 bg-cream">
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-black text-navy sm:text-6xl">Our Story</h1>
        <p className="mx-auto mt-5 max-w-xl text-navy/70">
          Founded in {foundedYear}, SportSurf was born from a singular vision: to bring
          world-class athletic infrastructure to India.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">
              The <span className="italic">Origin</span>
            </h2>
            <p className="mt-4 leading-relaxed text-navy/70">
              What began as a small turf-installation outfit in Gurgaon has grown into a
              pan-India sports infrastructure company. Today, &ldquo;Antigravity&rdquo;
              represents our next evolution, a commitment to physics-driven design that
              minimizes injury risk and maximizes performance potential.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-navy/10 bg-white p-10 text-center">
            <History className="h-10 w-10 text-navy" strokeWidth={1.5} />
            <p className="text-sm text-navy/60">
              Est. {foundedYear} · ISO Certified
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-navy/10 bg-white">
                <v.icon className="h-6 w-6 text-navy" strokeWidth={1.5} />
              </div>
              <p className="mt-4 text-sm font-bold tracking-wide text-navy uppercase">
                {v.title}
              </p>
              <p className="mt-2 text-sm text-navy/60">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-grey py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-3xl font-bold text-navy">
            Our <span className="italic">Timeline</span>
          </h2>
          <ol className="mt-10 space-y-8">
            {timeline.map((entry) => (
              <li key={entry.year} className="flex items-start gap-6 border-b border-navy/10 pb-8 last:border-0">
                <span className="font-display w-20 shrink-0 text-3xl font-bold text-navy/30 sm:text-4xl">
                  {entry.year}
                </span>
                <div>
                  <p className="text-sm font-bold tracking-wide text-navy uppercase">
                    {entry.label}
                  </p>
                  <p className="mt-1 text-navy/70">{entry.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-navy/70">
          {stats.projectsCompleted} projects delivered across {stats.statesServed} states, for
          schools, academies, and institutional clients nationwide.
        </p>
      </section>
    </main>
  );
}
