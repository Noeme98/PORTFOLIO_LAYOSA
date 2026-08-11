import type { DiagramNode, NodeKind } from "@/data/projects";

const kindTag: Record<NodeKind, string> = {
  input: "IN",
  app: "APP",
  automation: "AUTO",
  ai: "AI",
  data: "DB",
  output: "OUT",
};

const kindAccent: Record<NodeKind, string> = {
  input: "bg-muted-foreground/60",
  app: "bg-foreground/70",
  automation: "bg-primary",
  ai: "bg-primary",
  data: "bg-accent-foreground",
  output: "bg-primary",
};

/**
 * Compact horizontal system preview used on project cards.
 * Wraps on narrow screens; never scrolls sideways.
 */
export function FlowPreview({ nodes }: { nodes: DiagramNode[] }) {
  return (
    <div
      role="img"
      aria-label={`System preview: ${nodes.map((n) => n.label).join(" to ")}`}
      className="flex flex-wrap items-center gap-x-1.5 gap-y-2"
    >
      {nodes.map((node, i) => (
        <span key={node.label + i} className="flex items-center gap-1.5">
          <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface py-1 pl-1.5 pr-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${kindAccent[node.kind]}`}
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] leading-none tracking-tight">{node.label}</span>
            <span className="font-mono text-[9px] leading-none tracking-widest text-muted-foreground">
              {kindTag[node.kind]}
            </span>
          </span>
          {i < nodes.length - 1 && (
            <span className="text-border-strong" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
