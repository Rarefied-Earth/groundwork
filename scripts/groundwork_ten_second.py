#!/usr/bin/env python3
"""Prove Groundwork public discovery is live in well under 10 seconds.

Zero dependencies. No account. No token.
Endpoint: POST https://connector.rarefied.earth/public/mcp
"""

from __future__ import annotations

import json
import sys
import time
import urllib.error
import urllib.request

ENDPOINT = "https://connector.rarefied.earth/public/mcp"
USER_AGENT = "GroundworkTenSecond/1.0 (+https://github.com/Rarefied-Earth/groundwork)"
PROTOCOL = "2025-06-18"
TIMEOUT_S = 8.0


def rpc(method: str, params: dict | None, req_id: int) -> dict:
    body = {
        "jsonrpc": "2.0",
        "id": req_id,
        "method": method,
        "params": params or {},
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
            "User-Agent": USER_AGENT,
        },
    )
    with urllib.request.urlopen(req, timeout=TIMEOUT_S) as resp:
        raw = resp.read().decode("utf-8")
    # Some gateways may return SSE; prefer the first JSON object line.
    text = raw.strip()
    if text.startswith("data:"):
        lines = [ln[5:].strip() for ln in text.splitlines() if ln.startswith("data:")]
        text = lines[0] if lines else text
    parsed = json.loads(text)
    if "error" in parsed:
        raise RuntimeError(json.dumps(parsed["error"]))
    return parsed.get("result") or {}


def main() -> int:
    t0 = time.perf_counter()
    try:
        init = rpc(
            "initialize",
            {
                "protocolVersion": PROTOCOL,
                "capabilities": {},
                "clientInfo": {"name": "groundwork-ten-second", "version": "1.0"},
            },
            1,
        )
        proof = rpc(
            "tools/call",
            {"name": "groundwork_public_proof", "arguments": {}},
            2,
        )
    except urllib.error.HTTPError as exc:
        print(f"FAIL: HTTP {exc.code} from {ENDPOINT}", file=sys.stderr)
        print(exc.read().decode("utf-8", errors="replace")[:500], file=sys.stderr)
        return 2
    except Exception as exc:  # noqa: BLE001 — CLI surface; show the error
        print(f"FAIL: {exc}", file=sys.stderr)
        return 2

    elapsed = time.perf_counter() - t0
    server = init.get("serverInfo") or {}
    structured = proof.get("structuredContent") or {}
    reduction = structured.get("reduction") or {}
    precision = structured.get("precision") or {}

    # Fallback: parse text content if structured is missing
    if not structured:
        content = proof.get("content") or []
        text_bits = [c.get("text", "") for c in content if isinstance(c, dict)]
        print("\n".join(text_bits))
    else:
        percent = reduction.get("percent")
        tokens = reduction.get("tokens_per_full_load")
        print("Groundwork public proof — live")
        print(f"  server:     {server.get('name')} {server.get('version')}")
        print(f"  reduction:  {percent}% available (~{tokens} tokens / full load)")
        print(f"  precision:  {precision.get('state')} (integrity_ok={precision.get('integrity_ok')})")
        print(f"  measured:   {structured.get('measured_at')}")
        print(f"  basis:      {structured.get('proof_basis')}")

    print(f"  elapsed:    {elapsed:.3f}s (budget 10.000s)")
    if elapsed > 10.0:
        print("WARN: exceeded 10s budget (network/path issue)", file=sys.stderr)
        return 1
    print("OK — first value without an account.")
    print("Next: https://rarefied.earth/groundwork  or  docs/GETTING_STARTED.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
