# Probable Invention — ADHD-Friendly APT Research Platform

> A comprehensive, accessible research platform for studying Advanced Persistent Threats (APTs), their source code, methods, and associations — designed with ADHD-friendly UX principles in mind.

---

## 🧠 About the Project

This project aims to build a website that makes deep cybersecurity research **accessible and engaging** for everyone, especially people with ADHD. Studying APT groups requires absorbing a massive amount of dense, interconnected information — malware families, tooling, TTPs (Tactics, Techniques & Procedures), target sectors, infrastructure, and attributed state actors. Traditional research tools and wikis can be overwhelming.

This platform will present all of that information in a **structured, visually clear, and hyperfocus-friendly** format, lowering the barrier to entry while supporting deep dives.

---

## 🎯 Project Goals

- **ADHD-Friendly Design**: Clean layouts, minimal clutter, strong visual hierarchy, colour-coded categories, and collapsible sections to reduce cognitive load.
- **Comprehensive APT Analysis**: Detailed profiles for each threat group covering:
  - Attribution & aliases
  - Known malware / tools & their source code (where publicly available)
  - Attack methods and TTPs (mapped to MITRE ATT&CK)
  - Infrastructure patterns
  - Historical campaigns and targets
  - Links between groups, shared tooling, and supply-chain connections
- **Source Code Study**: Where source code has been leaked or published (e.g., after law enforcement actions), provide annotated breakdowns to help researchers understand implementation techniques.
- **Relationship Mapping**: Visual graphs showing associations between APT groups, malware families, nation-state actors, and campaigns.
- **Searchable & Filterable**: Quickly find any group, tool, or technique without reading walls of text.

---

## 🔬 Starting Point: Equation Group

The first APT to be comprehensively covered will be **Equation Group**, widely attributed to the NSA's Tailored Access Operations (TAO) unit and considered one of the most sophisticated threat actors ever documented.

Coverage will include:

- **History & Attribution** — Discovery by Kaspersky Lab (2015), links to the NSA/TAO
- **Malware Arsenal**
  - `EQUATIONDRUG` / `EQUATIONLASER`
  - `FANNY` worm (USB propagation, predating Stuxnet's similar technique)
  - `GRAYFISH` — the HDD firmware implant
  - `DOUBLEFANTASY` / `TRIPLEFANTASY`
  - `EQUESTRE`
  - ShadowBrokers-leaked tools (EternalBlue, EternalRomance, DoublePulsar, etc.)
- **Techniques & TTPs** — Firmware persistence, air-gap crossing, zero-day exploitation
- **Source Code Analysis** — Annotated walkthrough of leaked/published code from the ShadowBrokers dump
- **Timeline of Operations** — Known campaigns from the late 1990s onward
- **Associations** — Links to Stuxnet (Operation Olympic Games), Flame, and other Five Eyes-adjacent tooling

---

## 🗺️ Roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Project setup, design system, ADHD UX research | 🔲 Planning |
| 2 | Equation Group full profile & source code study | 🔲 Planning |
| 3 | MITRE ATT&CK integration & TTP mapping | 🔲 Planning |
| 4 | Additional APT group profiles (APT28, APT29, Lazarus, etc.) | 🔲 Planning |
| 5 | Relationship graph / association visualiser | 🔲 Planning |
| 6 | Community contributions & open research notes | 🔲 Planning |

---

## 🛠️ Tech Stack *(Proposed — subject to discussion)*

- **Frontend**: TBD (React / Next.js / SvelteKit — to be decided)
- **Data**: Markdown / MDX content with structured frontmatter, or a headless CMS
- **Visualisation**: D3.js or Cytoscape.js for relationship graphs
- **Search**: Fuse.js or Meilisearch for fast full-text search
- **Design**: ADHD-focused design system (high contrast, readable fonts, minimal animation)

---

## 📚 Reference Sources

- [Kaspersky: Equation Group – Questions and Answers (2015)](https://securelist.com/equation-the-death-star-of-malware-galaxy/68750/)
- [MITRE ATT&CK](https://attack.mitre.org/)
- [ShadowBrokers Leak Archive](https://github.com/x0rz/EQGRP) *(third-party mirror — educational use)*
- [The NSA Playset](http://www.nsaplayset.org/)
- [Threat Intelligence reports from Mandiant, CrowdStrike, Recorded Future, and others]

---

## 🤝 Contributing

This project is in early planning. If you're interested in contributing — whether as a researcher, designer, developer, or writer — please open an issue or start a discussion. ADHD researchers especially welcome. 🙂

---

## ⚠️ Disclaimer

All content on this platform is for **educational and research purposes only**. Source code analysis is conducted on publicly available, leaked, or open-sourced material. No exploitation or offensive use is intended or condoned.

---

## 📝 License

TBD — will be decided before first public release.
