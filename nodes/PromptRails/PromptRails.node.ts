import { INodeType, INodeTypeDescription, INodePropertyOptions } from 'n8n-workflow';

const agentOperations: INodePropertyOptions[] = [
	{
		name: 'Execute',
		value: 'execute',
		action: 'Execute an agent',
		description: 'Execute an agent with input variables',
		routing: {
			request: {
				method: 'POST',
				url: '=/api/v1/agents/{{$parameter["agentId"]}}/execute',
				body: {
					variables: '={{JSON.parse($parameter["variables"] || "{}")}}',
				},
			},
		},
	},
	{
		name: 'Get',
		value: 'get',
		action: 'Get an agent',
		description: 'Retrieve an agent by ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/agents/{{$parameter["agentId"]}}',
			},
		},
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List agents',
		description: 'Retrieve a list of agents',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/agents',
			},
		},
	},
	{
		name: 'Preview',
		value: 'preview',
		action: 'Preview an agent',
		description: 'Preview an agent with a specific version',
		routing: {
			request: {
				method: 'POST',
				url: '=/api/v1/agents/{{$parameter["agentId"]}}/preview',
				body: {
					variables: '={{JSON.parse($parameter["variables"] || "{}")}}',
					version_id: '={{$parameter["versionId"] || undefined}}',
				},
			},
		},
	},
];

const promptOperations: INodePropertyOptions[] = [
	{
		name: 'Get',
		value: 'get',
		action: 'Get a prompt',
		description: 'Retrieve a prompt by ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/prompts/{{$parameter["promptId"]}}',
			},
		},
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List prompts',
		description: 'Retrieve a list of prompts',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/prompts',
			},
		},
	},
	{
		name: 'Run',
		value: 'run',
		action: 'Run a prompt',
		description: 'Execute a prompt with variables',
		routing: {
			request: {
				method: 'POST',
				url: '=/api/v1/prompts/{{$parameter["promptId"]}}/run',
				body: {
					variables: '={{JSON.parse($parameter["variables"] || "{}")}}',
				},
			},
		},
	},
];

const chatOperations: INodePropertyOptions[] = [
	{
		name: 'Create Session',
		value: 'createSession',
		action: 'Create a chat session',
		description: 'Create a new chat session for an agent',
		routing: {
			request: {
				method: 'POST',
				url: '/api/v1/chat/sessions',
				body: {
					agent_id: '={{$parameter["agentId"]}}',
				},
			},
		},
	},
	{
		name: 'Get Session',
		value: 'getSession',
		action: 'Get a chat session',
		description: 'Retrieve a chat session by ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/chat/sessions/{{$parameter["sessionId"]}}',
			},
		},
	},
	{
		name: 'List Messages',
		value: 'listMessages',
		action: 'List chat messages',
		description: 'Retrieve messages from a chat session',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/chat/sessions/{{$parameter["sessionId"]}}/messages',
			},
		},
	},
	{
		name: 'List Sessions',
		value: 'listSessions',
		action: 'List chat sessions',
		description: 'Retrieve a list of chat sessions',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/chat/sessions',
			},
		},
	},
	{
		name: 'Send Message',
		value: 'sendMessage',
		action: 'Send a chat message',
		description: 'Send a message in a chat session',
		routing: {
			request: {
				method: 'POST',
				url: '=/api/v1/chat/sessions/{{$parameter["sessionId"]}}/messages',
				body: {
					message: '={{$parameter["message"]}}',
				},
			},
		},
	},
];

const executionOperations: INodePropertyOptions[] = [
	{
		name: 'Get',
		value: 'get',
		action: 'Get an execution',
		description: 'Retrieve an execution by ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/executions/{{$parameter["executionId"]}}',
			},
		},
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List executions',
		description: 'Retrieve a list of executions',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/executions',
			},
		},
	},
];

const dataSourceOperations: INodePropertyOptions[] = [
	{
		name: 'Get',
		value: 'get',
		action: 'Get a data source',
		description: 'Retrieve a data source by ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/data-sources/{{$parameter["dataSourceId"]}}',
			},
		},
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List data sources',
		description: 'Retrieve a list of data sources',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/data-sources',
			},
		},
	},
	{
		name: 'Query',
		value: 'query',
		action: 'Query a data source',
		description: 'Execute a query against a data source',
		routing: {
			request: {
				method: 'POST',
				url: '=/api/v1/data-sources/{{$parameter["dataSourceId"]}}/query',
				body: {
					query: '={{$parameter["query"]}}',
				},
			},
		},
	},
];

const traceOperations: INodePropertyOptions[] = [
	{
		name: 'Get',
		value: 'get',
		action: 'Get a trace',
		description: 'Retrieve a trace by ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/traces/{{$parameter["traceId"]}}',
			},
		},
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List traces',
		description: 'Retrieve a list of traces',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/traces',
			},
		},
	},
	{
		name: 'Get Summary',
		value: 'getSummary',
		action: 'Get trace summary',
		description: 'Retrieve a summary of traces',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/traces/summary',
			},
		},
	},
];

const costOperations: INodePropertyOptions[] = [
	{
		name: 'Get Agent Summary',
		value: 'agentSummary',
		action: 'Get agent cost summary',
		description: 'Retrieve cost summary for a specific agent',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/costs/agents/{{$parameter["agentId"]}}',
			},
		},
	},
	{
		name: 'Get Workspace Summary',
		value: 'workspaceSummary',
		action: 'Get workspace cost summary',
		description: 'Retrieve cost summary for the workspace',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/costs/summary',
			},
		},
	},
];

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
		requestDefaults: {
			baseURL: '={{$credentials.host}}',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// ------ Resource ------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Agent', value: 'agent' },
					{ name: 'Chat', value: 'chat' },
					{ name: 'Cost', value: 'cost' },
					{ name: 'Data Source', value: 'dataSource' },
					{ name: 'Execution', value: 'execution' },
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
				typeOptions: {
					rows: 4,
				},
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
				displayName: 'Query',
				name: 'query',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				default: '',
				description: 'The query to execute against the data source',
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
				routing: {
					request: {
						qs: {
							limit: '={{$value}}',
						},
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
				routing: {
					request: {
						qs: {
							page: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
