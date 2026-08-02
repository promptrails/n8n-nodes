# n8n-nodes-promptrails

[n8n](https://n8n.io/) community node for [PromptRails](https://promptrails.ai) — execute AI agents, preview prompts, manage chat sessions, query data sources, and more from your n8n workflows.

## Installation

In your n8n instance:

1. Go to **Settings > Community Nodes**
2. Select **Install a community node**
3. Enter `@promptrails/n8n-nodes-promptrails`
4. Click **Install**

## Credentials

You need a PromptRails API key to use this node:

1. Log in to [PromptRails](https://promptrails.ai)
2. Go to **Settings > API Keys**
3. Create a new API key with the required scopes
4. In n8n, create a new **PromptRails API** credential with your API key and workspace ID

## Resources & Operations

| Resource | Operations |
|----------|------------|
| **Agent** | Execute, Playground, Preview, Get, List |
| **Prompt** | Preview, Get, List |
| **Chat** | Create Session, Send Message, Get Session, List Sessions, List Messages |
| **Execution** | Get, List, Tree, Cancel, Approval Inbox, Approve, Deny |
| **Data Source** | Query, Get, List |
| **Trace** | Get, List, Summary |
| **Asset** | Get, List, Delete, Get Signed URL |

### Agent

- **Execute** — Run an agent with input variables and get the result
- **Playground** — Run an agent with an ad-hoc prompt override without saving a version
- **Preview** — Test a specific agent version before promoting
- **Get** — Retrieve agent details by ID
- **List** — List all agents in the workspace

### Prompt

- **Preview** — Render a prompt template with variables
- **Get** — Retrieve prompt details by ID
- **List** — List all prompts in the workspace

### Chat

- **Create Session** — Start a new multi-turn chat session with an agent
- **Send Message** — Send a message in an existing chat session
- **Get Session** — Retrieve session details
- **List Sessions** — List all chat sessions
- **List Messages** — Retrieve messages from a session

### Data Source

- **Query** — Execute a query against a connected data source
- **Get** — Retrieve data source details
- **List** — List all data sources

### Execution

- **Get** — Retrieve execution details and results
- **List** — List execution history
- **Tree** — Retrieve an execution with its full children tree populated
- **Cancel** — Request cooperative cancellation of a running execution
- **Approval Inbox** — List executions parked at `waiting_approval`
- **Approve** — Approve a run parked at `waiting_approval` and resume it
- **Deny** — Deny a run parked at `waiting_approval` and resume with a denial

### Trace

- **Get** — Retrieve a full execution trace with spans
- **List** — List recent traces
- **Summary** — Aggregate statistics over a filtered set of traces

### Asset

- **Get** — Retrieve asset details by ID
- **List** — List assets (filter by type, provider, execution, or agent)
- **Delete** — Permanently delete an asset
- **Get Signed URL** — Generate a time-limited download URL for an asset

## Example Workflows

### Execute an Agent on Schedule

1. **Schedule Trigger** — Run every hour
2. **PromptRails** — Execute agent with `{ "report_type": "hourly" }`
3. **Slack** — Post the result to a channel

### Chat with Webhook Input

1. **Webhook** — Receive incoming messages
2. **PromptRails** — Send message to a chat session
3. **Respond to Webhook** — Return the agent's response

### Monitor Costs

1. **Schedule Trigger** — Run daily
2. **PromptRails** — Get a trace summary (total cost, tokens, error count)
3. **IF** — Check if costs exceed threshold
4. **Email** — Send alert if over budget

## Development

```bash
npm install
npm run build
npm run dev    # watch mode
```

## License

MIT
