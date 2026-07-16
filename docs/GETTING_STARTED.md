# Getting started

Groundwork is a hosted product. You do not install it by cloning this repository.

## Clients

Groundwork speaks MCP (Streamable HTTP). If your agent host can add a remote MCP server, it can use Groundwork. We publish first-class setup notes for Cursor and Claude; Codex, Cowork, and other MCP clients use the same endpoints.

| Surface | URL | Auth |
|---|---|---|
| **Public discovery** (no account) | `https://connector.rarefied.earth/public/mcp` | none |
| **Tenant feed** (your company) | `https://connector.rarefied.earth/mcp` | Bearer token |

## Path 0: Ten-second proof (do this first)

No card. No token. Confirms the connector is live and returns Rarefied Earth's public client-zero proof.

```bash
curl -fsSL https://raw.githubusercontent.com/Rarefied-Earth/groundwork/main/scripts/groundwork_ten_second.py | python3 -
```

Or wire the public URL into your MCP client and call `groundwork_public_proof`.

Walkthrough: [TEN_SECOND_START.md](TEN_SECOND_START.md)

## Path A: 14-day free trial (recommended for your company)

1. Open [rarefied.earth/groundwork](https://rarefied.earth/groundwork).
2. Start the free trial (card on file; converts at day 14 unless you cancel).
3. Connect `https://connector.rarefied.earth/mcp` in any MCP-compatible client using your tenant token.
4. Ask your agent for `company_status`, then `get_brand` / `get_voice_rules`.

Founding rates (while they last): Pro $49/mo · Operating $149/mo · Studio $299/mo. Month to month after trial. No setup fee on self-serve tiers.

## Path B: Operator deployment

If you need the full filesystem substrate installed into a workspace (operator-led), request deployment from the product page. That path is scoped and priced separately from self-serve.

## Path C: Read how Rarefied Earth operates

Methodology only (not the product runtime):

- [Rarefied-Earth/playbook](https://github.com/Rarefied-Earth/playbook) — voice, brand discipline, agent charter (CC BY 4.0)

## Verify the tenant connector

Once connected with a token, a healthy session can answer:

| Ask | Tool |
|---|---|
| What is the operating picture? | `company_status` |
| What are our brand rules? | `get_brand` |
| How should agents write? | `get_voice_rules` |
| What skills am I entitled to? | `list_available_skills` |

The connector is tenant-scoped and read-only. It makes zero model calls on Rarefied Earth's account.

## API note

There is no separate public REST API for tenants. The MCP tool surface is the product interface. The CLI is a convenience client over the same JSON-RPC feed.
