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

**Pending republish (staged 2026-07-30, needs Joe's GitHub token). One command,
nothing else to decide.** `server.json` here is at `1.7.1` and is ahead of the
published `1.7.0` record. The live listing is healthy (`isLatest: true`,
`status: active`) but its description is wrong, and only publishing fixes that.

- `description` said "public company-state discovery and a human-approved Pro
  claim". The Pro claim is retired language and the trial takes no card, so the
  published listing advertises a contract that no longer exists.
  `groundwork_smoke.py` does not cover the registry, which is why nothing caught
  it.
- The replacement keeps the disambiguated name, because four unrelated projects
  are called "Groundwork" and the description is the field a search result shows,
  and it adds "company memory", because that phrase returned zero registry
  results on 2026-07-30 while `groundwork` and `rarefied` both found the listing.
  A searcher who does not already know the name never arrived.

The version is already bumped to `1.7.1` because the registry rejects a duplicate
version, so a republish with `1.7.0` fails. This record declares no `packages`
block, so the bump is registry metadata only and does not require an npm release;
`package.json` deliberately stays at `1.7.0`.

Publishing is Joe's step: it needs a GitHub token for the `Rarefied-Earth` org,
which an agent session does not hold.

Namespace note: GitHub org auth publishes `io.github.Rarefied-Earth/*`. Domain namespace `earth.rarefied/*` needs DNS/HTTP auth separately.
