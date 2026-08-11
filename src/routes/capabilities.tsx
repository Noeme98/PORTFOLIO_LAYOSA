import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { capabilities, process } from "@/data/site";

const title = "Capabilities — AI Automation, Workflow Automation & Integrations";
const description =
  "What I build: AI automation, workflow automation, internal business systems, web applications, API integrations, and technical operations support.";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/capabilities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/capabilities" }],
  }),
  component: CapabilitiesPage,
});

function CapabilitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal as="header" className="max-w-2xl">
        <p className="label-mono">Capabilities</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          The problems I'm useful for
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Grouped by the kind of operational problem, not by tool. Every one of these starts with
          the same question: what work is being repeated, and what does it cost the team?
        </p>
      </Reveal>

      <ul className="mt-12 space-y-4">
        {capabilities.map((c, i) => (
          <Reveal
            as="li"
            key={c.id}
            delay={i * 50}
            className="grid gap-5 rounded-xl border border-border bg-surface p-6 lg:grid-cols-[240px_minmax(0,1fr)_200px]"
          >
            <h2 className="text-lg font-semibold tracking-tight">{c.title}</h2>
            <div className="min-w-0">
              <p className="text-sm leading-relaxed text-muted-foreground">{c.problem}</p>
              <p className="mt-3 text-sm leading-relaxed">{c.detail}</p>
            </div>
            <ul className="space-y-1.5">
              {c.examples.map((e) => (
                <li key={e} className="label-mono">
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>

      <section className="mt-16">
        <Reveal>
          <p className="label-mono">How I Work</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Five steps, every time</h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {process.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 60}>
              <div className="h-full rounded-xl border border-border bg-surface p-5">
                <span className="label-mono">{s.step}</span>
                <h3 className="mt-2 text-base font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </div>
  );
}
