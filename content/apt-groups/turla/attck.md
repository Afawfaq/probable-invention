---
title: "Turla — MITRE ATT&CK Matrix"
slug: turla
category: attck
mitre_group_id: G0010
mitre_group_url: "https://attack.mitre.org/groups/G0010/"
---

# Turla — MITRE ATT&CK Matrix

**MITRE Group ID**: [G0010](https://attack.mitre.org/groups/G0010/) · **ATT&CK v14**

> Turla's ATT&CK profile is defined by exceptional **Command and Control** diversity — satellite C2, email-based C2 (Gmail, Exchange), hijacked C2 infrastructure (taking over other APT groups' servers), and P2P mesh networks within victim environments. No other group matches this breadth of covert channel innovation.

---

## Tactic Coverage

| Tactic | Techniques |
|--------|-----------|
| Reconnaissance | 2 |
| Initial Access | 4 |
| Execution | 5 |
| Persistence | 7 |
| Privilege Escalation | 3 |
| Defence Evasion | 8 |
| Credential Access | 3 |
| Discovery | 6 |
| Lateral Movement | 3 |
| Collection | 5 |
| Command and Control | 9 |
| Exfiltration | 3 |

---

## Reconnaissance

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1593](https://attack.mitre.org/techniques/T1593/) | Search Open Websites/Domains | Turla operators | Water-holing requires advance research into which websites targets visit |
| [T1592](https://attack.mitre.org/techniques/T1592/) | Gather Victim Host Information | Snake, Carbon | Extensive fingerprinting before deploying Snake — OS version, hardware, installed security tools |

---

## Initial Access

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1189](https://attack.mitre.org/techniques/T1189/) | Drive-by Compromise | Turla (water-holing) | Strategic web compromises: hack websites visited by targets; deliver exploits to drive-by visitors. Prominent Turla technique |
| [T1566.001](https://attack.mitre.org/techniques/T1566/001/) | Phishing: Spearphishing Attachment | Carbon, Kazuar | Malicious Office documents with macro payloads; targeted spearphishing to high-value individuals |
| [T1091](https://attack.mitre.org/techniques/T1091/) | Replication Through Removable Media | Snake (Agent.BTZ origin) | Agent.BTZ (Turla ancestor) spread via USB drives; compromised US military SIPRNet in 2008 |
| [T1195](https://attack.mitre.org/techniques/T1195/) | Supply Chain Compromise | Turla | Documented cases of Turla compromising software update channels to deliver implants |

---

## Execution

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1059.001](https://attack.mitre.org/techniques/T1059/001/) | Command and Scripting Interpreter: PowerShell | Kazuar | PowerShell-based execution and download cradles; Kazuar uses PowerShell for deployment |
| [T1059.003](https://attack.mitre.org/techniques/T1059/003/) | Command and Scripting Interpreter: Windows Command Shell | Snake, Carbon | Direct CMD execution via remote shell through C2 |
| [T1559](https://attack.mitre.org/techniques/T1559/) | Inter-Process Communication | Snake | Named pipes used for inter-component communication within the Snake framework |
| [T1203](https://attack.mitre.org/techniques/T1203/) | Exploitation for Client Execution | Carbon, Kazuar | Office macro exploits; browser exploits in water-holing operations |
| [T1569.002](https://attack.mitre.org/techniques/T1569/002/) | System Services: Service Execution | Snake | Kernel driver loaded as Windows service; service creation for persistence components |

---

## Persistence

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1014](https://attack.mitre.org/techniques/T1014/) | Rootkit | Snake | Kernel-mode rootkit using Windows driver; hides Snake processes, files, registry keys, and network connections from OS |
| [T1547.001](https://attack.mitre.org/techniques/T1547/001/) | Boot/Logon Autostart: Registry Run Keys / Startup Folder | Carbon, Kazuar | Registry autostart for user-mode components; fallback persistence alongside kernel rootkit |
| [T1543.003](https://attack.mitre.org/techniques/T1543/003/) | Create or Modify System Process: Windows Service | Snake, Carbon | Snake kernel driver registered as Windows service; Carbon persistence service mimics legitimate names |
| [T1136](https://attack.mitre.org/techniques/T1136/) | Create Account | Turla | Creates local admin accounts on compromised servers for persistent re-access |
| [T1053.005](https://attack.mitre.org/techniques/T1053/005/) | Scheduled Task/Job: Scheduled Task | Kazuar, Carbon | Scheduled tasks for periodic execution and persistence |
| [T1574.002](https://attack.mitre.org/techniques/T1574/002/) | Hijack Execution Flow: DLL Side-Loading | Carbon | DLL side-loading used by Carbon framework components |
| [T1505.003](https://attack.mitre.org/techniques/T1505/003/) | Server Software Component: Web Shell | Turla | Web shells deployed on compromised servers for persistent access alongside implants |

---

## Privilege Escalation

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1055](https://attack.mitre.org/techniques/T1055/) | Process Injection | Snake, Carbon | DLL injection into svchost.exe and other trusted Windows processes for privilege and stealth |
| [T1068](https://attack.mitre.org/techniques/T1068/) | Exploitation for Privilege Escalation | Snake | Kernel exploits used to escalate from user space to ring-0 for driver loading |
| [T1134](https://attack.mitre.org/techniques/T1134/) | Access Token Manipulation | Snake | Token impersonation for access to high-privilege Windows resources |

---

## Defence Evasion

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1027](https://attack.mitre.org/techniques/T1027/) | Obfuscated Files or Information | Kazuar, Carbon, ComRAT | .NET obfuscation (Kazuar); encrypted config files (Carbon); encrypted email attachments (ComRAT) |
| [T1070](https://attack.mitre.org/techniques/T1070/) | Indicator Removal | Snake | Rootkit actively hides its own processes, files, TCP connections, and registry entries from the OS |
| [T1036](https://attack.mitre.org/techniques/T1036/) | Masquerading | Snake, Carbon, Kazuar | Service names mimic legitimate Windows services; files placed in Windows system directories with plausible names |
| [T1055](https://attack.mitre.org/techniques/T1055/) | Process Injection | Snake, Carbon | Injecting into trusted Windows processes makes malicious activity appear as normal system behaviour |
| [T1140](https://attack.mitre.org/techniques/T1140/) | Deobfuscate/Decode Files or Information | ComRAT, Carbon | Encrypted configuration and plugin storage; decrypted only in memory at runtime |
| [T1497](https://attack.mitre.org/techniques/T1497/) | Virtualization/Sandbox Evasion | Kazuar | Multiple anti-analysis checks: VM detection, debugger detection, sandbox timing checks, legitimate user activity checks |
| [T1218](https://attack.mitre.org/techniques/T1218/) | System Binary Proxy Execution | Turla | Use of regsvr32.exe and rundll32.exe to execute malicious DLLs via legitimate Windows binaries |
| [T1480](https://attack.mitre.org/techniques/T1480/) | Execution Guardrails | Snake, EquationDrug crossref | Environment-specific decryption keys; payload only runs on the intended machine |

---

## Credential Access

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1056.001](https://attack.mitre.org/techniques/T1056/001/) | Input Capture: Keylogging | ComRAT, Snake | ComRAT v4 includes keylogging capability; Snake kernel rootkit intercepts keyboard I/O |
| [T1003](https://attack.mitre.org/techniques/T1003/) | OS Credential Dumping | Turla | LSASS memory dumping for Windows credential extraction on compromised domain machines |
| [T1555](https://attack.mitre.org/techniques/T1555/) | Credentials from Password Stores | Carbon, ComRAT | Browser credential stores harvested |

---

## Discovery

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1082](https://attack.mitre.org/techniques/T1082/) | System Information Discovery | Kazuar, Carbon | Extensive system fingerprinting at deployment; OS version, CPU, RAM, hostname |
| [T1083](https://attack.mitre.org/techniques/T1083/) | File and Directory Discovery | ComRAT, Carbon | File system surveys for documents, databases, credentials |
| [T1057](https://attack.mitre.org/techniques/T1057/) | Process Discovery | Kazuar | Process enumeration for injection target selection and security tool detection |
| [T1049](https://attack.mitre.org/techniques/T1049/) | System Network Connections Discovery | Snake | Network connection enumeration for lateral movement target identification |
| [T1016](https://attack.mitre.org/techniques/T1016/) | System Network Configuration Discovery | Snake, Carbon | Network interface, ARP, routing table discovery for network mapping |
| [T1135](https://attack.mitre.org/techniques/T1135/) | Network Share Discovery | Carbon | Enumerates SMB shares for lateral movement and file collection opportunities |

---

## Lateral Movement

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1021.002](https://attack.mitre.org/techniques/T1021/002/) | Remote Services: SMB/Windows Admin Shares | Snake, Carbon | Lateral movement via SMB using stolen credentials |
| [T1570](https://attack.mitre.org/techniques/T1570/) | Lateral Tool Transfer | Carbon | Carbon's orchestrator distributes modules to newly compromised machines in the victim network |
| [T1550.002](https://attack.mitre.org/techniques/T1550/002/) | Use Alternate Authentication Material: Pass the Hash | Turla | Pass-the-hash using NTLM hashes extracted from LSASS |

---

## Collection

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1005](https://attack.mitre.org/techniques/T1005/) | Data from Local System | ComRAT, Carbon, Snake | File collection across all major implants |
| [T1071.003](https://attack.mitre.org/techniques/T1071/003/) | Application Layer Protocol: Mail Protocols | ComRAT | **Unique**: uses the victim's own email account (Gmail or Exchange) as both C2 and data exfiltration channel |
| [T1113](https://attack.mitre.org/techniques/T1113/) | Screen Capture | ComRAT, Snake | Periodic desktop screenshots sent to C2 |
| [T1056.001](https://attack.mitre.org/techniques/T1056/001/) | Input Capture: Keylogging | ComRAT | Keystroke logging in ComRAT v4 |
| [T1114](https://attack.mitre.org/techniques/T1114/) | Email Collection | ComRAT, LightNeuron | ComRAT reads target's Gmail inbox; LightNeuron intercepts all Exchange email at the transport agent level |

---

## Command and Control

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1071.001](https://attack.mitre.org/techniques/T1071/001/) | Application Layer Protocol: Web | Carbon, Kazuar | HTTP/HTTPS C2; Carbon uses compromised third-party websites as relay nodes |
| [T1071.003](https://attack.mitre.org/techniques/T1071/003/) | Application Layer Protocol: Mail Protocols | ComRAT | Gmail inbox as C2; HTML comments in email drafts used as command queue |
| [T1090](https://attack.mitre.org/techniques/T1090/) | Proxy | Snake, Carbon | Internal P2P proxy mesh within victim networks; compromised routers as relay points |
| [T1090.004](https://attack.mitre.org/techniques/T1090/004/) | Proxy: Domain Fronting | Turla infrastructure | Commercial satellite internet downlinks used as **one-way anonymous C2 delivery** — unattributable, no return traffic from attacker side |
| [T1573](https://attack.mitre.org/techniques/T1573/) | Encrypted Channel | Snake, Carbon | Custom encryption for all C2 traffic; certificates used for mutual authentication |
| [T1571](https://attack.mitre.org/techniques/T1571/) | Non-Standard Port | Snake satellite C2 | DVB-S satellite receiver on non-standard UDP port; blends into satellite internet traffic |
| [T1095](https://attack.mitre.org/techniques/T1095/) | Non-Application Layer Protocol | Snake | Raw TCP sockets with custom binary protocol in Snake P2P layer |
| [T1105](https://attack.mitre.org/techniques/T1105/) | Ingress Tool Transfer | Carbon, Kazuar | Download of additional plugins/modules from C2 on demand |
| [T1219](https://attack.mitre.org/techniques/T1219/) | Remote Access Software | Turla (hijacking) | Documented hijacking of OilRig (Iranian APT) C2 infrastructure — Turla operators used Iranian tools against Iranian targets from inside Iranian infrastructure |

---

## Exfiltration

| ID | Technique | Used By | Notes |
|----|-----------|---------|-------|
| [T1041](https://attack.mitre.org/techniques/T1041/) | Exfiltration Over C2 Channel | Carbon, Kazuar, ComRAT | Primary path; encrypted within established C2 session |
| [T1071.003](https://attack.mitre.org/techniques/T1071/003/) | Exfiltration Over Alternative Protocol: Email | ComRAT | Gmail attachments used to exfiltrate collected files — uses same channel as C2 |
| [T1030](https://attack.mitre.org/techniques/T1030/) | Data Transfer Size Limits | ComRAT, Carbon | Configurable upload limits; Carbon's task log tracks volumes to stay under detection thresholds |

---

## Notable Technique: Infrastructure Hijacking (T1219)

Turla's most operationally audacious documented behaviour is **hijacking other APT groups' C2 infrastructure**:

In 2019, UK NCSC and US NSA jointly attributed an operation in which Turla:
1. Compromised OilRig (Iranian APT, IRGC) C2 servers
2. Used OilRig tools to collect from OilRig's *existing* victims
3. Re-used Iranian credentials and infrastructure so defenders would attribute activity to Iran

This technique has no MITRE ID — it sits between T1219 and a new category. The practical effect: Turla conducted espionage against Middle Eastern governments while making it appear Iran was hacking itself.

---

## ATT&CK Navigator Profile

→ [https://attack.mitre.org/groups/G0010/](https://attack.mitre.org/groups/G0010/)

Select "ATT&CK Navigator Layers" → "Enterprise" to load the visual heatmap.
