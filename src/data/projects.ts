// Neil Francis Layosa's Projects & Case Studies

export const categories = [
  "Web Applications",
  "AI Automation",
  "Internal Tools",
  "Business Systems",
  "API Integration",
  "Technical Systems",
] as const;

export type Category = (typeof categories)[number];

/** Layer a node belongs to in the system flow. Drives diagram styling. */
export type NodeKind = "input" | "app" | "automation" | "ai" | "data" | "output";

export interface DiagramNode {
  label: string;
  kind: NodeKind;
  /** Optional one-line note about what happens at this step. */
  detail?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: Category;
  /** One line: what the system does, in operational terms. */
  summary: string;
  /** One line: the business problem. */
  problem: string;
  /** One line: the system that solves it. */
  system: string;
  /** One line: the automation layer. */
  automation: string;
  /** One line: the outcome. */
  result: string;
  tech: string[];
  thumbnail?: string;
  placeholder: boolean;
  diagram: DiagramNode[];
  overview: string;
  existingWorkflow: string[];
  proposedWorkflow: string[];
  solution: string[];
  howItWorks: string[];
  features: string[];
  automationWorkflow: string[];
  aiComponents: string[];
  backend: string[];
  screenshots: { caption: string; image?: string; workflowGroup?: string }[];
  challenges: string[];
  learned: string[];
  businessValue: string[];
  demoUrl: string | null;
  repoUrl: string | null;
}

export const projects: Project[] = [
  {
    slug: "automated-document-reception-system",
    name: "Automated Document Reception & Email Notification System",
    category: "Technical Systems",
    summary:
      "Best Thesis Award-winning full-stack document reception and physical tracking system integrated with ESP32 hardware sensors, live camera capture, and multi-node routing audit trails.",
    problem: "Manual document intake at office receptions caused misplaced physical mail, unverified document submissions, lack of document tracking across departments, and delayed notifications to recipients.",
    system: "Full-stack web application (PHP, Supabase, ESP32, ESP32-CAM, HTML/CSS/JS) connecting physical hardware sensors and camera stream to instant web & email alerts, complete with an administrative tracking dashboard.",
    automation: "ESP32 hardware sensors detect document insertion, trigger live camera stream capture, fire server-side email notifications, and log multi-node physical routing progress across departments.",
    result: "Awarded Best Thesis for innovative hardware-software integration that digitized document drop-offs, enabled photographic proof-of-delivery, and enforced strict multi-stage document routing.",
    tech: ["PHP", "Supabase", "ESP32", "ESP32-CAM", "JavaScript", "HTML5", "CSS3", "SQL"],
    thumbnail: "/images/projects/automated-document-reception-system/admin-dashboard.png",
    placeholder: false,
    diagram: [
      { label: "Hardware Sensor & ESP32-CAM", kind: "input", detail: "ESP32 detects document drop & activates live video preview" },
      { label: "Document Intake Form", kind: "app", detail: "Auto-generates DOC-ID, selects recipients & captures document image" },
      { label: "PHP API Endpoint", kind: "automation", detail: "Validates drop event payload & triggers mailer" },
      { label: "Supabase Database", kind: "data", detail: "Stores timestamped arrival records, retention policies & audit logs" },
      { label: "Admin Console & Tracking Engine", kind: "output", detail: "Real-time KPI dashboard, multi-node location routing & PDF export" },
    ],
    overview:
      "Designed and developed a full-stack document reception and tracking system integrated with ESP32 hardware sensors and ESP32-CAM live stream preview for my Computer Engineering thesis, winning the Best Thesis Award. The system digitizes physical document drop-offs, captures document photos directly from an embedded ESP32 camera module, automates instant email notifications, and tracks physical document movement across university offices.",
    existingWorkflow: [
      "Couriers and visitors deposited physical documents in unmonitored dropboxes",
      "Recipients were unaware of arrivals until manually checked hours or days later",
      "No digital photographic evidence or verifiable timestamp trail for physical document submissions",
      "Moving documents between offices (Faculty, Dean's Office, Outside) lacked transfer logging, resulting in lost records",
      "Administrative staff had no centralized console to search past records, monitor submission analytics, or set retention rules",
    ],
    proposedWorkflow: [
      "Visitor fills Document Intake Form with auto-generated ID (DOC-xxxxxxxxxxxx), sender name, document type, and recipient selection",
      "Live ESP32-CAM camera stream allows capturing photos of physical documents directly before finalizing drop",
      "Document submission registers event in Supabase database and triggers PHP mailer backend for instant recipient notification",
      "Administrators monitor real-time KPIs (Total Documents, Daily Submissions Chart, Active Recipients, Unread Notifications) via the Admin Dashboard",
      "Document Record module tracks archive status, 7-year retention policies, attached camera photos, and PDF export options",
      "Strict document routing engine enforces multi-stage location transitions (Faculty Office ↔ Dean's Office ↔ Outside Faculty) with complete movement audit logs",
    ],
    solution: [
      "ESP32 firmware written to interface with physical detection sensors and Wi-Fi stack",
      "ESP32-CAM video stream overlay module embedded directly in the web document intake form with capture and multi-shot controls",
      "PHP REST API backend receiving intake payloads, handling mailer dispatch, and managing DB state",
      "Supabase database tracking document logs, recipient accounts, document categories, routing states, and audit logs",
      "Comprehensive Admin Console featuring Dashboard KPIs, daily submissions chart, detailed document inspector, 7-year retention rules, and physical location movement tracking",
    ],
    howItWorks: [
      "Document Intake — Visitor fills form details (Auto-generated Document ID, Title, Type, Sender Name, Recipient selection)",
      "Live Camera Capture — ESP32-CAM streams live preview panel, enabling multi-shot document photo capture before submission",
      "Backend Transmission & Storage — PHP API receives drop event, writes metadata and captured image references to Supabase",
      "Automated Recipient Alert — Email notification system dispatches instant arrival alert with drop context to selected recipients",
      "Admin Analytics & Tracking — Admins review daily submission trends, inspect document photo records, export PDFs, and record physical transfers across offices",
    ],
    features: [
      "IoT hardware-to-cloud integration via ESP32 sensor detection",
      "Embedded ESP32-CAM live video preview & document image capture panel",
      "Auto-generated unique Document Tracking IDs (DOC-xxxxxxxxxxxx)",
      "Multi-recipient target selection (Faculty Instructors, Program Heads, Departments)",
      "Instant automated email alerts upon document drop-off",
      "Admin Dashboard with real-time KPIs & Daily Submissions analytics chart",
      "Detailed Document Record inspector with 7-year archive retention rules & PDF export",
      "Multi-node physical document routing pipeline (Faculty Office ↔ Dean's Office ↔ Outside Faculty)",
      "Audit trail movement logger with timestamped transfer records",
      "Recipients & Instructors Management Portal with role badges (Instructor, Program Head, Office) & Active toggles",
      "Academic Programs Analytics & Document Distribution Hub (BSCE, BSCpE, BSEE, BSME)",
      "Best Thesis Award winning architecture",
    ],
    automationWorkflow: [
      "Trigger: Hardware sensor drop event or digital intake form submission",
      "Image Processing: Live ESP32-CAM stream capture & image binding to Document ID",
      "Transmit: Secure HTTP POST payload to PHP REST backend API",
      "Action: Supabase database record creation + instant SMTP email alert delivery to designated recipients",
      "Routing & Tracking: Admin transfers update location status (Faculty ↔ Dean ↔ Outside) with enforced movement rules",
    ],
    aiComponents: [
      "Hardware-software IoT integration logic & live ESP32-CAM camera stream processing",
    ],
    backend: [
      "PHP backend API & SMTP notification engine",
      "Supabase database for document records, location logs, recipient rosters, and audit trails",
      "ESP32 & ESP32-CAM microcontroller firmware",
    ],
    screenshots: [
      {
        caption: "Document Intake Form & ESP32-CAM Live Video Stream Integration (Auto-generated Document ID, Recipient Selection & Camera Capture)",
        image: "/images/projects/automated-document-reception-system/document-intake-form.png",
      },
      {
        caption: "Admin Authentication Console (v1.3) & System Features (Dashboard & KPIs, Records Search, Recipient Control & Audit Logs)",
        image: "/images/projects/automated-document-reception-system/admin-signin.png",
      },
      {
        caption: "Admin Operations Dashboard (KPI Cards, Daily Submissions Analytics Chart, Date Range Filters & Recent Submissions)",
        image: "/images/projects/automated-document-reception-system/admin-dashboard.png",
      },
      {
        caption: "Detailed Document Record Inspector (Archive Status, 7-Year Retention Policy, Attached Camera Photo & PDF/Print Controls)",
        image: "/images/projects/automated-document-reception-system/document-record-details.png",
      },
      {
        caption: "Multi-Node Document Tracking & Movement Routing Pipeline (Enforced Faculty ↔ Dean ↔ Outside Transfer Logging)",
        image: "/images/projects/automated-document-reception-system/document-tracking-flow.png",
      },
      {
        caption: "Recipients & Instructors Management Portal (Role Badges, Active/Inactive Toggles, Program Assignments & Search Filters)",
        image: "/images/projects/automated-document-reception-system/recipients-instructors.png",
      },
      {
        caption: "Academic Programs Overview (Document Counts per Department: BSCE, BSCpE, BSEE, BSME & Recent Program Documents Table)",
        image: "/images/projects/automated-document-reception-system/programs-documents.png",
      },
    ],
    challenges: [
      "Integrating real-time ESP32-CAM live video stream and capture triggering seamlessly into the browser intake form alongside document metadata validation.",
      "Designing a multi-stage physical document tracking state machine that enforces strict organizational routing rules (Faculty Office first before Dean's Office or Outside).",
      "Ensuring reliable Wi-Fi reconnect logic and debouncing hardware sensors on the ESP32 to prevent duplicate drop triggers.",
    ],
    learned: [
      "Bridging physical hardware sensors and camera modules with web software requires low-latency streaming and idempotent backend triggers.",
      "Combining physical document intake with digital routing pipelines provides complete transparency and accountability across organizational departments.",
      "Designing clean UI forms with live hardware previews makes physical document submission intuitive for non-technical users.",
    ],
    businessValue: [
      "Eliminated missed, unverified, or delayed physical document deliveries",
      "Captured photographic evidence and auto-generated tracking IDs for every physical intake",
      "Enforced strict multi-department document routing with complete movement audit trails",
      "Provided verifiable digital audit trail for physical document arrivals across faculty & administrative departments",
      "Won Best Thesis Award for practical innovation",
    ],
    demoUrl: null,
    repoUrl: null,
  },
  {
    slug: "clinicflow",
    name: "ClinicFlow — Healthcare Operations Platform",
    category: "Business Systems",
    summary:
      "Recently completed healthcare operations platform covering patients, appointments, staff tasks, inventory, and reporting. Includes automated inventory alerts, appointment notifications, daily reports for administrators and doctors, and an AI assistant for system-related queries. (Recently completed, not yet deployed).",
    problem:
      "Clinic operations suffered from manual inventory checks, staff manually tracking upcoming appointments, risk of duplicate reminder emails, manual daily stats gathering, and delayed administrative reporting.",
    system:
      "React (+ Vite) frontend with a Supabase/PostgreSQL backend (9 tables), Row Level Security (RLS), and Session Pooler architecture on port 5432.",
    automation:
      "4 live n8n workflows (20 total nodes) handling 6-hour stock alerts, zero-duplicate 24-hour appointment reminders, daily 6 PM reporting via SQL queries, and an AI assistant.",
    result:
      "Automated 6-hour inventory alerts, 0-duplicate 24-hour appointment reminders verified across 10+ manual test scenarios, automated daily reporting across 5 categories, and in-system AI support.",
    tech: ["React", "Vite", "Supabase", "PostgreSQL", "SQL", "n8n", "Gmail", "JavaScript"],
    thumbnail: "/images/projects/clinicflow/dashboard.png",
    placeholder: false,
    diagram: [
      { label: "Clinic Staff & Reception", kind: "input", detail: "Inputs patient, appointment & inventory data" },
      { label: "React (+ Vite) Frontend", kind: "app", detail: "Interactive UI for operations, tasks & reports" },
      { label: "Supabase / PostgreSQL", kind: "data", detail: "9 tables connected via Session Pooler (port 5432)" },
      { label: "n8n Automation Engine", kind: "automation", detail: "4 workflows (20 nodes) with 0-duplicate DB logic" },
      { label: "AI Assistant & Webhook", kind: "ai", detail: "In-system support with Supabase data access" },
      { label: "Gmail Alerts & Reports", kind: "output", detail: "Delivers reminders, stock alerts & 6PM digests" },
    ],
    overview:
      "ClinicFlow is a healthcare operations platform built solo to digitize and automate patient management, appointment scheduling, staff tasks, inventory control, and daily clinical reporting. Recurring administrative duties are automated through four live n8n workflows connected directly to Supabase/PostgreSQL, reducing manual overhead and ensuring zero-duplicate communications.",
    existingWorkflow: [
      "Staff manually checked inventory levels on a daily or weekly basis, leading to unexpected stockouts",
      "Receptionists manually tracked upcoming appointments and phoned or messaged patients individually",
      "Manual reminder follow-ups lacked state tracking, risking missed alerts or duplicate messages",
      "Daily performance stats (appointments, new patients, low stock, overdue tasks, top doctors) were gathered manually at shift end",
      "Staff manually compiled and emailed daily operational reports to clinic administration",
    ],
    proposedWorkflow: [
      "Staff manage patients, appointments, tasks, and inventory transactions through a streamlined React web app",
      "n8n executes automated inventory checks every 6 hours and sends Gmail alerts when stock falls below thresholds",
      "n8n polls upcoming appointments daily within a 24-hour window and sends automated Gmail reminders",
      "Database field reminder_sent_at automatically updates in PostgreSQL to guarantee zero duplicate reminder messages",
      "PostgreSQL query executes daily at 6:00 PM Asia/Manila to collect 5 report categories, formatted via JS and emailed via Gmail",
      "In-system AI assistant answers staff operational queries with role-based database tools",
    ],
    solution: [
      "React (+ Vite) frontend featuring modular views for Patients, Appointments, Staff Tasks, Inventory, and Reports",
      "Supabase PostgreSQL backend featuring 9 core tables (appointments, clinic_settings, inventory_items, inventory_transactions, patients, reports, tasks, users, visits) seeded with 10+ test records per table",
      "4 live n8n workflows (20 total nodes) for automated 6-hr inventory checks, 24-hr appointment reminders, 6 PM daily reporting, and AI assistant",
      "Infrastructure optimization: switched from Transaction Pooler (port 6543) to Session Pooler (port 5432) to resolve IPv6/SSL connection bottlenecks",
    ],
    howItWorks: [
      "Intake & Management — Receptionists and doctors manage patient records, register visits, and update appointments in the React UI",
      "6-Hour Inventory Check — n8n trigger fires every 6 hours → fetches stock rows → filters low stock → JS formats alert → Gmail notifies staff",
      "24-Hour Appointment Reminders — n8n trigger checks appointments within 24 hours → filters out entries where reminder_sent_at is set → Gmail sends reminder → DB updates reminder_sent_at (0 duplicate guarantee)",
      "Daily 6:00 PM Operational Report — n8n trigger executes daily at 6 PM Asia/Manila → runs SQL query aggregating stats (appointments, new patients, low stock, overdue tasks, top doctors) → JS formats report → Gmail sends digest to admin",
      "AI Staff Assistant — Webhook receives staff queries in the app → LLM uses database tools with role-based security → returns contextual answer",
    ],
    features: [
      "4 Live n8n Automation Workflows (20 total nodes)",
      "Automated 24-Hour Appointment Reminders with 0-duplicate database logic (reminder_sent_at tracking)",
      "Automated 6-Hour Low Stock Inventory Monitoring & Email Alerts",
      "Daily 6:00 PM Automated Operations Report across 5 key categories",
      "In-system AI Assistant with Supabase tool access and role-based security",
      "9 Relational PostgreSQL Database Tables with 10+ seeded demo records per table",
      "Supabase Session Pooler Infrastructure Architecture (port 5432)",
    ],
    automationWorkflow: [
      "Appointment Reminders (6 nodes): Schedule Trigger → Get many rows → Filter → Get a row → Send a message (Gmail) → Update a row (reminder_sent_at set)",
      "Low Stock Alert (6 nodes): Schedule Trigger → Get many rows → Filter → If → Code (JavaScript) → Send a message (Gmail)",
      "Daily Report 6PM (4 nodes): Schedule Trigger → Execute a SQL query → Code (JavaScript) → Send a message (Gmail)",
      "AI Assistant (4 nodes): Webhook → Message a model (with Tools) → Respond to Webhook",
    ],
    aiComponents: [
      "In-system AI Assistant built with n8n Webhook and tool-calling LLM node, featuring Supabase PostgreSQL data access and role-based security filters to answer staff inquiries and navigate clinic workflows.",
    ],
    backend: [
      "Supabase PostgreSQL database with 9 core relational tables (appointments, clinic_settings, inventory_items, inventory_transactions, patients, reports, tasks, users, visits)",
      "Supabase Session Pooler (port 5432) resolving IPv6/SSL connectivity issues",
      "Row Level Security (RLS) policies enforcing role-based clinic staff access",
      "Custom SQL queries powering automated daily 6 PM report generation",
    ],
    screenshots: [
      {
        caption: "ClinicFlow Dashboard & Operations Overview",
        image: "/images/projects/clinicflow/dashboard.png",
      },
      {
        caption: "Patients Directory & Search Interface",
        image: "/images/projects/clinicflow/patients.png",
      },
      {
        caption: "Patient Detail & Medical Profile Record",
        image: "/images/projects/clinicflow/patient-detail.png",
      },
      {
        caption: "Register New Patient Form Interface",
        image: "/images/projects/clinicflow/register-patient.png",
      },
      {
        caption: "Tasks Management & Follow-ups Tracker",
        image: "/images/projects/clinicflow/tasks.png",
      },
      {
        caption: "Create Task Form & Staff Assignment Interface",
        image: "/images/projects/clinicflow/create-task.png",
      },
      {
        caption: "Appointments Calendar & Patient Booking Interface",
        image: "/images/projects/clinicflow/appointments.png",
      },
      {
        caption: "Inventory Control & Low Stock Indicator",
        image: "/images/projects/clinicflow/inventory.png",
      },
      {
        caption: "In-System ClinicFlow AI Assistant (How-to Guidance)",
        image: "/images/projects/clinicflow/clinicflow-ai-assistant-feature.png",
      },
      {
        caption: "n8n Canvas — 24-Hour Appointment Reminders Workflow (6 nodes)",
        image: "/images/projects/clinicflow/n8n-appointment-reminders.png",
      },
      {
        caption: "n8n Canvas — 6-Hour Low Stock Alert Workflow (6 nodes)",
        image: "/images/projects/clinicflow/n8n-low-stock-alert.png",
      },
      {
        caption: "n8n Canvas — Daily 6PM Operational Report Workflow (4 nodes)",
        image: "/images/projects/clinicflow/n8n-daily-report.png",
      },
      {
        caption: "n8n Canvas — ClinicFlow AI Assistant Workflow (Webhook + LLM + Tools)",
        image: "/images/projects/clinicflow/n8n-ai-assistant-workflow.png",
      },
      {
        caption: "Automated Gmail Notification — 6-Hour Low Stock Email Alert Digest",
        image: "/images/projects/clinicflow/gmail-low-stock-alert.png",
      },
      {
        caption: "Automated Gmail Notification — Daily 6PM Clinic Operations Summary Report",
        image: "/images/projects/clinicflow/gmail-daily-report.png",
      },
    ],
    challenges: [
      "Resolved a critical Supabase connection failure caused by IPv6/SSL issues by migrating from the Transaction Pooler (port 6543) to the Session Pooler (port 5432), followed by resolving schema mismatches by dropping and recreating the public schema.",
      "Guaranteed zero-duplicate reminder emails across repeated n8n schedule executions by engineering a dedicated reminder_sent_at timestamp field updated upon email dispatch.",
    ],
    learned: [
      "Designing 0-duplicate logic in database schemas (reminder_sent_at) is essential when building schedule-triggered automation workflows.",
      "Diagnosing backend infrastructure—such as pooler modes and SSL/IPv6 routing in Supabase—is crucial for maintaining high-availability background services.",
      "Combining relational SQL queries with n8n workflow nodes creates reliable, enterprise-grade automated reporting systems.",
    ],
    businessValue: [
      "Automated 6-hour inventory checking, preventing unexpected supply shortages",
      "Automated 24-hour appointment reminders with 0-duplicate protection",
      "Automated daily 6:00 PM reporting across 5 operational metrics",
      "Digitized clinic operations across patients, appointments, tasks, and inventory",
    ],
    demoUrl: null,
    repoUrl: "https://github.com/Noeme98",
  },
  {
    slug: "real-estate-lead-engine",
    name: "Real Estate Buyer/Seller Lead Qualification & Nurture Engine",
    category: "Business Systems",
    summary:
      "Full-funnel GoHighLevel CRM automation managing buyer and seller lead lifecycles through six interconnected workflows, a custom intake form, lead scoring, conditional routing, pipeline state checks, and post-close referral loops.",
    problem:
      "Real estate leads with varying intent received generic blanket follow-up without structured routing, while automated drip campaigns often continued sending messages after an agent took over the deal.",
    system:
      "GoHighLevel CRM automation system integrating custom buyer/seller intake form, dual opportunity pipelines (Buyer & Seller), lead scoring engine, multi-trigger workflows, and post-close referral loops.",
    automation:
      "Six interconnected GoHighLevel workflows handling form-triggered routing, Hot (30+), Warm (15-29), Cold (<15) lead scoring, state-aware pipeline stall checks before message dispatch, no-show recovery, and review loops.",
    result:
      "Automated full-lifecycle lead management from intake to post-close review/referrals, eliminating manual lead sorting, preventing over-messaging via state checks, and capturing appointment recovery opportunities.",
    tech: ["GoHighLevel", "CRM Automation", "Lead Scoring", "Workflows", "Pipelines", "Email Automation", "Forms", "Process Improvement"],
    thumbnail: "/images/projects/real-estate-lead-engine/lead-router-overview.png",
    placeholder: false,
    diagram: [
      { label: "Form Submitted", kind: "input", detail: "Custom Buyer/Seller Intake Form Trigger" },
      { label: "Route by Lead Type", kind: "automation", detail: "Branches Buying vs Selling vs Fallback None" },
      { label: "Create Opportunity & Email", kind: "data", detail: "Generates pipeline entry & dispatches confirmation" },
      { label: "Timeline Condition", kind: "automation", detail: "Evaluates 0-3m (+20), 3-6m (+10), 6+m (+5)" },
      { label: "Financing Condition", kind: "ai", detail: "Evaluates Pre-approved (+15), Cash (+15), Unapproved (+5)" },
      { label: "Update Contact Field", kind: "app", detail: "Applies qualification tags & calculates Lead Score" },
      { label: "State-Aware Nurture", kind: "output", detail: "Day 1/3/7 emails with pre-send pipeline stage checks" },
    ],
    overview:
      "Built a full-funnel CRM automation system in GoHighLevel for a real estate business handling both buyer and seller leads. The system manages the lead lifecycle from intake and qualification through segmented nurture, appointment recovery, and post-close review and referral follow-up. It uses six interconnected workflows, a custom intake form, lead scoring, conditional routing, pipeline automation, and state-aware nurture logic.",
    existingWorkflow: [
      "Real estate team received leads with vastly different buying/selling intents through unsegmented forms",
      "Leads remained unsorted in the CRM, receiving generic blanket follow-up regardless of timeline or financing status",
      "Automated drip campaigns continued sending messages to leads even after an agent took over the conversation",
      "Missed or no-show appointments lacked structured recovery follow-ups",
      "Post-transaction lifecycle ended at conversion without automated review or referral collection",
    ],
    proposedWorkflow: [
      "Custom Real Estate Buyer/Seller Intake Form captures budget, timeline, property type, financing, and lead type",
      "Real Estate Lead Router workflow separates buyer vs seller paths, evaluates timeline & financing, applies tags, and creates CRM opportunity",
      "Lead Scoring engine classifies buyer leads into Hot (30+), Warm (15-29), or Cold (<15) segments",
      "Buyer & Seller Nurture workflows execute Day 1 → Day 3 → Day 7 tracks with pre-send pipeline state checks (backs off if agent advances lead out of 'New Lead')",
      "No-Show Re-engagement workflow triggers on missed appointments to recover interested prospects",
      "Post-Close Referral & Review Loop triggers on Closed stage to send review requests, check response status, and request referrals",
    ],
    solution: [
      "Six interconnected GoHighLevel workflows connecting qualification, CRM state, automation, and follow-up into one unified system",
      "Custom Buyer/Seller Intake Form capturing high-intent qualification data prior to CRM insertion",
      "Lead Router evaluating Timeline (0-3m, 3-6m, 6+m) and Financing Status (Pre-approved, Cash, Not yet)",
      "Lead Scoring model creating distinct Hot (30+), Warm (15-29), and Cold (<15) nurture segments",
      "State-Aware Automation inserting a CRM pipeline stage check before every follow-up message to prevent over-messaging",
      "Full-lifecycle coverage including No-Show Re-engagement, Closed-stage review requests, and referral loops",
    ],
    howItWorks: [
      "1. Lead Intake — Custom Buyer/Seller Intake form captures contact info, budget, timeline (0-3m, 3-6m, 6+m), property type, financing status (pre-approved, cash, not yet), and lead type.",
      "2. Lead Routing — Form submission triggers Real Estate Lead Router. Evaluates lead type, applies qualification tags, creates pipeline opportunity, and routes buyer vs seller paths.",
      "3. Lead Scoring & Segmentation — Evaluates buyer lead score threshold: Hot (30+ pts), Warm (15-29 pts), Cold (<15 pts) to select appropriate nurture track.",
      "4. State-Aware Nurture — Buyer & Seller nurture tracks fire Day 1 → Day 3 → Day 7 emails, performing a CRM pipeline state check before each send (stops automatically if agent advances lead).",
      "5. No-Show Recovery — Appointment trigger monitors missed meetings and fires re-engagement emails.",
      "6. Post-Close Referral Loop — Closed pipeline stage triggers review request → checks review status → sends thank-you & referral link.",
    ],
    features: [
      "6 Interconnected GoHighLevel Workflows",
      "Custom Real Estate Buyer & Seller Intake Form",
      "Buyer vs. Seller Conditional Lead Router",
      "Hot (30+), Warm (15-29), Cold (<15) Lead Scoring Engine",
      "State-Aware Nurture Logic (pipeline stall checks before every email send)",
      "Day 1 / Day 3 / Day 7 Nurture Cadence",
      "No-Show Appointment Recovery Workflow",
      "Post-Close Referral & Review Loop",
      "Weekly Performance Summary Email Reporting",
      "Dual CRM Pipelines (Buyer Leads & Seller Leads)",
    ],
    automationWorkflow: [
      "Intake Form Submission → Lead Router → Buyer/Seller Condition → Timeline & Financing Check → Tagging & Opportunity Creation",
      "Buyer Lead Score Calculation → Hot (30+), Warm (15-29), Cold (<15) Nurture Path Selection",
      "Nurture Execution: Wait → Check if Pipeline Stage == 'New Lead' → If Yes: Send Email; If No: Stop Workflow",
      "Appointment Status == No-Show → Trigger Re-engagement Email Sequence",
      "Pipeline Stage == Closed → Send Review Request → Wait → Check Review Status → If Review Left: Thank You + Referral; If No Review: Reminder",
    ],
    aiComponents: [
      "Lead Scoring rules-engine calculating intent index based on timeline, budget, financing status, and engagement behavior.",
    ],
    backend: [
      "GoHighLevel CRM Platform (Workflows, Pipelines, Opportunities, Contacts, Tags, Custom Fields)",
      "GoHighLevel Custom Forms Engine",
      "GoHighLevel Automated Email & Appointment Trigger Engine",
    ],
    screenshots: [
      {
        caption: "Real Estate Lead Router Workflow Canvas (Form intake trigger, Buyer/Seller branching, & macro overview)",
        image: "/images/projects/real-estate-lead-engine/lead-router-overview.png",
        workflowGroup: "Workflow 1 — Real Estate Lead Router",
      },
      {
        caption: "Real Estate Lead Router — Intake & Lead Type Branching Logic",
        image: "/images/projects/real-estate-lead-engine/lead-router-intake-branching.png",
        workflowGroup: "Workflow 1 — Real Estate Lead Router",
      },
      {
        caption: "Real Estate Lead Router — Timeline 0-3 Months & Financing Qualification Branch",
        image: "/images/projects/real-estate-lead-engine/lead-router-timeline-0to3.png",
        workflowGroup: "Workflow 1 — Real Estate Lead Router",
      },
      {
        caption: "Real Estate Lead Router — Timeline 3-6 Months Branching",
        image: "/images/projects/real-estate-lead-engine/lead-router-timeline-3to6.png",
        workflowGroup: "Workflow 1 — Real Estate Lead Router",
      },
      {
        caption: "Real Estate Lead Router — Timeline 6+ Months Branching",
        image: "/images/projects/real-estate-lead-engine/lead-router-timeline-6plus.png",
        workflowGroup: "Workflow 1 — Real Estate Lead Router",
      },
      {
        caption: "Buyer Nurture Drip — Day 1/3/7 Workflow Canvas Overview (Opportunity Created trigger & Hot/Warm/Cold segmentation)",
        image: "/images/projects/real-estate-lead-engine/buyer-nurture-drip-overview.png",
        workflowGroup: "Workflow 2 — Buyer Nurture Drip (Day 1 / Day 3 / Day 7)",
      },
      {
        caption: "Buyer Nurture Drip — Hot, Warm, & Cold Parallel Track Decision Trees",
        image: "/images/projects/real-estate-lead-engine/buyer-nurture-drip-branches.png",
        workflowGroup: "Workflow 2 — Buyer Nurture Drip (Day 1 / Day 3 / Day 7)",
      },
      {
        caption: "Buyer Nurture Drip — Day 1 State-Aware Pipeline Stall Check (If 'Pipeline stage' is not 'New Lead')",
        image: "/images/projects/real-estate-lead-engine/buyer-nurture-drip-stallcheck-1.png",
        workflowGroup: "Workflow 2 — Buyer Nurture Drip (Day 1 / Day 3 / Day 7)",
      },
      {
        caption: "Buyer Nurture Drip — Day 3 State-Aware Pipeline Stall Check",
        image: "/images/projects/real-estate-lead-engine/buyer-nurture-drip-stallcheck-2.png",
        workflowGroup: "Workflow 2 — Buyer Nurture Drip (Day 1 / Day 3 / Day 7)",
      },
      {
        caption: "Buyer Nurture Drip — Day 7 Final State-Aware Pipeline Stall Check",
        image: "/images/projects/real-estate-lead-engine/buyer-nurture-drip-stallcheck-3.png",
        workflowGroup: "Workflow 2 — Buyer Nurture Drip (Day 1 / Day 3 / Day 7)",
      },
      {
        caption: "Seller Nurture Drip Workflow Canvas in GoHighLevel (Opportunity Created trigger in Seller Leads pipeline, Day 1/3/7 emails, state-aware stall checks, & completion tag)",
        image: "/images/projects/real-estate-lead-engine/seller-nurture-drip.png",
        workflowGroup: "Workflow 3 — Seller Nurture Drip",
      },
      {
        caption: "No-Show Re-engagement Workflow Canvas in GoHighLevel (Appointment Status trigger for missed/no-show consultations, delay timer, & rescheduling email dispatch)",
        image: "/images/projects/real-estate-lead-engine/no-show-reengagement.png",
        workflowGroup: "Workflow 4 — No-Show Re-engagement",
      },
      {
        caption: "Post-Close Referral & Review Loop Workflow Canvas in GoHighLevel (Dual Pipeline Stage Changed triggers for Closed Buyer/Seller deals, review check gate, & referral reward email)",
        image: "/images/projects/real-estate-lead-engine/post-close-review-loop.png",
        workflowGroup: "Workflow 5 — Post-Close Referral & Review Loop",
      },
      {
        caption: "Weekly Performance Report Workflow Canvas in GoHighLevel (Contact Tag trigger for scheduled weekly report generation & executive summary email dispatch)",
        image: "/images/projects/real-estate-lead-engine/weekly-performance-report.png",
        workflowGroup: "Workflow 6 — Weekly Performance Summary Report",
      },
      {
        caption: "Real Estate Buyer & Seller Custom Intake Form Interface (Captures First/Last Name, Phone, Email, Budget Range, Timeline, Property Type, Financing Status, & Lead Type)",
        image: "/images/projects/real-estate-lead-engine/lead-intake-form.png",
        workflowGroup: "Intake Form & CRM Pipeline Dashboards",
      },
      {
        caption: "GoHighLevel CRM Opportunities Kanban View (Live Buyer Leads pipeline with New Lead, Qualifying, Showing Scheduled, Offer Made, and Under Contract deal cards)",
        image: "/images/projects/real-estate-lead-engine/crm-opportunities-view.png",
        workflowGroup: "Intake Form & CRM Pipeline Dashboards",
      },
      {
        caption: "GoHighLevel Pipelines View (Dual CRM pipeline architecture managing Buyer Leads & Seller Leads stages)",
        image: "/images/projects/real-estate-lead-engine/crm-pipelines-view.png",
        workflowGroup: "Intake Form & CRM Pipeline Dashboards",
      },
      {
        caption: "GoHighLevel Workflows List (Live published automation engines: Buyer Nurture Drip, No-Show Re-engagement, Post-Close Review Loop, Lead Router, Seller Nurture Drip, & Weekly Performance Report)",
        image: "/images/projects/real-estate-lead-engine/gohighlevel-workflows-list.png",
        workflowGroup: "GoHighLevel Workflows List & System Overview",
      },
      {
        caption: "GoHighLevel CRM Dashboard & Funnel Analytics View (Live Opportunity Status donut chart, Sales Funnel conversion rates, and Stage Distribution metrics)",
        image: "/images/projects/real-estate-lead-engine/crm-dashboard-analytics.png",
        workflowGroup: "Intake Form & CRM Pipeline Dashboards",
      },
    ],
    challenges: [
      "Preventing automated emails from continuing after an agent manually connects with a lead: Solved by placing a state-aware pipeline check before every email send step.",
      "Handling leads that submit forms without indicating Buyer or Seller intent: Solved by adding a safe fallback routing branch that alerts staff while assigning default qualification tags.",
    ],
    learned: [
      "State-aware automation transforms CRM workflows from simple drip sequences into responsive business engines.",
      "Extending automation beyond conversion into post-close reviews and referrals maximizes customer lifetime value and organic lead generation.",
    ],
    businessValue: [
      "Full-funnel lead lifecycle automation from intake through post-close referrals",
      "Zero over-messaging with state-aware pipeline checks before every email send",
      "Automated lead scoring separating Hot (30+), Warm (15-29), and Cold (<15) prospects",
      "Reclaimed lost deals with automated No-Show appointment recovery",
      "Automated review & referral generation following deal closure",
    ],
    demoUrl: null,
    repoUrl: null,
  },
  {
    slug: "leadflow",
    name: "LeadFlow — AI-Powered Lead Intake & Automated Response System",
    category: "AI Automation",
    summary:
      "An n8n workflow that captures form submissions, uses Google Gemini to qualify inquiries, validates AI output, and automatically routes qualified, non-qualified, and failed submissions to the appropriate systems.",
    problem:
      "Incoming business inquiries require repeated manual review to determine legitimacy, decide responses, log data across separate tools, generate welcome materials, and handle unexpected AI parsing failures.",
    system:
      "n8n workflow automation pipeline integrated with Google Gemini (gemini-3-flash-preview), Google Sheets, Notion, Slack, Gmail, and PDFShift.",
    automation:
      "Full automated pipeline: n8n form intake, pre-AI raw Sheets logging, Gemini lead qualification agent, defensive Edit Fields JSON parsing with fallback, 3-way conditional routing, Notion status tracking, PDFShift document generation, Gmail dispatch, and Slack error alerts.",
    result:
      "100% automated lead qualification, zero-loss raw submission logging, structured error handling preventing silent failures, instant PDF welcome document generation, multi-channel response routing, and centralized Notion tracking.",
    tech: ["n8n", "Google Gemini", "Google Sheets", "Notion", "Slack", "Gmail", "PDFShift", "JSON", "JavaScript"],
    thumbnail: "/images/projects/leadflow/n8n-workflow-canvas.png",
    placeholder: false,
    diagram: [
      { label: "Form Submission", kind: "input", detail: "n8n Form Trigger (Name, Email, Company, Message)" },
      { label: "Google Sheets Raw Log", kind: "data", detail: "Appends raw record before AI processing stage" },
      { label: "Google Gemini AI Agent", kind: "ai", detail: "Evaluates inquiry & returns structured JSON schema" },
      { label: "JSON Parser & Fallback", kind: "automation", detail: "Edit Fields node validates output & handles parse errors" },
      { label: "Notion & PDFShift Engine", kind: "app", detail: "Status tracking (3 states) & HTML-to-PDF generation" },
      { label: "Gmail & Slack Alerts", kind: "output", detail: "Personalized PDF emails & parse-error Slack alerts" },
    ],
    overview:
      "LeadFlow is an AI-powered lead intake and qualification system built in n8n. It captures incoming form inquiries, logs raw submissions to Google Sheets, uses Google Gemini (gemini-3-flash-preview) to qualify incoming business leads, validates AI JSON outputs with a defensive fallback safety layer, and automatically routes qualified leads, non-qualified inquiries, and processing failures to Notion, Gmail, PDFShift, and Slack.",
    existingWorkflow: [
      "Lead submits inquiry through online form or contact page",
      "Staff manually reviews each message to evaluate whether it is a genuine business opportunity or spam",
      "Staff manually records lead information into tracking spreadsheets or Notion databases",
      "Staff manually decides response strategy and writes individual emails",
      "Staff manually generates welcome documents or PDFs for qualified leads",
      "Unexpected AI responses or unparseable messages require manual exception handling and troubleshooting",
    ],
    proposedWorkflow: [
      "n8n Form Trigger captures incoming submissions containing Full Name, Email Address, Company, and Message",
      "Google Sheets immediately appends raw form data to Sheet1 prior to AI processing, preserving an unedited audit log",
      "Google Gemini (gemini-3-flash-preview) evaluates submission content and outputs structured JSON (is_qualified, reason, reply)",
      "Edit Fields JSON parser validates AI output structure; malformed text triggers parse_error = true fallback strategy",
      "3-Way Conditional Routing automatically branches payload into Qualified, Not Qualified, or Parse Error paths",
      "Qualified Path: Notion database page created (Status: Qualified, PDF Sent: true), HTML template converted to PDF via PDFShift API, and personalized Gmail email dispatched with attached PDF",
      "Not Qualified Path: Generic Gmail acknowledgment sent, Notion database updated (Status: Not Qualified)",
      "Parse Error Path: Error details logged to Google Sheets Errors tab, Notion updated (Status: Parse Error), and Slack alert dispatched (⚠️ AI parse failure)",
    ],
    solution: [
      "End-to-end n8n workflow combining intake, raw logging, AI qualification, JSON validation, conditional branching, document generation, and multi-channel notification",
      "Pre-AI Google Sheets logging to guarantee an unedited record independent of AI qualification outcomes",
      "Defensive JSON parsing and fallback error node preventing malformed AI responses from crashing downstream automation",
      "PDFShift API integration for automated HTML rendering to high-quality personalized PDF welcome documents",
      "Three-way lead status classification (🟢 Qualified, 🟡 Not Qualified, 🔴 Parse Error) in Notion",
    ],
    howItWorks: [
      "1. Intake & Raw Logging — n8n Form Trigger receives form payload; Google Sheets logs raw input",
      "2. AI Qualification — Google Gemini (gemini-3-flash-preview) classifies inquiry and generates personalized response contract",
      "3. JSON Output Validation — Edit Fields node parses Gemini JSON; failure sets parse_error = true fallback",
      "4. 3-Way Conditional Routing — Evaluates parse_error and is_qualified booleans",
      "5. Qualified Execution — Notion record created (Qualified), PDFShift generates PDF, Gmail sends personalized email + PDF",
      "6. Non-Qualified Execution — Gmail sends generic acknowledgment; Notion logs status (Not Qualified)",
      "7. Parse Error Exception — Google Sheets Errors tab logged, Notion records failure, Slack receives alert",
    ],
    features: [
      "n8n Form Trigger lead intake",
      "Pre-AI Google Sheets raw submission logging",
      "Google Gemini AI lead qualification agent (gemini-3-flash-preview)",
      "Structured JSON output validation & parsing layer",
      "Fallback error handling preventing silent workflow failures",
      "Three-way conditional branching logic",
      "PDFShift automated HTML-to-PDF document generation",
      "Personalized Gmail email dispatch with attached PDF",
      "Notion database lead status tracking (Qualified, Not Qualified, Parse Error)",
      "Slack internal error alert notifications",
      "Errors Sheet troubleshooting log",
    ],
    automationWorkflow: [
      "n8n Form Trigger receives Name, Email, Company, Message payload",
      "Google Sheets node appends raw row to Lead Intake - Practice / Sheet1",
      "Google Gemini node executes prompt with JSON schema output contract",
      "Edit Fields node attempts JSON parsing; fallback sets parse_error = true and safe generic reply",
      "If parse_error === true: Google Sheets Errors tab + Notion (Parse Error) + Slack Alert (⚠️ AI parse failure)",
      "If is_qualified === true: Notion (Qualified) + HTML template + PDFShift API conversion + Gmail dispatch with attached PDF",
      "If is_qualified === false: Gmail generic response + Notion (Not Qualified)",
    ],
    aiComponents: [
      "Google Gemini (gemini-3-flash-preview) configured as an AI Lead-Qualification Agent",
      "System prompt instructing model to classify inquiries as genuine business opportunities or spam/test content",
      "Structured JSON schema output contract: { is_qualified: boolean, reason: string, reply: string }",
      "Defensive fallback parser handling malformed AI text without stopping workflow execution",
    ],
    backend: [
      "n8n Workflow Automation Platform (Self-hosted / Cloud execution)",
      "Google Sheets API (Raw submission store & Error tracking log)",
      "Google Gemini API (gemini-3-flash-preview AI qualification)",
      "Notion API (Centralized lead status tracking database)",
      "PDFShift API (Automated HTML rendering to high-quality PDF document)",
      "Gmail API (Automated transactional email dispatch with attachment handling)",
      "Slack Webhook API (Instant team alert notifications for exceptions)",
    ],
    screenshots: [
      {
        caption: "End-to-end LeadFlow n8n Canvas Workflow: Form intake, raw logging, Gemini AI evaluation, Edit Fields validation, 3-way conditional branching, PDFShift API, Gmail, Notion, and Slack alerts.",
        image: "/images/projects/leadflow/n8n-workflow-canvas.png",
      },
      {
        caption: "Notion Database — Lead Qualification Tracker Table View (Statuses: Qualified 🟢, Not Qualified 🟡, Parse Error 🔴).",
        image: "/images/projects/leadflow/notion-lead-tracker-table.png",
      },
      {
        caption: "Notion Database — AI Generated Replies & Raw AI Error String Payload Columns.",
        image: "/images/projects/leadflow/notion-lead-tracker-replies.png",
      },
      {
        caption: "Google Sheets Raw Submission Log (Lead Intake - Practice / Sheet1): Pre-AI unedited record of incoming form data.",
        image: "/images/projects/leadflow/sheets-raw-log.png",
      },
      {
        caption: "Google Sheets AI Parse Errors Log (Lead Intake - Practice / Errors): Automated logging of malformed AI responses.",
        image: "/images/projects/leadflow/sheets-errors-log.png",
      },
      {
        caption: "Automated Gmail Notification — Hot Lead Alert Digest (Score 95/100, budget signals & AI summary).",
        image: "/images/projects/leadflow/gmail-hot-lead-alert.png",
      },
      {
        caption: "Automated Gmail Response — Qualified Lead Welcome Email (Personalized response via Gemini AI).",
        image: "/images/projects/leadflow/gmail-qualified-response.png",
      },
      {
        caption: "Automated Gmail Response — Not Qualified Inquiry Acknowledgment Email.",
        image: "/images/projects/leadflow/gmail-not-qualified-response.png",
      },
    ],
    challenges: [
      "Handling non-deterministic AI text formatting: Gemini model outputs could occasionally omit expected JSON quotes or keys, causing downstream node crashes. Solved by implementing an Edit Fields parsing and fallback layer that catches errors and sets parse_error = true.",
      "Ensuring raw submission traceability: If AI evaluation fails midway, the inquiry could be lost. Solved by appending raw form data to Google Sheets before passing payload to Gemini.",
      "Multi-system state synchronization: Coordinating status updates across Notion, Google Sheets, Gmail, Slack, and PDFShift without race conditions or orphan records.",
    ],
    learned: [
      "Structured AI output matters: AI responses require strict, predictable structures (JSON schema validation) before they can safely control automated downstream workflows.",
      "Error handling belongs inside the workflow: A malformed AI response should become an explicit, tracked error state rather than causing silent automation failure.",
      "Conditional multi-path routing: Business inquiries require distinct execution paths (Qualified, Not Qualified, Parse Error) rather than linear pipeline processing.",
      "Pre-AI logging improves auditability: Logging raw data prior to AI processing guarantees an accurate reference point for troubleshooting and workflow review.",
      "AI supports deterministic logic: AI is ideal for qualification and content drafting, while deterministic workflow logic must control system routing and exception handling.",
    ],
    businessValue: [
      "100% automated lead qualification using Google Gemini AI agent",
      "Zero loss of inquiry submissions via pre-AI raw Google Sheets logging",
      "Zero silent failures with defensive JSON parsing and fallback error handling",
      "Automated HTML-to-PDF document creation via PDFShift API",
      "Multi-channel notification routing (Gmail personalized emails, Notion status tracking, Slack alerts)",
    ],
    demoUrl: null,
    repoUrl: "https://github.com/Noeme98",
  },
  {
    slug: "ihomis-patient-data-migration",
    name: "IHOMIS Patient Data Migration Automation",
    category: "AI Automation",
    summary:
      "Automated the transfer of 4,000+ patient records accumulated from 2019–2026 from Excel into IHOMIS using UI.Vision RPA. Increased processing capacity from 100–150 records per day manually to approximately 400 records per day, helping clear a multi-year data-entry backlog.",
    problem:
      "Over 4,000 historical patient records accumulated from 2019 to 2026 were trapped in unstandardized Excel spreadsheets, creating a massive data-entry backlog in Biliran Provincial Hospital's Integrated Hospital Operations and Management Information System (IHOMIS).",
    system:
      "UI.Vision RPA browser macro automation engine interfacing directly with Excel spreadsheets and the IHOMIS hospital portal web interface.",
    automation:
      "Automated data parsing, validation, form population, error handling, and record submission loop executing inside the browser context.",
    result:
      "Increased daily processing capacity from 100–150 records per day manually to approximately 400 records per day automatically, clearing a 7-year administrative backlog.",
    tech: ["Ui.Vision RPA", "JavaScript", "Excel", "IHOMIS", "Workflow Automation", "Process Improvement"],
    thumbnail: "/images/projects/ihomis-patient-data-migration/thumbnail.png",
    placeholder: false,
    diagram: [
      { label: "Excel Backlog (2019–2026)", kind: "input", detail: "4,000+ unmigrated patient records in spreadsheets" },
      { label: "UI.Vision RPA Macro", kind: "automation", detail: "Parses Excel rows & executes browser automation" },
      { label: "Data Validation Loop", kind: "app", detail: "Normalizes patient names, IDs & birthdates" },
      { label: "IHOMIS Web Portal", kind: "data", detail: "Automated form input & field submission" },
      { label: "IHOMIS Central Database", kind: "output", detail: "Cleared backlog & 400 records/day capacity" },
    ],
    overview:
      "Engineered an automated RPA data migration pipeline using UI.Vision RPA at Biliran Provincial Hospital to clear a multi-year administrative backlog of over 4,000 patient records spanning 2019–2026. By automating Excel spreadsheet parsing and direct IHOMIS web form population, daily record processing capacity jumped from 100–150 records per day manually to approximately 400 records per day automatically.",
    existingWorkflow: [
      "Hospital staff manually opened individual Excel files for patient records accumulated from 2019 to 2026",
      "Staff manually copy-pasted patient details (Name, DOB, Medical History, Address) line-by-line into the IHOMIS portal",
      "Manual data entry capped daily productivity at 100–150 records per day, creating a severe administrative bottleneck",
      "High vulnerability to typographical errors and fatigue during repetitive manual input",
    ],
    proposedWorkflow: [
      "UI.Vision RPA script opens Excel data files and iterates across unmigrated patient record rows",
      "JavaScript macro logic validates patient attributes and transforms field formats into IHOMIS web schema",
      "Browser automation script populates IHOMIS input fields with zero human data entry",
      "Automated exception handling detects duplicate records or missing mandatory fields and logs them to an error sheet",
      "System achieves ~400 records per day processing throughput, clearing the 4,000+ backlog in record time",
    ],
    solution: [
      "Custom UI.Vision RPA macro suite engineered for browser-based IHOMIS portal automation",
      "JavaScript field normalization layer correcting date formats, capitalization, and special characters prior to form submission",
      "Robust retry and skip logic preventing script execution halts upon duplicate record collision",
    ],
    howItWorks: [
      "Data Extraction — RPA engine reads patient rows from target Excel sheets",
      "Validation & Formatting — JavaScript cleans patient name strings, normalizes birthdates, and formats health numbers",
      "Portal Injection — RPA macro clicks into IHOMIS web portal fields, inputs validated values, and submits the patient record",
      "Audit Logging — Success status or data exception logged per record ID for complete traceability",
    ],
    features: [
      "4,000+ historical patient record migration from Excel to IHOMIS",
      "UI.Vision RPA browser macro automation",
      "400 records per day automated processing throughput (vs 100-150 manual)",
      "Automated field normalization & duplicate detection",
      "Multi-year backlog clearance (2019–2026 dataset)",
      "Audit log generation for data verification",
    ],
    automationWorkflow: [
      "Trigger: Batch launch of UI.Vision RPA macro on hospital workstation",
      "Iterate: Loop through Excel row data array",
      "Inject: Perform browser DOM automation into IHOMIS web forms",
      "Log: Output success/exception status to verification log",
    ],
    aiComponents: [
      "Field matching and text normalization rules for variable spreadsheet column names",
    ],
    backend: [
      "UI.Vision RPA Execution Engine, Excel spreadsheet data store, IHOMIS hospital portal",
    ],
    screenshots: [
      { caption: "UI.Vision RPA Execution Canvas & Macro Command Sequence" },
      { caption: "IHOMIS Hospital Web Portal Patient Registration Interface" },
    ],
    challenges: [
      "Handling inconsistent formatting across Excel files accumulated over 7 years (2019–2026), solved by engineering a robust JavaScript normalization gate inside the RPA script.",
    ],
    learned: [
      "RPA macro automation is an incredibly high-ROI solution for clearing legacy database backlogs without requiring direct API access.",
    ],
    businessValue: [
      "Automated 4,000+ patient records transfer from Excel to IHOMIS",
      "Increased processing capacity from 100–150 records/day to ~400 records/day",
      "Successfully cleared a 7-year administrative data entry backlog",
      "Eliminated manual copy-paste errors and staff burnout",
    ],
    demoUrl: null,
    repoUrl: null,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return projects[(i + 1) % projects.length];
}

