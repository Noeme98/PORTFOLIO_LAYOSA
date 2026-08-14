import { useState, useRef, useEffect, ReactNode } from "react";
import { Maximize2, X, Monitor, Sparkles, RefreshCw } from "lucide-react";

interface ScaledLandscapePreviewProps {
  children: ReactNode;
  title?: string;
  targetWidth?: number;
}

export function ScaledLandscapePreview({
  children,
  title = "Live Interactive System Sandbox",
  targetWidth = 1040,
}: ScaledLandscapePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scaledHeight, setScaledHeight] = useState<number>(380);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        if (containerWidth > 0) {
          // Calculate scale factor to fit target virtual width
          const calculatedScale = containerWidth / targetWidth;
          // Clamp scale to a reasonable bounds (0.32 to 0.85)
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

  // Handle ESC key to exit modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const scalePercent = Math.round(scale * 100);

  return (
    <>
      {/* Landscape Container inside Card */}
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
            <span className="hidden md:inline-flex items-center gap-1 rounded bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] text-sky-400 border border-sky-500/20">
              <Sparkles className="h-2.5 w-2.5" />
              Live Interactive
            </span>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1 rounded-md bg-slate-800 hover:bg-sky-600 px-2 py-1 font-mono text-[11px] text-slate-200 hover:text-white transition-all shadow-xs"
              title="Expand Fullscreen Sandbox View (Esc to close)"
            >
              <Maximize2 className="h-3 w-3" />
              <span className="hidden sm:inline">Expand Sandbox</span>
            </button>
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

      {/* Fullscreen Sandbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-2xl">
            {/* Modal Topbar */}
            <div className="flex items-center justify-between border-b border-border bg-slate-900 px-4 sm:px-6 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Monitor className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                    {title}
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-normal">
                      Full Scale 100% Desktop View
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interact directly with the live system logic components in full resolution.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline font-mono text-xs text-slate-500">Press ESC to exit</span>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Container (100% scale full-size interactive preview) */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-background">
              <div className="mx-auto max-w-6xl">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
