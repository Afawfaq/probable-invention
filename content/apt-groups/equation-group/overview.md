---
title: "Equation Group"
slug: equation-group
aliases:
  - "EQUATION"
  - "Tilded Team"
  - "GREYFISH"
  - "IRATEMONK"
attribution: NSA Tailored Access Operations (TAO) — widely assessed, never officially confirmed
nation_state: United States
active_since: ~1996
discovered: 2015
discovered_by: Kaspersky Lab
mitre_group_id: G0020
tags: [usa, nsa, tao, firmware, air-gap, shadowbrokers, five-eyes]
source_code_available: true
source_code_notes: ShadowBrokers dump (2016–2017) released a large body of actual tooling
related_operations:
  - Stuxnet (Operation Olympic Games)
  - Flame
  - Duqu
  - Operation Buckshot Yankee (adjacent — Turla's Agent.BTZ triggered US response)
---

# Equation Group

> **"The Death Star of the Malware Galaxy"** — Kaspersky Lab, 2015

Equation Group is the name given by Kaspersky Lab researchers to a threat actor they assessed to be among the most technically sophisticated ever observed. The group is widely attributed to the **NSA's Tailored Access Operations (TAO)** unit — a specialised signals intelligence division responsible for offensive cyber operations — though this has never been officially confirmed by the US government.

The name "Equation Group" comes from the group's heavy use of encryption and obfuscation, and specifically from the name of one of their early tools, `EQUATIONDRUG`.

---

## Attribution

### Why NSA / TAO?

The attribution to NSA/TAO rests on multiple pillars of evidence:

1. **NSA ANT Catalogue (2013)** — Documents leaked by Edward Snowden described NSA tools including `IRATEMONK` (HDD firmware implant) and `SWAP` (BIOS implant) that are functionally identical to malware Kaspersky later documented as Equation Group tooling. The catalogue even uses the same internal codename.

2. **Stuxnet connection** — Equation Group used two zero-day exploits that later appeared in Stuxnet (`.lnk` file vulnerability and print spooler exploit). The most plausible explanation is a shared development or intelligence-sharing relationship. Stuxnet is widely attributed to a US–Israel joint operation (Operation Olympic Games).

3. **GROK implant string** — The string `"GROK"` appears in Equation Group code. A leaked NSA document describes `GROK` as an NSA keylogger.

4. **Operational security patterns** — Command-and-control infrastructure, target selection (nuclear programs, government networks, telecom companies), and operational tempo are consistent with a well-resourced nation-state with a SIGINT mandate.

5. **JEEPFLEA_MARKET** — Among the ShadowBrokers-leaked tools are scripts targeting the SWIFT banking network — consistent with NSA's known intelligence mandate for financial intelligence.

6. **Five Eyes context** — Several Equation Group tools appear to share code or infrastructure with `Flame` and `Duqu`, which are separately attributed to US and Israeli intelligence.

### Official position

The US government has never confirmed or denied that Equation Group is an NSA operation. In 2017, the NSA issued a classified damage assessment after the ShadowBrokers leaks. Former TAO operator Harold T. Martin III was arrested in 2016 in connection with hoarding NSA cyber tools (though not directly linked to the ShadowBrokers leak itself). Reality Winner was separately convicted of leaking an NSA document about Russian election interference in 2017.

---

## Discovery — Kaspersky Lab, 2015

### How they found it

Kaspersky first encountered Equation Group malware around 2014–2015 during an investigation into a targeted attack on a conference attendee at a **Middle East security summit** (likely a Kaspersky-organised event, possibly in Houston). An infected CD-ROM was distributed to conference attendees — a supply-chain interdiction technique.

Kaspersky's GReAT (Global Research and Analysis Team) pulled the thread and, over months, identified a cluster of malware sharing unique technical characteristics:
- Custom 64-bit encryption algorithms not seen elsewhere
- Reuse of specific exploit code with very unusual zero-days
- A common C2 infrastructure pattern
- A modular plugin architecture reused across different malware families
- The use of the RC5 and RC6 encryption algorithms with a custom key schedule

### The February 2015 report

On **February 16, 2015**, Kaspersky published their landmark report: *"Equation Group: Questions and Answers"*. This is one of the most significant threat intelligence publications ever released, documenting for the first time a sustained cyber-espionage capability operating at a level of sophistication never before publicly attributed.

Key findings from the report:
- The group had been active for **at least two decades**
- Over **500 victims** identified in **42 countries**: Iran, Russia, Pakistan, Afghanistan, India, China, Syria, Mali — all high-value intelligence targets
- Primary targets: governments, military, telecom, banks, energy companies, nuclear research, media, and Islamic scholars
- The group demonstrated a unique capability: **reprogramming hard drive firmware** — the most persistent form of malware ever documented

---

## What Made Equation Group Unique

### Sophistication tier

Most APT groups use commercially available or open-source frameworks (Metasploit, Cobalt Strike), with custom payloads bolted on. Equation Group built their entire toolchain from scratch:

- Custom exploitation framework (`FUZZBUNCH`) — their own internal equivalent of Metasploit
- Custom post-exploitation framework (`DanderSpritz`) — with a GUI, plugin system, and event-log manipulation
- Modular implant architecture across Windows AND Unix systems
- Firmware-level implants for HDDs — requiring access to proprietary vendor source code or reverse-engineering effort that took years
- Air-gap crossing via USB worm (`FANNY`)

### The HDD firmware capability

The most extraordinary discovery in the Kaspersky report was the `GRAYFISH` / `IRATEMONK` HDD firmware implant. This malware:
- Reprogrammed the **firmware chips on hard drives** from at least 12 manufacturers: Seagate, WD, Hitachi, Toshiba, Samsung, IBM, Maxtor, and others
- Created a **hidden storage area** on the hard drive, inaccessible to the OS, used to persist malware payloads
- **Survives a complete OS reinstall** — even formatting the drive doesn't remove it, because it lives in the firmware
- The firmware implant could re-infect the OS on next boot

Acquiring the ability to reprogram HDD firmware requires either:
1. Access to the vendor's proprietary firmware source code (possible via NSA legal process / intelligence liaison)
2. Months or years of reverse-engineering effort

This capability was so advanced that Kaspersky noted it appeared to be **unique to Equation Group** globally.

---

## Relationship to Other Operations

| Operation / Actor | Connection |
|---|---|
| **Stuxnet** | Two zero-days shared with Equation Group tools. Stuxnet used Equation Group exploits. Most likely Equation Group provided exploits to the Stuxnet team (US-Israel, Operation Olympic Games) |
| **Flame** | Shares code modules with Equation Group. Likely parallel or related development within the same intelligence community |
| **Duqu / Duqu 2.0** | Attributed to the same developer as Stuxnet; shares infrastructure patterns with Equation Group |
| **Five Eyes** | Operational target overlap and infrastructure patterns consistent with FVEY intelligence sharing |
| **WannaCry (2017)** | North Korean actors took EternalBlue from the ShadowBrokers dump and weaponised it. Not Equation Group's action, but their leaked tools enabled it |
| **NotPetya (2017)** | Russian GRU (Sandworm) used EternalBlue from the ShadowBrokers dump as a propagation mechanism. Not Equation Group, but their leaked tools enabled it |

---

## The ShadowBrokers Leak

In **August 2016**, a group calling themselves "The Shadow Brokers" published a cache of what they claimed were NSA hacking tools, offering more for auction. When the auction drew little interest, they progressively released more — culminating in the **April 2017 "Lost in Translation"** release, which contained:

- `FUZZBUNCH` — the full exploitation framework
- `DanderSpritz` — post-exploitation framework
- `EternalBlue`, `EternalRomance`, `EternalChampion`, `EternalSynergy` — SMBv1 exploits
- `DoublePulsar` — kernel-mode backdoor injector
- `ExplodingCan` — IIS 6.0 remote exploit
- Network device exploits targeting Cisco, Juniper, and Fortinet
- `JEEPFLEA_MARKET` / `JEEPFLEA_POWDER` — SWIFT banking exploitation scripts
- `NOPEN` — Unix remote access tool
- And dozens more

Within **weeks** of the April 2017 release, EternalBlue was incorporated into **WannaCry** (May 2017) and **NotPetya** (June 2017), causing tens of billions of dollars in damage worldwide.

The identity of the Shadow Brokers has never been publicly confirmed. Most analysts believe it was a Russian intelligence operation (leak as a geopolitical message to the US during a period of US–Russia tensions), possibly with an insider component.

---

## Targets & Victims

Equation Group targeted entities aligned with US intelligence collection priorities:

- **Government networks** across the Middle East, Central Asia, Russia, and China
- **Nuclear and energy infrastructure** — particularly Iranian nuclear programs
- **Military and defence** contractors
- **Telecom companies** — for access to communications infrastructure
- **Financial institutions** — particularly those connected to Iran or targeted nations
- **Islamic academic institutions and scholars** — per the Kaspersky victim map
- **Embassies and diplomatic missions**

Notably, **no victims were identified in NATO member countries or close US allies** in the original Kaspersky research — consistent with NSA collection authorities and legal constraints.

---

## Known Tools & Malware

See individual files for deep analysis:

| Tool | Type | Platform | Source Code |
|------|------|----------|-------------|
| [`FUZZBUNCH`](./shadowbrokers-dump/fuzzbunch.md) | Exploitation framework | Windows | ✅ Leaked (ShadowBrokers) |
| [`DanderSpritz`](./shadowbrokers-dump/danderspritz.md) | Post-exploitation framework | Windows | ✅ Leaked (ShadowBrokers) |
| [`EternalBlue`](./shadowbrokers-dump/eternalblue.md) | SMBv1 exploit (MS17-010) | Windows | ✅ Leaked (ShadowBrokers) |
| [`DoublePulsar`](./shadowbrokers-dump/doublepulsar.md) | Kernel-mode backdoor | Windows | ✅ Leaked (ShadowBrokers) |
| [`NOPEN`](./shadowbrokers-dump/nopen.md) | Unix RAT | Linux/Unix | ✅ Leaked (ShadowBrokers) |
| [Network exploits](./shadowbrokers-dump/network-exploits.md) | Router/switch exploits | Cisco/Juniper/Fortinet | ✅ Leaked (ShadowBrokers) |
| [JEEPFLEA / SWIFT tools](./shadowbrokers-dump/swift-tools.md) | Banking network exploitation | SWIFT terminals | ✅ Leaked (ShadowBrokers) |
| [`GRAYFISH`](./malware/grayfish.md) | HDD firmware implant | Multiple firmware | ❌ No public source |
| [`FANNY`](./malware/fanny.md) | USB worm (air-gap) | Windows | ❌ No public source |
| [`EquationDrug`](./malware/equationdrug.md) | Modular espionage platform | Windows | ❌ No public source |
| [`DoubleFantasy`](./malware/doublefantasy.md) | Staged validator implant | Windows | ❌ No public source |

---

## MITRE ATT&CK Coverage

Equation Group techniques mapped to MITRE ATT&CK:

| Technique ID | Technique Name | Tool |
|---|---|---|
| T1542.002 | Pre-OS Boot: Component Firmware | GRAYFISH / IRATEMONK |
| T1091 | Replication Through Removable Media | FANNY |
| T1190 | Exploit Public-Facing Application | EternalBlue, ExplodingCan |
| T1210 | Exploitation of Remote Services | EternalBlue, EternalRomance |
| T1059.003 | Windows Command Shell | DanderSpritz |
| T1070.001 | Indicator Removal: Clear Windows Event Logs | DanderSpritz / EventLogEdit |
| T1027 | Obfuscated Files or Information | EquationDrug plugins |
| T1071.001 | Application Layer Protocol: Web Protocols | NOPEN C2 |
| T1090 | Proxy | NOPEN tunnel capabilities |
| T1005 | Data from Local System | DanderSpritz collection modules |

Full TTP breakdowns: [Firmware Persistence](./ttps/firmware-persistence.md) · [Air-Gap Crossing](./ttps/air-gap-crossing.md) · [Supply Chain](./ttps/supply-chain.md)

---

## Further Reading

See [references.md](./references.md) for the full annotated source list.
