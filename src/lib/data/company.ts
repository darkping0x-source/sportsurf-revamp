import type { TimelineEntry, Testimonial } from "@/lib/types";

export const timeline: TimelineEntry[] = [
  { year: "2016", label: "Inception", title: "SportSurf India founded in Gurgaon." },
  {
    year: "2019",
    label: "FIFA Standards",
    title: "First FIFA-certified turf installation completed in Delhi.",
  },
  { year: "2022", label: "Expansion", title: "Services extended to 18+ states across India." },
  {
    year: "2023",
    label: "Antigravity",
    title: "Relaunch of our advanced infrastructure brand.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "SportSurf's engineering precision is unlike anything we've seen in India. Every millimeter of our turf is tested for consistent ball bounce and player traction.",
    attribution: "Dr. Arvind Kumar",
    role: "Director, DPS Global",
    rating: 5,
  },
  {
    quote:
      "The quality of the synthetic turf is world-class. Our students are performing at higher levels with less injury risk since the shock-absorption layers went in.",
    attribution: "Sarah Mehra",
    role: "Sports Coordinator, Heritage School",
    rating: 5,
  },
];

export const companyStats = {
  projectsCompleted: "500+",
  statesServed: "18+",
  institutionalClients: "200+",
  yearsOfTrust: "10+",
};
