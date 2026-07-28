import Link from "next/link";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Projects — SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">Projects</h1>
      <p className="mt-2 text-navy/60">
        A portfolio of installations across sports disciplines and states.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="rounded-lg border border-navy/10 bg-white p-5 transition hover:border-blue hover:shadow-sm"
          >
            <p className="text-xs font-medium tracking-wide text-gold uppercase">
              {project.state}
            </p>
            <p className="mt-1 font-semibold text-navy">{project.title}</p>
            <p className="mt-2 text-sm text-navy/60">{project.location}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
