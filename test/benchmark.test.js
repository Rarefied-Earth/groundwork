import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dataset = `${root}/benchmark/datasets/client-zero-2026-07-22.json`;

function run(args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["benchmark/run.mjs", ...args], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}

test("published client-zero receipt verifies the pinned aggregate", async () => {
  const result = await run(["--dataset", dataset, "--json"]);
  assert.equal(result.code, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.schema_version, "groundwork.benchmark_report.v1");
  assert.equal(report.scope, "rarefied_earth_client_zero");
  assert.equal(report.available_reduction_pct, 52.8);
  assert.equal(report.tokens_saved_per_load, 30962);
  assert.equal(report.precision_facts_preserved, 445);
  assert.equal(report.integrity_ok, true);
  assert.equal(report.general_customer_claim, false);
  assert.equal(report.source_visibility, "private_inputs_public_aggregate");
});

test("runner rejects a changed receipt instead of blessing drift", async () => {
  const source = JSON.parse(await readFile(dataset, "utf8"));
  source.claim.tokens_saved_per_load += 1;
  const encoded = Buffer.from(JSON.stringify(source)).toString("base64url");
  const result = await run(["--dataset-base64", encoded, "--json"]);
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /receipt integrity check failed/i);
});

test("runner binds provenance and limitations, not only claim values", async () => {
  const source = JSON.parse(await readFile(dataset, "utf8"));
  source.scope = "general_customer_average";
  source.source.commit = "0000000000000000000000000000000000000000";
  source.limitations = [];
  const encoded = Buffer.from(JSON.stringify(source)).toString("base64url");
  const result = await run(["--dataset-base64", encoded, "--json"]);
  assert.notEqual(result.code, 0);
  assert.match(result.stderr, /receipt integrity check failed/i);
});
