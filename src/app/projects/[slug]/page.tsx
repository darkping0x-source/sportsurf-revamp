import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/data";
import { PRODUCT_CATEGORIES } from "@/lib/types";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const categoryLabel = PRODUCT_CATEGORIES.find((c) => c.value === project.category)?.label;

  return (
    <main className="flex-1">
      {project.imageUrl && (
        <div className="relative h-72 w-full sm:h-96">
          <Image src={project.imageUrl} alt={project.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/projects" className="text-sm font-medium text-blue hover:text-blue-dark">
          &larr; All projects
        </Link>

        <p className="mt-6 text-xs font-medium tracking-wide text-gold uppercase">
          {categoryLabel} · {project.state}
        </p>
        <h1 className="font-display mt-1 text-3xl font-bold text-navy sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-navy/60">{project.location}</p>

        <p className="mt-6 leading-relaxed text-navy/80">{project.description}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-lg border border-navy/10 bg-white p-6 sm:grid-cols-3">
          {project.clientName && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-navy/40 uppercase">Client</dt>
              <dd className="mt-1 text-navy">{project.clientName}</dd>
            </div>
          )}
          {project.completedOn && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-navy/40 uppercase">Completed</dt>
              <dd className="mt-1 text-navy">
                {new Date(project.completedOn).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                })}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-semibold tracking-wide text-navy/40 uppercase">State</dt>
            <dd className="mt-1 text-navy">{project.state}</dd>
          </div>
          {project.infrastructureType && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-navy/40 uppercase">
                Infrastructure
              </dt>
              <dd className="mt-1 text-navy">{project.infrastructureType}</dd>
            </div>
          )}
          {project.areaSqm && (
            <div>
              <dt className="text-xs font-semibold tracking-wide text-navy/40 uppercase">Area</dt>
              <dd className="mt-1 text-navy">{project.areaSqm.toLocaleString("en-IN")} sqm</dd>
            </div>
          )}
        </dl>
      </div>
    </main>
  );
}
