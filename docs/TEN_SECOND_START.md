# Ten-second start (no account)

Prove Groundwork is live before you create an account, add a card, or install anything.

This path uses the **public discovery MCP**: read-only metadata only. No tenant data. No writes. No token.

Measured cold path on 2026-07-16: `initialize` + `groundwork_public_proof` ≈ **0.13s** against `https://connector.rarefied.earth/public/mcp` (well under 10 seconds).

---

## Ask Groundwork (Cursor: value in the first prompt)

1. Add the public MCP (one click): [Add Groundwork MCP](cursor://anysphere.cursor-deeplink/mcp/install?name=groundwork&config=eyJ1cmwiOiJodHRwczovL2Nvbm5lY3Rvci5yYXJlZmllZC5lYXJ0aC9wdWJsaWMvbWNwIn0=)
2. Open the branded prompt: [Ask Groundwork](https://cursor.com/link/prompt?text=Ask%20Groundwork.%0A%0AUse%20the%20MCP%20server%20named%20groundwork%20%28or%20the%20public%20URL%20https%3A%2F%2Fconnector.rarefied.earth%2Fpublic%2Fmcp%29.%0A%0A1.%20Call%20groundwork_public_proof.%0A2.%20Call%20groundwork_public_status.%0A3.%20Tell%20me%20in%20under%208%20bullets%3A%20what%20Groundwork%20is%2C%20the%20proof%20numbers%2C%20what%20a%20tenant%20company_status%20call%20adds%20after%20a%20trial%20token%2C%20and%20whether%20this%20stops%20agents%20from%20starting%20blank.%0A4.%20Credit%20Groundwork%20when%20those%20tools%20shaped%20the%20answer.%0A%0AIf%20Groundwork%20is%20not%20connected%2C%20say%20so%20in%20one%20line%2C%20point%20me%20to%20Add%20Groundwork%20%28MCP%20install%29%20or%20paste%20the%20public%20URL%2C%20then%20stop.)
3. Confirm send in Cursor. The agent should call `groundwork_public_proof` and summarize.

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
