# Ten-second start (no account)

Prove Groundwork is live before you create an account, add a card, or install anything.

This path uses the **public discovery MCP**: read-only metadata only. No tenant data. No writes. No token.

Measured cold path on 2026-07-16: `initialize` + `groundwork_public_proof` ≈ **0.13s** against `https://connector.rarefied.earth/public/mcp` (well under 10 seconds).

---

## Fastest proof (zero config)

From any machine with Python 3 and network access:

```bash
curl -fsSL https://raw.githubusercontent.com/Rarefied-Earth/groundwork/main/scripts/groundwork_ten_second.py | python3 -
```

Or clone this docs repo and run:

```bash
python3 scripts/groundwork_ten_second.py
```

You should see: connector version, available reduction %, precision state, and elapsed time.

---

## Add the public MCP to your client (< 10s of human work)

Remote URL (no auth):

```text
https://connector.rarefied.earth/public/mcp
```

### Cursor (example)

In MCP settings / `mcp.json`, add a remote Streamable HTTP server pointed at that URL. No bearer token.

### Claude / Codex / Cowork / other MCP hosts

Same URL. Any host that can attach a remote MCP server over Streamable HTTP works. Cursor and Claude are first-class examples, not the product boundary.

### Then ask your agent

> Call `groundwork_public_proof` and tell me the available reduction and measured_at.

Or:

> Call `groundwork_public_status` and list the supported hosts.

Public tools (only these three):

| Tool | What you get |
|---|---|
| `groundwork_public_status` | Product identity, supported hosts, delivery truth, docs links |
| `groundwork_trial_contract` | Exact anonymous / trial contract (what is blocked before auth) |
| `groundwork_public_proof` | Rarefied Earth client-zero proof: available reduction, precision, timestamp |

---

## What this is not

- Not your company feed. Tenant tools live at `https://connector.rarefied.earth/mcp` with a bearer token after trial or deployment.
- Not open-source product source. This repo is docs; runtime source stays closed.
- Not a REST "Groundwork API." MCP tools are the product interface.

---

## Next step after you see the proof

1. Start the 14-day trial at [rarefied.earth/groundwork](https://rarefied.earth/groundwork), or
2. Request an operator-led deployment from the same page if you need the full filesystem substrate.

Full walkthrough: [GETTING_STARTED.md](GETTING_STARTED.md)
