"use client";

import { useActionState } from "react";
import { updateProfile, type UpdateProfileState } from "@/app/profile/settings/actions";

const initialState: UpdateProfileState = { status: "idle" };

const inputClass =
  "mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none";

export default function AccountSettingsForm({
  fullName,
  phone,
  email,
}: {
  fullName: string;
  phone: string;
  email: string;
}) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-navy">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            defaultValue={fullName}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy">
            Email Address
          </label>
          <input
            id="email"
            defaultValue={email}
            disabled
            className={`${inputClass} cursor-not-allowed bg-grey text-navy/50`}
          />
        </div>
      </div>
      <div className="sm:w-1/2 sm:pr-2">
        <label htmlFor="phone" className="text-sm font-medium text-navy">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" defaultValue={phone} className={inputClass} />
      </div>

      {state.status === "error" && <p className="text-sm text-red-600">{state.message}</p>}
      {state.status === "success" && <p className="text-sm text-green-700">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Update Profile"}
      </button>
    </form>
  );
}
