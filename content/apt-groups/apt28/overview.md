---
title: "Fancy Bear / APT28 — Russian GRU Military Intelligence"
slug: apt28
attribution: "Russian General Staff Main Intelligence Directorate (GRU), Unit 26165 (and 74455)"
nation_state: Russia
active_since: "~2004"
discovered: 2014
discovered_by: "FireEye (Mandiant), Trend Micro, CrowdStrike"
mitre_group_id: G0007
aliases:
  - Fancy Bear
  - APT28
  - Sofacy
  - Pawn Storm
  - Sednit
  - STRONTIUM (Microsoft)
  - Tsar Team
  - Group 74
  - IRON TWILIGHT (SecureWorks)
  - Fighting Ursa (Palo Alto)
source_code_available: false
source_code_notes: "No public source code. Extensive reverse engineering by Mandiant, ESET, Trend Micro, CrowdStrike. Some Sofacy/X-Agent samples publicly available for analysis."
tags: [apt28, fancy-bear, gru, russia, election-interference, espionage, nato, ukraine, uefi-rootkit, spearphishing]
---

# Fancy Bear / APT28 — Russian GRU Military Intelligence

> The most politically consequential cyber espionage group ever documented. APT28 directly influenced the 2016 US presidential election, compromised NATO member governments across Europe, and pioneered UEFI-level firmware persistence — the first nation-state UEFI rootkit ever documented in the wild.

---

## In One Paragraph

APT28 (also known as Fancy Bear, Sofacy, Sednit, and Pawn Storm) is a cyber espionage group attributed to **Russia's General Staff Main Intelligence Directorate (GRU), Unit 26165** — the GRU's offensive cyber operations unit. Active since approximately 2004, APT28 is GRU's primary strategic espionage and influence operations actor, responsible for attacks that have directly shaped geopolitical events. They are best known for: **compromising the Democratic National Committee and Clinton campaign chairman John Podesta** ahead of the 2016 US election; **developing LoJax**, the first UEFI firmware rootkit ever deployed in the wild (2018); sustained attacks on **NATO member governments, defence contractors, and Ukrainian government and military targets** since 2014; and building the **X-Agent cross-platform implant** (Windows, Linux, macOS, iOS, Android) — one of the most versatile espionage platforms ever created. Where Turla is patient and secretive, APT28 is operationally bold: they leak stolen material, conduct hack-and-leak operations, and operate both espionage and information warfare as combined arms.

---

## Attribution

### Who is GRU Unit 26165?

The **General Staff Main Intelligence Directorate (GRU)** is Russia's military intelligence agency — separate from the FSB (domestic) and SVR (foreign civilian). The GRU conducts both human intelligence and signals intelligence for the Russian military.

**Unit 26165**, also known as the **85th Main Special Service Centre (GTsSS)**, is the GRU's cyber operations unit responsible for APT28. A separate GRU unit, **Unit 74455** (the "Sandworm Team"), handles destructive operations (NotPetya, Olympic Destroyer, Ukraine power grid attacks) — Sandworm and APT28 are distinct but related GRU assets.

GRU officers from Unit 26165 were **indicted by name** by the US Department of Justice in July 2018 — a landmark formal attribution:

| Officer | Role |
|---------|------|
| Viktor Netyksho | Lead officer for US election intrusion |
| Boris Antonov | Senior officer |
| Dmitriy Badin | Officer |
| Ivan Yermakov | Officer, intrusion operations |
| Aleksey Lukashev | Officer, spearphishing operations |
| Sergey Morgachev | Lead developer, X-Agent malware |
| Nikolay Kozachek | Developer, X-Agent Linux |
| Pavel Yershov | Developer |
| Artem Malyshev | Developer |
| Aleksandr Osadchuk | Officer, Guccifer 2.0 persona |
| Anatoliy Kovalev | Officer, DCCC intrusion |

### Evidence for GRU Unit 26165 Attribution

1. **US DoJ 2018 indictment**: 12 GRU officers indicted by name with specific acts described. Based on classified intelligence plus open-source technical evidence
2. **Dutch AIVD intelligence**: Dutch intelligence service confirmed they had persistent access to APT28's own network and watched them conduct operations in real time (including the DNC hack); they notified the US — this is the strongest known direct evidence
3. **Technical overlaps**: X-Agent/Sofacy code variants share unique functions, compile-time artifacts, and internal versioning consistent with a single development team
4. **Language analysis**: Russian language artifacts in malware (Russian error strings, compilation on Russian-locale machines)
5. **Infrastructure patterns**: C2 domains registered from Russian IPs with Russian-language WHOIS data; overlapping registration patterns with known GRU infrastructure
6. **CrowdStrike + Mandiant independent attribution**: Both firms independently attributed to GRU based on separate technical analyses

### APT28 vs. APT29 (Cozy Bear)

APT28 (GRU) and APT29 (SVR/Cozy Bear) are **both Russian intelligence groups** that both compromised the DNC simultaneously in 2016 — apparently without coordinating or even knowing about each other.

| | APT28 (Fancy Bear) | APT29 (Cozy Bear) |
|-|--------------------|-------------------|
| Agency | GRU (military) | SVR (civilian foreign intel) |
| Style | Bold, operational, leak-oriented | Patient, stealthy, intelligence-focused |
| DNC hack role | Exfiltrated and leaked via Guccifer 2.0 | Collected intelligence quietly |
| Known for | Election interference, hack-and-leak | SolarWinds, long-term access |

---

## Primary Targets

APT28's targeting reflects GRU's military intelligence priorities:

- **NATO governments and military** — Particularly Eastern European NATO members closest to Russia's borders
- **Ukraine** — Continuous operations since 2014: military, government, media targets
- **Political organisations** — Democratic parties, think tanks, foundations (primarily Western)
- **Defence contractors** — Aerospace, arms manufacturers, technology firms with defence contracts
- **Journalists and activists** — Critical journalists, human rights workers, opposition figures
- **International organisations** — World Anti-Doping Agency (WADA), OPCW, Olympics
- **Energy sector** — European energy infrastructure

Countries with confirmed APT28 victims: USA, UK, Germany, France, Netherlands, Czech Republic, Poland, Ukraine, Georgia, Montenegro, and 20+ others.

---

## Why APT28 Is Different: Hack-and-Leak Operations

Unlike most espionage groups that collect quietly, APT28 pioneered the **hack-and-leak model** — stealing material and then releasing it strategically through front personas and WikiLeaks to create maximum political damage:

### Guccifer 2.0 (2016)

After hacking the DNC and DCCC, APT28 created a fictional "Romanian hacker" persona **Guccifer 2.0** to release documents through WordPress and Twitter. The US intelligence community and private researchers later established Guccifer 2.0 was operated by GRU officers.

Key evidence Guccifer 2.0 = GRU/APT28:
- **VPN slip**: One day Guccifer 2.0 failed to activate their VPN before logging in to Twitter — the bare IP was a Moscow address registered to GRU infrastructure
- **Metadata**: Documents released by Guccifer 2.0 contained Russian-language metadata and edit history by "Fe Liks" — a transliteration of "Felix Dzerzhinsky" (founder of the KGB)
- **Infrastructure overlap**: Servers used by Guccifer 2.0 overlapped with known X-Agent C2 infrastructure

### DC Leaks (2016)

A separate front website, DCLeaks.com, also distributed APT28-stolen material — including emails from NATO officials and US political figures. The domain was registered via the same infrastructure patterns as other GRU operations.

### WADA Hack and Fancy Bears (2016)

After the McLaren Report documented Russian state-sponsored doping, APT28 hacked the World Anti-Doping Agency (WADA) and released athletes' confidential medical exemption records via the "Fancy Bears' Hack Team" website — a direct retaliatory information operation.

---

## Signature Technical Capabilities

### 1. X-Agent — Cross-Platform Implant

X-Agent (also called Sofacy, Sednit XTUNNEL, Fysbis) is APT28's flagship implant, with versions for:
- **Windows**: Full-featured RAT with modular plugins
- **Linux**: Used against election commission systems, government servers
- **macOS**: Used against targets in 2017
- **iOS**: Documented variant targeting iPhone users
- **Android**: Documented variant

This cross-platform coverage is unusual even among nation-state actors and reflects significant sustained development investment. Full details in the [X-Agent malware page](/groups/apt28/malware/x-agent).

### 2. LoJax — First UEFI Rootkit in the Wild

In 2018, ESET documented **LoJax** — the first confirmed deployment of a **UEFI firmware rootkit** by any threat actor ever observed in actual operations. LoJax:
- Modifies the UEFI/BIOS firmware on the target's motherboard
- Persists across OS reinstallation, disk replacement, and factory resets
- The only way to remove it is to reflash the UEFI chip (or replace the motherboard)

Full details in the [LoJax TTP page](/groups/apt28/ttps/uefi-persistence).

### 3. Credential Harvesting at Scale

APT28 has industrialised the credential harvesting process:
- **Phishing infrastructure**: Dozens of fake login pages mimicking Webmail, Google, Facebook, VPN portals
- **OAUTH token theft**: Steals OAuth tokens rather than passwords — bypasses two-factor authentication
- **"Open redirect" exploitation**: Uses legitimate services' open redirect parameters to hide malicious links

The Podesta hack (2016) involved a single spearphishing email redirecting through a legitimate Bitly link shortener — it bypassed spam filters by appearing to come from Google.

---

## Key Operations Summary

| Operation | Year | Target | Impact |
|-----------|------|--------|--------|
| Georgian government & military | 2008 | Georgian infrastructure | Cyber component of Russo-Georgian War |
| Operation RussianDoll | 2014 | European targets | Zero-day chaining (CVE-2014-1761 + CVE-2014-0515) |
| German Bundestag hack | 2015 | German parliament | ~16GB exfiltrated; German attribution to GRU |
| French TV5Monde | 2015 | French broadcaster | Took TV5Monde off air; defaced website as "ISIS" (false flag) |
| DNC / Podesta hack | 2016 | US Democratic Party | Leaked material changed election coverage; GRU indictment |
| DCCC hack | 2016 | US House Democrats | Voter targeting data exfiltrated |
| WADA hack | 2016 | World Anti-Doping Agency | Athletes' medical records leaked |
| Macron campaign | 2017 | French presidential campaign | Emails leaked 36 hours before election |
| LoJax campaign | 2017–2018 | NATO-adjacent targets | First UEFI rootkit deployment in the wild |
| OPCW hack attempt | 2018 | Organisation for the Prohibition of Chemical Weapons | Physical intrusion attempt; caught by Dutch intelligence |
| Montenegro NATO accession | 2016–2017 | Montenegrin government | Coup attempt coordination alongside cyber ops |
| Ukrainian military | 2014–present | Ukrainian armed forces | Artillery targeting app compromised with X-Agent |
| Bundestag 2021 repeat | 2021 | German parliament (CDU/CSU) | Spearphishing ahead of German elections |

---

## The Ukrainian Artillery App Attack

One of the most operationally striking APT28 operations — documented by CrowdStrike in 2016:

Ukrainian artillery officers used an Android app developed by a Ukrainian officer to calculate aiming corrections for D-30 howitzers. APT28 trojanised this app with **X-Agent for Android**, distributed it through Ukrainian military networks.

The trojanised app:
- Functioned correctly as an artillery calculator (so soldiers kept using it)
- Silently reported GPS coordinates of the device to APT28 C2
- GPS coordinates of Ukrainian artillery officers = GPS coordinates of Ukrainian artillery positions

CrowdStrike assessed with moderate confidence that the resulting location intelligence contributed to Russian forces targeting Ukrainian artillery, causing disproportionate casualties among D-30 battery positions in the period 2014–2016.

This is a rare documented case of cyber espionage directly enabling kinetic military operations.

---

## References

- [US DoJ Indictment: United States v. Viktor Netyksho et al. (2018)](https://www.justice.gov/file/1080281/download)
- [FireEye: APT28 — A Window into Russia's Cyber Espionage Operations (2014)](https://www.mandiant.com/sites/default/files/2021-09/apt28.pdf)
- [ESET: LoJax — First UEFI rootkit found in the wild (2018)](https://www.welivesecurity.com/2018/09/27/lojax-first-uefi-rootkit-found-wild-courtesy-sednit-group/)
- [CrowdStrike: Bears in the Midst — DNC Intrusion (2016)](https://www.crowdstrike.com/blog/bears-midst-intrusion-democratic-national-committee/)
- [MITRE ATT&CK: APT28 (G0007)](https://attack.mitre.org/groups/G0007/)
- [Dutch AIVD on APT28 access (NRC Handelsblad, 2018)](https://www.nrc.nl/nieuws/2018/01/25/dutch-intel-hacked-the-russians-who-hacked-the-democrats-a1589682)
