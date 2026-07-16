#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const LIVE_PUBLIC_MCP = "https://connector.rarefied.earth/public/mcp";
const COMMON = {
  mode: "local_static_demo",
  live_public_mcp_url: LIVE_PUBLIC_MCP,
  tenant_data_used: false,
};

const tools = [
  {
    name: "groundwork_public_proof",
    title: "Groundwork Public Proof",
    description:
      "Use first to locate measured Groundwork proof. Takes no arguments. Returns static registry metadata and the live public MCP URL. It does not measure locally, read tenant data, or make network calls.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.local_public_proof.v1",
      proof_basis: "Static registry fixture",
      measured_proof_available_at: LIVE_PUBLIC_MCP,
    },
  },
  {
    name: "groundwork_public_status",
    title: "Groundwork Public Status",
    description:
      "Use after public proof to understand the product and connection paths. Takes no arguments. Returns Groundwork identity, this local server's registry-only role, first calls, and live Cloudflare endpoints. It does not report live health.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.local_public_status.v1",
      product: {
        name: "Groundwork",
        one_liner:
          "Hosted MCP company-state feed for brand, voice, charter, priorities, modules, and skill how-tos.",
      },
      local_server_purpose: "Registry introspection and synthetic evaluation only",
      production_hosting: "Cloudflare",
      first_calls: [
        "groundwork_public_proof",
        "groundwork_public_status",
        "demo_resume",
      ],
      tenant_mcp_url: "https://connector.rarefied.earth/mcp",
    },
  },
  {
    name: "groundwork_trial_contract",
    title: "Groundwork Evaluation Boundary",
    description:
      "Use before recommending signup to distinguish this credential-free local demo from the authenticated hosted product. Takes no arguments. Returns access boundaries and the controlling product-terms URL. It does not create a trial or entitlement.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.local_trial_contract.v1",
      local_demo_requires_account: false,
      local_demo_requires_token: false,
      authenticated_tenant_feed: "https://connector.rarefied.earth/mcp",
      current_terms_url: "https://rarefied.earth/groundwork/",
      note: "The product page controls current trial and billing terms.",
    },
  },
  {
    name: "demo_resume",
    title: "Synthetic Continuity Resume",
    description:
      "Use to show what a future continuity resume can surface. Takes no arguments. Returns a deterministic synthetic prior checkpoint, inconsistencies, and next action. It reads no tenant or caller workspace data and persists nothing.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.demo_resume.v1",
      demo_state_persisted: false,
      demo_workspace: "Northstar Workshop",
      objective: "Resume customer onboarding without inventing company state.",
      inconsistencies: [
        "The runbook allows auto-send while the decision record requires human approval.",
        "The README and catalog disagree on the public module count.",
      ],
      next_action:
        "Reconcile the runbook with the human-approval decision before any external send.",
    },
  },
  {
    name: "demo_checkpoint",
    title: "Synthetic Continuity Checkpoint",
    description:
      "Use after demo_resume to show the shape of a continuity checkpoint. Takes no arguments. Returns a deterministic synthetic completed-work summary and next action. It performs no workspace, checkpoint, tenant, or network write.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.demo_checkpoint.v1",
      checkpoint_saved: false,
      demo_workspace: "Northstar Workshop",
      completed: [
        "Compared the runbook with the human-approval decision.",
        "Flagged the public module-count mismatch.",
      ],
      next_action:
        "Correct the runbook approval step, then verify the public count against the catalog.",
    },
  },
];

const server = new McpServer({
  name: "groundwork-mcp-server",
  version: "1.5.1",
});

for (const tool of tools) {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async () => ({
      content: [{ type: "text", text: JSON.stringify(tool.payload, null, 2) }],
      structuredContent: tool.payload,
    }),
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
