import { getProjects, getCompanyStats } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects — SportSurf India",
  description: "Leader in Sports Surfaces & Infrastructure",
};

export default async function ProjectsPage() {
  const [projects, stats] = await Promise.all([getProjects(), getCompanyStats()]);

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-black text-navy">Landmark Installations</h1>
      <p className="mt-2 text-navy/60">
        Explore our portfolio of {stats.projectsCompleted} missions delivered across India.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {projects.length === 0 && <p className="col-span-full text-navy/50">No projects yet.</p>}
      </div>
    </main>
  );
}
