# Probable Invention — ADHD-Friendly APT Research Platform

> A comprehensive, accessible research platform for studying Advanced Persistent Threats (APTs), their source code, methods, and associations — designed with ADHD-friendly UX principles in mind.

---

## 🧠 About the Project

This project builds a website that makes deep cybersecurity research **accessible and engaging** for everyone — especially people with ADHD. Studying APT groups requires absorbing a massive amount of dense, interconnected information: malware families, tooling, TTPs (Tactics, Techniques & Procedures), target sectors, infrastructure, and attributed state actors. Traditional research tools and wikis can be overwhelming.

This platform will present all of that information in **multiple formats and learning modes** so you can engage with it in whatever way works for your brain — whether that's reading, scanning visuals, browsing timelines, or diving into raw code.

---

## 🎯 Project Goals

### ADHD-First Design
- Clean, minimal clutter with strong visual hierarchy
- Colour-coded categories and collapsible sections to reduce cognitive load
- **Multiple ways to consume every piece of information** — no single wall of text
- Hyperfocus-friendly deep dives alongside quick-scan summaries

### Comprehensive APT Analysis
Every threat group profile will cover:
- Attribution & all known aliases
- Full malware / tool inventory with source code (where publicly available)
- Attack methods and TTPs mapped to [MITRE ATT&CK](https://attack.mitre.org/)
- Infrastructure patterns and C2 methods
- Historical campaigns, targets, and timeline
- Cross-group links, shared tooling, and supply-chain connections

### Deep Source Code Study
For every APT with **publicly available source code** (leaked, dumped, or open-sourced):
- Full source code displayed inline with **line-by-line annotations**
- External links to original sources, mirrors, and academic analyses
- Breakdowns of key techniques (persistence, evasion, C2 comms, exfiltration)
- Side-by-side comparisons where tooling is shared between groups

### Multiple Content Formats
The same information is presented in several formats so different learning styles are supported:
| Format | What it gives you |
|--------|------------------|
| 📄 Written profiles | Full narrative context and analysis |
| 🕐 Interactive timelines | Visual history of campaigns and events |
| 🕸️ Relationship graphs | Visual maps of group/tool/nation-state associations |
| 💻 Annotated source code | Full code with inline explanations |
| 🔗 Reference links | Primary sources, threat intel reports, CVEs, papers |
| 📊 TTP tables | MITRE ATT&CK technique tables per group |
| 🗺️ Infrastructure maps | C2 patterns, hosting, and network indicators |

### Search & Discovery
- Full-text search across all groups, tools, and techniques
- Filter by: nation-state, sector targeted, technique, malware family, time period
- Tag-based navigation so you can follow a concept (e.g. "firmware persistence") across all groups

---

## 🔬 APT Coverage — Priority Order

We go deep on **all** groups, starting with those that have the most publicly available source code, since that enables the richest analysis.

### 1. Equation Group *(Start Here)*
Attributed to NSA/TAO. The most sophisticated threat actor publicly documented. The ShadowBrokers 2016–2017 leaks released a large body of actual tooling.

**Source code available**: ✅ ShadowBrokers dump (EternalBlue, EternalRomance, DoublePulsar, FUZZBUNCH framework, and more)

Coverage will include:
- **History & Attribution** — Discovery by Kaspersky Lab (2015), NSA/TAO links
- **Malware Arsenal**
  - `EQUATIONDRUG` / `EQUATIONLASER` / `EQUESTRE`
  - `FANNY` worm — USB propagation predating Stuxnet's technique
  - `GRAYFISH` — the HDD firmware implant (survives OS reinstall and formatting)
  - `DOUBLEFANTASY` / `TRIPLEFANTASY` — staged implant validators
  - `NOPEN` — full-featured Unix implant
  - `FUZZBUNCH` — internal exploitation framework (like Metasploit but proprietary)
  - EternalBlue / EternalRomance / DoublePulsar (SMB exploits later weaponised in WannaCry and NotPetya)
- **Techniques & TTPs** — Firmware persistence, air-gap crossing, zero-day exploitation, supply-chain interdiction (interdicting hardware shipments)
- **Full Annotated Source Code** — line-by-line walkthrough of the ShadowBrokers release
- **Timeline** — Operations from late 1990s through 2017 leak
- **Associations** — Stuxnet (Operation Olympic Games), Flame, Duqu, other Five Eyes tooling

---

### 2. Turla (Snake / Venomous Bear / Waterbug)
Attributed to FSB (Russian Federal Security Service). One of the longest-running and most technically advanced APT groups, active since at least 1996. Notable for using satellite internet hijacking for C2.

**Source code available**: ✅ Carbon framework (partial leak), Agent.BTZ/ComRAT variants, Kazuar, Snake rootkit components (public reversals + leaked samples)

Coverage will include:
- Agent.BTZ (the USB worm that infected US military networks in 2008 — Operation Buckshot Yankee)
- Carbon / Cobra Carbon framework
- Snake / Uroburos rootkit — kernel-level, extremely sophisticated
- Kazuar backdoor
- ComRAT v4 — uses Gmail web interface as a C2 channel
- HyperStack — peer-to-peer C2 over RPC
- Satellite C2 hijacking technique
- Waterbug / Venomous Bear / IRON HUNTER aliases

---

### 3. Fancy Bear / APT28 (Sofacy / Sednit / STRONTIUM / Pawn Storm)
Attributed to GRU Unit 26165 (Russian military intelligence). Known for the DNC hack (2016), Bundestag hack (2015), and dozens of high-profile operations.

**Source code available**: ✅ X-Agent (cross-platform implant — Windows, Linux, iOS), X-Tunnel, Sofacy/Sednit tools (partial), CHOPSTICK components

Coverage will include:
- X-Agent / Sofacy — full cross-platform implant, source partially public
- X-Tunnel — encrypted tunneling tool
- CHOPSTICK / CORESHELL — modular backdoors
- Zebrocy — Delphi/AutoIt/Go implant loader chain
- DNC/DCCC operation (2016) full breakdown
- Olympic Destroyer (shared infrastructure / false flag analysis)
- Connections to Sandworm (GRU Unit 74455) for shared TTPs

---

### Further Groups (Planned)
| Group | Attribution | Source Code | Priority |
|-------|------------|-------------|----------|
| Lazarus Group / HIDDEN COBRA | DPRK RGB | 🔶 Partial (WannaCry, Destover) | High |
| Cozy Bear / APT29 / NOBELIUM | SVR Russia | 🔶 Partial (SUNBURST, MiniDuke) | High |
| APT41 / Winnti / BARIUM | China MSS | 🔶 Partial (ShadowPad, PlugX) | Medium |
| Sandworm / BlackEnergy | GRU Unit 74455 | 🔶 Partial (BlackEnergy, Industroyer) | High |
| OilRig / APT34 | Iran MOIS | 🔶 Partial (GitHubLeaks 2019) | Medium |
| Comment Crew / APT1 | China PLA Unit 61398 | 🔴 Limited | Lower |

---

## 🗺️ Build Roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Research foundation: Equation Group full source code study + annotations | 🔲 Up next |
| 2 | Build two prototype frontends (Next.js and SvelteKit) — compare both | 🔲 Planning |
| 3 | Turla deep profile + annotated source code | 🔲 Planning |
| 4 | Fancy Bear / APT28 deep profile + annotated source code | 🔲 Planning |
| 5 | MITRE ATT&CK integration, TTP tables for all groups | 🔲 Planning |
| 6 | Relationship graph / association visualiser | 🔲 Planning |
| 7 | Interactive timelines per group | 🔲 Planning |
| 8 | Additional groups (Lazarus, Cozy Bear, Sandworm, etc.) | 🔲 Planning |
| 9 | Community contributions & open research notes | 🔲 Planning |

---

## 🛠️ Tech Approach

> **We're building two prototypes and picking the best one.**

### Why two?

There are two popular modern approaches to building a content-heavy website like this:

| | Next.js (React) | SvelteKit |
|-|----------------|-----------|
| **What it is** | A framework built on React (the most popular web library) | A newer, leaner framework — less code, faster by default |
| **Good for** | Huge ecosystem, lots of examples, easy to hire for | Simpler to write, better raw performance, less boilerplate |
| **Learning curve** | Higher | Lower |
| **Our plan** | Build a prototype | Build a prototype |

We'll build the same core page in both and see which feels better to work with and performs better for our content type. No commitment yet.

### Shared stack (both prototypes use this)
- **Content**: Markdown / MDX files with structured frontmatter for all APT profiles and source code annotations
- **Visualisation**: [Cytoscape.js](https://cytoscape.org/) for relationship graphs; custom D3.js for timelines
- **Search**: [Pagefind](https://pagefind.app/) (static, zero-config, works with both) or Meilisearch for richer filtering
- **Code display**: [Shiki](https://shiki.matsu.io/) for syntax-highlighted annotated code blocks
- **Design**: Custom ADHD-focused design system — high contrast, readable monospace, minimal animation, dark mode default

---

## 📚 Key Reference Sources

### Equation Group
- [Kaspersky: Equation Group – Questions and Answers (2015)](https://securelist.com/equation-the-death-star-of-malware-galaxy/68750/)
- [ShadowBrokers Leak Archive (x0rz mirror)](https://github.com/x0rz/EQGRP) *(educational use)*
- [NSA ANT Catalogue (Spiegel, 2013)](https://en.wikipedia.org/wiki/NSA_ANT_catalog)
- [EternalBlue CVE-2017-0144 analysis](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0144)

### Turla
- [ESET: Turla group's Gazer backdoor](https://www.welivesecurity.com/2017/08/30/eset-research-gazer-turla-espionage/)
- [Kaspersky: The Epic Turla Operation](https://securelist.com/the-epic-turla-operation/65545/)
- [ESET: Snake — a return to the wild](https://www.welivesecurity.com/en/eset-research/snake-coming-full-circle/)
- [US DoJ Snake malware disruption (2023)](https://www.justice.gov/opa/pr/justice-department-announces-court-authorized-disruption-snake-malware-network-operated)

### Fancy Bear / APT28
- [CrowdStrike: Bears in the Midst — intrusion into the DNC](https://www.crowdstrike.com/blog/bears-midst-intrusion-democratic-national-committee/)
- [ESET: Sednit (APT28) series](https://www.welivesecurity.com/tag/sednit/)
- [Mandiant APT28 report (2014)](https://www.mandiant.com/resources/reports)
- [X-Agent source code analysis](https://github.com/ESET/malware-ioc) *(ESET IoCs)*

### General
- [MITRE ATT&CK](https://attack.mitre.org/)
- [Threat Intelligence reports — Mandiant, CrowdStrike, Recorded Future, Secureworks, Volexity]
- [VirusTotal / MalwareBazaar for sample correlation]

---

## 🤝 Contributing

This project is in active early development. If you're interested in contributing — as a researcher, reverse engineer, designer, developer, or writer — open an issue or discussion. ADHD researchers especially welcome. 🙂

---

## ⚠️ Disclaimer

All content on this platform is for **educational and research purposes only**. Source code analysis covers only publicly available, leaked, or open-sourced material. No exploitation or offensive use is intended or condoned.

---

## 📝 License

TBD — will be decided before first public release.
