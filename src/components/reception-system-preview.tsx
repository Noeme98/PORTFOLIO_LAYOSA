import { useState } from "react";
import {
  Camera,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Send,
  UserCheck,
  Search,
  Database,
  RefreshCw,
  BarChart3,
  Bell,
  Printer,
  Download,
  Copy,
  Trash2,
  MapPin,
  ArrowRight,
  Clock,
  Layers,
  Users,
  Building,
  Settings,
  Mail,
  Plus,
  Eye,
  Filter,
} from "lucide-react";

export function ReceptionSystemPreview() {
  const [activeTab, setActiveTab] = useState<"intake" | "admin">("intake");

  // Intake Form State
  const [docId, setDocId] = useState("DOC-1786444724706");
  const [docTitle, setDocTitle] = useState("Capston Project Final Evaluation Form & Hardware Schematics");
  const [docType, setDocType] = useState("Project Proposal / Thesis");
  const [senderName, setSenderName] = useState("Engr. Alex Mercer");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([
    "Maria Elmer (Instructor)",
    "Bonz (Program Head)",
  ]);
  const [remarks, setRemarks] = useState("Urgent review requested for hardware sensor debouncing module.");
  const [capturedShots, setCapturedShots] = useState<number>(1);
  const [isCapturing, setIsCapturing] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  // Admin Portal State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
  const [adminView, setAdminView] = useState<"dashboard" | "record" | "tracking" | "instructors" | "programs">(
    "dashboard"
  );
  const [adminUsername, setAdminUsername] = useState("Admin");
  const [adminPassword, setAdminPassword] = useState("password123");
  const [searchQuery, setSearchQuery] = useState("");

  // Document Tracking Simulation State
  const [currentLocation, setCurrentLocation] = useState<"Dean's office" | "Faculty office" | "Outside faculty">(
    "Dean's office"
  );
  const [nextLocation, setNextLocation] = useState<"Dean's office" | "Faculty office" | "Outside faculty">(
    "Faculty office"
  );
  const [movementNotes, setMovementNotes] = useState("Note for audit trail");
  const [movementLogs, setMovementLogs] = useState([
    {
      location: "Dean's office",
      time: "May 13, 2026 · 02:52 AM",
      actor: "View Alexa Mendoza",
      note: "Transferred to Dean's office for signature approval",
    },
    {
      location: "Faculty office",
      time: "May 13, 2026 · 02:30 AM",
      actor: "Engr. Jameson Buhayang",
      note: "Received at Faculty office reception desk",
    },
    {
      location: "Outside faculty",
      time: "May 13, 2020 · 02:51 AM",
      actor: "Courier Dropoff",
      note: "Initial document intake recorded via ESP32 sensor",
    },
  ]);

  // Recipient Cards Mock Data
  const mockRecipients = [
    { name: "Arcon Barbanida", email: "eldom1204@gmail.com", program: "BSEE", role: "Instructor", status: "Active" },
    { name: "Bonz", email: "layosaneilfrancis569@gmail.com", program: "BSEE", role: "Program Head", status: "Active" },
    { name: "Elmer Mae", email: "eldom1204@gmail.com", program: "BSCE", role: "Instructor", status: "Active" },
    { name: "Engr. Jameson Buhayang", email: "jamesonbuhayang17@gmail.com", program: "BSCpE", role: "Program Head", status: "Active" },
    { name: "Her Sshay", email: "layosaneilfrancis569@gmail.com", program: "BSCpE", role: "Office", status: "Active" },
    { name: "Jonic IO", email: "eldom1204@gmail.com", program: "BSME", role: "Instructor", status: "Active" },
    { name: "Maria Elmer", email: "eldom1204@gmail.com", program: "BSCpE", role: "Instructor", status: "Active" },
    { name: "Neil Francis Pinez", email: "layosaneilfrancis569@gmail.com", program: "BSCE", role: "Instructor", status: "Active" },
  ];

  // Programs Mock Data
  const mockPrograms = [
    { code: "BSCE", name: "Civil Engineering", docs: 15 },
    { code: "BSCpE", name: "Computer Engineering", docs: 6 },
    { code: "BSEE", name: "Electrical Engineering", docs: 6 },
    { code: "BSME", name: "Mechanical Engineering", docs: 0 },
  ];

  const mockProgramDocuments = [
    { title: "Automated Eme", type: "Diploma", recipient: "Elmer Mae", date: "April 11, 2026 02:41 PM" },
    { title: "Memorandum", type: "Certificate of Grades / Transcript", recipient: "Arcon Barbanida", date: "April 11, 2026 02:19 PM" },
    { title: "Approval Sheet", type: "Certificate of Enrollment", recipient: "Elmer Mae", date: "April 06, 2026 03:42 PM" },
    { title: "Automated Eme", type: "Certificate of Enrollment", recipient: "Bonz", date: "April 06, 2026 01:54 PM" },
    { title: "Automated Eme", type: "Exam Permit", recipient: "Bonz", date: "April 02, 2026 08:19 PM" },
    { title: "Approval Sheet", type: "Other", recipient: "Engr. Jameson Buhayang", date: "April 15, 2026 08:49 PM" },
    { title: "Approval Sheet", type: "Other", recipient: "Elmer Mae", date: "April 15, 2026 08:41 PM" },
    { title: "Automated Eme", type: "Medical Certificate", recipient: "Maria Elmer", date: "April 15, 2026 02:29 PM" },
  ];

  const recipientsList = [
    "Maria Elmer (Instructor)",
    "BSEE Department",
    "Arcon Barbanida (Instructor)",
    "Bonz (Program Head)",
    "BSME Department",
    "Jonic IO (Instructor)",
  ];

  const toggleRecipient = (recipient: string) => {
    if (selectedRecipients.includes(recipient)) {
      setSelectedRecipients(selectedRecipients.filter((r) => r !== recipient));
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  const handleGenerateNewId = () => {
    const randomSuffix = Math.floor(100000000000 + Math.random() * 900000000000);
    setDocId(`DOC-${randomSuffix}`);
  };

  const handleCapturePhoto = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setCapturedShots((prev) => prev + 1);
      setIsCapturing(false);
    }, 400);
  };

  const handleSubmitIntake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle || !senderName || selectedRecipients.length === 0) {
      setSubmittedStatus("error");
      return;
    }
    setSubmittedStatus("success");
    setTimeout(() => setSubmittedStatus(null), 5000);
  };

  const handleExecuteMove = () => {
    const now = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setMovementLogs([
      {
        location: nextLocation,
        time: now,
        actor: "Admin (Current User)",
        note: movementNotes || "Routine department transfer log",
      },
      ...movementLogs,
    ]);
    setCurrentLocation(nextLocation);
    setNextLocation(nextLocation === "Faculty office" ? "Dean's office" : "Faculty office");
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lift font-sans">
      {/* Top Header & View Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border bg-surface px-6 py-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              Document Reception & Multi-Node Tracking Simulator
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
                Live System Sandbox
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Simulate document drop-off intake, admin dashboard analytics, document inspection, recipient management & program routing
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex rounded-xl border border-border bg-background p-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab("intake")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              activeTab === "intake"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Document Intake Form</span>
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              activeTab === "admin"
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Admin Console & Tracking</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DOCUMENT INTAKE FORM */}
      {activeTab === "intake" && (
        <div className="bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-lg font-bold tracking-tight text-white font-mono">Document Intake System</h4>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>8/11/2026, 6:39:33 PM</span>
              <button
                onClick={() => setActiveTab("admin")}
                className="rounded bg-sky-600 px-3 py-1 text-white hover:bg-sky-500 transition-colors font-sans font-medium"
              >
                Admin Console
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            {/* Form Left Side */}
            <form onSubmit={handleSubmitIntake} className="space-y-5 bg-slate-900/90 border border-slate-800 p-5 rounded-xl shadow-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-base font-semibold text-white">Submit a Document</h5>
                <button
                  type="button"
                  onClick={handleGenerateNewId}
                  className="flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 bg-sky-950/60 border border-sky-800/60 px-2.5 py-1 rounded transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  Auto-generated
                </button>
              </div>

              {/* Document ID */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Document ID <span className="text-emerald-400 font-bold">{docId}</span>
                </label>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Document Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3.5 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                  placeholder="Enter document title..."
                  maxLength={160}
                />
                <p className="mt-1 text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>{docTitle.length}/160</span>
                  <span>Be concise & specific</span>
                </p>
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Document Type <span className="text-rose-400">*</span>
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Project Proposal / Thesis">Project Proposal / Thesis</option>
                  <option value="Approval Sheet">Approval Sheet</option>
                  <option value="Administrative Clearance">Administrative Clearance</option>
                  <option value="Certificate of Grades / Transcript">Certificate of Grades / Transcript</option>
                  <option value="Medical Certificate">Medical Certificate</option>
                </select>
              </div>

              {/* Sender Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Sender Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3.5 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                  placeholder="Enter sender name..."
                />
              </div>

              {/* Recipients Checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Instructor / Recipient(s) <span className="text-rose-400">*</span>
                </label>
                <div className="rounded-lg bg-slate-950 border border-slate-700 p-3 max-h-40 overflow-y-auto space-y-2">
                  {recipientsList.map((r) => (
                    <label key={r} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(r)}
                        onChange={() => toggleRecipient(r)}
                        className="rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Remarks (Optional)</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3.5 py-2 text-sm text-white focus:border-sky-500 focus:outline-none resize-none"
                  placeholder="Context, urgency, or special handling notes"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 transition-colors shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  Submit Document Intake
                </button>

                {submittedStatus === "success" && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-950/80 border border-emerald-800 p-3 text-xs text-emerald-300 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Document {docId} successfully registered! Email alert sent to recipients.</span>
                  </div>
                )}

                {submittedStatus === "error" && (
                  <div className="mt-3 text-xs text-rose-400 font-mono">
                    ⚠️ Please complete all required fields and select at least one recipient.
                  </div>
                )}
              </div>
            </form>

            {/* ESP32-CAM Right Panel */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white font-mono">ESP32-CAM Preview</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-950 border border-emerald-800/80 px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live
                </div>
              </div>

              {/* Mock Camera View Finder */}
              <div className="relative aspect-[4/3] rounded-lg border border-slate-800 bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-4 group">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                {isCapturing ? (
                  <div className="absolute inset-0 bg-white/90 flex items-center justify-center text-slate-950 font-bold font-mono text-sm animate-pulse">
                    📸 CAPTURING FRAME...
                  </div>
                ) : (
                  <>
                    <div className="border border-dashed border-emerald-400/50 rounded p-6 text-center z-10 bg-slate-900/60 backdrop-blur-xs">
                      <FileText className="h-8 w-8 text-emerald-400 mx-auto mb-1 opacity-80" />
                      <p className="text-[11px] font-mono text-slate-300 font-semibold">{docId}</p>
                      <p className="text-[10px] text-slate-400">Position document on drop surface</p>
                    </div>
                    <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-500">
                      RES: 1280x960 · ESP32-CAM 2.4GHz Wi-Fi
                    </div>
                  </>
                )}
              </div>

              {/* Camera Actions */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 transition-colors shadow-md"
                >
                  <Camera className="h-3.5 w-3.5" />
                  Capture Photo
                </button>
                <button
                  type="button"
                  onClick={() => setCapturedShots(0)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium py-1.5 transition-colors"
                >
                  Resume Stream
                </button>
              </div>

              <div className="rounded-lg bg-slate-950 border border-slate-800/80 p-3 text-[11px] font-mono text-slate-400 leading-relaxed">
                Captured shots for this document:{" "}
                <span className="text-emerald-400 font-bold text-xs">{capturedShots}</span>. You can capture many, then delete unwanted ones before finalizing.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADMIN CONSOLE & DASHBOARD (FULL MULTI-PAGE ADMIN EXPERIENCE) */}
      {activeTab === "admin" && (
        <div className="bg-slate-950 text-slate-100 min-h-[600px] flex flex-col lg:flex-row">
          {/* Admin Sidebar Navigation (Matching Screenshots 1, 2, & New Recipient/Program Views) */}
          <div className="w-full lg:w-64 border-r border-slate-800 bg-slate-900/90 p-4 space-y-6 shrink-0">
            <div>
              <h4 className="text-base font-bold text-white tracking-wider uppercase font-mono flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-sky-400" />
                ADMIN
              </h4>
              <p className="text-[11px] font-mono text-slate-400">Document Intake System</p>
            </div>

            <nav className="space-y-6 text-xs font-medium">
              {/* OVERVIEW */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2">Overview</p>
                <button
                  onClick={() => {
                    setIsAdminLoggedIn(true);
                    setAdminView("dashboard");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                    isAdminLoggedIn && adminView === "dashboard"
                      ? "bg-sky-600/30 text-sky-300 font-semibold border border-sky-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
              </div>

              {/* DATA & RECORDS */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2">Data & Records</p>
                <button
                  onClick={() => {
                    setIsAdminLoggedIn(true);
                    setAdminView("record");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                    isAdminLoggedIn && adminView === "record"
                      ? "bg-sky-600/30 text-sky-300 font-semibold border border-sky-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Records</span>
                </button>

                <button
                  onClick={() => {
                    setIsAdminLoggedIn(true);
                    setAdminView("instructors");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                    isAdminLoggedIn && adminView === "instructors"
                      ? "bg-sky-600/30 text-sky-300 font-semibold border border-sky-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Users className="h-4 w-4 text-amber-400" />
                  <span>Instructors / Recipients</span>
                </button>

                <button
                  onClick={() => {
                    setIsAdminLoggedIn(true);
                    setAdminView("programs");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                    isAdminLoggedIn && adminView === "programs"
                      ? "bg-sky-600/30 text-sky-300 font-semibold border border-sky-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Building className="h-4 w-4 text-purple-400" />
                  <span>Programs</span>
                </button>

                <button
                  onClick={() => {
                    setIsAdminLoggedIn(true);
                    setAdminView("tracking");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${
                    isAdminLoggedIn && adminView === "tracking"
                      ? "bg-sky-600/30 text-sky-300 font-semibold border border-sky-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>Document Tracking</span>
                  </div>
                  <span className="rounded bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 text-[9px] font-mono">
                    Routing
                  </span>
                </button>
              </div>

              {/* INSIGHTS & ALERTS */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2">Insights & Alerts</p>
                <div className="px-3 py-1.5 text-slate-400 hover:text-slate-300 cursor-pointer flex items-center gap-2.5">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </div>
                <div className="px-3 py-1.5 text-slate-400 hover:text-slate-300 cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                  <span className="rounded-full bg-rose-500 text-white text-[10px] h-4 w-4 flex items-center justify-center font-bold">
                    2
                  </span>
                </div>
                <div className="px-3 py-1.5 text-slate-400 hover:text-slate-300 cursor-pointer flex items-center gap-2.5">
                  <Mail className="h-4 w-4" />
                  <span>Email Delivery</span>
                </div>
                <div className="px-3 py-1.5 text-slate-400 hover:text-slate-300 cursor-pointer flex items-center gap-2.5">
                  <FileText className="h-4 w-4" />
                  <span>Reports</span>
                </div>
              </div>

              {/* SYSTEM */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2">System</p>
                <div className="px-3 py-1.5 text-slate-400 hover:text-slate-300 cursor-pointer flex items-center gap-2.5">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </div>
              </div>
            </nav>
          </div>

          {/* Admin Main Content Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
            {/* Top Admin Topbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <h4 className="text-xl font-bold tracking-tight text-white">
                  {adminView === "dashboard" && "Admin Dashboard"}
                  {adminView === "record" && "Document Record #DOC-1776257076654"}
                  {adminView === "instructors" && "Recipients & Faculty Roster"}
                  {adminView === "programs" && "Academic Programs Overview"}
                  {adminView === "tracking" && "Document Physical Location Routing"}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                {/* Admin View Switcher Pills */}
                <div className="flex flex-wrap rounded-lg border border-slate-800 bg-slate-900 p-1 text-xs">
                  <button
                    onClick={() => setAdminView("dashboard")}
                    className={`px-3 py-1 rounded transition-colors ${
                      adminView === "dashboard" ? "bg-sky-600 text-white font-medium" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setAdminView("instructors")}
                    className={`px-3 py-1 rounded transition-colors ${
                      adminView === "instructors" ? "bg-sky-600 text-white font-medium" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Recipients
                  </button>
                  <button
                    onClick={() => setAdminView("programs")}
                    className={`px-3 py-1 rounded transition-colors ${
                      adminView === "programs" ? "bg-sky-600 text-white font-medium" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Programs
                  </button>
                  <button
                    onClick={() => setAdminView("record")}
                    className={`px-3 py-1 rounded transition-colors ${
                      adminView === "record" ? "bg-sky-600 text-white font-medium" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Record
                  </button>
                  <button
                    onClick={() => setAdminView("tracking")}
                    className={`px-3 py-1 rounded transition-colors ${
                      adminView === "tracking" ? "bg-sky-600 text-white font-medium" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Routing
                  </button>
                </div>

                <button
                  onClick={() => setIsAdminLoggedIn(!isAdminLoggedIn)}
                  className="rounded border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  {isAdminLoggedIn ? "Sign Out" : "Sign In"}
                </button>
              </div>
            </div>

            {/* VIEW 1: ADMIN DASHBOARD */}
            {adminView === "dashboard" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Top Action Pills */}
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setActiveTab("intake")}
                    className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5 text-sky-400" />
                    <span>Submit document</span>
                  </button>
                  <button
                    onClick={() => setAdminView("record")}
                    className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <Database className="h-3.5 w-3.5 text-amber-400" />
                    <span>All records</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 transition-colors">
                    <Bell className="h-3.5 w-3.5 text-amber-400" />
                    <span>Notifications</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 transition-colors">
                    <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Reports</span>
                  </button>
                </div>

                {/* 4 KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white font-mono">27</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Total Documents</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <FileText className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white font-mono">0</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Today</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white font-mono">8</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Active Recipients</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white font-mono">2</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Unread Notifications</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <Bell className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Submissions Chart & Recent Submissions Grid */}
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-sky-400" />
                        <h5 className="text-sm font-bold text-white">Daily Document Submissions</h5>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
                        7 day(s)
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-4 text-xs font-mono">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Document Type</label>
                        <select className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-white">
                          <option>All</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">From Date</label>
                        <input
                          type="text"
                          defaultValue="01/01/2026"
                          className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1">To Date</label>
                        <input
                          type="text"
                          defaultValue="30/04/2026"
                          className="w-full rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-white"
                        />
                      </div>
                      <div className="flex items-end">
                        <button className="w-full rounded bg-sky-600 hover:bg-sky-500 py-1.5 font-sans font-semibold text-white transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 pb-2 h-44 flex items-end justify-between gap-3 border-b border-slate-800/80 px-4">
                      {[1, 2, 0, 4, 1, 12, 3, 2, 1, 0, 5, 2].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                          <div
                            className="w-full bg-sky-500 hover:bg-emerald-400 rounded-t transition-all"
                            style={{ height: `${Math.max(val * 10, 6)}px` }}
                            title={`${val} submissions`}
                          />
                          <span className="text-[9px] font-mono text-slate-400">{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h5 className="text-sm font-bold text-white">Recent Submissions</h5>
                      <button className="text-xs text-sky-400 hover:text-sky-300 font-mono">See all</button>
                    </div>

                    <div className="space-y-3.5 text-xs font-mono">
                      <div className="border-b border-slate-800/60 pb-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Approval Sheet</span>
                          <span className="text-[10px] text-slate-500">April 15, 2026 08:49 PM</span>
                        </div>
                        <p className="text-slate-300 text-[11px] mt-1">Sender: View Alexa Mendoza</p>
                        <p className="text-slate-400 text-[10px]">Recipient: Engr. Jameson Buhayang</p>
                      </div>

                      <div className="border-b border-slate-800/60 pb-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Approval Sheet</span>
                          <span className="text-[10px] text-slate-500">April 15, 2026 08:41 PM</span>
                        </div>
                        <p className="text-slate-300 text-[11px] mt-1">Sender: Elmer Domingo</p>
                        <p className="text-slate-400 text-[10px]">Recipient: Elmer Mae</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Automated Eme</span>
                          <span className="text-[10px] text-slate-500">April 15, 2026 02:29 PM</span>
                        </div>
                        <p className="text-slate-300 text-[11px] mt-1">Sender: Neil Francis Layosa</p>
                        <p className="text-slate-400 text-[10px]">Recipient: Maria Elmer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: RECIPIENTS & INSTRUCTORS MANAGEMENT (Matching New Screenshot 1) */}
            {adminView === "instructors" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      <Users className="h-5 w-5 text-amber-400" />
                      Recipients
                    </h4>
                    <p className="text-xs text-slate-400">Search, filter, and open documents by recipient.</p>
                  </div>

                  <button className="flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-4 py-2 transition-colors shadow-md">
                    <Plus className="h-4 w-4" />
                    + Add Recipient
                  </button>
                </div>

                {/* Filter Controls Bar */}
                <div className="grid gap-3 sm:grid-cols-5 text-xs font-mono bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
                  <div className="relative col-span-2">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search name, email, program..."
                      className="w-full rounded bg-slate-950 border border-slate-800 pl-8 pr-3 py-1.5 text-white focus:outline-none"
                    />
                  </div>
                  <select className="rounded bg-slate-950 border border-slate-800 px-3 py-1.5 text-white">
                    <option>All Roles</option>
                    <option>Instructor</option>
                    <option>Program Head</option>
                    <option>Office</option>
                  </select>
                  <select className="rounded bg-slate-950 border border-slate-800 px-3 py-1.5 text-white">
                    <option>All Programs</option>
                    <option>BSCE</option>
                    <option>BSCpE</option>
                    <option>BSEE</option>
                    <option>BSME</option>
                  </select>
                  <select className="rounded bg-slate-950 border border-slate-800 px-3 py-1.5 text-white">
                    <option>Name A→Z</option>
                  </select>
                </div>

                {/* Recipient Cards Grid (8 Cards Matching Screenshot) */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mockRecipients.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-bold font-mono text-sky-400 text-xs">
                          {r.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">{r.name}</h5>
                          <p className="text-[10px] text-slate-400 font-mono truncate">{r.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-800/80">
                        <span className="text-slate-400">Program: <strong className="text-slate-200">{r.program}</strong></span>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded bg-slate-800 text-slate-300 px-2 py-0.5">
                            {r.role}
                          </span>
                          <span className="rounded bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5">
                            {r.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 py-1 text-[11px] font-mono text-slate-300 transition-colors">
                          Email
                        </button>
                        <button className="flex-1 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 py-1 text-[11px] font-mono text-slate-300 transition-colors">
                          Toggle Status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 5: ACADEMIC PROGRAMS OVERVIEW (Matching New Screenshot 2) */}
            {adminView === "programs" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-400" />
                    Programs
                  </h4>
                  <p className="text-xs text-slate-400">Documents sent to each organization (program).</p>
                </div>

                {/* Top Program Cards Grid with Seals */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mockPrograms.map((p) => (
                    <div
                      key={p.code}
                      className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-lg font-bold text-white font-mono">{p.code}</h5>
                          <p className="text-xs text-slate-400">{p.name}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-bold text-sky-400 font-mono">
                          {p.code}
                        </div>
                      </div>

                      <div className="rounded-lg bg-slate-950 border border-slate-800/80 p-2.5 text-xs font-mono text-slate-300">
                        <strong className="text-white font-bold">{p.docs}</strong> docs sent
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Documents Table for Programs */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h5 className="text-sm font-bold text-white">Recent documents</h5>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search recent documents..."
                        className="w-full rounded-lg bg-slate-950 border border-slate-800 pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">TITLE</th>
                          <th className="py-2.5 px-3">TYPE</th>
                          <th className="py-2.5 px-3">RECIPIENT</th>
                          <th className="py-2.5 px-3">DATE</th>
                          <th className="py-2.5 px-3 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {mockProgramDocuments.map((doc, idx) => (
                          <tr key={idx} className="hover:bg-slate-950/40">
                            <td className="py-3 px-3 text-white font-bold">{doc.title}</td>
                            <td className="py-3 px-3">
                              <span className="rounded bg-sky-950 text-sky-400 border border-sky-800/80 px-2 py-0.5 text-[10px]">
                                {doc.type}
                              </span>
                            </td>
                            <td className="py-3 px-3">{doc.recipient}</td>
                            <td className="py-3 px-3 text-slate-400">{doc.date}</td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => setAdminView("record")}
                                className="text-sky-400 hover:text-sky-300 font-bold text-[11px]"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: DOCUMENT RECORD INSPECTOR */}
            {adminView === "record" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAdminView("dashboard")}
                      className="rounded bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 text-xs font-mono"
                    >
                      ← Back to Records
                    </button>
                    <span className="rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 text-xs font-mono flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Archived record
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <button className="flex items-center gap-1.5 rounded bg-slate-900 border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-slate-800">
                      <Printer className="h-3.5 w-3.5" />
                      Print / Save as PDF
                    </button>
                    <button className="flex items-center gap-1.5 rounded bg-slate-900 border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-slate-800">
                      <Download className="h-3.5 w-3.5" />
                      Download ▼
                    </button>
                    <button className="flex items-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-white">
                      <Copy className="h-3.5 w-3.5" />
                      Copy summary
                    </button>
                    <button className="flex items-center gap-1.5 rounded bg-rose-600 hover:bg-rose-500 px-3 py-1.5 text-white">
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[1fr_320px]">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white">Approval Sheet</h4>
                        <span className="rounded bg-sky-950 text-sky-400 border border-sky-800 px-2 py-0.5 text-xs font-mono">
                          Other
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 uppercase font-bold">ARCHIVE STATUS</span>
                        <span className="text-emerald-400">Retention until: Apr 15, 2033</span>
                      </div>
                      <p className="text-xs text-slate-300 font-mono">Archived: Apr 15, 2026</p>
                      <button className="mt-2 rounded bg-slate-900 border border-slate-700 px-3 py-1 text-[11px] text-slate-300 font-mono hover:text-white">
                        Protect from deletion
                      </button>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      <div className="border-b border-slate-800 pb-3">
                        <p className="text-slate-500 text-[10px] uppercase">ID & SUBMISSION TIME</p>
                        <p className="text-sky-400 font-bold mt-0.5">ID: DOC-1776257076654</p>
                        <p className="text-slate-300 mt-0.5">Submitted: April 15, 2026 08:49 PM</p>
                      </div>

                      <div className="border-b border-slate-800 pb-3">
                        <p className="text-slate-500 text-[10px] uppercase">SENDER</p>
                        <p className="text-white font-bold text-sm mt-0.5">View Alexa Mendoza</p>
                      </div>

                      <div className="border-b border-slate-800 pb-3">
                        <p className="text-slate-500 text-[10px] uppercase">RECIPIENT / DESTINATION</p>
                        <p className="text-slate-200 font-medium mt-0.5">
                          Engr. Jameson Buhayang, Arcon Barbanida
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500 text-[10px] uppercase">REMARKS</p>
                        <p className="text-slate-400 mt-0.5">—</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-white font-mono flex items-center gap-2 mb-3">
                        <Camera className="h-4 w-4 text-emerald-400" />
                        Attached photo
                      </h5>

                      <div className="rounded-lg border border-slate-800 bg-slate-950 p-2 flex items-center justify-center">
                        <div className="aspect-[3/4] w-full max-w-[200px] rounded border border-slate-800 bg-slate-900 p-3 flex flex-col justify-between text-center font-mono">
                          <div className="border-b border-slate-800 pb-2 text-[10px] text-slate-400 font-bold">
                            APPROVAL SHEET
                          </div>
                          <div className="py-4 text-[9px] text-slate-500 leading-tight">
                            [ ESP32-CAM Snapshot ]<br />
                            Signature & Endorsement Verification<br />
                            DOC-1776257076654
                          </div>
                          <div className="border-t border-slate-800 pt-2 text-[8px] text-emerald-400">
                            Verified Capture
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setAdminView("tracking")}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold py-2 transition-colors shadow-md"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      View Location Routing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: MULTI-NODE DOCUMENT TRACKING TIMELINE */}
            {adminView === "tracking" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-emerald-400" />
                      Document tracking
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      Routing: the document must first be recorded at the faculty office. From there it may go to the
                      dean's office or outside the faculty. Moving directly between the dean's office and outside the
                      faculty is not allowed; the document must return to the faculty office first.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-300">
                      Faculty → Dean
                    </span>
                    <span className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-300">
                      Dean → Faculty
                    </span>
                    <span className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-300">
                      Faculty → Outside
                    </span>
                    <span className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-300">
                      Outside → Faculty
                    </span>
                  </div>

                  <div className="py-6 border-y border-slate-800">
                    <div className="grid gap-6 md:grid-cols-3 relative">
                      <div
                        className={`rounded-xl border p-4 space-y-2 relative transition-all ${
                          currentLocation === "Dean's office"
                            ? "bg-sky-950/60 border-sky-500 shadow-lg shadow-sky-950/50"
                            : "bg-slate-950 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-sky-500/20 text-sky-400 px-2.5 py-0.5 text-[10px] font-mono font-bold">
                            {currentLocation === "Dean's office" ? "DOCUMENT IS HERE" : "LOCATION NODE"}
                          </span>
                          <Building className="h-4 w-4 text-sky-400" />
                        </div>
                        <h5 className="text-sm font-bold text-white">Dean's office</h5>
                        <p className="text-[11px] font-mono text-slate-400">Apr 15, 2026 · 02:48 PM</p>
                      </div>

                      <div
                        className={`rounded-xl border p-4 space-y-2 relative transition-all ${
                          currentLocation === "Faculty office"
                            ? "bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/50"
                            : "bg-slate-950 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 text-[10px] font-mono font-bold">
                            RECEIVED HERE FIRST
                          </span>
                          <Building className="h-4 w-4 text-emerald-400" />
                        </div>
                        <h5 className="text-sm font-bold text-white">Faculty office</h5>
                        <p className="text-[11px] font-mono text-slate-400">May 13, 2026 · 02:30 AM</p>
                      </div>

                      <div
                        className={`rounded-xl border p-4 space-y-2 relative transition-all ${
                          currentLocation === "Outside faculty"
                            ? "bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950/50"
                            : "bg-slate-950 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-amber-500/20 text-amber-400 px-2.5 py-0.5 text-[10px] font-mono font-bold">
                            TRANSFER LOGGED
                          </span>
                          <Building className="h-4 w-4 text-amber-400" />
                        </div>
                        <h5 className="text-sm font-bold text-white">Outside faculty</h5>
                        <p className="text-[11px] font-mono text-slate-400">May 13, 2020 · 02:51 AM</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-4 rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px]">CURRENT LOCATION</span>
                      <p className="text-sky-400 font-bold mt-0.5">{currentLocation}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">LAST MOVEMENT</span>
                      <p className="text-slate-200 mt-0.5">May 13, 2026 · 02:52 AM</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">SENDER</span>
                      <p className="text-slate-200 mt-0.5">View Alexa Mendoza</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">RECORD ID</span>
                      <p className="text-sky-400 font-bold mt-0.5">DOC-1776257076654</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                    <h5 className="text-xs font-mono font-bold text-slate-300 uppercase">Execute Location Transfer</h5>

                    <div className="grid gap-4 sm:grid-cols-[220px_120px_1fr]">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">Next location (admin)</label>
                        <select
                          value={nextLocation}
                          onChange={(e) =>
                            setNextLocation(
                              e.target.value as "Dean's office" | "Faculty office" | "Outside faculty"
                            )
                          }
                          className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white"
                        >
                          <option value="Faculty office">Faculty office</option>
                          <option value="Dean's office">Dean's office</option>
                          <option value="Outside faculty">Outside faculty</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={handleExecuteMove}
                          className="w-full rounded bg-sky-600 hover:bg-sky-500 py-2 font-mono text-xs font-bold text-white transition-colors shadow-md"
                        >
                          Record move
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">Remarks (optional)</label>
                        <input
                          type="text"
                          value={movementNotes}
                          onChange={(e) => setMovementNotes(e.target.value)}
                          className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white"
                          placeholder="Note for audit trail"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-mono font-bold text-white flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-sky-400" />
                      Movement log ({movementLogs.length})
                    </p>

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2.5 text-xs font-mono">
                      {movementLogs.map((log, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-2 text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            <span className="font-bold text-white">{log.location}</span>
                            <span className="text-slate-500">— {log.note}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2">
                            <span>{log.actor}</span>
                            <span>·</span>
                            <span>{log.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
