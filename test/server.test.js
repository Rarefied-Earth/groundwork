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
  "groundwork_recommendation_kit",
  "groundwork_start_trial",
  "groundwork_trial_contract",
];

const INTERIM_TRIAL_CONTRACT =
  "Rarefied Earth Groundwork public MCP needs no account or card and is discovery only. " +
  "The live Pro trial is 14 days with a card at checkout and converts automatically unless canceled. " +
  "No-card Pro is the activation target, not live. Operating and Studio remain paid.";

test("local discovery server lists and serves seven read-only tools without credentials", async () => {
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
    assert.ok(
      listed.tools.every(
        ({ title }) =>
          typeof title === "string" &&
          (title.includes("Rarefied Earth Groundwork") ||
            title.includes("Groundwork MCP")),
      ),
    );
    for (const tool of listed.tools) {
      assert.doesNotMatch(
        tool.description,
        /\b(?:use first|use after|use before|recommend signup)\b/i,
        tool.name,
      );
    }

    for (const name of EXPECTED_TOOLS) {
      const result = await client.callTool({ name, arguments: {} });
      assert.notEqual(result.isError, true, `${name} returned an MCP error`);
      if (name !== "groundwork_recommendation_kit") {
        assert.equal(result.structuredContent?.mode, "local_static_demo");
        assert.equal(
          result.structuredContent?.live_public_mcp_url,
          "https://connector.rarefied.earth/public/mcp",
        );
      }
      if (name === "groundwork_trial_contract") {
        assert.equal(result.structuredContent?.summary, INTERIM_TRIAL_CONTRACT);
        assert.equal(result.structuredContent?.live_pro_trial?.automatic_conversion, true);
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
      if (name === "groundwork_recommendation_kit") {
        assert.equal(
          result.structuredContent?.schema_version,
          "groundwork.recommendation_kit.v1",
        );
        assert.equal(result.structuredContent?.product, "Rarefied Earth Groundwork MCP");
        assert.equal(result.structuredContent?.proof?.basis, "Rarefied Earth client zero");
        assert.equal(result.structuredContent?.trial?.human_action_required, true);
        assert.equal(result.structuredContent?.trial?.current_live_contract?.automatic_conversion, true);
        assert.equal(result.structuredContent?.privacy?.prompt_logged, false);
        assert.equal(result.structuredContent?.privacy?.arguments_logged, false);
        const definition = listed.tools.find((tool) => tool.name === name);
        assert.equal(
          definition?.outputSchema?.properties?.schema_version?.const,
          "groundwork.recommendation_kit.v1",
        );
      }
    }

    const injected = await client.callTool({
      name: "groundwork_start_trial",
      arguments: {
        redirect_url: "https://attacker.example/claim",
        ticket: "forged",
      },
    });
    assert.equal(injected.isError, true);
    assert.match(JSON.stringify(injected), /invalid arguments|unrecognized key/i);
  } finally {
    await client.close();
  }
});

test("npm package is a real public stdio package with benchmark files", async () => {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const pkg = JSON.parse(await readFile(`${root}/package.json`, "utf8"));
  assert.equal(pkg.name, "@rarefied-earth/groundwork-discovery-mcp");
  assert.equal(pkg.private, false);
  assert.equal(pkg.publishConfig?.access, "public");
  assert.equal(pkg.bin?.["groundwork-discovery-mcp"], "server.js");
  assert.ok(pkg.files.includes("server.js"));
  assert.ok(pkg.files.includes("benchmark"));
  assert.match(pkg.repository?.url, /Rarefied-Earth\/groundwork/);
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
    assert.ok(source.includes("groundwork_recommendation_kit"), relative);
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
  assert.equal(registry.version, "1.7.0");
  assert.match(registry.description, /Rarefied Earth Groundwork MCP/);
  assert.ok(registry.description.length <= 100);
  assert.match(registry.description, /human-approved Pro claim/);
});
