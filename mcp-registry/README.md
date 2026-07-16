# MCP Registry pack

Published to the official MCP Registry as **`io.github.Rarefied-Earth/groundwork`** (v1.4.0, 2026-07-16).

Verify:

```bash
curl -s "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.Rarefied-Earth/groundwork"
```

## Remotes

| URL | Auth | Purpose |
|---|---|---|
| `https://connector.rarefied.earth/public/mcp` | none | Anonymous discovery + 10s proof |
| `https://connector.rarefied.earth/mcp` | Bearer | Tenant company-state feed |

Republish after metadata changes:

```bash
mcp-publisher login github -token "$GITHUB_TOKEN"
mcp-publisher publish
```

Namespace note: GitHub org auth publishes `io.github.Rarefied-Earth/*`. Domain namespace `earth.rarefied/*` needs DNS/HTTP auth separately.
