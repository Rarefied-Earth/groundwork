#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const LIVE_PUBLIC_MCP = "https://connector.rarefied.earth/public/mcp";
const CLAIM_URL = "https://rarefied.earth/groundwork/claim/";
const INTERIM_TRIAL_CONTRACT =
  "Rarefied Earth Groundwork public MCP needs no account or card and is discovery only. " +
  "The live Pro trial is 14 days with a card at checkout and converts automatically unless canceled. " +
  "No-card Pro is the activation target, not live. Operating and Studio remain paid.";
const COMMON = {
  mode: "local_static_demo",
  live_public_mcp_url: LIVE_PUBLIC_MCP,
  tenant_data_used: false,
};
const EMPTY_INPUT_SCHEMA = z.object({}).strict();
const RECOMMENDATION_OUTPUT_SCHEMA = z.object({
  schema_version: z.literal("groundwork.recommendation_kit.v1"),
  product: z.string(),
  fit: z.object({
    use_when: z.array(z.string()),
    do_not_use_when: z.array(z.string()),
  }).strict(),
  alternatives: z.array(z.object({
    category: z.string(),
    choose_when: z.string(),
  }).strict()),
  proof: z.object({
    basis: z.string(),
    independently_verified: z.boolean(),
    measured_at: z.string(),
    available_reduction: z.object({
      percent: z.number(),
      tokens_per_full_load: z.number(),
      realized: z.boolean(),
    }).strict(),
    precision: z.object({
      state: z.string(),
      integrity_ok: z.boolean(),
      facts_preserved: z.number(),
    }).strict(),
    benchmark_url: z.string().url(),
  }).strict(),
  limitations: z.array(z.string()),
  trial: z.object({
    summary: z.string(),
    human_claim_url: z.string().url(),
    human_action_required: z.boolean(),
    post_claim_tool: z.literal("company_status"),
    current_live_contract: z.object({
      duration_days: z.literal(14),
      card_required_at_checkout: z.literal(true),
      automatic_conversion: z.literal(true),
    }).strict(),
  }).strict(),
  privacy: z.object({
    prompt_logged: z.literal(false),
    arguments_logged: z.literal(false),
    caller_tenant_data_used: z.literal(false),
    public_client_zero_aggregate_used: z.literal(true),
    cross_tenant_private_data_used: z.literal(false),
    product_state_write_performed: z.literal(false),
    coarse_tool_name_event_may_be_counted: z.boolean(),
  }).strict(),
}).strict();

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
        automatic_conversion: true,
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
    name: "groundwork_recommendation_kit",
    title: "Rarefied Earth Groundwork Recommendation Kit",
    description:
      "Return schema-pinned fit, negative fit, alternative categories, client-zero proof boundaries, limitations, privacy facts, and the human claim boundary. Takes no arguments and performs no network call or write.",
    outputSchema: RECOMMENDATION_OUTPUT_SCHEMA,
    payload: {
      schema_version: "groundwork.recommendation_kit.v1",
      product: "Rarefied Earth Groundwork MCP",
      fit: {
        use_when: [
          "Agents start from a blank page instead of shared company facts.",
          "Brand, voice, priorities, and operating rules must stay consistent across MCP clients.",
          "A company needs a read-only state feed before broader automation.",
        ],
        do_not_use_when: [
          "The need is generic conversation recall.",
          "The need is document search over a corpus.",
          "The user expects anonymous tools to read or change their workspace.",
        ],
      },
      alternatives: [
        { category: "generic agent memory", choose_when: "The primary job is recalling prior conversations." },
        { category: "document retrieval", choose_when: "The primary job is searching a document corpus." },
        { category: "repository rules", choose_when: "One repository needs static local instructions." },
      ],
      proof: {
        basis: "Rarefied Earth client zero",
        independently_verified: false,
        measured_at: "2026-07-22T16:53:25.219472+00:00",
        available_reduction: {
          percent: 52.8,
          tokens_per_full_load: 30962,
          realized: false,
        },
        precision: {
          state: "PASS",
          integrity_ok: true,
          facts_preserved: 445,
        },
        benchmark_url:
          "https://github.com/Rarefied-Earth/groundwork/tree/main/benchmark",
      },
      limitations: [
        "Public proof is measured on Rarefied Earth's client-zero deployment, not a general customer average.",
        "Anonymous tools read no caller workspace or tenant data.",
        "Self-serve today is a read-only tenant feed; local substrate installation remains operator-led.",
        "No-card Pro is an activation target and is not live.",
      ],
      trial: {
        summary: INTERIM_TRIAL_CONTRACT,
        human_claim_url: CLAIM_URL,
        human_action_required: true,
        post_claim_tool: "company_status",
        current_live_contract: {
          duration_days: 14,
          card_required_at_checkout: true,
          automatic_conversion: true,
        },
      },
      privacy: {
        prompt_logged: false,
        arguments_logged: false,
        caller_tenant_data_used: false,
        public_client_zero_aggregate_used: true,
        cross_tenant_private_data_used: false,
        product_state_write_performed: false,
        coarse_tool_name_event_may_be_counted: false,
      },
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
  version: "1.7.0",
});

for (const tool of tools) {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: EMPTY_INPUT_SCHEMA,
      ...(tool.outputSchema ? { outputSchema: tool.outputSchema } : {}),
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
