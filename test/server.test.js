import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const EXPECTED_TOOLS = [
  "demo_checkpoint",
  "demo_resume",
  "groundwork_public_proof",
  "groundwork_public_status",
  "groundwork_trial_contract",
];

test("local discovery server lists and serves five read-only tools without credentials", async () => {
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
    }
  } finally {
    await client.close();
  }
});
