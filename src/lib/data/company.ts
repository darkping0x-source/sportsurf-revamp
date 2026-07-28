import type { Certification, TimelineEntry, Testimonial } from "@/lib/types";

export const certifications: Certification[] = [
  { id: "c-iso", name: "ISO 9001:2015", description: "Certified quality management system." },
  { id: "c-fifa", name: "FIFA Quality", description: "FIFA-certified football turf installations." },
  { id: "c-iaaf", name: "IAAF Certified", description: "IAAF-standard athletics track construction." },
  { id: "c-bis", name: "BIS Approved", description: "Bureau of Indian Standards approved materials." },
];

export const timeline: TimelineEntry[] = [
  { year: "2016", title: "SportSurf India founded in Gurgaon." },
  { year: "2019", title: "First FIFA-certified turf installation completed in Delhi." },
  { year: "2023", title: "Relaunch of our advanced infrastructure brand." },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Every millimeter of our turf and flooring is tested for consistent ball bounce and player traction.",
    attribution: "SportSurf Engineering Team",
  },
  {
    quote: "Safety is not an afterthought. Our surfaces feature advanced shock absorption layers.",
    attribution: "SportSurf Engineering Team",
  },
];

export const companyStats = {
  projectsCompleted: "500+",
  statesServed: "18+",
};
