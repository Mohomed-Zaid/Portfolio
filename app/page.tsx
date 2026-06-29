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

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
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
            Zaid<span className="text-blue-400">OS</span>
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

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Shayan\'s Kids — Wholesale Management',
    description: 'Full-stack inventory and order management system',
    tags: ['React', 'Tailwind', 'Supabase', 'PostgreSQL'],
    imageColor: 'from-purple-500 to-pink-500',
    category: 'fullstack',
    problem: 'Manual data entry causing errors, 2+ hours daily inventory checks, and lack of role-based access control.',
    solution: 'Built a real-time system with automatic low-stock alerts, SMS notifications, and secure role permissions.',
    architecture: {
      frontend: ['React', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Supabase Auth', 'Edge Functions'],
      database: ['PostgreSQL', 'Supabase Storage'],
      api: ['REST', 'Realtime Subscriptions'],
      deployment: ['Vercel', 'Supabase']
    },
    challenges: [
      'Implementing cost-effective SMS notifications',
      'Designing scalable role-based access',
      'Ensuring real-time inventory sync'
    ],
    results: '200+ products managed, 100% invoice automation',
    impact: 'Reduced daily admin time from 2 hours to 10 minutes, eliminated stockouts',
    featured: true,
    showcase: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-purple-400">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
            <div className="text-3xl font-bold">156</div>
            <div className="text-slate-400 text-sm">Products in Stock</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
            <div className="text-3xl font-bold">23</div>
            <div className="text-slate-400 text-sm">Low Stock Items</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
            <div className="text-3xl font-bold">$48,900</div>
            <div className="text-slate-400 text-sm">Monthly Revenue</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '2',
    title: 'GreenGrid — Waste Management',
    description: 'Interactive platform for waste collection route optimization',
    tags: ['Next.js', 'React', 'Leaflet', 'Recharts'],
    imageColor: 'from-teal-500 to-green-500',
    category: 'fullstack',
    problem: 'Inefficient route planning leading to 30% extra fuel costs and missed collections.',
    solution: 'Developed map-based optimization with real-time route updates and analytics.',
    architecture: {
      frontend: ['React', 'Next.js', 'Leaflet', 'Recharts'],
      backend: ['Next.js API Routes'],
      database: ['MongoDB Atlas'],
      api: ['REST', 'WebSockets'],
      deployment: ['Vercel', 'MongoDB']
    },
    challenges: [
      'Optimizing map rendering for large datasets',
      'Implementing real-time updates',
      'Responsive mobile design'
    ],
    results: '1000+ nodes visualized, 200ms updates',
    impact: '30% reduction in fuel costs, 98% on-time collection rate',
    featured: true,
    showcase: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-teal-400">Route Optimization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 bg-slate-900/50 rounded-lg border border-teal-500/30 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Collection Map</p>
            </div>
          </div>
          <div className="h-48 bg-slate-900/50 rounded-lg border border-teal-500/30 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Route className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Optimized Routes</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '3',
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
  { id: '1', type: 'boot', title: 'SYSTEM INITIALIZATION', date: '2023', details: 'Started IT journey with Diploma in IT & Professional Certificate in Graphic Design.' },
  { id: '2', type: 'install', title: 'GRAPHIC DESIGN MODULE', date: '2023', details: 'Mastered Adobe Photoshop, Illustrator, and Canva for visual communication & branding.' },
  { id: '3', type: 'install', title: 'HND SOFTWARE ENGINEERING', date: '2024', details: 'Enrolled at ICBT Campus (Cardiff Met), learning OOP, Web Technologies, and Databases.' },
  { id: '4', type: 'system', title: 'FREELANCE GRAPHIC DESIGNER', date: '2024-2025', details: 'Delivered 10+ branding and design projects for startups and local businesses.' },
  { id: '5', type: 'upgrade', title: 'JUNIOR DEVELOPER', date: '2025-2026', details: 'Contributed to internal web apps, testing/debugging, and data management at Cell Revolution / E Plus Business Solutions.' },
  { id: '6', type: 'upgrade', title: 'SOFTWARE ENGINEER', date: '2026-Present', details: 'Built full-stack wholesale management system with inventory, SMS, and RBAC features at Shayan\'s Kids & Toys.' },
];

const SKILL_DATA = [
  { subject: 'React', A: 88, fullMark: 100 },
  { subject: 'UI/UX', A: 95, fullMark: 100 },
  { subject: 'Graphic Design', A: 98, fullMark: 100 },
  { subject: 'SQL', A: 80, fullMark: 100 },
  { subject: 'Java', A: 70, fullMark: 100 },
  { subject: 'Tailwind', A: 92, fullMark: 100 },
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
  { id: 1, title: 'Full-Stack Developer', unlocked: true, icon: Code2, description: 'Built 5+ production-ready full-stack applications' },
  { id: 2, title: 'UI/UX Designer', unlocked: true, icon: Monitor, description: 'Delivered 10+ professional branding & design projects' },
  { id: 3, title: 'Database Architect', unlocked: true, icon: Database, description: 'Designed normalized PostgreSQL schemas' },
  { id: 4, title: 'Graphic Design Pro', unlocked: true, icon: Sparkles, description: 'Mastered Adobe Creative Suite & Canva' },
  { id: 5, title: 'Problem Solver', unlocked: true, icon: ShieldCheck, description: 'Debugged complex system & performance issues' },
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', client: 'Shayan\'s Kids & Toys', project: 'Wholesale Management System', rating: 5, feedback: 'Excellent work! The system has completely transformed our inventory and order management. Highly recommended!' },
  { id: '2', client: 'GreenGrid', project: 'Waste Management Platform', rating: 5, feedback: 'Professional, timely, and exceeded expectations. The map visualization is fantastic!' },
  { id: '3', client: 'Local Startup', project: 'Branding & Website', rating: 4, feedback: 'Great design work and attention to detail. Delivered exactly what we needed for our brand.' }
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

const ZaidAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: '1', role: 'assistant', content: "Hello! I'm Zaid AI. Ask me about projects, skills, or experience!" }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const getResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('project')) return "I've built 5+ full-stack projects including Shayan's Kids wholesale management system, GreenGrid waste management, The Paws Shop (Java OOP), and more!";
    if (q.includes('skill')) return "Proficient in React, Tailwind, JavaScript, Java (OOP), PHP, MySQL, and graphic design tools (Photoshop/Illustrator/Canva).";
    if (q.includes('experience')) return "1+ year freelance graphic design experience, and current role as Software Engineer at Shayan's Kids & Toys.";
    if (q.includes('contact')) return "You can reach Zaid via email at Zaidn2848@gmail.com, phone at +94777531318, or on LinkedIn and GitHub!";
    return "I'm here to help! Ask about projects, skills, experience, or contact info!";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: input }]);
    const q = input;
    setInput('');
    setTimeout(() => setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: getResponse(q) }]), 600);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-110 transition-transform flex items-center justify-center">
        <Bot className="w-7 h-7 text-white" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-6 z-50 w-full max-w-md">
            <GlassPanel className="p-0 h-[500px] flex flex-col">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
                  <div><h3 className="font-bold">Zaid AI</h3><p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Online</p></div>
                </div>
                <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[80%] p-3 rounded-2xl", msg.role === 'user' ? "bg-blue-600 text-white rounded-tr-none" : "bg-white/10 text-slate-200 rounded-tl-none")}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSubmit} className="p-4 border-b border-white/10 flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500 transition-colors" />
                <button type="submit" className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl hover:opacity-90 transition-opacity"><Send className="w-4 h-4" /></button>
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
      <GlassPanel className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 p-1 shadow-[0_0_40px_rgba(59,130,246,0.4)] overflow-hidden">
            <img 
              src="/profile.jpg" 
              alt="Mohomed Zaid Nasheem" 
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
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, Zaid</h2>
            <p className="text-slate-400 text-sm mt-1">System Status: <GlowText color="green">OPERATIONAL</GlowText></p>
          </div>
        </div>
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
      <GlassPanel className="h-full flex flex-col">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Cpu className="w-4 h-4" /> Active Tools</h3>
        <div className="flex-1 grid grid-cols-2 gap-3 content-start">
          {['React', 'Tailwind', 'Photoshop', 'Illustrator', 'Java', 'Git'].map((tool) => (
            <button key={tool} onClick={() => onNavigate('skills')} className="group relative h-20 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform"><Code2 size={18} /></div>
              <span className="text-xs font-medium">{tool}</span>
            </button>
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
    { id: 'design', title: 'Design & Creative', skills: [{ name: 'Adobe Photoshop', level: 98 }, { name: 'Adobe Illustrator', level: 95 }, { name: 'Canva', level: 92 }, { name: 'UI/UX Design Principles', level: 90 }] },
    { id: 'frontend', title: 'Frontend Systems', skills: [{ name: 'React', level: 88 }, { name: 'Tailwind CSS', level: 92 }, { name: 'HTML / CSS', level: 95 }, { name: 'JavaScript', level: 80 }] },
    { id: 'backend', title: 'Backend & Database', skills: [{ name: 'Java (OOP)', level: 70 }, { name: 'PHP', level: 75 }, { name: 'PostgreSQL', level: 80 }, { name: 'Supabase', level: 85 }] }
  ];
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Skill Diagnostics</h2>
        <p className="text-slate-400 mb-6">Real-time proficiency analysis</p>
        <div className="space-y-4">
          {categories.map((cat) => (
            <GlassPanel key={cat.id} className={cn("cursor-pointer transition-all", expandedCategory === cat.id ? "border-blue-500/50 bg-blue-500/5" : "")} onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}>
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-lg">{cat.title}</h3><ChevronRight className={cn("transition-transform", expandedCategory === cat.id ? "rotate-90" : "")} /></div>
              <AnimatePresence>{expandedCategory === cat.id && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="space-y-4">{cat.skills.map((skill) => <div key={skill.name}><div className="flex justify-between text-xs mb-1"><span className="text-slate-300">{skill.name}</span><span className="text-blue-400 font-mono">{skill.level}%</span></div><div className="h-2 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ delay: 0.2, duration: 0.8 }} className="h-full bg-gradient-to-r from-blue-600 to-purple-600" /></div></div>)}</div></motion.div>}</AnimatePresence>
            </GlassPanel>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <GlassPanel className="h-full min-h-[400px] flex items-center justify-center">
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
      </div>
    </div>
  );
};

const SystemLog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, []);
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" /><h2 className="text-3xl font-bold font-mono">System Evolution Log</h2></div>
      <GlassPanel className="p-0 overflow-hidden">
        <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center gap-2"><TerminalIcon className="w-4 h-4 text-slate-500" /><span className="text-xs text-slate-500 font-mono">journey.log --view --follow</span></div>
        <div ref={scrollRef} className="p-8 font-mono text-sm space-y-6 max-h-[600px] overflow-y-auto bg-black/40">
          {LOGS.map((log, index) => (
            <motion.div key={log.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.2 }} className="flex gap-4">
              <div className="text-slate-600 select-none w-28 shrink-0">[{log.date}]</div>
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
  );
};

const TerminalModule = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to ZaidOS Terminal', 'Type "help" for commands']);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [history]);

  const executeCommand = (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    let output: string[] = [];
    if (c === 'help') output = ['Available commands:', 'about, projects, skills, experience, contact, clear, matrix, coffee, sudo'];
    else if (c === 'about') output = ['Mohomed Zaid Nasheem', 'Software Engineering Student', 'Full-Stack Developer & Graphic Designer'];
    else if (c === 'projects') output = ['Projects:', '1. Shayan\'s Kids - Wholesale Management', '2. GreenGrid - Waste Management', '3. The Paws Shop - Java POS'];
    else if (c === 'skills') output = ['Skills:', 'React, Tailwind, JavaScript, Java, PHP, PostgreSQL, Photoshop, Illustrator'];
    else if (c === 'experience') output = ['Experience:', 'Freelance Graphic Designer (2024-2025)', 'Junior Developer (2025-2026)', 'Software Engineer (2026-Present)'];
    else if (c === 'contact') output = ['Contact:', 'Email: Zaidn2848@gmail.com', 'Phone: +94777531318'];
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

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-3xl font-bold mb-6">Resume Builder</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm text-slate-400 uppercase tracking-wider">Select Type</h3>
          {[{ id: 'fullstack', label: 'Full Stack Developer', icon: Code2 }, { id: 'developer', label: 'Software Developer', icon: Cpu }, { id: 'designer', label: 'UI/UX Designer', icon: Monitor }].map((opt) => (
            <button key={opt.id} onClick={() => setType(opt.id as any)} className={cn("w-full GlassPanel flex items-center gap-3 text-left transition-all", type === opt.id ? "border-blue-500/50 bg-blue-500/5" : "")}>
              <div className="p-3 rounded-xl bg-white/5"><opt.icon className="w-5 h-5" /></div><span className="font-medium">{opt.label}</span>
            </button>
          ))}
          <button onClick={handleDownload} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" /> Download Resume
          </button>
        </div>
        <div className="lg:col-span-2">
          <GlassPanel className="min-h-[500px] bg-white/[0.03]">
            <div className="text-center p-8 border-b border-white/10">
              <h2 className="text-3xl font-bold">Mohomed Zaid Nasheem</h2>
              <p className="text-blue-400 mt-1">{type === 'designer' ? 'UI/UX Designer & Graphic Designer' : type === 'developer' ? 'Software Engineer' : 'Full Stack Developer'}</p>
              <p className="text-sm text-slate-400 mt-2">Zaidn2848@gmail.com | +94777531318</p>
            </div>
            <div className="p-8 space-y-8">
              <div><h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Profile</h3><p className="text-slate-300 text-sm">Multidisciplinary creative professional with experience in {type === 'designer' ? 'graphic design and UI/UX' : 'software development'}, currently pursuing HND in Software Engineering at ICBT Campus (Cardiff Metropolitan University).</p></div>
              <div><h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Experience</h3><div className="space-y-4">
                <div><h4 className="font-semibold">Software Engineer</h4><p className="text-blue-400 text-sm">Shayan's Kids & Toys • 2026-Present</p><p className="text-slate-400 text-sm mt-1">Built full-stack wholesale management system with inventory tracking, SMS notifications & RBAC</p></div>
                <div><h4 className="font-semibold">Junior Developer & Data Entry</h4><p className="text-blue-400 text-sm">Cell Revolution / E Plus • 2025-2026</p><p className="text-slate-400 text-sm mt-1">Web app development, testing/debugging & data management</p></div>
              </div></div>
              <div><h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</h3><div className="flex flex-wrap gap-2">{(type === 'designer' ? ['Photoshop', 'Illustrator', 'Canva', 'UI/UX', 'Branding'] : ['React', 'Tailwind', 'JavaScript', 'Java', 'PostgreSQL', 'PHP', 'Git']).map(s => <span key={s} className="px-3 py-1 bg-slate-800 rounded-full text-xs">{s}</span>)}</div></div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

const LiveProductShowcase = ({ activeProjectId }: { activeProjectId?: string }) => {
  const project = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];
  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><Play className="w-8 h-8 text-purple-400" /> Live Product Showcase</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {PROJECTS.map(p => (
            <button key={p.id} onClick={() => {}} className={cn("w-full GlassPanel text-left transition-all", project.id === p.id ? "border-purple-500/50 bg-purple-500/5" : "")}>
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

const InteractiveContactWorkspace = () => {
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { id: 'email', icon: Mail, label: 'Email', color: 'from-blue-500 to-cyan-500', action: () => window.location.href = 'mailto:Zaidn2848@gmail.com' },
            { id: 'github', icon: Github, label: 'GitHub', color: 'from-gray-500 to-gray-700', action: () => window.open('https://github.com/Mohomed-Zaid', '_blank') },
            { id: 'linkedin', icon: User, label: 'LinkedIn', color: 'from-blue-600 to-blue-800', action: () => window.open('https://www.linkedin.com/in/mohomed-zaid-5a81b4377', '_blank') },
            { id: 'phone', icon: Globe, label: 'Phone', color: 'from-green-500 to-emerald-500', action: () => window.location.href = 'tel:+94777531318' },
            { id: 'resume', icon: FileText, label: 'Resume', color: 'from-purple-500 to-pink-500', action: handleDownloadResume },
            { id: 'freelance', icon: BriefcaseBusiness, label: 'Freelance', color: 'from-orange-500 to-yellow-500', action: () => { } }
          ].map((item, i) => (
            <motion.button key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={item.action} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 flex flex-col items-center gap-3 transition-all">
              <div className={cn("p-4 rounded-full bg-gradient-to-br", item.color)}><item.icon className="w-8 h-8 text-white" /></div>
              <span className="font-medium">{item.label}</span>
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
      case 'contact': return <InteractiveContactWorkspace />;
      case 'terminal': return !isRecruiterMode ? <TerminalModule /> : <MissionControl onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'achievements': return !isRecruiterMode ? <AchievementsModule /> : <SkillMatrix />;
      case 'resume': return <ResumeBuilder />;
      case 'demo': return !isRecruiterMode ? (demoStep === 'login' ? <DemoLogin onLogin={() => setDemoStep('dashboard')} /> : <PrivateAnalyticsDashboard />) : <MissionControl onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'showcase': return <LiveProductShowcase activeProjectId={activeProjectId} />;
      case 'architecture': return !isRecruiterMode ? <SystemArchitectureExplorer /> : <ProjectModule onNavigate={handleNavigate} isRecruiterMode={isRecruiterMode} />;
      case 'freelance': return <FreelanceProjectRequest />;
      case 'analytics': return !isRecruiterMode ? <PrivateAnalyticsDashboard /> : <ResumeBuilder />;
      case 'system-health': return !isRecruiterMode ? <SystemHealthPanel /> : <InteractiveContactWorkspace />;
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
            <div><h1 className="font-bold tracking-tight text-lg">Zaid<span className="text-blue-400">OS</span></h1></div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-1 flex-wrap">
          {[
            { id: 'home', icon: LayoutDashboard, label: 'Home' },
            { id: 'projects', icon: Layers, label: 'Projects' },
            { id: 'skills', icon: BarChart3, label: 'Skills' },
            { id: 'timeline', icon: Briefcase, label: 'Timeline' },
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
      <main className="flex-1 relative overflow-y-auto p-6 md:p-12">
        <motion.div key={activeModule} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="h-full w-full flex flex-col items-center justify-start">
          <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><div className="animate-pulse text-slate-500">Loading module...</div></div>}>
            {renderModule()}
          </Suspense>
        </motion.div>
      </main>
      <AnimatePresence>{isCommandOpen && <CommandBar isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} onCommand={handleNavigate} />}</AnimatePresence>
      <ZaidAIAssistant />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
