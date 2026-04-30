---
title: "ShadowBrokers Dump — Full Inventory & Context"
slug: shadowbrokers-dump
group: equation-group
tags: [shadowbrokers, dump, inventory, tools, 2017]
source_links:
  - https://github.com/x0rz/EQGRP
  - https://github.com/misterch0c/shadowbroker
---

# ShadowBrokers Dump — Full Inventory & Context

> Released April 14, 2017 ("Lost in Translation"), with earlier partial releases in August and October 2016.

---

## What Is the ShadowBrokers Dump?

The ShadowBrokers dump is a collection of **actual NSA offensive cyber tools** — exploitation frameworks, post-exploitation toolkits, implants, network device exploits, and operational scripts — released publicly by an anonymous group calling themselves "The Shadow Brokers".

This is not a collection of IOCs, signatures, or documentation. It is **working, production offensive tool code** — the actual software used to conduct NSA/TAO operations.

The significance is hard to overstate. No Western intelligence agency's offensive toolkit had ever been publicly released at this scale.

---

## Release History

| Date | Release Name | Contents |
|------|-------------|----------|
| Aug 13, 2016 | First release ("Equation Group Cyber Weapons") | Network device exploits — Cisco, Juniper, Fortinet |
| Oct 31, 2016 | "trickortreat" | Windows exploits, partial — FUZZBUNCH partial |
| Jan 7, 2017 | "Windows Warez" teaser | Claimed to have Windows tools, price: 750 BTC |
| Apr 8, 2017 | Password hint / teaser | Hinted at upcoming release |
| **Apr 14, 2017** | **"Lost in Translation"** | **Full tool release — EternalBlue, FUZZBUNCH, DanderSpritz, etc.** |

---

## Directory Structure of the April 2017 Release

```
windows/
├── exploits/
│   ├── ETERNALBLUE/          # MS17-010 — SMBv1 exploit
│   ├── ETERNALROMANCE/       # MS17-013 — SMBv1 exploit
│   ├── ETERNALCHAMPION/      # CVE-2017-0146 — SMBv1 exploit
│   ├── ETERNALSYNERGY/       # CVE-2017-0143 — SMBv1 exploit
│   ├── EXPLODINGCAN/         # CVE-2017-7269 — IIS 6.0 exploit
│   ├── EMERALDTHREAD/        # CVE-2010-2567 — SMBv1 exploit (older)
│   ├── ETERNALCHAMPION/
│   ├── ETRE/                 # SMB exploit (WebDAV / ERRATICGOPHER)
│   ├── EDUCATEDSCHOLAR/      # CVE-2009-3103 — SMBv2 exploit
│   ├── ECLIPSEDWING/         # CVE-2008-4250 — MS08-067 (old SMB)
│   └── EMPHASISMINE/         # IMAP exploit (remote)
├── implants/
│   ├── DOUBLEPULSAR/         # Kernel-mode backdoor / shellcode injector
│   ├── ODDJOB/               # IIS implant
│   ├── PEDDLECHEAP/          # Lightweight RAT
│   └── MOFCONFIG/            # WMI-based implant
├── payloads/
│   └── (shellcode payloads for use with above exploits)
└── tools/
    ├── FUZZBUNCH/            # Main exploitation framework
    └── DANDERSPRITZ/         # Post-exploitation framework

unix/
└── NOPEN/                    # Unix RAT

swift/
├── JEEPFLEA_MARKET/          # SWIFT browser exploitation scripts
├── JEEPFLEA_POWDER/          # SWIFT data extraction
└── (SWIFT operator credential harvesting tools)

network_devices/
├── EPICBANANA/               # Cisco ASA exploit (CVE-2016-6367)
├── EXTRABACON/               # Cisco ASA SNMP exploit (CVE-2016-6366)
├── ESCALATEPLOWMAN/          # Cisco IOS privilege escalation
├── JETPLOW/                  # Cisco IOS BIOS implant
├── BANANAGLEE/               # Cisco PIX/ASA implant
├── FEEDTROUGH/               # Juniper NetScreen implant (persistent)
└── BLATSTING/                # Juniper firewall implant
```

---

## Tool Summaries

### Windows Exploitation Framework

| Tool | Role | Notes |
|------|------|-------|
| [FUZZBUNCH](./fuzzbunch.md) | Main exploitation framework | NSA's internal "Metasploit" — plugin-based, targets Windows |
| [DanderSpritz](./danderspritz.md) | Post-exploitation | GUI-based, event log manipulation, data collection |

### Windows Exploits

| Tool | CVE | Target | Impact |
|------|-----|--------|--------|
| [EternalBlue](./eternalblue.md) | CVE-2017-0144 / MS17-010 | SMBv1 on all Windows versions | Remote code execution; used by WannaCry and NotPetya |
| EternalRomance | CVE-2017-0145 / MS17-013 | SMBv1 — Windows XP–Server 2008 | Remote code execution |
| EternalChampion | CVE-2017-0146 | SMBv1 | Remote code execution |
| EternalSynergy | CVE-2017-0143 | SMBv1 | Remote code execution |
| ExplodingCan | CVE-2017-7269 | IIS 6.0 (Windows Server 2003) | Remote code execution |
| EmeraldThread | CVE-2010-2567 | SMBv1 (older) | RCE — older Windows |
| EclipsedWing | CVE-2008-4250 (MS08-067) | SMBv1 | RCE — used against XP era |
| EducatedScholar | CVE-2009-3103 | SMBv2 | RCE — Vista/2008 |
| EmphasisMine | — | IMAP email servers | RCE via email server |

### Windows Implants

| Tool | Role | Notes |
|------|------|-------|
| [DoublePulsar](./doublepulsar.md) | Kernel-mode backdoor | Shellcode/DLL injector; planted by FUZZBUNCH exploits; used as delivery for WannaCry |
| OddJob | IIS implant | Hooks IIS worker process; memory-resident; no disk writes |
| PeddleCheap | Lightweight RAT | Simple backdoor, plugin-based |

### Unix Tools

| Tool | Role | Notes |
|------|------|-------|
| [NOPEN](./nopen.md) | Unix remote access tool | Full-featured RAT for Linux/Unix systems; used in long-term operations |

### Network Device Tools

| Tool | Target | CVE | Notes |
|------|--------|-----|-------|
| EXTRABACON | Cisco ASA | CVE-2016-6366 | SNMP-based RCE on Cisco firewalls |
| EPICBANANA | Cisco ASA | CVE-2016-6367 | CLI privilege escalation |
| ESCALATEPLOWMAN | Cisco IOS | — | Privilege escalation |
| JETPLOW | Cisco IOS | — | BIOS/firmware implant for Cisco routers; persists through reboots |
| BANANAGLEE | Cisco PIX/ASA | — | Persistent implant; restored by JETPLOW |
| FEEDTROUGH | Juniper NetScreen | — | Persistent implant that survives firmware upgrades |
| BLATSTING | Juniper firewalls | — | Backdoor implant |

See [Network Exploits](./network-exploits.md) for deep analysis.

### SWIFT Banking Tools

| Tool | Role | Notes |
|------|------|-------|
| JEEPFLEA_MARKET | SWIFT browser exploitation | Targets SWIFT terminal operators; harvests credentials and transaction data |
| JEEPFLEA_POWDER | SWIFT data extraction | Extracts SWIFT message archives |

See [SWIFT Tools](./swift-tools.md) for deep analysis.

---

## Verification and Authenticity

The tools were quickly verified as genuine by:

1. **Cisco** — Confirmed EXTRABACON (CVE-2016-6366) was a real, previously unknown vulnerability. Issued emergency patch.
2. **Juniper** — Confirmed FEEDTROUGH exploited previously unknown vulnerabilities in NetScreen devices.
3. **Microsoft** — Confirmed EternalBlue corresponded to MS17-010, which they had patched March 14, 2017 (a month before the dump).
4. **Independent researchers** — Tools ran as advertised; EternalBlue successfully exploited unpatched Windows machines.
5. **NSA employees** — Multiple former NSA employees privately confirmed the tools' authenticity to journalists.

---

## Who Leaked the Tools?

The identity of the Shadow Brokers has never been publicly confirmed. Leading theories:

### Theory 1: Russian Intelligence (most likely)
- The timing aligns with Russian geopolitical interests during the 2016 US election period
- The style of broken-English communiqués resembles known Russian intelligence disinformation operations
- Former NSA Director Michael Hayden: *"This was a warning shot at the US. 'Stop talking about our interference in the elections, or we release more.'"*
- Former NSA Deputy Director Rick Ledgett: Stated on the record that Russia was the most likely actor.
- The selective release of NSA tools — damaging enough to embarrass the US but not releasing the most sensitive SIGINT collection capabilities — suggests a calibrated state actor, not a lone hacker

### Theory 2: Insider Theft (possibly combined with Theory 1)
- The nature of the tools (operational scripts, framework configs, not just raw exploits) suggests someone with access to an NSA operator's workstation or staging server, not just a remote hack
- Harold T. Martin III (NSA contractor, arrested Aug 2016) was found to have hoarded large quantities of classified tools. He was not charged with connection to the Shadow Brokers but the overlap is suspicious.
- Edward Snowden's public analysis: the tools look like they were taken from a "staging server" — an intermediate system used during active operations, not from NSA HQ itself

### Theory 3: Lucky hack of an NSA C2 server
- NSA operated command-and-control infrastructure on compromised third-party servers
- A sophisticated adversary may have found and compromised one of these staging servers
- This would explain why the dump includes operational tools in a semi-staged state

---

## The Cascade Effect

The most consequential aspect of the dump was its downstream weaponisation:

```
April 14, 2017 — ShadowBrokers release EternalBlue publicly
     ↓
~April 2017 — Lazarus Group (DPRK) begins integrating EternalBlue
     ↓
May 12, 2017 — WannaCry global ransomware outbreak (~$4-8B damage)
              EternalBlue + DoublePulsar as propagation mechanism
              150+ countries, NHS, Telefónica, etc.
     ↓
~May 2017 — Sandworm (GRU Russia) integrates EternalBlue
     ↓
June 27, 2017 — NotPetya global destructive malware outbreak (~$10B damage)
               EternalBlue for lateral movement + MBR wiper
               Maersk, Merck, FedEx, Mondelēz destroyed
```

NSA tools built for intelligence collection were converted by nation-state adversaries into weapons of mass economic destruction within weeks.

---

## Accessing the Material

For research purposes, several mirrors and analysis repositories exist:

- **x0rz/EQGRP** (GitHub): `https://github.com/x0rz/EQGRP` — archived tool list, sanitised
- **misterch0c/shadowbroker** (GitHub): `https://github.com/misterch0c/shadowbroker` — FUZZBUNCH and exploits
- **Explodingcan PoC**: Multiple security researchers published proof-of-concept implementations for study

⚠️ **Important**: These tools contain working exploits against systems that may still be unpatched. All study should be conducted in isolated lab environments. Do not run against systems you do not own or have explicit written authorisation to test.
