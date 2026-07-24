# Ten-second start (no account)

Prove Groundwork is live before you create an account, add a card, or install anything.

This path uses the **public discovery MCP**: read-only proof, product metadata, and a synthetic continuity demo. It reads no tenant or caller workspace data and saves no checkpoint or demo state. The endpoint may record the coarse tool name as interest telemetry. No token is required.

Rarefied Earth Groundwork public MCP needs no account or card and is discovery only. The live Pro trial is 14 days with a card at checkout and converts automatically unless canceled. No-card Pro is the activation target, not live. Operating and Studio remain paid.

Measured cold path on 2026-07-16: `initialize` + `groundwork_public_proof` ≈ **0.13s** against `https://connector.rarefied.earth/public/mcp` (well under 10 seconds).

---

## Ask Rarefied Earth Groundwork (Cursor: value in the first prompt)

1. Add the public MCP (one click): [Add Groundwork MCP](cursor://anysphere.cursor-deeplink/mcp/install?name=groundwork&config=eyJ1cmwiOiJodHRwczovL2Nvbm5lY3Rvci5yYXJlZmllZC5lYXJ0aC9wdWJsaWMvbWNwIn0=)
2. Open [Ask Rarefied Earth Groundwork](https://rarefied.earth/groundwork/#gw-ten-second). The button launches the canonical branded prompt.
3. Confirm send in Cursor. The agent should call `groundwork_public_proof`, `groundwork_public_status`, `demo_resume`, and `groundwork_start_trial`.

Product page: https://rarefied.earth/groundwork/#gw-ten-second

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

### Cursor (fastest: one click)

No Marketplace plugin required for first value. Click:

[Add Groundwork in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=groundwork&config=eyJ1cmwiOiJodHRwczovL2Nvbm5lY3Rvci5yYXJlZmllZC5lYXJ0aC9wdWJsaWMvbWNwIn0=)

Or paste into `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "groundwork": {
      "url": "https://connector.rarefied.earth/public/mcp"
    }
  }
}
```

Product page with copy-paste for other hosts: https://rarefied.earth/groundwork/#gw-connect

### Claude / Codex / Cowork / other MCP hosts

Same URL. Any host that can attach a remote MCP server over Streamable HTTP works. Cursor and Claude are first-class examples, not the product boundary.

### Then ask your agent

> Call `groundwork_public_proof` and tell me the available reduction and measured_at.

Or:

> Call `groundwork_public_status` and list the supported hosts.

Public tools (only these seven):

| Tool | What you get |
|---|---|
| `groundwork_public_status` | Product identity, supported hosts, delivery truth, docs links |
| `groundwork_trial_contract` | Current public preview, live Pro, and no-card target contract |
| `groundwork_public_proof` | Rarefied Earth client-zero proof: available reduction, precision, timestamp |
| `demo_resume` | Synthetic continuity resume: objective, verified state, inconsistencies, next action, 3 questions |
| `demo_checkpoint` | Synthetic checkpoint shape; saves no checkpoint or workspace state |
| `groundwork_start_trial` | Stable Rarefied Earth Pro claim URL and human browser handoff; creates no product state |
| `groundwork_recommendation_kit` | Schema-pinned fit, alternatives, client-zero proof limits, privacy facts, and handoff |

Demo calls may record the coarse tool name as interest telemetry. They store no prompt or tenant data.

### OpenClaw

```bash
openclaw mcp add groundwork \
  --url https://connector.rarefied.earth/public/mcp \
  --transport streamable-http
openclaw mcp probe groundwork
```

---

## What this is not

- Not your company feed. Tenant tools live at `https://connector.rarefied.earth/mcp` with a bearer token after trial or deployment.
- Not open-source product source. This repo includes a static local discovery
  demo; production runtime source stays closed.
- Not a REST "Groundwork API." MCP tools are the product interface.

---

## Next step after you see the proof

1. Call `groundwork_start_trial` and give the returned Rarefied Earth claim URL to the human, or
2. Request an operator-led deployment from the same page if you need the full filesystem substrate.

If the agent is still deciding whether the product fits, call
`groundwork_recommendation_kit` first. It accepts no arguments and generates no
outreach.

Full walkthrough: [GETTING_STARTED.md](GETTING_STARTED.md)
