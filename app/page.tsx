"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
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
  Github
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
  Tooltip
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type ModuleType = 'home' | 'projects' | 'skills' | 'timeline' | 'contact';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageColor: string;
  category: 'fullstack' | 'frontend' | 'mobile';
}

interface Log {
  id: string;
  type: 'boot' | 'install' | 'upgrade' | 'system' | 'error';
  title: string;
  date: string;
  details: string;
}

// --- Mock Data ---

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Shayan\'s Kids — Wholesale Management System',
    description: 'Full-stack wholesale management system using React, Tailwind, and Supabase. Manages inventory, orders, invoices, customers, purchases, finance, and features SMS notifications & role-based access.',
    tags: ['React', 'Tailwind', 'JavaScript', 'Supabase'],
    imageColor: 'from-purple-500 to-pink-500',
    category: 'fullstack'
  },
  {
    id: '2',
    title: 'GreenLife Wellness Center',
    description: 'Dynamic web application for holistic health management with secure login, appointment scheduling, client records, and therapist communication.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    imageColor: 'from-green-500 to-emerald-500',
    category: 'fullstack'
  },
  {
    id: '3',
    title: 'The Paws Shop',
    description: 'Object-oriented Java system for automating pet supply transactions with cashier/manager roles, authentication, and file-based persistence.',
    tags: ['Java', 'OOP'],
    imageColor: 'from-orange-500 to-yellow-500',
    category: 'fullstack'
  },
  {
    id: '4',
    title: 'Gelioya Motors — Business Management System',
    description: 'Manual-style business management system for a spare parts shop with sales, purchases, cash flow, ledgers, and real-time financial summaries.',
    tags: ['React', 'Tailwind', 'JavaScript'],
    imageColor: 'from-blue-500 to-cyan-500',
    category: 'fullstack'
  },
  {
    id: '5',
    title: 'GreenGrid',
    description: 'Full-stack web application for energy management with interactive maps, dynamic data visualization, and server-side APIs.',
    tags: ['React', 'Next.js', 'Tailwind', 'JavaScript'],
    imageColor: 'from-teal-500 to-green-500',
    category: 'fullstack'
  }
];

const LOGS: Log[] = [
  { id: '1', type: 'boot', title: 'SYSTEM INITIALIZATION', date: '2023', details: 'Started IT journey with Diploma in IT and Professional Certificate in Graphic Design.' },
  { id: '2', type: 'install', title: 'GRAPHIC DESIGN MODULE', date: '2023', details: 'Mastered Adobe Photoshop, Illustrator, and Canva for visual communication & branding.' },
  { id: '3', type: 'install', title: 'HND SOFTWARE ENGINEERING', date: '2024', details: 'Enrolled at ICBT Campus (Cardiff Met), learning OOP, Web Technologies, and Databases.' },
  { id: '4', type: 'system', title: 'FREELANCE GRAPHIC DESIGNER', date: '2024-2025', details: 'Delivered 10+ branding and design projects for startups and local businesses.' },
  { id: '5', type: 'upgrade', title: 'JUNIOR DEVELOPER & DATA ENTRY EXECUTIVE', date: '2025-2026', details: 'Contributed to internal web apps, testing/debugging, and data management at Cell Revolution / E Plus Business Solutions.' },
  { id: '6', type: 'upgrade', title: 'SOFTWARE ENGINEER @ SHAYAN\'S KIDS', date: '2026-Present', details: 'Built full-stack wholesale management system with inventory, SMS, and RBAC features.' },
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

// --- Components ---

const GlassPanel = ({ children, className, noPadding = false, ...props }: { children: React.ReactNode, className?: string, noPadding?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(
    "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl",
    !noPadding && "p-6",
    className
  )} {...props}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    {children}
  </div>
);

const GlowText = ({ children, color = "blue" }: { children: React.ReactNode, color?: 'blue' | 'green' | 'purple' | 'red' }) => {
  const colors = {
    blue: "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    green: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    purple: "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    red: "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  };
  return <span className={cn("font-mono font-bold", colors[color])}>{children}</span>;
};

const StatusLight = ({ active = true }: { active?: boolean }) => (
  <span className={cn("w-2 h-2 rounded-full animate-pulse", active ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-red-500")} />
);

// --- Modules ---

const MissionControl = ({ onNavigate }: { onNavigate: (m: ModuleType) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
      <div className="md:col-span-2 space-y-6">
        <GlassPanel className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome Back, Zaid</h2>
              <p className="text-slate-400 text-sm">System Status: <GlowText color="green">OPERATIONAL</GlowText></p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-slate-500 uppercase tracking-widest">Current Focus</span>
            <span className="text-lg font-semibold text-blue-300">Full-Stack & UI/UX</span>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassPanel className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4" /> Activity Widget
              </h3>
              <StatusLight />
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ACTIVITY_DATA}>
                  <defs>
                    <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#60a5fa' }}
                  />
                  <Area type="monotone" dataKey="commits" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCommits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>

          <GlassPanel>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Achievements
              </h3>
            </div>
            <ul className="space-y-3">
              {[ 
                { t: "Delivered 10+ Graphic Design Projects", c: "text-purple-400" },
                { t: "Built 5+ Full-Stack Web Apps", c: "text-emerald-400" },
                { t: "Combines Design & Dev Expertise", c: "text-blue-400" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className={cn("w-1.5 h-1.5 rounded-full", item.c.replace('text-', 'bg-'))} />
                  <span className="text-slate-300">{item.t}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>

      <div className="space-y-6">
        <GlassPanel className="h-full flex flex-col">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Active Tools
          </h3>
          <div className="flex-1 grid grid-cols-2 gap-3 content-start">
             {['React', 'Tailwind', 'Photoshop', 'Illustrator', 'Java', 'Git'].map((tool) => (
               <button 
                 key={tool}
                 onClick={() => onNavigate('skills')}
                 className="group relative h-20 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center justify-center gap-2"
               >
                 <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                   <Code size={18} />
                 </div>
                 <span className="text-xs font-medium">{tool}</span>
               </button>
             ))}
          </div>
        </GlassPanel>

        <GlassPanel 
          className="cursor-pointer hover:border-blue-500/30 transition-all"
          onClick={() => onNavigate('projects')}
        >
           <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-1">Quick Access</p>
                <h4 className="text-lg font-bold">View Projects</h4>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                <Layers />
              </div>
           </div>
        </GlassPanel>
      </div>
    </div>
  );
};

const ProjectModule = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Project Modules</h2>
          <p className="text-slate-400">Active repository instances detected.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <motion.div
            layoutId={`project-${project.id}`}
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="group cursor-pointer"
          >
            <GlassPanel className="h-full hover:border-white/20 transition-all">
              <div className={cn("h-32 rounded-lg bg-gradient-to-br mb-4 group-hover:scale-[1.02] transition-transform", project.imageColor)} />
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/10 uppercase tracking-wider">{project.category}</span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">{tag}</span>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectWindow 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectWindow = ({ project, onClose }: { project: Project, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div 
      layoutId={`project-${project.id}`}
      className="w-full max-w-2xl bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs font-mono text-slate-400">{project.title.toLowerCase().replace(' ', '_')}.exe</span>
        <button onClick={onClose}><X className="w-4 h-4 text-slate-400" /></button>
      </div>
      
      <div className="p-6">
        <div className={cn("h-40 rounded-lg bg-gradient-to-br mb-6", project.imageColor)} />
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-slate-400 mb-6">{project.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-medium">
            <Globe size={18} /> Live Demo
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors font-medium border border-slate-700">
            <Github size={18} /> View Code
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors font-medium border border-slate-700">
            <Layers size={18} /> Architecture
          </button>
        </div>

        <div className="h-48 bg-slate-900/50 rounded-lg border border-slate-800 flex items-center justify-center">
           <div className="text-center text-slate-500">
             <MapPin className="w-10 h-10 mx-auto mb-2 opacity-50" />
             <p>Interactive Demo UI Placeholder</p>
           </div>
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
      title: 'Design & Creative',
      skills: [
        { name: 'Adobe Photoshop', level: 98 },
        { name: 'Adobe Illustrator', level: 95 },
        { name: 'Canva', level: 92 },
        { name: 'UI/UX Design Principles', level: 90 },
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Systems',
      skills: [
        { name: 'React', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'HTML / CSS', level: 95 },
        { name: 'JavaScript', level: 80 },
      ]
    },
    {
      id: 'backend',
      title: 'Backend & Database',
      skills: [
        { name: 'Java (OOP)', level: 70 },
        { name: 'PHP', level: 75 },
        { name: 'MySQL', level: 80 },
        { name: 'Supabase', level: 85 },
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Skill Diagnostics</h2>
        <p className="text-slate-400 mb-6">Real-time proficiency analysis.</p>
        
        <div className="space-y-4">
          {categories.map((cat) => (
            <GlassPanel 
              key={cat.id} 
              className={cn(
                "cursor-pointer transition-all",
                expandedCategory === cat.id ? "border-blue-500/50 bg-blue-500/5" : ""
              )}
              onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{cat.title}</h3>
                <ChevronRight className={cn("transition-transform", expandedCategory === cat.id ? "rotate-90" : "")} />
              </div>
              <AnimatePresence>
                {expandedCategory === cat.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4">
                      {cat.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">{skill.name}</span>
                            <span className="text-blue-400 font-mono">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  />
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
        <h2 className="text-3xl font-bold font-mono">SYSTEM.LOG</h2>
      </div>

      <GlassPanel className="p-0 overflow-hidden">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-500 font-mono">journey.log --view --follow</span>
        </div>
        <div 
          ref={scrollRef}
          className="p-6 font-mono text-sm space-y-6 max-h-[600px] overflow-y-auto bg-black/40"
        >
          {LOGS.map((log, index) => (
            <motion.div 
              key={log.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex gap-4"
            >
              <div className="text-slate-600 select-none w-24 shrink-0">[{log.date}]</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "uppercase text-xs font-bold tracking-widest",
                    log.type === 'boot' ? 'text-cyan-400' :
                    log.type === 'install' ? 'text-blue-400' :
                    log.type === 'upgrade' ? 'text-emerald-400' :
                    log.type === 'error' ? 'text-red-400' : 'text-slate-400'
                  )}>
                    {log.type}:
                  </span>
                  <span className="text-white font-bold">{log.title}</span>
                </div>
                <p className="text-slate-400">{log.details}</p>
              </div>
            </motion.div>
          ))}
          
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="animate-pulse">_</span>
            <span className="text-xs opacity-70">Awaiting next entry...</span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};

const ContactPanel = () => (
  <div className="w-full max-w-2xl">
    <GlassPanel>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Initialize Connection</h2>
        <p className="text-slate-400">Ready to collaborate? Let's establish a secure link.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="mailto:Zaidn2848@gmail.com" className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
          <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
            <MessageSquare />
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 uppercase">Email</p>
            <p className="font-medium">Zaidn2848@gmail.com</p>
          </div>
        </a>

        <a href="tel:+94777531318" className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 transition-all group">
          <div className="p-3 rounded-full bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
            <Globe />
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 uppercase">Phone</p>
            <p className="font-medium">+94 777 531 318</p>
          </div>
        </a>

        <a href="https://github.com/Mohomed-Zaid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
          <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
            <Github />
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 uppercase">GitHub</p>
            <p className="font-medium">Mohomed-Zaid</p>
          </div>
        </a>

        <a href="https://www.linkedin.com/in/mohomed-zaid-5a81b4377" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-600/50 hover:bg-blue-600/5 transition-all group">
          <div className="p-3 rounded-full bg-blue-600/10 text-blue-500 group-hover:scale-110 transition-transform">
            <User />
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 uppercase">LinkedIn</p>
            <p className="font-medium">Mohomed Zaid Nasheem</p>
          </div>
        </a>
      </div>
    </GlassPanel>
  </div>
);

// --- Command Bar ---

const CommandBar = ({ 
  isOpen, 
  onClose, 
  onCommand 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onCommand: (cmd: ModuleType) => void 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setInput('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    
    if (cmd === '/projects') { onCommand('projects'); onClose(); }
    else if (cmd === '/skills') { onCommand('skills'); onClose(); }
    else if (cmd === '/timeline') { onCommand('timeline'); onClose(); }
    else if (cmd === '/contact') { onCommand('contact'); onClose(); }
    else if (cmd === '/home') { onCommand('home'); onClose(); }
    else if (cmd === '/sudo mode') { 
        alert("Developer Mode Activated: You found the Easter Egg! 🎉");
        onClose();
    }
    else {
        // Shake animation logic could go here
        onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.95, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 border-b border-slate-800">
          <Command className="w-5 h-5 text-blue-500 shrink-0" />
          <input 
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-lg placeholder-slate-600"
            placeholder="Type a command... (e.g. /projects, /skills)"
          />
          <div className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-500 border border-slate-700">ESC</div>
        </form>
        
        <div className="p-2 max-h-64 overflow-y-auto">
           {input.length === 0 && (
             <div className="px-2 py-4 text-center text-sm text-slate-500">
               Available commands: /home, /projects, /skills, /timeline, /contact
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Application ---

export default function LifeOSApp() {
  const [activeModule, setActiveModule] = useState<ModuleType>('home');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Keyboard listener for '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isCommandOpen) {
        e.preventDefault();
        setIsCommandOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen]);

  const renderModule = () => {
    switch(activeModule) {
      case 'home': return <MissionControl onNavigate={setActiveModule} />;
      case 'projects': return <ProjectModule />;
      case 'skills': return <SkillMatrix />;
      case 'timeline': return <SystemLog />;
      case 'contact': return <ContactPanel />;
      default: return <MissionControl onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
             <h1 className="font-bold tracking-tight">Life<span className="text-blue-500">OS</span></h1>
             <div className="text-[10px] text-slate-500 -mt-1 flex items-center gap-1.5">
                <StatusLight />
                <span>v2.4.1 • System Online</span>
             </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[ 
            { id: 'home', icon: LayoutDashboard, label: 'Mission Control' },
            { id: 'projects', icon: Layers, label: 'Projects' },
            { id: 'skills', icon: BarChart3, label: 'Skills' },
            { id: 'timeline', icon: Briefcase, label: 'Timeline' },
            { id: 'contact', icon: MessageSquare, label: 'Contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleType)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                activeModule === item.id 
                  ? "bg-white/10 text-white border border-white/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsCommandOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-mono text-slate-400"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Press '/' for commands</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto p-6 md:p-12">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full flex flex-col items-center justify-start"
        >
          {renderModule()}
        </motion.div>
      </main>

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandOpen && (
          <CommandBar 
            isOpen={isCommandOpen} 
            onClose={() => setIsCommandOpen(false)}
            onCommand={setActiveModule}
          />
        )}
      </AnimatePresence>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
