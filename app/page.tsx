"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Layers,
  Code,
  Cpu,
  Activity,
  Calendar,
  MessageSquare,
  X,
  CheckCircle2,
  Globe,
  MapPin,
  Zap,
  ShieldAlert,
  ChevronRight,
  Terminal as TerminalIcon,
  Command,
  LayoutDashboard,
  BarChart3,
  Briefcase,
  User,
  Github,
  Bot,
  Send,
  Code2,
  FileText,
  Trophy,
  Wifi,
  Server,
  Database,
  Play,
  Lock,
  ShieldCheck,
  Sparkles,
  Coffee,
  Monitor,
  UserRound,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Box,
  Star,
  Workflow,
  ArrowUpRight,
  ScrollText,
  Download,
  CreditCard,
  FileText as FileTextIcon,
  Map,
  Route,
  Search,
  Plus,
  DollarSign,
  Clock,
  Clipboard,
  AlertCircle,
  ChevronDown,
  Award,
  GraduationCap,
  FolderKanban,
  Shield,
  Smartphone,
  Eye,
  BookOpen,
  GitBranch,
  Cloud,
  Rocket,
  HardDrive,
  Laptop,
  Mail,
  FileCheck,
  FileSearch,
  FileCode,
  FileQuestion,
  TrendingUp,
  Users2,
  CheckSquare,
  ArrowRightLeft,
  Moon,
  Sun,
  BriefcaseBusiness,
  UserCheck,
  BriefcaseMedical
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Bar
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type ModuleType =
  | 'home'
  | 'projects'
  | 'skills'
  | 'timeline'
  | 'contact'
  | 'terminal'
  | 'achievements'
  | 'resume'
  | 'demo'
  | 'showcase'
  | 'architecture'
  | 'code-quality'
  | 'freelance'
  | 'testimonials'
  | 'devops'
  | 'case-studies'
  | 'analytics'
  | 'system-health';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageColor: string;
  category: 'fullstack' | 'frontend' | 'mobile';
  problem: string;
  solution: string;
  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    api: string[];
    deployment: string[];
  };
  challenges: string[];
  results: string;
  impact: string;
  showcase: React.ReactNode;
  featured: boolean;
}

interface Log {
  id: string;
  type: 'boot' | 'install' | 'upgrade' | 'system' | 'error';
  title: string;
  date: string;
  details: string;
}

interface ChatAction {
  label: string;
  module?: ModuleType;
  projectId?: string;
  href?: string;
  download?: boolean;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: ChatAction[];
}

interface Testimonial {
  id: string;
  client: string;
  project: string;
  rating: number;
  feedback: string;
}

interface CaseStudy {
  id: string;
  problem: string;
  solution: string;
  technology: string[];
  outcome: string;
  color: string;
}

// --- Loading Screen Component ---
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Initializing system...",
    "Loading modules...",
    "Preparing environment...",
    "System ready ✓"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[999] bg-[#0a0a0f] flex items-center justify-center font-mono"
    >
      <div className="text-center space-y-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Zaid<span className="text-blue-400">-Portfolio</span>
          </h1>
        </div>

        <div className="space-y-4">
          {steps.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: index <= step ? 1 : 0.3,
                y: 0,
                color: index <= step
                  ? (index === steps.length - 1 ? "rgb(16, 185, 129)" : "rgb(148, 163, 184)")
                  : "rgb(71, 85, 105)"
              }}
              transition={{ duration: 0.3 }}
              className="text-lg"
            >
              {index < step && <CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400" />}
              {index === step && <span className="text-blue-400 mr-2 animate-pulse">→</span>}
              {text}
            </motion.div>
          ))}
        </div>

        <div className="w-64 mx-auto h-2 bg-white/10 rounded-full overflow-hidden mt-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// --- Portfolio Data (from CV) ---
const PROFILE = {
  name: 'Mohomed Zaid Nasheem',
  title: 'Graphic Designer | Aspiring Software Engineer',
  phone: '0777-531-318',
  phoneHref: 'tel:+94777531318',
  email: 'Zaidn2848@gmail.com',
  github: 'https://github.com/Mohomed-Zaid',
  linkedin: 'https://www.linkedin.com/in/mohomed-zaid-5a81b4377',
  summary:
    'Multidisciplinary and self-driven creative professional with over a year of experience as a freelance graphic designer and a strong foundation in software engineering. Currently pursuing a BSc (Hons) in Computer Science in Software Engineering at CINEC Campus (University of Wolverhampton) and an HND in Software Engineering at ICBT Campus (Cardiff Metropolitan). Combines creative design expertise with programming, web development, and database skills. Adept at remote collaboration, time management, and delivering polished, on-brand digital solutions. Passionate about merging design-thinking with technology to build beautiful and functional user experiences.'
};

const EDUCATION = [
  {
    degree: 'BSc (Hons) Computer Science In Software Engineering',
    institution: 'CINEC Campus (University of Wolverhampton)',
    period: '2026 – Present',
    details: 'Key Modules: Software Engineering, Artificial Intelligence, Machine Learning, Research Methods, Data Science',
    current: true
  },
  {
    degree: 'Higher National Diploma (HND) in Software Engineering',
    institution: 'ICBT Campus (Cardiff Metropolitan)',
    period: '2024 – 2026',
    details: 'Key Modules: Object-Oriented Programming, Web Technologies, Database Systems, Agile Development',
    current: false
  },
  {
    degree: 'Diploma in Information Technology',
    institution: 'ICBT Campus (Cardiff Metropolitan)',
    period: 'Mar 2023 – Sep 2023',
    details: 'Coursework: Computer Fundamentals, Networking, Office Tools, Basics of Programming',
    current: false
  },
  {
    degree: 'Professional Certificate in Graphic Design',
    institution: 'VISTA Academy',
    period: 'Feb 2023 – Aug 2023',
    details: 'Mastery in Adobe Suite, Visual Communication, Branding Principles, Typography',
    current: false
  }
];

const EXPERIENCE = [
  {
    role: 'Software Engineer',
    company: "Shayan's Kids & Toys Store",
    period: '2026 – Present',
    location: 'On-site / Hybrid',
    bullets: [
      'Developed a full-stack wholesale management system using React, Tailwind CSS, JavaScript, and Supabase to manage products, customers, orders, invoices, purchases, and finance operations.',
      'Implemented inventory management with stock tracking, backorder handling, credit limit validation, and automated invoice generation.',
      'Built customer communication features including SMS notifications, bulk SMS campaigns, order confirmations, and payment reminder templates.',
      'Developed role-based access control, audit logs, backup systems, and responsive dashboard interfaces for efficient business management.',
      'Designed database structures and integrated Supabase authentication, security policies, and real-time data management.'
    ]
  },
  {
    role: 'Junior Developer & Data Entry Executive',
    company: 'Cell Revolution USA / E Plus Business Solutions Sri Lanka',
    period: '2025 – 2026',
    location: 'Sri Lanka',
    bullets: [
      'Contributed to the development and maintenance of internal web applications using HTML, CSS, JavaScript, and basic backend technologies.',
      'Managed accurate data entry, validation, and regular updates of business and customer records using Excel and internal databases.',
      'Worked closely with developers and non-technical teams to understand requirements and support day-to-day technical operations.'
    ]
  },
  {
    role: 'Freelance Graphic Designer',
    company: 'Self-Employed',
    period: '2024 – 2025',
    location: 'Remote',
    bullets: [
      'Delivered 10+ branding and design projects including logos, posters, and social media content for startups and local businesses.',
      'Created visual assets using Adobe Photoshop, Illustrator, and Canva aligned with client brand needs.',
      'Handled client communication, revisions, and project delivery while managing multiple deadlines remotely.'
    ]
  }
];

const LANGUAGES = [
  { name: 'English', level: 'Fluent' },
  { name: 'Tamil', level: 'Native / Proficient' },
  { name: 'Sinhala', level: 'Conversational / Proficient' }
];

const INTERESTS = [
  'UI/UX Design',
  'Front-End Development',
  'Digital Branding',
  'Technology Trends',
  'Backend Development'
];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Shayan's Kids — Wholesale Management System",
    description: 'Full-stack wholesale business operations platform with inventory, orders, invoices, finance, and SMS automation',
    tags: ['React', 'Tailwind CSS', 'JavaScript', 'Supabase'],
    imageColor: 'from-purple-500 to-pink-500',
    category: 'fullstack',
    problem: 'Manual wholesale operations causing data entry errors, 2+ hours of daily stock checks, unmonitored credit limits, and lack of role-based access control.',
    solution: 'Built a full-stack wholesale management system managing products, customers, orders, invoices, purchases, and finance with automated invoicing, SMS campaigns, RBAC, audit logs, and backups.',
    architecture: {
      frontend: ['React', 'Tailwind CSS', 'JavaScript', 'Responsive Dashboard'],
      backend: ['Supabase Auth', 'Security Policies', 'SMS Integration'],
      database: ['PostgreSQL (Supabase)', 'Real-time Sync', 'Backup Systems'],
      api: ['REST APIs', 'Realtime Subscriptions', 'Bulk SMS API'],
      deployment: ['Vercel', 'Supabase']
    },
    challenges: [
      'Implementing stock tracking, backorder handling, and credit limit validation',
      'Building bulk SMS campaigns, order confirmations, and payment reminder templates',
      'Designing role-based access control (RBAC), audit logs, and Supabase security policies'
    ],
    results: 'End-to-end wholesale automation across inventory, invoicing, finance, and SMS communications',
    impact: 'Reduced daily admin overhead significantly, eliminated stockouts, and secured multi-role operations',
    featured: true,
    showcase: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-purple-400">Wholesale Operations Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
            <div className="text-2xl font-bold">Inventory & Orders</div>
            <div className="text-slate-400 text-sm mt-1">Stock tracking, backorders & credit limit validation</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
            <div className="text-2xl font-bold">SMS Automation</div>
            <div className="text-slate-400 text-sm mt-1">Order confirmations, reminders & bulk campaigns</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
            <div className="text-2xl font-bold">RBAC & Audit Logs</div>
            <div className="text-slate-400 text-sm mt-1">Supabase security policies & automated backups</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'GreenLife Wellness Center',
    description: 'Dynamic web application for holistic health management, appointment scheduling, and therapist communication',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    imageColor: 'from-emerald-500 to-cyan-500',
    category: 'fullstack',
    problem: 'Fragmented appointment booking, manual client record keeping, and lack of secure communication between clients and therapists.',
    solution: 'Developed a dynamic web application with secure login, appointment scheduling, centralized client record management, and therapist communication.',
    architecture: {
      frontend: ['HTML5', 'CSS3', 'JavaScript'],
      backend: ['PHP', 'Session Authentication'],
      database: ['MySQL', 'Relational Schema'],
      api: ['Form & AJAX Handlers'],
      deployment: ['Apache / PHP Server']
    },
    challenges: [
      'Designing secure authentication and role separation for clients and therapists',
      'Structuring relational MySQL tables for appointments and client health records',
      'Preventing scheduling conflicts during booking'
    ],
    results: 'Centralized holistic health management with secure login and scheduling',
    impact: 'Streamlined client-therapist coordination and eliminated manual paper records',
    featured: true,
    showcase: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-emerald-400">Wellness Management Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-emerald-500/30">
            <div className="text-lg font-bold">Secure Login</div>
            <div className="text-slate-400 text-sm mt-1">Protected client & therapist portals</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-emerald-500/30">
            <div className="text-lg font-bold">Appointments</div>
            <div className="text-slate-400 text-sm mt-1">Interactive scheduling & slot management</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-emerald-500/30">
            <div className="text-lg font-bold">Client Records</div>
            <div className="text-slate-400 text-sm mt-1">MySQL-backed history & therapist messaging</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '3',
    title: 'Gelioya Motors — Business Management System',
    description: 'Manual-style ledger accounting & business management system for a spare parts shop',
    tags: ['Ledger Accounting', 'Sales & Purchases', 'Cash Flow', 'Financial Reports'],
    imageColor: 'from-amber-500 to-orange-500',
    category: 'fullstack',
    problem: 'Spare parts shop needed a familiar manual-style accounting workflow to track daily sales, purchases, receivables, payables, and true profit.',
    solution: 'Built a business management system with a ledger-based accounting approach handling sales, purchases, cash flow, receivables, payables, and real-time financial summaries.',
    architecture: {
      frontend: ['Responsive Ledger UI', 'Financial Summary Views'],
      backend: ['Accounting & Profit Calculation Engine'],
      database: ['Relational Ledger & Transaction Records'],
      api: ['Real-time Summary Endpoints'],
      deployment: ['Web Application']
    },
    challenges: [
      'Modeling traditional manual ledger workflows accurately in software',
      'Tracking receivables and payables alongside daily cash flow',
      'Computing real-time profit summaries without accounting discrepancies'
    ],
    results: 'Complete visibility over spare parts sales, purchases, cash flow, and profit',
    impact: 'Replaced error-prone paper ledgers with real-time financial summaries',
    featured: true,
    showcase: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400">Ledger & Cash Flow Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-amber-500/30">
            <div className="text-lg font-bold">Sales & Purchases</div>
            <div className="text-slate-400 text-sm mt-1">Daily spare parts transaction ledger</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-amber-500/30">
            <div className="text-lg font-bold">Receivables & Payables</div>
            <div className="text-slate-400 text-sm mt-1">Customer credit & supplier balance tracking</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-amber-500/30">
            <div className="text-lg font-bold">Profit Summaries</div>
            <div className="text-slate-400 text-sm mt-1">Real-time cash flow & net profit analytics</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '4',
    title: 'GreenGrid — Energy Management & Monitoring',
    description: 'Full-stack web application for energy management and monitoring with interactive maps and dynamic data visualization',
    tags: ['React', 'Next.js', 'Interactive Maps', 'Data Visualization', 'APIs'],
    imageColor: 'from-teal-500 to-green-500',
    category: 'fullstack',
    problem: 'Lack of centralized visibility into distributed energy usage, grid nodes, and real-time consumption metrics.',
    solution: 'Developed a full-stack web application for energy management and monitoring featuring interactive maps, dynamic data visualization, and server-side APIs.',
    architecture: {
      frontend: ['React', 'Next.js', 'Interactive Maps', 'Recharts'],
      backend: ['Server-side APIs', 'Next.js API Routes'],
      database: ['Structured Energy Telemetry Store'],
      api: ['REST APIs', 'Real-time Telemetry'],
      deployment: ['Vercel']
    },
    challenges: [
      'Optimizing interactive map rendering for distributed energy nodes',
      'Building dynamic, responsive data visualization dashboards',
      'Designing clean server-side APIs for energy monitoring'
    ],
    results: 'Real-time energy monitoring with interactive map nodes and dynamic charts',
    impact: 'Enabled clear, actionable insights into energy distribution and consumption patterns',
    featured: true,
    showcase: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-teal-400">Energy Grid Monitoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 bg-slate-900/50 rounded-lg border border-teal-500/30 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Interactive Energy Map</p>
            </div>
          </div>
          <div className="h-48 bg-slate-900/50 rounded-lg border border-teal-500/30 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Dynamic Data Visualization</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '5',
    title: 'The Paws Shop — POS System',
    description: 'Object-oriented desktop point-of-sale',
    tags: ['Java', 'OOP', 'Swing'],
    imageColor: 'from-orange-500 to-yellow-500',
    category: 'fullstack',
    problem: 'No centralized sales tracking, no inventory history, no user roles.',
    solution: 'Created Java OOP-based system with role-based access and file persistence.',
    architecture: {
      frontend: ['Java Swing'],
      backend: ['Java OOP'],
      database: ['File-based (JSON)'],
      api: ['Internal Interfaces'],
      deployment: ['Desktop App']
    },
    challenges: [
      'Clean OOP architecture',
      'Handling concurrent access',
      'Role-based permissions'
    ],
    results: '50+ daily transactions, 100% data integrity',
    impact: 'Complete sales history, proper staff permissions',
    featured: false,
    showcase: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-orange-400">POS Interface</h3>
        <div className="p-4 bg-white/5 rounded-lg border border-orange-500/30 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-800 rounded-lg text-center hover:bg-slate-700 cursor-pointer transition-colors">
              <div className="text-lg font-bold">🐕 Dog Food</div>
              <div className="text-xs text-slate-500">$24.99</div>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg text-center hover:bg-slate-700 cursor-pointer transition-colors">
              <div className="text-lg font-bold">🐱 Cat Food</div>
              <div className="text-xs text-slate-500">$19.99</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const LOGS: Log[] = [
  { id: '1', type: 'boot', title: 'GRAPHIC DESIGN CERTIFICATION', date: 'Feb–Aug 2023', details: 'Completed Professional Certificate in Graphic Design at VISTA Academy (Adobe Suite, Visual Communication, Branding Principles, Typography).' },
  { id: '2', type: 'install', title: 'DIPLOMA IN INFORMATION TECHNOLOGY', date: 'Mar–Sep 2023', details: 'Completed Diploma in IT at ICBT Campus (Cardiff Metropolitan) covering Computer Fundamentals, Networking, Office Tools, and Basics of Programming.' },
  { id: '3', type: 'install', title: 'HND IN SOFTWARE ENGINEERING', date: '2024 – 2026', details: 'Pursued Higher National Diploma in Software Engineering at ICBT Campus (Cardiff Metropolitan): OOP, Web Technologies, Database Systems, Agile Development.' },
  { id: '4', type: 'system', title: 'FREELANCE GRAPHIC DESIGNER', date: '2024 – 2025', details: 'Delivered 10+ branding and design projects (logos, posters, social media) remotely using Adobe Photoshop, Illustrator, and Canva.' },
  { id: '5', type: 'upgrade', title: 'JUNIOR DEVELOPER & DATA ENTRY EXECUTIVE', date: '2025 – 2026', details: 'Built & maintained internal web apps (HTML, CSS, JS) and managed database/Excel records at Cell Revolution USA / E Plus Business Solutions Sri Lanka.' },
  { id: '6', type: 'upgrade', title: 'SOFTWARE ENGINEER — SHAYAN\'S KIDS & TOYS', date: '2026 – Present', details: 'Engineered full-stack wholesale management system (React, Tailwind, JS, Supabase) with inventory, backorders, credit limits, SMS campaigns, RBAC, and audit logs.' },
  { id: '7', type: 'upgrade', title: 'BSC (HONS) COMPUTER SCIENCE IN SE', date: '2026 – Present', details: 'Enrolled at CINEC Campus (University of Wolverhampton) — Software Engineering, Artificial Intelligence, Machine Learning, Research Methods, Data Science.' }
];

const SKILL_DATA = [
  { subject: 'UI/UX & Design', A: 96, fullMark: 100 },
  { subject: 'React & Tailwind', A: 88, fullMark: 100 },
  { subject: 'HTML / CSS / JS', A: 86, fullMark: 100 },
  { subject: 'MySQL & DBs', A: 80, fullMark: 100 },
  { subject: 'Java (OOP)', A: 70, fullMark: 100 },
  { subject: 'Git & Collab', A: 88, fullMark: 100 }
];

const ACTIVITY_DATA = [
  { name: 'Mon', commits: 6 },
  { name: 'Tue', commits: 11 },
  { name: 'Wed', commits: 5 },
  { name: 'Thu', commits: 14 },
  { name: 'Fri', commits: 9 },
  { name: 'Sat', commits: 7 },
  { name: 'Sun', commits: 3 },
];

const ACHIEVEMENTS = [
  { id: 1, title: 'Full-Stack Developer', unlocked: true, icon: Code2, description: 'Built production web apps including Shayan\'s Kids, GreenLife, Gelioya Motors & GreenGrid' },
  { id: 2, title: 'UI/UX & Brand Designer', unlocked: true, icon: Monitor, description: 'Delivered 10+ professional branding & design projects for startups and local businesses' },
  { id: 3, title: 'Database Architect', unlocked: true, icon: Database, description: 'Designed relational MySQL & Supabase PostgreSQL schemas with security policies' },
  { id: 4, title: 'Graphic Design Pro', unlocked: true, icon: Sparkles, description: 'Certified in Adobe Photoshop, Illustrator, Canva, Typography & Color Theory' },
  { id: 5, title: 'BSc (Hons) Scholar', unlocked: true, icon: GraduationCap, description: 'Advancing in Software Engineering, AI, Machine Learning & Data Science at CINEC' },
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', client: 'Shayan\'s Kids & Toys', project: 'Wholesale Management System', rating: 5, feedback: 'Excellent work! The system has completely transformed our inventory, invoicing, and SMS customer communication.' },
  { id: '2', client: 'GreenGrid', project: 'Energy Management & Monitoring', rating: 5, feedback: 'Professional, timely, and exceeded expectations. The interactive maps and data visualization are fantastic!' },
  { id: '3', client: 'Local Startup', project: 'Branding & Visual Identity', rating: 5, feedback: 'Great design work and attention to detail. Delivered polished, on-brand visual assets on schedule.' }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    problem: 'Manual inventory management with 2-hour daily data entry',
    solution: 'Built digital real-time inventory with automatic low-stock alerts',
    technology: ['React', 'Supabase', 'Tailwind'],
    outcome: 'Reduced data entry to 10 minutes daily, eliminated stockouts',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    problem: 'No centralized booking system causing double-bookings',
    solution: 'Created availability calendar & booking management system',
    technology: ['React', 'Node.js', 'PostgreSQL'],
    outcome: 'Zero double-bookings, 30% faster confirmations',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    problem: 'Client communication scattered across emails',
    solution: 'Implemented client portal with SMS notifications',
    technology: ['Next.js', 'Supabase', 'SMS API'],
    outcome: '40% faster response times, improved satisfaction',
    color: 'from-teal-500 to-green-500'
  }
];

const CODE_QUALITY_METRICS = [
  { name: 'Code Quality', value: 92, color: 'bg-blue-500' },
  { name: 'Problem Solving', value: 95, color: 'bg-purple-500' },
  { name: 'UI Engineering', value: 98, color: 'bg-pink-500' },
  { name: 'Database Design', value: 85, color: 'bg-green-500' },
  { name: 'Testing', value: 78, color: 'bg-yellow-500' },
  { name: 'Documentation', value: 88, color: 'bg-cyan-500' }
];

const SYSTEM_HEALTH_METRICS = [
  { name: 'Performance', value: 94, color: 'bg-blue-500' },
  { name: 'Security', value: 90, color: 'bg-emerald-500' },
  { name: 'Accessibility', value: 88, color: 'bg-purple-500' },
  { name: 'Responsive Design', value: 96, color: 'bg-pink-500' },
  { name: 'Code Quality', value: 92, color: 'bg-cyan-500' }
];

// --- Core Components ---
const GlassPanel = ({ children, className, noPadding = false, ...props }: { children: React.ReactNode, className?: string, noPadding?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
      !noPadding && "p-6",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    {children}
  </div>
);

const GlowText = ({ children, color = "blue" }: { children: React.ReactNode, color?: 'blue' | 'green' | 'purple' | 'red' | 'cyan' }) => {
  const colors = {
    blue: "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    green: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    purple: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    red: "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]",
    cyan: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
  };
  return <span className={cn("font-mono font-bold", colors[color])}>{children}</span>;
};

const StatusLight = ({ active = true }: { active?: boolean }) => (
  <span className={cn("w-2 h-2 rounded-full animate-pulse", active ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-red-500")} />
);

// --- Feature Components ---
const StatusWidget = ({ isRecruiterMode }: { isRecruiterMode: boolean }) => (
  <GlassPanel className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2"><Wifi className="w-4 h-4" /> System Status</h3>
      <div className="flex items-center gap-2"><StatusLight active /><span className="text-emerald-400 text-sm font-medium">Available for Freelance</span></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <span className="text-xs text-slate-500 uppercase">Currently Working On</span>
        <p className="font-medium text-blue-300">Building Scalable Applications</p>
      </div>
      <div className="space-y-2">
        <span className="text-xs text-slate-500 uppercase">Primary Focus</span>
        <p className="font-medium text-purple-300">Full-Stack Software Engineering</p>
      </div>
    </div>
  </GlassPanel>
);

const GitHubActivity = () => (
  <GlassPanel className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2"><Server className="w-4 h-4" /> GitHub Activity</h3>
      <a href="https://github.com/Mohomed-Zaid" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">View <ArrowUpRight className="w-3 h-3" /></a>
    </div>
    <div className="space-y-3">
      {[
        { t: 'Authentication system improved', time: '2h ago' },
        { t: 'Database architecture updated', time: '1d ago' },
        { t: 'UI components created', time: '2d ago' },
        { t: 'Portfolio deployed to Vercel', time: '3d ago' }
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
          <div>
            <p className="text-sm text-slate-200">{item.t}</p>
            <p className="text-xs text-slate-500">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </GlassPanel>
);

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm Zaid's Portfolio Assistant. Ask me anything about Mohomed Zaid Nasheem's projects, skills, education, experience, or how to get in touch.",
    actions: [
      { label: 'View Projects', module: 'projects' },
      { label: 'Open CV', module: 'resume' }
    ]
  }
];

const QUICK_PROMPTS = [
  'Projects',
  'Skills',
  'Experience',
  'Education',
  'Hire / Freelance',
  'Contact'
];

const ZaidAIAssistant = ({ onNavigate }: { onNavigate: (m: ModuleType, projectId?: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponse = (query: string): { content: string; actions?: ChatAction[] } => {
    const q = query.toLowerCase().trim();

    if (/^(hi|hello|hey|salam|greetings|yo)\b/.test(q) || q.includes('who are you') || q.includes('about')) {
      return {
        content: `I'm the assistant for ${PROFILE.name} — ${PROFILE.title}. He blends graphic design expertise (Photoshop, Illustrator, Canva, UI/UX) with full-stack software engineering (React, Tailwind, JavaScript, MySQL, Supabase).`,
        actions: [
          { label: 'View Experience & Edu', module: 'timeline' },
          { label: 'Open CV', module: 'resume' }
        ]
      };
    }

    if (q.includes('shayan') || q.includes('wholesale')) {
      return {
        content: "Shayan's Kids — Wholesale Management System (2026–Present): Built with React, Tailwind CSS, JavaScript, and Supabase. Includes inventory & stock tracking, backorder handling, credit limit validation, automated invoicing, SMS notifications & bulk campaigns, RBAC, audit logs, and backup systems.",
        actions: [{ label: 'Open Project Showcase', module: 'showcase', projectId: '1' }]
      };
    }

    if (q.includes('greenlife') || q.includes('wellness') || q.includes('health')) {
      return {
        content: "GreenLife Wellness Center: A dynamic holistic health management web app built with HTML, CSS, JavaScript, PHP, and MySQL—featuring secure login, appointment scheduling, client record management, and therapist communication.",
        actions: [{ label: 'Open Project Showcase', module: 'showcase', projectId: '2' }]
      };
    }

    if (q.includes('gelioya') || q.includes('motor') || q.includes('spare') || q.includes('ledger')) {
      return {
        content: "Gelioya Motors — Business Management System: A manual-style ledger accounting system for a spare parts shop, handling sales, purchases, cash flow, receivables, payables, and profit tracking with real-time financial summaries.",
        actions: [{ label: 'Open Project Showcase', module: 'showcase', projectId: '3' }]
      };
    }

    if (q.includes('greengrid') || q.includes('energy') || q.includes('grid')) {
      return {
        content: "GreenGrid: A full-stack web application for energy management and monitoring, featuring interactive maps, dynamic data visualization, and server-side APIs.",
        actions: [{ label: 'Open Project Showcase', module: 'showcase', projectId: '4' }]
      };
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('built')) {
      return {
        content: "Zaid's selected projects include: 1) Shayan's Kids Wholesale Management System (React/Supabase), 2) GreenLife Wellness Center (PHP/MySQL), 3) Gelioya Motors Business Management System, and 4) GreenGrid Energy Management & Monitoring.",
        actions: [
          { label: 'Explore All Projects', module: 'projects' },
          { label: 'Live Showcase', module: 'showcase' }
        ]
      };
    }

    if (q.includes('education') || q.includes('degree') || q.includes('bsc') || q.includes('cinec') || q.includes('wolverhampton') || q.includes('hnd') || q.includes('icbt') || q.includes('vista') || q.includes('study')) {
      return {
        content: "Education: BSc (Hons) Computer Science in Software Engineering at CINEC Campus / University of Wolverhampton (2026–Present); HND in Software Engineering at ICBT Campus / Cardiff Met (2024–2026); Diploma in IT at ICBT (2023); and Professional Certificate in Graphic Design at VISTA Academy (2023).",
        actions: [{ label: 'View Education & Experience', module: 'timeline' }]
      };
    }

    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('cell revolution') || q.includes('e plus')) {
      return {
        content: "Experience: Software Engineer at Shayan's Kids & Toys Store (2026–Present); Junior Developer & Data Entry Executive at Cell Revolution USA / E Plus Business Solutions Sri Lanka (2025–2026); and Freelance Graphic Designer remotely (2024–2025, 10+ branding & design projects).",
        actions: [{ label: 'View Full Timeline', module: 'timeline' }]
      };
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('design') || q.includes('photoshop') || q.includes('illustrator') || q.includes('java') || q.includes('mysql')) {
      return {
        content: "Skills: Design (Adobe Photoshop, Illustrator, Canva, UI/UX, Color Theory, Branding, Typography); Tech (HTML, CSS, JavaScript, React, Tailwind CSS, Java OOP, MySQL, Relational DBs); Collaboration (MS Office, Google Drive, Remote Work) & Git/GitHub.",
        actions: [{ label: 'Open Skill Matrix', module: 'skills' }]
      };
    }

    if (q.includes('hire') || q.includes('freelance') || q.includes('available') || q.includes('collaborate')) {
      return {
        content: "Zaid is available for freelance graphic design, UI/UX, and full-stack web development projects! You can submit a project brief directly or reach out via email/phone.",
        actions: [
          { label: 'Start a Project', module: 'freelance' },
          { label: 'Contact Workspace', module: 'contact' }
        ]
      };
    }

    if (q.includes('language') || q.includes('english') || q.includes('tamil') || q.includes('sinhala') || q.includes('interest')) {
      return {
        content: "Languages: English (fluent), Tamil, and Sinhala. Interests: UI/UX Design, Front-End Development, Digital Branding, Technology Trends, and Backend Development.",
        actions: [{ label: 'View Skills & Profile', module: 'skills' }]
      };
    }

    if (q.includes('cv') || q.includes('resume') || q.includes('download')) {
      return {
        content: "You can preview Zaid's interactive CV or download the official PDF (Mohomed-Zaid-CV.pdf).",
        actions: [
          { label: 'Open CV View', module: 'resume' },
          { label: 'Download PDF', href: '/Mohomed-Zaid-CV.pdf', download: true }
        ]
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('call') || q.includes('github') || q.includes('linkedin')) {
      return {
        content: `Reach Zaid at ${PROFILE.email} or ${PROFILE.phone}. You can also connect on GitHub and LinkedIn.`,
        actions: [
          { label: 'Contact Workspace', module: 'contact' },
          { label: 'GitHub', href: PROFILE.github },
          { label: 'LinkedIn', href: PROFILE.linkedin }
        ]
      };
    }

    return {
      content: "I can help with Zaid's projects (Shayan's Kids, GreenLife, Gelioya Motors, GreenGrid), skills, education, experience, CV download, or contact details. Try one of the quick topics below!",
      actions: [
        { label: 'Projects', module: 'projects' },
        { label: 'Contact', module: 'contact' }
      ]
    };
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: trimmed }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getResponse(trimmed);
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: reply.content, actions: reply.actions }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleAction = (action: ChatAction) => {
    if (action.module) {
      onNavigate(action.module, action.projectId);
      setIsOpen(false);
    } else if (action.href && action.download) {
      const link = document.createElement('a');
      link.href = action.href;
      link.download = 'Mohomed-Zaid-CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.href) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close Zaid AI Assistant' : 'Open Zaid AI Assistant'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:scale-110 transition-transform flex items-center justify-center border border-white/20"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-7 h-7 text-white" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px]"
          >
            <GlassPanel className="p-0 h-[520px] flex flex-col bg-[#0d111a]/95 border-white/15 shadow-2xl">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Zaid AI Assistant</h3>
                    <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online • Portfolio Guide
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMessages(INITIAL_CHAT_MESSAGES)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Reset conversation"
                  >
                    Clear
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn("max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed", msg.role === 'user' ? "bg-blue-600 text-white rounded-tr-none" : "bg-white/10 text-slate-200 rounded-tl-none border border-white/5")}>
                      <p>{msg.content}</p>
                    </div>
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.actions.map((act) => (
                          <button
                            key={act.label}
                            onClick={() => handleAction(act)}
                            className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-colors flex items-center gap-1"
                          >
                            <span>{act.label}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-3 py-2 border-t border-white/10 flex gap-1.5 overflow-x-auto no-scrollbar bg-slate-900/40">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 text-slate-300 whitespace-nowrap transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex gap-2 bg-slate-900/60">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, CV..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Modules ---
const MissionControl = ({ onNavigate, isRecruiterMode }: { onNavigate: (m: ModuleType) => void, isRecruiterMode: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
    <div className="md:col-span-2 space-y-6">
      <GlassPanel className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 p-1 shadow-[0_0_40px_rgba(59,130,246,0.4)] overflow-hidden">
              <img 
                src="/profile.jpg" 
                alt={PROFILE.name} 
                className="w-full h-full rounded-2xl object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.profile-fallback') as HTMLElement | null;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="profile-fallback w-full h-full rounded-2xl bg-[#0a0a0f] items-center justify-center hidden">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{PROFILE.name}</h2>
              <p className="text-blue-400 font-medium text-sm mt-0.5">{PROFILE.title}</p>
              <p className="text-slate-400 text-xs mt-1">System Status: <GlowText color="green">OPERATIONAL</GlowText></p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-1.5 transition-colors">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-1.5 transition-colors">
              <User className="w-3.5 h-3.5 text-blue-400" /> LinkedIn
            </a>
            <button onClick={() => onNavigate('resume')} className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-1.5 transition-colors">
              <FileText className="w-3.5 h-3.5" /> CV / Resume
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
          {PROFILE.summary}
        </p>
      </GlassPanel>
      <StatusWidget isRecruiterMode={isRecruiterMode} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <GlassPanel className="h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2"><Activity className="w-4 h-4" /> Activity</h3><StatusLight />
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_DATA}>
                <defs><linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} itemStyle={{ color: '#60a5fa' }} />
                <Area type="monotone" dataKey="commits" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCommits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
        <GitHubActivity />
      </div>
      {!isRecruiterMode && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => onNavigate('terminal')} className="p-4 GlassPanel hover:border-cyan-500/50 transition-all text-center group">
            <TerminalIcon className="w-8 h-8 mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Terminal</span>
          </button>
          <button onClick={() => onNavigate('achievements')} className="p-4 GlassPanel hover:border-amber-500/50 transition-all text-center group">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Achievements</span>
          </button>
          <button onClick={() => onNavigate('resume')} className="p-4 GlassPanel hover:border-emerald-500/50 transition-all text-center group">
            <FileText className="w-8 h-8 mx-auto mb-2 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Resume</span>
          </button>
          <button onClick={() => onNavigate('demo')} className="p-4 GlassPanel hover:border-purple-500/50 transition-all text-center group">
            <Play className="w-8 h-8 mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Demo</span>
          </button>
        </div>
      )}
    </div>
    <div className="space-y-6">
      <GlassPanel className="flex flex-col">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Cpu className="w-4 h-4" /> Active Tools</h3>
        <div className="grid grid-cols-2 gap-3 content-start">
          {['React', 'Tailwind CSS', 'JavaScript', 'Photoshop', 'Illustrator', 'Canva', 'MySQL', 'Git & GitHub'].map((tool) => (
            <button key={tool} onClick={() => onNavigate('skills')} className="group relative h-16 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all flex items-center justify-start px-3 gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0"><Code2 size={15} /></div>
              <span className="text-xs font-medium text-left">{tool}</span>
            </button>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Education</h3>
          <button onClick={() => onNavigate('timeline')} className="text-xs text-blue-400 hover:text-blue-300">All 4 →</button>
        </div>
        <div className="space-y-3">
          {EDUCATION.slice(0, 2).map((edu) => (
            <div key={edu.degree} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-semibold text-white">{edu.degree}</div>
              <div className="text-[11px] text-blue-400 mt-0.5">{edu.institution}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{edu.period}</div>
            </div>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel className="space-y-3">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2"><Globe className="w-4 h-4" /> Languages & Interests</h3>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((l) => (
            <span key={l.name} className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {l.name} ({l.level.split(' ')[0]})
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {INTERESTS.map((interest) => (
            <span key={interest} className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 text-slate-300 border border-white/10">
              {interest}
            </span>
          ))}
        </div>
      </GlassPanel>
      {!isRecruiterMode && (
        <div className="grid grid-cols-1 gap-4">
          <button onClick={() => onNavigate('showcase')} className="p-4 GlassPanel hover:border-purple-500/50 transition-all text-left group">
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-slate-500 mb-1">Live Demos</p><h4 className="text-lg font-bold">Product Showcase</h4></div>
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform"><Play /></div>
            </div>
          </button>
          <button onClick={() => onNavigate('freelance')} className="p-4 GlassPanel hover:border-emerald-500/50 transition-all text-left group">
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-slate-500 mb-1">Work With Me</p><h4 className="text-lg font-bold">Start a Project</h4></div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform"><DollarSign /></div>
            </div>
          </button>
        </div>
      )}
    </div>
  </div>
);

const ProjectModule = ({ onNavigate, isRecruiterMode }: { onNavigate: (m: ModuleType, projectId?: string) => void, isRecruiterMode: boolean }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const filteredProjects = isRecruiterMode ? PROJECTS.filter(p => p.featured) : PROJECTS;

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold">Project Modules</h2>
          {isRecruiterMode && <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">FEATURED ONLY</span>}
        </div>
        {!isRecruiterMode && (
          <button onClick={() => onNavigate('architecture')} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 text-sm transition-colors">
            <Workflow className="w-4 h-4" /> System Architecture
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div layoutId={`project-${project.id}`} key={project.id} className="group cursor-pointer" onClick={() => setActiveProject(project)}>
            <GlassPanel className="h-full">
              <div className={cn("h-36 rounded-xl bg-gradient-to-br mb-4 group-hover:scale-[1.02] transition-transform", project.imageColor)} />
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                {project.featured && <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">FEATURED</span>}
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {project.tags.slice(0, 3).map(tag => <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">{tag}</span>)}
              </div>
              <button onClick={(e) => { e.stopPropagation(); onNavigate('showcase', project.id); }} className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Play className="w-4 h-4" /> View Case Study
              </button>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeProject && (
          <ProjectWindow project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectWindow = ({ project, onClose }: { project: Project, onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4" onClick={onClose}>
    <motion.div layoutId={`project-${project.id}`} className="w-full max-w-4xl bg-[#0f172a] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-b border-slate-700 sticky top-0 z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs font-mono text-slate-400">{project.title.toLowerCase().replace(/\s/g, '_')}.casestudy</span>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
      </div>
      <div className="p-8 space-y-8">
        <div className={cn("h-52 rounded-xl bg-gradient-to-br", project.imageColor)} />
        <div><h2 className="text-3xl font-bold mb-2">{project.title}</h2><p className="text-slate-400">{project.description}</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassPanel><h3 className="font-bold flex items-center gap-2 mb-3 text-red-400"><ShieldAlert className="w-5 h-5" /> Problem</h3><p className="text-sm text-slate-300">{project.problem}</p></GlassPanel>
          <GlassPanel><h3 className="font-bold flex items-center gap-2 mb-3 text-emerald-400"><CheckCircle2 className="w-5 h-5" /> Solution</h3><p className="text-sm text-slate-300">{project.solution}</p></GlassPanel>
        </div>
        <GlassPanel><h3 className="font-bold flex items-center gap-2 mb-4 text-blue-400"><Workflow className="w-5 h-5" /> Architecture</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(project.architecture).map(([layer, items], i) => (
              <div key={layer} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="font-semibold text-sm text-slate-300 mb-2 capitalize">{layer}</h4>
                <div className="space-y-1">
                  {items.map((item, j) => <motion.div key={j} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.1 }} className="text-xs text-slate-400 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" />{item}</motion.div>)}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassPanel><h3 className="font-bold flex items-center gap-2 mb-3 text-amber-400"><Zap className="w-5 h-5" /> Challenges</h3><ul className="space-y-2">{project.challenges.map((c, i) => <li key={i} className="text-sm text-slate-300 flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>{c}</li>)}</ul></GlassPanel>
          <GlassPanel><h3 className="font-bold flex items-center gap-2 mb-3 text-purple-400"><Trophy className="w-5 h-5" /> Impact</h3><p className="text-sm text-slate-300 mb-3">{project.results}</p><p className="text-sm text-purple-300 font-medium">{project.impact}</p></GlassPanel>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const SkillMatrix = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('design');
  const categories = [
    {
      id: 'design',
      title: 'Design & Creative Tools',
      skills: [
        { name: 'Adobe Photoshop', level: 96 },
        { name: 'Adobe Illustrator', level: 94 },
        { name: 'Canva', level: 95 }
      ]
    },
    {
      id: 'uiux',
      title: 'UI/UX & Visual Design',
      skills: [
        { name: 'UI Design Principles', level: 92 },
        { name: 'Color Theory & Typography', level: 94 },
        { name: 'Branding & Visual Communication', level: 95 }
      ]
    },
    {
      id: 'web',
      title: 'Programming & Web Technologies',
      skills: [
        { name: 'HTML & CSS', level: 94 },
        { name: 'React & Tailwind CSS', level: 88 },
        { name: 'JavaScript (Learning)', level: 78 },
        { name: 'MySQL & Relational Database Concepts', level: 82 },
        { name: 'Java (OOP – Beginner)', level: 70 }
      ]
    },
    {
      id: 'productivity',
      title: 'Productivity & Collaboration',
      skills: [
        { name: 'Microsoft Office (Word, Excel, PowerPoint)', level: 92 },
        { name: 'Google Drive & Remote Collaboration', level: 94 },
        { name: 'Time Management & Client Communication', level: 95 }
      ]
    },
    {
      id: 'vcs',
      title: 'Version Control',
      skills: [
        { name: 'Git & GitHub', level: 88 }
      ]
    }
  ];
  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Skill Diagnostics</h2>
          <p className="text-slate-400 mb-6">Real-time proficiency analysis across design, engineering, and collaboration</p>
          <div className="space-y-4">
            {categories.map((cat) => (
              <GlassPanel key={cat.id} className={cn("cursor-pointer transition-all", expandedCategory === cat.id ? "border-blue-500/50 bg-blue-500/5" : "")} onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}>
                <div className="flex items-center justify-between"><h3 className="font-bold text-lg">{cat.title}</h3><ChevronRight className={cn("transition-transform", expandedCategory === cat.id ? "rotate-90" : "")} /></div>
                <AnimatePresence>{expandedCategory === cat.id && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="space-y-4 mt-4">{cat.skills.map((skill) => <div key={skill.name}><div className="flex justify-between text-xs mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-blue-400 font-mono">{skill.level}%</span></div><div className="h-2 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ delay: 0.1, duration: 0.7 }} className="h-full bg-gradient-to-r from-blue-600 to-purple-600" /></div></div>)}</div></motion.div>}</AnimatePresence>
              </GlassPanel>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <GlassPanel className="min-h-[380px] flex items-center justify-center">
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Skills" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassPanel>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Languages</h3>
              <div className="space-y-2">
                {LANGUAGES.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-sm">
                    <span className="text-slate-200 font-medium">{lang.name}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{lang.level}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
            <GlassPanel>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <span key={interest} className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {interest}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemLog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, []);
  return (
    <div className="w-full max-w-5xl space-y-8">
      <div>
        <div className="mb-6 flex items-center gap-3"><GraduationCap className="w-7 h-7 text-blue-400" /><h2 className="text-3xl font-bold">Education & Qualifications</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EDUCATION.map((edu) => (
            <GlassPanel key={edu.degree} className={cn(edu.current ? "border-blue-500/40 bg-blue-500/5" : "")}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-base text-white">{edu.degree}</h3>
                {edu.current && <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">CURRENT</span>}
              </div>
              <p className="text-sm text-blue-400 font-medium">{edu.institution}</p>
              <p className="text-xs text-slate-500 font-mono mt-1 mb-3">{edu.period}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{edu.details}</p>
            </GlassPanel>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center gap-3"><Briefcase className="w-7 h-7 text-purple-400" /><h2 className="text-3xl font-bold">Professional Experience</h2></div>
        <div className="space-y-4">
          {EXPERIENCE.map((exp) => (
            <GlassPanel key={exp.role + exp.period}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                  <p className="text-sm text-purple-400 font-medium">{exp.company} • {exp.location}</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 w-fit">{exp.period}</span>
              </div>
              <ul className="space-y-1.5">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" /><h2 className="text-2xl font-bold font-mono">System Evolution Log</h2></div>
        <GlassPanel className="p-0 overflow-hidden">
          <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center gap-2"><TerminalIcon className="w-4 h-4 text-slate-500" /><span className="text-xs text-slate-500 font-mono">journey.log --view --follow</span></div>
          <div ref={scrollRef} className="p-8 font-mono text-sm space-y-6 max-h-[500px] overflow-y-auto bg-black/40">
            {LOGS.map((log, index) => (
              <motion.div key={log.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="flex gap-4">
                <div className="text-slate-600 select-none w-32 shrink-0">[{log.date}]</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("uppercase text-xs font-bold tracking-widest", log.type === 'boot' ? 'text-cyan-400' : log.type === 'install' ? 'text-blue-400' : log.type === 'upgrade' ? 'text-emerald-400' : log.type === 'error' ? 'text-red-400' : 'text-slate-400')}>{log.type}:</span>
                    <span className="text-white font-bold">{log.title}</span>
                  </div>
                  <p className="text-slate-400">{log.details}</p>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 text-emerald-500"><span className="animate-pulse">_</span><span className="text-xs opacity-70">Awaiting next entry...</span></div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};

const TerminalModule = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to Zaid-Portfolio Terminal', 'Type "help" for commands']);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [history]);

  const executeCommand = (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    let output: string[] = [];
    if (c === 'help') output = ['Available commands:', 'about, projects, skills, education, experience, languages, contact, clear, matrix, coffee, sudo'];
    else if (c === 'about') output = [PROFILE.name, PROFILE.title, 'BSc (Hons) CS in SE @ CINEC | HND SE @ ICBT'];
    else if (c === 'projects') output = ['Selected Projects:', '1. Shayan\'s Kids — Wholesale Management System (React, Tailwind, Supabase)', '2. GreenLife Wellness Center (HTML, CSS, JS, PHP, MySQL)', '3. Gelioya Motors — Business Management System (Ledger Accounting)', '4. GreenGrid — Energy Management & Monitoring (Maps, Data Viz, APIs)'];
    else if (c === 'skills') output = ['Design: Photoshop, Illustrator, Canva, UI/UX, Color Theory, Branding, Typography', 'Web/Tech: HTML, CSS, JavaScript, React, Tailwind, Java (OOP), MySQL, Git & GitHub'];
    else if (c === 'education') output = EDUCATION.map(e => `${e.degree} — ${e.institution} (${e.period})`);
    else if (c === 'experience') output = EXPERIENCE.map(e => `${e.role} @ ${e.company} (${e.period})`);
    else if (c === 'languages') output = ['Languages: English (fluent), Tamil, Sinhala'];
    else if (c === 'contact') output = ['Contact:', `Email: ${PROFILE.email}`, `Phone: ${PROFILE.phone}`, `GitHub: ${PROFILE.github}`];
    else if (c === 'clear') { setHistory([]); return; }
    else if (c === 'matrix') output = ['🔢 Matrix mode activated!', 'Wake up, Neo...'];
    else if (c === 'coffee') output = ['☕ Fuel restored!', 'Time to code!'];
    else if (c === 'sudo') output = ['⚠️ Developer mode activated!', 'You found the Easter Egg! 🎉'];
    else output = [`Command not found: ${c}`];
    setHistory(prev => [...prev, `> ${cmd}`, ...output]);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); executeCommand(input); setInput(''); };
  return (
    <GlassPanel className="p-0 max-w-4xl w-full h-[500px] flex flex-col font-mono">
      <div className="bg-slate-900/80 p-4 border-b border-white/10 flex items-center justify-between"><div className="flex items-center gap-2 text-slate-400 text-sm"><TerminalIcon className="w-4 h-4" /><span>zaid@portfolio:~$</span></div></div>
      <div className="flex-1 bg-black/60 p-6 overflow-y-auto space-y-2 text-sm text-slate-300">
        {history.map((line, i) => <div key={i} className={line.startsWith('>') ? "text-blue-300" : ""}>{line}</div>)}
        <form onSubmit={handleSubmit} className="flex items-center gap-2"><span className="text-emerald-400">$</span><input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent outline-none" autoFocus /></form>
        <div ref={endRef} />
      </div>
    </GlassPanel>
  );
};

const AchievementsModule = () => (
  <div className="w-full max-w-6xl">
    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><Trophy className="w-8 h-8 text-amber-400" /> Achievements</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ACHIEVEMENTS.map((a) => (
        <motion.div key={a.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: a.id * 0.1 }}>
          <GlassPanel className={cn("h-full transition-all", a.unlocked ? "border-amber-500/30" : "opacity-60")}>
            <div className="flex items-start gap-4">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", a.unlocked ? "bg-amber-500/20 text-amber-400" : "bg-slate-700 text-slate-500")}><a.icon className="w-7 h-7" /></div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{a.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{a.description}</p>
                {a.unlocked ? <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Unlocked</span> : <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-500">Locked</span>}
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      ))}
    </div>
  </div>
);

const ResumeBuilder = () => {
  const [type, setType] = useState<'fullstack' | 'developer' | 'designer'>('fullstack');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Mohomed-Zaid-CV.pdf';
    link.download = 'Mohomed-Zaid-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skillsByType =
    type === 'designer'
      ? ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'UI Design Principles', 'Color Theory', 'Branding', 'Visual Communication', 'Typography']
      : type === 'developer'
      ? ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Java (OOP)', 'MySQL', 'Relational Database Concepts', 'Git & GitHub']
      : ['React', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Java (OOP)', 'MySQL', 'Supabase', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'UI/UX', 'Git & GitHub'];

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-3xl font-bold mb-6">Resume & Curriculum Vitae</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm text-slate-400 uppercase tracking-wider">Focus View</h3>
          {[{ id: 'fullstack', label: 'Multidisciplinary (Full CV)', icon: Code2 }, { id: 'developer', label: 'Software Engineering', icon: Cpu }, { id: 'designer', label: 'Graphic & UI/UX Design', icon: Monitor }].map((opt) => (
            <button key={opt.id} onClick={() => setType(opt.id as any)} className={cn("w-full p-4 GlassPanel flex items-center gap-3 text-left transition-all", type === opt.id ? "border-blue-500/50 bg-blue-500/5" : "")}>
              <div className="p-3 rounded-xl bg-white/5"><opt.icon className="w-5 h-5" /></div><span className="font-medium">{opt.label}</span>
            </button>
          ))}
          <button onClick={handleDownload} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" /> Download Official CV (PDF)
          </button>
        </div>
        <div className="lg:col-span-2">
          <GlassPanel className="min-h-[500px] bg-white/[0.03]">
            <div className="text-center p-6 sm:p-8 border-b border-white/10">
              <h2 className="text-3xl font-bold">{PROFILE.name}</h2>
              <p className="text-blue-400 mt-1">
                {type === 'designer' ? 'Graphic Designer & UI/UX Specialist' : type === 'developer' ? 'Aspiring Software Engineer' : PROFILE.title}
              </p>
              <p className="text-sm text-slate-400 mt-2">
                {PROFILE.email} | {PROFILE.phone} •{' '}
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub</a> •{' '}
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
              </p>
            </div>
            <div className="p-6 sm:p-8 space-y-7">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Professional Summary</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{PROFILE.summary}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Education</h3>
                <div className="space-y-3">
                  {EDUCATION.map((edu) => (
                    <div key={edu.degree} className="border-l-2 border-blue-500/40 pl-3">
                      <div className="flex flex-wrap justify-between gap-1">
                        <h4 className="font-semibold text-sm text-white">{edu.degree}</h4>
                        <span className="text-xs text-slate-400 font-mono">{edu.period}</span>
                      </div>
                      <p className="text-blue-400 text-xs">{edu.institution}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Professional Experience</h3>
                <div className="space-y-4">
                  {EXPERIENCE.map((exp) => (
                    <div key={exp.role + exp.period}>
                      <div className="flex flex-wrap justify-between gap-1">
                        <h4 className="font-semibold text-sm text-white">{exp.role}</h4>
                        <span className="text-xs text-slate-400 font-mono">{exp.period}</span>
                      </div>
                      <p className="text-blue-400 text-xs mb-1">{exp.company} • {exp.location}</p>
                      <ul className="space-y-1">
                        {exp.bullets.slice(0, 3).map((b, i) => (
                          <li key={i} className="text-slate-400 text-xs flex items-start gap-1.5">
                            <span className="text-blue-400">•</span><span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Selected Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROJECTS.filter(p => p.featured).map((p) => (
                    <div key={p.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="font-semibold text-xs text-white">{p.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{p.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsByType.map(s => <span key={s} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-200 border border-slate-700">{s}</span>)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Languages</h3>
                  <p className="text-xs text-slate-300">English (fluent), Tamil, Sinhala</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Interests</h3>
                  <p className="text-xs text-slate-300">{INTERESTS.join(', ')}</p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

const LiveProductShowcase = ({ activeProjectId }: { activeProjectId?: string }) => {
  const [selectedId, setSelectedId] = useState<string>(activeProjectId || PROJECTS[0].id);
  useEffect(() => {
    if (activeProjectId) setSelectedId(activeProjectId);
  }, [activeProjectId]);
  const project = PROJECTS.find(p => p.id === selectedId) || PROJECTS[0];
  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><Play className="w-8 h-8 text-purple-400" /> Live Product Showcase</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {PROJECTS.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)} className={cn("w-full p-4 GlassPanel text-left transition-all", project.id === p.id ? "border-purple-500/50 bg-purple-500/5" : "")}>
              <h4 className="font-bold">{p.title}</h4><p className="text-sm text-slate-400 mt-1 line-clamp-2">{p.description}</p>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2">
          <GlassPanel className="min-h-[500px]">{project.showcase}</GlassPanel>
        </div>
      </div>
    </div>
  );
};

const SystemArchitectureExplorer = () => (
  <div className="w-full max-w-6xl">
    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><Workflow className="w-8 h-8 text-blue-400" /> System Architecture Explorer</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Frontend', icon: Monitor, color: 'from-blue-500 to-cyan-500', description: 'React, Next.js, Tailwind CSS - Responsive user interfaces', features: ['Reusable Components', 'State Management', 'Responsive Design'] },
        { name: 'API Layer', icon: Server, color: 'from-purple-500 to-pink-500', description: 'RESTful APIs, Edge Functions, WebSockets', features: ['Authentication', 'Business Logic', 'Real-time Updates'] },
        { name: 'Backend', icon: Cpu, color: 'from-green-500 to-emerald-500', description: 'Server-side processing, business rules', features: ['Data Validation', 'Security', 'Scalability'] },
        { name: 'Database', icon: Database, color: 'from-orange-500 to-yellow-500', description: 'PostgreSQL, MongoDB, File Storage', features: ['Data Integrity', 'Indexing', 'Backups'] },
        { name: 'Deployment', icon: Rocket, color: 'from-red-500 to-pink-500', description: 'CI/CD, Hosting, Monitoring', features: ['Vercel', 'Supabase', 'Analytics'] },
        { name: 'User', icon: User, color: 'from-indigo-500 to-blue-500', description: 'End user interaction & experience', features: ['UI/UX', 'Accessibility', 'Performance'] }
      ].map((layer, i) => (
        <motion.div key={layer.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <GlassPanel className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-3 rounded-xl bg-gradient-to-br", layer.color)}><layer.icon className="w-6 h-6 text-white" /></div>
              <h3 className="font-bold text-xl">{layer.name}</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">{layer.description}</p>
            <ul className="space-y-2">
              {layer.features.map(f => <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span className="text-slate-300">{f}</span></li>)}
            </ul>
          </GlassPanel>
        </motion.div>
      ))}
    </div>
  </div>
);

const FreelanceProjectRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ client: '', type: '', budget: '', timeline: '', requirements: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  if (submitted) {
    return (
      <div className="w-full max-w-2xl">
        <GlassPanel className="text-center py-12">
          <CheckCircle2 className="w-20 h-20 mx-auto text-emerald-400 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Project Request Created!</h3>
          <p className="text-slate-400 mb-8">Your request is being reviewed. Current status:</p>
          <div className="bg-white/5 p-6 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Status</span>
              <span className="text-emerald-400 font-bold">Requirement Analysis</span>
            </div>
            <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
            </div>
          </div>
          <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
            Submit Another Request
          </button>
        </GlassPanel>
      </div>
    );
  }
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><DollarSign className="w-8 h-8 text-emerald-400" /> Start a Project</h2>
      <GlassPanel>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Your Name / Company</label>
            <input value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Project Type</label>
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors">
              <option value="">Select a type</option>
              <option value="web">Web Application</option>
              <option value="mobile">Mobile App</option>
              <option value="design">Design / Branding</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Budget Range</label>
              <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors">
                <option value="">Select budget</option>
                <option value="small">$500 - $2,000</option>
                <option value="medium">$2,000 - $5,000</option>
                <option value="large">$5,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Timeline</label>
              <select value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors">
                <option value="">Select timeline</option>
                <option value="fast">1-2 weeks</option>
                <option value="normal">1-2 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Project Requirements</label>
            <textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors" placeholder="Describe your project..." />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Submit Project Request
          </button>
        </form>
      </GlassPanel>
    </div>
  );
};

const InteractiveContactWorkspace = ({ onNavigate }: { onNavigate: (m: ModuleType) => void }) => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Mohomed-Zaid-CV.pdf';
    link.download = 'Mohomed-Zaid-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><Laptop className="w-8 h-8 text-purple-400" /> Contact Workspace</h2>
      <GlassPanel className="min-h-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { id: 'email', icon: Mail, label: 'Email', sub: PROFILE.email, color: 'from-blue-500 to-cyan-500', action: () => window.location.href = `mailto:${PROFILE.email}` },
            { id: 'github', icon: Github, label: 'GitHub', sub: 'github.com/Mohomed-Zaid', color: 'from-gray-500 to-gray-700', action: () => window.open(PROFILE.github, '_blank') },
            { id: 'linkedin', icon: User, label: 'LinkedIn', sub: 'Connect on LinkedIn', color: 'from-blue-600 to-blue-800', action: () => window.open(PROFILE.linkedin, '_blank') },
            { id: 'phone', icon: Globe, label: 'Phone', sub: PROFILE.phone, color: 'from-green-500 to-emerald-500', action: () => window.location.href = PROFILE.phoneHref },
            { id: 'resume', icon: FileText, label: 'Download CV', sub: 'Mohomed-Zaid-CV.pdf', color: 'from-purple-500 to-pink-500', action: handleDownloadResume },
            { id: 'freelance', icon: BriefcaseBusiness, label: 'Start a Project', sub: 'Request Freelance Work', color: 'from-orange-500 to-yellow-500', action: () => onNavigate('freelance') }
          ].map((item) => (
            <motion.button key={item.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={item.action} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 flex flex-col items-center gap-2.5 transition-all text-center">
              <div className={cn("p-4 rounded-full bg-gradient-to-br", item.color)}><item.icon className="w-7 h-7 text-white" /></div>
              <span className="font-semibold">{item.label}</span>
              <span className="text-xs text-slate-400 break-all">{item.sub}</span>
            </motion.button>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
};

const PrivateAnalyticsDashboard = () => (
  <div className="w-full max-w-6xl">
    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><BarChart3 className="w-8 h-8 text-indigo-400" /> Private Analytics Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Total Visitors', value: '1,247', color: 'from-blue-500 to-cyan-500' },
        { label: 'Most Viewed Project', value: 'Shayan\'s Kids', color: 'from-purple-500 to-pink-500' },
        { label: 'Contact Requests', value: '12', color: 'from-green-500 to-emerald-500' },
        { label: 'Demo Sessions', value: '34', color: 'from-orange-500 to-yellow-500' }
      ].map((stat, i) => (
        <GlassPanel key={i} className="text-center">
          <div className={cn("text-2xl font-bold mb-1 bg-gradient-to-r", stat.color, "bg-clip-text text-transparent")}>{stat.value}</div>
          <div className="text-sm text-slate-400">{stat.label}</div>
        </GlassPanel>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GlassPanel className="h-80">
        <h3 className="font-bold mb-4 text-indigo-400">Visitor Activity</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ACTIVITY_DATA}>
              <defs><linearGradient id="colorStats" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} /><stop offset="95%" stopColor="#818cf8" stopOpacity={0} /></linearGradient></defs>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="commits" stroke="#818cf8" fillOpacity={1} fill="url(#colorStats)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>
      <GlassPanel className="h-80">
        <h3 className="font-bold mb-4 text-purple-400">Popular Sections</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={[{ name: 'Projects', value: 40 }, { name: 'Skills', value: 25 }, { name: 'Showcase', value: 20 }, { name: 'Contact', value: 15 }]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {[0, 1, 2, 3].map((index) => <Cell key={`cell-${index}`} fill={['#3b82f6', '#a855f7', '#10b981', '#f59e0b'][index]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>
    </div>
  </div>
);

const SystemHealthPanel = () => (
  <div className="w-full max-w-6xl">
    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="w-8 h-8 text-emerald-400" /> System Health</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {SYSTEM_HEALTH_METRICS.map((metric, i) => (
        <motion.div key={metric.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
          <GlassPanel className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{metric.value}%</span>
              </div>
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                <motion.circle cx="48" cy="48" r="40" fill="none" stroke="url(#healthGradient)" strokeWidth="10" strokeLinecap="round" initial={{ strokeDasharray: 251, strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 - (metric.value / 100 * 251) }} transition={{ delay: 0.3 + i * 0.1, duration: 1 }} />
                <defs><linearGradient id="healthGradient" x1="0" y1="0" x2="100%" y2="0"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
              </svg>
            </div>
            <h3 className="text-lg font-bold">{metric.name}</h3>
          </GlassPanel>
        </motion.div>
      ))}
    </div>
  </div>
);

const DemoLogin = ({ onLogin }: { onLogin: (type: 'admin' | 'client' | 'manager') => void }) => (
  <div className="w-full max-w-md">
    <GlassPanel className="max-w-md w-full">
      <div className="text-center mb-6"><h2 className="text-2xl font-bold">Demo Environment</h2><p className="text-slate-400 text-sm mt-2">Select your role to explore</p></div>
      <div className="space-y-4">
        <button onClick={() => onLogin('admin')} className="w-full p-4 GlassPanel hover:border-purple-500/50 transition-all text-left flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400"><Lock className="w-6 h-6" /></div>
          <div><h3 className="font-semibold">Admin</h3><p className="text-xs text-slate-400">Analytics & Reports</p></div>
        </button>
        <button onClick={() => onLogin('client')} className="w-full p-4 GlassPanel hover:border-blue-500/50 transition-all text-left flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400"><UserRound className="w-6 h-6" /></div>
          <div><h3 className="font-semibold">Client</h3><p className="text-xs text-slate-400">Orders & Messages</p></div>
        </button>
        <button onClick={() => onLogin('manager')} className="w-full p-4 GlassPanel hover:border-emerald-500/50 transition-all text-left flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400"><Users className="w-6 h-6" /></div>
          <div><h3 className="font-semibold">Manager</h3><p className="text-xs text-slate-400">Team & Tasks</p></div>
        </button>
      </div>
    </GlassPanel>
  </div>
);

const CommandBar = ({ isOpen, onClose, onCommand }: { isOpen: boolean; onClose: () => void; onCommand: (cmd: ModuleType) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  useEffect(() => { if (isOpen) { setTimeout(() => inputRef.current?.focus(), 50); setInput(''); } }, [isOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    const commands: Record<string, ModuleType> = { 'home': 'home', 'projects': 'projects', 'skills': 'skills', 'timeline': 'timeline', 'contact': 'contact', 'terminal': 'terminal', 'achievements': 'achievements', 'resume': 'resume', 'demo': 'demo', 'showcase': 'showcase', 'architecture': 'architecture', 'freelance': 'freelance', 'analytics': 'analytics', 'system-health': 'system-health' };
    if (commands[cmd]) { onCommand(commands[cmd]); onClose(); }
    else onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div initial={{ scale: 0.95, y: -20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 border-b border-slate-800">
          <Command className="w-5 h-5 text-blue-500 shrink-0" />
          <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent outline-none text-lg placeholder-slate-600" placeholder="Type a command..." />
          <div className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-500 border border-slate-700">ESC</div>
        </form>
        <div className="p-2 max-h-64 overflow-y-auto">
          {input.length === 0 && (
            <div className="grid grid-cols-2 gap-2 px-2">
              {['home', 'projects', 'skills', 'showcase', 'architecture', 'freelance', 'terminal', 'contact', 'achievements', 'resume', 'demo'].map(c => (
                <button key={c} onClick={() => { onCommand(c as ModuleType); onClose(); }} className="text-left px-4 py-2 hover:bg-white/10 rounded-xl text-sm text-slate-300 transition-colors">
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---
export default function LifeOSApp() {
  const [activeModule, setActiveModule] = useState<ModuleType>('home');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [demoStep, setDemoStep] = useState<'login' | 'dashboard'>('login');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === '/' && !isCommandOpen) { e.preventDefault(); setIsCommandOpen(true); } if (e.key === 'Escape') setIsCommandOpen(false); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen]);

  const handleNavigate = (module: ModuleType, projectId?: string) => {
    if (projectId) setActiveProjectId(projectId);
    setActiveModule(module);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'home': return <MissionControl onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'projects': return <ProjectModule onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'skills': return <SkillMatrix />;
      case 'timeline': return <SystemLog />;
      case 'contact': return <InteractiveContactWorkspace onNavigate={handleNavigate} />;
      case 'terminal': return !isRecruiterMode ? <TerminalModule /> : <MissionControl onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'achievements': return !isRecruiterMode ? <AchievementsModule /> : <SkillMatrix />;
      case 'resume': return <ResumeBuilder />;
      case 'demo': return !isRecruiterMode ? (demoStep === 'login' ? <DemoLogin onLogin={() => setDemoStep('dashboard')} /> : <PrivateAnalyticsDashboard />) : <MissionControl onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'showcase': return <LiveProductShowcase activeProjectId={activeProjectId} />;
      case 'architecture': return !isRecruiterMode ? <SystemArchitectureExplorer /> : <ProjectModule onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'freelance': return <FreelanceProjectRequest />;
      case 'analytics': return !isRecruiterMode ? <PrivateAnalyticsDashboard /> : <ResumeBuilder />;
      case 'system-health': return !isRecruiterMode ? <SystemHealthPanel /> : <InteractiveContactWorkspace onNavigate={handleNavigate} />;
      default: return <MissionControl onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      <header className="h-16 border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div><h1 className="font-bold tracking-tight text-lg">Zaid<span className="text-blue-400">-Portfolio</span></h1></div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-1 flex-wrap">
          {[
            { id: 'home', icon: LayoutDashboard, label: 'Home' },
            { id: 'projects', icon: Layers, label: 'Projects' },
            { id: 'skills', icon: BarChart3, label: 'Skills' },
            { id: 'timeline', icon: Briefcase, label: 'Experience & Edu' },
            { id: 'resume', icon: FileText, label: 'CV' },
            { id: 'contact', icon: MessageSquare, label: 'Contact' }
          ].map((item) => (
            <button key={item.id} onClick={() => handleNavigate(item.id as ModuleType)} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2", activeModule === item.id ? "bg-white/10 text-white border border-white/10" : "text-slate-400 hover:text-white hover:bg-white/5")}>
              <item.icon className="w-4 h-4" /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsRecruiterMode(!isRecruiterMode)} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border", isRecruiterMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white")}>
            {isRecruiterMode ? <UserCheck className="w-4 h-4" /> : <BriefcaseBusiness className="w-4 h-4" />}
            {isRecruiterMode ? "Recruiter Mode" : "Recruiter View"}
          </button>
          <button onClick={() => setIsCommandOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-mono text-slate-400">
            <Terminal className="w-4 h-4" /><span className="hidden sm:inline">Press /</span>
          </button>
        </div>
      </header>
      <nav className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-b border-white/10 bg-[#0a0a0f]/95 z-30">
        {[
          { id: 'home', icon: LayoutDashboard, label: 'Home' },
          { id: 'projects', icon: Layers, label: 'Projects' },
          { id: 'skills', icon: BarChart3, label: 'Skills' },
          { id: 'timeline', icon: Briefcase, label: 'Experience' },
          { id: 'resume', icon: FileText, label: 'CV' },
          { id: 'contact', icon: MessageSquare, label: 'Contact' }
        ].map((item) => (
          <button key={item.id} onClick={() => handleNavigate(item.id as ModuleType)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all", activeModule === item.id ? "bg-white/10 text-white border border-white/10" : "text-slate-400 hover:text-white")}>
            <item.icon className="w-3.5 h-3.5" /><span>{item.label}</span>
          </button>
        ))}
      </nav>
      <main className="flex-1 relative overflow-y-auto p-6 md:p-12">
        <motion.div key={activeModule} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="h-full w-full flex flex-col items-center justify-start">
          <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><div className="animate-pulse text-slate-500">Loading module...</div></div>}>
            {renderModule()}
          </Suspense>
        </motion.div>
      </main>
      <AnimatePresence>{isCommandOpen && <CommandBar isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} onCommand={handleNavigate} />}</AnimatePresence>
      <ZaidAIAssistant onNavigate={handleNavigate} />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
