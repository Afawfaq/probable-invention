---
title: "TTP: Satellite-Based C2 Infrastructure"
slug: satellite-c2
group: turla
category: ttp
mitre_technique: T1090.004
mitre_technique_name: "Proxy: Domain Fronting / Encrypted Channel"
tags: [satellite, c2, dvb-s, downlink, infrastructure, covert-channel, turla]
related_tools:
  - Snake (primary user of this C2 method)
---

# TTP: Satellite-Based C2 Infrastructure

**MITRE ATT&CK**: Closest to [T1090 — Proxy](https://attack.mitre.org/techniques/T1090/) and [T1571 — Non-Standard Port](https://attack.mitre.org/techniques/T1571/)

> "The beauty of this method is its absolute untraceability. The attacker could be anywhere on Earth — or, more accurately, anywhere within the satellite's coverage area, which is typically an entire continent." — Kaspersky, 2015

---

## What Is It?

Turla pioneered using **commercial satellite internet downlinks** as a one-way command delivery channel for their Snake implants.

The technique exploits a fundamental property of satellite internet:
- **Downlink** (satellite → Earth): Broadcast to a wide area. Any receiver with the right dish can receive it.
- **Uplink** (Earth → satellite): Point-to-point. You need specific hardware.

Most satellite internet providers offer a **"downstream only"** service for remote areas: the satellite delivers data downlink (fast), and the customer uses a slow dial-up connection for the uplink. This is called a **DVB-S** (Digital Video Broadcasting - Satellite) connection.

Turla exploits this to create a **completely anonymous command delivery channel**.

---

## DVB-S Background

DVB-S is the technical standard for satellite TV and some broadband internet services. The downlink:
- Broadcasts at 10–30 Mbps across a satellite footprint covering millions of km²
- Uses standard IP-over-DVB encapsulation
- Packets include a source IP — **but the source IP is trivially spoofed** because the receiver has no way to verify it against the actual sender

Any receiver within the satellite's footprint with a DVB-S dish and demodulator can receive all the traffic being broadcast.

---

## How Turla Uses It

### Setup

```
1. Turla operators subscribe to a legitimate satellite internet provider
   (or compromise an existing subscriber's account)
   
2. They set up a legitimate DVB-S receive station with:
   - A satellite dish
   - A DVB-S demodulator card (widely available, ~$30–100)
   - Software to decode DVB-S frames
   
3. They identify legitimate satellite internet subscribers in a target region:
   - Scan for DVB-S traffic in the satellite footprint
   - Identify the IP addresses that legitimate subscribers are using
   - These are the "cover" for Turla's injected traffic
```

### Operation

```
Turla operator wants to send a command to a Snake implant.

Step 1: Craft command packet
  - Encrypt the Snake command with Snake's session key
  - Wrap in a UDP packet
  
Step 2: Spoof the source
  - Set the SOURCE IP to a legitimate satellite subscriber's IP
    (e.g., an ISP in the Middle East — has no connection to Russia)
  - Set the DESTINATION IP to the Snake implant's machine
  
Step 3: Inject into satellite stream
  - Turla uploads the packet via the DVB-S uplink
  - The satellite broadcasts it in the downlink stream
  - The packet is now flying through space across the satellite footprint
  
Step 4: Snake receives the command
  - Snake's packet sniffer intercepts all UDP traffic
  - Finds packets addressed to its machine with Snake's magic signature
  - Decrypts and executes the command
  
Step 5: No response needed (or responses via conventional channel)
  - The command channel is ONE-WAY (Turla → Snake)
  - Responses either go via a conventional C2 channel (HTTP/HTTPS) with a different IP
  - Or responses are batched and retrieved later
```

### Why This Is Unattributable

```
Investigation: "Who sent this command to the Snake implant?"

Network logs show:
  Source IP: [legitimate satellite ISP in the Middle East]
  
Investigator contacts that ISP:
  ISP: "We don't know — we provide DVB-S downstream-only service to customers.
        Anyone within our satellite footprint could have received and re-transmitted
        that packet. We have no logs of uplink traffic from that IP."

Investigator checks Turla's actual uplink location:
  The uplink was sent from [country X, via multiple hops]
  The satellite broadcast it — the actual sender is invisible

Even with complete telemetry, the trail goes cold at the satellite provider.
The actual Turla operator could have been:
  - In Russia, using a VPN
  - In a neutral country
  - On a ship in the Atlantic
  - Anywhere within the satellite's coverage area
```

---

## Technical Details: Snake's Packet Sniffer

For this technique to work, Snake must be able to receive the injected satellite packets. Snake installs a **raw packet sniffer** (via NDIS/WFP — Windows network filtering) that:

1. Intercepts **all** incoming network packets before they reach the application layer
2. Scans for packets with Snake's "magic marker" in the payload
3. If found: extract, decrypt, execute the command
4. If not found: pass the packet through normally (victim sees normal traffic)

```c
/* Simplified Snake packet filter (pseudocode) */
NTSTATUS PacketFilterCallback(
    FWPS_INCOMING_VALUES *fixed_values,
    FWPS_INCOMING_METADATA_VALUES *meta_values,
    void *layer_data,
    void *classify_context,
    const FWPS_FILTER *filter,
    UINT64 flow_context,
    FWPS_CLASSIFY_OUT *classify_out
) {
    /* Get the incoming packet */
    NET_BUFFER_LIST *nbl = (NET_BUFFER_LIST *)layer_data;
    BYTE *packet_data = GetPacketPayload(nbl);
    
    /* Check for Snake's magic marker (hardcoded in the implant) */
    if (memcmp(packet_data, SNAKE_MAGIC, MAGIC_LEN) == 0) {
        /* This is a Turla command packet! */
        
        /* Decrypt and extract the command */
        BYTE *command = SnakeDecrypt(
            packet_data + MAGIC_LEN,
            packet_data_len - MAGIC_LEN
        );
        
        /* Queue for execution */
        SnakeExecuteCommand(command);
        
        /* DROP the packet — don't let it reach applications */
        classify_out->actionType = FWP_ACTION_BLOCK;
        classify_out->flags |= FWPS_CLASSIFY_OUT_FLAG_ABSORB;
    }
    /* else: permit normally */
    
    return STATUS_SUCCESS;
}
```

The victim never sees these packets — they're silently absorbed by Snake's filter.

---

## Who Else Uses This?

Satellite C2 appears in:
- **Turla/Snake** — documented by Kaspersky (2015)
- Possibly other Russian-attributed groups (suspected but not confirmed)
- The technique has been referenced in NSA ANT Catalogue under the code name **TRAFFICTHIEF** (as a detection/collection capability, suggesting NSA was aware of its use)

No other non-state actor has been confirmed using satellite C2 at this level of sophistication.

---

## Defence

From a defender's perspective, satellite-based C2 is extremely difficult to block:

| Defence | Effectiveness | Why |
|---------|--------------|-----|
| Firewall blocking by IP | ❌ None | Sender IP is spoofed to a legitimate satellite ISP |
| IDS/IPS signatures | ⚠️ Possible | If you know Snake's magic bytes — but these change per deployment |
| Block satellite provider IPs | ⚠️ Disruptive | Would break legitimate satellite-connected users |
| Endpoint detection (EDR) | ✅ Better | Detect Snake's raw socket / NDIS filter installation |
| Network baseline anomaly | ⚠️ Difficult | Hard to distinguish from normal satellite-delivered content |

The practical defence is detecting Snake at the **endpoint level** (memory forensics, EDR detecting kernel driver installation) rather than at the network level.

---

## References

- [Kaspersky: Turla APT actor infects satellite receivers (2015)](https://securelist.com/satellite-turla-apt-actor-or-how-to-hide-your-activities-in-the-cosmos-and-deep-ocean/72647/)
- [Wired: The CIA and NSA Hack Satellite Links (2015)](https://www.wired.com/2015/09/turla-hackers-hid-servers-inside-satellite-dishes-to-conduct-espionage/)
- [DVB-S Standard: ETSI EN 300 421](https://www.etsi.org/deliver/etsi_en/300400_300499/300421/)
- [MITRE ATT&CK: T1090 — Proxy](https://attack.mitre.org/techniques/T1090/)
