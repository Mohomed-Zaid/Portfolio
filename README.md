# Life OS Dashboard 🚀

A futuristic, interactive developer portfolio designed to feel like an operating system interface rather than a traditional website.

## About This Portfolio
This portfolio is built for **Mohomed Zaid Nasheem** - a Graphic Designer & Aspiring Software Engineer. It showcases a unique "OS Dashboard" style interface where users can explore modules instead of scrolling pages.

## Key Features ✨
- **Mission Control (Home Dashboard)**: System-like status cards showing current focus, active tools, achievements, and activity widget
- **Project Modules**: Each project opens as a mini app window with details, tech stack, and interactive demo placeholder
- **Skill Matrix**: Skills displayed as a diagnostic panel with expandable categories and animated radar chart
- **Timeline / System Log**: Career journey presented as boot sequence logs in a retro terminal style
- **Command Bar**: Accessible via `/` key for quick navigation (e.g., `/projects`, `/skills`, `/contact`)
- **Secret Easter Egg**: Try `/sudo mode` to unlock the developer mode alert!

## Tech Stack 🛠️
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (for animations)
- **Recharts** (for charts)
- **Lucide React** (for icons)
- **clsx & twMerge** (for clean class management)

## Getting Started 👨‍💻

### Prerequisites
Make sure you have **Node.js** and **npm** installed.

### Installation
1. Clone or download the project
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
4. Open your browser and go to http://localhost:31544

### Building for Production
```bash
npm run build
npm start
```

## Deploy to Vercel 🚀

The easiest way to deploy your Life OS Dashboard is using Vercel, which is optimized for Next.js apps!

### Method 1: One-Click Deploy
1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will detect it's a Next.js project and use default settings
5. Click "Deploy" - your portfolio will be live in seconds!

### Method 2: Vercel CLI
1. Install Vercel CLI:
```bash
npm install -g vercel
```
2. Login to Vercel:
```bash
vercel login
```
3. Deploy:
```bash
vercel
```
4. For production deployment:
```bash
vercel --prod
```

## Customization Tips 🎨
1. **Update Contact Info**: Replace GitHub and LinkedIn placeholders in `app/page.tsx` with your actual profile URLs
2. **Add More Projects**: Add new project objects to the `PROJECTS` array in `app/page.tsx`
3. **Adjust Skills**: Modify the skill categories, levels, and radar chart data in `app/page.tsx`
4. **Tweak Timeline**: Update the `LOGS` array with your own experience and education

## Portfolio Sections 📱
- `/home` - Mission Control Dashboard
- `/projects` - Project Modules
- `/skills` - Skill Matrix
- `/timeline` - System Log (Career Journey)
- `/contact` - Contact Information

## License
This project is open-source and available for personal use.

---
Built with ❤️ by Mohomed Zaid Nasheem
