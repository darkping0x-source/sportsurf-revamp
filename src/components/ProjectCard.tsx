import Link from "next/link";
import Image from "next/image";
import { MapPin, Grid2x2, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

function formatYear(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).getFullYear();
}

export default function ProjectCard({ project }: { project: Project }) {
  const year = formatYear(project.completedOn);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group overflow-hidden rounded-xl border border-navy/10 bg-white transition hover:shadow-lg"
    >
      <div className="relative h-56 w-full overflow-hidden">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        {year && (
          <span className="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-xs font-bold text-navy">
            {year}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1 text-xs font-semibold tracking-wide text-gold uppercase">
          <MapPin className="h-3.5 w-3.5" /> {project.location}, {project.state}
        </p>
        <p className="mt-2 font-bold text-navy">{project.title}</p>
        {project.infrastructureType && (
          <p className="mt-1 text-xs font-semibold tracking-wide text-navy/50 uppercase">
            Infrastructure: {project.infrastructureType}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-navy/10 pt-3 text-sm">
          {project.areaSqm && (
            <span className="flex items-center gap-1 text-navy/60">
              <Grid2x2 className="h-4 w-4" /> {project.areaSqm.toLocaleString("en-IN")} sqm
            </span>
          )}
          <span className="flex items-center gap-1 font-semibold text-blue">
            View Case Study <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
