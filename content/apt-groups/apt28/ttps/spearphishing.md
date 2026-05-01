---
title: "TTP: Credential Harvesting via Spearphishing"
slug: spearphishing
group: apt28
category: ttp
mitre_technique: T1566.001
mitre_technique_name: "Phishing: Spearphishing Attachment / T1598 Phishing for Information"
tags: [spearphishing, credential-harvesting, oauth, google, phishing, apt28]
related_tools:
  - Sofacy (document exploits)
  - X-Agent (post-compromise)
---

# TTP: Credential Harvesting via Spearphishing

**MITRE ATT&CK**: [T1566.002 — Spearphishing Link](https://attack.mitre.org/techniques/T1566/002/) and [T1598 — Phishing for Information](https://attack.mitre.org/techniques/T1598/)

> The most impactful hack of 2016 — compromising a US presidential campaign chairman's email — involved a single spearphishing email and a junior aide's misread of the word "legitimate."

---

## Overview

APT28 has industrialised credential harvesting at a scale and level of operational sophistication unseen from most other APT groups. Rather than always relying on software exploits (which require the right vulnerability to be present), credential harvesting:

- Works regardless of patch level
- Is difficult to defend against with technical controls alone
- Requires only one person in a large organisation to click
- Yields credentials usable for months or years

APT28 runs credential harvesting operations continuously, targeting thousands of individuals simultaneously.

---

## The Phishing Infrastructure

APT28 maintains a dedicated infrastructure of fake login pages:

```
Infrastructure components:
  
  Domain registration:
    Domains chosen to be confusable with legitimate services:
    "accounts-google[.]com" (not accounts.google.com)
    "mail-google[.]net"
    "secure-login-microsoft[.]com"
    "webmail-[target-org][.]com"
    
  Hosting:
    VPS servers rented with stolen credit cards or cryptocurrency
    Frequently rotated (new server every few weeks)
    
  SSL certificates:
    Let's Encrypt certificates (free, automated, legitimate-looking padlock)
    Victims see "https://" and green padlock — they trust it
    
  Fake login pages:
    Pixel-perfect copies of Gmail, Outlook, VPN portals
    Form submissions send credentials to APT28 and then redirect
    to real login page (victim sees successful login, suspects nothing)
```

### Domain Typosquatting Examples

From documented APT28 campaigns:

| Legitimate domain | APT28 fake domain |
|-------------------|-------------------|
| accounts.google.com | accounts-google.com |
| login.microsoftonline.com | login-microsoftonline.net |
| webmail.bundestag.de | webmail.bundestag-de.de |
| login.yahoo.com | login.yahoo-com.com |

The fakes are designed to appear plausible when glanced at quickly — especially when the URL is hidden behind a link shortener.

---

## The Podesta Attack — A Case Study

The John Podesta attack (March 19, 2016) is the most consequential and best-documented example of APT28's spearphishing.

### The Email

```
From: security@accounts.google.com [SPOOFED — appeared to come from Google]
To: john.podesta@gmail.com
Subject: Someone has your password

[Google logo]

Hi John

Someone just used your password to try to sign in to your Google Account 
john.podesta@gmail.com.

Details:
  Date/time:    Friday, 18 March, 2016 4:34:30 UTC
  Location:    Ukraine
  IP Address:  134.249.139.239
  
Google stopped this sign-in attempt. You should change your password immediately.

[CHANGE PASSWORD button]  ← Links to accounts-google[dot]com/[unique ID]
```

### The Fateful Misread

The Clinton campaign had an IT staffer, Charles Delavan, responsible for reviewing such emails. He was forwarded this email and responded to Podesta's aide:

> "This is a legitimate email. John needs to change his password immediately."

Delavan later stated he meant to write **"This is an *illegitimate* email"** — he typed the wrong word. It is one of the most consequential typos in US political history.

### What Happened When Podesta Clicked

1. Podesta clicks the "Change Password" button
2. Browser navigates to `accounts-google[.]com/[unique tracking ID]`
3. Page shows a perfect clone of the Google account page
4. Podesta enters his existing password and a new password
5. Page records both passwords and redirects to real Google account page
6. Podesta completes a successful real password change
7. **Podesta thinks everything is fine**

Meanwhile:
- Both passwords have been sent to APT28 infrastructure
- The tracking ID embedded in the URL tells GRU officer Lukashev exactly which target clicked
- Lukashev can now log into Podesta's Gmail — Podesta's two-factor authentication is *not* enabled on Gmail

### The Scale Context

The Bitly link used in the Podesta attack had been used in **~2,000 phishing attempts** against political targets. Podesta was one target in a mass campaign — but the one with the most political consequences.

---

## OAuth Token Harvesting — Bypassing 2FA

After 2016, many targets enabled two-factor authentication on Gmail. APT28 adapted with **OAuth token theft**:

### Why OAuth Tokens Work

When you grant a third-party app access to your Gmail ("Allow [app] to read your email"), Google gives that app an **OAuth access token**. This token:
- Does NOT require the user's password to use
- Does NOT require 2FA to use (it was already issued past the 2FA checkpoint)
- Provides access to specific scopes (e.g., read all email)
- Is valid for months unless explicitly revoked

### The OAuth Phishing Flow

```
1. APT28 registers a fake Google app:
   Name: "Google Drive File Sharing"  (legitimate-looking)
   Permissions requested: Read all email, Access Google Drive
   
2. Sends target a fake "someone shared a document with you" email
   Contains link: accounts.google.com/o/oauth2/auth?client_id=[APT28_app_id]...
   (This IS a real Google URL — Google handles the auth itself)
   
3. Target clicks, sees real Google permission screen:
   "[Google Drive File Sharing] wants to:
    ✓ Read, compose, send and permanently delete all your email
    ✓ See and download all your Google Drive files"
   
4. Target clicks "Allow"
   
5. Google gives APT28's app an OAuth token for this user
   
6. APT28 now has OAuth token — reads all target's email without needing password or 2FA
   The token persists until explicitly revoked — even password changes don't invalidate it
```

### Google's Response

After this technique was documented (it was used in the 2017 Google Docs phishing wave, attributed to non-APT28 actors but same technique), Google:
- Began flagging apps requesting unusual permissions
- Required manual review for new OAuth apps requesting sensitive permissions
- Added "unverified app" warnings for apps not reviewed by Google

APT28 adapted by registering apps through intermediaries or using apps that only requested narrow scopes, reducing the "scary permissions" warning.

---

## The Industrial Scale: Fancy Bear Targeting Lists

Security researchers analysed APT28 phishing infrastructure and found evidence of targeting campaigns against:

- **7,000+ individuals** targeted in sustained credential harvesting campaigns (2015–2016)
- Targets categorised by: journalists, politicians, military/intelligence, NGOs, academics
- Many targets received multiple phishing attempts over months before clicking (or never clicking)
- Targets in 39 countries documented

The scale requires automation:

```
APT28 credential harvesting operational flow:
  
  1. Acquire target list
     (public sources: LinkedIn, conference attendee lists, news articles, 
      leaked databases — e.g., LinkedIn breach data)
     
  2. Generate personalised phishing emails at scale
     Template: "security alert from [target's email provider]"
     Personalise with: target's real email, name, recent location (from public data)
     
  3. Register domain + set up fake login page
     (Often one domain per campaign/target category)
     
  4. Send at scale via compromised mail servers
     (Using compromised legitimate mail servers means email passes SPF checks)
     
  5. Monitor credential collection in real time
     (APT28 operators can see successful credential captures as they happen)
     
  6. Manually review high-value targets; discard low-value
```

---

## Defence

### For organisations

1. **Hardware security keys (FIDO2/WebAuthn)**: The only 2FA that prevents credential phishing — the security key's cryptographic signature is domain-bound, so a fake `accounts-google.com` page cannot trigger the security key
2. **Email filtering**: Flag emails containing links to typo-squatted domains; block known APT28 infrastructure
3. **User training**: Specifically train on: checking the address bar URL before entering credentials; recognising that a padlock ≠ safe (it just means encrypted, not legitimate)
4. **OAuth app review**: Audit all OAuth apps with access to your email; revoke unused apps

### What doesn't work

- **Password managers**: Password managers that auto-fill credentials still fill them on fake domains (some offer domain verification, but users often override)
- **Standard 2FA (TOTP/SMS)**: A real-time phishing proxy can relay the TOTP code before it expires (AITM attacks)
- **Spam filters**: APT28 sends from compromised legitimate mail servers; passes most spam filters

---

## References

- [Mueller Indictment: United States v. Netyksho (2018) — describes Lukashev's phishing ops](https://www.justice.gov/file/1080281/download)
- [Vice Motherboard: How Elite Hackers Targeted John Podesta (2017)](https://www.vice.com/en/article/mg7xjb/how-hackers-broke-into-john-podesta-and-colin-powells-gmail-accounts)
- [AP: How AP uncovered the DNC hack phishing list — 4,700 targets (2017)](https://apnews.com/article/699236946e3140659fff8a2362e16f41)
- [Google: Protecting against advanced phishing with hardware security keys](https://security.googleblog.com/2019/05/new-research-how-effective-is-basic.html)
- [MITRE ATT&CK: T1566.002 — Spearphishing Link](https://attack.mitre.org/techniques/T1566/002/)
