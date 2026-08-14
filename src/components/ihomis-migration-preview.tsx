import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, CheckCircle2, Cpu, Database, FileSpreadsheet, ArrowRight, Activity, Terminal } from "lucide-react";

interface PatientRecord {
  id: string;
  name: string;
  dob: string;
  department: string;
  status: "pending" | "processing" | "completed";
}

const mockExcelRows: PatientRecord[] = [
  { id: "REC-2019-001", name: "SANTOS, MARIA CLARA", dob: "1988-04-12", department: "Internal Medicine", status: "completed" },
  { id: "REC-2020-045", name: "REYES, JUAN CARLOS", dob: "1975-09-28", department: "Pediatrics", status: "completed" },
  { id: "REC-2021-112", name: "DELA CRUZ, PEDRO", dob: "1992-11-05", department: "Surgery", status: "completed" },
  { id: "REC-2022-304", name: "MENDOZA, SOFIA ANNE", dob: "2001-01-19", department: "Obstetrics", status: "completed" },
  { id: "REC-2023-589", name: "GONZALES, LUIS ROY", dob: "1964-07-30", department: "Cardiology", status: "pending" },
  { id: "REC-2024-812", name: "BAUTISTA, ELENA MARIE", dob: "1999-03-15", department: "Orthopedics", status: "pending" },
  { id: "REC-2025-990", name: "AQUINO, RODRIGO JR", dob: "1982-08-22", department: "Emergency", status: "pending" },
];

export function IHOMISMigrationPreview() {
  const [isRunning, setIsRunning] = useState(false);
  const [processedCount, setProcessedCount] = useState(1420);
  const [currentRecordIndex, setCurrentRecordIndex] = useState(4);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] UI.Vision RPA Macro initialized on port 8080.",
    "[EXCEL] Connected to 'Biliran_Hospital_Backlog_2019-2026.xlsx' (4,000 rows).",
    "[RPA] Target portal authenticated: Biliran Provincial Hospital IHOMIS v2.4.",
    "[SUCCESS] Batch #141-142 migrated (400 records/day pace).",
  ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setProcessedCount((prev) => Math.min(prev + 1, 4000));
        setCurrentRecordIndex((prevIndex) => (prevIndex + 1) % mockExcelRows.length);
        
        const rec = mockExcelRows[currentRecordIndex] ?? mockExcelRows[0] ?? {
          id: "REC-2023-000",
          name: "PATIENT RECORD",
          dob: "1990-01-01",
          department: "General Medicine",
          status: "completed",
        };
        const newLog = `[RPA INJECT] ${rec.id} -> ${rec.name} -> IHOMIS Patient Master List (OK)`;
        setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 5)]);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentRecordIndex]);

  const activeRecord: PatientRecord = mockExcelRows[currentRecordIndex] ?? mockExcelRows[0] ?? {
    id: "REC-2023-000",
    name: "PATIENT RECORD",
    dob: "1990-01-01",
    department: "General Medicine",
    status: "completed",
  };

  return (
    <div className="rounded-xl border border-border/80 bg-background/95 p-4 text-foreground shadow-lg backdrop-blur-xs font-sans text-xs">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Cpu className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h4 className="font-semibold text-sm tracking-tight">UI.Vision RPA Migration Engine</h4>
            <p className="text-[10px] text-muted-foreground font-mono">Biliran Provincial Hospital — 4,000 Record Backlog</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all shadow-xs ${
              isRunning
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
            }`}
          >
            {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isRunning ? "Pause RPA" : "Run RPA Migration"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              setProcessedCount(1420);
              setLogs(["[RESET] RPA macro buffer reset."]);
            }}
            className="flex items-center gap-1 rounded-lg border border-border bg-secondary/60 p-1.5 text-muted-foreground hover:text-foreground"
            title="Reset Simulation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Speed Stats */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono">
        <div className="rounded-lg border border-border/60 bg-surface/80 p-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Migrated</span>
          <span className="text-sm font-bold text-emerald-400">{processedCount.toLocaleString()} / 4,000</span>
        </div>
        <div className="rounded-lg border border-border/60 bg-surface/80 p-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Throughput</span>
          <span className="text-sm font-bold text-sky-400">~400 rec/day</span>
        </div>
        <div className="rounded-lg border border-border/60 bg-surface/80 p-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Speedup</span>
          <span className="text-sm font-bold text-purple-400">2.8x Manual</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground mb-1">
          <span>RPA Backlog Clearance</span>
          <span>{((processedCount / 4000) * 100).toFixed(1)}% Completed</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/80 border border-border/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${(processedCount / 4000) * 100}%` }}
          />
        </div>
      </div>

      {/* Visual Migration Flow Pipeline */}
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border border-border/70 bg-surface/90 p-3">
        {/* Source Excel */}
        <div className="rounded-md border border-emerald-500/30 bg-emerald-950/20 p-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-400 mb-1">
            <FileSpreadsheet className="h-3.5 w-3.5" />
            <span>Excel Spreadsheet</span>
          </div>
          <p className="font-mono text-[11px] text-foreground truncate">{activeRecord.name}</p>
          <p className="font-mono text-[9px] text-muted-foreground">ID: {activeRecord.id} | DOB: {activeRecord.dob}</p>
        </div>

        {/* Pipeline Arrow */}
        <div className="flex flex-col items-center justify-center px-1 text-sky-400">
          <ArrowRight className={`h-4 w-4 ${isRunning ? "animate-pulse text-emerald-400" : ""}`} />
          <span className="font-mono text-[8px] text-muted-foreground mt-0.5">JS Norm</span>
        </div>

        {/* Target IHOMIS Portal */}
        <div className="rounded-md border border-sky-500/30 bg-sky-950/20 p-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-sky-400 mb-1">
            <Database className="h-3.5 w-3.5" />
            <span>IHOMIS Portal</span>
          </div>
          <p className="font-mono text-[11px] text-foreground truncate">{activeRecord.department}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span className="font-mono text-[9px] text-emerald-400 font-semibold">Form Auto-Populated</span>
          </div>
        </div>
      </div>

      {/* Real-time RPA Terminal Log */}
      <div className="mt-3 rounded-lg border border-border/70 bg-slate-950/90 p-2 font-mono text-[10px]">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 mb-1.5">
          <span className="flex items-center gap-1 text-[9px]">
            <Terminal className="h-3 w-3 text-sky-400" />
            <span>UI.Vision Macro Execution Console</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-400 text-[9px]">
            <Activity className="h-3 w-3 animate-spin" />
            <span>LIVE</span>
          </span>
        </div>
        <div className="space-y-1 text-slate-300 max-h-[60px] overflow-y-auto">
          {logs.map((log, i) => (
            <p key={i} className="truncate leading-tight">
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
