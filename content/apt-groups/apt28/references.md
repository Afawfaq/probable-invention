---
title: "APT28 — Annotated References"
slug: apt28
category: references
---

# APT28 — Annotated References

> Primary sources for all claims in the APT28 content. All sources are public threat intelligence reports, government advisories, legal documents, and peer-reviewed research.

---

## Government Documents and Legal Attribution

**[1] US Department of Justice: United States v. Viktor Borisovich Netyksho et al. (2018)**  
The 29-page grand jury indictment of 12 GRU Unit 26165 officers. The most detailed public legal attribution of APT28. Describes X-Agent, XTunnel, the DNC/DCCC intrusion sequence, Guccifer 2.0, and WikiLeaks coordination in forensic detail. Essential primary source.  
→ https://www.justice.gov/file/1080281/download

**[2] Dutch Government: Statement on GRU officers arrested outside OPCW (2018)**  
Official Dutch government statement on the arrest and expulsion of four GRU officers found with Wi-Fi hacking equipment outside OPCW headquarters in The Hague. Includes photographs of the equipment.  
→ https://www.government.nl/latest/news/2018/10/04/netherlands-defence-intelligence-and-security-service-disrupts-russian-cyber-operation-targeting-opcw

**[3] EU Council: Decision implementing sanctions against GRU Unit 26165 (2020)**  
First EU cyber sanctions under the EU Cyber Diplomacy Toolbox. Formally designates GRU Unit 26165 for the Bundestag 2015 hack and other operations.  
→ https://www.consilium.europa.eu/en/press/press-releases/2020/10/22/eu-imposes-cyber-sanctions-on-russian-military-intelligence-hackers/

**[4] UK NCSC / GCHQ: Advisory attributing GRU to APT28 (2018)**  
UK government attribution of GRU to specific APT28 operations, coordinated with US, Dutch, and Australian attribution.  
→ https://www.ncsc.gov.uk/news/ncsc-supports-government-response-to-irresponsible-cyber-activity

---

## Foundational Technical Analyses

**[5] FireEye (Mandiant): "APT28: A Window into Russia's Cyber Espionage Operations" (2014)**  
The founding attribution report. Mandiant analyses the Sofacy/X-Agent toolset and concludes it represents a well-resourced Russian government operation. First formal public naming of "APT28."  
→ https://www.mandiant.com/sites/default/files/2021-09/apt28.pdf

**[6] Trend Micro: "Operation Pawn Storm — The Red in SEDNIT" (2014)**  
Independent analysis from Trend Micro, naming the same group "Pawn Storm" and "Sednit." Particularly good on the Safebrowsing fake pages and spearphishing infrastructure.  
→ https://documents.trendmicro.com/assets/wp/wp-operation-pawn-storm.pdf

**[7] CrowdStrike: "Bears in the Midst: Intrusion into the Democratic National Committee" (2016)**  
CrowdStrike's public disclosure of both APT28 (Fancy Bear) and APT29 (Cozy Bear) in the DNC network. Coined "Fancy Bear." The first public attribution of the 2016 election hacking to Russia.  
→ https://www.crowdstrike.com/blog/bears-midst-intrusion-democratic-national-committee/

---

## X-Agent / Sofacy Technical References

**[8] ESET: "En Route with Sednit" (three-part series, 2016)**  
ESET's comprehensive technical analysis of the Sednit/APT28 toolset: X-Agent, CORESHELL, and the full infection chain. The most thorough public technical analysis of these tools.
- Part 1: Approaching the Target → https://www.welivesecurity.com/2016/10/20/lifting-lid-sednit-closer-look-software-sednit-use/
- Part 2: Observing the Comings and Goings → https://www.welivesecurity.com/wp-content/uploads/2016/10/eset-sednit-part-2.pdf
- Part 3: A Malicious Recipe → https://www.welivesecurity.com/wp-content/uploads/2016/10/eset-sednit-part3.pdf

**[9] CrowdStrike: "Use of Fancy Bear Android Malware in Tracking of Ukrainian Field Artillery Units" (2016)**  
Documents the X-Agent Android trojanised artillery app. Includes GPS correlation analysis and Ukrainian D-30 loss rate analysis.  
→ https://www.crowdstrike.com/wp-content/brochures/FancyBearTracksUkrainianArtillery.pdf

**[10] Palo Alto Unit 42: "Sofacy Continues Global Attacks and Wheels Out New 'Cannon' Trojan" (2018)**  
Updates on Sofacy evolution and the Zebrocy dropper family.  
→ https://unit42.paloaltonetworks.com/unit42-sofacy-continues-global-attacks-wheels-new-cannon-trojan/

---

## LoJax — UEFI Persistence

**[11] ESET: "LoJax: First UEFI Rootkit Found in the Wild, Courtesy of the Sednit Group" (2018)**  
Landmark disclosure of the first UEFI rootkit documented in active operations. Technical paper accompanying the announcement.  
→ https://www.welivesecurity.com/2018/09/27/lojax-first-uefi-rootkit-found-wild-courtesy-sednit-group/

**[12] ESET: "LoJax Technical Analysis" (full paper, PDF, 2018)**  
26-page technical paper with full reversing details, UEFI modification methodology, and forensic indicators.  
→ https://www.welivesecurity.com/wp-content/uploads/2018/09/ESET-LoJax.pdf

---

## Election Operations

**[13] US Senate Select Committee on Intelligence: "Russian Active Measures Campaigns and Interference in the 2016 U.S. Election" (2019–2020)**  
Five-volume bipartisan senate investigation. Volume 1 covers election infrastructure targeting; Volume 2 covers information operations. Documents APT28's operations in detail.  
→ https://www.intelligence.senate.gov/publications/report-select-committee-intelligence-united-states-senate-russian-active-measures

**[14] Mueller Report (Special Counsel investigation): Volume 1, Section III (2019)**  
Documents APT28's election operations from a legal/intelligence perspective, complementing the technical evidence in the indictment [1].  
→ https://www.justice.gov/archives/sco/file/1373816/download

**[15] AP: "How 4,700 people helped APT28 unwittingly" (2017)**  
Associated Press investigation uncovering 4,700 phishing targets in the APT28 credential harvesting campaign. Methodology: analysts obtained APT28's Bitly account link history.  
→ https://apnews.com/article/699236946e3140659fff8a2362e16f41

---

## The Dutch Intelligence Story

**[16] NRC Handelsblad: "Dutch intel hacked the Russians who hacked the Democrats" (2018)**  
Dutch newspaper report on AIVD (Dutch intelligence) having persistent access to APT28's own network from 2014, watching the DNC hack in real time and alerting the US FBI.  
→ https://www.nrc.nl/nieuws/2018/01/25/dutch-intel-hacked-the-russians-who-hacked-the-democrats-a1589682

**Note**: This article's claims were later confirmed by Dutch government officials and align with the Mueller indictment's technical detail, which Dutch AIVD intelligence is believed to have informed.

---

## German Bundestag Operations

**[17] German Federal Office for the Protection of the Constitution (BfV): Bundestag hack report (2015)**  
German domestic intelligence attribution and technical details of the 2015 Bundestag breach.  
→ https://www.verfassungsschutz.de/SharedDocs/publikationen/DE/cyber-spionage/2016-06-broschuere-cyber-spionage-angriffe-auf-parlamentarische-strukturen.html

**[18] German Federal Public Prosecutor: Indictment of Dmitriy Badin (2020)**  
Germany's formal legal attribution of the Bundestag hack to GRU officer Badin (one of the same officers indicted in the US in 2018).  
→ https://www.generalbundesanwalt.de/SharedDocs/Pressemitteilungen/DE/2020/Pressemitteilung-vom-05-05-2020.html

---

## MITRE ATT&CK References

**[19] MITRE ATT&CK: APT28 (G0007)**  
Comprehensive MITRE ATT&CK entry for APT28. Primary reference for all technique mappings.  
→ https://attack.mitre.org/groups/G0007/

**[20] MITRE ATT&CK: T1542.001 — Pre-OS Boot: System Firmware**  
Technique page for UEFI firmware persistence; cites LoJax as the defining example.  
→ https://attack.mitre.org/techniques/T1542/001/

---

## Further Reading

**[21] Thomas Rid: "Active Measures" (2020)**  
Book-length treatment of Russian information operations from the Soviet era to the present, including detailed APT28 analysis.  
→ Published by Farrar, Straus and Giroux

**[22] Andy Greenberg: "Sandworm" (2019)**  
Narrative account primarily about Sandworm (GRU Unit 74455), but with substantial APT28 context. Best popular treatment of Russian GRU cyber operations.  
→ Published by Doubleday
