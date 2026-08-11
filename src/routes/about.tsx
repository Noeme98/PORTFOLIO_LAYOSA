import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { profile, stack } from "@/data/site";

const title = "About — Computer Engineering, IT Support & Automation";
const description =
  "Computer Engineering background, IT and systems support experience, web application development, workflow automation, technical troubleshooting, and AI-assisted development.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  ["Computer Engineering background", "Hardware-to-software fundamentals, not just frameworks."],
  ["IT / systems support experience", "Real exposure to how systems fail in day-to-day operations."],
  ["Web application development", "React and Vite applications built around actual workflows."],
  ["Automation work", "Scheduled jobs, webhooks, and integrations that reduce manual steps."],
  ["Technical troubleshooting", "Tracing a failure across tools until the root cause is found."],
  ["AI-assisted development", "Faster delivery, with code validation instead of blind trust."],
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal as="header" className="max-w-2xl">
        <p className="label-mono">About</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          I build practical systems that solve real operational problems.
        </h1>
      </Reveal>

      <Reveal className="mt-8 max-w-2xl space-y-4 leading-relaxed text-muted-foreground">
        <p>
          My work sits between engineering and operations. I come from a Computer Engineering
          background with IT and systems support experience, which is where I learned that most
          "software problems" are really process problems that were never mapped.
        </p>
        <p>
          Today I build web applications, automate workflows, and connect systems through APIs. I
          treat AI as a component with defined inputs, outputs, and review steps — not as a
          substitute for engineering judgement — and I validate what AI-assisted development
          produces before it ships.
        </p>
        <p>
          Currently {profile.status.toLowerCase()}, based in {profile.location}.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {pillars.map(([t, d], i) => (
          <Reveal as="li" key={t} delay={i * 40} className="bg-surface p-6">
            <h2 className="text-base font-semibold tracking-tight">{t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </ul>

      <section className="mt-14">
        <Reveal>
          <p className="label-mono">Technology</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">What I work with</h2>
        </Reveal>
        <div className="mt-8 space-y-5">
          {stack.map((group, i) => (
            <Reveal
              key={group.group}
              delay={i * 40}
              className="grid gap-3 border-t border-border pt-5 sm:grid-cols-[180px_minmax(0,1fr)]"
            >
              <p className="label-mono pt-1">{group.group}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-14 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          View Projects
        </Link>
        <Link
          to="/resume"
          className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-secondary"
        >
          Open Resume
        </Link>
      </Reveal>
    </div>
  );
}
