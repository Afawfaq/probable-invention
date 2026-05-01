---
title: "TTP: Email-Based C2 Channels"
slug: email-c2
group: turla
category: ttp
mitre_technique: T1071.003
mitre_technique_name: "Application Layer Protocol: Mail Protocols"
tags: [email, c2, gmail, exchange, lightneuron, comrat, turla, covert-channel]
related_tools:
  - ComRAT v4 (Gmail C2)
  - LightNeuron (Exchange server backdoor)
---

# TTP: Email-Based C2 Channels

**MITRE ATT&CK**: [T1071.003 — Application Layer Protocol: Mail Protocols](https://attack.mitre.org/techniques/T1071/003/)

> Using a victim's own email infrastructure — or globally trusted email providers — as a command-and-control channel represents a fundamental shift in the attacker/defender dynamic. You cannot block email.

---

## Overview

Turla developed **two distinct email-based C2 approaches** that together cover virtually every scenario:

| Tool | Approach | What's compromised |
|------|----------|-------------------|
| **ComRAT v4** | Uses Gmail (external, attacker-controlled) | Endpoint (workstation/server) |
| **LightNeuron** | Uses Exchange (victim's own mail server) | Mail server itself |

These are complementary, not redundant. In a sophisticated Turla operation against a government ministry, both might be deployed simultaneously.

---

## ComRAT v4: Gmail as C2

*(See also: [ComRAT malware page](/groups/turla/malware/comrat))*

### The Core Idea

ComRAT v4 implements a complete Gmail-based C2 channel:

```
Traditional C2 (detectable):
  Implant → TCP connection → Attacker's server
  [Defenders can: block the IP, see the connection, detect the protocol]

ComRAT v4 (hard to detect):
  Implant → HTTPS → mail.google.com
  [Defenders see: normal HTTPS traffic to Google. Cannot block Google.]
```

### Technical Implementation

ComRAT embeds a minimal browser engine and uses it to authenticate to Gmail via a **pre-loaded session cookie** (not a password — no login event to detect):

```
1. ComRAT opens an in-memory HTTPS session to accounts.google.com
2. Sends the embedded cookie → authenticated to the Turla Gmail account
3. Checks a specific Gmail folder for new messages from the operator
4. Each new email contains an encrypted command (in subject or body)
5. ComRAT executes the command; encrypts the result; attaches to reply or new email
6. Operator checks the Gmail account for results
```

### Why This Is Brilliant (and Terrifying)

From a network defender's perspective:

```
What they see:
  outbound HTTPS connection to mail.google.com
  certificate: valid Google certificate
  destination: 172.217.x.x (Google IP range)
  
What they can do:
  Block Google's mail servers? → Breaks legitimate email for all users
  Inspect the HTTPS content? → TLS encrypted with Google's certificate
  See the user? → Traffic originates from an internal process, no user context
  
What they cannot do:
  Distinguish ComRAT's Gmail session from a legitimate user checking Gmail
```

The only practical detection is at the **endpoint** level — detecting ComRAT's process or the PowerShell profile modification, not the network traffic.

---

## LightNeuron: The Exchange Server Backdoor

### What LightNeuron Is

**LightNeuron** (documented by ESET, 2019) is a **Microsoft Exchange Transport Agent backdoor**. This is a fundamentally different class of attack than endpoint malware:

- Exchange **Transport Agents** are legitimate Exchange components that process email in transit
- Examples: spam filters, encryption gateways, content scanners
- They run **inside the Exchange process** with full access to all mail flowing through the server
- LightNeuron installs as a malicious Transport Agent — appearing as a legitimate mail processing component

```
Normal email flow:
  Sender → Exchange Server → [Spam filter] → [Content scanner] → Recipient

LightNeuron-infected Exchange:
  Sender → Exchange Server → [Spam filter] → [Content scanner] → [LightNeuron] → Recipient
                                                                        ↑
                                               LightNeuron silently:
                                               1. Reads all emails
                                               2. Executes commands from operator emails
                                               3. Exfiltrates data via outgoing emails
                                               4. Can block, modify, or create emails
```

### Command Channel: Steganography in Attachments

LightNeuron receives commands via **steganographically encoded content** in email attachments:

#### PDF commands
LightNeuron scans all incoming PDF attachments for hidden data using a specific pattern. Operators send a regular-looking email to the compromised organisation with a PDF attachment — the PDF contains hidden data after the PDF EOF marker:

```
Normal PDF ends with:
  %%EOF\n

LightNeuron command PDF:
  %%EOF\n
  [encrypted command data — appears as binary garbage after PDF EOF]

Email client renders: normal PDF
LightNeuron sees:    command
```

#### JPEG commands
Similarly, JPEG images can contain hidden data in the JPEG comment field (`0xFFFE` marker):

```
JPEG structure:
  FF D8                    ← JPEG SOI (start of image)
  FF E0 [JFIF header]      ← Normal JPEG header
  FF FE [length] [comment] ← JPEG comment marker
    [LightNeuron hides commands in the comment field]
  FF DB [quantization table]
  ...normal JPEG data...
```

The email with the JPEG attachment appears completely innocent. Only LightNeuron knows to look in the JPEG comment field for commands.

### Data Exfiltration via Email

LightNeuron exfiltrates collected data by **injecting content into legitimate outgoing emails**:

```
Legitimate outgoing email (ministry official → colleague):
  Subject: Re: Budget proposal
  Body: "Please see attached..."
  Attachment: budget_proposal.docx  ← legitimate attachment

After LightNeuron:
  Subject: Re: Budget proposal
  Body: "Please see attached..."
  Attachment: budget_proposal.docx  ← unchanged
  Attachment: report_q3.pdf         ← LightNeuron added this
                                       Looks like another work attachment
                                       Actually: encrypted exfil data disguised as PDF
```

The recipient (Turla's operator inbox, or an external dead-drop account) receives what appears to be a normal work email with attachments — one of which contains the exfiltrated data.

### Persistence

LightNeuron persists via legitimate Exchange mechanisms:
- Registered in Exchange's transport agent registry
- Starts automatically with the Exchange service
- Exchange starts on boot → LightNeuron starts on boot
- No new Windows services, no autorun registry keys — just a registered Exchange component

```powershell
# How LightNeuron registers itself (simplified):
# Uses the legitimate Exchange Management Shell

Install-TransportAgent `
  -Name "Microsoft Exchange Content Filter" `  # Legitimate-looking name
  -TransportAgentFactory "Microsoft.Exchange.Transport.ContentFilter.ContentFilterAgent" `
  -AssemblyPath "C:\Windows\System32\MSExchange.Transport.dll"  # LightNeuron DLL
```

The agent name "Microsoft Exchange Content Filter" mimics a legitimate Exchange component name — a security analyst reviewing registered transport agents might not notice it.

### What LightNeuron Can See

Because LightNeuron runs as an Exchange Transport Agent, it processes **every email** that flows through the mail server:

- All inbound email to all mailboxes
- All outbound email from all mailboxes
- All internal email between users in the organisation
- Meeting invitations, calendar items, task assignments
- Encrypted S/MIME email (LightNeuron sees plaintext before encryption / after decryption)

For a government ministry or corporate target, this is **complete visibility into all internal communications** — one of the most valuable intelligence positions possible.

---

## Combined Use: A Hypothetical Operation

Against a target government ministry:

```
Phase 1: Initial compromise
  Spearphishing → PowerShell dropper → ComRAT v4 on senior official's workstation
  ComRAT operator establishes access; collects credentials

Phase 2: Expansion  
  Stolen credentials → move laterally to Exchange server
  Deploy LightNeuron as Exchange Transport Agent

Phase 3: Sustained collection
  ComRAT (on workstation): file collection, process monitoring, screenshot, keylog
  LightNeuron (on Exchange): all email to/from all users, including classified communications
  
  Both use email channels (Gmail and Exchange) → no anomalous network connections
  Both survive reboots → long-term access

Phase 4: Discovery
  Average dwell time before detection: 8–18 months (per ESET estimates)
```

---

## Detection

### ComRAT v4
- **Endpoint**: Detect PowerShell profile modification; detect in-memory browser engine in unexpected processes
- **Memory forensics**: Identify ComRAT DLL loaded in svchost.exe or similar
- **Network**: Baseline what processes connect to mail.google.com (unexpected processes = suspicious)

### LightNeuron
- **Exchange management**: Audit all registered Transport Agents — any unfamiliar agents are suspicious
- **File integrity**: Monitor Exchange DLL directories for new or modified files
- **Email analysis**: Look for unexpected attachments added to outgoing emails; suspicious steganographic patterns
- **ESET indicator**: ESET published YARA rules for LightNeuron detection

---

## References

- [ESET: LightNeuron (2019)](https://www.welivesecurity.com/2019/05/29/turla-lightneuron-one-same/)
- [ESET: ComRAT v4 email C2 (2020)](https://www.welivesecurity.com/2020/05/26/agentbtz-comratv4-ten-year-journey/)
- [MITRE ATT&CK: T1071.003](https://attack.mitre.org/techniques/T1071/003/)
- [Microsoft: Exchange Transport Agents documentation](https://docs.microsoft.com/en-us/exchange/transport-agents/)
