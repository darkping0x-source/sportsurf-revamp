export const metadata = {
  title: "Terms of Service — SportSurf India",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Terms of Service</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-navy/80">
        <p>
          By using this site and requesting a quote or consultation, you agree to provide
          accurate information and to be contacted by SportSurf India regarding your
          project.
        </p>
        <p>
          Quotes provided through this site are estimates and subject to a site visit and
          final scope confirmation. Certifications referenced (ISO 9001:2015, FIFA
          Quality, IAAF, BIS) apply to the specific products and installations they are
          associated with.
        </p>
        <p>
          For questions about these terms, contact info@sportsurf.in.
        </p>
      </div>
    </main>
  );
}
