---
title: "TTP: Air-Gap Crossing via Removable Media"
slug: air-gap-crossing
group: equation-group
category: ttp
mitre_technique: T1091
mitre_technique_name: "Replication Through Removable Media"
tags: [air-gap, usb, fanny, removable-media, isolated-network]
related_tools:
  - FANNY (Equation Group)
  - Agent.BTZ (Turla — triggered US response)
  - Stuxnet (US-Israel)
---

# TTP: Air-Gap Crossing via Removable Media

**MITRE ATT&CK**: [T1091 — Replication Through Removable Media](https://attack.mitre.org/techniques/T1091/)

---

## The Air-Gap Problem

An **air-gapped network** is physically isolated from all other networks. No wired connection, no WiFi, no Bluetooth — nothing. Used for:
- Nuclear facility control systems
- Military classified networks (SIPRNet, JWICS in the US; equivalent systems elsewhere)
- Industrial control systems at critical infrastructure
- High-security government workstations

The assumption: **"If there's no network connection, it can't be hacked remotely."**

This assumption is wrong. The attack vector is **human behaviour**. People carry USB drives, CDs, and laptops between connected and disconnected environments. Every time they do, they create a potential bridge.

---

## How Equation Group Crossed Air-Gaps: FANNY

See [FANNY](../malware/fanny.md) for full technical detail.

### The core mechanism

```
Phase 1: Infect the carrier
  USB drive → internet-connected machine
  .lnk exploit fires (CVE-2010-2568)
  FANNY installs on internet-connected machine
  FANNY infects the USB drive (hidden sector writes)
  
Phase 2: Carry the infection across the gap
  [Unknowing employee carries USB into air-gapped facility]
  USB plugged into air-gapped machine
  .lnk exploit fires on air-gapped machine
  FANNY installs, enumerates network, stores data in USB hidden area
  
Phase 3: Exfiltrate collected data
  [Employee carries USB back out]
  USB plugged back into internet-connected machine
  FANNY reads hidden area, sends data to NSA C2
  
Phase 4: Command injection (optional)
  Operator writes commands to USB hidden area
  [Employee carries USB in]
  FANNY on air-gapped machine reads commands, executes them
  Stores results in USB hidden area
  [Employee carries USB out]
  Operator reads results
```

The human is an **unwitting data mule** — they have no idea they're carrying intelligence between the two environments.

---

## The LNK Zero-Day — Why "Just Opening a Folder" Was Enough

The most important technical enabler for air-gap crossing was **CVE-2010-2568** (the `.lnk` parsing vulnerability).

Before autorun.inf was disabled (which happened progressively from Windows Vista onwards), USB malware had to rely on AutoRun — which required a user to click a dialog. CVE-2010-2568 bypassed that:

```
User opens USB drive in Windows Explorer
        ↓
Explorer renders the folder view
        ↓
Explorer tries to generate thumbnail for a .lnk file
        ↓
Windows Shell processes the .lnk file to render the thumbnail
        ↓
BUG: Malformed control panel .lnk causes arbitrary code execution
        ↓
Malware runs — no user click, no dialog, no warning
```

This made USB-based air-gap crossing dramatically easier. The user just had to **open the USB drive in Explorer** — a completely normal action.

---

## Historical Air-Gap Attack Examples

### Stuxnet (2009–2010)

The most famous air-gap attack. US-Israel operation targeting Iranian uranium enrichment centrifuges at the Natanz facility.

- Natanz was completely air-gapped — no internet connection
- Stuxnet spread via USB .lnk exploit (same zero-day as FANNY)
- Once inside, spread via SMB and other Windows vulnerabilities within the air-gapped network
- Targeted Siemens STEP 7 software (used to program centrifuge controllers)
- Modified centrifuge rotation speeds subtly while reporting normal status to operators
- Result: approximately 1,000 centrifuges destroyed over ~12–18 months
- Iran's nuclear program set back by an estimated 2+ years

Technical innovation: Stuxnet was the first malware to **physically destroy hardware** as its primary objective.

### Agent.BTZ (2008)

**Agent.BTZ** was a USB worm (attributed to Turla/Russia) that infected US military classified networks — including portions of CENTCOM and SIPRNET.

- Spread via USB drives in US military facilities in the Middle East (possibly Afghanistan)
- The infected USB drive was reportedly left in a parking lot near a US military base
- The infection spread to classified networks via soldiers who picked up the drives

This triggered **Operation Buckshot Yankee** — a 14-month effort to remove the worm from US military networks. It led directly to the Pentagon banning USB drives from military computers and to the establishment of **US Cyber Command** (USCYBERCOM) in 2009.

### NSA Interdiction (physical)

The NSA ANT Catalogue describes another air-gap crossing technique: **hardware interdiction** — intercepting hardware shipments (routers, servers, laptops) and physically installing implants before delivery to the target.

This doesn't require crossing an air-gap via malware — the device arrives at the air-gapped facility already compromised.

---

## Countermeasures

### Organisational controls

| Control | Effectiveness | Notes |
|---------|-------------|-------|
| Ban USB drives entirely | ✅ High | Operationally disruptive but effective |
| USB drive registry / approved devices only | ✅ High | Only allow specific hardware IDs |
| Data diodes | ✅ High | One-way data flow; physically impossible to exfiltrate |
| USB port blocking (physical epoxy/port blockers) | ✅ High | Physical prevention |
| Background checks / insider threat program | ⚠️ Medium | Doesn't prevent unknowing mules |
| Scan all USB drives on insertion | ⚠️ Medium | Known malware only; misses zero-days |

### Technical controls

| Control | Effectiveness | Notes |
|---------|-------------|-------|
| Disable AutoRun/AutoPlay | ✅ Good baseline | Standard since Vista SP2 |
| Patch .lnk handling (CVE-2010-2568) | ✅ Yes | Patched Aug 2010; but legacy systems may be unpatched |
| AppLocker / application whitelisting | ✅ High | Prevent execution of unknown binaries |
| Privileged Access Workstations (PAW) | ✅ High | Isolated systems for sensitive work |
| Read-only USB mode | ✅ High | Prevents malware from writing to USB (Phase 3 blocking) |

### Why countermeasures often fail in practice

Even organisations that implement USB bans face challenges:
1. **Operational exceptions** — "we need USB for software updates" — creates gaps
2. **Social engineering** — "I found this USB with your company name on it" (the parking lot attack)
3. **Supply chain** — compromised hardware before it arrives
4. **Insider threats** — employees bribed, coerced, or ideologically motivated
5. **Legacy systems** — air-gapped systems often run old, unpatched OS (patching is hard when there's no internet)

---

## Modern Air-Gap Techniques (Beyond USB)

Researchers have demonstrated increasingly exotic air-gap crossing techniques, showing that USB is just one method. These are largely theoretical/proof-of-concept but illustrate the problem space:

| Technique | Method | Demonstrated by |
|-----------|--------|----------------|
| **TEMPEST / electromagnetic** | Read screen emissions or CPU EM radiation from outside the building | Academic research; NSA TEMPEST program long-standing |
| **AirHopper** | Transmit data via FM radio signals from GPU, receive on mobile phone outside room | Ben-Gurion University |
| **Ultrasound** | Data via ultrasonic audio between machines with speakers/microphones | Ben-Gurion University |
| **PowerHammer** | Transmit data via power line electrical signals | Ben-Gurion University |
| **MAGNETO** | Transmit data via magnetic fields from CPU cores | Ben-Gurion University |
| **LED-it-GO** | HDD LED blinks encode data; optical receiver outside building | Ben-Gurion University |
| **CD/DVD** | Classic; used in Stuxnet-era before USB focus | Various |

Most of these require malware already on the air-gapped system (which is the hard part). They solve the **exfiltration** problem once you've already crossed the gap going in.

---

## References

- [Kaspersky: FANNY analysis](https://securelist.com/equation-the-death-star-of-malware-galaxy/68750/)
- [MITRE ATT&CK T1091](https://attack.mitre.org/techniques/T1091/)
- [NSA Stuxnet / Olympic Games — NYT reporting](https://www.nytimes.com/2012/06/01/world/middleeast/obama-ordered-wave-of-cyberattacks-against-iran.html)
- [Agent.BTZ / Operation Buckshot Yankee — Wired](https://www.wired.com/2010/11/buckshot-yankee/)
- [Ben-Gurion University: Air-gap research papers](https://cyber.bgu.ac.il/advanced-topics-in-cyber-security/airgap)
- [Cybersecurity & Infrastructure Security Agency (CISA): Removable Media guidance](https://www.cisa.gov/tips/st08-001)
