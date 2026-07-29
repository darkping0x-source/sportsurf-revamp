import { Calculator, CheckCircle2, FileText } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Get a Quote | SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

const INCLUSIONS = [
  "Itemized material costs",
  "Technical cross-sections",
  "Logistics & civil estimates",
  "Warranty documentation",
  "Project timeline map",
];

export default async function QuotePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user
    ? (await supabase.from("profiles").select("full_name, phone").eq("id", user.id).single()).data
    : null;

  return (
    <main className="flex-1 bg-cream">
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Precision Estimates
            </p>
            <h1 className="font-display mt-2 text-4xl font-black text-navy sm:text-5xl">
              Get A <span className="italic">Quote</span>
            </h1>
            <p className="mt-3 max-w-xl text-navy/60">
              Receive a detailed technical and commercial proposal for your sports facility.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-lg border border-navy/10 bg-white px-4 py-3">
            <Calculator className="h-5 w-5 text-navy" />
            <span className="text-xs font-semibold tracking-wide text-navy uppercase">
              Instant Assessment
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-navy/10 bg-white p-6 sm:p-8 lg:col-span-2">
            <QuoteForm
              defaultName={profile?.full_name ?? ""}
              defaultEmail={user?.email ?? ""}
              defaultPhone={profile?.phone ?? ""}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-navy/10 bg-white p-6">
              <p className="font-display flex items-center gap-2 text-lg font-bold text-navy">
                <FileText className="h-5 w-5 text-gold" /> Inclusions
              </p>
              <ul className="mt-4 space-y-3">
                {INCLUSIONS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm font-medium text-navy/80 uppercase"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-navy p-6 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Calculator className="h-5 w-5" />
              </span>
              <p className="font-display mt-4 text-lg font-bold">Why Detailed Metrics Matter</p>
              <p className="mt-2 text-sm text-white/70">
                Providing accurate area dimensions allows our experts to specify the correct
                sub-base requirements, often saving up to 15% on civil construction costs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
