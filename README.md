# Groundwork

**Your agents should know your company.**

Groundwork installs the operating substrate Rarefied Earth runs on (brand, voice, clients, billing, context, approvals, and memory) into your workspace and the AI tools you already use. Agents stop working from a blank page.

<p align="left">
  <a href="https://rarefied.earth/groundwork"><img src="https://img.shields.io/badge/product-rarefied.earth%2Fgroundwork-96785E?style=flat-square" alt="Product page" /></a>
  <a href="https://github.com/Rarefied-Earth"><img src="https://img.shields.io/badge/org-Rarefied--Earth-003057?style=flat-square" alt="Rarefied Earth" /></a>
  <a href="https://admin.rarefied.earth"><img src="https://img.shields.io/badge/dashboard-admin.rarefied.earth-76777B?style=flat-square" alt="Dashboard" /></a>
</p>

---

## What it is

Groundwork is Rarefied Earth's productized operating substrate (internally: **Build the Company**). One system, two names:

| Name | Audience | Meaning |
|---|---|---|
| **Groundwork** | Public / buyers | The product you evaluate and buy |
| **Build the Company** | Internal package paths | The module registry, deployment playbook, and installer |

The company that built it runs on it every day. That is the dogfood-and-productize model: Rarefied Earth is always client zero.

---

## What it installs

Not a chatbot. A company-state layer your agents can read:

| Capability | Outcome |
|---|---|
| **Company memory** | Brand, voice rules, charter, current priorities available to every agent session |
| **Module inventory** | The operating modules the firm actually runs, with entitlement and health |
| **Skill discovery** | Curated how-tos your tier entitles, discoverable from Cursor / Claude / other MCP clients |
| **Connector feed** | Remote, read-only MCP at `connector.rarefied.earth`; zero model calls on Rarefied Earth's account |
| **Operator dashboard** | Modules, usage, keys, billing at [admin.rarefied.earth](https://admin.rarefied.earth) |

---

## How to use the connector (agents)

1. Ask for the operating picture: `company_status`
2. Before drafting anything branded: `get_brand` + `get_voice_rules`
3. Ask what skills you have: `list_available_skills` → `describe_skill`
4. Review modules and health on the dashboard

Full product page and self-serve checkout: **[rarefied.earth/groundwork](https://rarefied.earth/groundwork)**

---

## What this repository is (and is not)

**This repo is the public product overview.** Framing, architecture at a glance, and pointers to live surfaces.

**It is not** the private delivery package. Module source, tenant credentials, engagement overlays, and installer internals stay in private repositories. That split is intentional: methodology and product framing are public; deployment artifacts are not.

For how Rarefied Earth operates as a firm (voice, agent charter, brand discipline), see [`playbook`](https://github.com/Rarefied-Earth/playbook).

---

## Relationship to the rest of the stack

```text
Rarefied Earth (company)
    └── Groundwork (product you buy)
            ├── Connector MCP  → agent-readable company state
            ├── Dashboard      → operator surface
            └── Modules        → the substrate RE dogfoods first

Chloe (internal R&D) is separate: patterns may transfer; product boundary does not.
```

---

## Contact

Product: [rarefied.earth/groundwork](https://rarefied.earth/groundwork)  
Company: [rarefied.earth](https://rarefied.earth) · joseph.scott@rarefied.earth  
Org: [github.com/Rarefied-Earth](https://github.com/Rarefied-Earth)

---

<sub>Copyright (c) Earth Evocation Inc. d/b/a Rarefied Earth. Product overview only. No license to module source or trademarks is granted by this repository.</sub>
