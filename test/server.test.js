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

// This constant is the cross-surface lock: the test below requires README.md and
// all three docs to carry it verbatim, so server.js and the published docs cannot
// tell a prospect two different stories. Rewritten 2026-07-30, when the sentence
// it pinned had become false in the most expensive way possible: it claimed the
// trial took a card at checkout and converted automatically. It is the same
// sentence the live connector and rarefied.earth serve.
const TRIAL_CONTRACT =
  "Rarefied Earth Groundwork public MCP needs no account or card and is discovery only. " +
  "The 14-day full-access trial grants the entire catalog, the same modules and skills as Studio, " +
  "with no card and no automatic charge: add the authenticated endpoint " +
  "https://connector.rarefied.earth/mcp to an MCP client, and the human completes sign-in in a " +
  "browser. At the end of the 14 days you choose a paid tier: Pro, Operating, or Studio.";

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
        assert.equal(result.structuredContent?.summary, TRIAL_CONTRACT);
        // Inverted 2026-07-30. These asserted card_required/automatic_conversion
        // were TRUE, which is why the false contract survived every test run.
        assert.equal(result.structuredContent?.full_access_trial?.automatic_conversion, false);
        assert.equal(result.structuredContent?.full_access_trial?.card_required_at_checkout, false);
        assert.equal(result.structuredContent?.full_access_trial?.grants, "full_catalog");
        // All three tiers are paid; the trial is not one of them.
        assert.deepEqual(result.structuredContent?.paid_tiers, ["pro", "operating", "studio"]);
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
        // Inverted 2026-07-30, same pass as groundwork_trial_contract above. The
        // kit's structured contract still said card-at-checkout and auto-convert
        // while its own summary sentence said the opposite.
        assert.equal(result.structuredContent?.trial?.current_live_contract?.automatic_conversion, false);
        assert.equal(result.structuredContent?.trial?.current_live_contract?.card_required_at_checkout, false);
        assert.equal(result.structuredContent?.trial?.current_live_contract?.grants, "full_catalog");
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
    assert.ok(source.includes(TRIAL_CONTRACT), relative);
    assert.ok(source.includes("groundwork_start_trial"), relative);
    assert.ok(source.includes("groundwork_recommendation_kit"), relative);
    for (const forbidden of [
      "14-day free trial",
      "Exact anonymous / trial contract",
      "Every paid tier",
      // Added 2026-07-30. These are the retired claims that reached a real
      // prospect through the README, which is the top web-search result for
      // Groundwork. Naming them here is what stops them coming back.
      "Pro trial",
      "Pro_trial",
      "Pro claim",
      "card at checkout",
      "card_at_checkout",
      "checkout",
      "converts automatically unless canceled",
      "No-card Pro",
    ]) {
      assert.ok(!source.includes(forbidden), `${relative}: ${forbidden}`);
    }
  }
  const registry = JSON.parse(
    await readFile(`${root}/mcp-registry/server.json`, "utf8"),
  );
  assert.equal(registry.title, "Rarefied Earth Groundwork MCP");
  assert.equal(registry.version, "1.7.1");
  // The disambiguated product name stays in the description, not just the title.
  // Four unrelated projects are called "Groundwork", and the description is the
  // field a registry search result actually shows.
  assert.match(registry.description, /Rarefied Earth Groundwork MCP/);
  assert.ok(registry.description.length <= 100);
  // Was: assert.match(..., /human-approved Pro claim/). That pinned the retired
  // Pro-claim contract into the registry description, so the published listing
  // still advertises it. Now the retired wording is the failure condition, and
  // "company memory" is required because that is the phrase a human searches and
  // the registry returned zero results for it.
  assert.doesNotMatch(registry.description, /Pro claim|card at checkout/i);
  assert.match(registry.description, /company memory/i);
});
