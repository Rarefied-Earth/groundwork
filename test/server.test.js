import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const EXPECTED_TOOLS = [
  "demo_checkpoint",
  "demo_resume",
  "groundwork_public_proof",
  "groundwork_public_status",
  "groundwork_start_trial",
  "groundwork_trial_contract",
];

const INTERIM_TRIAL_CONTRACT =
  "Rarefied Earth Groundwork public MCP needs no account or card and is discovery only. " +
  "The live Pro trial is 14 days with a card at checkout. " +
  "No-card Pro is the activation target, not live. Operating and Studio remain paid.";

test("local discovery server lists and serves six read-only tools without credentials", async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["server.js"],
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    env: { GROUNDWORK_TOKEN: "" },
    stderr: "pipe",
  });
  const client = new Client({ name: "groundwork-local-test", version: "1.0.0" });

  try {
    await client.connect(transport);
    const listed = await client.listTools();
    assert.deepEqual(
      listed.tools.map(({ name }) => name).sort(),
      EXPECTED_TOOLS,
    );

    for (const name of EXPECTED_TOOLS) {
      const result = await client.callTool({ name, arguments: {} });
      assert.notEqual(result.isError, true, `${name} returned an MCP error`);
      assert.equal(result.structuredContent?.mode, "local_static_demo");
      assert.equal(
        result.structuredContent?.live_public_mcp_url,
        "https://connector.rarefied.earth/public/mcp",
      );
      if (name === "groundwork_trial_contract") {
        assert.equal(result.structuredContent?.summary, INTERIM_TRIAL_CONTRACT);
      }
      if (name === "groundwork_start_trial") {
        assert.equal(result.structuredContent?.human_action_required, true);
        assert.equal(
          result.structuredContent?.claim?.url,
          "https://rarefied.earth/groundwork/claim/",
        );
        assert.equal(result.structuredContent?.claim?.ticket_issued, false);
        assert.equal(result.structuredContent?.privacy?.product_state_write_performed, false);
      }
    }

    const injected = await client.callTool({
      name: "groundwork_start_trial",
      arguments: {
        redirect_url: "https://attacker.example/claim",
        ticket: "forged",
      },
    });
    assert.equal(
      injected.structuredContent?.claim?.url,
      "https://rarefied.earth/groundwork/claim/",
    );
    assert.doesNotMatch(JSON.stringify(injected), /attacker\.example|forged/);
  } finally {
    await client.close();
  }
});

test("public docs and registry metadata use the disambiguated interim contract", async () => {
  const root = fileURLToPath(new URL("..", import.meta.url));
  for (const relative of [
    "README.md",
    "docs/FOR_AGENTS.md",
    "docs/GETTING_STARTED.md",
    "docs/TEN_SECOND_START.md",
  ]) {
    const source = await readFile(`${root}/${relative}`, "utf8");
    assert.ok(source.includes(INTERIM_TRIAL_CONTRACT), relative);
    assert.ok(source.includes("groundwork_start_trial"), relative);
    for (const forbidden of [
      "14-day free trial",
      "Exact anonymous / trial contract",
      "Every paid tier",
    ]) {
      assert.ok(!source.includes(forbidden), `${relative}: ${forbidden}`);
    }
  }
  const registry = JSON.parse(
    await readFile(`${root}/mcp-registry/server.json`, "utf8"),
  );
  assert.equal(registry.title, "Rarefied Earth Groundwork MCP");
  assert.equal(registry.version, "1.6.0");
  assert.match(registry.description, /Rarefied Earth Groundwork MCP/);
  assert.ok(registry.description.length <= 100);
  assert.match(registry.description, /human-approved Pro claim/);
});
