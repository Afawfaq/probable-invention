---
title: "Turla — Russian FSB Cyber Espionage"
slug: turla
attribution: "Russian Federal Security Service (FSB), Centre 16"
nation_state: Russia
active_since: "~1996"
discovered: 2014
discovered_by: Kaspersky, BAE Systems, ESET
mitre_group_id: G0010
aliases:
  - Snake
  - Uroboros
  - Venomous Bear
  - Waterbug
  - WRAITH
  - Turla Team
  - Group 88
  - KRYPTON (CrowdStrike)
  - Iron Hunter (SecureWorks)
source_code_available: true
source_code_notes: "Snake/Uroboros kernel rootkit source leaked in 2014. ComRAT v3 source partially leaked. Various tool samples in public malware repositories."
tags: [turla, snake, russia, fsb, espionage, kernel-rootkit, satellite-c2, linux, macos, windows]
---

# Turla — Russian FSB Cyber Espionage

> The oldest continuously-active espionage group ever documented. Operational since at least 1996, Turla represents nearly three decades of uninterrupted intelligence collection by Russia's Federal Security Service.

---

## In One Paragraph

Turla (also known as Snake, Uroboros, and Venomous Bear) is an advanced persistent threat group attributed to the **Russian Federal Security Service (FSB), Centre 16** — the FSB's electronic intelligence division. Active since approximately **1996**, Turla is the longest continuously-documented cyber espionage operation in history. They are known for three signature capabilities: a **kernel-mode rootkit** (the Snake/Uroboros implant) that hides itself at the OS level, **satellite-based command-and-control** infrastructure that makes their network activity nearly impossible to trace, and an **email-based C2 channel** that works even in completely air-gapped environments. Their primary mission is intelligence collection against **Western governments, NATO nations, defence contractors, and diplomatic facilities**. Turla has compromised targets in over 45 countries.

---

## Attribution

### Who is FSB Centre 16?

The **Federal Security Service (FSB)** is Russia's domestic intelligence agency — the successor to the KGB (domestic operations). Centre 16, known formally as the **Centre for Information Security**, is the FSB's signals intelligence and cyber operations unit.

Centre 16 is distinct from:
- **GRU** (military intelligence) — responsible for Fancy Bear/APT28, Sandworm
- **SVR** (foreign intelligence) — responsible for Cozy Bear/APT29

FSB/Centre 16 is responsible for:
- **Turla/Snake** — long-term strategic espionage against Western targets
- **Gamaredon** — lower-sophistication operations against Ukraine

### Evidence for FSB attribution

1. **Technical overlaps**: Code from Turla samples overlaps with technical artifacts attributed to FSB in signals intelligence disclosures
2. **Targeting patterns**: Turla focuses on NATO governments, diplomatic targets, and defence contractors — consistent with FSB foreign intelligence interests
3. **Agent.BTZ origin**: The Agent.BTZ USB worm (2008) that infected US military networks, attributed to Turla/FSB, directly preceded the establishment of US Cyber Command
4. **ENISA / UK NCSC attribution**: Multiple Western intelligence agencies have formally attributed Turla to the Russian government
5. **2018 US government attribution**: The US Department of Justice, in a separate but related case, publicly attributed specific operations to FSB Centre 16

---

## Targets

Turla focuses on **long-term strategic intelligence collection** — they are patient, persistent operators who prioritise access over speed.

Primary target categories:
- **Western governments** — Foreign ministries, defence ministries, prime minister/president offices in Europe and the US
- **NATO member states** — Particular focus on Eastern European NATO members (Poland, Czech Republic, Baltic states)
- **Diplomatic missions** — Embassies and consulates in Moscow and worldwide
- **Defence contractors** — Companies with classified government contracts
- **Energy sector** — Major oil and gas companies, particularly in Central Asia and the Caspian region
- **Academic and research institutions** — Universities with defence-related research
- **Media organisations** — Particularly in conflict zones

Countries with confirmed Turla victims (from Kaspersky, ESET, BAE research):
Europe (Germany, France, UK, Poland, Ukraine, Czech Republic, Romania, Hungary), USA, Middle East (Saudi Arabia, Iraq, Iran), Central Asia (Kazakhstan, Uzbekistan, Afghanistan), and others — 45+ countries total.

---

## Why Turla Is Special

Four capabilities separate Turla from almost all other threat actors:

### 1. Continuous operation since 1996

The **Moonlight Maze** intrusions (1996–1998) into US government, military, and academic networks are now attributed to the same FSB Centre 16 unit that became Turla. This represents an unbroken 28-year operational history. The same *organisation* has been conducting cyber espionage since before most current security professionals began their careers.

### 2. Kernel-mode rootkit (Snake/Uroboros)

Snake/Uroboros is one of the most sophisticated Windows kernel rootkits ever documented. It:
- Operates entirely in Ring 0 (kernel privilege)
- Patches the kernel to hide its own processes, files, and network connections
- Has a complete encrypted peer-to-peer network (P2P) between infected machines within a target organisation
- Survived 15+ years of continuous development (2003–2018+)
- Multiple Windows versions, including a Linux variant

The source code was partially leaked in 2014, revealing a professional, well-structured C++ codebase with internal error handling, debug logging, and version control artifacts.

### 3. Satellite-based C2 infrastructure

Turla pioneered the use of **satellite internet links** as command-and-control infrastructure. Commercial satellite providers offer "downstream only" broadcast data services. Turla:
- Intercepts legitimate satellite internet traffic (DVB-S standard)
- Injects covert data into the downlink stream by spoofing packet sources
- The implant receives commands from what appears to be legitimate satellite traffic
- Attribution is nearly impossible: the operator could be *anywhere on Earth* within the satellite's footprint

This is documented in Kaspersky's 2015 analysis and represents a level of operational security sophistication far beyond typical threat actors.

### 4. Email-based C2 (post-2018)

When target networks began blocking outbound internet traffic more aggressively, Turla adapted by building a **C2 channel that uses email**:
- The implant sends data as email attachments to attacker-controlled inboxes
- Operators send commands embedded in email content
- Turla has specifically used **exfiltrated email accounts** from compromised organisations as the communication channel — using the victim's own email infrastructure against them

---

## The Moonlight Maze Connection (1996–1999)

**Moonlight Maze** was a series of intrusions into US Department of Defense, NASA, Energy Department, and university systems in 1996–1998. It was the US government's first publicly-acknowledged nation-state cyberattack.

A 2017 joint investigation by Kaspersky and King's College London analysed artefacts from the original Moonlight Maze intrusions (preserved on a legacy Unix system from the period) and compared them to modern Turla Linux tools. The conclusion:

> "The same group that conducted Moonlight Maze in the late 1990s is operating today as Turla. The LOKI2 tunnelling tool, the ASPIS rootkit framework, and associated infrastructure scripts share code and techniques with modern Penquin Turla Linux implants."

This provides continuity evidence — the same FSB unit, continuously operational for 28+ years.

---

## Platform Coverage

Unlike many APT groups that focus exclusively on Windows, Turla has developed full-capability implants for:

- **Windows**: Snake (kernel rootkit), ComRAT (RAT), Carbon (modular platform), Kazuar (.NET), various backdoors
- **Linux**: Penquin Turla, TINYTURLA-NG
- **macOS**: MacMa (documented by ESET 2022)
- **Routers and network devices**: Turla's "Waterbug" cluster has compromised router firmware for persistent access and lateral movement
- **Web servers (IIS, Apache)**: Turla has deployed web server backdoors that intercept specific HTTP requests — the server appears to function normally while Turla's implant silently receives commands embedded in HTTP headers

---

## Key Operations

| Operation | Year | Target | Notes |
|-----------|------|--------|-------|
| Moonlight Maze | 1996–1998 | US DoD, NASA, universities | First documented nation-state cyber espionage campaign against the US |
| Agent.BTZ | 2008 | US military (CENTCOM, classified networks) | USB worm; triggered Operation Buckshot Yankee; led to creation of US Cyber Command |
| Snake campaign | 2010–present | NATO governments, Ukraine | Kernel rootkit; ongoing |
| Satellite C2 campaign | 2014–2015 | Middle East, Africa, Central Asia | Satellite downlink hijacking for C2 |
| RUAG breach | 2014 | Swiss defence company | 23GB of data exfiltrated via Snake |
| German Bundestag | 2017 | German parliament (Bundestag IT) | Attributed to Turla; data exfiltrated over months |
| Firefox C2 variant | 2019 | Government targets (Europe) | C2 channel hidden in Firefox extension |
| ComRAT v4 campaign | 2020 | Foreign ministries, parliaments | Updated email-based C2; documented by ESET |
| TinyTurla | 2021 | US, Germany, Afghanistan | Simple backdoor deployed alongside Snake |
| ANDROMEDA hijack | 2022 | Ukraine targets | Turla hijacked criminal botnet (ANDROMEDA) infrastructure to deliver their own tools |

---

## References

- [Kaspersky: Turla / Snake — the world's most sophisticated APT (2014)](https://securelist.com/the-snake-campaign/)
- [BAE Systems: Snake Campaign and Cyber Espionage Toolkit (2014)](https://artemonsecurity.com/snake_whitepaper.pdf)
- [ESET: Turla LightNeuron (2019)](https://www.welivesecurity.com/2019/05/29/turla-lightneuron-one-same/)
- [ESET: ComRAT v4 (2020)](https://www.welivesecurity.com/2020/05/26/agentbtz-comratv4-ten-year-journey/)
- [Kaspersky: Moonlight Maze — the Untold Story (2017)](https://securelist.com/the-penquin-turla-2/77150/)
- [MITRE ATT&CK: Turla (G0010)](https://attack.mitre.org/groups/G0010/)
- [UK NCSC: Advisory on Turla (2023)](https://www.ncsc.gov.uk/news/turla-new-backdoor-targeting-ukraine)
