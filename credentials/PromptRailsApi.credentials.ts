import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class PromptRailsApi implements ICredentialType {
	name = 'promptRailsApi';
	displayName = 'PromptRails API';
	documentationUrl = 'https://promptrails.com/docs/api-keys-and-scopes';

	properties: INodeProperties[] = [
		{
			displayName: 'Host URL',
			name: 'host',
			type: 'string',
			default: 'https://api.promptrails.com',
			description: 'The base URL for the PromptRails API',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your PromptRails API key (starts with pr_key_)',
		},
		{
			displayName: 'Workspace ID',
			name: 'workspaceId',
			type: 'string',
			required: true,
			default: '',
			description: 'The workspace ID to operate on',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				'X-Workspace-ID': '={{$credentials.workspaceId}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.host}}',
			url: '/api/v1/agents',
			method: 'GET',
			qs: { limit: '1' },
		},
	};
}
