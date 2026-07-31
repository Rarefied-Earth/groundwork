# MCP Registry pack

Published to the official MCP Registry as **`io.github.Rarefied-Earth/groundwork`**
v1.7.1 on 2026-07-30 (registry timestamp 2026-07-31T01:01:55Z).

Verify:

```bash
curl -s "https://registry.modelcontextprotocol.io/v0/servers?search=groundwork&version=latest"
```

## Remotes

| URL | Auth | Purpose |
|---|---|---|
| `https://connector.rarefied.earth/public/mcp` | none | Anonymous discovery + 10s proof |
| `https://connector.rarefied.earth/mcp` | Bearer via OAuth 2.1 PKCE account link | Tenant company-state feed |

Republish after metadata changes:

```bash
mcp-publisher login github -token "$(gh auth token)"
mcp-publisher publish
```

Run both from this directory. The gh CLI keyring token of a `Rarefied-Earth`
org member is accepted; no separate PAT was needed for the v1.7.1 publish.

## v1.7.1 (published 2026-07-30)

Copy-only republish; no code or npm change. The published v1.7.0 description
still read "public company-state discovery and a human-approved Pro claim",
the retired pre-2026-07-30 contract, so the top of the agent discovery funnel
was teaching agents a flow that no longer exists. `groundwork_smoke.py` does
not read the registry, which is why nothing caught it.

- `description` now reads: "Rarefied Earth Groundwork MCP: company memory for
  AI agents. 14-day full-access trial, no card." It keeps the disambiguated
  name (four unrelated projects are called "Groundwork" and the description is
  the field a search result shows), keeps "company memory" (that search
  returned zero registry results on 2026-07-30, so the phrase a stranger
  searches has to live here), and leads the remaining characters with the
  access truth. The schema caps this field at 100 characters; this is 95.
- The `Authorization` header description carries what the cap pushed out: the
  tenant-feed contents (brand, voice rules, charter, priorities, module
  inventory, entitled skills), the OAuth 2.1 PKCE account link MCP clients
  complete on their own, the trial terms (14 days, full catalog, no card
  taken, nothing renews, paid tier chosen after), and the note that the
  anonymous public remote needs none of it.

The bump to 1.7.1 exists because the registry rejects a duplicate version.
This record declares no `packages` block, so the bump is registry metadata
only; `package.json` deliberately stays at 1.7.0 and npm publication remains
parked.

Namespace note: GitHub org auth publishes `io.github.Rarefied-Earth/*`. Domain namespace `earth.rarefied/*` needs DNS/HTTP auth separately.
