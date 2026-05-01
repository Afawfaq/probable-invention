# APT Research Platform — SvelteKit Prototype

> Phase 2 prototype: SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS v4  
> ADHD-friendly dark theme, structured navigation, Markdown content from `../content/`

## Getting Started

```bash
npm install
npm run dev     # development server
npm run build   # static build
npm run preview # preview static build
```

## Content

All content is read at build time from `../content/apt-groups/`. Each group directory contains:
- `overview.md` — Group profile and attribution
- `timeline.md` — Chronological operation history  
- `references.md` — Annotated source list
- `malware/` — Individual malware/implant deep-dives
- `shadowbrokers-dump/` — Leaked tool analyses
- `ttps/` — MITRE ATT&CK technique breakdowns

## Architecture

- **`src/lib/content.ts`** — Server-side utilities to read and parse markdown files
- **`src/routes/+page.svelte`** — Homepage with group card grid
- **`src/routes/groups/[slug]/+layout.svelte`** — Sidebar layout for all group pages
- **`src/routes/groups/[slug]/+page.svelte`** — Group overview page
- **`src/routes/groups/[slug]/[section]/[item]/+page.svelte`** — Detail pages
