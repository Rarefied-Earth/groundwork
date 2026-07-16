# MCP Registry pack (draft)

`server.json` describes Groundwork for [MCP Registry](https://modelcontextprotocol.io) discovery.

## Remotes

| URL | Auth | Purpose |
|---|---|---|
| `https://connector.rarefied.earth/public/mcp` | none | Anonymous discovery + client-zero proof |
| `https://connector.rarefied.earth/mcp` | `Authorization: Bearer <token>` | Tenant company-state feed |

## Publish status

**Prepared, not published.** Official registry publish needs a verified publisher identity and a deliberate go-live (Joe). Until then, clients can still use the URLs directly; this file is the packaging artifact.

## Validate locally

Against the published schema when tooling is available:

```bash
# example — use the registry's documented validator when publishing
cat server.json
```

Ten-second human path: [`../docs/TEN_SECOND_START.md`](../docs/TEN_SECOND_START.md)
