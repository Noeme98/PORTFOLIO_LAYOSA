import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";
import { FlowPreview } from "@/components/flow-preview";
import { ClinicFlowDashboardPreview } from "@/components/clinicflow-dashboard-preview";
import { LeadFlowWorkflowPreview } from "@/components/leadflow-workflow-preview";
import { ReceptionSystemPreview } from "@/components/reception-system-preview";
import { IHOMISMigrationPreview } from "@/components/ihomis-migration-preview";
import { RealEstateCRMPreview } from "@/components/real-estate-crm-preview";
import { ServiceM8WorkflowPreview } from "@/components/servicem8-workflow-preview";
import { ScaledLandscapePreview } from "@/components/scaled-landscape-preview";
import { ArrowRight, Image as ImageIcon, Network, Sparkles, Zap } from "lucide-react";

/**
 * Render the live interactive system logic component for each project slug.
 */
function renderLiveLogic(slug: string) {
  switch (slug) {
    case "servicem8-job-management-clickup":
      return <ServiceM8WorkflowPreview />;
    case "automated-document-reception-system":
      return <ReceptionSystemPreview />;
    case "clinicflow":
      return <ClinicFlowDashboardPreview />;
    case "real-estate-lead-engine":
      return <RealEstateCRMPreview />;
    case "leadflow":
      return <LeadFlowWorkflowPreview />;
    case "ihomis-patient-data-migration":
      return <IHOMISMigrationPreview />;
    default:
      return null;
  }
}

/**
 * Project card: name, category, live interactive system logic preview,
 * architecture diagram, screenshot mockup, problem/system narrative, tech tags, and case-study link.
 */
export function ProjectCard({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<"logic" | "diagram" | "screenshot">("logic");

  return (
    <article className="group flex h-full min-w-0 w-full max-w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/90 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift hover:shadow-primary/5">
      {/* Top Preview Header Section */}
      <div className="relative min-w-0 w-full max-w-full overflow-hidden border-b border-border/80 bg-background/90 p-4 sm:p-5">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        
        {/* View Toggle Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3">
          <span className="label-mono flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <Zap className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            {activeTab === "logic"
              ? "Live System Logic"
              : activeTab === "diagram"
              ? "System Architecture"
              : "Screenshot Preview"}
          </span>

          <div className="flex items-center rounded-lg border border-border/80 bg-secondary/80 p-0.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("logic")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                activeTab === "logic"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Zap className="h-3 w-3" />
              <span>Live Logic</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("diagram")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                activeTab === "diagram"
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Network className="h-3 w-3" />
              <span>Flow</span>
            </button>

            {project.thumbnail && (
              <button
                type="button"
                onClick={() => setActiveTab("screenshot")}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-all ${
                  activeTab === "screenshot"
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ImageIcon className="h-3 w-3" />
                <span>Mockup</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="relative z-0 min-w-0 w-full max-w-full">
          {activeTab === "logic" ? (
            <ScaledLandscapePreview title={`${project.name} — Live System Logic`}>
              {renderLiveLogic(project.slug)}
            </ScaledLandscapePreview>
          ) : activeTab === "diagram" ? (
            <div className="mt-1 min-h-[160px] flex items-center justify-center p-3 rounded-xl border border-border/60 bg-muted/20">
              <FlowPreview nodes={project.diagram} />
            </div>
          ) : (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/60 bg-muted/40">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={`${project.name} thumbnail`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4 text-center">
                  <span className="font-mono text-xs text-muted-foreground">No Screenshot Available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60" />
            </div>
          )}
        </div>
      </div>

      {/* Card Content Body */}
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
