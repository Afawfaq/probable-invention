---
title: "DanderSpritz — NSA Post-Exploitation Framework"
slug: danderspritz
group: equation-group
category: framework
platform: Windows (operator and target)
source_available: true
source_url: https://github.com/misterch0c/shadowbroker
tags: [danderspritz, post-exploitation, framework, shadowbrokers, eventlog]
mitre_techniques:
  - T1059.003  # Windows Command Shell
  - T1070.001  # Clear Windows Event Logs
  - T1005      # Data from Local System
  - T1056.001  # Keylogging
  - T1113      # Screen Capture
  - T1016      # System Network Configuration Discovery
---

# DanderSpritz — Post-Exploitation Framework

> **"The NSA's Cobalt Strike"** — security industry shorthand, though DanderSpritz predates Cobalt Strike's public release

---

## What Is DanderSpritz?

DanderSpritz is the **post-exploitation framework** used by NSA/TAO operators after they've achieved initial access (typically via FUZZBUNCH + EternalBlue + DoublePulsar). Where FUZZBUNCH handles exploitation, DanderSpritz handles everything that comes after:

- Establishing a persistent, encrypted command-and-control channel to the implant
- Collecting data from the target (files, keystrokes, screenshots, network info)
- Moving laterally to other systems
- Escalating privileges
- **Cleaning up forensic evidence** — including surgically editing Windows Event Logs

DanderSpritz includes a **full graphical user interface** — a GUI-based control panel for operators managing multiple targets simultaneously.

---

## Architecture

```
[NSA Operator workstation]
      |
      | (DanderSpritz GUI / command interface)
      |
      ↓ (encrypted C2 channel — via DoublePulsar or direct implant)
      
[Compromised Windows target]
      |
      | DanderSpritz implant running as:
      | - PeddleCheap (lightweight plugin-based implant)
      | - Or via DoublePulsar DLL injection channel
      |
      ↓ plugin commands
      
[Data collection, lateral movement, etc.]
```

### Operator-side components

- **DanderSpritz.exe** — Main operator GUI (Java-based)
- **Command-line interface** — Alternative to GUI, same capabilities
- **Plugin manager** — Load/unload capability modules on live implants

### Target-side components

- **PeddleCheap** — The main implant; lightweight, plugin-based
- **EventLogEdit** — Standalone utility for surgical event log manipulation
- **Various shellcode loaders** — For memory-resident execution

---

## Key Capabilities

### 1. Encrypted C2 Channel

DanderSpritz communicates with the target over an encrypted channel. The protocol:
- Uses a custom protocol over TCP/UDP
- Supports tunnelling through legitimate services (HTTP, HTTPS, DNS)
- Can use DoublePulsar as the channel (SMB port 445 — blends into normal network traffic)
- Supports multiple concurrent operators on the same implant

### 2. Plugin System

All capabilities are delivered as plugins to the implant. This means:
- The implant on disk is tiny and featureless (small attack surface if discovered)
- Capabilities are loaded on-demand over the C2 channel
- An incident responder who captures the implant at the wrong moment sees no active capabilities

Available plugins (from the dump's manifest files):

| Plugin | Function |
|--------|----------|
| `KeyLogger` | Kernel-level keylogger; captures all keystrokes |
| `ScreenShot` | Full desktop screenshot |
| `FileManager` | Browse, upload, download files |
| `ProcessManager` | List, kill, inject into processes |
| `NetworkEnum` | Enumerate network shares, ARP cache, routing table |
| `RegistryManager` | Browse and modify Windows registry |
| `ClipboardLog` | Capture clipboard contents |
| `TokenStealer` | Steal authentication tokens from LSASS memory |
| `EventLogEdit` | Surgical Windows Event Log manipulation |
| `ShellExecute` | Run arbitrary commands |
| `ServiceManager` | Install, start, stop Windows services |
| `Lateral` | Move to adjacent systems via SMB/RDP/WMI |

### 3. EventLogEdit — The Crown Jewel

`EventLogEdit` is one of the most operationally significant components in DanderSpritz. It allows an operator to **surgically edit Windows Event Logs** — removing specific log entries while leaving the rest intact, so the log structure appears uncorrupted to casual inspection.

This is very different from "clearing the event log" (which itself generates an event 1102 "The audit log was cleared"). EventLogEdit removes specific events **without generating any clearing notification**.

#### How Windows Event Logs work (background)

Windows Event Logs (`.evtx` files) store log records in a binary format. Each record has:
- A record number (sequential)
- A timestamp
- Event ID
- Source/provider
- Event data

The `.evtx` format is a binary format with chunk headers, record descriptors, and an XML-like data section. Microsoft documented this format publicly.

#### How EventLogEdit works

```
Normal event log:
  Record 1001: [Login event — 08:00:00]
  Record 1002: [Login event — 08:30:00]
  Record 1003: [SMB connection from attacker IP — 09:15:00]  ← evidence
  Record 1004: [File access — 09:15:01]                      ← evidence
  Record 1005: [Network event — 09:30:00]
  
After EventLogEdit:
  Record 1001: [Login event — 08:00:00]
  Record 1002: [Login event — 08:30:00]
  Record 1005: [Network event — 09:30:00]
  (records 1003 and 1004 removed; record numbers renumbered to hide gap)
```

The tool:
1. Opens the `.evtx` file via a low-level driver interface (bypassing OS-level locking)
2. Parses the binary record format
3. Removes the target records
4. Recalculates checksums (`.evtx` has CRC32 checksums per chunk)
5. Renumbers records to fill gaps
6. Writes back — the log appears intact

#### EventLogEdit source (annotated, from the dump)

```python
# eventlogedit.py (simplified Python wrapper around a compiled component)
# The actual editing logic is in a compiled DLL/binary;
# this Python script is the operator-facing controller.

import subprocess
import struct

EVTX_HEADER_MAGIC = b'ElfFile\x00'  # Windows .evtx file magic bytes

def delete_record(log_path, record_id):
    """
    Delete a specific event log record by record ID.
    
    log_path: e.g. 'C:\\Windows\\System32\\winevt\\Logs\\Security.evtx'
    record_id: the record number to delete (from Get-WinEvent output)
    
    This calls the compiled EventLogEdit.exe with the target parameters.
    The compiled binary handles the binary .evtx format manipulation.
    """
    
    # The compiled tool takes: log_path, record_id
    # It:
    # 1. Opens the .evtx file via NtCreateFile (kernel bypass for locked files)
    # 2. Parses chunk headers and record offsets
    # 3. Zeroes out the target record
    # 4. Recalculates the chunk CRC32
    # 5. Renumbers subsequent records
    # 6. Closes file
    
    cmd = ['EventLogEdit.exe', log_path, str(record_id)]
    result = subprocess.run(cmd, capture_output=True)
    
    if result.returncode == 0:
        print(f"[*] Record {record_id} deleted from {log_path}")
    else:
        print(f"[!] Failed: {result.stderr}")
```

**Why this matters**: This capability means that an Equation Group operation that used EventLogEdit leaves **no forensic trace in Windows Event Logs** — the primary source of evidence investigators use in incident response. This significantly raises the cost of attribution and incident reconstruction.

---

## Operational Workflow

A typical DanderSpritz session after EternalBlue + DoublePulsar:

```
[Operator in DanderSpritz GUI]

1. Connect to DoublePulsar on target
   > connect 192.168.1.50 via DoublePulsar

2. Load the PeddleCheap implant into a legitimate process
   > inject PeddleCheap into lsass.exe

3. Run initial recon
   > run NetworkEnum
   [DanderSpritz returns: ARP table, open shares, routing info]
   > run ProcessManager
   [Returns: running processes, owners, command lines]

4. Collect credentials
   > run TokenStealer
   [Dumps NTLM hashes and Kerberos tickets from LSASS memory]

5. Collect data
   > run FileManager
   > download C:\Users\Administrator\Documents\sensitive.docx
   > run KeyLogger start
   > run ScreenShot

6. Move laterally
   > run Lateral --target 192.168.1.51 --method SMB --credential [stolen NTLM]
   [Pivots to adjacent machine using stolen credentials]

7. Clean up
   > run EventLogEdit Security.evtx --delete-since [start of operation]
   > run EventLogEdit System.evtx --delete-since [start of operation]
   
   [Evidence removed from logs]
   
8. Option A: Leave PeddleCheap running for persistent access
   Option B: Remove all traces and re-exploit next time needed
```

---

## The GUI

Unlike FUZZBUNCH (pure command-line), DanderSpritz features a **Java Swing GUI** — suggesting the tool was designed for operators managing multiple targets, not just running single operations.

The GUI provides:
- **Target list** — all active implant connections
- **Plugin console** — point-and-click plugin loading/execution
- **File browser** — graphical browse of target filesystem
- **Log viewer** — output from running plugins
- **Session history** — record of all actions taken (local only — never sent anywhere)

The existence of a GUI tells us something about how TAO operated at scale: they weren't just running one-off attacks. They were managing ongoing implant infrastructure across many targets simultaneously.

---

## References

- [GitHub: misterch0c/shadowbroker — DanderSpritz](https://github.com/misterch0c/shadowbroker)
- [Countercept: DanderSpritz analysis (BAE Systems, 2017)](https://countercept.com/blog/danderspritz-analysed/)
- [Symantec: Inside the NSA's Windows tools (2017)](https://symantec-enterprise-blogs.security.com/blogs/threat-intelligence/shadowbrokers-windows-exploits)
- [F-Secure: EventLogEdit analysis (2019)](https://labs.f-secure.com/blog/nsa-eventlogger-detection/)
