import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	INodePropertyOptions,
	NodeOperationError,
} from 'n8n-workflow';
import { PromptRails as PromptRailsClient } from '@promptrails/sdk';

// === Operation option groups =============================================
// These drive the UX (which operations show up per resource). The node
// dispatches on resource + operation inside execute() below — no n8n
// declarative routing is used.

const agentOperations: INodePropertyOptions[] = [
	{
		name: 'Execute',
		value: 'execute',
		action: 'Execute an agent',
		description: 'Execute an agent with input variables',
	},
	{ name: 'Get', value: 'get', action: 'Get an agent', description: 'Retrieve an agent by ID' },
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List agents',
		description: 'Retrieve a list of agents',
	},
	{
		name: 'Preview',
		value: 'preview',
		action: 'Preview an agent',
		description: 'Preview an agent with a specific version',
	},
];

const promptOperations: INodePropertyOptions[] = [
	{ name: 'Get', value: 'get', action: 'Get a prompt', description: 'Retrieve a prompt by ID' },
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List prompts',
		description: 'Retrieve a list of prompts',
	},
	{
		name: 'Run',
		value: 'run',
		action: 'Run a prompt',
		description: 'Render and run a prompt template with variables',
	},
];

const chatOperations: INodePropertyOptions[] = [
	{
		name: 'Create Session',
		value: 'createSession',
		action: 'Create a chat session',
		description: 'Start a new chat session for an agent',
	},
	{
		name: 'Get Session',
		value: 'getSession',
		action: 'Get a chat session',
		description: 'Retrieve a chat session by ID',
	},
	{
		name: 'List Messages',
		value: 'listMessages',
		action: 'List messages',
		description: 'List messages in a chat session',
	},
	{
		name: 'List Sessions',
		value: 'listSessions',
		action: 'List chat sessions',
		description: 'Retrieve chat sessions',
	},
	{
		name: 'Send Message',
		value: 'sendMessage',
		action: 'Send a chat message',
		description: 'Send a message to a chat session',
	},
];

const executionOperations: INodePropertyOptions[] = [
	{
		name: 'Get',
		value: 'get',
		action: 'Get an execution',
		description: 'Retrieve an execution by ID',
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List executions',
		description: 'Retrieve a list of executions',
	},
];

const dataSourceOperations: INodePropertyOptions[] = [
	{
		name: 'Get',
		value: 'get',
		action: 'Get a data source',
		description: 'Retrieve a data source by ID',
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List data sources',
		description: 'Retrieve a list of data sources',
	},
	{
		name: 'Query',
		value: 'query',
		action: 'Query a data source',
		description: 'Execute a query against a data source',
	},
];

const traceOperations: INodePropertyOptions[] = [
	{ name: 'Get', value: 'get', action: 'Get a trace', description: 'Retrieve a trace by trace ID' },
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List traces',
		description: 'Retrieve a list of traces',
	},
];

const costOperations: INodePropertyOptions[] = [
	{
		name: 'Agent Summary',
		value: 'agentSummary',
		action: 'Get agent cost summary',
		description: 'Cost breakdown for a specific agent',
	},
	{
		name: 'Workspace Summary',
		value: 'workspaceSummary',
		action: 'Get workspace cost summary',
		description: 'Total LLM usage costs for the workspace',
	},
];

const mediaStudioOperations: INodePropertyOptions[] = [
	{
		name: 'Generate',
		value: 'generate',
		action: 'Generate media',
		description: 'Run a media generation request',
	},
];

const assetOperations: INodePropertyOptions[] = [
	{
		name: 'Delete',
		value: 'delete',
		action: 'Delete an asset',
		description: 'Permanently delete an asset',
	},
	{ name: 'Get', value: 'get', action: 'Get an asset', description: 'Retrieve an asset by ID' },
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List assets',
		description: 'Retrieve a list of assets',
	},
	{
		name: 'Get Signed URL',
		value: 'getSignedUrl',
		action: 'Get a signed URL',
		description: 'Generate a time-limited download URL for an asset',
	},
];

const mediaModelOperations: INodePropertyOptions[] = [
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List media models',
		description: 'Retrieve a list of media models',
	},
];

// === Node =================================================================

export class PromptRails implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PromptRails',
		name: 'promptRails',
		icon: 'file:promptrails.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with the PromptRails AI agent platform',
		defaults: {
			name: 'PromptRails',
		},
		inputs: ['main'] as INodeTypeDescription['inputs'],
		outputs: ['main'] as INodeTypeDescription['outputs'],
		credentials: [
			{
				name: 'promptRailsApi',
				required: true,
			},
		],
		properties: [
			// ------ Resource ------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Agent', value: 'agent' },
					{ name: 'Asset', value: 'asset' },
					{ name: 'Chat', value: 'chat' },
					{ name: 'Cost', value: 'cost' },
					{ name: 'Data Source', value: 'dataSource' },
					{ name: 'Execution', value: 'execution' },
					{ name: 'Media Model', value: 'mediaModel' },
					{ name: 'Media Studio', value: 'mediaStudio' },
					{ name: 'Prompt', value: 'prompt' },
					{ name: 'Trace', value: 'trace' },
				],
				default: 'agent',
			},

			// ------ Operations per resource ------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['agent'] } },
				options: agentOperations,
				default: 'execute',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['prompt'] } },
				options: promptOperations,
				default: 'run',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['chat'] } },
				options: chatOperations,
				default: 'sendMessage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['execution'] } },
				options: executionOperations,
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['dataSource'] } },
				options: dataSourceOperations,
				default: 'query',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['trace'] } },
				options: traceOperations,
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cost'] } },
				options: costOperations,
				default: 'workspaceSummary',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['mediaStudio'] } },
				options: mediaStudioOperations,
				default: 'generate',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['asset'] } },
				options: assetOperations,
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['mediaModel'] } },
				options: mediaModelOperations,
				default: 'getMany',
			},

			// ------ Agent fields ------
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the agent',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['execute', 'get', 'preview'],
					},
				},
			},
			{
				displayName: 'Variables (JSON)',
				name: 'variables',
				type: 'json',
				default: '{}',
				description: 'Input variables as a JSON object',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['execute', 'preview'],
					},
				},
			},
			{
				displayName: 'Version ID',
				name: 'versionId',
				type: 'string',
				default: '',
				description: 'Specific version ID to preview (optional)',
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['preview'],
					},
				},
			},

			// ------ Prompt fields ------
			{
				displayName: 'Prompt ID',
				name: 'promptId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the prompt',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get', 'run'],
					},
				},
			},
			{
				displayName: 'Variables (JSON)',
				name: 'variables',
				type: 'json',
				default: '{}',
				description: 'Template variables as a JSON object',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['run'],
					},
				},
			},

			// ------ Chat fields ------
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				required: true,
				default: '',
				description: 'The agent ID for the chat session',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['createSession'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				default: '',
				description: 'The chat session ID',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['getSession', 'sendMessage', 'listMessages'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: { rows: 4 },
				required: true,
				default: '',
				description: 'The message to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendMessage'],
					},
				},
			},

			// ------ Execution fields ------
			{
				displayName: 'Execution ID',
				name: 'executionId',
				type: 'string',
				required: true,
				default: '',
				description: 'The execution ID',
				displayOptions: {
					show: {
						resource: ['execution'],
						operation: ['get'],
					},
				},
			},

			// ------ Data Source fields ------
			{
				displayName: 'Data Source ID',
				name: 'dataSourceId',
				type: 'string',
				required: true,
				default: '',
				description: 'The data source ID',
				displayOptions: {
					show: {
						resource: ['dataSource'],
						operation: ['get', 'query'],
					},
				},
			},
			{
				displayName: 'Query Parameters (JSON)',
				name: 'queryParameters',
				type: 'json',
				default: '{}',
				description: 'Parameters passed to the data source query as a JSON object',
				displayOptions: {
					show: {
						resource: ['dataSource'],
						operation: ['query'],
					},
				},
			},

			// ------ Trace fields ------
			{
				displayName: 'Trace ID',
				name: 'traceId',
				type: 'string',
				required: true,
				default: '',
				description: 'The trace ID',
				displayOptions: {
					show: {
						resource: ['trace'],
						operation: ['get'],
					},
				},
			},

			// ------ Cost fields ------
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				required: true,
				default: '',
				description: 'The agent ID for cost summary',
				displayOptions: {
					show: {
						resource: ['cost'],
						operation: ['agentSummary'],
					},
				},
			},

			// ------ Media Studio fields ------
			{
				displayName: 'Provider',
				name: 'provider',
				type: 'options',
				required: true,
				default: '',
				description: 'The media provider to use',
				options: [
					{ name: 'Deepgram', value: 'deepgram' },
					{ name: 'ElevenLabs', value: 'elevenlabs' },
					{ name: 'Fal', value: 'fal' },
					{ name: 'Replicate', value: 'replicate' },
					{ name: 'Runway', value: 'runway' },
					{ name: 'Stability', value: 'stability' },
				],
				displayOptions: {
					show: {
						resource: ['mediaStudio'],
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Media Type',
				name: 'mediaType',
				type: 'options',
				required: true,
				default: '',
				description: 'The type of media to generate',
				options: [
					{ name: 'Image Edit', value: 'image_edit' },
					{ name: 'Image Generation', value: 'image_gen' },
					{ name: 'Speech to Text', value: 'stt' },
					{ name: 'Text to Speech', value: 'tts' },
					{ name: 'Video from Image', value: 'video_from_img' },
					{ name: 'Video Generation', value: 'video_gen' },
				],
				displayOptions: {
					show: {
						resource: ['mediaStudio'],
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				required: true,
				default: '',
				description: 'The model identifier to use',
				displayOptions: {
					show: {
						resource: ['mediaStudio'],
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				typeOptions: { rows: 4 },
				required: true,
				default: '',
				description: 'The prompt for media generation',
				displayOptions: {
					show: {
						resource: ['mediaStudio'],
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Input URL',
				name: 'inputUrl',
				type: 'string',
				default: '',
				description: 'URL of the input media file (optional, for edits or transformations)',
				displayOptions: {
					show: {
						resource: ['mediaStudio'],
						operation: ['generate'],
					},
				},
			},
			{
				displayName: 'Config (JSON)',
				name: 'config',
				type: 'json',
				default: '',
				description: 'Additional configuration as a JSON object (optional)',
				displayOptions: {
					show: {
						resource: ['mediaStudio'],
						operation: ['generate'],
					},
				},
			},

			// ------ Asset fields ------
			{
				displayName: 'Asset ID',
				name: 'assetId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the asset',
				displayOptions: {
					show: {
						resource: ['asset'],
						operation: ['get', 'delete', 'getSignedUrl'],
					},
				},
			},
			{
				displayName: 'Type',
				name: 'assetType',
				type: 'string',
				default: '',
				description: 'Filter assets by type (e.g. image, audio, video)',
				displayOptions: {
					show: {
						resource: ['asset'],
						operation: ['getMany'],
					},
				},
			},
			{
				displayName: 'Provider',
				name: 'assetProvider',
				type: 'string',
				default: '',
				description: 'Filter assets by provider',
				displayOptions: {
					show: {
						resource: ['asset'],
						operation: ['getMany'],
					},
				},
			},
			{
				displayName: 'Execution ID',
				name: 'assetExecutionId',
				type: 'string',
				default: '',
				description: 'Filter assets by execution ID',
				displayOptions: {
					show: {
						resource: ['asset'],
						operation: ['getMany'],
					},
				},
			},
			{
				displayName: 'Agent ID',
				name: 'assetAgentId',
				type: 'string',
				default: '',
				description: 'Filter assets by agent ID',
				displayOptions: {
					show: {
						resource: ['asset'],
						operation: ['getMany'],
					},
				},
			},

			// ------ Media Model fields ------
			{
				displayName: 'Provider',
				name: 'mediaModelProvider',
				type: 'string',
				default: '',
				description: 'Filter media models by provider',
				displayOptions: {
					show: {
						resource: ['mediaModel'],
						operation: ['getMany'],
					},
				},
			},
			{
				displayName: 'Media Type',
				name: 'mediaModelMediaType',
				type: 'string',
				default: '',
				description: 'Filter media models by media type (e.g. tts, stt, image_gen)',
				displayOptions: {
					show: {
						resource: ['mediaModel'],
						operation: ['getMany'],
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'mediaModelIsActive',
				type: 'options',
				default: '',
				description: 'Filter media models by active status',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active', value: 'true' },
					{ name: 'Inactive', value: 'false' },
				],
				displayOptions: {
					show: {
						resource: ['mediaModel'],
						operation: ['getMany'],
					},
				},
			},

			// ------ Pagination (shared) ------
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 20,
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				displayOptions: {
					show: {
						operation: ['getMany', 'listSessions', 'listMessages'],
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						operation: ['getMany', 'listSessions', 'listMessages'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('promptRailsApi');
		const client = new PromptRailsClient({
			apiKey: credentials.apiKey as string,
			baseUrl: credentials.host as string,
		});

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const result = await dispatch(this, client, i);
				pushResult(returnData, result, i);
			} catch (err) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (err as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), err as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}

// === Dispatch ============================================================

async function dispatch(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	i: number,
): Promise<unknown> {
	const resource = ctx.getNodeParameter('resource', i) as string;
	const operation = ctx.getNodeParameter('operation', i) as string;

	switch (resource) {
		case 'agent':
			return handleAgent(ctx, client, operation, i);
		case 'prompt':
			return handlePrompt(ctx, client, operation, i);
		case 'chat':
			return handleChat(ctx, client, operation, i);
		case 'execution':
			return handleExecution(ctx, client, operation, i);
		case 'dataSource':
			return handleDataSource(ctx, client, operation, i);
		case 'trace':
			return handleTrace(ctx, client, operation, i);
		case 'cost':
			return handleCost(ctx, client, operation, i);
		case 'mediaStudio':
			return handleMediaStudio(ctx, client, operation, i);
		case 'asset':
			return handleAsset(ctx, client, operation, i);
		case 'mediaModel':
			return handleMediaModel(ctx, client, operation, i);
		default:
			throw new Error(`unknown resource: ${resource}`);
	}
}

// --- Parameter helpers ---------------------------------------------------

function pagination(ctx: IExecuteFunctions, i: number): { page: number; limit: number } {
	return {
		page: ctx.getNodeParameter('page', i, 1) as number,
		limit: ctx.getNodeParameter('limit', i, 20) as number,
	};
}

function parseJson(value: unknown, field: string): Record<string, unknown> {
	if (value === undefined || value === null || value === '') return {};
	if (typeof value === 'object') return value as Record<string, unknown>;
	if (typeof value !== 'string') {
		throw new Error(`${field} must be a JSON object or string`);
	}
	try {
		const parsed = JSON.parse(value);
		if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
			throw new Error(`${field} must decode to a JSON object`);
		}
		return parsed as Record<string, unknown>;
	} catch (err) {
		throw new Error(`${field} is not valid JSON: ${(err as Error).message}`);
	}
}

// --- Resource handlers ---------------------------------------------------

async function handleAgent(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'execute': {
			const agentId = ctx.getNodeParameter('agentId', i) as string;
			const variables = parseJson(ctx.getNodeParameter('variables', i, {}), 'Variables');
			return client.agents.execute(agentId, { input: variables, sync: true });
		}
		case 'preview': {
			const agentId = ctx.getNodeParameter('agentId', i) as string;
			const variables = parseJson(ctx.getNodeParameter('variables', i, {}), 'Variables');
			const versionId = (ctx.getNodeParameter('versionId', i, '') as string) || undefined;
			return client.agents.preview(agentId, { input: variables, version_id: versionId });
		}
		case 'get':
			return client.agents.get(ctx.getNodeParameter('agentId', i) as string);
		case 'getMany':
			return client.agents.list(pagination(ctx, i));
		default:
			throw new Error(`unknown agent operation: ${op}`);
	}
}

async function handlePrompt(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'get':
			return client.prompts.get(ctx.getNodeParameter('promptId', i) as string);
		case 'getMany':
			return client.prompts.list(pagination(ctx, i));
		case 'run': {
			const promptId = ctx.getNodeParameter('promptId', i) as string;
			const variables = parseJson(ctx.getNodeParameter('variables', i, {}), 'Variables');
			// The backend renders the prompt from its stored body when
			// user_prompt is left empty; variables feed Jinja.
			return client.prompts.runPrompt(promptId, {
				user_prompt: '',
				llm_model_id: '',
				input: variables,
			});
		}
		default:
			throw new Error(`unknown prompt operation: ${op}`);
	}
}

async function handleChat(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'createSession': {
			const agentId = ctx.getNodeParameter('agentId', i) as string;
			return client.chat.createSession({ agent_id: agentId });
		}
		case 'getSession':
			return client.chat.getSession(ctx.getNodeParameter('sessionId', i) as string);
		case 'listSessions':
			return client.chat.listSessions(pagination(ctx, i));
		case 'listMessages': {
			const sessionId = ctx.getNodeParameter('sessionId', i) as string;
			return client.chat.listMessages(sessionId, pagination(ctx, i));
		}
		case 'sendMessage': {
			const sessionId = ctx.getNodeParameter('sessionId', i) as string;
			const content = ctx.getNodeParameter('message', i) as string;
			return client.chat.sendMessage(sessionId, { content });
		}
		default:
			throw new Error(`unknown chat operation: ${op}`);
	}
}

async function handleExecution(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'get':
			return client.executions.get(ctx.getNodeParameter('executionId', i) as string);
		case 'getMany':
			return client.executions.list(pagination(ctx, i));
		default:
			throw new Error(`unknown execution operation: ${op}`);
	}
}

async function handleDataSource(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'get':
			return client.dataSources.get(ctx.getNodeParameter('dataSourceId', i) as string);
		case 'getMany':
			return client.dataSources.list(pagination(ctx, i));
		case 'query': {
			const dsId = ctx.getNodeParameter('dataSourceId', i) as string;
			const parameters = parseJson(
				ctx.getNodeParameter('queryParameters', i, {}),
				'Query Parameters',
			);
			return client.dataSources.query(dsId, parameters);
		}
		default:
			throw new Error(`unknown data source operation: ${op}`);
	}
}

async function handleTrace(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'get':
			return client.traces.getByTraceId(ctx.getNodeParameter('traceId', i) as string);
		case 'getMany':
			return client.traces.list(pagination(ctx, i));
		default:
			throw new Error(`unknown trace operation: ${op}`);
	}
}

async function handleCost(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'workspaceSummary':
			return client.costs.getSummary();
		case 'agentSummary':
			return client.costs.getAgentSummary(ctx.getNodeParameter('agentId', i) as string);
		default:
			throw new Error(`unknown cost operation: ${op}`);
	}
}

async function handleMediaStudio(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	if (op !== 'generate') {
		throw new Error(`unknown media studio operation: ${op}`);
	}
	const provider = ctx.getNodeParameter('provider', i) as string;
	const mediaType = ctx.getNodeParameter('mediaType', i) as string;
	const model = ctx.getNodeParameter('model', i) as string;
	const prompt = ctx.getNodeParameter('prompt', i) as string;
	const inputUrl = (ctx.getNodeParameter('inputUrl', i, '') as string) || undefined;
	const config = parseJson(ctx.getNodeParameter('config', i, {}), 'Config');
	return client.media.generate({
		provider,
		media_type: mediaType,
		model,
		prompt,
		input_url: inputUrl,
		config,
	});
}

async function handleAsset(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	switch (op) {
		case 'get':
			return client.assets.get(ctx.getNodeParameter('assetId', i) as string);
		case 'getSignedUrl':
			return client.assets.getSignedUrl(ctx.getNodeParameter('assetId', i) as string);
		case 'delete': {
			await client.assets.delete(ctx.getNodeParameter('assetId', i) as string);
			return { success: true };
		}
		case 'getMany': {
			const params: Record<string, unknown> = pagination(ctx, i);
			const type = (ctx.getNodeParameter('assetType', i, '') as string) || '';
			const provider = (ctx.getNodeParameter('assetProvider', i, '') as string) || '';
			const executionId = (ctx.getNodeParameter('assetExecutionId', i, '') as string) || '';
			const agentId = (ctx.getNodeParameter('assetAgentId', i, '') as string) || '';
			if (type) params.type = type;
			if (provider) params.provider = provider;
			if (executionId) params.execution_id = executionId;
			if (agentId) params.agent_id = agentId;
			return client.assets.list(params as Parameters<typeof client.assets.list>[0]);
		}
		default:
			throw new Error(`unknown asset operation: ${op}`);
	}
}

async function handleMediaModel(
	ctx: IExecuteFunctions,
	client: PromptRailsClient,
	op: string,
	i: number,
): Promise<unknown> {
	if (op !== 'getMany') {
		throw new Error(`unknown media model operation: ${op}`);
	}
	const params: Record<string, unknown> = pagination(ctx, i);
	const provider = (ctx.getNodeParameter('mediaModelProvider', i, '') as string) || '';
	const mediaType = (ctx.getNodeParameter('mediaModelMediaType', i, '') as string) || '';
	const isActive = (ctx.getNodeParameter('mediaModelIsActive', i, '') as string) || '';
	if (provider) params.provider = provider;
	if (mediaType) params.media_type = mediaType;
	if (isActive) params.is_active = isActive === 'true';
	return client.mediaModels.list(params as Parameters<typeof client.mediaModels.list>[0]);
}

// === Output shaping ======================================================

function pushResult(out: INodeExecutionData[], result: unknown, itemIndex: number): void {
	if (result === undefined || result === null) {
		out.push({ json: {}, pairedItem: { item: itemIndex } });
		return;
	}

	// Paginated SDK responses have shape { data: T[], meta: {...} } — emit
	// each row as its own output item so downstream nodes can iterate, and
	// preserve meta on every row for pagination chaining.
	if (typeof result === 'object' && result !== null && 'data' in result && 'meta' in result) {
		const { data, meta } = result as { data: unknown; meta: unknown };
		if (Array.isArray(data)) {
			if (data.length === 0) {
				out.push({ json: { meta } as IDataObject, pairedItem: { item: itemIndex } });
				return;
			}
			for (const row of data) {
				out.push({
					json: { ...(row as IDataObject), meta } as IDataObject,
					pairedItem: { item: itemIndex },
				});
			}
			return;
		}
	}

	if (Array.isArray(result)) {
		if (result.length === 0) {
			out.push({ json: {}, pairedItem: { item: itemIndex } });
			return;
		}
		for (const row of result) {
			out.push({ json: row as IDataObject, pairedItem: { item: itemIndex } });
		}
		return;
	}

	out.push({ json: result as IDataObject, pairedItem: { item: itemIndex } });
}
