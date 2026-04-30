---
title: "TTP: Firmware Persistence (HDD / BIOS / UEFI)"
slug: firmware-persistence
group: equation-group
category: ttp
mitre_technique: T1542.002
mitre_technique_name: "Pre-OS Boot: Component Firmware"
tags: [firmware, persistence, hdd, bios, uefi, grayfish, iratemonk]
---

# TTP: Firmware Persistence

**MITRE ATT&CK**: [T1542.002 — Pre-OS Boot: Component Firmware](https://attack.mitre.org/techniques/T1542/002/)

---

## What Is Firmware Persistence?

Firmware persistence means hiding malware in the **low-level firmware** of a hardware device — the software embedded in hardware chips that runs before the operating system. Because firmware runs before the OS, traditional security tools (antivirus, EDR, etc.) are loaded too late to detect or prevent it.

Key property: **firmware persists through OS reinstallation**. You can wipe and reinstall Windows, and firmware-resident malware survives.

---

## The Persistence Hierarchy

Think of a computer's startup sequence as layers. Each layer runs before the next. Malware at a deeper layer survives the removal of malware at higher layers:

```
Layer 0: Hardware (CPU microcode, chipset firmware)
  ↕ hardest to modify; microcode updates exist but rarely deployed
  
Layer 1: BIOS / UEFI firmware (motherboard)
  ↕ runs before OS; UEFI implants documented in the wild (2018+)
  
Layer 2: HDD / SSD / NVMe firmware
  ↕ controls storage; Equation Group's GRAYFISH/IRATEMONK lived here
  
Layer 3: Bootloader (GRUB, Windows Boot Manager)
  ↕ bootkits live here; survives OS reinstall if MBR infected
  
Layer 4: OS kernel
  ↕ rootkits live here; survive user-mode security tools
  
Layer 5: OS user space (applications)
  ↕ standard malware lives here; removed by AV/reinstall
  
Layer 6: Application-level persistence (registry, scheduled tasks)
         most common; removed by AV or clean reinstall
```

The deeper the layer, the more persistent — and the more difficult to achieve.

Equation Group was operating at **Layer 2 (HDD firmware)** — a capability that had never been publicly documented before 2015.

---

## HDD Firmware Persistence (GRAYFISH / IRATEMONK)

See [GRAYFISH](../malware/grayfish.md) for full technical detail.

### The core technique

1. Read the current HDD firmware from the drive's flash chip via ATA commands
2. Patch the firmware to add:
   - A hidden storage area (sectors not reported to OS)
   - A hook that intercepts ATA commands to access the hidden area
   - A re-infection routine (reinstall implant in OS on boot)
3. Write the patched firmware back to the drive's flash chip
4. Drive now has persistent, invisible malware storage and re-infection capability

### ATA commands used

Modern ATA (Advanced Technology Attachment) drives support vendor-specific commands via `SET MAX ADDRESS` (HPA — Host Protected Area) and `DEVICE CONFIGURATION OVERLAY (DCO)` — features designed for legitimate purposes (like hiding recovery partitions) that can be abused to create hidden storage.

```
Standard ATA command flow for HPA:

  IDENTIFY DEVICE → reveals total sectors (including any hidden)
  SET MAX ADDRESS → sets the "visible" max sector (hides sectors above this value)
  READ NATIVE MAX → reveals the true sector count (including hidden)
  
Equation Group's approach (simplified):
  1. Use READ NATIVE MAX to get the true drive size
  2. Use SET MAX ADDRESS to create a "hidden" area
  3. Write malware to sectors in the hidden area
  4. Firmware modification ensures these sectors survive even if HPA is reset
```

### Why firmware modification specifically?

The HPA trick alone is detectable (forensic tools check for HPA). GRAYFISH's sophistication is that it **modifies the firmware itself** — so the hidden area isn't just a software configuration that can be reset; it's baked into how the drive's controller operates. Even running `hdparm --dco-restore` (which would normally reset drive configuration to factory defaults) doesn't work if the firmware has been modified.

---

## BIOS Persistence (SWAP)

The **NSA ANT Catalogue** describes `SWAP` — a BIOS implant that:
- Modifies the PC's BIOS firmware chip (on the motherboard)
- Persists through OS reinstallation (BIOS is independent of OS)
- Loads malware from the hard drive on each boot
- Survives physical hard drive replacement (the BIOS is on the motherboard, not the drive)

BIOS implants documented in the wild (non-Equation Group):
- LoJax (APT28/Fancy Bear, 2018) — first confirmed UEFI rootkit
- Computrace/LoJack abuse

### UEFI (modern BIOS replacement)

Modern computers use **UEFI** (Unified Extensible Firmware Interface) instead of traditional BIOS. UEFI:
- Is more complex and feature-rich than BIOS
- Has **Secure Boot** — a feature that validates the OS bootloader's cryptographic signature before running it
- Stores firmware in larger flash chips with more space for sophisticated implants
- Has a documented structure (unlike old BIOS) which makes both legitimate development AND attack easier

UEFI implants discovered publicly (all post-GRAYFISH):

| Implant | Actor | Year | Notes |
|---------|-------|------|-------|
| LoJax | APT28 (Russia/GRU) | 2018 | First confirmed in-the-wild UEFI rootkit |
| MosaicRegressor | Unknown (China?) | 2020 | Code overlaps with Equation Group's VECTOR-EDK UEFI framework |
| CosmicStrand | Chinese APT | 2021 | UEFI bootkit for Gigabyte/ASUS motherboards |
| BlackLotus | Criminal (then state-linked) | 2022 | UEFI bootkit that bypasses Windows Secure Boot |

Equation Group's VECTOR-EDK UEFI framework was included in the ShadowBrokers dump, suggesting they had UEFI capabilities developed before any other actor had publicly deployed one.

---

## Detection and Mitigation

### Detection approaches

| Method | Effectiveness | Notes |
|--------|-------------|-------|
| OS-level AV/EDR | ❌ None | Implant runs before AV |
| Boot-time scanning | ⚠️ Limited | Can detect some hooks; misses sophisticated firmware mods |
| Firmware integrity checking | ✅ Good | Compare firmware hash against known-good; hard operationally |
| Hardware-level analysis | ✅ Best | JTAG, chip-off analysis; requires physical access and expertise |
| Memory forensics | ⚠️ Limited | Can detect OS-level hooks from firmware implant |

### Mitigations

1. **Enable UEFI Secure Boot** — validates bootloader integrity; doesn't prevent all firmware implants but raises the bar significantly
2. **BIOS/UEFI password** — prevents attackers from reflashing firmware through OS-level tools (requires physical access to change BIOS settings)
3. **Firmware updates** — keep UEFI/BIOS firmware updated (vendors patch known firmware vulnerabilities)
4. **Verified Boot** (enterprise) — some enterprise hardware supports full boot chain verification
5. **Hardware Security Module (HSM)** — for critical systems, cryptographic verification of boot chain
6. **Physical security** — firmware implants often require either OS-level privilege to install (via firmware update tools) OR physical access. Physical security reduces the latter vector.

---

## Nation-State Use

Firmware persistence is almost exclusively a nation-state technique because:

1. **Requires vendor-specific knowledge** — each drive/motherboard vendor has proprietary firmware architecture; significant reverse engineering or insider access is required
2. **High development cost** — building a firmware implant for a specific hardware model is weeks or months of work
3. **Risky** — a firmware bug can brick the device (make it permanently unusable), burning the operation
4. **Overkill for most purposes** — criminal and lower-tier actors don't need this level of persistence; standard methods work

Known users:
- Equation Group (NSA/TAO) — GRAYFISH, IRATEMONK (HDD), SWAP (BIOS), VECTOR-EDK (UEFI)
- APT28/Fancy Bear (GRU) — LoJax (UEFI, 2018)
- Chinese APTs — CosmicStrand, MosaicRegressor (UEFI, 2021+)

---

## References

- [Kaspersky: HDD firmware hacking analysis (2015)](https://securelist.com/equation-group-questions-and-answers/)
- [MITRE ATT&CK T1542.002](https://attack.mitre.org/techniques/T1542/002/)
- [ESET: LoJax — first UEFI rootkit (2018)](https://www.welivesecurity.com/2018/09/27/lojax-first-uefi-rootkit-found-wild-courtesy-sednit-group/)
- [Kaspersky: MosaicRegressor UEFI bootkit (2020)](https://securelist.com/mosaicregressor/98849/)
- [NSA ANT Catalogue — IRATEMONK, SWAP](https://www.spiegel.de/international/world/the-nsa-uses-powerful-toolbox-in-effort-to-spy-on-global-networks-a-940969.html)
- [ATA HPA / DCO specification](https://www.t13.org/)
