---
title: "TTP: UEFI Firmware Persistence"
slug: uefi-persistence
group: apt28
category: ttp
mitre_technique: T1542.001
mitre_technique_name: "Pre-OS Boot: System Firmware"
tags: [uefi, bios, firmware, rootkit, persistence, apt28, lojax, pre-os]
related_tools:
  - LoJax (primary tool)
---

# TTP: UEFI Firmware Persistence

**MITRE ATT&CK**: [T1542.001 — Pre-OS Boot: System Firmware](https://attack.mitre.org/techniques/T1542/001/)

> Firmware persistence represents the ultimate escalation of the attacker/defender asymmetry: the attacker survives anything short of reflashing the hardware. The defender cannot even detect it without specialised firmware analysis tools that most organisations don't have.

---

## What Is UEFI?

**UEFI (Unified Extensible Firmware Interface)** is the modern replacement for BIOS — the low-level firmware that runs when you press the power button, before any operating system loads.

UEFI's responsibilities:
- Hardware initialisation (RAM, CPU, storage controllers)
- Locating and loading the OS bootloader
- Providing runtime services to the OS
- Managing boot device order
- Configuring hardware settings

UEFI firmware is stored on a **small flash chip** soldered directly onto the motherboard. This chip is writable by design — UEFI updates need to be applied somehow.

---

## Why UEFI Persistence Is Uniquely Powerful

### The persistence hierarchy

```
Persistence layer     | Survives OS reinstall? | Survives disk wipe? | Removed by?
──────────────────────────────────────────────────────────────────────────────────
Registry/startup      | No                     | No                  | AV, OS tools
Scheduled task        | No                     | No                  | AV, OS tools
Driver/service        | No                     | No                  | AV, OS tools
WMI subscription      | No                     | No                  | Specialised tools
Bootloader (MBR/VBR)  | Sometimes              | No                  | Format + reinstall
──────────────────────────────────────────────────────────────────────────────────
UEFI firmware         | YES                    | YES                 | Firmware reflash
                      |                        |                     | or board replacement
──────────────────────────────────────────────────────────────────────────────────
```

From a threat actor's perspective: once you're in the firmware, you are **permanent** unless the defender knows what to look for and has the technical capability to remediate — which most do not.

### The incident response problem

A typical enterprise incident response workflow after a breach:
1. Identify compromised machines ✓
2. Isolate them ✓
3. **Reimage the OS** ← Standard remediation
4. Machine returned to service ✓

With UEFI persistence, step 3 **does not work**. The machine comes back online and the implant reinstalls itself within minutes.

An organisation that goes through a full remediation cycle without detecting the UEFI persistence will keep re-infecting themselves indefinitely.

---

## How APT28 Gets to Firmware: The LoJax Chain

APT28 uses a **three-tool chain** to read, modify, and write UEFI firmware:

### Tool 1: SedUploader — Initial Access

SedUploader (a Sofacy component) provides the initial foothold and elevates to administrator/SYSTEM privilege. This is prerequisite for UEFI access.

### Tool 2: UEFI Firmware Reader

APT28 uses a modified version of **RWEverything** — a legitimate Windows utility that provides direct hardware access — to read the existing UEFI firmware from the target machine's flash chip.

```
RWEverything (legitimate tool) capabilities:
  - Read/write CPU model-specific registers (MSRs)
  - Read/write PCI configuration space  
  - Read/write I/O ports
  - Read/write physical memory
  - ← Including reading the SPI flash chip where UEFI lives

APT28's use:
  RWEverything driver loaded (signed driver, passes Windows security)
  Custom userspace tool calls RWEverything to dump the UEFI flash
  
  Flash dump saved to: C:\[temp path]\fw_backup.bin
  (~4-16 MB depending on the system)
```

### Tool 3: UEFI Image Modifier

A custom APT28 tool that parses the UEFI firmware image format and injects the LoJax module:

```
UEFI firmware image structure (simplified):
  ┌─────────────────────────────────────────────────────┐
  │ UEFI Firmware Volume                                │
  │  ├── SEC phase (Security phase — hardware init)    │
  │  ├── PEI phase (Pre-EFI Initialization)           │
  │  └── DXE phase (Driver Execution Environment)     │
  │       ├── PciRootBridge.efi    (legitimate driver) │
  │       ├── DiskIoDxe.efi        (legitimate driver) │
  │       ├── [+50 more drivers]                       │
  │       └── ← APT28 injects LoJax.efi here          │
  └─────────────────────────────────────────────────────┘

APT28 tool steps:
  1. Parse firmware binary using UEFITool-like library
  2. Locate a DXE volume with sufficient free space
  3. Create a new DXE firmware file containing LoJax UEFI module
  4. Insert it into the DXE volume
  5. Recalculate and patch all checksums
  6. Write modified binary back to disk
```

### Writing the Modified Firmware

The most dangerous step: writing the modified firmware back to the flash chip using the same RWEverything-based tool.

**Risk**: If power is lost during the write, or if the write fails midway, **the machine is bricked** — the firmware is partially overwritten with corrupted data and the machine cannot boot.

```
Write process:
  1. Erase flash sector (SPI flash requires erase before write)
  2. Write modified firmware in sectors
  3. Verify write (read back and compare)
  4. Reboot
  
Each step must complete successfully.
If step 1 completes but machine loses power before step 2...
  → Machine attempts to boot from empty/erased firmware
  → Machine displays nothing; does not boot
  → Hardware is effectively dead without specialised recovery equipment
```

APT28 accepts this risk. For their highest-value targets, guaranteed long-term persistence is worth the possibility of (rarely) bricking a machine.

---

## LoJax at Runtime

After the modified firmware is written, LoJax runs on every boot **before Windows loads**:

```
Power on sequence:
  
  Hardware power-on
        ↓
  CPU starts executing UEFI firmware from flash chip
        ↓
  UEFI SEC phase: hardware initialisation
        ↓
  UEFI PEI phase: memory initialisation, platform setup
        ↓
  UEFI DXE phase: drivers loaded one by one
        ↓
  LoJax DXE module loads (looks like any other driver to UEFI)
        ↓
  LoJax hooks DXE services:
    RegisterProtocolNotify(gEfiDxeSmmReadyToLockProtocolGuid, ...)
    (hooks into OS handoff — runs code when Windows kernel is about to load)
        ↓
  Normal boot continues...
        ↓
  Windows bootloader loads
        ↓
  Windows kernel loads
        ↓
  (At the moment Windows is taking over hardware from UEFI):
  LoJax's hook fires — drops malware file to filesystem:
    C:\Windows\system32\[malware].exe
  Sets registry Run key for malware
        ↓
  Windows finishes loading
        ↓
  Malware runs (Sofacy variant)
        ↓
  APT28 has access — again
```

The key insight: LoJax runs **in the gap between firmware and OS**. Windows Defender, any EDR product, any AV — none of them are running when LoJax executes. By the time they start, LoJax has already done its work.

---

## Detection

### Why detection is hard

Standard security tools operate at the OS level. LoJax operates below the OS. This creates a fundamental detection gap:

- **AV/EDR**: Cannot scan firmware; only sees the OS-level artifacts LoJax drops
- **Windows Event Logs**: No log events for "UEFI module ran during boot"
- **Memory forensics**: RAM is wiped at boot; firmware modifications don't leave OS-level memory artifacts
- **Network monitoring**: Sofacy's C2 traffic looks like normal HTTPS

### Effective detection methods

**1. Firmware integrity checking**

```bash
# Compare current firmware to expected clean version

# Step 1: Extract current firmware
# Using chipsec (open-source UEFI security tool):
python chipsec_main.py -m tools.uefi.uefi_blacklist

# Or: use a vendor utility to dump the current flash
# Lenovo: Lenovo Diagnostics
# Dell: Dell SupportAssist

# Step 2: Compare to known-good firmware from vendor
# If firmware differs from vendor's official version for this model:
#   Investigate further
sha256sum current_firmware.bin vendor_firmware.bin
```

**2. CHIPSEC — The Standard Tool**

CHIPSEC is an open-source UEFI security framework from Intel that can:
- Check for write-protect bits being enabled/disabled
- Detect UEFI modules not in a whitelist
- Check for suspicious DXE drivers

```bash
# Run CHIPSEC to check for LoJax indicators:
python chipsec_main.py -m tools.uefi.lojax  # After ESET published indicators

# General UEFI integrity check:
python chipsec_main.py -m tools.uefi.s3script_modify  # Check S3 resume scripts
python chipsec_main.py -m common.bios_smi             # Check SMI handlers
```

**3. ESET's detection**

ESET added LoJax detection to their endpoint products after the public disclosure. Their scanner can identify the specific LoJax DXE module signature in firmware dumps.

### Post-detection remediation

If LoJax or similar UEFI modification is confirmed:

1. **Do not reimage OS** — it won't help
2. **Acquire full forensic image** including firmware dump
3. **Contact hardware vendor** — request clean firmware image for the exact model/revision
4. **Reflash firmware in offline environment**:
   - Use vendor's official firmware recovery tool
   - Or: JTAG programmer (hardware tool) for direct chip access
5. **Verify reflash** using CHIPSEC or firmware comparison
6. **Consider physical hardware replacement** for highest-security contexts (NSA, military, etc.)

---

## The Broader Implications

LoJax's public disclosure in 2018 changed the firmware security landscape:

1. **Firmware security became a C-suite concern** — previously only discussed in academic security research
2. **Hardware vendors accelerated UEFI security features**:
   - Intel Boot Guard (makes UEFI modification much harder)
   - AMD Platform Secure Boot
   - Microsoft Secured-Core PC requirements
3. **Enterprise security tooling gap exposed**: Most enterprises had zero visibility into firmware integrity; this began to change slowly post-LoJax
4. **Conceptual shift**: "Reimage and move on" is not sufficient remediation for sophisticated nation-state actors

The fact that APT28 deployed LoJax in the wild — not just developed it as a capability — indicates they believed the operational benefit was worth:
- The engineering cost of maintaining it
- The risk of public disclosure (which eventually happened)
- The risk of bricking high-value target hardware

This risk calculus speaks to how confident they were in the technique's value for long-term strategic access.

---

## References

- [ESET: LoJax — First UEFI rootkit found in the wild (2018)](https://www.welivesecurity.com/2018/09/27/lojax-first-uefi-rootkit-found-wild-courtesy-sednit-group/)
- [ESET: LoJax full technical paper (PDF)](https://www.welivesecurity.com/wp-content/uploads/2018/09/ESET-LoJax.pdf)
- [Intel CHIPSEC framework (GitHub)](https://github.com/chipsec/chipsec)
- [UEFI Forum: UEFI Specification](https://uefi.org/specifications)
- [Microsoft: Secured-Core PC requirements](https://www.microsoft.com/en-us/windowsforbusiness/windows-11-secured-core-pcs)
- [MITRE ATT&CK: T1542.001 — Pre-OS Boot: System Firmware](https://attack.mitre.org/techniques/T1542/001/)
