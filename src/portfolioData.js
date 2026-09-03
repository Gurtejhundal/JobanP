export const profile = {
  name: "Mohabbatpal Singh Chahal",
  shortName: "Mohabbatpal",
  role: "Computer Science Student & Software Developer",
  strapline:
    "A considered home for full-stack web applications, AI/ML explorations, and clean software engineering.",
  status: "LPU / B.Tech CSE (2025–Present)",
  github: "https://github.com/mohabbat-chahal",
  linkedin: "https://www.linkedin.com/in/mohabbatpal-singh-chahal/",
  email: "Mohabbatpalsinghchahal@gmail.com",
  phone: "+918078740004",
};

export const navItems = [
  ["Skills", "skills"],
  ["Work", "projects"],
  ["Notes", "research"],
  ["Journey", "achievements"],
  ["Education", "education"],
  ["Contact", "contact"],
];

export const skills = [
  "Python", "C", "C++", "JavaScript", "React.js", "Vite",
  "Tailwind CSS", "Node.js", "NestJS", "Prisma", "PostgreSQL", "MySQL",
  "Git", "GitHub", "Figma", "Generative AI", "Problem Solving", "Execution",
];

export const openSourceCards = [
  {
    label: "BACKEND ARCHITECTURE",
    title: "Relational data structures, type-safe APIs, and clean services.",
    image: "/assets/project-sentinel.png",
    tags: ["Node.js", "NestJS", "PostgreSQL"],
  },
  {
    label: "FRONTEND SYSTEMS",
    title: "Responsive interfaces built for clarity and speed.",
    image: "/assets/project-image-converter.png",
    tags: ["React.js", "Vite", "Tailwind CSS"],
  },
];

export const projects = [
  {
    index: "01",
    date: "Featured Backend Build",
    title: "LedgerX",
    subtitle: "Ledger Management System",
    image: "/assets/project-sentinel.png",
    repo: "https://github.com/mohabbat-chahal/LedgerX",
    summary:
      "A robust, type-safe financial ledger management system for tracking transactions, balances, and audit trails.",
    details:
      "Built with Node.js, NestJS framework, Prisma ORM, and PostgreSQL. Focuses on transaction integrity, relational schema design, typed REST API endpoints, and scalable backend architecture.",
    tags: ["Node.js", "NestJS", "Prisma", "PostgreSQL"],
  },
  {
    index: "02",
    date: "Frontend Web Build",
    title: "Chahal Restro",
    subtitle: "Responsive Dining Platform",
    image: "/assets/project-image-converter.png",
    repo: "https://github.com/mohabbat-chahal/Chahal-Restro",
    summary:
      "A modern, fast, and responsive digital dining platform built with utility-first styling and fluid layout transitions.",
    details:
      "Developed using React.js and Vite with Tailwind CSS for utility-first styling. Optimized for touch controls, fast image delivery, and crisp mobile responsiveness across all viewports.",
    tags: ["React.js", "Vite", "Tailwind CSS", "Frontend"],
  },
  {
    index: "03",
    date: "Python Desktop Utility",
    title: "Smart Dairy Tool",
    subtitle: "ERP Operations & Dairy Management",
    image: "/assets/project-aeternum.png",
    repo: "https://github.com/mohabbat-chahal/Smart-Dairy-Tool",
    summary:
      "A desktop ERP-style operational management utility for tracking daily milk collection, inventory, and supplier accounts.",
    details:
      "Built in Python using Tkinter for desktop GUI. Automates daily dairy ledger entries, billing calculations, supplier accounts, and inventory tracking for local dairy operations.",
    tags: ["Python", "Tkinter", "ERP", "Desktop"],
  },
  {
    index: "04",
    date: "Interactive Web Game",
    title: "Chess Game",
    subtitle: "Web Chess Engine",
    image: "/assets/project-climate.png",
    repo: "https://github.com/mohabbat-chahal/Chess-Game",
    summary:
      "An interactive web-based chess game engine with move validation and real-time board state management.",
    details:
      "Developed and tested on Replit using JavaScript to handle move validation, turn switching, game state tracking, and interactive board rendering.",
    tags: ["JavaScript", "Web Game", "Replit"],
  },
];

export const researchNotes = [
  {
    code: "NOTE_01 / GEN-AI",
    date: "2026",
    title: "AI0121EN: Introduction to Generative AI",
    affiliation: "IBM & edX",
    detail:
      "Verified course completion in Generative AI architectures, model capabilities, and practical AI applications (Certificate ID: f11f78ee20434d3e97e207fa89036ced).",
  },
  {
    code: "NOTE_02 / PYTHON",
    date: "2026",
    title: "Python Essentials 1",
    affiliation: "Cisco Networking Academy & Python Institute",
    detail:
      "30-hour accredited completion covering fundamental computer programming concepts, control flows, data structures, and Python engineering (Issued Jan 31, 2026).",
  },
  {
    code: "NOTE_03 / ML",
    date: "Ongoing",
    title: "Fundamental of Machine Learning",
    affiliation: "Applied Machine Learning",
    detail:
      "Investigating supervised learning algorithms, regression modeling, and data preprocessing pipelines in Python.",
  },
];

export const milestones = [
  {
    index: "01",
    eyebrow: "PRACTICE",
    title: "200+ Solved Coding Problems",
    description:
      "Solved more than 200 programming problems on online platforms during regular practice, strengthening data structure and algorithm fundamentals.",
    image: "/assets/project-sentinel.png",
    tag: "Problem Solving",
  },
  {
    index: "02",
    eyebrow: "BACKEND",
    title: "Type-Safe Systems & ORMs",
    description:
      "Architected LedgerX using NestJS, Prisma, and PostgreSQL, focusing on financial integrity, relational schemas, and modular services.",
    image: "/assets/project-image-converter.png",
    tag: "Backend Systems",
  },
  {
    index: "03",
    eyebrow: "ACCREDITATIONS",
    title: "Cisco & IBM Certifications",
    description:
      "Earned verified accreditations in Python Essentials 1 (Cisco / Python Institute) and Generative AI (IBM / edX).",
    image: "/assets/project-aeternum.png",
    tag: "Verified Industry Credentials",
  },
];

export const backgroundCards = [
  {
    number: "[01]",
    period: "ACADEMICS",
    status: "In Progress",
    location: "Lovely Professional University",
    title: "Bachelor of Technology — Computer Science & Engineering",
    subtitle: "LPU, Phagwara, Punjab (Aug 2025 – Present)",
    bullets: [
      { text: "Currently pursuing B.Tech in CSE with a current CGPA of 7.93." },
      { text: "Hands-on engineering across Python, C, C++, JavaScript, React.js, Node.js, NestJS, and databases." },
      { text: "Active commitment to algorithmic problem solving and practical project building." },
    ],
    result: "CGPA: 7.93 / B.Tech CSE",
  },
  {
    number: "[02]",
    period: "CREDENTIALS",
    status: "Verified",
    location: "Global Industry Certifications",
    title: "Technical Certifications & Accreditations",
    subtitle: "Cisco Networking Academy, IBM, edX, Python Institute",
    bullets: [
      {
        text: "Python Essentials 1 — Cisco Networking Academy & Python Institute (Jan 31, 2026, 30 Hours)",
      },
      {
        text: "AI0121EN: Introduction to Generative AI — IBM & edX (Issued Jan 27, 2026, ID: f11f78ee20434d3e97e207fa89036ced)",
      },
      {
        text: "Fundamental of Machine Learning",
      },
    ],
    result: "3 Industry Accreditations",
  },
  {
    number: "[03]",
    period: "SCHOOLING",
    status: "Completed",
    location: "The Millennium School",
    title: "Higher Secondary & Secondary Education",
    subtitle: "Kaithal, Haryana (2021 – 2024)",
    bullets: [
      { text: "Higher Secondary Education (12th Grade): 80% (May 2023 – Mar 2024)" },
      { text: "Secondary Education (10th Grade): 90.4% (Jun 2021 – Mar 2022)" },
    ],
    result: "10th: 90.4% | 12th: 80%",
  },
];

export const contactItems = [
  {
    label: "GitHub",
    detail: "github.com/mohabbat-chahal",
    url: "https://github.com/mohabbat-chahal",
  },
  {
    label: "LinkedIn",
    detail: "linkedin.com/in/mohabbatpal-singh-chahal",
    url: "https://www.linkedin.com/in/mohabbatpal-singh-chahal/",
  },
  {
    label: "Email",
    detail: "Mohabbatpalsinghchahal@gmail.com",
    url: "mailto:Mohabbatpalsinghchahal@gmail.com",
  },
  {
    label: "Mobile",
    detail: "+91 8078740004",
    url: "tel:+918078740004",
  },
];
