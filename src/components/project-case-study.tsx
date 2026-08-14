import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ClinicFlowDashboardPreview } from "@/components/clinicflow-dashboard-preview";
import { LeadFlowWorkflowPreview } from "@/components/leadflow-workflow-preview";
import { ReceptionSystemPreview } from "@/components/reception-system-preview";
import { RealEstateCRMPreview } from "@/components/real-estate-crm-preview";
import { Reveal } from "@/components/reveal";
import { WorkflowDiagramTabs } from "@/components/workflow-diagram-tabs";
import type { Project } from "@/data/projects";
import { profile } from "@/data/site";
import { ZoomIn, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

/** Section wrapper — numbered label on the left, content on the right. */
function Block({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="border-t border-border py-12 lg:py-16">
      <div className="grid gap-6 lg:gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div>
          <p className="label-mono">{label}</p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">{heading}</h2>
        </div>
        <div className="min-w-0 text-sm leading-relaxed text-muted-foreground sm:text-base space-y-4">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 items-start">
          <span className="label-mono shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** PROBLEM → SYSTEM → AUTOMATION → OUTCOME strip. */
function NarrativeStrip({ project }: { project: Project }) {
  const steps = [
    ["Problem", project.problem],
    ["System", project.system],
    ["Automation", project.automation],
    ["Outcome", project.result],
  ] as const;

  return (
    <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(([label, value], i) => (
        <li
          key={label}
          className="relative rounded-xl border border-border bg-surface p-5 shadow-soft"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="label-mono">{label}</p>
            <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{value}</p>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-1/2 z-10 hidden -translate-x-1/2 text-border-strong sm:block lg:bottom-1/2 lg:left-auto lg:-right-3 lg:translate-x-0 lg:translate-y-1/2"
            >
              <span className="block lg:hidden">↓</span>
              <span className="hidden lg:block">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * Reusable case study layout. Every section is driven by the project
 * record, so adding a project renders a complete case study.
 */
export function ProjectCaseStudy({ project, next }: { project: Project; next: Project | null }) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : project.screenshots.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev !== null && prev < project.screenshots.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, project.screenshots.length]);

  return (
    <article>
      <header className="relative border-b border-border">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl xl:max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
          <Link to="/projects" className="label-mono transition-colors hover:text-foreground">
            ← All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-[11px]">
              {project.category}
            </span>
            {project.placeholder && (
              <span className="rounded-md border border-dashed border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
                Placeholder content
              </span>
            )}
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{project.name}</h1>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground text-base sm:text-lg">{project.summary}</p>

          <NarrativeStrip project={project} />
        </div>
      </header>

      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 pb-20 sm:px-8">
        <Block label="01" heading="Project Overview">
          <p>{project.overview}</p>
        </Block>

        <Block label="02" heading="The Problem">
          <p>{project.problem}</p>
        </Block>

        <Block label="03" heading="Existing Workflow">
          <List items={project.existingWorkflow} />
        </Block>

        <Block label="04" heading="Proposed Workflow">
          <List items={project.proposedWorkflow} />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {project.solution.map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed">
                {s}
              </div>
            ))}
          </div>
        </Block>

        <Block label="05" heading="Architecture Diagrams & Workflow Logic">
          {project.slug === "real-estate-lead-engine" ? (
            <WorkflowDiagramTabs />
          ) : (
            <ArchitectureDiagram nodes={project.diagram} caption="How data moves through the system." />
          )}
          <div className="mt-8">
            <p className="label-mono mb-3">How it works</p>
            <List items={project.howItWorks} />
          </div>
        </Block>

        <Block label="06" heading="Key Features">
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <li key={i} className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed">
                {f}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="07" heading="Automation Workflow">
          <List items={project.automationWorkflow} />
        </Block>

        <Block label="08" heading="AI Components">
          <List items={project.aiComponents} />
        </Block>

        <Block label="09" heading="Database / Backend">
          <List items={project.backend} />
        </Block>

        <Block label="10" heading="Technologies">
          <ul className="flex flex-wrap gap-2.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs"
              >
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="11" heading="Screenshots & System Evidence">
          <div className="space-y-10">
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs font-mono text-amber-200/90 leading-relaxed space-y-1 shadow-xs">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                <span>ℹ️ Builder Screenshot Resolution & Interactive Diagrams Note</span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                Due to wide-canvas zooming and high node density within the native GoHighLevel builder interface, some workflow canvas screenshots may appear zoomed-out or compact. For full step-by-step logic clarity, refer to the <strong>High-Resolution Architecture Diagrams</strong> in Section 05 or click any screenshot below to expand in full resolution.
              </p>
            </div>

            <p className="text-xs text-muted-foreground font-mono">
              💡 Click any screenshot to view in full resolution or open in a new tab.
            </p>

            {(() => {
              const hasGroups = project.screenshots.some((s) => s.workflowGroup);
              
              if (!hasGroups) {
                return (
                  <div className="grid gap-8 sm:grid-cols-2">
                    {project.screenshots.map((s, i) => (
                      <figure
                        key={i}
                        onClick={() => s.image && setActiveImageIndex(i)}
                        className={`group relative overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all ${
                          s.image ? "cursor-pointer hover:border-emerald-500/50 hover:shadow-lift" : ""
                        }`}
                      >
                        {s.image ? (
                          <div className="relative">
                            <img
                              src={s.image}
                              alt={s.caption}
                              className="w-full h-auto object-cover border-b border-border transition-transform duration-300 group-hover:scale-[1.01]"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-xs">
                              <ZoomIn className="h-4 w-4 text-emerald-400" />
                              <span>Click to Enlarge</span>
                            </div>
                            <figcaption className="p-4 sm:p-5 text-xs font-mono font-medium text-muted-foreground bg-surface group-hover:text-foreground transition-colors leading-relaxed">
                              {s.caption}
                            </figcaption>
                          </div>
                        ) : (
                          <div className="p-8 text-center">
                            <figcaption className="text-xs text-muted-foreground">{s.caption}</figcaption>
                          </div>
                        )}
                      </figure>
                    ))}
                  </div>
                );
              }

              const groups: Record<string, { item: (typeof project.screenshots)[number]; globalIndex: number }[]> = {};
              project.screenshots.forEach((s, idx) => {
                const groupName = s.workflowGroup || "General Screenshots";
                if (!groups[groupName]) groups[groupName] = [];
                groups[groupName].push({ item: s, globalIndex: idx });
              });

              return (
                <div className="space-y-12">
                  {Object.entries(groups).map(([groupTitle, groupItems]) => (
                    <div key={groupTitle} className="space-y-4">
                      <div className="flex items-center gap-3 border-b border-border/80 pb-2">
                        <span className="font-mono text-sm font-bold text-foreground tracking-tight">{groupTitle}</span>
                        <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                          {groupItems.length} Screenshots
                        </span>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        {groupItems.map(({ item: s, globalIndex }) => (
                          <figure
                            key={globalIndex}
                            onClick={() => s.image && setActiveImageIndex(globalIndex)}
                            className={`group relative overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all ${
                              s.image ? "cursor-pointer hover:border-emerald-500/50 hover:shadow-lift" : ""
                            }`}
                          >
                            {s.image ? (
                              <div className="relative">
                                <img
                                  src={s.image}
                                  alt={s.caption}
                                  className="w-full h-auto object-cover border-b border-border transition-transform duration-300 group-hover:scale-[1.01]"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-xs">
                                  <ZoomIn className="h-4 w-4 text-emerald-400" />
                                  <span>Click to Enlarge</span>
                                </div>
                                <figcaption className="p-4 sm:p-5 text-xs font-mono font-medium text-muted-foreground bg-surface group-hover:text-foreground transition-colors leading-relaxed">
                                  {s.caption}
                                </figcaption>
                              </div>
                            ) : (
                              <div className="p-8 text-center">
                                <figcaption className="text-xs text-muted-foreground">{s.caption}</figcaption>
                              </div>
                            )}
                          </figure>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {project.slug === "clinicflow" && (
              <div className="pt-10 border-t border-border mt-8">
                <p className="label-mono mb-4">Interactive ClinicFlow Platform Sandbox</p>
                <ClinicFlowDashboardPreview />
              </div>
            )}

            {project.slug === "leadflow" && (
              <div className="pt-10 border-t border-border mt-8">
                <p className="label-mono mb-4">Interactive LeadFlow n8n Automation Canvas & Simulator</p>
                <LeadFlowWorkflowPreview />
              </div>
            )}

            {project.slug === "real-estate-lead-engine" && (
              <div className="pt-10 border-t border-border mt-8">
                <p className="label-mono mb-4">Interactive GoHighLevel Real Estate CRM Simulator</p>
                <RealEstateCRMPreview />
              </div>
            )}

            {project.slug === "automated-document-reception-system" && (
              <div className="pt-10 border-t border-border mt-8">
                <p className="label-mono mb-4">Interactive Document Reception & ESP32-CAM Simulator</p>
                <ReceptionSystemPreview />
              </div>
            )}
          </div>
        </Block>

        <Block label="12" heading="Technical Challenges">
          <List items={project.challenges} />
        </Block>

        <Block label="13" heading="What I Learned">
          <List items={project.learned} />
        </Block>

        <Block label="14" heading="Business Value">
          <List items={project.businessValue} />
        </Block>

        <Block label="15" heading="Demo & Source">
          <div className="flex flex-wrap gap-3">
            <a
              href={project.demoUrl ?? undefined}
              aria-disabled={!project.demoUrl}
              className={`rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium ${
                project.demoUrl ? "hover:bg-secondary" : "pointer-events-none opacity-50"
              }`}
            >
              {project.demoUrl ? "Live Demo" : "Live Demo — [link pending]"}
            </a>
            <a
              href={project.repoUrl ?? undefined}
              aria-disabled={!project.repoUrl}
              className={`rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium ${
                project.repoUrl ? "hover:bg-secondary" : "pointer-events-none opacity-50"
              }`}
            >
              {project.repoUrl ? "GitHub" : "GitHub — [link pending]"}
            </a>
            <a
              href={profile.links.email}
              className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Ask me about this project
            </a>
          </div>
        </Block>

        {next && (
          <Reveal as="section" className="border-t border-border py-10">
            <p className="label-mono">Next project</p>
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group mt-3 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
            >
              <span className="min-w-0">
                <span className="block text-lg font-semibold tracking-tight">{next.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{next.category}</span>
              </span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 font-sans animate-in fade-in duration-200">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-white">
            <div className="min-w-0 pr-4">
              <h3 className="text-sm sm:text-base font-bold font-mono truncate">
                {project.screenshots[activeImageIndex]?.caption}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Screenshot {activeImageIndex + 1} of {project.screenshots.length}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {project.screenshots[activeImageIndex]?.image && (
                <a
                  href={project.screenshots[activeImageIndex]?.image}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 hover:text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open Full File</span>
                </a>
              )}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
          <div className="relative flex-1 flex items-center justify-center py-4 overflow-hidden">
            {/* Previous Button */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : project.screenshots.length - 1))
              }
              className="absolute left-2 sm:left-4 z-10 rounded-full bg-slate-900/80 border border-slate-800 p-3 text-white hover:bg-slate-800 transition-colors backdrop-blur-xs"
              title="Previous Screenshot (Left Arrow)"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Main High-Res Image View */}
            {project.screenshots[activeImageIndex]?.image && (
              <img
                src={project.screenshots[activeImageIndex].image}
                alt={project.screenshots[activeImageIndex].caption}
                className="max-h-[82vh] max-w-[94vw] object-contain rounded-lg border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200"
              />
            )}

            {/* Next Button */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev !== null && prev < project.screenshots.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-2 sm:right-4 z-10 rounded-full bg-slate-900/80 border border-slate-800 p-3 text-white hover:bg-slate-800 transition-colors backdrop-blur-xs"
              title="Next Screenshot (Right Arrow)"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
