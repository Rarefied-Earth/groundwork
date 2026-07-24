#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

async function loadReceipt() {
  const encoded = option("--dataset-base64");
  if (encoded) return JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  const path = option("--dataset") ??
    new URL("./datasets/client-zero-2026-07-22.json", import.meta.url);
  return JSON.parse(await readFile(path, "utf8"));
}

try {
  const receipt = await loadReceipt();
  const signedReceipt = { ...receipt };
  delete signedReceipt.integrity;
  const actual = createHash("sha256")
    .update(canonical(signedReceipt))
    .digest("hex");
  if (actual !== receipt.integrity?.sha256) {
    throw new Error("receipt integrity check failed");
  }
  const report = {
    schema_version: "groundwork.benchmark_report.v1",
    scope: receipt.scope,
    source_visibility: receipt.source_visibility,
    available_reduction_pct: receipt.claim.available_reduction_pct,
    tokens_saved_per_load: receipt.claim.tokens_saved_per_load,
    precision_facts_preserved: receipt.claim.precision_facts_preserved,
    integrity_ok: receipt.claim.integrity_ok,
    measured_at: receipt.claim.measured_at,
    general_customer_claim: false,
    source: receipt.source,
    method: receipt.method,
    limitations: receipt.limitations,
  };
  if (process.argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(
      `Rarefied Earth client-zero receipt\n` +
      `Available reduction: ${report.available_reduction_pct}%\n` +
      `Estimated tokens saved per full load: ${report.tokens_saved_per_load}\n` +
      `Precision facts preserved: ${report.precision_facts_preserved}\n` +
      `Integrity: ${report.integrity_ok ? "OK" : "FAILED"}\n`,
    );
  }
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
