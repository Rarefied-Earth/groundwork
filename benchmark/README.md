# Rarefied Earth Groundwork benchmark

This directory makes the published client-zero context-efficiency receipt
verifiable without publishing Rarefied Earth's private operating files.

Run:

```bash
node benchmark/run.mjs --json
```

Expected historical receipt:

- available context reduction: 52.8%
- estimated tokens saved per full load: 30,962
- precision facts preserved: 445
- integrity: OK

The receipt pins the source commit, catalog version, measurement time, formula,
token estimator, precision check, aggregate values, and a SHA-256 checksum. The
runner refuses claim drift when the checksum is unchanged. Git history, not the
self-contained checksum, is the authenticity record.

## What this proves

It verifies the published aggregate and detects accidental receipt drift against
the checked-in checksum.

## What this does not prove

The six source files contain private company operating context and are not
published. A third party cannot inspect those inputs from this repository. The
result is one Rarefied Earth client-zero measurement, not a customer average,
benchmark against another product, or performance guarantee. Token counts use
the documented character-based estimator and are not provider billing data.

## Anti-gaming controls

- fixed dated receipt instead of a moving best result
- source commit and catalog version pinned
- canonical-JSON checksum checked before output; this is drift detection, not a signature
- negative tamper test in `test/benchmark.test.js`
- client-zero scope and private-input limitation emitted in machine output
- no hidden network call, model call, or selected-query subset
