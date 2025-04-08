import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WapisimoApi implements ICredentialType {
	name = 'wapisimoApi';
	displayName = 'Wapisimo API';
	documentationUrl = 'https://api.wapisimo.dev/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'La API key de Wapisimo',
		},
	];
}