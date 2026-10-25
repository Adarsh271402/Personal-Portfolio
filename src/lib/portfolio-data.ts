export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;

export type TechItem = {
  name: string;
  monogram: string;
  tint: string; // tile background
  fg: string; // monogram color on tile
  desc: string;
  level: number; // 0-100
};

/* Brand-tinted monogram tiles — mirrors the reference's logo cards */
export const TECH_STACK: TechItem[] = [
  { name: ".NET", monogram: ".NET", tint: "#512BD4", fg: "#ffffff", desc: "Primary backend framework", level: 90 },
  { name: "C#", monogram: "C#", tint: "#68217A", fg: "#ffffff", desc: "Type-safe OOP language", level: 88 },
  { name: "ASP.NET", monogram: "ASP", tint: "#0F6CBD", fg: "#ffffff", desc: "Web APIs & MVC", level: 84 },
  { name: "SQL Server", monogram: "SQL", tint: "#B94A2C", fg: "#ffffff", desc: "Relational database", level: 80 },
  { name: "JavaScript", monogram: "JS", tint: "#F7DF1E", fg: "#1d2634", desc: "Language of the web", level: 86 },
  { name: "React", monogram: "⚛", tint: "#087EA4", fg: "#ffffff", desc: "Component-driven UI", level: 85 },
  { name: "Tailwind CSS", monogram: "TW", tint: "#0EA5A5", fg: "#ffffff", desc: "Utility-first styling", level: 88 },
  { name: "TypeScript", monogram: "TS", tint: "#3178C6", fg: "#ffffff", desc: "Typed JavaScript", level: 82 },
  { name: "Git", monogram: "⎇", tint: "#F05133", fg: "#ffffff", desc: "Version control", level: 84 },
  { name: "GitHub", monogram: "⌂", tint: "#1d2634", fg: "#ffffff", desc: "Code hosting & collab", level: 86 },
];

export const ALSO_FAMILIAR = [
  "HTML & CSS",
  "Bootstrap",
  "Node.js (Basic)",
  "REST APIs",
  "Postman",
  "VS Code",
];

export const MARQUEE_ITEMS = [
  ".NET",
  "C#",
  "ASP.NET",
  "SQL Server",
  "JavaScript",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Git",
  "REST APIs",
  "Bootstrap",
  "Node.js",
];

export const TIMELINE = [
  {
    period: "2024 - 2025",
    title: "Internship (Full Stack Developer)",
    org: "AADISWAN INFO CONSULTANTS Pvt Ltd",
    desc: "Worked on real-world projects using .NET, SQL Server and Bootstrap.",
    tags: [".NET", "SQL Server", "Bootstrap"],
    current: false,
  },
  {
    period: "Pursuing",
    title: "Master of Computer Applications (MCA)",
    org: "College / University",
    desc: "Learning, building projects and exploring new technologies.",
    tags: ["DSA", "DBMS", "Web Dev"],
    current: true,
  },
  {
    period: "Completed",
    title: "Bachelor of Computer Applications (BCA)",
    org: "College / University",
    desc: "Built a foundation in programming, databases and application development.",
    tags: ["Programming", "DBMS", "Web Dev"],
    current: false,
  },
  {
    period: "2020 - 2021",
    title: "Higher Secondary",
    org: "School",
    desc: "Completed 12th with Science stream and developed interest in coding.",
    tags: ["PCM", "First Code"],
    current: false,
  },
];

export const PROJECTS = [
  {
    title: "Task Manager Pro",
    href: "https://task-manager-pro-p80i.onrender.com/login",
    image: "/portfolio/project-task.png",
    tags: [".NET", "React", "SQL Server"],
    desc: "A full-stack task management application with authentication, role-based access and real-time updates.",
    accent: "from-violet-500/80",
  },
  {
    title: "E-Commerce Platform",
    href: "https://encett-ecommerce.netlify.app/",
    image: "/portfolio/project-ecommerce.png",
    tags: ["ASP.NET", "SQL Server", "JavaScript"],
    desc: "Online shopping platform with cart, orders and user management.",
    accent: "from-orange-500/80",
  },
  {
    title: "Weather App",
    href: "https://skycast-weather-adarsh271402.netlify.app/",
    image: "/portfolio/project-weather.png",
    tags: ["React", "API", "Tailwind CSS"],
    desc: "Get real-time weather updates with beautiful UI and location search.",
    accent: "from-sky-500/80",
  },
];

export const GITHUB_STATS = {
  username: "Adarsh271402",
};

export const GITHUB_URL = `https://github.com/${GITHUB_STATS.username}`;
export const TWITTER_URL = "https://x.com/Adarsh271402";
export const LINKEDIN_URL = "https://www.linkedin.com/in/adarsh4007/";

export const TOP_REPOS = [
  { name: "InterviewPrepSystem", href: "https://interviewprep-adarsh.netlify.app/login" },
  { name: "task-manager-pro", href: "https://task-manager-pro-p80i.onrender.com/login" },
  { name: "UserMangement" },
  { name: "Personal-Portfolio" },
  { name: "Electricity_bill" },
];

export const SOCIALS = [
  { name: "GitHub", href: GITHUB_URL },
  { name: "LinkedIn", href: LINKEDIN_URL },
  { name: "Twitter", href: TWITTER_URL },
  { name: "Instagram", href: "https://www.instagram.com/" },
];

export const HERO_TYPED = [
  "Full Stack Developer",
  ".NET Developer",
  "React Enthusiast",
  "Clean Code Advocate",
];

export const ABOUT_FACTS = [
  { label: "Name", value: "Adarsh Gupta" },
  { label: "Education", value: "BCA Graduate · MCA Pursuing" },
  { label: "Experience", value: "Fresher / Intern" },
  { label: "Location", value: "India" },
];

export const HERO_STATS = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 1000, suffix: "+", label: "Hours of Code" },
];
