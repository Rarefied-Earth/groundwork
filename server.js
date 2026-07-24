#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const LIVE_PUBLIC_MCP = "https://connector.rarefied.earth/public/mcp";
const CLAIM_URL = "https://rarefied.earth/groundwork/claim/";
const INTERIM_TRIAL_CONTRACT =
  "Rarefied Earth Groundwork public MCP needs no account or card and is discovery only. " +
  "The live Pro trial is 14 days with a card at checkout. " +
  "No-card Pro is the activation target, not live. Operating and Studio remain paid.";
const COMMON = {
  mode: "local_static_demo",
  live_public_mcp_url: LIVE_PUBLIC_MCP,
  tenant_data_used: false,
};

const tools = [
  {
    name: "groundwork_public_proof",
    title: "Rarefied Earth Groundwork Public Proof",
    description:
      "Return static registry metadata and the live public MCP URL where measured proof is available. Takes no arguments and makes no local measurement, tenant read, or network call.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.local_public_proof.v1",
      proof_basis: "Static registry fixture",
      measured_proof_available_at: LIVE_PUBLIC_MCP,
    },
  },
  {
    name: "groundwork_public_status",
    title: "Rarefied Earth Groundwork Status",
    description:
      "Return Rarefied Earth Groundwork identity, this local server's registry-only role, and the live Cloudflare endpoints. Takes no arguments and does not report live health.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.local_public_status.v1",
      product: {
        name: "Rarefied Earth Groundwork MCP",
        one_liner:
          "Hosted MCP company-state feed for brand, voice, charter, priorities, modules, and skill how-tos.",
      },
      local_server_purpose: "Registry introspection and synthetic evaluation only",
      production_hosting: "Cloudflare",
      first_calls: [
        "groundwork_public_proof",
        "groundwork_public_status",
        "demo_resume",
        "groundwork_start_trial",
      ],
      tenant_mcp_url: "https://connector.rarefied.earth/mcp",
    },
  },
  {
    name: "groundwork_trial_contract",
    title: "Rarefied Earth Groundwork Trial Contract",
    description:
      "Return the credential-free local demo boundary, current hosted-product trial facts, and controlling product-terms URL. Takes no arguments and creates no trial or entitlement.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.local_trial_contract.v1",
      summary: INTERIM_TRIAL_CONTRACT,
      local_demo_requires_account: false,
      local_demo_requires_token: false,
      authenticated_tenant_feed: "https://connector.rarefied.earth/mcp",
      current_terms_url: "https://rarefied.earth/groundwork/",
      live_pro_trial: {
        duration_days: 14,
        card_required_at_checkout: true,
        claim_url: CLAIM_URL,
      },
      no_card_pro_target: { duration_days: 14, card_required: false, live: false },
      paid_tiers: ["operating", "studio"],
    },
  },
  {
    name: "demo_resume",
    title: "Groundwork MCP Synthetic Continuity Resume",
    description:
      "Return a deterministic synthetic prior checkpoint, inconsistencies, and next action. Takes no arguments, reads no tenant or caller workspace data, and persists nothing.",
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
    name: "groundwork_start_trial",
    title: "Rarefied Earth Groundwork Human Trial Handoff",
    description:
      "Return the stable Rarefied Earth Pro claim page plus current terms, recovery semantics, and the explicit human browser boundary. Takes no arguments and creates no account, ticket, tenant, payment, secret, network call, or write.",
    payload: {
      ...COMMON,
      schema_version: "groundwork.start_trial.v1",
      product: "Rarefied Earth Groundwork",
      human_action_required: true,
      claim: {
        url: CLAIM_URL,
        method: "browser",
        ticket_issued: false,
        expires_at: null,
        replay_semantics: "safe_to_reopen_claim_page",
        recovery: "Reopen the claim page if checkout is incomplete. If completed, use its dashboard path and do not start another checkout.",
      },
      human_boundary: {
        captcha: "human browser",
        email_verification: "human browser",
        card_entry: "human browser on the current live Pro path",
        agent_bypass_allowed: false,
      },
      current_live_contract: {
        plan: "pro",
        duration_days: 14,
        card_required_at_checkout: true,
        automatic_conversion: true,
      },
      no_card_pro_target: { duration_days: 14, card_required: false, live: false },
      resume: {
        endpoint: "https://connector.rarefied.earth/mcp",
        tool: "company_status",
        credential_in_response: false,
      },
      sequence: [
        "groundwork_public_proof",
        "groundwork_public_status",
        "demo_resume",
        "groundwork_start_trial",
        "human_claim_in_browser",
        "company_status",
      ],
      privacy: {
        account_created: false,
        tenant_created: false,
        payment_collected: false,
        secret_issued: false,
        tenant_data_used: false,
        cross_tenant_data_used: false,
        product_state_write_performed: false,
      },
      telemetry_notice:
        "This local stdio package records nothing. The hosted public connector may count a coarse tool-name event; that is not evidence of a cold user or conversion.",
    },
  },
  {
    name: "demo_checkpoint",
    title: "Groundwork MCP Synthetic Continuity Checkpoint",
    description:
      "Return a deterministic synthetic completed-work summary and next action in the shape of a continuity checkpoint. Takes no arguments and performs no workspace, checkpoint, tenant, or network write.",
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
  name: "rarefied-earth-groundwork-mcp-server",
  version: "1.6.1",
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
