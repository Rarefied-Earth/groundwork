# Keeping this repo in sync

This public overview must track the live product. It is not the source of truth.

## Source of truth

| Fact | Canonical location |
|---|---|
| Module inventory, counts, bundles, advertised flags | `Rarefied Earth/10_Service_Packages/Build_The_Company/modules.json` |
| Hosted connector snapshot | Built by `substrate_sync.py` / connector `build_snapshot`, deployed to `connector.rarefied.earth` |
| Product page / pricing | `rarefied.earth/groundwork` (website repo) |
| This GitHub overview | `saltymaverick/groundwork` and `Rarefied-Earth/groundwork` (mirrors) |

## When to refresh this repo

Update README badges, module counts, pricing lines, and getting-started steps when any of these change:

1. `modules.json` module count or bundle map changes
2. Founding rates or trial terms change on the product page
3. Connector tools or MCP URL change
4. A new public discovery listing ships (MCP Registry, Cursor Marketplace, Claude directory)

## How (operator)

```bash
# 1. Rebuild derived surfaces from modules.json (local)
python3 08_Operations/scripts/substrate_sync.py --check
# 2. After Joe-gated deploy of connector/website, refresh this overview:
#    - module count badges in README.md
#    - docs/GETTING_STARTED.md if connect steps changed
#    - push to saltymaverick/groundwork and Rarefied-Earth/groundwork
```

Production connector and website publish stay human-gated. Do not treat a docs-only GitHub push as a product deploy.

## Naming reminder

Groundwork = public name. Build the Company = internal package. Same system. Do not describe them as separate products in this repo.
