import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";
import { profile, resume, stack } from "@/data/site";
import { Printer } from "lucide-react";

const title = "Resume — Neil Francis Layosa";
const description =
  "Professional summary, experience, education, technical skills, and projects for Neil Francis Layosa — Automation Specialist | IT Support | Web Developer.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/resume" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-5 border-t border-border py-8 lg:grid-cols-[200px_minmax(0,1fr)]">
      <h2 className="label-mono pt-1">{label}</h2>
      <div className="min-w-0">{children}</div>
    </Reveal>
  );
}

function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal as="header" className="flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="label-mono">Resume</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {profile.role} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 no-print">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-secondary"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </button>
        </div>
      </Reveal>

      <div className="mt-10">
        <Section label="Professional Summary">
          <p className="leading-relaxed text-muted-foreground">{resume.summary}</p>
        </Section>

        <Section label="Core Competencies">
          <ul className="flex flex-wrap gap-2">
            {resume.strengths.map((s) => (
              <li
                key={s}
                className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Experience">
          <ol className="space-y-8">
            {resume.experience.map((job, i) => (
              <li key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight">
                    {job.role} — {job.org}
                  </h3>
                  <span className="label-mono">{job.period}</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {job.points.map((p, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-border-strong">
                        —
                      </span>
                      <span className="min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Education & Eligibility">
          <ol className="space-y-6">
            {resume.education.map((ed, i) => (
              <li key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight">
                    {ed.degree} — {ed.org}
                  </h3>
                  <span className="label-mono">{ed.period}</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {ed.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Technical Skills">
          <div className="space-y-4">
            {stack.map((group) => (
              <div key={group.group}>
                <p className="text-sm font-medium">{group.group}</p>
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-muted-foreground">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Remote Work Readiness">
          <div className="grid gap-4 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
            <div>
              <p className="font-semibold text-foreground">Equipment</p>
              <p className="mt-1">{resume.remoteReadiness.equipment}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Internet & Connectivity</p>
              <p className="mt-1">{resume.remoteReadiness.internet}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Availability</p>
              <p className="mt-1">{resume.remoteReadiness.availability}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Languages</p>
              <p className="mt-1">{resume.remoteReadiness.languages.join(" · ")}</p>
            </div>
          </div>
        </Section>

        <Section label="Projects">
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p.slug} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold">{p.name}</h3>
                  <span className="label-mono">{p.category}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
                >
                  Case study →
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Contact">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Email: {profile.email}</li>
            <li>Phone / WhatsApp: {profile.phone}</li>
            <li>LinkedIn: {profile.links.linkedin}</li>
            <li>GitHub: {profile.links.github}</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

