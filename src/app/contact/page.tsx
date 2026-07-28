import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Connect with Us</h1>
      <p className="mt-2 text-navy/60">
        Pan India service availability — reach out for a consultation on your project.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border border-navy/10 bg-white p-6">
            <p className="text-xs font-semibold tracking-wide text-gold uppercase">
              Corporate Office
            </p>
            <div className="mt-3 space-y-3 text-navy/80">
              <p className="flex items-start gap-2">
                <MapPin className="text-gold mt-0.5 h-4 w-4 shrink-0" />
                Gurgaon, Haryana, India — Pan India Service Availability
              </p>
              <p className="flex items-center gap-2">
                <Phone className="text-gold h-4 w-4 shrink-0" />
                +91 99661 09191
              </p>
              <p className="flex items-center gap-2">
                <Mail className="text-gold h-4 w-4 shrink-0" />
                info@sportsurf.in
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-navy/10 bg-white p-6">
          <ContactForm
            submitLabel="Send Message"
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                required: true,
                placeholder: "Please tell us about your project location and estimated area...",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
