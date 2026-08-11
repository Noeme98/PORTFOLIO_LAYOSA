import { createFileRoute, Link } from "@tanstack/react-router";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";
import { capabilities, process, profile, stack } from "@/data/site";

const title = "[Your Name] — Automation & Solutions Engineer";
const description =
  "Automation & Solutions Engineer building AI automation, workflow automation, internal business systems, web applications, and API integrations that solve real operational problems.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Automation & Solutions Engineer",
          description,
        }),
      },
    ],
  }),
  component: Home,
});

function SectionHeader({
  label,
  title: heading,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="label-mono">{label}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{heading}</h2>
      {intro && <p className="mt-3 leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <p className="label-mono">Automation &amp; Solutions Engineer</p>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.25rem]">
              I build systems that turn repetitive work into reliable workflows.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I combine automation, AI, web applications, and API integrations to build practical
              tools that improve how teams work.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                View Projects
              </Link>
              <Link
                to="/resume"
                className="inline-flex items-center rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:bg-secondary"
              >
                View / Print Resume
              </Link>
            </div>

            <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">
              <span className="node-dot h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              {profile.status}
            </p>
          </div>

          <div className="min-w-0">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS */}
      <section id="projects" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              label="Selected Projects"
              title="Problem → System → Result"
              intro="Each project is documented as a system: what was broken, what I built, and what changed."
            />
            <Reveal>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                All projects <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} as="div">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section id="capabilities" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeader
            label="What I Build"
            title="Six kinds of operational problems I work on"
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 50} className="bg-background p-6">
                <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.problem}</p>
                <p className="mt-3 text-sm leading-relaxed">{c.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeader label="How I Work" title="A five-step build process" />
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {process.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 60} className="relative">
                <div className="h-full rounded-xl border border-border bg-surface p-5">
                  <span className="label-mono">{s.step}</span>
                  <h3 className="mt-2 text-base font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                </div>
                {i < process.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-border-strong md:block"
                  >
                    →
                  </span>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeader label="Technology Stack" title="Tools I actually build with" />
          <div className="mt-10 space-y-6">
            {stack.map((group, i) => (
              <Reveal
                key={group.group}
                delay={i * 50}
                className="grid gap-3 border-t border-border pt-5 sm:grid-cols-[180px_minmax(0,1fr)]"
              >
                <p className="label-mono pt-1">{group.group}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <SectionHeader label="About" title="Engineering background, operations instinct" />
          <Reveal className="min-w-0 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              I have a Computer Engineering background and IT / systems support experience. That
              combination is why I start with the workflow rather than the tooling — most
              operational problems are process problems before they are software problems.
            </p>
            <p>
              I build web applications, automate workflows, and integrate APIs. I use AI-assisted
              development to move quickly, and I validate the code that comes out of it rather than
              trusting it.
            </p>
            <Link to="/about" className="inline-flex text-sm font-medium text-primary hover:underline">
              More about how I work →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* RESUME CTA */}
      <section className="border-b border-border bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-6 sm:py-14">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Reviewing candidates?
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed opacity-70">
              The full resume — summary, experience, education, technical skills, and projects — is
              on one page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/resume"
              className="rounded-md bg-ink-foreground px-4 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              View & Print Resume (PDF)
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="label-mono">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Have a workflow worth improving?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I'm open to remote opportunities involving automation, systems, technical operations,
              and AI-powered tools.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={profile.links.email}
                className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Email Me
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                GitHub
              </a>
              <Link
                to="/resume"
                className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                View Resume
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
