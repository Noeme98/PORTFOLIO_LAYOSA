import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Calendar,
  Package,
  FileBarChart,
  Settings,
  HelpCircle,
  AlertTriangle,
  Clock,
  CheckCircle2,
  BellRing,
  RefreshCw,
  Search,
  Plus,
  Send,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Edit2,
  SlidersHorizontal,
  Play,
  Database,
  Code,
  Mail,
  Zap,
  Tag,
  Star,
  MoreHorizontal,
  History,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  reason: string;
  time: string;
  dateDay: number;
  status: "confirmed" | "scheduled" | "completed";
  reminderSent?: boolean;
}

interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  category: string;
  quantity: number;
  reorderAt: number;
}

interface TaskItem {
  id: string;
  title: string;
  description?: string | undefined;
  assignedTo: string;
  dueDate: string;
  status: "done" | "overdue" | "pending" | "in_progress";
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface PatientItem {
  id: string;
  name: string;
  avatar: string;
  contact: string;
  dob: string;
  age: string;
  status: string;
  email: string;
  emergencyContact: string;
  registeredDate: string;
  address: string;
}

const initialPatients: PatientItem[] = [
  {
    id: "E551DF16",
    name: "Angelica Flores",
    avatar: "AF",
    contact: "09991112233",
    dob: "Sep 18, 2001",
    age: "24y",
    status: "New",
    email: "angelica.flores@example.com",
    emergencyContact: "Ramon Flores (Father) - 09992223344",
    registeredDate: "Aug 11, 2026, 11:14 AM",
    address: "88 Shaw Blvd, Mandaluyong",
  },
  {
    id: "085ADE36",
    name: "Gabriel Mendoza",
    avatar: "GM",
    contact: "09156667788",
    dob: "Jan 30, 1976",
    age: "50y",
    status: "New",
    email: "gabriel.mendoza@example.com",
    emergencyContact: "Elena Mendoza (Wife) - 09159998877",
    registeredDate: "Aug 10, 2026, 09:30 AM",
    address: "14 Ortigas Ave, Pasig",
  },
  {
    id: "87F9A67D",
    name: "Jayson Jamin",
    avatar: "JJ",
    contact: "09088765896",
    dob: "Aug 4, 2026",
    age: "0y",
    status: "New",
    email: "jayson.jamin@example.com",
    emergencyContact: "Maria Jamin (Mother) - 09081112233",
    registeredDate: "Aug 04, 2026, 02:15 PM",
    address: "25 Taft Ave, Manila",
  },
  {
    id: "23318A3C",
    name: "Juan Reyes",
    avatar: "JR",
    contact: "09189876543",
    dob: "Jul 14, 1992",
    age: "34y",
    status: "New",
    email: "juan.reyes@example.com",
    emergencyContact: "Rosa Reyes (Spouse) - 09183334455",
    registeredDate: "Aug 01, 2026, 10:00 AM",
    address: "123 EDSA, Quezon City",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: "apt-aug-4-1",
    patientName: "Maria Santos",
    reason: "Follow-up consultation",
    time: "6:00pm - 6:30pm",
    dateDay: 4,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-7-1",
    patientName: "Maria Santos",
    reason: "Lab result review",
    time: "10:00pm - 10:30pm",
    dateDay: 7,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-10-1",
    patientName: "Juan Test Patient",
    reason: "Routine physical examination",
    time: "9:00am - 9:30am",
    dateDay: 10,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-10-2",
    patientName: "Juan Test Patient",
    reason: "Diagnostic screening follow-up",
    time: "10:00am - 10:30am",
    dateDay: 10,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-11-1",
    patientName: "Lyn Garcia",
    reason: "Early morning intake & blood sample",
    time: "12:00am - 12:30am",
    dateDay: 11,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-11-2",
    patientName: "Jayson James",
    reason: "General consultation",
    time: "9:00am - 9:30am",
    dateDay: 11,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-11-3",
    patientName: "Maria Santos",
    reason: "Annual physical checkup & lab review",
    time: "5:00pm - 5:30pm",
    dateDay: 11,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-11-4",
    patientName: "Juan Reyes",
    reason: "Follow-up consultation for hypertension",
    time: "6:30pm - 7:00pm",
    dateDay: 11,
    status: "confirmed",
    reminderSent: true,
  },
  {
    id: "apt-aug-11-5",
    patientName: "Sofia Ramos",
    reason: "Skin rash evaluation and prescription renewal",
    time: "10:00pm - 10:30pm",
    dateDay: 11,
    status: "scheduled",
    reminderSent: false,
  },
  {
    id: "apt-aug-12-1",
    patientName: "Leo Gervacio",
    reason: "Routine dental checkup & cleaning",
    time: "9:00am - 9:30am",
    dateDay: 12,
    status: "scheduled",
    reminderSent: false,
  },
  {
    id: "apt-aug-12-2",
    patientName: "Gabriel Mendoza",
    reason: "Routine diabetes blood sugar monitoring",
    time: "6:00pm - 6:30pm",
    dateDay: 12,
    status: "scheduled",
    reminderSent: false,
  },
  {
    id: "apt-aug-14-1",
    patientName: "Angelica Flores",
    reason: "Post-op evaluation & dressing change",
    time: "10:30pm - 11:00pm",
    dateDay: 14,
    status: "scheduled",
    reminderSent: false,
  },
];

const initialInventory: InventoryItem[] = [
  { id: "inv-1", name: "Amoxicilin", unit: "packs", category: "Medicine", quantity: 50, reorderAt: 10 },
  { id: "inv-2", name: "Blood Pressure Cuff Adult", unit: "units", category: "Equipment", quantity: 6, reorderAt: 3 },
  { id: "inv-3", name: "Blood Pressure Cuff Adult", unit: "units", category: "Equipment", quantity: 6, reorderAt: 3 },
  { id: "inv-4", name: "Digital Thermometer Pro", unit: "units", category: "Equipment", quantity: 4, reorderAt: 5 },
  { id: "inv-5", name: "Digital Thermometer Pro", unit: "units", category: "Equipment", quantity: 4, reorderAt: 5 },
  { id: "inv-6", name: "Disposable Syringes 5ml", unit: "units", category: "Consumables", quantity: 120, reorderAt: 30 },
  { id: "inv-7", name: "Disposable Syringes 5ml", unit: "units", category: "Consumables", quantity: 120, reorderAt: 30 },
  { id: "inv-8", name: "Face Shield", unit: "boxes", category: "PPE", quantity: 8, reorderAt: 10 },
  { id: "inv-9", name: "N95 Respirator Masks", unit: "boxes", category: "PPE", quantity: 15, reorderAt: 25 },
  { id: "inv-10", name: "Normal Saline 0.9% 500ml", unit: "bottles", category: "IV Solutions", quantity: 12, reorderAt: 20 },
  { id: "inv-11", name: "Surgical Gloves Medium", unit: "boxes", category: "PPE", quantity: 7, reorderAt: 15 },
  { id: "inv-12", name: "Ethyl Alcohol 70%", unit: "gallons", category: "Disinfectants", quantity: 4, reorderAt: 10 },
  { id: "inv-13", name: "Gauze Sponges 4x4", unit: "packs", category: "Consumables", quantity: 18, reorderAt: 40 },
  { id: "inv-14", name: "Paracetamol 500mg", unit: "boxes", category: "Medicine", quantity: 22, reorderAt: 50 },
  { id: "inv-15", name: "IV Cannula 22G", unit: "boxes", category: "Consumables", quantity: 10, reorderAt: 30 },
];

const initialTasks: TaskItem[] = [
  {
    id: "tsk-1",
    title: "Review lab results",
    description: "Check pending CBC for Maria Santos",
    assignedTo: "Administrator",
    dueDate: "Due Aug 5, 2026",
    status: "done",
    completed: true,
    priority: "medium",
  },
  {
    id: "tsk-2",
    title: "Restock Emergency Medical Kit",
    description: "Verify epinephrine ampoules and sterile needles in room 2.",
    assignedTo: "Administrator",
    dueDate: "Due Aug 10, 2026",
    status: "overdue",
    completed: false,
    priority: "high",
  },
  {
    id: "tsk-3",
    title: "Review Lab Results — Maria Santos",
    description: "Analyze CBC and lipid profile lab results before afternoon appointment.",
    assignedTo: "Administrator",
    dueDate: "Due Aug 11, 2026",
    status: "pending",
    completed: false,
    priority: "medium",
  },
  {
    id: "tsk-4",
    title: "Sign Medical Certificate for Ricardo Gomez",
    description: "Approve clearance certificate requested during previous visit.",
    assignedTo: "Administrator",
    dueDate: "Due Aug 12, 2026",
    status: "in_progress",
    completed: false,
    priority: "medium",
  },
];

export function ClinicFlowDashboardPreview() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "tasks" | "patients" | "appointments" | "inventory" | "reports" | "n8n" | "settings"
  >("n8n");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const [activeN8nWorkflow, setActiveN8nWorkflow] = useState<"dailyReport" | "reminders" | "lowStock" | "aiAssistant">("dailyReport");
  const [isExecutingN8n, setIsExecutingN8n] = useState(false);
  const [executionOutputModal, setExecutionOutputModal] = useState<string | null>(null);

  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month");
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [patients, setPatients] = useState<PatientItem[]>(initialPatients);
  const [selectedPatientDetail, setSelectedPatientDetail] = useState<PatientItem | null>(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [registerPatientFormOpen, setRegisterPatientFormOpen] = useState(false);

  // Patient registration form state
  const [patientFullName, setPatientFullName] = useState("");
  const [patientDob, setPatientDob] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [patientEmergencyContact, setPatientEmergencyContact] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientEmail, setPatientEmail] = useState("");

  const [filterQuery, setFilterQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusToast, setStatusToast] = useState<string | null>(null);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [createTaskFormOpen, setCreateTaskFormOpen] = useState(false);
  const [adjustItem, setAdjustItem] = useState<InventoryItem | null>(null);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const handleRegisterPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientFullName.trim()) return;
    const initials = patientFullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
    const newPatient: PatientItem = {
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      name: patientFullName.trim(),
      avatar: initials || "PT",
      contact: patientContact.trim() || "09170000000",
      dob: patientDob || "Sep 18, 2001",
      age: "25y",
      status: "New",
      email: patientEmail.trim() || "patient@example.com",
      emergencyContact: patientEmergencyContact.trim() || "None",
      registeredDate: "Aug 11, 2026, 02:25 PM",
      address: patientAddress.trim() || "Manila",
    };
    setPatients((prev) => [newPatient, ...prev]);
    setRegisterPatientFormOpen(false);
    setPatientFullName("");
    setPatientContact("");
    setPatientEmail("");
    triggerToast(`Registered new patient record for ${newPatient.name}.`);
  };

  // Task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskAssign, setNewTaskAssign] = useState("Administrator");
  const [newTaskDueDate, setNewTaskDueDate] = useState("2026-08-15");

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || undefined,
      assignedTo: newTaskAssign,
      dueDate: newTaskDueDate ? `Due ${newTaskDueDate}` : "Due Aug 15, 2026",
      status: "pending",
      completed: false,
      priority: "medium",
    };
    setTasks((prev) => [newTask, ...prev]);
    setCreateTaskFormOpen(false);
    setNewTaskTitle("");
    setNewTaskDesc("");
    triggerToast(`Task "${newTask.title}" assigned to ${newTask.assignedTo}.`);
  };

  const handleTaskStatusCycle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.status === "overdue" || t.status === "pending") {
            return { ...t, status: "in_progress" };
          }
          if (t.status === "in_progress") {
            return { ...t, status: "done", completed: true };
          }
          if (t.status === "done") {
            return { ...t, status: "pending", completed: false };
          }
        }
        return t;
      })
    );
    triggerToast("Task status updated.");
  };

  // Form states
  const [newPatientName, setNewPatientName] = useState("");
  const [newReason, setNewReason] = useState("");
  const [newTime, setNewTime] = useState("4:00pm - 4:30pm");
  const [newDay, setNewDay] = useState(11);

  const [newItemName, setNewItemName] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("boxes");
  const [newItemCategory, setNewItemCategory] = useState("Consumables");
  const [newItemQuantity, setNewItemQuantity] = useState(10);
  const [newItemReorderAt, setNewItemReorderAt] = useState(15);

  // AI Assistant state
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "user",
      text: "how do I book new appointment here?",
    },
    {
      role: "assistant",
      text: `To book a new appointment in ClinicFlow, follow these steps:

1. Click **Appointments** in the left sidebar.
2. Click the **+ Book appointment** button (or click directly on an open **Time slot** in the calendar view).
3. Fill out the booking form:
   - Search for and select the **Patient**
   - Select the doctor from the dropdown menu
   - Select the **Time slot**...`,
    },
  ]);
  const [aiInput, setAiInput] = useState("");

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const appointmentsTodayCount = appointments.filter((a) => a.dateDay === 11).length;
  const lowStockCount = inventory.filter((item) => item.quantity < item.reorderAt).length;

  const triggerToast = (msg: string) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(null), 4000);
  };

  const handleExecuteN8nCanvas = () => {
    setIsExecutingN8n(true);
    triggerToast("⚡ n8n Workflow Execution Started: Processing nodes in canvas...");

    setTimeout(() => {
      setIsExecutingN8n(false);
      if (activeN8nWorkflow === "dailyReport") {
        setExecutionOutputModal(`✅ n8n Execution Completed (0.8s)
Workflow: Daily Report (6PM)
Nodes Executed: 4/4
1. Schedule Trigger → Triggered at 18:00 PHT
2. Execute a SQL query (executeQuery) → Returned 5 summary tables from PostgreSQL Session Pooler (port 5432)
3. Code in JavaScript → Formatted HTML digest
4. Send a message (send: message) → Dispatched Gmail digest to admin@clinicflow.app

Summary Payload:
- Appointments Today: ${appointmentsTodayCount}
- Items Low on Stock: ${lowStockCount}
- Pending Tasks: ${pendingTasksCount}`);
      } else if (activeN8nWorkflow === "reminders") {
        setAppointments((prev) =>
          prev.map((apt) => (apt.dateDay === 11 ? { ...apt, reminderSent: true } : apt))
        );
        setExecutionOutputModal(`✅ n8n Execution Completed (0.6s)
Workflow: 24-Hour Appointment Reminders
Nodes Executed: 6/6
- Queried upcoming appointments in 24-hr window
- Filtered out records where reminder_sent_at is NOT NULL
- Sent Gmail notification to patients
- Updated PostgreSQL reminder_sent_at timestamp (0 duplicate guarantee)`);
      } else if (activeN8nWorkflow === "lowStock") {
        setExecutionOutputModal(`✅ n8n Execution Completed (0.5s)
Workflow: 6-Hour Low Stock Alert
Nodes Executed: 6/6
- Queried inventory table
- Filtered ${lowStockCount} items where quantity < reorder_at
- Dispatched stock reorder alert to clinic procurement team via Gmail`);
      } else {
        setExecutionOutputModal(`✅ n8n Execution Completed (0.4s)
Workflow: AI Staff Assistant & Webhook
Nodes Executed: 4/4
- Webhook received prompt
- Called LLM tool node connected to Supabase
- Returned role-based response`);
      }
    }, 1200);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;
    const newAppt: Appointment = {
      id: `apt-${Date.now()}`,
      patientName: newPatientName.trim(),
      reason: newReason.trim() || "General Consultation",
      time: newTime,
      dateDay: Number(newDay),
      status: "scheduled",
      reminderSent: false,
    };
    setAppointments((prev) => [...prev, newAppt]);
    setBookingModalOpen(false);
    setNewPatientName("");
    setNewReason("");
    triggerToast(`New appointment booked for ${newAppt.patientName} on Aug ${newAppt.dateDay}.`);
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: newItemName.trim(),
      unit: newItemUnit.trim() || "units",
      category: newItemCategory,
      quantity: Number(newItemQuantity),
      reorderAt: Number(newItemReorderAt),
    };
    setInventory((prev) => [newItem, ...prev]);
    setAddItemModalOpen(false);
    setNewItemName("");
    triggerToast(`Added ${newItem.name} (${newItem.quantity} ${newItem.unit}) to inventory.`);
  };

  const handleAdjustStock = (delta: number) => {
    if (!adjustItem) return;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === adjustItem.id) {
          const updatedQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: updatedQty };
        }
        return item;
      })
    );
    triggerToast(`Updated stock level for ${adjustItem.name}.`);
    setAdjustItem(null);
  };

  const handleStatusToggle = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          const nextStatus =
            apt.status === "scheduled"
              ? "confirmed"
              : apt.status === "confirmed"
                ? "completed"
                : "scheduled";
          return { ...apt, status: nextStatus };
        }
        return apt;
      })
    );
    triggerToast("Appointment status saved to Supabase database.");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    triggerToast("Task status updated.");
  };

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setAiInput("");

    setTimeout(() => {
      let reply = "I checked the database: Everything is operating within normal parameters.";
      const lower = userMsg.toLowerCase();
      if (lower.includes("n8n") || lower.includes("workflow") || lower.includes("report")) {
        reply = `n8n Workflow Status: Daily Report (6PM) workflow is published with 4 nodes: Schedule Trigger → Execute a SQL query (executeQuery) → Code in JavaScript → Send a message (Gmail).`;
      } else if (lower.includes("stock") || lower.includes("inventory") || lower.includes("low")) {
        reply = `Database Query Result: There are currently ${lowStockCount} items low on stock. Automated 6-hour n8n alert workflow is active.`;
      } else if (lower.includes("appointment") || lower.includes("today") || lower.includes("patient")) {
        reply = `Database Query Result: You have ${appointmentsTodayCount} appointments scheduled for today (Aug 11).`;
      }
      setAiMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    }, 600);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all"
        ? true
        : categoryFilter === "low"
          ? item.quantity < item.reorderAt
          : item.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const calendarDays = [
    { day: 26, isCurrentMonth: false },
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true, isToday: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
  ];

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col w-screen h-screen bg-slate-950 p-2 sm:p-4 overflow-hidden font-sans text-slate-900 dark:text-slate-100 animate-in fade-in duration-200"
          : "relative w-full overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-2xl font-sans text-slate-900 dark:text-slate-100"
      }
    >
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-200/80 dark:bg-slate-900/90 px-4 py-2.5 backdrop-blur-sm shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Minimize View (Esc)" : "Maximize View Fullscreen"}
            className="h-3.5 w-3.5 rounded-full bg-green-500/90 hover:scale-125 transition-transform flex items-center justify-center cursor-pointer"
          />
          <span className="ml-2 font-mono text-xs font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[240px] sm:max-w-none">
            ClinicFlow Healthcare Platform &amp; n8n Workflow Automation Canvas
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("n8n")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${activeTab === "n8n"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-slate-300/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
              }`}
          >
            <Zap className="h-3 w-3 text-amber-300" />
            <span>n8n Canvas</span>
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === "dashboard"
                ? "bg-[#1e3a2b] text-white"
                : "bg-slate-300/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
              }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === "inventory"
                ? "bg-[#1e3a2b] text-white"
                : "bg-slate-300/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
              }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${activeTab === "appointments"
                ? "bg-[#1e3a2b] text-white"
                : "bg-slate-300/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
              }`}
          >
            Appointments
          </button>

          {/* Dedicated Maximize / Fullscreen Toggle Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="ml-1.5 flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-mono font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Maximize Sandbox View"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Minimize</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Maximize</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Application Layout */}
      <div
        className={`flex flex-col md:flex-row bg-[#f8faf9] dark:bg-[#0c1210] ${isFullscreen ? "flex-1 min-h-0 h-full w-full overflow-hidden" : "min-h-[620px]"
          }`}
      >
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-4 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 px-2 py-2 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500 ring-4 ring-orange-500/20" />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                ClinicFlow
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "dashboard"
                    ? "bg-[#e8f3ee] dark:bg-[#1b3327] text-[#1e3a2b] dark:text-[#6ee7b7] font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("n8n")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "n8n"
                    ? "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-rose-500" />
                  <span>n8n Workflows</span>
                </div>
                <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
                  4 active
                </span>
              </button>

              <button
                onClick={() => setActiveTab("tasks")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "tasks"
                    ? "bg-[#e8f3ee] dark:bg-[#1b3327] text-[#1e3a2b] dark:text-[#6ee7b7] font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-4 w-4" />
                  <span>Tasks</span>
                </div>
                {pendingTasksCount > 0 && (
                  <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {pendingTasksCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("patients")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "patients"
                    ? "bg-[#e8f3ee] dark:bg-[#1b3327] text-[#1e3a2b] dark:text-[#6ee7b7] font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <Users className="h-4 w-4" />
                <span>Patients</span>
              </button>

              <button
                onClick={() => setActiveTab("appointments")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "appointments"
                    ? "bg-[#e8f3ee] dark:bg-[#1b3327] text-[#1e3a2b] dark:text-[#6ee7b7] font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4" />
                  <span>Appointments</span>
                </div>
                <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {appointments.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "inventory"
                    ? "bg-[#e8f3ee] dark:bg-[#1b3327] text-[#1e3a2b] dark:text-[#6ee7b7] font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4" />
                  <span>Inventory</span>
                </div>
                {lowStockCount > 0 && (
                  <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    {lowStockCount} low
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("reports")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "reports"
                    ? "bg-[#e8f3ee] dark:bg-[#1b3327] text-[#1e3a2b] dark:text-[#6ee7b7] font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <FileBarChart className="h-4 w-4" />
                <span>Reports</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "settings"
                    ? "bg-[#e8f3ee] dark:bg-[#1b3327] text-[#1e3a2b] dark:text-[#6ee7b7] font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* User Profile Badge (Matching Screenshot) */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
              <div className="h-8 w-8 rounded-full bg-[#111e18] dark:bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                SA
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
                  System Administrator
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  neilfrancislayosa04@gmail.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Status Toast Alert */}
          {statusToast && (
            <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-900/90 text-white px-4 py-3 text-xs shadow-lg animate-in fade-in slide-in-from-top-2 border border-emerald-500/40">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{statusToast}</span>
              </div>
              <button onClick={() => setStatusToast(null)} className="text-emerald-200 hover:text-white">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* N8N WORKFLOW CANVAS (Matching Screenshot) */}
          {activeTab === "n8n" && (
            <div className="space-y-4">
              {/* Workflow Picker */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#111916] p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 font-mono">Workflow Canvas:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => setActiveN8nWorkflow("dailyReport")}
                      className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-all ${activeN8nWorkflow === "dailyReport"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                    >
                      Daily Report (6PM)
                    </button>
                    <button
                      onClick={() => setActiveN8nWorkflow("reminders")}
                      className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-all ${activeN8nWorkflow === "reminders"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                    >
                      24-Hr Reminders
                    </button>
                    <button
                      onClick={() => setActiveN8nWorkflow("lowStock")}
                      className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-all ${activeN8nWorkflow === "lowStock"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                    >
                      6-Hr Low Stock Alert
                    </button>
                    <button
                      onClick={() => setActiveN8nWorkflow("aiAssistant")}
                      className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-all ${activeN8nWorkflow === "aiAssistant"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                    >
                      AI Staff Assistant
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleExecuteN8nCanvas}
                  disabled={isExecutingN8n}
                  className="flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 text-xs font-semibold shadow-md transition-all disabled:opacity-50"
                >
                  <Play className={`h-3.5 w-3.5 fill-current ${isExecutingN8n ? "animate-spin" : ""}`} />
                  <span>{isExecutingN8n ? "Running Execution..." : "Execute Workflow"}</span>
                </button>
              </div>

              {/* N8N CANVAS CONTAINER (Recreating exact screenshot aesthetics) */}
              <div className="relative rounded-xl border border-slate-800 bg-[#141416] text-slate-100 shadow-2xl overflow-hidden min-h-[460px] font-sans">
                {/* n8n Canvas Top Navigation Bar (Matching Screenshot) */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#18181c] px-4 py-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-400">Personal</span>
                    <span className="text-slate-600">/</span>
                    <span className="font-bold text-white text-sm">
                      {activeN8nWorkflow === "dailyReport"
                        ? "Daily Report (6PM)"
                        : activeN8nWorkflow === "reminders"
                          ? "24-Hour Appointment Reminders"
                          : activeN8nWorkflow === "lowStock"
                            ? "6-Hour Low Stock Alert"
                            : "AI Assistant & Webhook"}
                    </span>
                    <button className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                      <Tag className="h-3 w-3" />
                      <span>+ Add tag</span>
                    </button>
                  </div>

                  {/* Center Tabs */}
                  <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800 font-medium text-[11px]">
                    <button className="px-3 py-1 rounded bg-slate-700 text-white font-semibold shadow-xs">
                      Editor
                    </button>
                    <button className="px-3 py-1 rounded text-slate-400 hover:text-white">
                      Executions
                    </button>
                    <button className="px-3 py-1 rounded text-slate-400 hover:text-white">
                      Evaluations
                    </button>
                  </div>

                  {/* Right Header Status */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-400">0/3</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Published
                    </span>
                    <button className="text-slate-400 hover:text-white p-1">
                      <History className="h-4 w-4" />
                    </button>
                    <button className="text-slate-400 hover:text-white p-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 text-slate-200">
                      <Star className="h-3.5 w-3.5" />
                      <span>Star</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Editor Background with Dot Grid Matrix */}
                <div
                  className="relative p-10 min-h-[380px] flex items-center justify-center overflow-x-auto"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                >
                  {/* CANVAS NODES GRAPH (Daily Report 6PM 4-node flow matching screenshot) */}
                  {activeN8nWorkflow === "dailyReport" && (
                    <div className="flex items-center gap-6 relative">
                      {/* Connection Line */}
                      <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-700 -translate-y-1/2 -z-0" />
                      {isExecutingN8n && (
                        <div className="absolute top-1/2 left-10 right-10 h-1 bg-emerald-400 -translate-y-1/2 z-0 animate-pulse" />
                      )}

                      {/* NODE 1: Schedule Trigger */}
                      <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative h-20 w-24 rounded-2xl border-2 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-3 shadow-2xl transition-all group-hover:border-amber-500 group-hover:scale-105">
                          <span className="absolute -top-2 -left-2 h-5 w-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                            ⚡
                          </span>
                          <Clock className="h-8 w-8 text-slate-200 mb-1" />
                        </div>
                        <p className="mt-3 font-bold text-xs text-white">Schedule Trigger</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">Daily @ 18:00 PHT</p>
                      </div>

                      {/* Connector Arrow */}
                      <span className="text-slate-600 z-10 text-sm">→</span>

                      {/* NODE 2: Execute a SQL query */}
                      <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative h-20 w-24 rounded-2xl border-2 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-3 shadow-2xl transition-all group-hover:border-cyan-500 group-hover:scale-105">
                          <Database className="h-8 w-8 text-cyan-400 mb-1" />
                        </div>
                        <p className="mt-3 font-bold text-xs text-white">Execute a SQL query</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">executeQuery</p>
                      </div>

                      {/* Connector Arrow */}
                      <span className="text-slate-600 z-10 text-sm">→</span>

                      {/* NODE 3: Code in JavaScript */}
                      <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative h-20 w-24 rounded-2xl border-2 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-3 shadow-2xl transition-all group-hover:border-yellow-500 group-hover:scale-105">
                          <Code className="h-8 w-8 text-yellow-400 mb-1" />
                        </div>
                        <p className="mt-3 font-bold text-xs text-white">Code in JavaScript</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">Format HTML digest</p>
                      </div>

                      {/* Connector Arrow */}
                      <span className="text-slate-600 z-10 text-sm">→</span>

                      {/* NODE 4: Send a message (Gmail) */}
                      <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative h-20 w-24 rounded-2xl border-2 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-3 shadow-2xl transition-all group-hover:border-rose-500 group-hover:scale-105">
                          <Mail className="h-8 w-8 text-rose-500 mb-1" />
                        </div>
                        <p className="mt-3 font-bold text-xs text-white">Send a message</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">send: message (Gmail)</p>
                      </div>

                      {/* Plus node add button */}
                      <button className="z-10 ml-2 h-7 w-7 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* 24-Hour Appointment Reminders Workflow (6 nodes matching screenshot) */}
                  {activeN8nWorkflow === "reminders" && (
                    <div className="flex items-center gap-5 relative overflow-x-auto py-4">
                      <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-700 -translate-y-1/2 -z-0" />
                      {isExecutingN8n && (
                        <div className="absolute top-1/2 left-8 right-8 h-1 bg-emerald-400 -translate-y-1/2 z-0 animate-pulse" />
                      )}

                      {/* 1. Schedule Trigger */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <span className="absolute -top-1 -left-1 text-xs">⚡</span>
                          <Clock className="h-6 w-6 text-slate-200" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Schedule Trigger</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 2. Get many rows */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <Zap className="h-6 w-6 text-emerald-400" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Get many rows</p>
                        <p className="text-[9px] font-mono text-slate-400">getAll: row</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 3. Filter */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <SlidersHorizontal className="h-6 w-6 text-blue-400" />
                          <span className="absolute -right-3 top-1/2 -translate-y-1/2 bg-slate-800 text-[8px] font-mono text-slate-300 px-1 rounded border border-slate-700">Kept</span>
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Filter</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 4. Get a row */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <Zap className="h-6 w-6 text-emerald-400" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Get a row</p>
                        <p className="text-[9px] font-mono text-slate-400">get: row</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 5. Send a message */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <Mail className="h-6 w-6 text-rose-500" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Send a message</p>
                        <p className="text-[9px] font-mono text-slate-400">send: message</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 6. Update a row */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <Zap className="h-6 w-6 text-emerald-400" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Update a row</p>
                        <p className="text-[9px] font-mono text-slate-400">update: row</p>
                      </div>
                    </div>
                  )}

                  {/* 6-Hour Low Stock Alert Workflow (6 nodes matching screenshot) */}
                  {activeN8nWorkflow === "lowStock" && (
                    <div className="flex items-center gap-5 relative overflow-x-auto py-4">
                      <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-700 -translate-y-1/2 -z-0" />
                      {isExecutingN8n && (
                        <div className="absolute top-1/2 left-8 right-8 h-1 bg-amber-400 -translate-y-1/2 z-0 animate-pulse" />
                      )}

                      {/* 1. Schedule Trigger */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <span className="absolute -top-1 -left-1 text-xs">⚡</span>
                          <Clock className="h-6 w-6 text-slate-200" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Schedule Trigger</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 2. Get many rows */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <Zap className="h-6 w-6 text-emerald-400" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Get many rows</p>
                        <p className="text-[9px] font-mono text-slate-400">getAll: row</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 3. Filter */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <SlidersHorizontal className="h-6 w-6 text-blue-400" />
                          <span className="absolute -right-3 top-1/2 -translate-y-1/2 bg-slate-800 text-[8px] font-mono text-slate-300 px-1 rounded border border-slate-700">Kept</span>
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Filter</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 4. If */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <RefreshCw className="h-6 w-6 text-emerald-400" />
                          <div className="absolute -right-4 top-1 flex flex-col gap-0.5 text-[7px] font-mono">
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-0.5 rounded">true</span>
                            <span className="bg-slate-800 text-slate-400 px-0.5 rounded">false</span>
                          </div>
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">If</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 5. Code in JavaScript */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <Code className="h-6 w-6 text-yellow-400" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Code in JavaScript</p>
                      </div>

                      <span className="text-slate-600 z-10 text-xs">→</span>

                      {/* 6. Send a message */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-16 w-20 rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-2">
                          <Mail className="h-6 w-6 text-rose-500" />
                        </div>
                        <p className="mt-2 font-bold text-[11px] text-white">Send a message</p>
                        <p className="text-[9px] font-mono text-slate-400">send: message</p>
                      </div>
                    </div>
                  )}

                  {activeN8nWorkflow === "aiAssistant" && (
                    <div className="flex items-center gap-6 relative">
                      <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-700 -translate-y-1/2 -z-0" />
                      {isExecutingN8n && (
                        <div className="absolute top-1/2 left-10 right-10 h-1 bg-[#10b981] -translate-y-1/2 z-0 animate-pulse" />
                      )}

                      {/* NODE 1: Webhook */}
                      <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative h-20 w-24 rounded-2xl border-2 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-3 shadow-2xl transition-all group-hover:border-rose-500 group-hover:scale-105">
                          <span className="absolute -top-2 -left-2 h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">
                            ⚡
                          </span>
                          <span className="absolute bottom-1 right-2 text-[9px] font-mono text-rose-400 font-bold">POST</span>
                          <Zap className="h-8 w-8 text-rose-500 mb-1" />
                        </div>
                        <p className="mt-3 font-bold text-xs text-white">Webhook</p>
                      </div>

                      <span className="text-slate-600 z-10 text-sm">→</span>

                      {/* NODE 2: Message a model */}
                      <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative h-20 w-28 rounded-2xl border-2 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-3 shadow-2xl transition-all group-hover:border-emerald-500 group-hover:scale-105">
                          <Sparkles className="h-8 w-8 text-emerald-400 mb-1 animate-pulse" />
                          {/* Tools Connector */}
                          <div className="absolute -bottom-4 bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-[9px] font-mono flex items-center gap-1">
                            <span>Tools</span>
                            <span className="text-emerald-400">+</span>
                          </div>
                        </div>
                        <p className="mt-5 font-bold text-xs text-white">Message a model</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">message: text</p>
                      </div>

                      <span className="text-slate-600 z-10 text-sm">→</span>

                      {/* NODE 3: Respond to Webhook */}
                      <div className="relative z-10 flex flex-col items-center group">
                        <div className="relative h-20 w-24 rounded-2xl border-2 border-slate-700 bg-slate-900 flex flex-col items-center justify-center p-3 shadow-2xl transition-all group-hover:border-rose-500 group-hover:scale-105">
                          <Zap className="h-8 w-8 text-rose-500 mb-1" />
                        </div>
                        <p className="mt-3 font-bold text-xs text-white">Respond to Webhook</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY VIEW */}
          {activeTab === "inventory" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Inventory
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
                    <span>Monitor medical supplies and stock levels.</span>
                    <span className="text-amber-700 dark:text-amber-400 font-semibold font-mono">
                      - {lowStockCount} items low on stock
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => setAddItemModalOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-[#1e3a2b] hover:bg-[#15291e] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add item</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#111916] p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search medical item or category..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="low">⚠️ Low Stock Only ({lowStockCount})</option>
                    <option value="medicine">Medicine</option>
                    <option value="equipment">Equipment</option>
                    <option value="consumables">Consumables</option>
                    <option value="ppe">PPE</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="p-3.5 font-semibold">ITEM</th>
                      <th className="p-3.5 font-semibold">CATEGORY</th>
                      <th className="p-3.5 font-semibold text-center">QUANTITY</th>
                      <th className="p-3.5 font-semibold text-center">REORDER AT</th>
                      <th className="p-3.5 font-semibold">STATUS</th>
                      <th className="p-3.5 font-semibold text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredInventory.map((item) => {
                      const isLow = item.quantity < item.reorderAt;
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors group"
                        >
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {item.unit}
                            </div>
                          </td>

                          <td className="p-3.5 text-slate-600 dark:text-slate-300 font-medium">
                            {item.category}
                          </td>

                          <td className="p-3.5 text-center font-mono font-extrabold text-sm text-slate-800 dark:text-slate-100">
                            {item.quantity}
                          </td>

                          <td className="p-3.5 text-center font-mono text-slate-500 text-xs">
                            {item.reorderAt}
                          </td>

                          <td className="p-3.5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isLow
                                  ? "bg-[#fef3c7] dark:bg-amber-950/80 text-[#92400e] dark:text-amber-300"
                                  : "bg-[#dcfce7] dark:bg-emerald-950/80 text-[#166534] dark:text-emerald-300"
                                }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${isLow ? "bg-amber-600" : "bg-emerald-600"
                                  }`}
                              />
                              {isLow ? "Low stock" : "OK"}
                            </span>
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="inline-flex items-center gap-2 font-medium text-xs">
                              <button
                                onClick={() => setAdjustItem(item)}
                                className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline"
                              >
                                Adjust
                              </button>
                              <span className="text-slate-300 dark:text-slate-700">|</span>
                              <button
                                onClick={() => setAdjustItem(item)}
                                className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APPOINTMENTS VIEW */}
          {activeTab === "appointments" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Appointments
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Week, day, and month views — click a slot to book or an event for details.
                  </p>
                </div>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-[#1e3a2b] hover:bg-[#15291e] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Book appointment</span>
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] shadow-sm overflow-hidden p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                      <button className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-l-md">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-r-md border-l border-slate-200 dark:border-slate-800">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <button className="rounded-md border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                      Today
                    </button>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    August 2026
                  </h2>

                  <div className="flex items-center rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-0.5">
                    <button
                      onClick={() => setCalendarView("month")}
                      className={`px-3 py-1 text-xs font-semibold rounded ${calendarView === "month"
                          ? "bg-[#1e3a2b] text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        }`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setCalendarView("week")}
                      className={`px-3 py-1 text-xs font-semibold rounded ${calendarView === "week"
                          ? "bg-[#1e3a2b] text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setCalendarView("day")}
                      className={`px-3 py-1 text-xs font-semibold rounded ${calendarView === "day"
                          ? "bg-[#1e3a2b] text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        }`}
                    >
                      Day
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-400 py-2">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>

                  <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-[#111916]">
                    {calendarDays.map((cell, idx) => {
                      const dayAppts = appointments.filter(
                        (a) => cell.isCurrentMonth && a.dateDay === cell.day
                      );

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (cell.isCurrentMonth) {
                              setNewDay(cell.day);
                              setBookingModalOpen(true);
                            }
                          }}
                          className={`min-h-[96px] p-1.5 flex flex-col justify-between transition-colors cursor-pointer ${cell.isToday
                              ? "bg-emerald-50/40 dark:bg-emerald-950/20"
                              : cell.isCurrentMonth
                                ? "hover:bg-slate-50/80 dark:hover:bg-slate-900/40"
                                : "bg-slate-50/50 dark:bg-slate-950/40 text-slate-300 dark:text-slate-700"
                            }`}
                        >
                          <div className="text-right">
                            <span
                              className={`inline-block font-mono text-xs ${cell.isToday
                                  ? "h-5 w-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center ml-auto"
                                  : cell.isCurrentMonth
                                    ? "font-semibold text-slate-700 dark:text-slate-300"
                                    : "text-slate-400 dark:text-slate-600"
                                }`}
                            >
                              {cell.day}
                            </span>
                          </div>

                          <div className="space-y-1 mt-1 flex-1 overflow-y-auto">
                            {dayAppts.map((apt) => (
                              <div
                                key={apt.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAppt(apt);
                                }}
                                className={`p-1 rounded text-[10px] border leading-tight truncate transition-transform hover:scale-[1.02] ${apt.status === "confirmed"
                                    ? "bg-slate-100 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                                    : "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200"
                                  }`}
                                title={`${apt.time} ${apt.patientName} (${apt.reason})`}
                              >
                                <span className="font-mono text-[9px] opacity-75 font-semibold">
                                  {apt.time.split(" ")[0]}
                                </span>{" "}
                                <span className="font-bold">{apt.patientName}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Welcome back, System Administrator · Administrator
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-5 shadow-sm">
                  <p className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase font-mono">
                    APPOINTMENTS TODAY
                  </p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      {appointmentsTodayCount}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-medium">
                      0-dup auto reminder active
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-5 shadow-sm">
                  <p className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase font-mono">
                    LOW-STOCK ITEMS
                  </p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      {lowStockCount}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full font-medium">
                      <AlertTriangle className="h-3 w-3" /> 6-hr n8n alert
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-5 shadow-sm">
                  <p className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase font-mono">
                    PENDING TASKS
                  </p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                      {pendingTasksCount}
                    </span>
                    <button
                      onClick={() => setActiveTab("tasks")}
                      className="text-xs text-slate-500 hover:text-slate-900 underline"
                    >
                      View tasks
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase font-mono">
                    UPCOMING APPOINTMENTS (AUG 11)
                  </h2>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-xs text-emerald-600 font-semibold hover:underline"
                  >
                    Open Calendar View →
                  </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {appointments
                    .filter((a) => a.dateDay === 11)
                    .map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => handleStatusToggle(apt.id)}
                        className="p-4 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer"
                      >
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {apt.patientName}
                          </h3>
                          <p className="text-xs text-slate-500">{apt.reason}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-medium text-slate-600">
                            {apt.time}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${apt.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                              }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TASKS VIEW */}
          {activeTab === "tasks" && (
            <div className="space-y-5 font-sans">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Tasks
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    All clinic tasks — assign and track follow-ups. · Administrator
                  </p>
                </div>

                <button
                  onClick={() => setCreateTaskFormOpen(!createTaskFormOpen)}
                  className="flex items-center gap-2 rounded-lg bg-[#1e3a2b] hover:bg-[#15291e] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{createTaskFormOpen ? "Hide form" : "Create task"}</span>
                </button>
              </div>

              {/* Create Task Form */}
              {createTaskFormOpen && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-5 shadow-sm space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Create task</h3>
                  <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Assign to <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={newTaskAssign}
                          onChange={(e) => setNewTaskAssign(e.target.value)}
                          className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                        >
                          <option value="Select staff member">Select staff member</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Dr. Layosa">Dr. Layosa</option>
                          <option value="Nurse Maria">Nurse Maria</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Due date
                        </label>
                        <input
                          type="date"
                          value={newTaskDueDate}
                          onChange={(e) => setNewTaskDueDate(e.target.value)}
                          className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Task title..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Task description..."
                        value={newTaskDesc}
                        onChange={(e) => setNewTaskDesc(e.target.value)}
                        className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setCreateTaskFormOpen(false)}
                        className="rounded-md border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-[#1e3a2b] hover:bg-[#15291e] px-4 py-2 text-xs font-semibold text-white"
                      >
                        Create task
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tasks List */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {task.title}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold inline-flex items-center gap-1 ${task.status === "done"
                              ? "bg-[#dcfce7] dark:bg-emerald-950/80 text-[#166534] dark:text-emerald-300"
                              : task.status === "overdue"
                                ? "bg-[#fef3c7] dark:bg-amber-950/80 text-[#92400e] dark:text-amber-300"
                                : task.status === "in_progress"
                                  ? "bg-[#fef3c7] dark:bg-amber-950/80 text-[#92400e] dark:text-amber-300"
                                  : "bg-[#e0e7ff] dark:bg-blue-950/80 text-[#3730a3] dark:text-blue-300"
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${task.status === "done"
                                ? "bg-emerald-600"
                                : task.status === "overdue" || task.status === "in_progress"
                                  ? "bg-amber-600"
                                  : "bg-blue-600"
                              }`}
                          />
                          {task.status === "done"
                            ? "Done"
                            : task.status === "overdue"
                              ? "Overdue"
                              : task.status === "in_progress"
                                ? "In progress"
                                : "Pending"}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {task.description}
                        </p>
                      )}

                      <p
                        className={`text-[11px] font-mono ${task.status === "overdue"
                            ? "text-rose-600 dark:text-rose-400 font-semibold"
                            : "text-slate-400"
                          }`}
                      >
                        {task.dueDate}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleTaskStatusCycle(task.id)}
                        className="px-4 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
                      >
                        {task.status === "in_progress"
                          ? "Done"
                          : task.status === "done"
                            ? "Reopen"
                            : "Start"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PATIENTS VIEW */}
          {activeTab === "patients" && (
            <div className="space-y-5 font-sans">
              {selectedPatientDetail ? (
                /* Patient Detail View matching screenshot */
                <div className="space-y-6 animate-in fade-in duration-200">
                  <button
                    onClick={() => setSelectedPatientDetail(null)}
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    ← Back to patients
                  </button>

                  {/* Patient Profile Header */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-[#111916] text-white flex items-center justify-center font-bold text-lg border border-slate-800 shadow-md">
                      {selectedPatientDetail.avatar}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {selectedPatientDetail.name}
                      </h1>
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        {selectedPatientDetail.age} · {selectedPatientDetail.dob} · {selectedPatientDetail.id}
                      </p>
                    </div>
                  </div>

                  {/* Patient Information Card */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Patient information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          DATE OF BIRTH
                        </p>
                        <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                          {selectedPatientDetail.dob}
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          CONTACT NUMBER
                        </p>
                        <p className="mt-1 font-mono font-medium text-slate-800 dark:text-slate-200">
                          {selectedPatientDetail.contact}
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          EMAIL
                        </p>
                        <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                          {selectedPatientDetail.email}
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          EMERGENCY CONTACT
                        </p>
                        <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                          {selectedPatientDetail.emergencyContact}
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          REGISTERED
                        </p>
                        <p className="mt-1 font-mono text-slate-700 dark:text-slate-300">
                          {selectedPatientDetail.registeredDate}
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          ADDRESS
                        </p>
                        <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                          {selectedPatientDetail.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visit History Card */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-6 shadow-sm space-y-3">
                    <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      VISIT HISTORY
                    </p>
                    <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-400">
                      No visits recorded yet.
                    </div>
                  </div>
                </div>
              ) : (
                /* Patients Directory List matching screenshot */
                <div className="space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Patients
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Search and manage patient records.
                      </p>
                    </div>

                    <button
                      onClick={() => setRegisterPatientFormOpen(!registerPatientFormOpen)}
                      className="flex items-center gap-2 rounded-lg bg-[#1e3a2b] hover:bg-[#15291e] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{registerPatientFormOpen ? "Hide form" : "Add patient"}</span>
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, contact, email, or patient ID..."
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] pl-9 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
                    />
                  </div>

                  {/* Register New Patient Form */}
                  {registerPatientFormOpen && (
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] p-5 shadow-sm space-y-4 animate-in fade-in duration-200">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Register new patient</h3>
                      <form onSubmit={handleRegisterPatientSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase">
                              FULL NAME <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Full patient name..."
                              value={patientFullName}
                              onChange={(e) => setPatientFullName(e.target.value)}
                              className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase">
                              DATE OF BIRTH <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="date"
                              value={patientDob}
                              onChange={(e) => setPatientDob(e.target.value)}
                              className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase">
                              CONTACT NUMBER
                            </label>
                            <input
                              type="text"
                              placeholder="09991112233"
                              value={patientContact}
                              onChange={(e) => setPatientContact(e.target.value)}
                              className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase">
                              EMERGENCY CONTACT
                            </label>
                            <input
                              type="text"
                              placeholder="Name (Relation) - Number"
                              value={patientEmergencyContact}
                              onChange={(e) => setPatientEmergencyContact(e.target.value)}
                              className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase">
                            ADDRESS
                          </label>
                          <input
                            type="text"
                            placeholder="Street, City..."
                            value={patientAddress}
                            onChange={(e) => setPatientAddress(e.target.value)}
                            className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase">
                            EMAIL
                          </label>
                          <input
                            type="email"
                            placeholder="patient@example.com"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setRegisterPatientFormOpen(false)}
                            className="rounded-md border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-[#1e3a2b] hover:bg-[#15291e] px-4 py-2 text-xs font-semibold text-white"
                          >
                            Register patient
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Patients Table */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111916] shadow-sm overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <tr>
                          <th className="p-3.5 font-semibold">PATIENT</th>
                          <th className="p-3.5 font-semibold">CONTACT</th>
                          <th className="p-3.5 font-semibold">AGE / DOB</th>
                          <th className="p-3.5 font-semibold">STATUS</th>
                          <th className="p-3.5 font-semibold">ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {patients
                          .filter(
                            (p) =>
                              p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
                              p.contact.includes(patientSearchQuery) ||
                              p.id.toLowerCase().includes(patientSearchQuery.toLowerCase())
                          )
                          .map((p) => (
                            <tr
                              key={p.id}
                              onClick={() => setSelectedPatientDetail(p)}
                              className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors cursor-pointer group"
                            >
                              <td className="p-3.5">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-[#111916] text-white flex items-center justify-center font-bold text-xs border border-slate-800">
                                    {p.avatar}
                                  </div>
                                  <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {p.name}
                                  </span>
                                </div>
                              </td>

                              <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                                {p.contact}
                              </td>

                              <td className="p-3.5 text-slate-700 dark:text-slate-300 font-mono">
                                <span className="font-bold text-slate-900 dark:text-white">{p.age}</span> · {p.dob}
                              </td>

                              <td className="p-3.5">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fef3c7] dark:bg-amber-950/80 text-[#92400e] dark:text-amber-300">
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                                  {p.status}
                                </span>
                              </td>

                              <td className="p-3.5 font-mono text-slate-500 text-xs">
                                {p.id}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* REPORTS & SETTINGS VIEWS */}
          {(activeTab === "reports" || activeTab === "settings") && (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111916]">
              <h2 className="text-base font-bold capitalize text-slate-800 dark:text-slate-200">
                ClinicFlow {activeTab} Module
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Connected to Supabase PostgreSQL database tables with Row Level Security (RLS) policies.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* EXECUTION OUTPUT MODAL */}
      {executionOutputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-5 text-white shadow-2xl animate-in fade-in zoom-in-95 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-400">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>n8n Workflow Execution Result</span>
              </h3>
              <button onClick={() => setExecutionOutputModal(null)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <pre className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono leading-relaxed text-slate-200 whitespace-pre-wrap overflow-x-auto">
              {executionOutputModal}
            </pre>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setExecutionOutputModal(null)}
                className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white"
              >
                Close Output
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ITEM MODAL */}
      {addItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-5 text-white shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Plus className="h-4 w-4 text-emerald-400" />
                <span>Add Inventory Item</span>
              </h3>
              <button onClick={() => setAddItemModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddItemSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amoxicilin"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Medicine">Medicine</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Consumables">Consumables</option>
                    <option value="PPE">PPE</option>
                    <option value="IV Solutions">IV Solutions</option>
                    <option value="Disinfectants">Disinfectants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. packs, units, boxes"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Current Quantity</label>
                  <input
                    type="number"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Reorder At Threshold</label>
                  <input
                    type="number"
                    value={newItemReorderAt}
                    onChange={(e) => setNewItemReorderAt(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddItemModalOpen(false)}
                  className="rounded-md bg-slate-800 px-3.5 py-2 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-white font-semibold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STOCK ADJUSTMENT MODAL */}
      {adjustItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-5 text-white shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-emerald-400" />
                <span>Adjust Stock Level</span>
              </h3>
              <button onClick={() => setAdjustItem(null)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <p><span className="text-slate-400 font-mono">Item:</span> <span className="font-bold text-white text-sm">{adjustItem.name}</span> ({adjustItem.unit})</p>
              <p><span className="text-slate-400 font-mono">Current Quantity:</span> <span className="font-mono text-emerald-400 font-bold">{adjustItem.quantity}</span></p>
              <p><span className="text-slate-400 font-mono">Reorder Threshold:</span> <span className="font-mono text-slate-300">{adjustItem.reorderAt}</span></p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjustStock(-1)}
                className="h-10 w-12 rounded-lg bg-red-950/80 border border-red-800 text-red-200 font-extrabold text-lg hover:bg-red-900"
              >
                -1
              </button>
              <button
                onClick={() => handleAdjustStock(+5)}
                className="h-10 w-12 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-200 font-extrabold text-xs hover:bg-emerald-900"
              >
                +5
              </button>
              <button
                onClick={() => handleAdjustStock(+10)}
                className="h-10 w-12 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-200 font-extrabold text-xs hover:bg-emerald-900"
              >
                +10
              </button>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setAdjustItem(null)}
                className="rounded-md bg-slate-800 hover:bg-slate-700 px-4 py-1.5 text-xs text-slate-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOK APPOINTMENT MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-5 text-white shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Plus className="h-4 w-4 text-emerald-400" />
                <span>Book New Appointment</span>
              </h3>
              <button onClick={() => setBookingModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleBookSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Santos"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Consultation Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Follow-up consultation"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">August 2026 Day</label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        Aug {d} {d === 11 ? "(Today)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Time Slot</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="rounded-md bg-slate-800 px-3.5 py-2 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-white font-semibold"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IN-SYSTEM AI ASSISTANT WIDGET (Positioned strictly inside the ClinicFlow Sandbox) */}
      <div className="absolute bottom-4 right-4 z-30 font-sans">
        {!aiOpen ? (
          <button
            onClick={() => setAiOpen(true)}
            className="flex items-center gap-2 rounded-full bg-[#1e3a2b] hover:bg-[#15291e] text-white px-4 py-2 text-xs font-semibold shadow-2xl transition-transform hover:scale-105 border border-emerald-800/40"
          >
            <HelpCircle className="h-4 w-4 text-emerald-400" />
            <span>Help</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 rounded-xl border border-slate-700 bg-[#0f1715] text-slate-100 shadow-2xl overflow-hidden font-sans border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#111e18] p-3 flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>ClinicFlow Assistant</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  How-to guidance only · no live data access
                </p>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="h-4 w-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="p-3 h-64 overflow-y-auto space-y-2.5 text-xs bg-slate-950/60">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${msg.role === "user"
                      ? "bg-[#1e3a2b] text-white ml-auto font-medium"
                      : "bg-slate-900 text-slate-200 mr-auto border border-slate-800 whitespace-pre-wrap"
                    }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleAiSend} className="p-2.5 border-t border-slate-800 flex gap-2 bg-slate-900">
              <input
                type="text"
                placeholder="Ask me how to use ClinicFlow..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-[#1e3a2b] hover:bg-[#15291e] text-white px-3 py-1.5 rounded-md text-xs font-semibold"
              >
                Send
              </button>
            </form>

            <div className="px-3 pb-2.5 pt-1 bg-slate-900 border-t border-slate-800/60 flex justify-end">
              <button
                onClick={() => setAiOpen(false)}
                className="bg-[#111e18] hover:bg-slate-800 text-slate-200 px-3 py-1 rounded text-xs font-semibold border border-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
