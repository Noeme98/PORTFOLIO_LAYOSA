import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { categories, projects } from "@/data/projects";

const title = "Projects — Automation, Internal Tools & API Integrations";
const description =
  "Case studies in AI automation, business systems, web applications, internal tools, and API integration — each documented as problem, system, and result.";

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

function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const options = ["All", ...categories];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal as="header" className="max-w-2xl">
        <p className="label-mono">Projects</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Systems I've built, documented end to end
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Each case study covers the original workflow, the architecture, the automation and AI
          components, and what changed afterwards. Entries below are structural placeholders until
          the real project details are added.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {options.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              filter === c
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60}>
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
