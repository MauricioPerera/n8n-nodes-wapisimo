import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
    NodeConnectionType,
} from 'n8n-workflow';

export class WapiSimoWebhook implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Wapisimo Webhook',
        name: 'wapiSimoWebhook',
        icon: 'file:wapisimo.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: 'Manage Wapisimo Webhooks',
        defaults: {
            name: 'Wapisimo Webhook',
        },
        inputs: [
            {
                type: NodeConnectionType.Main,
            },
        ],
        outputs: [
            {
                type: NodeConnectionType.Main,
            },
        ],
        credentials: [
            {
                name: 'wapiSimoApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                default: 'listWebhooks',
                options: [
                    {
                        name: 'List Webhooks',
                        value: 'listWebhooks',
                        description: 'Get all webhooks configured for a phone',
                        action: 'List all webhooks',
                    },
                    {
                        name: 'Add Webhook',
                        value: 'addWebhook',
                        description: 'Configure a new webhook for receiving notifications',
                        action: 'Add a new webhook',
                    },
                    {
                        name: 'Delete Webhook',
                        value: 'deleteWebhook',
                        description: 'Remove a configured webhook',
                        action: 'Delete a webhook',
                    },
                ],
            },
            {
                displayName: 'Phone ID',
                name: 'phoneId',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the phone to manage webhooks for',
            },
            {
                displayName: 'Webhook URL',
                name: 'url',
                type: 'string',
                required: true,
                default: '',
                description: 'The URL that will receive webhook events',
                displayOptions: {
                    show: {
                        operation: ['addWebhook'],
                    },
                },
            },
            {
                displayName: 'Webhook ID',
                name: 'webhookId',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the webhook to delete',
                displayOptions: {
                    show: {
                        operation: ['deleteWebhook'],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const operation = this.getNodeParameter('operation', 0) as string;
        const credentials = await this.getCredentials('wapiSimoApi');

        for (let i = 0; i < items.length; i++) {
            try {
                let response;
                const headers = {
                    'Authorization': `Bearer ${credentials.apiKey}`,
                    'Content-Type': 'application/json',
                };

                const phoneId = this.getNodeParameter('phoneId', i) as string;

                if (operation === 'listWebhooks') {
                    response = await this.helpers.request({
                        method: 'GET',
                        url: `https://api.wapisimo.dev/v1/${phoneId}/webhook`,
                        headers,
                        json: true,
                    });
                } else if (operation === 'addWebhook') {
                    const url = this.getNodeParameter('url', i) as string;

                    response = await this.helpers.request({
                        method: 'POST',
                        url: `https://api.wapisimo.dev/v1/${phoneId}/webhook`,
                        headers,
                        body: { url },
                        json: true,
                    });
                } else if (operation === 'deleteWebhook') {
                    const webhookId = this.getNodeParameter('webhookId', i) as string;

                    response = await this.helpers.request({
                        method: 'DELETE',
                        url: `https://api.wapisimo.dev/v1/${phoneId}/webhook/${webhookId}`,
                        headers,
                        json: true,
                    });
                }

                returnData.push({ json: response });
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw new NodeOperationError(this.getNode(), error as Error);
            }
        }

        return [returnData];
    }
}