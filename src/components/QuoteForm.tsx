"use client";

import { useActionState } from "react";
import { submitQuoteRequest, type QuoteFormState } from "@/app/quote/actions";

const initialState: QuoteFormState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none";

export default function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-blue/20 bg-blue/5 p-6 text-center text-navy">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-navy">
          Name <span className="text-gold">*</span>
        </label>
        <input id="name" name="name" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-navy">
          Email <span className="text-gold">*</span>
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium text-navy">
          Phone <span className="text-gold">*</span>
        </label>
        <input id="phone" name="phone" type="tel" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="location" className="text-sm font-medium text-navy">
          Project Location <span className="text-gold">*</span>
        </label>
        <input id="location" name="location" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="estimatedArea" className="text-sm font-medium text-navy">
          Estimated Area
        </label>
        <input id="estimatedArea" name="estimatedArea" className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Please tell us about your project location and estimated area..."
          className={inputClass}
        />
      </div>

      {state.status === "error" && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-blue px-5 py-2.5 font-medium text-white transition hover:bg-blue-dark disabled:opacity-60"
      >
        {pending ? "Sending..." : "Request Quote"}
      </button>
    </form>
  );
}
