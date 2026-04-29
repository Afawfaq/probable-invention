---
title: "DoublePulsar — Kernel-Mode Backdoor Implant"
slug: doublepulsar
group: equation-group
category: implant
platform: Windows (XP through Server 2016)
source_available: true
source_url: https://github.com/misterch0c/shadowbroker
tags: [doublepulsar, kernel, backdoor, implant, shadowbrokers, ring0]
mitre_techniques:
  - T1014   # Rootkit
  - T1055   # Process Injection
  - T1106   # Native API
related_tools:
  - EternalBlue (installer)
  - FUZZBUNCH (delivery framework)
  - DanderSpritz (post-exploitation that uses DoublePulsar as its channel)
---

# DoublePulsar — Kernel-Mode Backdoor

---

## In One Paragraph

DoublePulsar is a **kernel-mode backdoor** installed by FUZZBUNCH exploit modules (primarily EternalBlue). It hooks the `SrvTransaction2DispatchTable` in `srv.sys` — the kernel driver handling SMBv1 — to intercept SMB packets with a specific "magic" `MultiplexID`. When it receives such a packet, it can **inject arbitrary shellcode or a DLL** into any running process at SYSTEM privilege. It lives entirely in kernel memory, writes nothing to disk, and leaves minimal forensic traces. After the ShadowBrokers April 2017 dump, DoublePulsar was detected on hundreds of thousands of internet-facing Windows machines within days.

---

## Architecture

### Where does it live?

DoublePulsar resides in **kernel memory** (`SYSTEM` space, Ring 0). It does not write files to disk. It does not create registry keys. It does not create new processes. It is a pure memory-resident implant.

```
User space (Ring 3)
────────────────────────────────────────────────────────
Kernel space (Ring 0)
  ┌──────────────────────────────────────────────────┐
  │  srv.sys — Windows SMBv1 kernel driver           │
  │                                                  │
  │  SrvTransaction2DispatchTable[]                  │
  │    [0]  → original handler                       │
  │    [1]  → original handler                       │
  │    ...                                           │
  │    [14] → *** HOOKED BY DOUBLEPULSAR ***          │
  │           ↓                                      │
  │    DoublePulsar hook function (in kernel memory) │
  └──────────────────────────────────────────────────┘
```

### How it intercepts communication

SMBv1 packets have a field called `MultiplexID` (sometimes called `MID`). Normal SMB communications set this to sequential integers.

DoublePulsar hooks `SrvTransaction2DispatchTable[14]` — the handler for `TRANS2_SESSION_SETUP` commands. When any SMB packet arrives:

1. If `MultiplexID != 0x0051` → pass through to the original handler (everything looks normal)
2. If `MultiplexID == 0x0051` → this is a DoublePulsar command packet

The "ping" command uses `MultiplexID = 0x0051`. A scanner can detect DoublePulsar infection simply by sending an SMB packet with this MID and checking if the response contains the DoublePulsar signature.

---

## Commands

DoublePulsar supports three commands, encoded in the `MultiplexID` and `Flags` fields of SMB packets:

| Command | MultiplexID | Description |
|---------|-------------|-------------|
| **Ping** | `0x0051` | Check if DoublePulsar is present. Returns a signature response. |
| **Exec shellcode** | `0x0051` + specific flags | Execute arbitrary shellcode in kernel context |
| **Inject DLL** | `0x0051` + different flags | Inject a DLL into a specified process (LSASS, winlogon, etc.) |

### The Ping handshake

Security researchers Dan Tentler and others published the DoublePulsar scanner within days of the dump. The ping works like this:

```python
# How to detect DoublePulsar (simplified)
# Send an SMBv1 Trans2 SESSION_SETUP request with MID=0x0051

def check_doublepulsar(ip, port=445):
    sock = socket.socket()
    sock.connect((ip, port))
    
    # Standard SMB negotiate
    negotiate(sock)
    
    # Build detection packet
    # The MID (MultiplexID) field = 0x0051
    # The SubCommand field triggers the hook check
    detection_packet = build_trans2_session_setup(
        multiplex_id=0x0051
    )
    sock.send(detection_packet)
    
    response = sock.recv(1024)
    
    # DoublePulsar signature: specific values in the response
    # Uninfected machine: standard SMB error response
    # DoublePulsar-infected: modified response with XOR key embedded
    
    if response[34:36] == b'\x51\x00':  # Signature in NativeOS field
        # Parse XOR key from response (used to encrypt DLL injection)
        xor_key = struct.unpack('<I', response[18:22])[0]
        print(f"[!] DoublePulsar DETECTED — XOR key: {hex(xor_key)}")
        return True, xor_key
    
    return False, None
```

### DLL injection

The most operationally useful command — inject a DLL into a running process:

```python
def inject_dll(ip, xor_key, dll_path, target_process="lsass.exe"):
    """
    Inject a DLL into a running process via DoublePulsar.
    
    The DLL payload is XOR-encrypted with the key received in the ping.
    This is a simple obfuscation — not strong crypto — just enough to
    avoid plaintext DLL signatures in network traffic.
    
    The injected DLL runs in the context of the target process,
    at whatever privilege level that process runs (LSASS = SYSTEM).
    """
    with open(dll_path, 'rb') as f:
        dll_data = f.read()
    
    # XOR encrypt the DLL payload with the key from the ping
    encrypted_dll = xor_encrypt(dll_data, xor_key)
    
    # Build injection packet
    # SubCommand tells DoublePulsar: "inject this DLL into [process]"
    injection_packet = build_dll_inject_packet(
        multiplex_id=0x0051,
        payload=encrypted_dll,
        process_name=target_process
    )
    
    sock = socket.socket()
    sock.connect((ip, 445))
    negotiate(sock)
    sock.send(injection_packet)
    
    # DoublePulsar injects the DLL into the specified process
    # The DLL's DllMain() is called in the context of that process
    # This gives the attacker code execution inside e.g. lsass.exe
```

---

## How DoublePulsar Is Installed

DoublePulsar is delivered via the FUZZBUNCH exploit modules. After EternalBlue (or another exploit) achieves kernel-level shellcode execution, the shellcode:

1. Writes DoublePulsar's hook code into kernel memory
2. Locates `srv.sys` in kernel memory
3. Patches `SrvTransaction2DispatchTable[14]` to point to the hook
4. Validates the hook is working (internal self-test)
5. Returns control — SMB service continues normally

No files are written. No registry changes. The only trace is in kernel memory.

---

## Survival and Persistence

**DoublePulsar does NOT survive reboots** on its own. It is memory-resident only. To persist:

1. The operator re-exploits after reboot (easy if the target hasn't patched EternalBlue)
2. A heavier, disk-resident implant is installed through DoublePulsar's DLL injection (e.g., DanderSpritz's `PeddleCheap` implant, or GRAYFISH for firmware-level persistence)
3. The operator uses DoublePulsar's DLL injection to install a classic service-based backdoor

In Equation Group operations, DoublePulsar was typically a **stepping stone** to installing longer-lived, stealthier implants.

---

## Detection

### Real-time scanning

Because DoublePulsar's "ping" is a distinctive SMB pattern, several detection tools were published within days of the April 2017 dump:

- **doublepulsar-detection-script** (Luke Jennings / BAE Systems): scans a single IP
- **Masscan + doublepulsar scanner**: scan-all-of-internet version
- **Shodan**: maintained a DoublePulsar scan; detected 200,000+ infected machines within weeks

### Host-based detection

- **Memory forensics**: Volatility Framework can detect the `SrvTransaction2DispatchTable` hook
  - `vol.py -f memory.dmp driverirp` — checks for hooked dispatch tables
  - `vol.py -f memory.dmp ssdt` — checks for SSDT hooks
- **ETW (Event Tracing for Windows)**: Some EDRs detect the hook via ETW kernel events
- **Rootkit scanners**: GMER, RootkitRevealer can detect driver dispatch table hooks

### Network detection

Snort/Suricata rule (simplified):

```
alert tcp any any -> any 445 (
    msg:"DoublePulsar SMB Ping";
    content:"|FF|SMB%";    # SMB magic + TRANS2_SESSION_SETUP
    byte_test:2,=,0x0051,38;  # MultiplexID == 0x0051
    sid:1000001;
)
```

---

## Scale of Infection (2017)

After the April 2017 dump, security researchers began scanning the internet for DoublePulsar. Findings were alarming:

- Within **72 hours**: ~36,000 infections detected (BinaryEdge scan)
- Within **2 weeks**: ~200,000+ infections (multiple researcher estimates)
- Within **1 month**: estimates ranged from 200,000 to 500,000 internet-facing machines

These were machines that had already been exploited — by NSA operators (historical) or by opportunistic actors running the public tools after the dump.

---

## Use in WannaCry

The WannaCry ransomware (attributed to Lazarus Group / DPRK) used this exact flow:

```
1. Scanner finds machine with port 445 open
2. EternalBlue exploits SMBv1 → kernel shellcode execution
3. Shellcode installs DoublePulsar kernel backdoor
4. DoublePulsar injects WannaCry DLL into lsass.exe or spoolsv.exe
5. WannaCry DLL: encrypts all user files, drops ransom note
6. WannaCry spreads: scans network for more port-445 hosts → repeat
```

DoublePulsar's DLL injection was the propagation mechanism — it's what allowed WannaCry to spread laterally across internal networks even if only one machine was directly exposed to the internet.

---

## References

- [zerosum0x0: DoublePulsar / EternalBlue ring-0 shellcode analysis](https://zerosum0x0.blogspot.com/2017/04/doublepulsar-initial-smb-backdoor-ring.html)
- [GitHub: zerosum0x0/doublepulsar-detection-script](https://github.com/zerosum0x0/doublepulsar-detection-script)
- [Countercept: DoublePulsar analysis (BAE Systems)](https://countercept.com/blog/doublepulsar-usermode-analysis-generic-reflective-dll-loader/)
- [Rapid7: DoublePulsar in Metasploit](https://www.rapid7.com/db/modules/exploit/windows/smb/ms17_010_eternalblue/)
- [Microsoft: MS17-010 patch](https://docs.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010)
