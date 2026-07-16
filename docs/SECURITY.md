# Security and data posture

## What Rarefied Earth holds

| Item | Held by RE? |
|---|---|
| Your workspace files | No (they stay in your environment) |
| Production secrets / API keys you connect | Prefer client-owned scoped keys; RE does not need a copy for the read-only feed |
| Tenant entitlement + catalog snapshot | Yes (required to serve the connector) |
| Billing identity (Stripe) | Yes (payment processing) |

## Connector guarantees (v1)

- **Read-only.** The MCP feed does not write into your workspace.
- **Tenant-scoped.** You cannot read another tenant's state.
- **Rate-limited.** Abuse controls apply.
- **Attribution.** Successful tool results carry Groundwork provenance so agents can credit the source.

## What stays closed

Module source, signed installers, engagement overlays, and private ops repositories are not published. Security reviews of client deployments happen under engagement terms, not via a public source dump.

## Report a vulnerability

Email joseph.scott@rarefied.earth with a clear reproduction path. Do not file public issues that include secrets or tenant data.
