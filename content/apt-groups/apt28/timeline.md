---
title: "APT28 — Operational Timeline"
slug: apt28
category: timeline
---

# APT28 — Operational Timeline

> From obscure military intrusions in 2004 to operations that shaped elections and pioneered UEFI firmware persistence — APT28's documented history tracks directly with Russia's geopolitical agenda.

---

## ~2004–2007: Emergence

### ~2004
- Earliest technical artifacts attributable to APT28 date to this period (based on compile timestamps in early Sofacy samples)
- Initial targets: Eastern European military and government networks
- Early tooling: Primitive predecessors to what would become the Sofacy/X-Agent platform

### 2007
- **Georgia**: First major documented operations against Georgian government targets, roughly coinciding with increased Russian-Georgian tension over South Ossetia
- Spearphishing emails targeting Georgian Ministry of Foreign Affairs

---

## 2008: The Russo-Georgian War — First Documented Cyber-Kinetic Integration

### August 2008
Russia invades South Ossetia. APT28 operations begin before and during the kinetic conflict:
- **DDoS attacks** against Georgian government websites (coordination unclear — may involve criminal actors alongside GRU)
- **APT28 intrusions**: Government and military networks compromised for intelligence collection
- Some Georgian government websites defaced to display images of Hitler alongside Georgian President Saakashvili
- Georgian government temporarily moved web content to US servers (Tulip Systems, then Google)

The 2008 Georgia conflict is considered the **first documented example of coordinated cyber and conventional military operations** by Russia, though attribution and coordination details remain disputed.

---

## 2009–2013: Expansion and Platform Development

### 2009
- NATO and European government targets added to APT28's scope
- First documented X-Agent variants compiled (based on artifact analysis)

### 2011–2012
- **German Bundestag** targeted for first time (earlier intrusion, separate from the 2015 breach that became public)
- **Polish government** targeted (Poland is a NATO member bordering Kaliningrad, Russia's Baltic enclave)
- French and UK government targets observed

### 2013
- X-Agent platform matures significantly — Windows, early Linux, early mobile variants
- **Spear-phishing infrastructure** industrialised: dozens of fake credential-harvesting domains registered
- First documented operations against **Ukrainian targets** (pre-2014 Euromaidan, focused on government and political targets)

---

## 2014: Operation RussianDoll and the Ukraine Escalation

### February 2014
- **Euromaidan revolution** in Ukraine; Russia-backed President Yanukovych flees
- APT28 operations against Ukrainian targets **dramatically intensify**

### March 2014
- Russia annexes Crimea
- APT28 targeting shifts to **Ukrainian military and government** in parallel with conventional military operations
- First documented APT28 targeting of **NATO military planning** documents

### April 2014
- **Operation RussianDoll** documented by FireEye:
  - Exploits **two zero-days simultaneously**: CVE-2014-1761 (Microsoft Word) + CVE-2014-0515 (Adobe Flash)
  - Chaining two zero-days in a single campaign is highly unusual — demonstrates significant exploit development capability
  - Targets: European government officials, defence contractors

### May 2014
- FireEye publishes initial public research on "APT28" (naming the group)

### October 2014
- FireEye publishes **"APT28: A Window into Russia's Cyber Espionage Operations"** — the definitive initial attribution report
- Attributes APT28 to the Russian government with high confidence based on:
  - Compile-time artifacts showing Moscow business hours
  - Russian language settings in malware
  - Targeting consistent with Russian strategic interests

---

## 2015: The German Bundestag Hack

### January 2015 — Initial Compromise
- APT28 gains initial access to Bundestag (German parliament) IT network via spearphishing
- Uses X-Agent implant for persistence and lateral movement

### April–May 2015 — Discovery
- German IT security staff notice unusual traffic (large data flows to external servers)
- Investigation reveals the intrusion has been ongoing for months

### May 2015 — Scope Confirmed
- **~16 gigabytes** of data exfiltrated from Bundestag network
- Affected computers: ~20,000 workstations across the parliamentary network
- Data included emails from the offices of multiple parliamentary members, including documents from **Chancellor Merkel's office**
- Parliamentary IT committee forced to shut down the entire network for days to contain spread

### German Attribution
- German domestic intelligence (BfV) attributes to APT28/GRU
- German prosecutors later open formal investigation (concluded with formal APT28/GRU attribution in 2020)

---

## 2015: TV5Monde — Information Operations False Flag

### April 2015
French broadcaster **TV5Monde** taken completely off air:
- All broadcast channels (12 channels) go dark
- Website defaced with pro-ISIS messages and content
- Social media accounts hijacked

The attackers claim to be "CyberCaliphate" — a group claiming affiliation with Islamic State.

**Post-incident analysis** by French intelligence (ANSSI) and private researchers:
- Tools and infrastructure match **APT28** patterns, not ISIS-affiliated groups
- The "CyberCaliphate" persona was a false flag designed to deflect attribution to ISIS
- This is an early documented example of **false flag cyber operations** — conducting attacks and creating a false attribution trail

The TV5Monde attack required significant preparation (attackers had been inside the network for months configuring broadcast systems for simultaneous disruption).

---

## 2016: The US Election Year — Peak APT28 Visibility

### January 2016 — Initial DNC Compromise
- APT28 penetrates **Democratic National Committee** networks
- Simultaneously, APT29 (Cozy Bear / SVR) is *already* in the DNC network — two Russian intelligence services independently hacking the same target

### March 2016 — Podesta Phishing
**March 19, 2016**: GRU officer Lukashev sends a spearphishing email to **John Podesta**, Hillary Clinton's campaign chairman:

The email mimics a Google security alert:
> "Someone has your password. Google stopped a sign-in attempt to your Google Account..."

The email includes a Bitly-shortened link. A Clinton campaign aide incorrectly tells Podesta it is a "legitimate" email. Podesta clicks. His Gmail credentials are harvested.

Later recovered from the Bitly account: the short link was created by GRU Unit 26165 and had been clicked ~2,000 times — used in a mass credential harvesting campaign against political targets.

### April–May 2016 — DCCC Compromise
- APT28 compromises **Democratic Congressional Campaign Committee** (DCCC) networks
- Voter targeting data and candidate information exfiltrated

### May 2016 — CrowdStrike Called In
- DNC hires CrowdStrike after noticing suspicious activity
- CrowdStrike identifies both APT28 (Fancy Bear) and APT29 (Cozy Bear) in the network simultaneously
- CrowdStrike publishes its findings publicly — unusually rapid public attribution

### June 2016 — Guccifer 2.0 Debuts
- After CrowdStrike publication attributes hack to Russia, a persona called **Guccifer 2.0** appears on WordPress claiming to be a lone Romanian hacker
- Guccifer 2.0 begins releasing DNC documents on WordPress and to journalists, including to The Intercept and Wikileaks
- US intelligence community assesses Guccifer 2.0 is a GRU front

### July 2016 — WikiLeaks DNC Emails
- WikiLeaks publishes ~20,000 DNC emails three days before the Democratic National Convention
- The emails show DNC leadership favouring Clinton over Sanders
- US intelligence assess material was provided to WikiLeaks by GRU (later confirmed in 2018 indictment)

### August 2016 — WADA Hack and Fancy Bears
- APT28 hacks **World Anti-Doping Agency (WADA)** — steals confidential athlete medical records
- Releases them via the "Fancy Bears' Hack Team" website
- Targets include US athletes who had received Therapeutic Use Exemptions for banned substances
- Timed to undermine Western criticism of Russian state doping

### October 2016 — Podesta Emails on WikiLeaks
- WikiLeaks publishes John Podesta's hacked emails daily for the final weeks of the election campaign
- 50,000+ emails released in batches

### November 2016 — VPN Slip: Guccifer 2.0 Unmasked
- **The Smoking Gun**: One day Guccifer 2.0 forgets to activate their VPN before logging into Twitter
- The bare IP address is a **Moscow telecom address registered to GRU infrastructure**
- The Intercept and later Vice Motherboard report this discovery (January 2018)

---

## 2017: European Elections and LoJax Development

### April–May 2017 — French Election
- APT28 targets **Emmanuel Macron's En Marche! campaign**
- Credential phishing against campaign staff
- **"MacronLeaks"**: 9GB of campaign documents and emails released 36 hours before the second round election vote
- French election commission and media correctly decline to amplify (they recognise the operation); the impact is significantly reduced compared to 2016

### 2017 — Montenegro
- Montenegro finalising NATO membership; Russia strongly opposes
- APT28 operations against Montenegrin government networks intensify
- Parallel to: alleged GRU-backed coup attempt against Montenegrin government planned for October 2016

### Summer 2017 — OPCW Attempt
- **Organisation for the Prohibition of Chemical Weapons (OPCW)** — investigating Novichok poisoning of Sergei Skripal in UK
- Dutch MIVD (military intelligence) catches a **GRU team physically parked outside OPCW headquarters in The Hague** with Wi-Fi hacking equipment in a rental car boot
- Four GRU officers arrested, equipment seized
- Dutch government expels them; publicly attributes to GRU Unit 26165

### 2017–2018 — LoJax Development
- APT28 develops and begins deploying **LoJax** — the first UEFI firmware rootkit
- Targets: Central and Eastern European governments, NATO-adjacent organisations

---

## 2018: The Indictment

### July 13, 2018 — US DoJ Indictment
Special Counsel Robert Mueller's office indicts **12 GRU officers by name**:
- Viktor Netyksho (Unit 26165 commanding officer for the DNC operation)
- Sergey Morgachev (lead developer of X-Agent)
- Nine additional officers with specific roles in each stage of the intrusion

The indictment is notable for its technical specificity — it describes X-Agent's keylogging, the C2 infrastructure, the Guccifer 2.0 persona creation, the WikiLeaks coordination — all derived from forensic analysis and what is believed to be Dutch AIVD intelligence.

### September 2018 — LoJax Publicly Documented
ESET publishes analysis of **LoJax** — the first confirmed UEFI rootkit in the wild, deployed by APT28.

---

## 2019–Present: Continued Operations

### 2019–2020
- Continued targeting of European political parties ahead of elections
- German CDU/CSU targeted in spearphishing ahead of 2021 Bundestag elections
- UK Labour and Conservative parties both report APT28 targeting (UK parliamentary committee report)

### 2020
- German prosecutors issue arrest warrant for GRU officer Dmitriy Badin in connection with the 2015 Bundestag hack
- EU sanctions GRU Unit 26165 (the first EU cyber sanctions under the EU Cyber Diplomacy Toolbox)

### 2022 — Ukraine Full-Scale Invasion
- APT28 operations against Ukrainian targets reach highest observed tempo
- Targeting: Ukrainian military command, government ministries, critical infrastructure
- Coordination observed with Sandworm (Unit 74455) destructive operations
- Extensive targeting of Ukrainian and international media organisations

### 2023–2024
- APT28 campaigns against NATO members intensify alongside Russian diplomatic pressure on Ukraine support
- Microsoft (MSTIC) documents sustained credential-harvesting campaigns against Western defence contractors
- New tools: **MASEPIE** (Python backdoor), **OCEANMAP** (IMAP-based C2), **HEADLACE** — documented by CERT-UA and Microsoft

---

## The Big Picture: APT28 as a Policy Instrument

APT28's operational history tracks almost exactly with Russian foreign policy:

| Russian action | APT28 response |
|----------------|----------------|
| Russia-Georgia tension (2007–2008) | Georgian government targeted |
| Ukraine Euromaidan / Crimea annexation (2014) | Ukrainian targeting dramatically escalates |
| Western criticism of Russian doping (2016) | WADA hack; athlete records leaked |
| Montenegro NATO accession (2016–2017) | Montenegrin government targeted |
| OPCW Novichok investigation (2018) | Physical + cyber attack on OPCW |
| Western sanctions over Ukraine (2022–) | NATO member targeting intensifies |

This alignment is one of the strongest forms of circumstantial evidence for state direction of APT28's operations.
