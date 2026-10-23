# Adarsh Gupta — Modern Animated Portfolio


[![View Live Portfolio](https://img.shields.io/badge/View_Live_Portfolio-Open_Website-22c55e?style=for-the-badge)](https://adarsh-portfolio-yw1d.netlify.app)

**Live portfolio:** https://adarsh-portfolio-yw1d.netlify.app

> Contact form: EmailJS sends messages to the inbox configured in your EmailJS template. Configure the public environment variables below before deploying.

A single-page personal portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**, **Framer Motion** and **Prisma (SQLite)**. Light + dark themes, 30+ animation touchpoints, working contact form with database persistence.

![Stack](https://img.shields.io/badge/Next.js-16-black) ![TS](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38bdf8) ![Prisma](https://img.shields.io/badge/Prisma-SQLite-2D3748)

---

## ✨ Features

| Section | Highlights |
|---|---|
| **Hero** | Mouse-parallax layers, typewriter role text, live C# code window with line-by-line typing animation, floating .NET/React badges, shine-sweep buttons, animated stat counters, infinite tech marquee, handwritten annotations, scroll cue |
| **About** | Photo with floating chip, fact cards, scroll-reveal animations |
| **Skills** | Brand-tinted tech cards with shine sweep + animated proficiency bars, "also familiar with" sidebar |
| **Experience** | Scroll-driven timeline with progress line, travelling glow and pulse nodes |
| **Projects** | Image zoom on hover, gradient overlays, floating action chips, tags |
| **GitHub** | Profile card, animated counters, 26×7 contribution heatmap with staggered cell reveal, top repos |
| **Contact** | Working form → `/api/contact` API → Prisma + SQLite persistence, button state machine (idle/sending/sent), toast notifications |
| **Global** | Glass navbar with scrollspy + animated pill, dark/light theme toggle, top scroll-progress bar, cursor glow, back-to-top with progress ring, custom scrollbar |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** and **Bun** (recommended) or npm/pnpm/yarn
  - Install Bun: `curl -fsSL https://bun.sh/install | bash`

### 1. Install dependencies

```bash
bun install        # or: npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

The default `DATABASE_URL=file:../db/custom.db` resolves relative to `prisma/schema.prisma` (the `db/` folder is already included).

### 3. Create the database

```bash
bun run db:push    # or: npx prisma db push
```

### 4. Run the dev server

```bash
bun run dev        # or: npm run dev
```

Open **http://localhost:3000** in your browser.

### 5. Production build (optional)

```bash
bun run build && bun run start
```

---

## 🗂️ Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Page composition (all sections)
│   │   ├── layout.tsx                # Fonts, SEO metadata, ThemeProvider
│   │   ├── globals.css               # Theme tokens, keyframes, utilities
│   │   └── api/contact/route.ts      # Contact form API (zod validation)
│   ├── components/
│   │   ├── portfolio/                # ← All portfolio sections & effects
│   │   │   ├── navbar.tsx            # Glass navbar, scrollspy, mobile menu
│   │   │   ├── hero.tsx              # Animated hero + code window
│   │   │   ├── about.tsx  tech-stack.tsx  experience.tsx
│   │   │   ├── projects.tsx  github.tsx  contact.tsx  footer.tsx
│   │   │   ├── reveal.tsx            # Scroll-reveal wrappers
│   │   │   ├── typing-text.tsx  animated-counter.tsx  section-heading.tsx
│   │   │   ├── scroll-progress.tsx  cursor-glow.tsx  back-to-top.tsx
│   │   │   └── providers.tsx
│   │   └── ui/                       # shadcn/ui components
│   ├── lib/
│   │   ├── portfolio-data.ts         # ← ★ EDIT ALL YOUR CONTENT HERE
│   │   ├── db.ts                     # Prisma client singleton
│   │   └── utils.ts
│   └── hooks/
├── prisma/schema.prisma              # ContactMessage model
├── db/custom.db                      # SQLite database (auto-created)
├── public/
│   ├── portfolio/                    # Profile & project images
│   ├── resume.pdf                    # Downloadable resume
│   └── favicon.svg  logo.svg
└── scripts/generate_resume.py        # Resume PDF generator (reportlab)
```

---

## 🎨 Customization Guide

### Change your content (name, projects, links, stats)

Everything lives in **`src/lib/portfolio-data.ts`**:
- `NAV_LINKS` — navigation items
- `TECH_STACK` — skills with proficiency levels
- `TIMELINE` — education/experience entries
- `PROJECTS` — featured projects
- `TYPED_PHRASES` — hero typewriter phrases
- Social links, GitHub stats, contact info

### Change images

Replace files in `public/portfolio/` (`profile.png`, `project-*.png`) keeping the same names, or update paths in `portfolio-data.ts`.

### Change colors / theme

Theme tokens are defined in **`src/app/globals.css`** (CSS variables for light + dark). Brand orange: `#e8622c`, navy: `#1d2634`, cream: `#f5f2ec`.

### Update the resume

Edit `scripts/generate_resume.py` and run:

```bash
pip install reportlab && python scripts/generate_resume.py
```

---

## 🛠️ Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server on port 3000 |
| `bun run lint` | Run ESLint |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run db:push` | Push Prisma schema to SQLite |

## EmailJS contact form

1. Connect your email provider in the EmailJS dashboard and copy the Service ID.
2. Create an email template. Set **To Email** to your own inbox. Enable **Use Default Email Address** for **From Email**, set **From Name** to `{{name}}`, **Reply To** to `{{email}}`, and **Subject** to `{{subject}}`. Use `{{name}}`, `{{email}}`, `{{subject}}`, and `{{message}}` in the body. The form generates the subject from the sender name. Keep the recipient fixed in the template.
3. Copy the Template ID and your account Public Key.
4. Set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in `.env` locally and in Netlify environment variables (Builds scope). Never add a private key to these variables.
5. Add `https://adarsh-portfolio-yw1d.netlify.app` to EmailJS's allowed origins, if origin restrictions are enabled. Redeploy Netlify after configuring the variables.
6. Submit a test message from the live form and confirm inbox delivery. This form sends directly through EmailJS; the legacy `/api/contact` SQLite endpoint is unused.

EmailJS REST API documentation: https://www.emailjs.com/docs/rest-api/send/