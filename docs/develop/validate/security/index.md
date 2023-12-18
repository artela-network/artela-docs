---
sidebar_position: 3
---

# Validator Security

## Key Management

[TMKMS](https://github.com/iqlusioninc/tmkms) is a Key Management Service (KMS) that allows separating key
management from CometBFT nodes. In addition it provides other advantages such as:

- Improved security and risk management policies
- Unified API and support for various HSM (hardware security modules)
- Double signing protection (software or hardware based)

It is recommended that the KMS service runs in a separate physical hosts. On this page you can learn how to setup
a Key Management System for Artela with our without ledger.

### Install TMKMS onto the node

You will need the following prerequisites:

- ✅ **Rust** (stable; **1.56+**): https://rustup.rs/
- ✅ **C compiler**: e.g. gcc, clang
- ✅ **pkg-config**
- ✅ **libusb** (1.0+). Install instructions for common platforms
- ✅ Debian/Ubuntu

  ```bash
  apt install libusb-1.0-0-dev
  ```

- ✅ RedHat/CentOS

  ```bash
  yum install libusb1-devel
  ```

- ✅ macOS (Homebrew)

  ```
  brew install libusb
  ```

:::tip
For `x86_64` architecture only:

Configure `RUSTFLAGS` environment variable:

```bash
export RUSTFLAGS=-Ctarget-feature=+aes,+ssse3
```

:::

We are ready to install KMS. There are 2 ways to do this: compile from source or install with Rusts cargo-install.
We’ll use the first option.

#### Compile from source code

The following example adds `--features=ledger` to enable Ledger  support.
`tmkms` can be compiled directly from the git repository source code, using the following commands:

```bash
gh repo clone iqlusioninc/tmkms && cd tmkms
[...]
cargo build --release --features=ledger
```

Alternatively, substitute `--features=yubihsm` to enable [YubiHSM](https://www.yubico.com/products/hardware-security-module/)
support.

If successful, it will produce the `tmkms` executable located at: `./target/release/tmkms`.

### Configuration

A KMS can be configured using the following HSMs

#### YubiHSM

Detailed information on how to setup a KMS with [YubiHSM 2](https://www.yubico.com/products/hardware-security-module/)
can be found [here](https://github.com/iqlusioninc/tmkms/blob/master/README.yubihsm.md).

## Sentry Nodes (DDOS Protection)

Validators are responsible for ensuring that the network can sustain denial of service attacks.

One recommended way to mitigate these risks is for validators to carefully structure their network topology in a so-called sentry node architecture.

Validator nodes should only connect to full-nodes they trust because they operate them themselves or are run by other validators they know socially. A validator node will typically run in a data center. Most data centers provide direct links the networks of major cloud providers. The validator can use those links to connect to sentry nodes in the cloud. This shifts the burden of denial-of-service from the validator's node directly to its sentry nodes, and may require new sentry nodes be spun up or activated to mitigate attacks on existing ones.

Sentry nodes can be quickly spun up or change their IP addresses. Because the links to the sentry nodes are in private IP space, an internet based attacked cannot disturb them directly. This will ensure validator block proposals and votes always make it to the rest of the network.

To setup your sentry node architecture you can follow the instructions below:

Validators nodes should edit their config.toml:

```bash
# Comma separated list of nodes to keep persistent connections to
# Do not add private peers to this list if you don't want them advertised
persistent_peers =[list of sentry nodes]

# Set true to enable the peer-exchange reactor
pex = false
```

Sentry Nodes should edit their config.toml:

```bash
# Comma separated list of peer IDs to keep private (will not be gossiped to other peers)
# Example ID: 3e16af0cead27979e1fc3dac57d03df3c7a77acc@3.87.179.235:26656

private_peer_ids = "node_ids_of_private_peers"
```

## Environment Variables

By default, uppercase environment variables with the following prefixes will replace lowercase command-line flags:

- `AA` (for Artela flags)
- `TM` (for CometBFT flags)
- `BC` (for democli or basecli flags)

For example, the environment variable `AA_CHAIN_ID` will map to the command line flag `--chain-id`. Note that while explicit command-line flags will take precedence over environment variables, environment variables will take precedence over any of your configuration files. For this reason, it's imperative that you lock down your environment such that any critical parameters are defined as flags on the CLI or prevent modification of any environment variables.

## Checklist

Find below a security checklist survey to go through the security measures of a validator.
Conduct survey on the hosting data centre and Node Setup, and compare your result with the best practice suggested below.

### General Controls of Hosting Data Centre

| Controls Category | Description of Best Practice    |
|-------------------|---------------------------------|
| Data Center       | Redundant Power                 |
| Data Center       | Redundant Cooling               |
| Data Center       | Redundant Networking            |
| Data Center       | Physical Cage/Gated Access      |
| Data Center       | Remote Alerting Security Camera |

### Node Setup

| Controls Category                | Description of Best Practice                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| General System Security          | Operating system appropriately patched. Kernel is updated to latest stable version. The node should be operated in x86_64 environment                                                                                                                                                                                                                                                                                                                                                                                                   |
| General System Security          | Auto-updates for operation system is configured. Toolkit for automatic upgrades exists (e.g. auter, yum-cron, dnf-automatic, unattended-upgrades)                                                                                                                                                                                                                                                                                                                                                                                       |
| General System Security          | Security framework enabled and enforcing. SELinux / AppArmor / Tomoyo / Grsecurity Enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| General System Security          | No insecure and unnecessary services Installed. (e.g. telnet, rsh, inetd, etc ...)                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| General System Security          | GRUB boot loader password is configured. Grub2 configured with password                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| General System Security          | Only root permissions on core system files                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| File Directory Security          | Secure the directory `~/.artelad` to be accessible by owner only                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Binary Configuration             | Recommend the following settings in config.toml for both performance and security - For **sentry nodes**: `max_num_inbound_peers = 500, max_num_outbound_peers = 50, flush_throttle_timeout = "300ms"` - For **validator node**: `max_num_inbound_peers = 100, max_num_outbound_peers = 10, flush_throttle_timeout = "100ms"`                                                                                                                                                                                                           |
| Account Security & Remote Access | Following Password policies are enforced: No Blank Passwords; Weak Passwords Not Allowed                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Account Security & Remote Access | Following SSH configurations are enabled: PermitRootLogin: `no`; PasswordAuthentication `no`; ChallengeResponseAuthentication `no`; UsePAM `yes`; AllowUsers `Necessary user only`; AllowGroups `Necessary group only`.                                                                                                                                                                                                                                                                                                                 |
| Networking                       | Network throughput test using speedtest. Recommend to have at least 5 Mbps upload, 5 Mbps download)                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Networking                       | Host-based (e.g. iptables) or cloud-based (e.g. AWS Security Group) firewall is enabled to protect all the involved nodes. Remote management ports (e.g. SSH - TCP 22) should only be exposed to selected IP instead of the internet. No overly permissive rules (e.g. wide range of allowed ports 1-65535) should be set. For internal communication channels between nodes, they should be set with specific source and destination addresses. For internet reachable nodes, set TCP 26656 to be the only incoming port, if possible. |
| Networking                       | Intrusion Detection / Prevention System (e.g. Fail2Ban, Snort, OSSEC) is installed and enforcing                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Networking                       | Setup sentry node architecture to protect validator node, and set firewall rules to restrict direct internet access to it.                                                                                                                                                                                                                                                                                                                                                                                                              |
| Networking                       | The Remote Procedure Call (RPC) provides sensitive operations and information that is not supposed to be exposed to the Internet. By default, RPC is on and allow connection from `127.0.0.1` only. Please be extremely careful if you need to allow RPC from other IP addresses.                                                                                                                                                                                                                                                       |
| Redundancy                       | Hot standby node is setup with the same configuration as main node                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Redundancy                       | System monitoring and alerting is setup to alert owners on anomalies                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Key Management                   | Setup TMKMS with HSM or equivalent online service, which should replace the static key file.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| DDOS                             | Setup validator in accordance with sentry architecture. Kindly refer to the setup [instruction](https://docs.cometbft.com/v0.38/core/validators) and [detailed description](https://forum.cosmos.network/t/sentry-node-architecture-overview/454).                                                                                                                                                                                                                                             |
