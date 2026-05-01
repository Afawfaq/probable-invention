---
title: "Turla — Operational Timeline"
slug: turla
category: timeline
---

# Turla — Operational Timeline

> Nearly three decades of continuous FSB cyber espionage operations, documented from multiple angles.

---

## 1996–1999: Moonlight Maze — The Beginning

### 1996
- First intrusions into US government networks identified. Attackers targeted:
  - US Department of Defense (Pentagon networks)
  - NASA research networks
  - Department of Energy national laboratories
  - Multiple US universities with defence research contracts
- Attack methodology: Exploitation of vulnerable Unix Sendmail and PHF CGI scripts; password theft; lateral movement via stolen credentials
- Technical tools: LOKI2 tunnelling tool (covert data channel over ICMP), ASPIS Unix rootkit

### 1998
- US Air Force Information Warfare Center (AFIWC) formally names the operation **Moonlight Maze** — the first publicly-acknowledged US government investigation of state-sponsored cyber espionage
- FBI and Department of Defense investigation begins
- Attackers traced to IP addresses in Moscow; diplomatic démarches to Russia — denied

### 1999
- After increased scrutiny, Moonlight Maze intrusions reduce in frequency but don't stop entirely
- US begins building the intelligence picture that will eventually become "attribution to Russia"

---

## 2003–2008: Snake Development Era

### ~2003
- Development of the **Snake/Uroboros** kernel rootkit begins (based on compilation timestamps and code analysis)
- Early Snake variants target Windows XP; ring-0 driver architecture

### 2005–2007
- Snake deployed against targets in former Soviet states and Eastern Europe
- First peer-to-peer networking capability added to Snake — infected machines form a covert P2P mesh network within target organisations

### 2008 — Agent.BTZ: The Operation That Changed Everything

**August 2008**: A USB flash drive, believed to have been deliberately left in a parking lot at a US military installation in the Middle East (possibly Afghanistan), is picked up by a US service member and plugged into a military laptop.

The USB drive contains **Agent.BTZ** — a Turla USB worm that:
- Exploits Windows AutoRun to execute when the USB is inserted
- Creates hidden files on every USB drive it encounters
- Spreads via infected USB drives to any machine they're inserted into
- Establishes a C2 channel using DNS queries (covert DNS tunnelling)
- Exfiltrates data to Turla infrastructure

The worm spreads across US military networks in the Middle East, eventually reaching **SIPRNet** (the US Secret Internet Protocol Router Network — the classified military intranet).

**Timeline of consequences**:
- November 2008: USAF identifies the infection; classified as the "most significant breach of US military computers ever" at the time
- November 2008 — December 2009: **Operation Buckshot Yankee** — 14-month US military operation to eradicate Agent.BTZ from all classified and unclassified military networks
- 2009: US Deputy Defense Secretary William Lynn publicly acknowledges the breach (only after operation was complete)
- 2009: **US Cyber Command (USCYBERCOM)** established in direct response to the Agent.BTZ incident
- 2011: USB drives banned from US military systems

**The parking lot delivery**: Security researchers believe the USB drive was deliberately placed — a classic intelligence tradecraft technique known as a "USB drop attack". Russia exploited a fundamental human behaviour: people are curious and pick up found objects.

---

## 2010–2014: Snake Matures, Kaspersky Begins Tracking

### 2010–2012
- Snake/Uroboros reaches its mature form:
  - Full kernel rootkit with hidden P2P networking
  - Encrypted virtual filesystem hidden on disk
  - Sophisticated anti-analysis techniques
- Deployments across NATO government targets in Western Europe

### 2013 — RUAG Breach Begins
- Swiss defence and aerospace company **RUAG** is compromised via Snake
- The breach goes undetected for approximately 2 years
- RUAG produces military technology and provides services to the Swiss government

### 2014 — Source Code Leak and Public Attribution

**January 2014**: G Data (German security firm) publishes first detailed technical analysis of the **Uroboros rootkit** with code samples. This triggers a cascade of public research.

**March 2014**: BAE Systems and Kaspersky jointly publish a comprehensive analysis of the **Snake campaign**, formally attributing it to Russia:
- Multiple samples analysed: Windows Snake, Linux Snake, and Snake's virtual filesystem format
- The **source code** of Snake/Uroboros is partially leaked (the original source repo was apparently accessible briefly)
- Code quality analysis reveals a professional development team with internal naming conventions ("Uroboros" — the snake eating its own tail), version history, and structured error handling
- Kaspersky attributes to Russia based on language analysis (Russian error messages in debug strings), targeting patterns, and infrastructure overlaps

**May 2014**: Kaspersky publishes analysis of **Turla satellite C2 infrastructure**:
- Attackers using commercial DVB-S satellite internet downlinks to receive C2 communications
- Commands injected into legitimate satellite traffic; recipients anywhere in the satellite footprint could be the operator
- First documented nation-state use of satellite-based C2

---

## 2015–2017: The RUAG Exposure and Continued Expansion

### 2015 — RUAG Breach Exposed
- Swiss federal authorities publicly confirm the **RUAG breach**:
  - Duration: ~2 years undetected
  - Data exfiltrated: **23 GB** (including sensitive military and government information)
  - Method: Snake rootkit with encrypted P2P networking between infected RUAG machines
  - Attribution: Russia / Turla

### 2016
- ESET discovers **Gazer** (aka WhiteBear) — a second-stage backdoor used by Turla targeting diplomatic embassies
- **LightNeuron** development begins — the email server backdoor (targeting Microsoft Exchange)

### 2017 — Moonlight Maze Continuity Confirmed
- **Kaspersky + King's College London** publish the Moonlight Maze retrospective paper:
  - Acquired original Unix system from a 1998 victim (preserved as evidence)
  - Direct code comparison between 1998 Moonlight Maze tools and 2017 Penquin Turla Linux implants
  - Conclusion: "Turla and Moonlight Maze are the same group"
  - This establishes Turla as an unbroken operation since 1996

- **German Bundestag** (parliament) breach attributed to Turla:
  - Attack via spearphishing in 2017
  - Internal network access achieved; data exfiltration via Snake
  - German domestic intelligence (BfV) publicly attributs to Russia

---

## 2018–2020: New Channels, New Tools

### 2019 — LightNeuron: The Email Server Backdoor
- ESET publishes analysis of **LightNeuron** (aka TurlaLightNeuron):
  - A **mail transfer agent (MTA) backdoor** — installed directly into Microsoft Exchange transport agents
  - Intercepts all incoming and outgoing email on the compromised mail server
  - Commands received via **PDF and JPEG attachments** with steganographically-embedded instructions
  - Exfiltrates data by injecting content into legitimate outgoing emails
  - This is a fundamentally different C2 approach: uses the target's own mail infrastructure

- **Firefox C2 extension**: Turla deploys a modified Firefox browser extension that uses Instagram comments as C2 — posts by a Britney Spears fan account contain steganographically-encoded C2 URLs. Documented by ESET.

### 2020 — ComRAT v4: 20 Years of Continuous Development
- ESET publishes comprehensive analysis of **ComRAT v4** (aka Agent.BTZ v4):
  - ComRAT is the direct evolution of Agent.BTZ (2008)
  - v4 features a complete email-based C2 channel (uses Gmail web interface via HTTPS)
  - The implant logs into a Gmail account using a specific cookie — **no password transmitted**, no standard email protocol — and reads new emails in a designated folder for commands
  - Exfiltrates data by uploading attachments to Gmail drafts
  - Virtual filesystem encrypted within itself
  - Over 20 years of continuous development documented

---

## 2021–Present: TinyTurla, ANDROMEDA Hijack, Ukraine

### 2021 — TinyTurla
- Cisco Talos discovers **TinyTurla** — a lightweight simple backdoor deployed alongside Snake on high-value targets
- Purpose: Secondary access mechanism; if Snake is detected and removed, TinyTurla provides continued access
- Targeted US, Germany, and Afghanistan government systems
- Extremely simple by Turla standards: basic HTTP C2, minimal footprint

### 2022 — Turla Hijacks Criminal Botnet
- One of the most audacious documented operations:
  - Turla takes over infrastructure belonging to the **ANDROMEDA botnet** — a long-running criminal malware distribution network
  - By registering expired ANDROMEDA domains, Turla can push their own payload to machines already infected with ANDROMEDA
  - In effect: Turla piggybacked on criminal infrastructure to identify and selectively infect high-value targets in Ukraine
  - Mandiant reports this as "Turla using criminal infrastructure as a delivery mechanism"

### 2022 — MacMa (macOS)
- ESET documents **MacMa** — Turla's macOS backdoor:
  - Full-featured RAT for macOS
  - Keylogging, file collection, screen capture, microphone access
  - Demonstrates Turla's cross-platform capabilities extending to Apple systems

### 2023 — UK NCSC Advisory on Ukraine Targeting
- UK National Cyber Security Centre and partners issue advisory on Turla's new **TinyTurla-NG** backdoor
- Targets Ukrainian NGOs and government entities
- Demonstrates continued active operations during the Russia-Ukraine war

---

## Summary of Development Arc

| Era | Capability focus | Signature tool |
|-----|-----------------|----------------|
| 1996–1999 | Unix exploitation, credential theft | LOKI2, ASPIS |
| 2003–2010 | Windows kernel rootkit, P2P networking | Snake/Uroboros |
| 2008 | USB air-gap crossing | Agent.BTZ |
| 2010–2014 | Satellite C2, mature Snake platform | Snake v3+ |
| 2015–2018 | Email server backdoors, diplomatic targeting | LightNeuron, Gazer |
| 2018–2020 | Social media C2, updated comms channels | Instagram C2, ComRAT v4 |
| 2021–present | Lightweight parallel tools, botnet hijacking | TinyTurla, TinyTurla-NG |
