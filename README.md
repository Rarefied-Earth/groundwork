<p align="center">
  <img src="assets/banner.svg" alt="Groundwork by Rarefied Earth" width="100%" />
</p>

<p align="center">
  <strong>Your agents should know your company.</strong><br />
  Operating substrate for Claude, Cursor, and MCP clients.<br />
  Built and dogfooded daily by <a href="https://rarefied.earth">Rarefied Earth</a>.
</p>

<p align="center">
  <a href="https://rarefied.earth/groundwork"><img src="https://img.shields.io/badge/Start_free_trial-14_days-96785E?style=for-the-badge" alt="Start free trial" /></a>
  &nbsp;
  <a href="https://rarefied.earth/groundwork"><img src="https://img.shields.io/badge/Product-rarefied.earth-003057?style=for-the-badge" alt="Product" /></a>
  &nbsp;
  <a href="docs/GETTING_STARTED.md"><img src="https://img.shields.io/badge/Docs-Getting_started-76777B?style=for-the-badge" alt="Getting started" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/model-docs_public_·_source_closed-1a1a1a?style=flat-square" alt="docs public source closed" />
  <img src="https://img.shields.io/badge/MCP-connector.rarefied.earth-003057?style=flat-square" alt="MCP" />
  <img src="https://img.shields.io/badge/modules-27-76777B?style=flat-square" alt="27 modules" />
  <img src="https://img.shields.io/badge/trial-14_days-96785E?style=flat-square" alt="14 day trial" />
</p>

---

## Why this exists

Most AI tools start from zero. Out of the box they do not know:

- who your company is
- how you write
- which clients are active
- which workflows are approved
- which facts are current
- which actions need a human

**Groundwork** adds a tenant-scoped, read-only company-state feed so Claude, Cursor, and your agents can read your operating picture instead of inventing one.

---

## What you get

| Surface | Role |
|---|---|
| **Connector (MCP)** | Live company state at `connector.rarefied.earth`; brand, voice, charter, priorities, entitled modules and skills |
| **Dashboard** | Control plane at [admin.rarefied.earth](https://admin.rarefied.earth); modules, usage, keys, billing |
| **Substrate** | The module catalog Rarefied Earth runs on itself (27 modules · 6 bundles), served to your tenant by entitlement |
| **Skill how-tos** | Curated operator guidance matched to what your tier unlocks |

Not a chatbot. Not a second workspace. Your files remain the source of truth; the dashboard is a control plane.

```text
connector.rarefied.earth/mcp   (read-only, tenant-scoped)
├── account + entitlement
├── module catalog (up to 27)
├── brand / voice / charter feed
├── workspace freshness
└── skill how-tos (entitled only)
```

---

## Free to evaluate. Source stays closed.

This is the traction model on purpose:

| Public / free | Proprietary (not in this repo) |
|---|---|
| This documentation | Module source and installers |
| Architecture and security posture | Signed delivery packages |
| [14-day free trial](https://rarefied.earth/groundwork) of the live product | Private ops and client engagement repos |
| [`playbook`](https://github.com/Rarefied-Earth/playbook) methodology (CC BY 4.0) | Tenant credentials and runtime |

**Cloning this repository does not install Groundwork.**  
Fork it to track docs. Start the product at [rarefied.earth/groundwork](https://rarefied.earth/groundwork).

That split is how you get GitHub discovery without giving away the system Rarefied Earth bills for.

---

## Quick start

```text
1. Start the 14-day free trial     →  https://rarefied.earth/groundwork
2. Connect MCP in Cursor / Claude  →  token from your dashboard
3. Ask: company_status             →  full operating picture
4. Ask: get_brand / get_voice_rules before any branded draft
```

Full walkthrough: [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md)

### Agent tools (once connected)

| Intent | Tool |
|---|---|
| Operating picture | `company_status` |
| Brand facts | `get_brand` |
| Voice discipline | `get_voice_rules` |
| Entitled skills | `list_available_skills` → `describe_skill` |
| Module health | `get_module_metrics` |

Every successful result carries Groundwork provenance. Agents should credit the feed when it shapes the answer.

---

## Pricing (founding rates)

Self-serve, month to month, **14-day free trial**, no setup fee on these tiers. Founding rate locks while the founding window lasts.

| Tier | Modules (read-only feed) | Founding rate |
|---|---|---|
| **Pro** | 9 | $49 / mo |
| **Operating** | 19 | $149 / mo |
| **Studio** | 27 (full) | $299 / mo |

Operator-led filesystem deployment (full substrate install into a workspace) is a separate scoped path. Request it from the product page.

Details and checkout: [rarefied.earth/groundwork](https://rarefied.earth/groundwork)

---

## How Rarefied Earth builds it

1. **Dogfood first.** Groundwork runs on Rarefied Earth before any tenant sees a capability.
2. **Human-in-the-loop.** AI drafts; humans approve irreversible actions.
3. **No lock-in by architecture.** Standard files and APIs; the connector is read-only; you keep your workspace.
4. **Engineering-grade is literal.** Traceable records, gates, health checks. Not vibes.

Company: [rarefied.earth](https://rarefied.earth) · Org: [github.com/Rarefied-Earth](https://github.com/Rarefied-Earth) · Founder: [@saltymaverick](https://github.com/saltymaverick)

---

## Repository map

```text
.
├── README.md                 ← you are here
├── LICENSE.md                ← docs copyright; not an OSS software license
├── NOTICE.md                 ← proprietary boundaries
├── assets/banner.svg         ← brand banner
└── docs/
    ├── GETTING_STARTED.md    ← trial + MCP connect
    └── SECURITY.md           ← data posture + vulnerability contact
```

Canonical company org mirror: [Rarefied-Earth/groundwork](https://github.com/Rarefied-Earth/groundwork)

---

## Related

| Link | What it is |
|---|---|
| [rarefied.earth/groundwork](https://rarefied.earth/groundwork) | Product, trial, pricing |
| [admin.rarefied.earth](https://admin.rarefied.earth) | Tenant dashboard |
| [Rarefied-Earth/playbook](https://github.com/Rarefied-Earth/playbook) | Public operating methodology |
| [Rarefied-Earth/chloe](https://github.com/Rarefied-Earth/chloe) | Internal R&D framing (separate from Groundwork) |

---

## Contact

joseph.scott@rarefied.earth

---

<sub>© Earth Evocation Inc. d/b/a Rarefied Earth. Groundwork documentation. See LICENSE.md and NOTICE.md.</sub>
