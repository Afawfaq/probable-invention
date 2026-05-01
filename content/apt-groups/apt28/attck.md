---
title: "APT28 — MITRE ATT&CK Matrix"
slug: apt28
category: attck
mitre_group_id: G0007
mitre_group_url: "https://attack.mitre.org/groups/G0007/"
---

# APT28 — MITRE ATT&CK Matrix

**MITRE Group ID**: [G0007](https://attack.mitre.org/groups/G0007/) · **ATT&CK v14**

> APT28 holds the record for ATT&CK technique breadth among all documented nation-state actors. Their defining characteristics: **Spearphishing at industrial scale**, the first **UEFI rootkit** in the wild, a genuinely **cross-platform implant** (5 operating systems), and the pioneering of **hack-and-leak information operations**.

---

## Tactic Coverage

| Tactic | Techniques |
|--------|-----------|
| Reconnaissance | 4 |
| Resource Development | 3 |
| Initial Access | 4 |
| Execution | 5 |
| Persistence | 8 |
| Privilege Escalation | 3 |
| Defence Evasion | 7 |
| Credential Access | 6 |
| Discovery | 7 |
| Lateral Movement | 3 |
| Collection | 6 |
| Command and Control | 7 |
| Exfiltration | 3 |
| Impact | 1 |

---

## Reconnaissance

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1589.001](https://attack.mitre.org/techniques/T1589/001/) | Gather Victim Identity Information: Credentials | Spearphishing infra | Acquired credentials from LinkedIn, previous breaches, and open-source data to personalise phishing |
| [T1589.002](https://attack.mitre.org/techniques/T1589/002/) | Gather Victim Identity Information: Email Addresses | Spearphishing infra | Harvested email addresses from conference attendee lists, websites, leaked databases (AP found 4,700+ targeted individuals) |
| [T1593](https://attack.mitre.org/techniques/T1593/) | Search Open Websites/Domains | APT28 operators | OSINT collection on targets before crafting personalised spearphishing lures |
| [T1598.003](https://attack.mitre.org/techniques/T1598/003/) | Phishing for Information: Spearphishing Link | Credential harvesting | Core collection technique: Bitly-shortened links to fake credential-harvesting login pages |

---

## Resource Development

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1583.001](https://attack.mitre.org/techniques/T1583/001/) | Acquire Infrastructure: Domains | APT28 infra | Registered hundreds of typosquatted domains: `accounts-google.com`, `login-microsoftonline.net`, etc. |
| [T1584.001](https://attack.mitre.org/techniques/T1584/001/) | Compromise Infrastructure: Domains | APT28 (XTunnel relay) | Compromised third-party servers used as relay nodes for XTunnel hops |
| [T1586.002](https://attack.mitre.org/techniques/T1586/002/) | Compromise Accounts: Email Accounts | Guccifer 2.0, DC Leaks | Created fake online personas (Guccifer 2.0, CyberCaliphate) for leak operations |

---

## Initial Access

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1566.001](https://attack.mitre.org/techniques/T1566/001/) | Phishing: Spearphishing Attachment | Sofacy | Malicious Word/RTF/PDF documents deliver Sofacy dropper via CVE-2014-1761 (Operation RussianDoll) |
| [T1566.002](https://attack.mitre.org/techniques/T1566/002/) | Phishing: Spearphishing Link | Credential harvesting, Sofacy | Bitly and Google-themed phishing links to fake login pages and exploit landing pages |
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | APT28 (post-credential harvest) | After harvesting credentials via phishing, operators log into victim accounts directly — no malware needed |
| [T1190](https://attack.mitre.org/techniques/T1190/) | Exploit Public-Facing Application | APT28 | CVE-2014-0515 (Adobe Flash zero-day) used in Operation RussianDoll; VPN and webmail portal exploitation |

---

## Execution

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1059.001](https://attack.mitre.org/techniques/T1059/001/) | Command and Scripting Interpreter: PowerShell | Sofacy, Zebrocy | PowerShell execution cradles in Sofacy delivery; Zebrocy uses PowerShell for staging |
| [T1059.003](https://attack.mitre.org/techniques/T1059/003/) | Command and Scripting Interpreter: Windows Command Shell | X-Agent, Sofacy | Remote shell via X-Agent C2; Sofacy drops and executes payloads via CMD |
| [T1059.006](https://attack.mitre.org/techniques/T1059/006/) | Command and Scripting Interpreter: Python | Zebrocy | Zebrocy Python variant compiled with PyInstaller — Python interpreter bundled in exe |
| [T1203](https://attack.mitre.org/techniques/T1203/) | Exploitation for Client Execution | Sofacy | CVE-2014-1761 (Word), CVE-2014-0515 (Flash), CVE-2015-1701 (Windows kernel) |
| [T1569.002](https://attack.mitre.org/techniques/T1569/002/) | System Services: Service Execution | X-Agent, Sofacy | Windows service creation for persistent execution of implants |

---

## Persistence

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1542.001](https://attack.mitre.org/techniques/T1542/001/) | Pre-OS Boot: System Firmware | LoJax | **Historic first**: first UEFI rootkit ever deployed in the wild (2018). Survives OS reinstall, disk replacement, factory reset |
| [T1547.001](https://attack.mitre.org/techniques/T1547/001/) | Boot/Logon Autostart: Registry Run Keys / Startup Folder | X-Agent, Sofacy | Registry HKCU/HKLM Run keys with names mimicking Windows Update and security services |
| [T1543.003](https://attack.mitre.org/techniques/T1543/003/) | Create or Modify System Process: Windows Service | X-Agent | Registered as "Microsoft Security Center (2.0) Service" — deliberately mimics legitimate service name |
| [T1053.005](https://attack.mitre.org/techniques/T1053/005/) | Scheduled Task/Job: Scheduled Task | Sofacy, X-Agent | Scheduled tasks as backup persistence alongside registry run keys |
| [T1136](https://attack.mitre.org/techniques/T1136/) | Create Account | APT28 (DNC op) | Created new user accounts on compromised servers for persistent re-access |
| [T1037](https://attack.mitre.org/techniques/T1037/) | Boot or Logon Initialization Scripts | X-Agent Linux | Linux startup scripts (rc.local, systemd service files) for Fysbis/X-Agent Linux persistence |
| [T1176](https://attack.mitre.org/techniques/T1176/) | Browser Extensions | APT28 | Documented use of malicious browser extensions for credential theft on certain targets |
| [T1505.003](https://attack.mitre.org/techniques/T1505/003/) | Server Software Component: Web Shell | APT28 (DNC) | Web shells deployed on DNC/DCCC servers for persistent access alongside X-Agent |

---

## Privilege Escalation

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1055](https://attack.mitre.org/techniques/T1055/) | Process Injection | X-Agent | DLL injection into svchost.exe and explorer.exe for privilege inheritance and stealth |
| [T1068](https://attack.mitre.org/techniques/T1068/) | Exploitation for Privilege Escalation | Sofacy, LoJax | CVE-2015-1701 (Windows kernel); requires admin/SYSTEM for UEFI write operations |
| [T1134](https://attack.mitre.org/techniques/T1134/) | Access Token Manipulation | APT28 | Token impersonation for privileged resource access |

---

## Defence Evasion

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | X-Agent, Sofacy, Zebrocy | Custom XOR encryption for X-Agent; base64+XOR for Sofacy; multiple language obfuscation in Zebrocy variants |
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | X-Agent, Sofacy | Service names mimic legitimate Windows services; X-Agent executable paths mimic system files |
| [T1055](https://attack.mitre.org/techniques/T1055/) | Process Injection | X-Agent | Injection into trusted processes; X-Agent traffic appears as svchost.exe network activity |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Sofacy, X-Agent | Cleaning of artefacts on disk; LoJax's firmware persistence makes OS-level indicator removal irrelevant |
| [T1140](https://attack.mitre.org/techniques/T1140/) | Deobfuscate/Decode Files or Information | Sofacy | Encrypted second-stage payload decrypted in memory; key stored in C2 response |
| [T1497](https://attack.mitre.org/techniques/T1497/) | Virtualization/Sandbox Evasion | Sofacy | C2-side payload filtering: sends victim fingerprint first; operator decides whether to deliver payload to this host |
| [T1078](https://attack.mitre.org/techniques/T1078/) | Valid Accounts | APT28 | Using legitimately harvested credentials avoids malware-based detection entirely |

---

## Credential Access

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1056.001](https://attack.mitre.org/techniques/T1056/001/) | Input Capture: Keylogging | X-Agent | Context-aware keylogging across all 5 platforms; records application context alongside keystrokes |
| [T1539](https://attack.mitre.org/techniques/T1539/) | Steal Web Session Cookie | APT28 | Browser cookie theft for session hijacking on email and cloud services |
| [T1528](https://attack.mitre.org/techniques/T1528/) | Steal Application Access Token | APT28 (OAuth attacks) | **OAuth token theft**: tricks victims into granting app permissions; token bypasses passwords and 2FA entirely |
| [T1110.001](https://attack.mitre.org/techniques/T1110/001/) | Brute Force: Password Guessing | APT28 infra | Password spraying against Outlook Web Access and VPN portals of targeted organisations |
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | APT28 (DNC op) | LSASS credential dumping on Windows domain machines |
| [T1598.003](https://attack.mitre.org/techniques/T1598/003/) | Phishing for Information: Spearphishing Link | Credential infra | Mass phishing at scale — 4,700+ targets documented in 2015–2016 campaign |

---

## Discovery

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1082](https://attack.mitre.org/techniques/T1082/) | System Information Discovery | X-Agent, Sofacy | System fingerprint sent to C2 for operator review before proceeding with full implant |
| [T1083](https://attack.mitre.org/techniques/T1083/) | File and Directory Discovery | X-Agent | Filesystem browsing and targeted file search |
| [T1057](https://attack.mitre.org/techniques/T1057/) | Process Discovery | X-Agent, Sofacy | Running process enumeration for security tool detection and injection targeting |
| [T1016](https://attack.mitre.org/techniques/T1016/) | System Network Configuration Discovery | X-Agent | Network interface, ARP, routing table enumeration |
| [T1049](https://attack.mitre.org/techniques/T1049/) | System Network Connections Discovery | XTunnel | Active connection enumeration on compromised servers |
| [T1033](https://attack.mitre.org/techniques/T1033/) | System Owner/User Discovery | X-Agent | Username and domain enumeration |
| [T1120](https://attack.mitre.org/techniques/T1120/) | Peripheral Device Discovery | X-Agent Android | Android variant enumerates connected devices; GPS for location |

---

## Lateral Movement

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1021.002](https://attack.mitre.org/techniques/T1021/002/) | Remote Services: SMB/Windows Admin Shares | APT28 (DNC) | Lateral movement via SMB using credentials extracted from initial compromise |
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | X-Agent, XTunnel | XTunnel enables routing X-Agent C2 traffic through other compromised hosts |
| [T1550.002](https://attack.mitre.org/techniques/T1550/002/) | Use Alternate Authentication Material: Pass the Hash | APT28 | Pass-the-hash used in Windows domain environments post-initial compromise |

---

## Collection

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | X-Agent, Sofacy | File collection across all platforms |
| [T1113](https://attack.mitre.org/techniques/T1113/) | Screen Capture | X-Agent | Periodic screenshots across all platforms (Windows, macOS, iOS, Android) |
| [T1056.001](https://attack.mitre.org/techniques/T1056/001/) | Input Capture: Keylogging | X-Agent | Cross-platform keylogging |
| [T1114.002](https://attack.mitre.org/techniques/T1114/002/) | Email Collection: Remote Email Collection | APT28 (Podesta, DNC) | Gmail API access after OAuth token theft; IMAP access with stolen credentials |
| [T1119](https://attack.mitre.org/techniques/T1119/) | Automated Collection | X-Agent | X-Agent automatically collects keystrokes and screenshots; configurable collection rules |
| [T1430](https://attack.mitre.org/techniques/T1430/) | Location Tracking | X-Agent Android | GPS coordinates collected from trojanised Android artillery app — directly enabling targeting intelligence |

---

## Command and Control

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Application Layer Protocol: Web | X-Agent, Sofacy, XTunnel | HTTPS C2 with custom encrypted protocol; User-Agent strings mimic legitimate browsers |
| [T1090](https://attack.mitre.org/techniques/T1090/) | Proxy | XTunnel | Multi-hop proxy chain through compromised intermediary servers; each hop only knows adjacent hops |
| [T1095](https://attack.mitre.org/techniques/T1095/) | Non-Application Layer Protocol | XTunnel | Custom binary protocol over raw TCP for XTunnel sessions |
| [T1573](https://attack.mitre.org/techniques/T1573/) | Encrypted Channel | X-Agent, XTunnel | Custom session encryption; key negotiated at tunnel establishment |
| [T1219](https://attack.mitre.org/techniques/T1219/) | Remote Access Software | X-Agent | Full remote access: shell, file transfer, screen, keyboard |
| [T1102](https://attack.mitre.org/techniques/T1102/) | Web Service | APT28 (Guccifer 2.0) | Used Twitter and WordPress as communication/distribution channels for leaked material |
| [T1104](https://attack.mitre.org/techniques/T1104/) | Multi-Stage Channels | Sofacy → X-Agent | Sofacy establishes first stage; fetches and executes X-Agent for persistent second-stage C2 |

---

## Exfiltration

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | X-Agent, XTunnel | Primary path; data encrypted within established XTunnel session |
| [T1048.003](https://attack.mitre.org/techniques/T1048/003/) | Exfiltration Over Alternative Protocol: Exfiltration Over Unencrypted Non-C2 Protocol | APT28 (DNC) | Compressed archives transferred out via alternative protocols in some documented operations |
| [T1030](https://attack.mitre.org/techniques/T1030/) | Data Transfer Size Limits | X-Agent | Upload rate limiting to stay below network anomaly detection thresholds |

---

## Impact

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1565.001](https://attack.mitre.org/techniques/T1565/001/) | Data Manipulation: Stored Data Manipulation | APT28 (information ops) | Selectively releasing and contextually framing stolen data to maximise political impact — the Podesta emails, DNC emails leaked strategically before convention/election |

---

## Techniques by Platform

| Platform | Technique Count | Key Tools |
|----------|----------------|-----------|
| Windows | 30+ | X-Agent, Sofacy/Zebrocy, LoJax, XTunnel |
| Linux | 8+ | X-Agent Linux (Fysbis) |
| macOS | 7+ | X-Agent macOS |
| iOS | 5+ | X-Agent iOS |
| Android | 6+ | X-Agent Android (artillery app) |
| UEFI Firmware | 1 | LoJax (T1542.001) |

APT28 has the broadest cross-platform coverage of any documented APT group — the only group with confirmed active implants on all major consumer operating systems simultaneously.

---

## ATT&CK Navigator Profile

→ [https://attack.mitre.org/groups/G0007/](https://attack.mitre.org/groups/G0007/)

Select "ATT&CK Navigator Layers" → "Enterprise" to load the visual heatmap.
