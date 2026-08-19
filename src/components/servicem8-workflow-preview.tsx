import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Play,
  RotateCcw,
  Workflow,
  Database,
  Calendar,
  DollarSign,
  FileCheck,
  ShieldAlert,
  Search,
  Check,
} from "lucide-react";

interface ClickUpTask {
  id: string;
  jobUuid: string;
  name: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  assignedStaff: string;
  jobType: string;
  clickupStatus: "Open" | "In Progress" | "Closeout";
  invoiceStatus: "Uninvoiced" | "Draft" | "Sent" | "Paid";
  paymentStatus: "Unpaid" | "Partial" | "Paid";
  hasDailyChecklist: boolean;
  hasSixMonthFollowup: boolean;
  sixMonthDueDate?: string | undefined;
  updatedAt: string;
}

interface WorkflowLog {
  id: string;
  timestamp: string;
  node: string;
  status: "success" | "warning" | "error";
  message: string;
  details?: string;
}

export function ServiceM8WorkflowPreview() {
  // Input Form State
  const [jobUuid, setJobUuid] = useState("JOB-88492");
  const [customerName, setCustomerName] = useState("Auckland HVAC Services");
  const [customerEmail, setCustomerEmail] = useState("ops@aucklandhvac.co.nz");
  const [customerPhone, setCustomerPhone] = useState("+64 9 555 0192");
  const [customerAddress, setCustomerAddress] = useState("142 Queen St, Auckland Central");
  const [jobDescription, setJobDescription] = useState("Commercial Chiller Maintenance & Duct Inspection");
  const [jobStatus, setJobStatus] = useState<"Work in Progress" | "Completed" | "Quote / New">("Work in Progress");
  const [assignedStaff, setAssignedStaff] = useState("Liam Vance (Senior Tech)");
  const [jobType, setJobType] = useState("HVAC Maintenance");
  const [invoiceStatus, setInvoiceStatus] = useState<"Uninvoiced" | "Draft" | "Paid">("Draft");
  const [paymentStatus, setPaymentStatus] = useState<"Unpaid" | "Paid">("Unpaid");

  // Simulation execution state
  const [executing, setExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"simulator" | "clickup" | "logs">("simulator");

  // Initial Simulated ClickUp Board Tasks
  const [tasks, setTasks] = useState<ClickUpTask[]>([
    {
      id: "CU-1092",
      jobUuid: "JOB-88490",
      name: "Residential Heat Pump Install - Sarah Connor",
      customerName: "Sarah Connor",
      customerEmail: "sarah.c@skyline.org",
      customerPhone: "+64 21 890 123",
      customerAddress: "48 Ponsonby Rd, Auckland",
      assignedStaff: "Neil Layosa (Lead Specialist)",
      jobType: "Installation",
      clickupStatus: "Closeout",
      invoiceStatus: "Paid",
      paymentStatus: "Paid",
      hasDailyChecklist: true,
      hasSixMonthFollowup: true,
      sixMonthDueDate: "Feb 19, 2027",
      updatedAt: "Today 10:15 AM",
    },
    {
      id: "CU-1091",
      jobUuid: "JOB-88488",
      name: "Emergency Plumbing Inspection - Metro Cafe",
      customerName: "Metro Cafe",
      customerEmail: "contact@metrocafe.co.nz",
      customerPhone: "+64 9 303 4411",
      customerAddress: "12 Commerce St, Auckland",
      assignedStaff: "Marcus Brody",
      jobType: "Plumbing Service",
      clickupStatus: "In Progress",
      invoiceStatus: "Draft",
      paymentStatus: "Unpaid",
      hasDailyChecklist: true,
      hasSixMonthFollowup: false,
      updatedAt: "Yesterday 04:30 PM",
    },
  ]);

  const [logs, setLogs] = useState<WorkflowLog[]>([
    {
      id: "LOG-1003",
      timestamp: new Date().toLocaleTimeString(),
      node: "ClickUp Sync Engine",
      status: "success",
      message: "Job JOB-88490 updated to Closeout status with paid billing sync & 6-month follow-up task created.",
    },
    {
      id: "LOG-1002",
      timestamp: new Date().toLocaleTimeString(),
      node: "Validation Guard",
      status: "success",
      message: "Payload validated: Job UUID, Customer Name, and Job Status present.",
    },
    {
      id: "LOG-1001",
      timestamp: new Date().toLocaleTimeString(),
      node: "Webhook Endpoint",
      status: "success",
      message: "Received POST request at /servicem8-job from ServiceM8 webhook dispatch.",
    },
  ]);

  const steps = [
    { title: "01. Ingest Webhook", desc: "Authenticated POST payload received at /servicem8-job" },
    { title: "02. Normalize Data", desc: "Extract & flatten nested customer + job metadata" },
    { title: "03. Validate Required", desc: "Guard check for Job UUID, Customer Name & Status" },
    { title: "04. ClickUp Search", desc: "Check existing custom field Job UUID (Idempotency)" },
    { title: "05. Idempotent Write", desc: "Update existing task or Create new ClickUp record" },
    { title: "06. Lifecycle & Sync", desc: "Site Visit checklist / Closeout + Billing & 6-mo Follow-up" },
  ];

  const triggerPreset = (scenario: "new" | "replay" | "complete" | "invalid") => {
    if (scenario === "new") {
      const newNum = Math.floor(88493 + Math.random() * 100);
      setJobUuid(`JOB-${newNum}`);
      setCustomerName("Nexus Logistics Park");
      setCustomerEmail("dispatch@nexuslogistics.co.nz");
      setCustomerPhone("+64 9 400 9988");
      setCustomerAddress("88 Sylvia Park Rd, Mount Wellington");
      setJobDescription("Annual Air Handling Unit Service & Filter Replacement");
      setJobStatus("Work in Progress");
      setAssignedStaff("Liam Vance (Senior Tech)");
      setJobType("HVAC Maintenance");
      setInvoiceStatus("Draft");
      setPaymentStatus("Unpaid");
    } else if (scenario === "replay") {
      // Replay existing job
      setJobUuid("JOB-88490");
      setCustomerName("Sarah Connor");
      setCustomerEmail("sarah.c@skyline.org");
      setCustomerPhone("+64 21 890 123");
      setCustomerAddress("48 Ponsonby Rd, Auckland");
      setJobDescription("Residential Heat Pump Install - Sarah Connor (Replayed Webhook)");
      setJobStatus("Completed");
      setAssignedStaff("Neil Layosa (Lead Specialist)");
      setJobType("Installation");
      setInvoiceStatus("Paid");
      setPaymentStatus("Paid");
    } else if (scenario === "complete") {
      setJobUuid("JOB-88491");
      setCustomerName("Highland Dental Clinic");
      setCustomerEmail("admin@highlanddental.co.nz");
      setCustomerPhone("+64 9 534 1122");
      setCustomerAddress("21 Pakuranga Highway, Auckland");
      setJobDescription("Compressor & Suction Line Calibration");
      setJobStatus("Completed");
      setAssignedStaff("Sarah Lin (Field Engineer)");
      setJobType("Dental Equipment");
      setInvoiceStatus("Paid");
      setPaymentStatus("Paid");
    } else if (scenario === "invalid") {
      setJobUuid("");
      setCustomerName("");
      setJobDescription("Corrupted Webhook Payload - Missing Job UUID");
      setJobStatus("Quote / New");
    }
  };

  const runWorkflow = async () => {
    if (executing) return;
    setExecuting(true);
    setExecutionStep(0);

    const now = new Date().toLocaleTimeString();

    // Step 1: Webhook Ingest
    await new Promise((r) => setTimeout(r, 600));
    setExecutionStep(1);

    // Step 2: Normalize
    await new Promise((r) => setTimeout(r, 600));
    setExecutionStep(2);

    // Step 3: Validate
    await new Promise((r) => setTimeout(r, 600));

    if (!jobUuid || !customerName || !jobStatus) {
      setLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          timestamp: now,
          node: "Validation Guard",
          status: "error",
          message: "REJECTED: Missing required fields (Job UUID or Customer Name). HTTP 400 returned.",
          details: "Sanitized error response dispatched. No ClickUp records modified.",
        },
        ...prev,
      ]);
      setExecuting(false);
      setExecutionStep(null);
      setActiveTab("logs");
      return;
    }

    setExecutionStep(3);
    // Step 4: ClickUp Search
    await new Promise((r) => setTimeout(r, 600));
    const existingIndex = tasks.findIndex((t) => t.jobUuid === jobUuid);
    const isUpdate = existingIndex >= 0;

    setExecutionStep(4);
    // Step 5: Idempotent Write
    await new Promise((r) => setTimeout(r, 600));

    const updatedStatus = jobStatus === "Completed" ? "Closeout" : jobStatus === "Work in Progress" ? "In Progress" : "Open";
    const needsChecklist = jobStatus === "Work in Progress";
    const needsFollowup = jobStatus === "Completed";
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 6);
    const dateStr = futureDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    let updatedTaskList = [...tasks];

    if (isUpdate && existingIndex >= 0 && updatedTaskList[existingIndex]) {
      const existing = updatedTaskList[existingIndex]!;
      const updatedTask: ClickUpTask = {
        ...existing,
        clickupStatus: updatedStatus,
        invoiceStatus: invoiceStatus,
        paymentStatus: paymentStatus,
        hasDailyChecklist: existing.hasDailyChecklist || needsChecklist,
        hasSixMonthFollowup: existing.hasSixMonthFollowup || needsFollowup,
        sixMonthDueDate: needsFollowup ? dateStr : existing.sixMonthDueDate,
        updatedAt: `Just now (${now})`,
      };
      updatedTaskList[existingIndex] = updatedTask;

      setLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          timestamp: now,
          node: "ClickUp Idempotent Engine",
          status: "warning",
          message: `EXISTS: Found task ${existing.id} matching ${jobUuid}. Updated existing task (No duplicates created).`,
          details: `ClickUp Status → ${updatedStatus} | Invoice → ${invoiceStatus} | Payment → ${paymentStatus}`,
        },
        ...prev,
      ]);
    } else {
      const newTaskId = `CU-${Math.floor(1093 + Math.random() * 100)}`;
      const newTask: ClickUpTask = {
        id: newTaskId,
        jobUuid,
        name: `${jobDescription} - ${customerName}`,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        assignedStaff,
        jobType,
        clickupStatus: updatedStatus,
        invoiceStatus,
        paymentStatus,
        hasDailyChecklist: needsChecklist,
        hasSixMonthFollowup: needsFollowup,
        sixMonthDueDate: needsFollowup ? dateStr : undefined,
        updatedAt: `Just now (${now})`,
      };
      updatedTaskList = [newTask, ...updatedTaskList];

      setLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          timestamp: now,
          node: "ClickUp Idempotent Engine",
          status: "success",
          message: `NEW JOB: Created ClickUp task ${newTaskId} for ${jobUuid}.`,
          details: `Synced 7 custom fields + ${needsChecklist ? "Daily Checklist" : ""}${needsFollowup ? "6-Mo Follow-up" : ""}`,
        },
        ...prev,
      ]);
    }

    setExecutionStep(5);
    // Step 6: Lifecycle
    await new Promise((r) => setTimeout(r, 600));

    setTasks(updatedTaskList);
    setExecuting(false);
    setExecutionStep(null);
    setActiveTab("clickup");
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-sans text-sm">
      {/* Top Banner Header */}
      <div className="bg-slate-900/90 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
              ServiceM8 → ClickUp n8n Workflow Simulator
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Idempotent & Replay Safe
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive Webhook Ingestion, Normalization, Duplicate Prevention & ClickUp Sync
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "simulator" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Workflow Canvas
          </button>
          <button
            onClick={() => setActiveTab("clickup")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "clickup" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ClickUp Board
            <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded text-[10px] font-mono">{tasks.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "logs" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sanitized Logs
            <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded text-[10px] font-mono">{logs.length}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-6 bg-slate-950 min-h-[460px]">
        {activeTab === "simulator" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Preset Selector & Webhook Event Payload Form */}
            <div className="lg:col-span-5 bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  ServiceM8 Payload Dispatches
                </span>
                <span className="text-[11px] text-slate-500 font-mono">POST /servicem8-job</span>
              </div>

              {/* Preset Scenario Buttons */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-slate-400">Quick Test Scenarios:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => triggerPreset("new")}
                    className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 text-left transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    New Job Event
                  </button>
                  <button
                    onClick={() => triggerPreset("replay")}
                    className="px-2.5 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-xs font-medium text-amber-300 border border-amber-500/30 text-left transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    Replay Webhook
                  </button>
                  <button
                    onClick={() => triggerPreset("complete")}
                    className="px-2.5 py-1.5 rounded bg-purple-500/10 hover:bg-purple-500/20 text-xs font-medium text-purple-300 border border-purple-500/30 text-left transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    Completed Job
                  </button>
                  <button
                    onClick={() => triggerPreset("invalid")}
                    className="px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-300 border border-red-500/30 text-left transition-colors flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    Missing Fields
                  </button>
                </div>
              </div>

              {/* Payload Editable Form */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400">Job UUID (Key)</label>
                    <input
                      type="text"
                      value={jobUuid}
                      onChange={(e) => setJobUuid(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                      placeholder="JOB-xxxxx"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400">Job Status</label>
                    <select
                      value={jobStatus}
                      onChange={(e) => setJobStatus(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Quote / New">Quote / New</option>
                      <option value="Work in Progress">Work in Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400">Job Description</label>
                  <input
                    type="text"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400">Invoice Status</label>
                    <select
                      value={invoiceStatus}
                      onChange={(e) => setInvoiceStatus(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Uninvoiced">Uninvoiced</option>
                      <option value="Draft">Draft</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400">Payment Status</label>
                    <select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={runWorkflow}
                disabled={executing}
                className={`w-full py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                  executing
                    ? "bg-blue-600/50 text-blue-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                }`}
              >
                {executing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Executing n8n Pipeline...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Dispatch Event & Execute Workflow
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Interactive Step Visualizer */}
            <div className="lg:col-span-7 bg-slate-900/40 p-4 sm:p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-blue-400" />
                    n8n Execution Pipeline Nodes
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {executionStep !== null ? `Step ${executionStep + 1} of ${steps.length}` : "Ready"}
                  </span>
                </div>

                {/* Step Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps.map((st, idx) => {
                    const isActive = executionStep === idx;
                    const isDone = executionStep !== null && executionStep > idx;

                    return (
                      <div
                        key={st.title}
                        className={`p-3 rounded-lg border text-xs transition-all ${
                          isActive
                            ? "bg-blue-950/60 border-blue-500/80 text-white ring-1 ring-blue-500/50 shadow-md shadow-blue-500/10"
                            : isDone
                            ? "bg-emerald-950/20 border-emerald-800/60 text-slate-300"
                            : "bg-slate-900/40 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] font-semibold flex items-center gap-1.5">
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : isActive ? (
                              <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-mono">
                                {idx + 1}
                              </span>
                            )}
                            {st.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{st.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety & Design Feature Highlights Box */}
              <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 space-y-2 text-xs">
                <div className="flex items-center justify-between text-blue-300 font-medium text-xs">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-blue-400" />
                    Built-in Replay & Duplicate Safeguards
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-200">Job UUID Idempotency:</strong> Searches ClickUp custom field before creating tasks.
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-200">Checklist De-duplication:</strong> Date-stamped Daily Checklists avoid double runs.
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-200">Validation Guard:</strong> Rejects incomplete webhooks prior to external API writes.
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-200">Sanitized Error Path:</strong> Logs node errors cleanly without leaking credentials.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: ClickUp Board Preview */}
        {activeTab === "clickup" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-blue-400" />
                  ClickUp Operational Tasks (Synced Destination)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Filter: Excluded Checklists & 6-Mo Follow-ups</span>
              </div>
            </div>

            {/* Tasks Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-400 text-xs">{task.jobUuid}</span>
                        <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                          {task.id}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-100 text-sm mt-0.5 leading-snug">{task.name}</h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0 ${
                        task.clickupStatus === "Closeout"
                          ? "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                          : task.clickupStatus === "In Progress"
                          ? "bg-blue-500/10 text-blue-300 border border-blue-500/30"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {task.clickupStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Customer</span>
                      <span className="font-medium text-slate-200">{task.customerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Assigned Staff</span>
                      <span className="text-slate-300">{task.assignedStaff}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Contact Info</span>
                      <span className="text-slate-400 text-[11px] block">{task.customerEmail}</span>
                      <span className="text-slate-400 text-[11px] block">{task.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Location</span>
                      <span className="text-slate-300 text-[11px]">{task.customerAddress}</span>
                    </div>
                  </div>

                  {/* Custom Fields Badges Bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-300">
                        <DollarSign className="w-3 h-3 text-emerald-400" />
                        Inv: <strong className="text-slate-100">{task.invoiceStatus}</strong>
                      </span>
                      <span className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-300">
                        Pay: <strong className="text-slate-100">{task.paymentStatus}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {task.hasDailyChecklist && (
                        <span
                          title="Daily Site Visit Checklist Task Created"
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1"
                        >
                          <FileCheck className="w-3 h-3" /> Checklist
                        </span>
                      )}
                      {task.hasSixMonthFollowup && (
                        <span
                          title={`6-Month Follow-up Task Scheduled for ${task.sixMonthDueDate}`}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3" /> 6-Mo Follow-up
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Sanitized Error & Execution Logs */}
        {activeTab === "logs" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-slate-300">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-blue-400" />
                Sanitized Execution & Error Log Feed
              </span>
              <span className="text-[11px] text-slate-500">Credentials & API Keys Masked</span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg border space-y-1 ${
                    log.status === "error"
                      ? "bg-red-950/20 border-red-800/60 text-red-200"
                      : log.status === "warning"
                      ? "bg-amber-950/20 border-amber-800/60 text-amber-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      {log.status === "error" ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      ) : log.status === "warning" ? (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      [{log.node}]
                    </span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-slate-200 font-sans">{log.message}</p>
                  {log.details && <p className="text-[11px] text-slate-400 font-mono italic">{log.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
