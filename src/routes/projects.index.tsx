import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { categories, projects } from "@/data/projects";
import { Zap, Layers, Globe, LayoutGrid } from "lucide-react";

const title = "Projects — n8n Automations, GoHighLevel CRMs & Full-Stack Web Systems";
const description =
  "Case studies in n8n automations, GoHighLevel CRM workflows, and full-stack web applications & systems — each documented with real workflow diagrams and evidence.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "n8n Automations":
      return <Zap className="h-4 w-4 text-emerald-400" />;
    case "GoHighLevel CRMs":
      return <Layers className="h-4 w-4 text-amber-400" />;
    case "Web Applications & Systems":
      return <Globe className="h-4 w-4 text-blue-400" />;
    default:
      return <LayoutGrid className="h-4 w-4" />;
  }
}

function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const options = ["All", ...categories];

  const getCount = (c: string) =>
    c === "All" ? projects.length : projects.filter((p) => p.category === c).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal as="header" className="max-w-2xl">
        <p className="label-mono">Projects</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Systems I've Built, Documented End to End
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Browse case studies separated by technical domain: <strong>n8n Automations</strong>, <strong>GoHighLevel CRMs</strong>, and <strong>Web Applications & Systems</strong>. Each case study covers the operational problem, architecture, logic flow, and measurable results.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
        {options.map((c) => {
          const count = getCount(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-mono font-medium transition-all ${
                filter === c
                  ? "border-primary/50 bg-primary/10 text-primary shadow-xs font-semibold"
                  : "border-border/80 bg-surface/80 text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
            >
              {getCategoryIcon(c)}
              <span>{c}</span>
              <span className={`ml-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 min-w-0 w-full">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60} className="min-w-0 w-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
