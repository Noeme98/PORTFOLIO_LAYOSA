import { createFileRoute } from "@tanstack/react-router";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/site";

const title = "Contact — Automation & Solutions Engineer";
const description =
  "Open to remote opportunities in automation, technical operations, internal systems, and AI-powered tools. Get in touch by email, LinkedIn, or GitHub.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const links = [
    { label: "Email Me", href: profile.links.email, primary: true },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "GitHub", href: profile.links.github },
    { label: "Download Resume", href: profile.links.resumeFile },
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
      <Reveal className="min-w-0">
        <p className="label-mono">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Have a workflow worth improving?
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          I'm open to remote opportunities involving automation, systems, technical operations, and
          AI-powered tools.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={
                l.primary
                  ? "rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  : "rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:bg-secondary"
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        <dl className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
          <div>
            <dt className="label-mono">Availability</dt>
            <dd className="mt-1 text-sm">{profile.status}</dd>
          </div>
          <div>
            <dt className="label-mono">Location</dt>
            <dd className="mt-1 text-sm">{profile.location}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="label-mono">Contact details</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              Email: {profile.email} · Phone / WhatsApp: {profile.phone}
            </dd>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={80} className="min-w-0">
        <ArchitectureDiagram
          caption="How a request turns into a working system."
          nodes={[
            { label: "Request", kind: "input", detail: "What needs to change" },
            { label: "Scoping call", kind: "app", detail: "Current workflow, constraints" },
            { label: "Prototype", kind: "automation", detail: "Smallest working version" },
            { label: "Feedback", kind: "data", detail: "Tested against real cases" },
            { label: "Shipped system", kind: "output", detail: "Documented and handed over" },
          ]}
        />
      </Reveal>
    </div>
  );
}

