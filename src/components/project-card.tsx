import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";
import { FlowPreview } from "@/components/flow-preview";

/**
 * Project card: name, category, one-line problem, one-line solution,
 * core technologies, a system preview, and the case-study link.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift">
      <div className="relative overflow-hidden border-b border-border bg-background p-5">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="label-mono">preview</span>
            <span className="label-mono">{project.diagram.length} layers</span>
          </div>
          <div className="mt-3">
            <FlowPreview nodes={project.diagram} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            {project.category}
          </span>
          {project.placeholder && (
            <span className="rounded-full border border-dashed border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Placeholder
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        <dl className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
          {[
            ["Problem", project.problem],
            ["System", project.system],
            ["Automation", project.automation],
            ["Outcome", project.result],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[86px_minmax(0,1fr)] gap-3">
              <dt className="label-mono pt-0.5">{label}</dt>
              <dd className="min-w-0 leading-relaxed text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-secondary px-2 py-1 font-mono text-[11px] text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:border-border-strong hover:bg-secondary"
          >
            View Case Study
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
