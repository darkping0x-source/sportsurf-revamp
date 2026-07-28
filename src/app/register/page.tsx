import Link from "next/link";
import { register } from "./actions";

export const metadata = {
  title: "Register — SportSurf India",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex-1 max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Create an Account</h1>
      <p className="mt-2 text-navy/60">Register to request quotes and track their status.</p>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <form action={register} className="mt-6 space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-navy">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            minLength={2}
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-navy">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-sm font-medium text-navy">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue px-5 py-2.5 font-medium text-white transition hover:bg-blue-dark"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-navy/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue hover:text-blue-dark">
          Log in
        </Link>
      </p>
    </main>
  );
}
