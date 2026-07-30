# MCP Registry pack

Published to the official MCP Registry as **`io.github.Rarefied-Earth/groundwork`**
v1.7.0 on 2026-07-24.

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

**Pending republish (staged 2026-07-30, needs Joe's GitHub token).** `server.json`
here is ahead of the published v1.7.0 record on two strings and neither is live yet:

- `description` said "public company-state discovery and a human-approved Pro
  claim". The Pro claim is retired language; the trial is the 14-day full-access
  trial. The published record still advertises the retired contract, and
  `groundwork_smoke.py` does not cover the registry, so nothing caught it.
- The new description also drops the branded-only phrasing. A registry search
  for `groundwork` or `rarefied` finds the listing; `company memory` returned
  zero results on 2026-07-30, so a searcher who does not already know the name
  never arrives.

The registry rejects a duplicate version, so republishing metadata means bumping
`version` (1.7.1) or cutting the next release. The listing itself is healthy:
v1.7.0, `isLatest: true`, `status: active`.

Namespace note: GitHub org auth publishes `io.github.Rarefied-Earth/*`. Domain namespace `earth.rarefied/*` needs DNS/HTTP auth separately.
