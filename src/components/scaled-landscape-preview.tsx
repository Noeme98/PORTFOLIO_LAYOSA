import { useState, useRef, useEffect, ReactNode } from "react";
import { Monitor, Sparkles } from "lucide-react";

interface ScaledLandscapePreviewProps {
  children: ReactNode;
  title?: string;
  targetWidth?: number;
}

export function ScaledLandscapePreview({
  children,
  targetWidth = 1040,
}: ScaledLandscapePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [scaledHeight, setScaledHeight] = useState<number>(380);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        if (containerWidth > 0) {
          // Calculate scale factor to fit target virtual width
          const calculatedScale = containerWidth / targetWidth;
          // Clamp scale to reasonable bounds (0.32 to 0.85)
          const clampedScale = Math.min(Math.max(calculatedScale, 0.32), 0.85);
          setScale(clampedScale);
          
          // 16:10 aspect ratio height for preview area (subtracting 36px header)
          const aspectHeight = Math.round(containerWidth * (10 / 16));
          setScaledHeight(Math.max(aspectHeight - 36, 260));
        }
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [targetWidth]);

  const scalePercent = Math.round(scale * 100);

  return (
    <div
      ref={containerRef}
      className="group/landscape relative w-full overflow-hidden rounded-xl border border-border/80 bg-slate-950/90 shadow-xl transition-all duration-200"
    >
      {/* Widescreen OS Window Header Bar */}
      <div className="flex items-center justify-between border-b border-border/70 bg-slate-900/90 px-3 py-2 text-xs select-none">
        <div className="flex items-center gap-2">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 transition-opacity group-hover/landscape:opacity-100 opacity-75" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 transition-opacity group-hover/landscape:opacity-100 opacity-75" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 transition-opacity group-hover/landscape:opacity-100 opacity-75" />
          </div>

          <div className="ml-1.5 flex items-center gap-1.5 font-mono text-[11px] text-slate-300 font-medium">
            <Monitor className="h-3 w-3 text-sky-400" />
            <span className="hidden sm:inline text-slate-400 font-mono">16:10 Landscape</span>
            <span className="text-slate-600 dark:text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">{scalePercent}% View</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] text-sky-400 border border-sky-500/20">
            <Sparkles className="h-2.5 w-2.5" />
            Live Interactive
          </span>
        </div>
      </div>

      {/* Scaled Viewport Container */}
      <div
        className="relative w-full overflow-auto scrollbar-thin bg-background/95"
        style={{ height: `${scaledHeight}px` }}
      >
        <div
          style={{
            width: `${targetWidth}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="shrink-0 transition-transform duration-100"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
