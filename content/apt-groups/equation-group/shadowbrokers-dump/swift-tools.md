---
title: "JEEPFLEA — SWIFT Banking Network Exploitation Tools"
slug: swift-tools
group: equation-group
category: tools
platform: Windows (SWIFT terminal operator machines)
source_available: true
source_url: https://github.com/x0rz/EQGRP
tags: [swift, banking, jeepflea, financial, shadowbrokers]
mitre_techniques:
  - T1657  # Financial Theft
  - T1185  # Browser Session Hijacking
  - T1560  # Archive Collected Data
---

# JEEPFLEA — SWIFT Banking Network Exploitation Tools

> One of the most geopolitically sensitive revelations in the ShadowBrokers dump: NSA tooling for targeting the **SWIFT financial messaging network**.

---

## What Is SWIFT?

**SWIFT** (Society for Worldwide Interbank Financial Telecommunication) is the global messaging network used by banks to communicate financial transactions. It is the backbone of international wire transfers — nearly every international bank transfer in the world passes through SWIFT.

When you send money internationally, your bank sends a SWIFT message to the recipient's bank. SWIFT doesn't hold money — it just carries the messages that authorise transfers. The 2016 Bangladesh Bank heist ($81 million stolen via fraudulent SWIFT messages) demonstrated that compromising SWIFT terminal operators enables direct theft.

---

## The Tools

The dump included a folder called `swift/` containing several tools targeting SWIFT infrastructure:

### JEEPFLEA_MARKET

**Target**: SWIFT Alliance Access and SWIFT operator workstations (Windows)

**Function**: A collection of scripts to:
1. **Map the SWIFT environment** — enumerate which SWIFT software is installed, version numbers, user accounts
2. **Harvest SWIFT operator credentials** — capture usernames, passwords, and SSL certificates used for SWIFT authentication
3. **Capture SWIFT transaction data** — collect copies of SWIFT messages (SWIFT-format financial instructions)
4. **Intercept operator sessions** — monitor SWIFT terminal use in real time

```bash
# JEEPFLEA_MARKET operational flow (from included documentation)

# Step 1: Initial survey — what SWIFT components are installed?
python jeepflea_market.py --survey --target [SWIFT terminal IP]

# Output would include:
#   SWIFT Alliance Access version: 7.2.30
#   SWIFT Alliance Gateway: installed
#   SWIFT Automated File Transfer: installed
#   Operator accounts: [list of SWIFT operator usernames]
#   Certificate store: [path to SSL certificates]

# Step 2: Credential and certificate harvest
python jeepflea_market.py --harvest-creds --harvest-certs --target [IP]

# Step 3: Capture SWIFT message archive
python jeepflea_market.py --capture-messages --date-range [start] [end] --target [IP]
```

### JEEPFLEA_POWDER

**Target**: SWIFT data files on operator machines

**Function**: Extracts and packages SWIFT message archives for exfiltration. SWIFT stores historical messages in specific database files; JEEPFLEA_POWDER knows the file paths and formats for various SWIFT software versions and extracts this data silently.

---

## Why Did NSA Have SWIFT Tools?

This is the most politically sensitive question raised by the dump.

### The intelligence rationale

NSA's legal mandate includes **signals intelligence for national security and foreign policy purposes**, which explicitly includes:
- Tracking terrorist financing
- Monitoring sanctions compliance
- Tracking state-level financial flows (e.g., Iranian nuclear program financing)
- Foreign intelligence on economic activity

SWIFT access gives NSA visibility into the financial flows of every country and organisation that uses the international banking system — which is nearly everything.

Post-9/11, the US Treasury and CIA/NSA had programs to access SWIFT data through legal means (the **TFTP — Terrorist Finance Tracking Program**, publicly acknowledged in 2006 after a NYT leak). JEEPFLEA suggests NSA also maintained a technical capability to access SWIFT data covertly when legal process wasn't available or wasn't fast enough.

### The uncomfortable comparison

The Bangladesh Bank heist (February 2016) was conducted by **Lazarus Group** (North Korea) using fraudulent SWIFT messages to steal $81 million from the Bangladesh central bank. The attackers:
1. Compromised the bank's internal network
2. Installed malware on SWIFT terminal workstations (targeting the SWIFT software directly)
3. Sent fraudulent SWIFT payment orders to the Federal Reserve Bank of New York

The JEEPFLEA tools suggest NSA had highly similar capabilities — not for theft (presumably) but for intelligence collection. The tactical methodology is essentially identical.

---

## Target Profile

SWIFT tools would be deployed against:

- **Central banks** of target nations (Iranian, North Korean, Russian, etc.)
- **Commercial banks** with connections to target entities
- **SWIFT service bureaus** — third-party firms that manage SWIFT connectivity for smaller banks
- **Financial messaging companies** in geopolitically sensitive countries

A successfully compromised SWIFT terminal at a central bank provides:
- Real-time visibility into government financial flows
- Intelligence on sanctioned entities and evasion methods
- Long-term historical transaction records
- Authentication credentials for further access

---

## Security Implications of the Leak

When JEEPFLEA was published in the ShadowBrokers dump, it:

1. **Revealed NSA's SWIFT collection capability** — confirmed what had been speculated
2. **Provided a roadmap for criminal/state actors** — the scripts in the dump show exactly how to target SWIFT terminals; criminal and state-sponsored groups immediately had a starting point
3. **Prompted SWIFT security reviews** — SWIFT issued guidance and security updates specifically in response to the dump
4. **Created compliance questions** — financial institutions now had to assess whether their SWIFT terminals had ever been compromised

BAE Systems' financial crime division published a detailed analysis of JEEPFLEA tools and their implications for SWIFT security in 2017.

---

## References

- [GitHub: x0rz/EQGRP — swift folder](https://github.com/x0rz/EQGRP/tree/master/windows/swift)
- [BAE Systems: Following the SWIFT Money (2017)](https://www.baesystems.com/en/cybersecurity/feature/following-the-swift-money)
- [Bangladesh Bank Heist analysis — Lazarus Group methodology comparison](https://www.symantec.com/connect/blogs/swift-attackers-malware-linked-more-financial-attacks)
- [SWIFT security guidance post-ShadowBrokers](https://www.swift.com/resource/swift-customer-security-programme-csp)
- [NYT: Treasury's Secret SWIFT Program (2006)](https://www.nytimes.com/2006/06/23/world/23intel.html)
