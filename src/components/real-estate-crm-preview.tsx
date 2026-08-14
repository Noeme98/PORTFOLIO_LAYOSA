import { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, GitFork, Sliders, Layers } from "lucide-react";

export function RealEstateCRMPreview() {
  const [leadType, setLeadType] = useState<"Buying" | "Selling" | "None">("Buying");
  const [timeline, setTimeline] = useState<"0-3 months" | "3-6 months" | "6+ months">("0-3 months");
  const [financing, setFinancing] = useState<"Pre-approved / Cash" | "Not yet pre-approved">("Pre-approved / Cash");
  const [pipelineStage, setPipelineStage] = useState<"New Lead" | "Appointment Booked" | "Under Contract" | "Closed">("New Lead");

  // Calculate Lead Score & Segment
  let timelineScore = 20;
  if (timeline === "3-6 months") timelineScore = 10;
  else if (timeline === "6+ months") timelineScore = 5;

  const financingScore = financing === "Pre-approved / Cash" ? 15 : 5;
  const totalScore = leadType === "Selling" ? 30 : leadType === "None" ? 0 : timelineScore + financingScore;
  const segment = totalScore >= 30 ? "Hot" : totalScore >= 15 ? "Warm" : "Cold";

  return (
    <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm font-sans text-xs space-y-4">
      {/* Simulator Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
            <GitFork className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">GoHighLevel Workflow Logic Simulator</h4>
            <p className="text-[11px] text-muted-foreground">Select intake form fields below to test how the workflow routes and scores leads.</p>
          </div>
        </div>

        <span className="rounded-full bg-surface border border-border px-2.5 py-1 text-[11px] font-mono font-medium text-muted-foreground">
          GoHighLevel CRM Engine
        </span>
      </div>

      {/* Selectors Form */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 bg-surface/60 p-3 rounded-lg border border-border">
        {/* Field 1: Lead Type */}
        <div>
          <label className="text-[11px] font-medium text-foreground block mb-1">1. Lead Type</label>
          <select
            value={leadType}
            onChange={(e) => setLeadType(e.target.value as any)}
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
          >
            <option value="Buying">Buyer Lead</option>
            <option value="Selling">Seller Lead</option>
            <option value="None">Unspecified Intent</option>
          </select>
        </div>

        {/* Field 2: Buying Timeline */}
        {leadType === "Buying" ? (
          <div>
            <label className="text-[11px] font-medium text-foreground block mb-1">2. Buying Timeline</label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value as any)}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
            >
              <option value="0-3 months">0 - 3 Months (Ready Now) [+20 pts]</option>
              <option value="3-6 months">3 - 6 Months [+10 pts]</option>
              <option value="6+ months">6+ Months [+5 pts]</option>
            </select>
          </div>
        ) : (
          <div className="opacity-50">
            <label className="text-[11px] font-medium text-muted-foreground block mb-1">2. Buying Timeline</label>
            <div className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground">
              {leadType === "Selling" ? "Seller (Direct Route)" : "N/A"}
            </div>
          </div>
        )}

        {/* Field 3: Financing Status */}
        {leadType === "Buying" ? (
          <div>
            <label className="text-[11px] font-medium text-foreground block mb-1">3. Financing Status</label>
            <select
              value={financing}
              onChange={(e) => setFinancing(e.target.value as any)}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
            >
              <option value="Pre-approved / Cash">Pre-Approved / Cash Buyer [+15 pts]</option>
              <option value="Not yet pre-approved">Not Yet Pre-Approved [+5 pts]</option>
            </select>
          </div>
        ) : (
          <div className="opacity-50">
            <label className="text-[11px] font-medium text-muted-foreground block mb-1">3. Financing Status</label>
            <div className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground">
              {leadType === "Selling" ? "Seller (Direct Route)" : "N/A"}
            </div>
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-background border border-border font-mono font-bold text-sm text-foreground shadow-xs">
            {totalScore} <span className="text-[9px] text-muted-foreground ml-0.5">pts</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-foreground">
                {leadType === "Selling" ? "Seller Lead Track" : leadType === "None" ? "Fallback Admin Track" : `${segment} Buyer Segment`}
              </span>
              {segment === "Hot" && <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-medium text-[10px] border border-rose-500/30">Hot Lead</span>}
              {segment === "Warm" && <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-medium text-[10px] border border-amber-500/30">Warm Lead</span>}
              {segment === "Cold" && <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-medium text-[10px] border border-sky-500/30">Cold Lead</span>}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Assigned Pipeline: <span className="font-medium text-foreground">{leadType === "Selling" ? "Seller Leads Pipeline" : "Buyer Leads Pipeline"}</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-muted-foreground block font-mono">Assigned Nurture Track</span>
          <span className="font-medium text-xs text-primary">
            {leadType === "Selling" ? "Seller Nurture Cadence" : leadType === "None" ? "Staff Notification Alert" : `Buyer ${segment} Drip (Day 1 → Day 3 → Day 7)`}
          </span>
        </div>
      </div>

      {/* Execution Logic Steps */}
      <div className="space-y-2">
        <span className="text-[11px] font-medium text-muted-foreground font-mono block">Workflow Execution Steps:</span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {/* Step 1 */}
          <div className="rounded-lg border border-border bg-surface/60 p-3 space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-[10px] font-mono">
              <span>STEP 1</span>
              <span>Intake & Routing</span>
            </div>
            <p className="font-semibold text-foreground">
              {leadType === "Buying" ? "Route Buyer Path" : leadType === "Selling" ? "Route Seller Path" : "Route Fallback Path"}
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Creates CRM Opportunity & sends initial confirmation email.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-lg border border-border bg-surface/60 p-3 space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-[10px] font-mono">
              <span>STEP 2</span>
              <span>Qualification & Scoring</span>
            </div>
            <p className="font-semibold text-foreground">
              {leadType === "Selling" ? "Seller Evaluation" : `${totalScore} Total Lead Score`}
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Applies CRM tags (<code className="text-primary font-mono">{leadType === "Selling" ? "tag: seller-lead" : `tag: buyer-${segment.toLowerCase()}`}</code>).
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-lg border border-border bg-surface/60 p-3 space-y-1">
            <div className="flex items-center justify-between text-muted-foreground text-[10px] font-mono">
              <span>STEP 3</span>
              <span>State-Aware Nurture</span>
            </div>
            <p className="font-semibold text-foreground">Day 1 → Day 3 → Day 7</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Checks CRM stage before sending emails to avoid over-messaging.
            </p>
          </div>
        </div>
      </div>

      {/* CRM Stage Safety Check Selector */}
      <div className="rounded-lg border border-border bg-surface/40 p-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <div>
            <span className="font-medium text-xs text-foreground block">Test State-Aware Safety Check</span>
            <span className="text-[10px] text-muted-foreground">What happens when an agent moves the deal stage?</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          {(["New Lead", "Appointment Booked", "Under Contract"] as const).map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => setPipelineStage(stage)}
              className={`rounded px-2.5 py-1 border transition-all ${
                pipelineStage === stage
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Result Alert */}
      <div className={`p-2.5 rounded-lg border text-xs leading-relaxed ${
        pipelineStage === "New Lead"
          ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
          : "border-amber-500/30 bg-amber-950/20 text-amber-300"
      }`}>
        {pipelineStage === "New Lead" ? (
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span><strong>Active:</strong> Deal is in 'New Lead'. Workflow continues sending scheduled nurture emails.</span>
          </p>
        ) : (
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" />
            <span><strong>Stopped Automatically:</strong> Agent moved deal to '{pipelineStage}'. Workflow backs off and halts automated emails to prevent over-messaging.</span>
          </p>
        )}
      </div>
    </div>
  );
}
