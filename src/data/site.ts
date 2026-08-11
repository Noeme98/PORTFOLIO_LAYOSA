// Central content source with Neil Francis Layosa's professional profile.

export const profile = {
  name: "Neil Francis Layosa",
  role: "Automation Specialist | IT Support | Web Developer",
  tagline: "Computer Engineering graduate with hands-on experience in IT support, web application development, and workflow automation in a healthcare environment.",
  status: "Open to remote opportunities (US, UK, AU hours)",
  location: "Naval, Biliran, Philippines",
  email: "layosaneilfrancis569@gmail.com",
  phone: "+63 975 294 7880 (WhatsApp)",
  links: {
    email: "mailto:layosaneilfrancis569@gmail.com",
    linkedin: "https://linkedin.com/in/neil-francis-layosa-3aaa26405",
    github: "https://github.com/Noeme98",
    resume: "/resume",
    resumeFile: "/resume.pdf",
  },
};

export const nav = [
  { label: "Home", to: "/" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Capabilities", to: "/capabilities" as const },
  { label: "About", to: "/about" as const },
  { label: "Resume", to: "/resume" as const },
  { label: "Contact", to: "/contact" as const },
];

export const capabilities = [
  {
    id: "workflow-automation",
    title: "Business Process & Workflow Automation",
    problem: "Repetitive manual tasks and data transfers between tools waste valuable operational time.",
    detail:
      "I map business workflows and build end-to-end automations using Ui.Vision RPA, n8n, Zapier, and Google Apps Script to eliminate manual data entry and streamline operations.",
    examples: ["Ui.Vision RPA browser macros", "n8n & Zapier webhook pipelines", "Google Apps Script automations"],
  },
  {
    id: "it-support",
    title: "IT Support & Technical Systems",
    problem: "Hardware, software, and network issues disrupt daily business operations.",
    detail:
      "With hands-on IT staff experience in a healthcare environment, I troubleshoot hardware, software, networking, and office equipment to keep critical systems reliable.",
    examples: ["Hardware & software troubleshooting", "Network & printer support", "System usability enhancement"],
  },
  {
    id: "web-applications",
    title: "Web Application Development",
    problem: "Organizations need tailored internal software rather than rigid, generic SaaS tools.",
    detail:
      "I build responsive web applications using React, Vite, JavaScript, HTML5, CSS3, and Supabase tailored to specific operational needs.",
    examples: ["Internal hospital web apps", "Digital visitor log portals", "Civil infrastructure reporting platforms"],
  },
  {
    id: "api-integration",
    title: "API & Data Integrations",
    problem: "Different tools hold isolated data without seamless communication.",
    detail:
      "I connect REST APIs and webhooks across Google Forms, Google Sheets, Airtable, and relational databases with proper validation and error handling.",
    examples: ["REST API & Webhooks integration", "Database synchronization", "Multi-platform data flows"],
  },
  {
    id: "ai-automation",
    title: "AI Automation Concepts",
    problem: "Unstructured data requires intelligent classification and review before processing.",
    detail:
      "I explore and implement AI-assisted workflow concepts using structured prompts and validation gates to assist in business process optimization.",
    examples: ["AI request classification", "Prompt structuring", "Automated summary drafting"],
  },
  {
    id: "process-improvement",
    title: "Process Analysis & Documentation",
    problem: "Undocumented, paper-heavy workflows create bottlenecks and human error.",
    detail:
      "I analyze existing workflows, produce technical documentation, and collaborate with teams to digitize paper processes into automated workflows.",
    examples: ["Workflow mapping", "Technical documentation", "Paper-to-digital transition"],
  },
];

export const process = [
  {
    step: "01",
    title: "Understand",
    detail: "Analyze existing administrative workflows, hardware/software constraints, and operational bottlenecks.",
  },
  {
    step: "02",
    title: "Map",
    detail: "Design data schemas, API connections, automation triggers, and user interaction steps.",
  },
  {
    step: "03",
    title: "Build",
    detail: "Develop the React web application, RPA macro script, or n8n / Apps Script automation pipeline.",
  },
  {
    step: "04",
    title: "Test",
    detail: "Troubleshoot technical edge cases, validate database security rules, and verify system reliability.",
  },
  {
    step: "05",
    title: "Optimize",
    detail: "Document technical procedures, refine workflows based on feedback, and provide ongoing support.",
  },
];

export const stack = [
  {
    group: "Programming & Web Development",
    items: ["JavaScript", "HTML5", "CSS3", "React", "Vite", "PHP", "Node.js (Basic)"],
  },
  {
    group: "Automation & AI",
    items: ["n8n", "UI.Vision RPA", "Google Apps Script", "Zapier", "Google Gemini", "AI Automation"],
  },
  {
    group: "Integration",
    items: ["REST APIs", "Webhooks", "JSON"],
  },
  {
    group: "Databases",
    items: ["Supabase", "PostgreSQL", "MySQL", "Airtable"],
  },
  {
    group: "Development & Infrastructure",
    items: ["Git", "GitHub", "VS Code", "Render", "ESP32"],
  },
  {
    group: "Productivity & Collaboration",
    items: ["Google Workspace", "Google Sheets", "Google Forms", "Notion", "Gmail", "Slack"],
  },
];

export const resume = {
  summary:
    "Computer Engineering graduate with hands-on experience in IT support, web application development, and workflow automation in a healthcare environment. Within my first two months as an IT Staff member, I built 2 web systems and 2 automation workflows while supporting approximately 10 hospital departments and 10+ computers. I automated the transfer of 4,000+ patient records from Excel to IHOMIS, increasing processing capacity from 100–150 records per day manually to approximately 400 records per day. My work combines web development, RPA, APIs, databases, AI integration, and practical IT troubleshooting.",
  eligibility: "Civil Service Professional Eligibility (Passed 2026)",
  strengths: [
    "Workflow Automation",
    "AI Automation & Integration",
    "RPA Development",
    "IT Troubleshooting",
    "Web Application Development",
    "API Integration",
    "Database Systems",
    "Process Improvement",
    "Systems Integration",
    "Technical Problem Solving",
  ],
  remoteReadiness: {
    equipment: "Acer Aspire A314-36P (Intel N200, 8 GB RAM, Windows 11 Home 64-bit) · Secondary Intel Core i5 PC (16 GB RAM) · Webcam, microphone & headset · Dedicated workspace",
    internet: "Globe connection (11.73 Mbps download, 60 ms ping) · TM mobile data backup connection",
    workspace: "Dedicated workspace suitable for remote work and virtual meetings",
    availability: "Flexible schedule · Available for US, UK, and AU business hours",
    languages: ["English (Fluent)", "Filipino (Native)"],
  },
  experience: [
    {
      role: "IT Staff",
      org: "Biliran Provincial Hospital",
      period: "July 2026 – Present",
      points: [
        "Automated the transfer of 4,000+ patient records accumulated from 2019–2026 from Excel to IHOMIS using UI.Vision RPA, increasing processing capacity from 100–150 records per day manually to approximately 400 records per day.",
        "Built 2 web systems and 2 automation workflows within the first two months of the IT Staff role while supporting approximately 10 hospital departments and 10+ computers.",
        "Provide technical support for hospital personnel across 10+ departments by troubleshooting hardware, software, printers, networking, and workstation computers.",
        "Analyze repetitive administrative workflows across hospital departments to identify automation opportunities using UI.Vision RPA, n8n, Google Apps Script, and API integrations.",
      ],
    },
    {
      role: "IT / Systems Support Intern (OJT)",
      org: "Department of Information and Communications Technology (DICT) – Biliran Province",
      period: "2025",
      points: [
        "Developed a Visitor Management System using HTML, CSS, and JavaScript, replacing paper-based visitor logs with searchable digital records.",
        "Improved administrative efficiency by digitizing visitor registration and record retrieval.",
        "Assisted with technical support, network troubleshooting, and system documentation across government IT infrastructure.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Engineering",
      org: "Biliran Province State University (BiPSU)",
      period: "Graduated: 2026",
      points: [
        "Recipient of Best Thesis Award for Automated Document Reception & Email Notification System",
        "Civil Service Professional Eligibility (Passed 2026)",
      ],
    },
  ],
};
