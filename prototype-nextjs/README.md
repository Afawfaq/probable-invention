# APT Research Platform — Next.js Prototype

> Phase 2 prototype: Next.js 15 + TypeScript + Tailwind CSS  
> ADHD-friendly dark theme, structured navigation, Markdown content from `../content/`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Content

All content is read at build time from `../content/apt-groups/`. Each group directory contains:

- `overview.md` — Group profile and attribution
- `timeline.md` — Chronological operation history
- `references.md` — Annotated source list
- `malware/` — Individual malware/implant deep-dives
- `shadowbrokers-dump/` — Leaked tool analyses
- `ttps/` — MITRE ATT&CK technique breakdowns

## Architecture

- **`lib/content.ts`** — Server-side utilities to read and parse markdown files
- **`app/page.tsx`** — Homepage with group card grid
- **`app/groups/[slug]/layout.tsx`** — Sidebar layout for all group pages
- **`app/groups/[slug]/page.tsx`** — Group overview page
- **`app/groups/[slug]/[section]/[item]/page.tsx`** — Detail pages for malware, tools, and TTPs
- **`components/`** — Reusable UI primitives (Badge, GroupCard, Sidebar, MarkdownRenderer)
