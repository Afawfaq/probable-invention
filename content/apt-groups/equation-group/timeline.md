---
title: "Equation Group — Operational Timeline"
slug: equation-group-timeline
group: equation-group
tags: [timeline, operations, history]
---

# Equation Group — Operational Timeline

A chronological record of Equation Group operations, discoveries, and key events. Where approximate, dates are based on malware compilation timestamps, C2 infrastructure registration dates, and victim telemetry from threat intelligence reports.

---

## ~1996 — Earliest Known Activity

Kaspersky assessed Equation Group to have been active **since at least 1996**, based on:
- Compilation timestamps on the oldest recovered malware samples (though these can be faked)
- C2 domain registration dates going back to the late 1990s
- Victim telemetry from infected machines reporting infections from that era

The group's early tooling was less sophisticated but already featured custom encryption, indicating a mature development capability from the outset.

**Key tool in this period**: `EQUATIONLASER` — an early, lightweight implant used as a first-stage installer. Relatively simple compared to later tooling.

---

## 2001 — EQUATIONDRUG Deployment Begins

The modular `EQUATIONDRUG` platform (also called `EQUESTRE` in some documents) begins appearing in victim telemetry. This represents a major upgrade in capability — a full plugin-based espionage platform rather than a simple backdoor.

`EQUATIONDRUG` features:
- A plugin loader that downloads, decrypts, and executes additional modules on demand
- Modules for keylogging, screen capture, file collection, network reconnaissance
- Encrypted storage of stolen data before exfiltration

At this point the group has clearly built an internal "product" — an implant platform with an update mechanism and modular capability.

---

## ~2003 — DOUBLEFANTASY / TRIPLEFANTASY Deployment

The staged implant validator system begins deployment. `DOUBLEFANTASY` is a "validator" — a lightweight first stage that confirms the target is the intended victim before deploying a heavier payload.

**Why validating targets matters**: Sophisticated actors don't want to burn zero-days or heavy implants on unintended victims. A validator checks:
- Machine details (OS version, hostname, installed software, network environment)
- Whether the target matches the expected profile
- If yes: deploy `TRIPLEFANTASY` or `GRAYFISH` for long-term persistence
- If no: self-delete cleanly

`TRIPLEFANTASY` is a full-featured backdoor used when the validator confirmed a high-value target.

---

## 2007 — FANNY Worm (Air-Gap Operations Begin)

`FANNY` is deployed — a USB worm designed to cross air-gapped networks (networks physically isolated from the internet, used in highly sensitive environments like nuclear facilities).

**Technical note**: FANNY exploited **two zero-day vulnerabilities** that would later reappear in Stuxnet:
1. The `.lnk` (Windows shortcut) file parsing vulnerability (CVE-2010-2568) — used to execute code when a drive is browsed
2. The Windows Task Scheduler privilege escalation (CVE-2010-3338)

This is significant: Equation Group was using these zero-days in FANNY **before** Stuxnet used them. Kaspersky's interpretation is that Equation Group provided these exploits to the Stuxnet team.

FANNY's mission: map air-gapped networks. It collected network topology information and stored it in a hidden area of the USB drive, to be retrieved later when the USB was reconnected to an internet-connected machine. It could also push commands into air-gapped networks the same way (write to USB → carry into air-gapped network → implant reads commands).

---

## 2008 — GRAYFISH Development (estimated)

Based on compilation timestamps and victim telemetry, the `GRAYFISH` HDD firmware implant is assessed to have been in active development around this period. This would represent years of engineering effort — reverse-engineering HDD firmware from multiple vendors or obtaining vendor source code.

`GRAYFISH` targets firmware chips on drives from Seagate, WD, Hitachi, Toshiba, Samsung, IBM, and others.

---

## ~2009–2010 — Operation Olympic Games Peak Activity (Stuxnet)

Though Equation Group's role is indirect, the **Stuxnet** operation (jointly attributed to US and Israel, targeting Iranian nuclear centrifuges at Natanz) uses zero-days previously seen in Equation Group tools.

Stuxnet is discovered by VirusBlokAda in June 2010. The Washington Post later reports it was a joint US–Israel operation codenamed **Operation Olympic Games**, begun under President Bush and accelerated under President Obama.

**Connection to Equation Group**: The shared zero-days strongly suggest Equation Group was the technical capability provider for parts of the Stuxnet operation, or that the same NSA/TAO development teams produced both.

---

## 2011 — Flame Discovered (Published 2012)

`Flame` — a massive, modular surveillance malware — is discovered on Iranian computers. Kaspersky, CERT-Bund, and the International Telecommunication Union publish their analysis in May 2012. Flame is linked to Stuxnet through a shared code module and a previously unknown Windows Update man-in-the-middle mechanism.

Flame is not directly attributed to Equation Group but likely originates from the same intelligence community (possibly a different team within NSA/CIA or Israeli intelligence). Code analysis shows Flame was in development as early as 2006.

---

## 2013 — Snowden Disclosures

**June 2013**: Edward Snowden's first disclosures via The Guardian and Washington Post reveal the scope of NSA surveillance programs (PRISM, XKeyscore, etc.). While these disclosures focus on bulk collection rather than offensive operations, they accelerate public awareness of NSA cyber capabilities.

**December 2013**: Der Spiegel publishes the **NSA ANT Catalogue** — a 50-page product catalogue of NSA implants and hardware backdoors. Relevant entries:
- **IRATEMONK** — HDD firmware implant for Seagate, WD, Samsung, Maxtor
- **SWAP** — BIOS implant that survives reinstallation
- **COTTONMOUTH** — USB hardware implant (physical device with RF transceiver)
- **FIREWALK** — Network jack hardware implant
- **DIETYBOUNCE** — Dell server BIOS implant

Researchers would later note the near-perfect functional match between `IRATEMONK` in the ANT catalogue and `GRAYFISH` documented by Kaspersky.

---

## 2014 — Equation Group Active, Kaspersky Investigation Begins

Kaspersky GReAT begins their investigation after recovering Equation Group malware from a targeted attack against a conference attendee. The infected CD-ROM was distributed at a **Middle Eastern security conference** — a classic supply-chain / targeted distribution technique.

Kaspersky researchers spend approximately a year pulling the thread — identifying multiple malware families, shared code, common infrastructure, and the HDD firmware capability.

---

## February 16, 2015 — Kaspersky Publication

Kaspersky publishes *"Equation Group: Questions and Answers"* at the **Kaspersky Security Analyst Summit** in Cancún, Mexico. The publication includes:

- Full technical analysis of all identified malware families
- Victim map across 42 countries
- C2 infrastructure documentation
- The HDD firmware implant disclosure — the most technically significant finding ever published in commercial threat intelligence

The report sends shockwaves through the security industry and governments worldwide. The level of sophistication documented exceeded anything previously publicly attributed.

**Media coverage**: NYT, Washington Post, The Intercept, Wired, and dozens of international outlets publish major stories. The connection to NSA is drawn immediately by analysts.

---

## 2015 — GRAYFISH and DoubleFantasy Technical Details Published

Following the February disclosure, Kaspersky and other researchers publish additional deep-technical follow-up analyses covering GRAYFISH in detail, including the HDD reprogramming mechanism and the hidden storage area creation technique.

Costin Raiu (Kaspersky GReAT director) gives multiple conference presentations at Black Hat, DEF CON, and RSA describing the technical implementation.

---

## August 2016 — ShadowBrokers First Release

A group calling themselves **"The Shadow Brokers"** (likely named after a Mass Effect video game faction of information brokers) publishes a cache of files they claim are stolen NSA hacking tools. They offer to sell more via a Bitcoin auction.

The August 2016 release contains:
- A set of exploits targeting **Cisco, Juniper, and Fortinet** network devices
- An "Equation Group" folder containing tools
- A ransom demand of 1 million Bitcoin (approximately $568 million at the time)

The Bitcoin auction received essentially no bids. Analysts debate whether the dump is genuine — within days, Cisco confirms CVE-2016-6366 (EXTRABACON exploit) is real and patches are issued.

**Who are the Shadow Brokers?** Most analysts and former intelligence officials believe this was a **Russian intelligence operation** — specifically GRU or SVR — as a geopolitical message to the US during the height of the Russia/Clinton/Trump election interference controversy. The timing (released during the DNC hack allegations period) and the selective nature of what was published support this theory.

---

## October–December 2016 — Additional ShadowBrokers Releases

The Shadow Brokers publish additional material, including Windows exploitation tools. US intelligence agencies confirm privately (per later reporting) that the tools are genuine NSA capabilities.

Harold T. Martin III, an NSA contractor and former TAO employee, is arrested in August 2016 for hoarding classified documents and cyber tools at his home. He is not directly linked to the ShadowBrokers leak but the timing and nature of his collection are suspicious.

---

## April 14, 2017 — "Lost in Translation" — The Major Dump

On **Good Friday, April 14, 2017** the Shadow Brokers release their largest and most devastating cache: **"Lost in Translation"**. This release contains:

- `FUZZBUNCH` — Equation Group's internal Windows exploitation framework (like Metasploit)
- `DanderSpritz` — post-exploitation framework with GUI
- `EternalBlue` (MS17-010) — SMBv1 remote code execution exploit
- `EternalRomance` (MS17-013) — SMBv1 exploit
- `EternalChampion` (CVE-2017-0146) — SMBv1 exploit
- `EternalSynergy` (CVE-2017-0143) — SMBv1 exploit
- `DoublePulsar` — kernel-mode backdoor/implant injector
- `ExplodingCan` — IIS 6.0 remote code execution exploit
- Network device exploitation tools
- SWIFT/financial system exploitation scripts (`JEEPFLEA_MARKET`, `JEEPFLEA_POWDER`)
- A note mocking US intelligence agencies in broken English

**Microsoft's response**: Microsoft had actually patched MS17-010 (EternalBlue) on **March 14, 2017** — one month before the dump — in their regular Patch Tuesday. This has led to persistent speculation that Microsoft was tipped off by the NSA in advance of the planned release.

---

## May 12, 2017 — WannaCry

**WannaCry** ransomware detonates globally. Attributed to **Lazarus Group** (North Korea / DPRK). It uses `EternalBlue` + `DoublePulsar` as its propagation mechanism — taken directly from the ShadowBrokers April dump.

WannaCry encrypts files on hundreds of thousands of Windows machines in 150+ countries. Notable victims include the UK National Health Service (NHS), Spanish telecommunications company Telefónica, and dozens of other major organisations.

Damages are estimated at $4–8 billion globally.

---

## June 27, 2017 — NotPetya

**NotPetya** (initially misidentified as a ransomware variant of Petya) detonates globally. Attributed to **Sandworm** (GRU Unit 74455, Russia). NotPetya uses `EternalBlue` and `DoublePulsar` for lateral movement, plus a compromised Ukrainian accounting software update for initial distribution.

NotPetya causes approximately **$10 billion in damages** — the most financially destructive cyberattack ever recorded. Maersk, Merck, FedEx/TNT, Mondelēz, and dozens of others are severely impacted.

**The irony**: Tools built by the NSA to conduct intelligence operations were stolen, leaked, and then used by adversary nation-states to cause catastrophic collateral damage to US allies and US companies.

---

## 2017–2019 — Fallout and Attribution

- US DoJ indicts multiple Russian GRU officers in 2018 for NotPetya and election interference operations
- NSA Director Mike Rogers (and later acting directors) face congressional questions about the leak
- Congress investigates the security practices at NSA contractor firms
- Symantec, Malwarebytes, and ESET publish detailed technical analyses of the ShadowBrokers tools
- Metasploit incorporates EternalBlue as a module (making it trivially easy to exploit unpatched Windows machines)

---

## 2019 — Kaspersky: Evidence of Continued Activity?

Kaspersky publishes research suggesting that Equation Group-adjacent tooling may still be in use, referencing a new set of samples with code overlaps. However, this remains contested.

---

## 2020 — UEFI Implant Discovery

Security researchers at Kaspersky discover a UEFI implant called `MosaicRegressor` with code overlaps to older Equation Group UEFI capabilities. Attribution is uncertain but it suggests Equation Group techniques are being replicated or that the group adapted to UEFI-era systems.

---

## Key Dates Summary

| Date | Event |
|------|-------|
| ~1996 | Earliest assessed activity |
| ~2001 | EQUATIONDRUG platform deployed |
| 2007 | FANNY USB worm deployed (uses two zero-days later in Stuxnet) |
| 2009–2010 | Stuxnet (shared zero-days with Equation Group) |
| Dec 2013 | NSA ANT Catalogue published — describes IRATEMONK, SWAP |
| Feb 2015 | Kaspersky publishes Equation Group report |
| Aug 2016 | ShadowBrokers first release (network device exploits) |
| Apr 14, 2017 | ShadowBrokers "Lost in Translation" — EternalBlue, FUZZBUNCH, DanderSpritz |
| May 12, 2017 | WannaCry — uses EternalBlue (DPRK) |
| Jun 27, 2017 | NotPetya — uses EternalBlue (Russia/GRU Sandworm) |
