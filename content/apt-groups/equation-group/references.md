---
title: "Equation Group — References & Sources"
slug: references
group: equation-group
tags: [references, sources, links]
---

# Equation Group — References & Sources

All sources used across the Equation Group research content. Annotated with notes on content and reliability.

---

## 🔴 Primary Sources (Original Research / Official)

### Kaspersky Lab Reports

| Document | Year | Key Content | Link |
|----------|------|-------------|------|
| **Equation Group: Questions and Answers** | 2015 | Foundation document — full malware analysis, victim map, C2 infrastructure | [securelist.com](https://securelist.com/equation-the-death-star-of-malware-galaxy/68750/) |
| **Equation Group full PDF** | 2015 | Technical appendices, plugin analysis, GRAYFISH detail | [PDF](https://securelist.com/files/2015/02/Equation_group_questions_and_answers.pdf) |
| **FANNY worm analysis** | 2015 | USB worm, air-gap crossing, zero-day connection to Stuxnet | [securelist.com](https://securelist.com/fanny-equation-worm/) |
| **EquationDrug detailed analysis** | 2015 | Plugin inventory, RC5/RC6 custom crypto, persistence | [securelist.com](https://securelist.com/equationdrug-more-details/) |

### NSA / Government Documents

| Document | Year | Key Content | Link |
|----------|------|-------------|------|
| **NSA ANT Catalogue** | 2013 | Product catalogue of NSA implants: IRATEMONK, SWAP, COTTONMOUTH, FIREWALK, DIETYBOUNCE | [Spiegel](https://www.spiegel.de/international/world/the-nsa-uses-powerful-toolbox-in-effort-to-spy-on-global-networks-a-940969.html) |
| **NSA FOXACID / TURBINE slides** | 2013 | Mass exploitation infrastructure (Snowden leaks) | [The Intercept](https://theintercept.com/2014/03/12/nsa-plans-infect-millions-computers-malware/) |
| **NSA TAO operational notes** | 2013 | TAO's capabilities and organisational structure | [Der Spiegel](https://www.spiegel.de/international/world/the-nsa-uses-powerful-toolbox-in-effort-to-spy-on-global-networks-a-940969.html) |

---

## 🟠 Secondary Analysis (Threat Intelligence Reports)

### ShadowBrokers Dump Analysis

| Document | Organisation | Year | Key Content |
|----------|-------------|------|-------------|
| EternalBlue / DoublePulsar analysis | zerosum0x0 | 2017 | Ring-0 shellcode deep-dive; definitive technical breakdown | [blog](https://zerosum0x0.blogspot.com/2017/04/doublepulsar-initial-smb-backdoor-ring.html) |
| DanderSpritz analysed | Countercept (BAE Systems) | 2017 | Full post-exploitation framework analysis | [countercept.com](https://countercept.com/blog/danderspritz-analysed/) |
| Windows exploit analysis | Symantec | 2017 | FUZZBUNCH, EternalBlue context | [symantec.com](https://symantec-enterprise-blogs.security.com/blogs/threat-intelligence/shadowbrokers-equation-group-tools) |
| EventLogEdit / GROK keylogger | F-Secure | 2019 | Detection of EventLogEdit; GROK string analysis | [labs.f-secure.com](https://labs.f-secure.com/blog/nsa-eventlogger-detection/) |
| DoublePulsar usermode analysis | Countercept | 2017 | DLL injection mechanics | [countercept.com](https://countercept.com/blog/doublepulsar-usermode-analysis-generic-reflective-dll-loader/) |
| SWIFT targeting analysis | BAE Systems | 2017 | JEEPFLEA tools and implications | [baesystems.com](https://www.baesystems.com/en/cybersecurity/feature/following-the-swift-money) |

### Network Device Analysis

| Document | Organisation | Year | Key Content |
|----------|-------------|------|-------------|
| CVE-2016-6366 advisory (EXTRABACON) | Cisco | 2016 | Vendor confirmation of SNMP overflow | [cisco.com](https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20160817-asa-snmp) |
| CVE-2016-6367 advisory (EPICBANANA) | Cisco | 2016 | CLI privilege escalation confirmation | [cisco.com](https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20160817-asa-cli) |
| ScreenOS backdoor | Juniper | 2015 | Official disclosure of unauthorised ScreenOS code | [juniper.net](https://kb.juniper.net/JSA10713) |
| Juniper backdoor deep-dive | Ralf-Philipp Weinmann | 2015 | DH constant analysis; third-party modification hypothesis | [GitHub](https://github.com/rpw/juniper) |

---

## 🟡 Journalism & Long-form Analysis

| Article | Publication | Author | Key Content |
|---------|------------|--------|-------------|
| The Shadow Brokers: Anatomy of a Hack | Ars Technica | Dan Goodin | Context and aftermath of the dump | [arstechnica.com](https://arstechnica.com/information-technology/2017/04/nsa-linked-shadow-brokers-just-dumped-its-most-damaging-release-yet/) |
| The Untold Story of NotPetya | Wired | Andy Greenberg | Most comprehensive NotPetya account; EternalBlue cascade | [wired.com](https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/) |
| The NSA Breach of Heartland | Wired | Kim Zetter | Earlier ShadowBrokers context | [wired.com](https://www.wired.com/) |
| Olympic Games (Stuxnet) | NYT | David Sanger | Definitive Stuxnet attribution and Olympic Games reporting | [nytimes.com](https://www.nytimes.com/2012/06/01/world/middleeast/obama-ordered-wave-of-cyberattacks-against-iran.html) |
| No Place to Hide | Book | Glenn Greenwald | Hardware interdiction details; NSA supply chain programs | [amazon.com](https://www.amazon.com/No-Place-Hide-Snowden-Surveillance/dp/1627790748) |
| The Perfect Weapon | Book | David Sanger | Comprehensive US cyber operations history | [amazon.com](https://www.amazon.com/Perfect-Weapon-War-Sabotage-Fear/dp/0451497899) |
| Countdown to Zero Day | Book | Kim Zetter | Definitive Stuxnet account; connects to Equation Group | [amazon.com](https://www.amazon.com/Countdown-Zero-Day-Stuxnet-Digital/dp/0770436196) |

---

## 🟢 Source Code / Technical Repositories

| Repository | Content | Notes |
|-----------|---------|-------|
| [x0rz/EQGRP](https://github.com/x0rz/EQGRP) | Full ShadowBrokers dump — organised | Most complete archive; includes Linux tools, network device tools |
| [misterch0c/shadowbroker](https://github.com/misterch0c/shadowbroker) | Windows exploit suite — FUZZBUNCH, DanderSpritz | Primary repo for Windows exploitation framework |
| [zerosum0x0/doublepulsar-detection-script](https://github.com/zerosum0x0/doublepulsar-detection-script) | DoublePulsar scanner | Detect infection; reference implementation |
| [worawit/MS17-010](https://github.com/worawit/MS17-010) | Independent EternalBlue Python reimplementation | Clean room; useful for understanding the exploit without NSA tooling |

> ⚠️ All source code repositories are for **educational and research purposes**. The tools contain working exploits. Study only in isolated lab environments.

---

## 🔵 CVEs & Vulnerability Databases

| CVE | Vulnerability | CVSS | Link |
|-----|--------------|------|------|
| CVE-2017-0144 | EternalBlue — SMBv1 buffer overflow | 9.3 CRITICAL | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2017-0144) |
| CVE-2017-0145 | EternalRomance — SMBv1 | 9.3 CRITICAL | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2017-0145) |
| CVE-2017-0143 | EternalSynergy | 9.3 CRITICAL | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2017-0143) |
| CVE-2017-0146 | EternalChampion | 9.3 CRITICAL | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2017-0146) |
| CVE-2017-7269 | ExplodingCan — IIS 6.0 WebDAV | 10.0 CRITICAL | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2017-7269) |
| CVE-2016-6366 | EXTRABACON — Cisco ASA SNMP | 8.5 HIGH | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2016-6366) |
| CVE-2016-6367 | EPICBANANA — Cisco ASA CLI | 6.8 MEDIUM | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2016-6367) |
| CVE-2010-2568 | LNK file parsing (used in FANNY + Stuxnet) | 9.3 CRITICAL | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2010-2568) |
| CVE-2010-3338 | Windows Task Scheduler (FANNY + Stuxnet) | 7.2 HIGH | [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2010-3338) |

---

## 🔵 MITRE ATT&CK

| Resource | Content | Link |
|----------|---------|------|
| Equation Group Group page (G0020) | Full TTP mapping | [attack.mitre.org/groups/G0020](https://attack.mitre.org/groups/G0020/) |
| T1542.002 — Component Firmware | Firmware persistence technique | [attack.mitre.org](https://attack.mitre.org/techniques/T1542/002/) |
| T1091 — Removable Media | Air-gap crossing | [attack.mitre.org](https://attack.mitre.org/techniques/T1091/) |
| T1210 — Exploitation of Remote Services | EternalBlue usage | [attack.mitre.org](https://attack.mitre.org/techniques/T1210/) |
| T1014 — Rootkit | DoublePulsar, GRAYFISH | [attack.mitre.org](https://attack.mitre.org/techniques/T1014/) |
| T1070.001 — Clear Windows Event Logs | DanderSpritz EventLogEdit | [attack.mitre.org](https://attack.mitre.org/techniques/T1070/001/) |
| T1195 — Supply Chain Compromise | Hardware interdiction | [attack.mitre.org](https://attack.mitre.org/techniques/T1195/) |

---

## 🔵 Additional Context

| Resource | Content | Link |
|----------|---------|------|
| Microsoft MS17-010 bulletin | EternalBlue patch (March 2017) | [microsoft.com](https://docs.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010) |
| Microsoft: Disabling SMBv1 | How to turn off the vulnerable protocol | [microsoft.com](https://docs.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3) |
| US DoJ: WannaCry indictment (Park Jin Hyok) | DPRK attribution for WannaCry | [justice.gov](https://www.justice.gov/opa/pr/north-korean-regime-backed-programmer-charged-conspiracy-conduct-multiple-cyber-attacks-and) |
| US DoJ: NotPetya / Sandworm indictment (2020) | GRU attribution for NotPetya | [justice.gov](https://www.justice.gov/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware) |
| Bangladesh Bank heist analysis | Context for SWIFT targeting | [symantec.com](https://www.symantec.com/connect/blogs/swift-attackers-malware-linked-more-financial-attacks) |
