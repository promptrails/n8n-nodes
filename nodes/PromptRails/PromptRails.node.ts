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

const mediaStudioOperations: INodePropertyOptions[] = [
	{
		name: 'Generate',
		value: 'generate',
		action: 'Generate media',
		description: 'Generate media using a provider model',
		routing: {
			request: {
				method: 'POST',
				url: '/api/v1/media/generate',
				body: {
					provider: '={{$parameter["provider"]}}',
					media_type: '={{$parameter["mediaType"]}}',
					model: '={{$parameter["model"]}}',
					prompt: '={{$parameter["prompt"]}}',
					input_url: '={{$parameter["inputUrl"] || undefined}}',
					config: '={{$parameter["config"] ? JSON.parse($parameter["config"]) : undefined}}',
				},
			},
		},
	},
];

const assetOperations: INodePropertyOptions[] = [
	{
		name: 'Delete',
		value: 'delete',
		action: 'Delete an asset',
		description: 'Delete an asset by ID',
		routing: {
			request: {
				method: 'DELETE',
				url: '=/api/v1/assets/{{$parameter["assetId"]}}',
			},
		},
	},
	{
		name: 'Get',
		value: 'get',
		action: 'Get an asset',
		description: 'Retrieve an asset by ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/assets/{{$parameter["assetId"]}}',
			},
		},
	},
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List assets',
		description: 'Retrieve a list of assets',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/assets',
			},
		},
	},
	{
		name: 'Get Signed URL',
		value: 'getSignedUrl',
		action: 'Get a signed URL for an asset',
		description: 'Retrieve a signed download URL for an asset',
		routing: {
			request: {
				method: 'GET',
				url: '=/api/v1/assets/{{$parameter["assetId"]}}/signed-url',
			},
		},
	},
];

const mediaModelOperations: INodePropertyOptions[] = [
	{
		name: 'Get Many',
		value: 'getMany',
		action: 'List media models',
		description: 'Retrieve a list of available media models',
		routing: {
			request: {
				method: 'GET',
				url: '/api/v1/media-models',
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
				typeOptions: {
					rows: 4,
				},
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
				routing: {
					request: {
						qs: {
							type: '={{$value || undefined}}',
						},
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
				routing: {
					request: {
						qs: {
							provider: '={{$value || undefined}}',
						},
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
				routing: {
					request: {
						qs: {
							execution_id: '={{$value || undefined}}',
						},
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
				routing: {
					request: {
						qs: {
							agent_id: '={{$value || undefined}}',
						},
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
				routing: {
					request: {
						qs: {
							provider: '={{$value || undefined}}',
						},
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
				routing: {
					request: {
						qs: {
							media_type: '={{$value || undefined}}',
						},
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
				routing: {
					request: {
						qs: {
							is_active: '={{$value || undefined}}',
						},
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
