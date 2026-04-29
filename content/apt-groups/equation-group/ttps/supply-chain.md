---
title: "TTP: Supply Chain Interdiction"
slug: supply-chain
group: equation-group
category: ttp
mitre_technique: T1195
mitre_technique_name: "Supply Chain Compromise"
tags: [supply-chain, hardware, interdiction, cottonmouth, firewalk, ant-catalogue]
---

# TTP: Supply Chain Interdiction

**MITRE ATT&CK**: [T1195 — Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)

---

## What Is Supply Chain Interdiction?

Supply chain interdiction means **compromising a target's hardware or software before it reaches them** — by intercepting it during shipping, or compromising it at the manufacturer/distributor level.

This is a uniquely powerful technique because:
1. The device arrives looking completely normal — no software exploit needed
2. The implant is embedded in hardware or firmware, below the OS
3. Even a sophisticated target who receives a "new, in-box" device may be compromised
4. Attribution is extremely difficult — the attack happened before the target took possession

---

## NSA Hardware Interdiction

The **NSA ANT Catalogue** (leaked December 2013, Der Spiegel) describes several **physical hardware implants** developed for supply chain interdiction:

### COTTONMOUTH

> "A family of modified USB connectors that can be used to inject ethernet packets or to provide a radio frequency (RF) link."

COTTONMOUTH is a **hardware-modified USB connector** — it looks exactly like a standard USB plug but contains:
- A miniaturised wireless transceiver (RF)
- A small processor
- Flash storage

When plugged into a target computer (or built into a computer's USB port), COTTONMOUTH:
- Establishes an RF communications link with a nearby receiver
- Can receive commands and send data over the RF link
- Can inject data into the computer via the USB interface

Variants:
- **COTTONMOUTH-I**: Modified USB plug
- **COTTONMOUTH-II**: Modified USB socket (for installation on a motherboard)
- **COTTONMOUTH-III**: Modified Ethernet/USB combo (RJ45 + USB)

### FIREWALK

> "A device that looks identical to a standard RJ45 gigabit Ethernet network jack but provides covert 802.11 wireless capability."

FIREWALK is a **hardware-modified Ethernet jack** containing a concealed WiFi transceiver. It's built into a standard RJ45 housing.

Installed in a target's network infrastructure (server, patch panel), it provides a covert wireless channel that bypasses all wired network monitoring.

### DIETYBOUNCE

> "Provides software persistence on Dell PowerEdge servers via the motherboard BIOS."

DIETYBOUNCE is a **BIOS implant for Dell servers** — pre-installed (via supply chain) in the server's BIOS chip. When the server boots, DIETYBOUNCE reinstalls a software implant.

### SIERRAMONTANA

Similar to DIETYBOUNCE but for IBM servers.

### HOWLERMONKEY

A miniaturised RF transceiver that can be implanted in various devices — providing a covert wireless channel for data exfiltration or command reception.

---

## How Interdiction Works Operationally

The NSA ANT Catalogue describes the delivery mechanism for these hardware implants:

> "If NSA has access to the shipping networks for computer equipment, they can arrange to intercept and examine packages containing computer equipment before it reaches its destination."

**The process (as described by journalists and former officials)**:

```
1. Target orders computer equipment (server, laptop, router, etc.)
2. NSA intelligence indicates this equipment is bound for a high-value target
3. NSA coordinates with FedEx/UPS/USPS (via legal process or black program)
4. Package is diverted to an NSA facility ("black site")
5. Devices opened, modified (hardware implant installed)
6. Package resealed with identical packaging
7. Package continues to destination — target receives it "in box"
8. Target unboxes device, no sign of tampering
9. Device immediately reports to NSA infrastructure
```

This process is described in documents leaked by Snowden and reported by journalists including Glenn Greenwald (who described seeing images of NSA technicians working on interdicted equipment).

---

## Software Supply Chain Attacks

While the ANT Catalogue focuses on hardware, supply chain attacks also apply to **software**:

### Vendor source code access

NSA may have obtained access to vendor source code (through legal process, espionage, or insider placement) to:
- Understand firmware architecture (enabling GRAYFISH for multiple HDD vendors)
- Identify vulnerabilities to exploit
- Insert backdoors before firmware is shipped

### The Juniper ScreenOS backdoor

In December 2015, Juniper discovered **unauthorised code** in its ScreenOS firmware that:
1. Changed the Diffie-Hellman P constant to one with known backdoor properties (DUAL_EC_DRBG)
2. Added a hardcoded SSH administrative password

Research by Ralf-Philipp Weinmann and others concluded:
- The DH constant change was likely NSA (they pushed for DUAL_EC_DRBG adoption through NIST and had used similar constants in other backdoors)
- The hardcoded password was likely added by a **third party** (not Juniper, not NSA) — possibly China or another nation-state that discovered NSA's modifications and added their own

This represents a **supply chain compromise of a supply chain compromise** — a third state piggybacking on NSA's Juniper access.

### The CD-ROM distribution attack (Equation Group)

The Kaspersky report documented a targeted supply chain attack specific to Equation Group:

> An attendee at a Middle Eastern security conference received a CD-ROM with conference materials. The CD contained Equation Group malware. The compromise occurred at the physical distribution point — the conference organisers (or someone with access to the production process) distributed infected conference materials.

This is a micro-scale supply chain attack: compromise the media at the production/distribution stage, not during shipping.

---

## Notable Real-World Supply Chain Attacks

### SolarWinds / SUNBURST (2020, Cozy Bear / SVR Russia)

The most consequential software supply chain attack ever discovered. The Russian SVR intelligence service:
1. Compromised SolarWinds' build environment (the systems used to compile their Orion software)
2. Inserted malware (`SUNBURST`) into the legitimate Orion build process
3. SolarWinds distributed Orion updates to ~18,000 customers — including US Treasury, DHS, State Department, Fortune 500 companies
4. SUNBURST called home to Russian C2 infrastructure

This wasn't an exploit — it was a supply chain compromise. The installed software was legitimately signed by SolarWinds with their valid certificate.

### 3CX Desktop App (2023, Lazarus Group / DPRK)

North Korean actors compromised 3CX's build environment and distributed malicious versions of their VoIP desktop application — similarly signed with 3CX's legitimate certificate.

### XZ Utils / liblzma backdoor (2024)

A sophisticated multi-year social engineering attack on an open-source maintainer of the `xz` compression library. The attacker (likely a nation-state) gradually gained trust as an open-source contributor over 2 years, then inserted a backdoor into xz/liblzma that would have compromised systemd-based SSH servers on Linux if distributed widely. Discovered by accident before reaching most distributions.

---

## Detection and Defence

Supply chain attacks are among the hardest to detect because:
- The attack occurs before the target takes possession
- Implants are below the OS
- Legitimate vendor signatures may still be valid (for software supply chain)

### Hardware controls

- **Hardware attestation** — modern TPM chips can cryptographically verify hardware integrity; if the firmware hash doesn't match the expected value, attestation fails
- **Tamper-evident packaging** — high-security hardware uses void stickers, tamper-evident bags
- **Direct-from-vendor procurement** — reduce intermediaries in the supply chain
- **In-house hardware inspection** — for very high security, inspect hardware before deployment

### Software controls

- **Build environment security** — harden and monitor the systems used to compile software
- **Reproducible builds** — compile the same source code multiple times on isolated systems; compare outputs
- **Code signing + transparency logs** — make it easier to detect if signing keys are misused
- **Software Bill of Materials (SBOM)** — track all components in software supply chains
- **Binary analysis** — compare distributed binaries against source-compiled binaries

---

## References

- [NSA ANT Catalogue — Der Spiegel (2013)](https://www.spiegel.de/international/world/the-nsa-uses-powerful-toolbox-in-effort-to-spy-on-global-networks-a-940969.html)
- [Glenn Greenwald: No Place to Hide — NSA hardware interdiction (2014)](https://www.amazon.com/No-Place-Hide-Snowden-Surveillance/dp/1627790748)
- [Juniper ScreenOS backdoor analysis (2015)](https://kb.juniper.net/JSA10713)
- [ESET: SolarWinds SUNBURST analysis (2020)](https://www.welivesecurity.com/2020/12/17/sunburst-supply-chain-attack-solarwinds/)
- [MITRE ATT&CK T1195 — Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)
- [CISA: Software Supply Chain Security guidance](https://www.cisa.gov/topics/software-supply-chain-security)
- [Kaspersky: CD-ROM distribution attack (2015)](https://securelist.com/equation-the-death-star-of-malware-galaxy/68750/)
