import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WapisimoApi implements ICredentialType {
	name = 'wapiSimoApi';
	displayName = 'WapiSimo API';
	documentationUrl = 'https://api.wapisimo.dev/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.wapisimo.dev/v1',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Phone/Group ID',
			name: 'phoneOrGroupId',
			type: 'string',
			default: '',
			required: true,
			description: 'The ID of your WhatsApp phone or group',
		},
	];
}