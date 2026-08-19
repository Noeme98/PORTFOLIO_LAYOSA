import { createFileRoute, Link } from "@tanstack/react-router";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";
import { capabilities, process, profile, stack } from "@/data/site";
import {
  Sparkles,
  Zap,
  Award,
  CheckCircle2,
  ArrowRight,
  Database,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Globe,
  FileCode,
} from "lucide-react";

const title = "Neil Francis Layosa — Automation Specialist | IT Support | Web Developer";
const description =
  "Computer Engineering graduate specializing in workflow automation, IT support, internal hospital systems, web application development, and API integrations.";

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
          jobTitle: profile.role,
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
      <p className="label-mono flex items-center gap-1.5 text-sky-400">
        <Sparkles className="h-3.5 w-3.5" />
        {label}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">{heading}</h2>
      {intro && <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">{intro}</p>}
    </Reveal>
  );
}

function Home() {
  return (
    <>
      {/* HERO SECTION WITH IMPACT METRICS */}
      <section className="relative border-b border-border bg-gradient-to-b from-background via-background/95 to-surface/40 overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        
        {/* Glow ambient background spot */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl bg-sky-500/10 blur-[120px] rounded-full" />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
            <div className="min-w-0 space-y-6">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs text-emerald-300 font-mono shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{profile.status}</span>
              </div>

              {/* Main Headline */}
              <div>
                <p className="label-mono font-bold text-sky-400 tracking-widest">{profile.role}</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[3.25rem]">
                  I build systems that turn repetitive work into reliable workflows.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-xl">
                  {profile.tagline} Experienced in automating patient record migrations, web systems, RPA, n8n, APIs, and hands-on IT troubleshooting across hospital departments.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/80 px-5 py-3 text-sm font-semibold transition-all duration-200 hover:border-border-strong hover:bg-secondary backdrop-blur-xs"
                >
                  <span>View Resume</span>
                </Link>
              </div>
            </div>

            {/* Architecture Flow Preview */}
            <div className="min-w-0">
              <ArchitectureDiagram />
            </div>
          </div>

          {/* 4 PROOF / IMPACT METRICS GRID */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-border/80 pt-10">
            <div className="rounded-xl border border-border/80 bg-surface/60 p-4 space-y-1 backdrop-blur-xs hover:border-sky-500/40 transition-colors">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold">
                <Database className="h-4 w-4" /> 4,000+ Records
              </div>
              <p className="text-xl font-bold text-foreground font-mono">Excel → IHOMIS</p>
              <p className="text-xs text-muted-foreground">Automated patient record data migration with UI.Vision RPA</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-surface/60 p-4 space-y-1 backdrop-blur-xs hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                <Zap className="h-4 w-4" /> 400 / day
              </div>
              <p className="text-xl font-bold text-foreground font-mono">Processing Speed</p>
              <p className="text-xs text-muted-foreground">Increased capacity from 100-150 records/day manually</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-surface/60 p-4 space-y-1 backdrop-blur-xs hover:border-amber-500/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                <Award className="h-4 w-4" /> Best Thesis
              </div>
              <p className="text-xl font-bold text-foreground font-mono">Award Winner</p>
              <p className="text-xs text-muted-foreground">Automated IoT Document Reception & Email Notification System</p>
            </div>

            <div className="rounded-xl border border-border/80 bg-surface/60 p-4 space-y-1 backdrop-blur-xs hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
                <ShieldCheck className="h-4 w-4" /> 10+ Departments
              </div>
              <p className="text-xl font-bold text-foreground font-mono">Hospital IT Support</p>
              <p className="text-xs text-muted-foreground">2 web systems & 2 automations built within first 2 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS (ALL 4 PROJECTS) */}
      <section id="projects" className="border-b border-border py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeader
              label="Featured Case Studies"
              title="Problem → System Architecture → Measurable Outcome"
              intro="Proven technical implementations combining web development, RPA, IoT microcontrollers, n8n automations, and AI integrations."
            />
            <Reveal>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                All {projects.length} projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 min-w-0 w-full">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} as="div" className="min-w-0 w-full">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I BUILD / CAPABILITIES */}
      <section id="capabilities" className="border-b border-border bg-surface/60 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            label="Technical Capabilities"
            title="Core Technical Problem-Solving Areas"
            intro="Specialized engineering capabilities focused on operational efficiency, systems integration, and practical software solutions."
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal
                as="li"
                key={c.id}
                delay={i * 50}
                className="group rounded-2xl border border-border/80 bg-background/90 p-6 shadow-xs hover:border-primary/40 hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 font-mono text-sm font-bold">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Capability
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{c.problem}</p>
                  <p className="text-sm leading-relaxed text-foreground/90 pt-1">{c.detail}</p>
                </div>

                <div className="mt-6 border-t border-border/80 pt-4">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Key Tools & Deliverables:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-md bg-secondary/80 px-2 py-0.5 font-mono text-[10px] text-secondary-foreground"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="border-b border-border py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            label="Engineering Methodology"
            title="Systematic 5-Step Execution Workflow"
            intro="How I transition manual administrative bottlenecks into documented, reliable production systems."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 60}
                className="rounded-2xl border border-border/80 bg-surface/80 p-5 space-y-3"
              >
                <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">STEP {step.step}</span>
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* TECHNICAL SKILLS STACK GRID */}
      <section className="border-b border-border py-16 sm:py-24 bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            label="Technical Stack"
            title="Tools, Frameworks & Platforms"
            intro="Demonstrated technical stack used across healthcare systems, web applications, and automation pipelines."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((group) => (
              <Reveal
                key={group.group}
                className="rounded-2xl border border-border/80 bg-background/80 p-5 space-y-3"
              >
                <h4 className="text-sm font-bold font-mono text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  {group.group}
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border/80 bg-surface px-2.5 py-1 font-mono text-xs text-foreground font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & CTA */}
      <section id="contact" className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-3xl rounded-3xl border border-primary/30 bg-gradient-to-br from-surface via-background to-primary/5 p-8 sm:p-12 shadow-lift">
            <p className="label-mono flex items-center gap-1.5 text-sky-400">
              <Globe className="h-4 w-4" /> Ready to Collaborate
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Have an operational workflow worth automating?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-sm sm:text-base">
              I'm open to remote opportunities involving workflow automation, IT support, internal systems development, and AI-assisted tools across US, UK, and AU business hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.links.email}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
              >
                <span>Email Me Directly</span>
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                LinkedIn Profile
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                GitHub Repositories
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
