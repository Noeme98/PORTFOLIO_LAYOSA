import type { DiagramNode, NodeKind } from "@/data/projects";

const kindMeta: Record<NodeKind, { tag: string; ring: string; dot: string }> = {
  input: { tag: "IN", ring: "border-border-strong", dot: "bg-muted-foreground" },
  app: { tag: "APP", ring: "border-border-strong", dot: "bg-foreground" },
  automation: { tag: "AUTO", ring: "border-primary/45", dot: "bg-primary" },
  ai: { tag: "AI", ring: "border-primary/60", dot: "bg-primary" },
  data: { tag: "DB", ring: "border-border-strong", dot: "bg-accent-foreground" },
  output: { tag: "OUT", ring: "border-primary/45", dot: "bg-primary" },
};

const defaultNodes: DiagramNode[] = [
  { label: "User", kind: "input", detail: "Starts the process" },
  { label: "Web Application", kind: "app", detail: "Interface and validation" },
  { label: "Database", kind: "data", detail: "Records and run history" },
  { label: "Automation", kind: "automation", detail: "Scheduled or webhook driven" },
  { label: "AI / API", kind: "ai", detail: "Structured, checked output" },
  { label: "Email / Dashboard", kind: "output", detail: "What the team receives" },
];

/**
 * Vertical system flow diagram. Each node is typed by layer
 * (input / app / automation / ai / data / output) so the same component
 * renders the hero flow and every case-study architecture.
 */
export function ArchitectureDiagram({
  nodes = defaultNodes,
  compact = false,
  caption,
}: {
  nodes?: DiagramNode[];
  compact?: boolean;
  caption?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`System diagram: ${nodes.map((n) => n.label).join(" to ")}`}
      className="relative w-full overflow-hidden rounded-xl border border-border bg-surface p-4 shadow-soft sm:p-6"
    >
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mb-5 flex items-center justify-between gap-3">
        <span className="label-mono">system flow</span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
          <span className="node-dot h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
      </div>

      <ol className="relative space-y-0">
        {nodes.map((node, i) => {
          const meta = kindMeta[node.kind];
          return (
            <li key={node.label + i}>
              <div
                className={`group/node flex items-center gap-3 rounded-lg border ${meta.ring} bg-background px-3 py-2.5 transition-colors sm:gap-4 sm:px-4 sm:py-3`}
              >
                <span
                  className={`node-dot h-2 w-2 shrink-0 rounded-full ${meta.dot}`}
                  style={{ animationDelay: `${i * 0.35}s` }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{node.label}</span>
                  {node.detail && !compact && (
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {node.detail}
                    </span>
                  )}
                </span>
                <span className="shrink-0 rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground">
                  {meta.tag}
                </span>
                <span className="label-mono hidden shrink-0 sm:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {i < nodes.length - 1 && (
                <div className="flex h-7 items-center justify-start pl-[1.05rem] sm:pl-[1.3rem]">
                  <svg
                    width="10"
                    height="28"
                    viewBox="0 0 10 28"
                    aria-hidden="true"
                    className="overflow-visible"
                  >
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="21"
                      className="flow-line stroke-border-strong"
                      strokeWidth="1.5"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                    <path
                      d="M1 27 L-2.5 21 L4.5 21 Z"
                      className="fill-border-strong"
                    />
                  </svg>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!compact && (
        <p className="relative mt-5 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
          {caption ??
            "Every system follows the same spine: a trigger, logic that can be inspected, a record of what happened, and an output someone actually uses."}
        </p>
      )}
    </div>
  );
}
