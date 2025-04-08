import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class WapiSimoApi implements ICredentialType {
    name = 'wapiSimoApi';
    displayName = 'Wapisimo API';
    documentationUrl = 'https://api.wapisimo.dev/v1';

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
        },
    ];
}
