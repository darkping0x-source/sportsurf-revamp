"use client";

import { useActionState } from "react";
import { CheckCircle2, MapPin, Send } from "lucide-react";
import { submitQuoteRequest, type QuoteFormState } from "@/app/quote/actions";

const initialState: QuoteFormState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none";

const URGENCY_OPTIONS = [
  "Immediate (0-1 Month)",
  "Short-Term (1-3 Months)",
  "Planning Phase (3+ Months)",
  "Just Exploring",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.15em] text-navy/50 uppercase">{children}</p>
  );
}

export default function QuoteForm({
  defaultName = "",
  defaultEmail = "",
  defaultPhone = "",
}: {
  defaultName?: string;
  defaultEmail?: string;
  defaultPhone?: string;
}) {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-navy">
          <CheckCircle2 className="h-7 w-7 text-navy" />
        </span>
        <h2 className="font-display mt-5 text-2xl font-bold text-navy">
          Proposal Request Logged
        </h2>
        <p className="mt-3 max-w-sm text-navy/60">
          Our engineering division is reviewing your data. A preliminary technical document will
          be sent to your email within 4 working hours.
        </p>
        <a
          href="/quote"
          className="mt-6 rounded-md border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy/5"
        >
          Submit Different Scope
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-4">
        <SectionLabel>Project Scope</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className="text-sm font-medium text-navy">
              Project Location <span className="text-gold">*</span>
            </label>
            <div className="relative mt-1">
              <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input
                id="location"
                name="location"
                required
                className="w-full rounded-md border border-navy/15 py-2 pr-3 pl-9 text-navy focus:border-blue focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="urgency" className="text-sm font-medium text-navy">
              Urgency Level
            </label>
            <select id="urgency" name="urgency" defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select timeline
              </option>
              {URGENCY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="estimatedArea" className="text-sm font-medium text-navy">
            Estimated Area
          </label>
          <input
            id="estimatedArea"
            name="estimatedArea"
            placeholder="e.g. 3000 sqft"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-4">
        <SectionLabel>Client Information</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-navy">
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={defaultName}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-navy">
              Phone <span className="text-gold">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              defaultValue={defaultPhone}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy">
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={defaultEmail}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-4">
        <SectionLabel>Additional Project Details</SectionLabel>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us anything else that would help us scope this accurately..."
          className={inputClass}
        />
      </div>

      {state.status === "error" && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-navy px-5 py-3 font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {pending ? "Sending..." : "Generate Official Quote"}
      </button>
    </form>
  );
}
