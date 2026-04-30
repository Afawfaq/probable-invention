---
title: "FUZZBUNCH — NSA's Windows Exploitation Framework"
slug: fuzzbunch
group: equation-group
category: framework
platform: Windows
source_available: true
source_url: https://github.com/misterch0c/shadowbroker
tags: [fuzzbunch, framework, windows, exploitation, shadowbrokers]
cves: []
mitre_techniques:
  - T1203  # Exploitation for Client Execution
  - T1210  # Exploitation of Remote Services
  - T1190  # Exploit Public-Facing Application
---

# FUZZBUNCH — NSA's Windows Exploitation Framework

> **Type**: Exploitation Framework  
> **Platform**: Windows (operator console); attacks Windows targets  
> **Source**: ShadowBrokers "Lost in Translation" dump, April 14, 2017  
> **Analogy**: Think Metasploit, but built internally by NSA/TAO specifically for their operational requirements

---

## What Is FUZZBUNCH?

FUZZBUNCH is the **primary Windows exploitation framework** used by NSA Tailored Access Operations. It is a Python-based, plugin-driven framework for:

1. **Selecting and configuring exploits** against target systems
2. **Delivering payloads** (including DoublePulsar) to compromised systems
3. **Managing the attack workflow** from initial access to implant installation
4. **Tracking active operations** with session management

It is functionally analogous to [Metasploit Framework](https://www.metasploit.com/), but purpose-built for NSA operations and significantly more opinionated about operational security.

---

## Architecture Overview

FUZZBUNCH is structured as a command-line framework (no GUI — that's DanderSpritz's job post-exploitation) with a plugin system:

```
fuzzbunch/
├── fb.py                    # Main entry point — the FUZZBUNCH console
├── fuzzbunch/
│   ├── fb.py                # Core framework class
│   ├── session.py           # Session/state management
│   ├── plugin.py            # Base plugin class
│   ├── target.py            # Target host configuration
│   ├── network.py           # Network configuration (redirectors, proxies)
│   └── config/
│       └── *.xml            # XML configuration files for each plugin
├── payloads/
│   └── (shellcode payloads — binary)
└── Resources/
    └── (exploit modules, XML configs)
```

### Plugin system

Every exploit, payload, and utility in FUZZBUNCH is a **plugin**. Plugins are Python classes that inherit from a base `Plugin` class. Each plugin has:
- An XML configuration file specifying parameters, types, and defaults
- A Python implementation class with `run()`, `configure()`, and `validate()` methods
- Help text written for NSA operators (revealing the operational context)

### XML configuration example (annotated)

A typical plugin config (from the ETERNALBLUE plugin XML):

```xml
<!-- Each plugin has a NetworkTimeout — operators set this based on how 
     noisy they want to be. Short timeouts = less chance of detection 
     but more chance of failure. -->
<param name="NetworkTimeout" type="integer" required="true">
    <default>60</default>
    <help>Seconds to wait for network responses</help>
</param>

<!-- TargetPort: EternalBlue targets SMB, which runs on port 445 
     (or 139 for legacy NetBIOS) -->
<param name="TargetPort" type="integer" required="true">
    <default>445</default>
    <help>Target SMB port. Default 445.</help>
</param>

<!-- MaxExploitAttempts: NSA operators would typically keep this low 
     to avoid generating obvious error logs on the target -->
<param name="MaxExploitAttempts" type="integer" required="true">
    <default>3</default>
    <help>Number of exploit attempts before giving up</help>
</param>
```

---

## How FUZZBUNCH Works — Step by Step

### 1. Start a session

```
python fb.py
                         _________
                        |  LOCAL  |
                        |         |
     [Operator laptop]  |  PROXY  |
                        |_________|
                             |
                    [Redirector / Hop]
                             |
                    [Target network]
```

On launch, FUZZBUNCH asks the operator to set up:
- **Target IP** — the machine being attacked
- **Callback IP/Port** — where the implant should call back to (typically a redirector, not the operator's real IP — operational security)
- **Project name** — for session tracking

```
Welcome to FuzzBunch 2.0.0
Enter Target IP Address: [operator types 192.168.1.50]
Enter Callback IP Address: [operator types their redirector]
Enter Callback Port: [operator types their listener port]
[*] Created project: OPERATION-XYZ
```

### 2. Use a plugin (exploit)

```
fb > use EternalBlue
[EternalBlue] >
[EternalBlue] > set NetworkTimeout 60
[EternalBlue] > set TargetPort 445
[EternalBlue] > run
```

### 3. Chain with a payload

After a successful exploit, FUZZBUNCH typically chains `DoublePulsar` as the payload — planting a kernel-mode backdoor into the target:

```
[EternalBlue] > run
[*] Exploit successful — shellcode executed
[*] Installing DoublePulsar...
[DoublePulsar] > Backdoor installed at kernel level
[*] Session established
```

### 4. Hand off to DanderSpritz

With DoublePulsar installed, the operator switches to `DanderSpritz` for post-exploitation: keylogging, file collection, lateral movement, etc.

---

## Key Technical Characteristics

### Redirector architecture

FUZZBUNCH is designed around **operational security via redirectors**. The tool never expects the operator to connect directly from their workstation to the target. Instead:

```
Operator workstation
        ↓ (encrypted)
Redirector 1 (VPS in a neutral country)
        ↓
Redirector 2 (another hop)
        ↓
Target machine
```

The framework has explicit fields for "Callback IP" vs "Listen IP" — the target implant calls back to a redirector, not to the operator's real IP.

### Session persistence

FUZZBUNCH stores session state in XML files, allowing an operation to be resumed across multiple sessions. This reflects the reality that APT operations span days, weeks, or months — operators need to pick up where they left off.

### Verbose operational help text

One of the most revealing aspects of FUZZBUNCH is the **help text written for NSA operators**. Unlike commercial tools (which document the security community), this text reveals how TAO operators thought about their work:

Example (paraphrased from plugin XML):
> "Use this if the target has SMB signing disabled. Verify this with [another tool] first. If SMB signing is enabled, this exploit will fail and may generate event log entries."

This reflects a sophisticated operational security mindset — operators were instructed to verify preconditions to minimise forensic traces.

---

## Plugin Inventory

Complete list of FUZZBUNCH plugins from the dump:

### Exploits
| Plugin | Target | Description |
|--------|--------|-------------|
| `EternalBlue` | Windows SMBv1 | MS17-010 — Remote code execution |
| `EternalRomance` | Windows SMBv1 | MS17-013 — Remote code execution |
| `EternalChampion` | Windows SMBv1 | CVE-2017-0146 — RCE |
| `EternalSynergy` | Windows SMBv1 | CVE-2017-0143 — RCE |
| `ExplodingCan` | IIS 6.0 | CVE-2017-7269 — WebDAV RCE |
| `EmeraldThread` | Windows SMBv1 | CVE-2010-2567 — older RCE |
| `EclipsedWing` | Windows SMBv1 | CVE-2008-4250 (MS08-067) |
| `EducatedScholar` | Windows SMBv2 | CVE-2009-3103 |
| `ErraticGopher` | Windows SMBv1 | CVE-2017-0176 — pre-Vista |
| `EsikmoRoll` | Windows Kerberos | Kerberos checksum exploit |
| `EnglishmansDentist` | Mail servers | SMTP implant delivery |
| `EwokFrenzy` | Windows SMBv1 | SMB transaction exploit |
| `EmphasisMine` | IMAP servers | Remote IMAP exploit |

### Payloads / Implants
| Plugin | Description |
|--------|-------------|
| `DoublePulsar` | Kernel-mode backdoor; injected by exploit modules |
| `PeddleCheap` | Lightweight RAT plugin |

### Utilities
| Plugin | Description |
|--------|-------------|
| `Touch` | Modify file timestamps on target (anti-forensics) |
| `GetAdmin` | Escalate to SYSTEM privileges |
| `EstablishedConnection` | Verify connection to implant |
| `FixedList` | List files on target via implant |

---

## Annotated Source Code — Key Files

### `fb.py` — Framework Entry Point

```python
# ============================================================
# fb.py — FUZZBUNCH main entry point
# This is what the NSA operator runs to start a session.
# ============================================================

import sys
import os
# Note: uses Python 2 (the dump requires Python 2.6/2.7)
# This is consistent with the vintage of the tooling — Python 3
# migration was still not universal in enterprise tooling ~2013-2016

from fuzzbunch import fb as fuzzbunch

if __name__ == '__main__':
    # The framework is instantiated with a "project directory"
    # where session state (XML files) will be stored.
    # This allows operators to save/restore state between sessions.
    
    fb = fuzzbunch.Fuzzbunch(
        listeningPost=sys.argv[1] if len(sys.argv) > 1 else None
    )
    fb.cmdloop()   # Enters the cmd.Cmd command loop — standard Python
                   # interactive shell pattern
```

### `plugin.py` — Plugin Base Class (simplified, annotated)

```python
# ============================================================
# plugin.py — Base class all exploits/payloads inherit from
# ============================================================

class Plugin(object):
    """
    Base plugin class. All FUZZBUNCH plugins (exploits, payloads,
    utilities) inherit from this.
    
    The XML config file for each plugin defines:
    - Parameter names and types
    - Default values
    - Help text (written for NSA operators — reveals operational context)
    
    This architecture mirrors commercial frameworks like Metasploit's
    module system, but predates the public FUZZBUNCH release by years.
    """
    
    def __init__(self, config_path):
        # Load plugin configuration from XML
        # Each plugin has a matching .xml file specifying its parameters
        self.config = self._load_config(config_path)
        self.params = {}
    
    def set(self, param_name, value):
        """
        Set a parameter value. Called when the operator types:
            [PluginName] > set ParameterName value
        
        Validates the value against the type specified in the XML config.
        """
        if param_name not in self.config['params']:
            raise ValueError(f"Unknown parameter: {param_name}")
        self.params[param_name] = self._validate(param_name, value)
    
    def run(self):
        """
        Execute the plugin. Subclasses override this.
        Returns a Result object indicating success/failure.
        """
        raise NotImplementedError
    
    def _load_config(self, path):
        # XML config loading — uses standard ElementTree
        # Config specifies parameters, types, defaults, help text
        import xml.etree.ElementTree as ET
        tree = ET.parse(path)
        ...
```

---

## Operational Security Observations

Reading through FUZZBUNCH reveals how NSA operators were trained to think about OpSec:

1. **Always use redirectors** — the framework has first-class support for multi-hop proxy chains. Operators were expected to never connect directly.

2. **Validate before exploiting** — plugins include pre-checks (e.g. "is SMB signing disabled?") to avoid generating noisy failures.

3. **Minimise footprint** — plugins have configurable timeouts and attempt counts, with defaults tuned to avoid generating error logs.

4. **Session tracking** — operations are logged locally (not to any central server) in project XML files. This is operationally prudent — no central logging means no single point of compromise for operation records.

5. **Anti-forensics built in** — the `Touch` utility to modify file timestamps is a standard part of the toolkit.

---

## References

- [misterch0c/shadowbroker (GitHub)](https://github.com/misterch0c/shadowbroker) — full FUZZBUNCH source
- [x0rz/EQGRP (GitHub)](https://github.com/x0rz/EQGRP) — organised dump mirror
- [Symantec ShadowBrokers analysis (2017)](https://symantec-enterprise-blogs.security.com/blogs/threat-intelligence/shadowbrokers-equation-group-tools)
- [Ars Technica: "Shadow Brokers dump" deep-dive (2017)](https://arstechnica.com/information-technology/2017/04/nsa-linked-shadow-brokers-just-dumped-its-most-damaging-release-yet/)
