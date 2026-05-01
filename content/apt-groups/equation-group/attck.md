---
title: "Equation Group — MITRE ATT&CK Matrix"
slug: equation-group
category: attck
mitre_group_id: G0020
mitre_group_url: "https://attack.mitre.org/groups/G0020/"
---

# Equation Group — MITRE ATT&CK Matrix

**MITRE Group ID**: [G0020](https://attack.mitre.org/groups/G0020/) · **ATT&CK v14**

> Equation Group's ATT&CK profile is distinguished by persistent presence in **Pre-OS Boot** (firmware implants predating LoJax by 10 years) and **Air-Gap** crossing — two capability areas with almost no other documented threat actors.

---

## Tactic Coverage

| Tactic | Techniques |
|--------|-----------|
| Reconnaissance | 1 |
| Initial Access | 3 |
| Execution | 3 |
| Persistence | 5 |
| Privilege Escalation | 2 |
| Defence Evasion | 6 |
| Credential Access | 2 |
| Discovery | 6 |
| Collection | 4 |
| Command and Control | 4 |
| Exfiltration | 3 |
| Impact | 1 |

---

## Reconnaissance

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | DoubleFantasy | Validator fingerprints OS, installed software, hardware before deciding whether to proceed |

---

## Initial Access

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1195.002](https://attack.mitre.org/techniques/T1195/002/) | Supply Chain Compromise: Software Supply Chain | Supply Chain TTP | NSA ANT catalogue documents interception of hardware during shipping; CD-ROM interdiction for EquationDrug delivery |
| [T1566.001](https://attack.mitre.org/techniques/T1566/001/) | Phishing: Spearphishing Attachment | DoubleFantasy, EquationDrug | Delivery via malicious Word/PDF documents with embedded exploits |
| [T1091](https://attack.mitre.org/techniques/T1091/) | Replication Through Removable Media | FANNY | Air-gap crossing via USB drives; FANNY propagates using LNK exploit CVE-2010-2568 |

---

## Execution

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1059.003](https://attack.mitre.org/techniques/T1059/003/) | Command and Scripting Interpreter: Windows Command Shell | EquationDrug | Remote shell execution; commands relayed through C2 |
| [T1203](https://attack.mitre.org/techniques/T1203/) | Exploitation for Client Execution | DoubleFantasy, EquationDrug | CVE-2010-2568 (LNK), CVE-2010-3338 (Task Scheduler) — both also used in Stuxnet |
| [T1053.005](https://attack.mitre.org/techniques/T1053/005/) | Scheduled Task/Job: Scheduled Task | EquationDrug | Persistence via Windows Scheduled Tasks for payload execution |

---

## Persistence

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1542.002](https://attack.mitre.org/techniques/T1542/002/) | Pre-OS Boot: Component Firmware | GRAYFISH | **Defining capability**: reprograms HDD firmware on Seagate, Western Digital, Maxtor, Samsung, Toshiba, IBM drives. Survives full disk wipe and OS reinstall. The first documented HDD firmware implant ever |
| [T1542.001](https://attack.mitre.org/techniques/T1542/001/) | Pre-OS Boot: System Firmware | GRAYFISH | BIOS-level persistence variant documented in NSA ANT Catalogue (SWAP module) |
| [T1547.001](https://attack.mitre.org/techniques/T1547/001/) | Boot/Logon Autostart: Registry Run Keys / Startup Folder | EquationDrug | Autorun registry keys for less sensitive targets where firmware implant not warranted |
| [T1053.005](https://attack.mitre.org/techniques/T1053/005/) | Scheduled Task/Job: Scheduled Task | EquationDrug | Scheduled task persistence for persistence redundancy |
| [T1543.003](https://attack.mitre.org/techniques/T1543/003/) | Create or Modify System Process: Windows Service | EquationDrug | Service installation for long-lived background execution |

---

## Privilege Escalation

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1068](https://attack.mitre.org/techniques/T1068/) | Exploitation for Privilege Escalation | GRAYFISH, EquationDrug | CVE-2010-3338 (Windows Task Scheduler EoP) shared with Stuxnet |
| [T1055](https://attack.mitre.org/techniques/T1055/) | Process Injection | EquationDrug | DLL injection into legitimate processes for privilege inheritance |

---

## Defence Evasion

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | EquationDrug | Plugins stored in encrypted virtual filesystem; GRAYFISH stores payloads in hidden HDD sectors |
| [T1014](https://attack.mitre.org/techniques/T1014/) | Rootkit | GRAYFISH | HDD firmware rootkit hides data in remapped sectors invisible to the OS; GRAYFISH also hides its registry keys |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | DoubleFantasy, EquationDrug | Secure deletion of temporary files; DoubleFantasy self-deletes if target validation fails |
| [T1070.004](https://attack.mitre.org/techniques/T1070/004/) | Indicator Removal: File Deletion | DoubleFantasy | Self-deletion on wrong target or after staging |
| [T1497](https://attack.mitre.org/techniques/T1497/) | Virtualization/Sandbox Evasion | DoubleFantasy, EquationDrug | VM/sandbox detection before executing; aborts if analysis environment detected |
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | EquationDrug | Malware components named to resemble legitimate Windows system files and services |

---

## Credential Access

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1056.001](https://attack.mitre.org/techniques/T1056/001/) | Input Capture: Keylogging | EquationDrug | Context-aware keylogging with application name recorded alongside keystrokes |
| [T1555](https://attack.mitre.org/techniques/T1555/) | Credentials from Password Stores | EquationDrug | Browser credential harvesting module |

---

## Discovery

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1082](https://attack.mitre.org/techniques/T1082/) | System Information Discovery | DoubleFantasy, FANNY | OS version, hardware profile, installed software — used for target validation decision |
| [T1016](https://attack.mitre.org/techniques/T1016/) | System Network Configuration Discovery | DoubleFantasy | ARP table, routing table, network interface enumeration |
| [T1057](https://attack.mitre.org/techniques/T1057/) | Process Discovery | DoubleFantasy, EquationDrug | Running process list used for target fingerprinting and injection target selection |
| [T1083](https://attack.mitre.org/techniques/T1083/) | File and Directory Discovery | DoubleFantasy, EquationDrug | Filesystem survey for target files; used by DoubleFantasy validator |
| [T1120](https://attack.mitre.org/techniques/T1120/) | Peripheral Device Discovery | FANNY | USB device enumeration for air-gap crossing; enumerates removable media |
| [T1518](https://attack.mitre.org/techniques/T1518/) | Software Discovery | DoubleFantasy | Installed software enumeration for target validation |

---

## Collection

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | EquationDrug, GRAYFISH | File exfiltration; GRAYFISH stores collected data in hidden HDD sectors until retrieval |
| [T1113](https://attack.mitre.org/techniques/T1113/) | Screen Capture | EquationDrug | Periodic screenshots; configurable trigger conditions |
| [T1074](https://attack.mitre.org/techniques/T1074/) | Data Staged | GRAYFISH | Collected data written to hidden HDD sectors; staged for out-of-band retrieval |
| [T1056.001](https://attack.mitre.org/techniques/T1056/001/) | Input Capture: Keylogging | EquationDrug | See Credential Access |

---

## Command and Control

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1071](https://attack.mitre.org/techniques/T1071/) | Application Layer Protocol | EquationDrug | HTTP/HTTPS C2 with custom encrypted protocol |
| [T1205](https://attack.mitre.org/techniques/T1205/) | Traffic Signaling | FANNY | Hidden data in USB volume labels and file timestamps used as covert signalling channel across air gaps |
| [T1573](https://attack.mitre.org/techniques/T1573/) | Encrypted Channel | EquationDrug | Custom XOR-based encryption for C2 traffic; changes per build |
| [T1104](https://attack.mitre.org/techniques/T1104/) | Multi-Stage Channels | EquationDrug | Modular plugin architecture; different modules handle different C2 functions |

---

## Exfiltration

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | EquationDrug, FANNY | Primary exfiltration path; encrypted within existing C2 session |
| [T1052.001](https://attack.mitre.org/techniques/T1052/001/) | Exfiltration Over Physical Medium: Exfiltration Over USB | FANNY | For air-gapped networks: data written to hidden USB areas, retrieved by FANNY on next media insertion |
| [T1030](https://attack.mitre.org/techniques/T1030/) | Data Transfer Size Limits | EquationDrug | Configurable upload size limits to avoid bandwidth-based detection |

---

## Impact

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1485](https://attack.mitre.org/techniques/T1485/) | Data Destruction | GRAYFISH | The HDD firmware implant can be triggered to destroy data stored in hidden sectors; full brick capability if ordered |

---

## Shared Techniques With Other Groups

Equation Group shares zero-day exploits with Stuxnet (US-Israel joint operation targeting Iranian nuclear programme), indicating coordination or common exploit development:

| Exploit | CVE | Shared With |
|---------|-----|------------|
| LNK file parsing | CVE-2010-2568 | Stuxnet |
| Windows Task Scheduler EoP | CVE-2010-3338 | Stuxnet |

This sharing of zero-days is one of the strongest pieces of evidence linking Equation Group to the US NSA and the broader Five Eyes intelligence infrastructure.

---

## ATT&CK Navigator Profile

The ATT&CK Navigator layer for this group is available at:
→ [https://attack.mitre.org/groups/G0020/](https://attack.mitre.org/groups/G0020/)

Select "ATT&CK Navigator Layers" → "Enterprise" to load the visual heatmap.
