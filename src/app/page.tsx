export default function Home() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
      <p className="text-sm font-medium tracking-wide text-gold uppercase">
        SportSurf India — Revamp
      </p>
      <h1 className="text-3xl font-bold text-navy sm:text-4xl">
        Leader in Sports Surfaces &amp; Infrastructure
      </h1>
      <p className="max-w-xl text-navy/70">
        Scaffold is up. Home/About/Products/Projects/Contact/Auth/Admin pages come next.
      </p>
      <button className="rounded-md bg-blue px-5 py-2.5 font-medium text-white transition hover:bg-blue-dark">
        Get a Free Consultation
      </button>
    </main>
  );
}
