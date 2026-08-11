import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";
import { FlowPreview } from "@/components/flow-preview";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Project card: name, category, one-line problem, one-line solution,
 * core technologies, a system preview, and the case-study link.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/90 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift hover:shadow-primary/5">
      <div className="relative overflow-hidden border-b border-border/80 bg-background/80 p-5">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="label-mono flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-sky-400" /> System Architecture Preview
            </span>
            <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
              {project.diagram.length} Nodes
            </span>
          </div>
          <div className="mt-3">
            <FlowPreview nodes={project.diagram} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-primary uppercase">
            {project.category}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        <dl className="mt-5 space-y-2.5 border-t border-border/80 pt-4 text-sm">
          {[
            ["Problem", project.problem],
            ["System", project.system],
            ["Automation", project.automation],
            ["Outcome", project.result],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[86px_minmax(0,1fr)] gap-3">
              <dt className="label-mono pt-0.5 font-semibold text-foreground/80">{label}</dt>
              <dd className="min-w-0 leading-relaxed text-muted-foreground text-xs font-sans">{value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-border/60 bg-secondary/60 px-2 py-1 font-mono text-[11px] text-secondary-foreground transition-colors group-hover:border-primary/20"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-md"
          >
            <span>Read Complete Case Study</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
