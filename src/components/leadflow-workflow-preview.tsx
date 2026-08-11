import { useState } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, FileText, Send, Sparkles, Database, Slack, Mail, ArrowRight, RefreshCw } from "lucide-react";

interface LeadSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: "Qualified" | "Not Qualified" | "Parse Error";
  aiReason?: string;
  aiReply?: string;
  pdfGenerated?: boolean;
  slackAlertSent?: boolean;
}

export function LeadFlowWorkflowPreview() {
  const [name, setName] = useState("Alexander Vance");
  const [email, setEmail] = useState("alex@vanceenterprises.com");
  const [company, setCompany] = useState("Vance Logistics Solutions");
  const [message, setMessage] = useState(
    "Hi team, we are seeking an automated AI lead qualification workflow for our enterprise sales team. We handle 500+ inquiries daily."
  );

  const [executing, setExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "notion" | "logs">("form");

  const [submissions, setSubmissions] = useState<LeadSubmission[]>([
    {
      id: "LD-9024",
      timestamp: "Aug 11, 2026 02:15 PM",
      name: "Neil Francis Layosa",
      email: "layosaneilfrancis569@gmail.com",
      company: "DICT",
      message: "Hello! I would like to inquire about the product your company has recently released last week.",
      status: "Qualified",
      aiReason: "The lead mentions a specific recent product release and expresses a clear intent to inquire about it on behalf of DICT.",
      aiReply: "Hello Neil, thank you for your interest in our latest product release! We would be happy to provide more information and discuss how this new solution can support your goals at DICT.",
      pdfGenerated: true,
      slackAlertSent: false,
    },
    {
      id: "LD-9023",
      timestamp: "Aug 11, 2026 01:40 PM",
      name: "Gera Lard",
      email: "layosaneilfrancis569@gmail.com",
      company: "DICT",
      message: "Hello, This is neil francis layosa. This is an urgent matter and I would like to propose something...",
      status: "Qualified",
      aiReason: "The message references a specific company and follows up on a professional proposal context.",
      aiReply: "Hello Neil, thank you for reaching out on behalf of DICT regarding the proposal. We are looking forward to hearing your boss's feedback and discussing next steps.",
      pdfGenerated: true,
      slackAlertSent: false,
    },
    {
      id: "LD-9022",
      timestamp: "Aug 11, 2026 12:10 PM",
      name: "Gera Lard",
      email: "layosaneilfrancis569@gmail.com",
      company: "DICT",
      message: "Good Day! This is Neil Francis Layosa reaching from The Philippines! Hoping to land a job on this platform!",
      status: "Not Qualified",
      aiReason: "The sender is seeking employment rather than inquiring about business services or a specific project.",
      aiReply: "Thank you for reaching out, Neil. Please visit our official careers page or LinkedIn profile to view any available job openings that match your background.",
      pdfGenerated: false,
      slackAlertSent: false,
    },
    {
      id: "LD-9021",
      timestamp: "Aug 11, 2026 11:20 AM",
      name: "Neil Francis Garillo Layosa",
      email: "layosaneil@gmail.com",
      company: "ICPEP",
      message: "Hello",
      status: "Parse Error",
      aiReason: "The message is only a greeting and does not specify a business need or project inquiry (Raw LLM JSON parse error fallback).",
      aiReply: "Hello Neil! Thank you for reaching out to us. Could you please provide more details on how we can assist you today?",
      pdfGenerated: false,
      slackAlertSent: true,
    },
    {
      id: "LD-9020",
      timestamp: "Aug 11, 2026 10:05 AM",
      name: "Gera Lard",
      email: "layosaneilfrancis569@gmail.com",
      company: "DICT",
      message: "Hello World! Hello Philippines, Im Neil Francis Layosa from Biliran Province",
      status: "Not Qualified",
      aiReason: "The message is a general greeting and 'Hello World' test string without a specific business inquiry or project detail.",
      aiReply: "Thank you for reaching out, Neil. Please let us know if you have a specific project or inquiry we can assist you with in the future.",
      pdfGenerated: false,
      slackAlertSent: false,
    },
  ]);

  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(submissions[0] ?? null);

  const runSimulation = (scenario: "qualified" | "unqualified" | "error") => {
    setExecuting(true);
    setExecutionStep(1);

    setTimeout(() => setExecutionStep(2), 600);
    setTimeout(() => setExecutionStep(3), 1200);
    setTimeout(() => setExecutionStep(4), 1800);

    setTimeout(() => {
      setExecutionStep(5);
      setExecuting(false);

      let newRecord: LeadSubmission;
      const nowStr = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      if (scenario === "qualified") {
        newRecord = {
          id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: nowStr,
          name: name.trim() || "Alexander Vance",
          email: email.trim() || "alex@vanceenterprises.com",
          company: company.trim() || "Vance Logistics Solutions",
          message: message.trim(),
          status: "Qualified",
          aiReason: "Genuine high-intent business inquiry with specific automation needs",
          aiReply: `Hello ${name || "there"}, thank you for reaching out to LeadFlow! Attached is your custom solutions PDF guide.`,
          pdfGenerated: true,
          slackAlertSent: false,
        };
      } else if (scenario === "unqualified") {
        newRecord = {
          id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: nowStr,
          name: name.trim() || "Promotional User",
          email: email.trim() || "marketing@spamservices.com",
          company: "Generic Marketing",
          message: message.trim() || "Promotional link or irrelevant offer message",
          status: "Not Qualified",
          aiReason: "Spam or irrelevant submission",
          aiReply: "Thank you for contacting us. We have recorded your submission.",
          pdfGenerated: false,
          slackAlertSent: false,
        };
      } else {
        newRecord = {
          id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: nowStr,
          name: name.trim() || "Test Malformed Output",
          email: email.trim() || "test@malformed-json.org",
          company: "Test Corp",
          message: message.trim() || "Malformed AI payload text trigger",
          status: "Parse Error",
          aiReason: "Edit Fields node JSON parse error fallback activated (parse_error = true)",
          pdfGenerated: false,
          slackAlertSent: true,
        };
      }

      setSubmissions((prev) => [newRecord, ...prev]);
      setSelectedLead(newRecord);
    }, 2400);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#0b0f0d] shadow-2xl font-sans text-slate-900 dark:text-slate-100">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-200/80 dark:bg-[#111714] px-4 py-3 shrink-0 gap-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-500/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          <span className="ml-2 font-mono text-xs font-bold tracking-wider text-slate-700 dark:text-slate-300">
            LeadFlow n8n Canvas Sandbox
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-300/60 dark:bg-slate-900 p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("form")}
            className={`rounded-md px-3 py-1 transition-all ${
              activeTab === "form"
                ? "bg-white dark:bg-[#1e3a2b] text-slate-900 dark:text-emerald-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            n8n Pipeline Simulator
          </button>
          <button
            onClick={() => setActiveTab("notion")}
            className={`rounded-md px-3 py-1 transition-all ${
              activeTab === "notion"
                ? "bg-white dark:bg-[#1e3a2b] text-slate-900 dark:text-emerald-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Notion Lead Tracker
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {activeTab === "form" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Input Form & Test Scenarios */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121915] p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Send className="h-4 w-4 text-emerald-500" />
                  <span>n8n Lead Form Intake</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-500 mb-1">
                      Inquiry Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Preset Test Triggers */}
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-mono text-slate-500 uppercase">Preset Test Cases:</p>
                  <div className="flex flex-col gap-2 text-xs font-semibold">
                    <button
                      disabled={executing}
                      onClick={() => {
                        setName("Alexander Vance");
                        setEmail("alex@vanceenterprises.com");
                        setCompany("Vance Logistics");
                        setMessage("Looking for AI workflow automation for lead qualification.");
                        runSimulation("qualified");
                      }}
                      className="flex items-center justify-between rounded-lg border border-emerald-800/40 bg-emerald-950/30 hover:bg-emerald-900/50 p-2.5 text-emerald-300 text-left transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Test Case 1: Genuine Business Lead</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                    </button>

                    <button
                      disabled={executing}
                      onClick={() => {
                        setName("Spam Bot 99");
                        setEmail("promo@spambot.net");
                        setCompany("Seo Ranks");
                        setMessage("Buy cheap backlink packages for $10 instant ranking.");
                        runSimulation("unqualified");
                      }}
                      className="flex items-center justify-between rounded-lg border border-amber-800/40 bg-amber-950/30 hover:bg-amber-900/50 p-2.5 text-amber-300 text-left transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>Test Case 2: Spam / Irrelevant Inquiry</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                    </button>

                    <button
                      disabled={executing}
                      onClick={() => {
                        setName("Malformed Payload");
                        setEmail("test@json-error.org");
                        setCompany("Error Corp");
                        setMessage("Raw unparseable text string response payload trigger...");
                        runSimulation("error");
                      }}
                      className="flex items-center justify-between rounded-lg border border-rose-800/40 bg-rose-950/30 hover:bg-rose-900/50 p-2.5 text-rose-300 text-left transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        <span>Test Case 3: Malformed AI Output</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: n8n Node-by-Node Pipeline Visualizer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121915] p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>Live n8n Execution Pipeline Trace</span>
                  </h3>
                  {executing && (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 animate-pulse">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Executing n8n Nodes...</span>
                    </span>
                  )}
                </div>

                {/* Node Trace Steps */}
                <div className="space-y-3 font-mono text-xs">
                  {/* Step 1 */}
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      executionStep && executionStep >= 1
                        ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-200"
                        : "border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-2">
                        <span>1. n8n Form Trigger</span>
                      </span>
                      {executionStep && executionStep >= 1 ? (
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">
                          Payload Received
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Idle</span>
                      )}
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      executionStep && executionStep >= 2
                        ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-200"
                        : "border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-2">
                        <Database className="h-3.5 w-3.5" />
                        <span>2. Google Sheets (Raw Log)</span>
                      </span>
                      {executionStep && executionStep >= 2 ? (
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">
                          Appended to Lead Intake / Sheet1
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Waiting</span>
                      )}
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      executionStep && executionStep >= 3
                        ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-200"
                        : "border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>3. Google Gemini Agent (gemini-3-flash-preview)</span>
                      </span>
                      {executionStep && executionStep >= 3 ? (
                        <span className="text-[10px] bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded">
                          Evaluated Prompt
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Waiting</span>
                      )}
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      executionStep && executionStep >= 4
                        ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-200"
                        : "border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-2">
                        <span>4. JSON Output Validation (Edit Fields Parser)</span>
                      </span>
                      {executionStep && executionStep >= 4 ? (
                        <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">
                          Structured JSON OK
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Waiting</span>
                      )}
                    </div>
                  </div>

                  {/* Step 5 - Router */}
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      executionStep && executionStep >= 5
                        ? "border-emerald-500 bg-emerald-950/30 text-emerald-200"
                        : "border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">5. 3-Way Conditional Router Execution</span>
                      {executionStep && executionStep >= 5 ? (
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">
                          Routing Completed
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Waiting</span>
                      )}
                    </div>

                    {/* Routing Output Summary */}
                    {selectedLead && (
                      <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-300">Target Lead:</span>
                          <span className="text-white font-bold">{selectedLead.name}</span>
                          <span className="text-slate-400">({selectedLead.company})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-300">Routed Status:</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              selectedLead.status === "Qualified"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : selectedLead.status === "Not Qualified"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : "bg-rose-950 text-rose-300 border border-rose-800"
                            }`}
                          >
                            {selectedLead.status}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-slate-400 font-bold">Actions Dispatched:</p>
                          {selectedLead.status === "Qualified" && (
                            <ul className="list-disc list-inside text-emerald-300 space-y-1">
                              <li>Logged to Notion Database (Status: Qualified)</li>
                              <li>HTML Welcome Template generated</li>
                              <li>PDFShift API converted HTML to PDF document</li>
                              <li>Gmail dispatched personalized email with attached PDF</li>
                            </ul>
                          )}

                          {selectedLead.status === "Not Qualified" && (
                            <ul className="list-disc list-inside text-amber-300 space-y-1">
                              <li>Logged to Notion Database (Status: Not Qualified)</li>
                              <li>Gmail dispatched generic acknowledgment email</li>
                            </ul>
                          )}

                          {selectedLead.status === "Parse Error" && (
                            <ul className="list-disc list-inside text-rose-300 space-y-1">
                              <li>Logged to Google Sheets (Errors Tab)</li>
                              <li>Logged to Notion Database (Status: Parse Error)</li>
                              <li>Slack alert fired: ⚠️ AI parse failure</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notion" && (
          /* Notion Lead Tracker View */
          <div className="space-y-4 font-sans animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-500" />
                  <span>Notion Database Lead Status Tracker</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Centralized record of all lead intake outcomes: Qualified 🟢, Not Qualified 🟡, Parse Error 🔴
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121915] shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="p-3.5 font-semibold">LEAD NAME / COMPANY</th>
                    <th className="p-3.5 font-semibold">CONTACT EMAIL</th>
                    <th className="p-3.5 font-semibold">STATUS</th>
                    <th className="p-3.5 font-semibold">PDF ATTACHED</th>
                    <th className="p-3.5 font-semibold">TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {submissions.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{lead.company}</div>
                      </td>

                      <td className="p-3.5 text-slate-700 dark:text-slate-300">
                        {lead.email}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            lead.status === "Qualified"
                              ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                              : lead.status === "Not Qualified"
                              ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300"
                              : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              lead.status === "Qualified"
                                ? "bg-emerald-500"
                                : lead.status === "Not Qualified"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                          />
                          {lead.status}
                        </span>
                      </td>

                      <td className="p-3.5">
                        {lead.pdfGenerated ? (
                          <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-bold">
                            <FileText className="h-3.5 w-3.5" />
                            <span>PDF Attached</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">None</span>
                        )}
                      </td>

                      <td className="p-3.5 text-slate-500 text-xs">
                        {lead.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Selected Lead Detailed Inspection Card */}
            {selectedLead && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121915] p-5 shadow-sm space-y-3 font-sans">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Lead Detail: {selectedLead.name}</span>
                  <span className="text-xs font-mono text-slate-500">{selectedLead.id}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-mono text-[10px] text-slate-500 uppercase font-bold">Inquiry Message</p>
                    <p className="mt-1 text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
                      "{selectedLead.message}"
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] text-slate-500 uppercase font-bold">AI Evaluation & Response</p>
                    <div className="mt-1 space-y-1 bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                      <p className="font-bold text-emerald-400">Reason: {selectedLead.aiReason}</p>
                      {selectedLead.aiReply && <p className="text-slate-300">Reply: "{selectedLead.aiReply}"</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
