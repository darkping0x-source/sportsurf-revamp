import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Get a Quote — SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

export default function QuotePage() {
  return (
    <main className="mx-auto max-w-xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Get a Free Consultation</h1>
      <p className="mt-2 text-navy/60">
        Tell us about your project and our team will get back to you with a quote.
      </p>

      <div className="mt-8 rounded-lg border border-navy/10 bg-white p-6">
        <ContactForm
          submitLabel="Request Quote"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "location", label: "Project Location", required: true },
            { name: "estimatedArea", label: "Estimated Area" },
            {
              name: "message",
              label: "Message",
              type: "textarea",
              placeholder: "Please tell us about your project location and estimated area...",
            },
          ]}
        />
      </div>
    </main>
  );
}
