import { useState } from "react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import type { DiagramNode } from "@/data/projects";
import { GitFork, ShieldCheck, Star, Zap, Layers } from "lucide-react";

export interface WorkflowDiagramData {
  id: string;
  title: string;
  badge: string;
  icon: typeof GitFork;
  caption: string;
  nodes: DiagramNode[];
}

export const realEstateWorkflowDiagrams: WorkflowDiagramData[] = [
  {
    id: "lead-router",
    title: "1. Real Estate Lead Router Workflow",
    badge: "Intake & Routing",
    icon: GitFork,
    caption: "Captures form submission, evaluates Lead Type (Buyer/Seller), applies Timeline (+20/+10/+5) and Financing (+15/+5) scoring, and routes to pipeline.",
    nodes: [
      { label: "Form Submitted", kind: "input", detail: "Custom Buyer & Seller Intake Form Trigger" },
      { label: "Route by Lead Type", kind: "automation", detail: "Condition: Buying vs Selling vs Fallback None" },
      { label: "Create Opportunity & Email", kind: "data", detail: "Generates opportunity in CRM pipeline & sends intake email" },
      { label: "Timeline Condition Check", kind: "automation", detail: "Evaluates timeline: 0-3m (+20), 3-6m (+10), 6+m (+5)" },
      { label: "Financing Status Condition Check", kind: "ai", detail: "Evaluates financing: Pre-Approved (+15), Cash (+15), Unapproved (+5)" },
      { label: "Update Contact Field", kind: "app", detail: "Applies qualification tags & calculates Lead Score" },
      { label: "Route to Nurture Workflow", kind: "output", detail: "Enrolls lead into Hot (≥30), Warm (15-29), or Cold (<15) track" },
    ],
  },
  {
    id: "buyer-nurture",
    title: "2. Buyer Nurture Drip Workflow (Day 1/3/7)",
    badge: "State-Aware Buyer Drip",
    icon: ShieldCheck,
    caption: "Executes Hot/Warm/Cold nurture emails with CRM pipeline state checks before every send (stops if agent moves deal out of 'New Lead').",
    nodes: [
      { label: "Opportunity Created", kind: "input", detail: "Buyer Pipeline opportunity trigger" },
      { label: "Lead Score Segmentation", kind: "ai", detail: "Evaluates score threshold: Hot (≥30), Warm (15-29), Cold (<15)" },
      { label: "Day 1 Nurture Email", kind: "output", detail: "Dispatches initial value & property guide email" },
      { label: "Wait 2 Days", kind: "automation", detail: "Delay timer before next drip email" },
      { label: "State-Aware Stall Check #1", kind: "data", detail: "Condition: If 'Pipeline stage' is not '[Buyer Leads] - New Lead'" },
      { label: "Day 3 Nurture Email", kind: "output", detail: "Dispatches market updates & booking prompt (if still New Lead)" },
      { label: "Wait 4 Days", kind: "automation", detail: "Delay timer before final drip email" },
      { label: "State-Aware Stall Check #2", kind: "data", detail: "Condition: If 'Pipeline stage' is not '[Buyer Leads] - New Lead'" },
      { label: "Day 7 Nurture Email", kind: "output", detail: "Dispatches final follow-up email (if still New Lead)" },
    ],
  },
  {
    id: "seller-nurture",
    title: "3. Seller Nurture Drip Workflow",
    badge: "State-Aware Seller Drip",
    icon: Zap,
    caption: "Seller-specific nurture path providing comparative market analysis (CMA) tips and listing advice with state-aware stall checks.",
    nodes: [
      { label: "Opportunity Created", kind: "input", detail: "Seller Pipeline opportunity trigger" },
      { label: "Seller Intake Email", kind: "output", detail: "Home evaluation request confirmation email" },
      { label: "Wait 2 Days", kind: "automation", detail: "Delay timer before next seller email" },
      { label: "State-Aware Stall Check #1", kind: "data", detail: "Condition: If 'Pipeline stage' is not '[Seller Leads] - New Lead'" },
      { label: "Seller Nurture Email #2", kind: "output", detail: "Dispatches home staging & CMA pricing tips" },
      { label: "Wait 4 Days", kind: "automation", detail: "Delay timer before final seller drip" },
      { label: "State-Aware Stall Check #2", kind: "data", detail: "Condition: If 'Pipeline stage' is not '[Seller Leads] - New Lead'" },
      { label: "Seller Nurture Email #3", kind: "output", detail: "Dispatches listing strategy & consultation link" },
      { label: "Add Tag: seller-nurture-completed", kind: "app", detail: "Updates contact status tags in CRM" },
    ],
  },
  {
    id: "no-show",
    title: "4. No-Show Re-engagement Workflow",
    badge: "No-Show Recovery",
    icon: ShieldCheck,
    caption: "Triggers when appointment status changes to No-Show, waiting for a grace period before dispatching an automated rescheduling link.",
    nodes: [
      { label: "Appointment Status == No-Show", kind: "input", detail: "Missed meeting trigger in calendar engine" },
      { label: "Wait Grace Period", kind: "automation", detail: "Allows staff buffer time post-appointment" },
      { label: "Send Reschedule Recovery Email", kind: "output", detail: "Dispatches friendly re-engagement message with booking link" },
      { label: "Workflow End", kind: "app", detail: "Awaits new appointment booking" },
    ],
  },
  {
    id: "post-close",
    title: "5. Post-Close Referral & Review Loop",
    badge: "Lifecycle & Referrals",
    icon: Star,
    caption: "Triggers 2 days after deal closure to collect 5-star reviews and send referral reward links.",
    nodes: [
      { label: "Dual Pipeline Stage Changed Triggers (Closed Stage)", kind: "input", detail: "Buyer Leads - Closed or Seller Leads - Closed deal trigger" },
      { label: "Wait Grace Period", kind: "automation", detail: "Post-closing buffer timer" },
      { label: "Send Review Request Email", kind: "output", detail: "Asks client for 5-star Google/Zillow review feedback" },
      { label: "Wait Review Check Timer", kind: "automation", detail: "Allows client time to write review" },
      { label: "Condition Gate: If 'Review Left' is 'Yes'", kind: "data", detail: "Evaluates contact review submission status" },
      { label: "Branch 1 (True): Send Thank-You & Referral Link Email", kind: "output", detail: "Rewards client & dispatches referral link" },
      { label: "Branch 2 (None): Send Friendly Review Reminder Email", kind: "output", detail: "Follows up gently if review not yet submitted" },
    ],
  },
  {
    id: "weekly-report",
    title: "6. Weekly Performance Summary Report",
    badge: "Executive Reporting",
    icon: Layers,
    caption: "Automated weekly reporting workflow compiled from GoHighLevel opportunity pipelines, conversion funnels, and lead score analytics.",
    nodes: [
      { label: "Contact Tag Added: 'trigger weekly report'", kind: "input", detail: "Cron/schedule automated reporting trigger" },
      { label: "Compile Pipeline & Funnel Metrics", kind: "data", detail: "Aggregates Buyer & Seller stage distribution, open deals, and conversion rates" },
      { label: "Send Weekly Performance Email", kind: "output", detail: "Dispatches summary report to sales executive team" },
      { label: "Workflow End", kind: "app", detail: "Resets for next scheduled reporting cycle" },
    ],
  },
];

export function WorkflowDiagramTabs() {
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>("lead-router");

  const defaultDiagram = realEstateWorkflowDiagrams[0] ?? {
    id: "lead-router",
    title: "1. Real Estate Lead Router Workflow",
    badge: "Intake & Routing",
    icon: GitFork,
    caption: "Captures form submission and routes to pipeline.",
    nodes: [],
  };

  const activeDiagram = realEstateWorkflowDiagrams.find((w) => w.id === activeWorkflowId) ?? defaultDiagram;
  const IconComponent = activeDiagram.icon;

  return (
    <div className="space-y-4">
      {/* Workflow Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
        {realEstateWorkflowDiagrams.map((w) => {
          const TabIcon = w.icon;
          const isActive = w.id === activeWorkflowId;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => setActiveWorkflowId(w.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-mono transition-all ${
                isActive
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                  : "border-border/60 bg-surface/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              <TabIcon className={`h-3.5 w-3.5 ${isActive ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
              <span>{w.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Diagram Canvas */}
      <div className="rounded-xl border border-border/80 bg-background/95 p-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-border/60">
          <h4 className="font-semibold text-sm text-foreground tracking-tight flex items-center gap-2">
            <IconComponent className="h-4 w-4 text-sky-400" />
            <span>{activeDiagram.title}</span>
          </h4>
          <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
            {activeDiagram.nodes.length} Connected Nodes
          </span>
        </div>

        <p className="text-xs text-muted-foreground font-sans mb-4 leading-relaxed">
          {activeDiagram.caption}
        </p>

        {/* High-Resolution Diagram Visualizer */}
        <ArchitectureDiagram nodes={activeDiagram.nodes} caption={activeDiagram.caption} />
      </div>
    </div>
  );
}
