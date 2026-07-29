import Link from "next/link";
import { login } from "./actions";

export const metadata = {
  title: "Login | SportSurf India",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <main className="mx-auto flex-1 max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Log In</h1>
      <p className="mt-2 text-navy/60">Access your account and quote requests.</p>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <form action={login} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={next ?? "/profile"} />
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
            className="mt-1 w-full rounded-md border border-navy/15 px-3 py-2 text-navy focus:border-blue focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-gold px-5 py-2.5 font-semibold text-navy transition hover:bg-amber"
        >
          Log In
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-navy/60">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-blue hover:text-blue-dark">
          Register
        </Link>
      </p>
    </main>
  );
}
