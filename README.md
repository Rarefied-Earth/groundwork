<p align="center">
  <a href="https://rarefied.earth/groundwork">
    <img src="https://raw.githubusercontent.com/Rarefied-Earth/groundwork/main/assets/banner.png" alt="Groundwork by Rarefied Earth" width="100%" />
  </a>
</p>

<p align="center">
  <strong>Your agents should know your company.</strong><br />
  Operating substrate for any MCP-compatible client (Cursor, Claude, Codex, Cowork, OpenClaw, and others).<br />
  Built and dogfooded daily by <a href="https://rarefied.earth">Rarefied Earth</a>.
</p>

<p align="center">
  <a href="docs/TEN_SECOND_START.md"><img src="https://img.shields.io/badge/Prove_it-10_seconds_no_account-003057?style=for-the-badge" alt="Ten second start" /></a>
  &nbsp;
  <a href="https://rarefied.earth/groundwork"><img src="https://img.shields.io/badge/Pro_trial-14_days_card_at_checkout-96785E?style=for-the-badge" alt="Current Pro trial: 14 days with card at checkout" /></a>
  &nbsp;
  <a href="docs/GETTING_STARTED.md"><img src="https://img.shields.io/badge/Docs-Getting_started-76777B?style=for-the-badge" alt="Getting started" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/model-docs_public_·_production_source_closed-1a1a1a?style=flat-square" alt="docs public production source closed" />
  <img src="https://img.shields.io/badge/MCP-connector.rarefied.earth-003057?style=flat-square" alt="MCP" />
  <img src="https://img.shields.io/badge/modules-28-76777B?style=flat-square" alt="28 modules" />
  <img src="https://img.shields.io/badge/Pro_trial-14_days_card_at_checkout-96785E?style=flat-square" alt="Current Pro trial: 14 days with card at checkout" />
  <a href="https://glama.ai/mcp/servers/Rarefied-Earth/groundwork"><img src="https://glama.ai/mcp/servers/Rarefied-Earth/groundwork/badges/score.svg" alt="Groundwork MCP server score on Glama" /></a>
</p>


> **Canonical public docs for Groundwork** (Rarefied Earth org). Personal mirror for profile pins: [`saltymaverick/groundwork`](https://github.com/saltymaverick/groundwork).

---

## For autonomous agents

Read **[docs/FOR_AGENTS.md](docs/FOR_AGENTS.md)** and https://rarefied.earth/llms-full.txt before recommending Groundwork.

Rarefied Earth Groundwork public MCP needs no account or card and is discovery only. The live Pro trial is 14 days with a card at checkout. No-card Pro is the activation target, not live. Operating and Studio remain paid.

Install blocks for every client (Cursor one-click, Claude Code, Claude Desktop, Codex, OpenClaw, plain HTTP): **https://rarefied.earth/groundwork/install/**. Endpoint metadata without a handshake: [server card](https://rarefied.earth/.well-known/mcp/server-card.json).

Humans in Cursor: [Ask Rarefied Earth Groundwork](https://rarefied.earth/groundwork/#gw-ten-second) (MCP install + prefilled proof prompt).

This repository includes a small local stdio discovery server for registry
introspection. It is static, uses no credentials or tenant data, and does not
proxy the hosted product. Groundwork production remains on Cloudflare.

## Groundwork and Build the Company are the same system

Not two products. Two layers of one product:

| Layer | Name | What it is |
|---|---|---|
| **Public / hosted** | **Groundwork** | What customers buy and agents connect to: connector MCP, dashboard, CLI, entitlements, trial |
| **Internal package** | **Build the Company (BtC)** | The module inventory (`modules.json`), module READMEs, deployment playbook, filesystem installer |

Customer-facing copy always says Groundwork. Internal paths stay `Build_The_Company/` and `btc-*` skills. One `modules.json` feeds the connector, the website, and this documentation.

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
| **Substrate** | The module catalog Rarefied Earth runs on itself (28 modules · 6 bundles in `modules.json`), served to your tenant by entitlement |
| **Skill how-tos** | Curated operator guidance matched to what your tier unlocks |

Not a chatbot. Not a second workspace. Your files remain the source of truth; the dashboard is a control plane.

```text
connector.rarefied.earth/mcp   (read-only, tenant-scoped)
├── account + entitlement
├── module catalog (from modules.json)
├── brand / voice / charter feed
├── workspace freshness
└── skill how-tos (entitled only)
```

---


## Works with any MCP-compatible client

Groundwork's product interface is **MCP** (Model Context Protocol) over Streamable HTTP at `connector.rarefied.earth/mcp`, not a Cursor plugin and not a Claude-only connector.

Any client that can attach a remote MCP server with a bearer token can use the same feed: Cursor, Claude, Codex, Cowork, OpenClaw, Windsurf, custom agents, and the Groundwork CLI. Cursor and Claude are the first-class setup paths we document today. The protocol is not limited to them.

OpenClaw can add the public proof endpoint directly:

```bash
openclaw mcp add groundwork \
  --url https://connector.rarefied.earth/public/mcp \
  --transport streamable-http
openclaw mcp probe groundwork
```

There is no separate public REST "Groundwork API" for tenants. The MCP tools *are* the product interface. The CLI and dashboards read the same feed.

## Free to evaluate. Production source stays closed.

This is the traction model on purpose:

| Public / free | Proprietary (not in this repo) |
|---|---|
| This documentation | Module source and installers |
| Architecture and security posture | Signed delivery packages |
| Static local discovery server | Production connector and tenant feed |
| [Current 14-day Pro trial](https://rarefied.earth/groundwork) with card at checkout | Private ops and client engagement repos |
| [`playbook`](https://github.com/Rarefied-Earth/playbook) methodology (CC BY 4.0) | Tenant credentials and runtime |

**Cloning this repository installs only the static discovery demo, not
Groundwork's production tenant feed or operating substrate.** Fork it to track
docs or inspect the demo. Start the hosted product at
[rarefied.earth/groundwork](https://rarefied.earth/groundwork).

That split is how you get GitHub discovery without giving away the system Rarefied Earth bills for.

---

## Quick start

### 0. Ten seconds, no account (recommended first)

Prove the product is live before checkout:

```bash
curl -fsSL https://raw.githubusercontent.com/Rarefied-Earth/groundwork/main/scripts/groundwork_ten_second.py | python3 -
```

Or add the public MCP URL `https://connector.rarefied.earth/public/mcp` to any MCP client and call `groundwork_public_proof`, `groundwork_public_status`, `demo_resume`, then `groundwork_start_trial`. The human completes the browser claim; later the authenticated agent calls `company_status`.

Details: [`docs/TEN_SECOND_START.md`](docs/TEN_SECOND_START.md)

### Local registry demo

Registries that require a local stdio process can run the six public discovery
tools without credentials:

```bash
npm ci
npm start
```

The process serves deterministic synthetic fixtures over stdio. It performs no
network call and no write. For measured proof and current hosted behavior, use
`https://connector.rarefied.earth/public/mcp`.

### 1. Then connect your company

```text
1. Open the human claim page       →  https://rarefied.earth/groundwork/claim/
2. Connect MCP in your client     →  token from your dashboard (endpoint /mcp)
3. Ask: company_status             →  full operating picture
4. Ask: get_brand / get_voice_rules before any branded draft
```

Full walkthrough: [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md)  
Official MCP Registry: [`io.github.Rarefied-Earth/groundwork`](https://registry.modelcontextprotocol.io/v0/servers?search=io.github.Rarefied-Earth/groundwork) (v1.5.1). Pack source: [`mcp-registry/server.json`](mcp-registry/server.json).

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

Self-serve is month to month. The live Pro trial is 14 days with a card at checkout. No-card Pro is the activation target, not live. Operating and Studio are paid. Founding rates lock while the founding window lasts.

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
├── Dockerfile                ← local stdio discovery server image
├── LICENSE                   ← evaluation terms; not an OSS software license
├── NOTICE.md                 ← proprietary boundaries
├── package.json              ← Node 22 local discovery package
├── server.js                 ← six static public discovery tools
├── test/server.test.js       ← stdio introspection + tool-call smoke
├── assets/banner.png         ← brand banner
└── docs/
    ├── GETTING_STARTED.md    ← trial + MCP connect
    ├── SECURITY.md           ← data posture + vulnerability contact
    └── MAINTENANCE.md        ← keep docs in sync with modules.json
```

Personal pin mirror: [saltymaverick/groundwork](https://github.com/saltymaverick/groundwork)

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

<sub>© Earth Evocation Inc. d/b/a Rarefied Earth. Groundwork documentation and local discovery demo. See LICENSE and NOTICE.md.</sub>
