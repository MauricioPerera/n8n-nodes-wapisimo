import {
    IHookFunctions,
    INodeType,
    INodeTypeDescription,
    IWebhookFunctions,
    NodeApiError,
    NodeConnectionType,
} from 'n8n-workflow';

export class WapiSimoTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'WapiSimo Trigger',
        name: 'wapiSimoTrigger',
        icon: 'file:wapisimo.svg',
        group: ['trigger'],
        version: 1,
        description: 'Handle incoming WapiSimo webhook events',
        defaults: {
            name: 'WapiSimo Trigger',
        },
        inputs: [],
        outputs: [{
            type: NodeConnectionType.Main,
        }],
        credentials: [
            {
                name: 'wapiSimoApi',
                required: true,
            },
        ],
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: 'webhook',
            },
        ],
        properties: [
            {
                displayName: 'Phone ID',
                name: 'phoneId',
                type: 'string',
                default: '',
                required: true,
                description: 'The ID of the phone to receive webhook events for',
            },
            {
                displayName: 'Only Messages From Others',
                name: 'onlyFromOthers',
                type: 'boolean',
                default: true,
                description: 'Whether to only trigger on messages from others (not from yourself)',
            },
            {
                displayName: 'Options',
                name: 'options',
                type: 'collection',
                placeholder: 'Add Option',
                default: {},
                options: [
                    {
                        displayName: 'Filter by Sender',
                        name: 'fromFilter',
                        type: 'string',
                        default: '',
                        description: 'Only trigger on messages from this sender (phone number)',
                    },
                    {
                        displayName: 'Filter by Message Content',
                        name: 'messageFilter',
                        type: 'string',
                        default: '',
                        description: 'Only trigger on messages containing this text',
                    },
                ],
            },
        ],
    };

    webhookMethods = {
        default: {
            checkExists: async function (this: IHookFunctions): Promise<boolean> {
                const webhookUrl = this.getNodeWebhookUrl('default');
                const phoneId = this.getNodeParameter('phoneId') as string;
                const credentials = await this.getCredentials('wapiSimoApi');

                try {
                    const response = await this.helpers.request({
                        method: 'GET',
                        url: `/v1/${phoneId}/webhook`,
                        baseURL: credentials.baseUrl as string,
                        headers: {
                            Authorization: `Bearer ${credentials.apiKey}`,
                        },
                    });

                    const webhooks = response as Array<{ id: string; url: string }>;
                    for (const webhook of webhooks) {
                        if (webhook.url === webhookUrl) {
                            const webhookData = this.getWorkflowStaticData('node');
                            webhookData.webhookId = webhook.id;
                            return true;
                        }
                    }
                    return false;
                } catch (error) {
                    throw new NodeApiError(this.getNode(), {
                        message: error.message,
                        description: error.description || error.message,
                    });
                }
            },

            create: async function (this: IHookFunctions): Promise<boolean> {
                const webhookUrl = this.getNodeWebhookUrl('default');
                const phoneId = this.getNodeParameter('phoneId') as string;
                const credentials = await this.getCredentials('wapiSimoApi');

                try {
                    const response = await this.helpers.request({
                        method: 'POST',
                        url: `/v1/${phoneId}/webhook`,
                        baseURL: credentials.baseUrl as string,
                        headers: {
                            Authorization: `Bearer ${credentials.apiKey}`,
                        },
                        body: {
                            url: webhookUrl,
                        },
                    });

                    if ((response as { id: string }).id) {
                        const webhookData = this.getWorkflowStaticData('node');
                        webhookData.webhookId = (response as { id: string }).id;
                        return true;
                    }
                    return false;
                } catch (error) {
                    throw new NodeApiError(this.getNode(), {
                        message: error.message,
                        description: error.description || error.message,
                    });
                }
            },

            delete: async function (this: IHookFunctions): Promise<boolean> {
                const phoneId = this.getNodeParameter('phoneId') as string;
                const credentials = await this.getCredentials('wapiSimoApi');
                const webhookData = this.getWorkflowStaticData('node');

                if (webhookData.webhookId) {
                    try {
                        await this.helpers.request({
                            method: 'DELETE',
                            url: `/v1/${phoneId}/webhook/${webhookData.webhookId}`,
                            baseURL: credentials.baseUrl as string,
                            headers: {
                                Authorization: `Bearer ${credentials.apiKey}`,
                            },
                        });
                        delete webhookData.webhookId;
                        return true;
                    } catch (error) {
                        throw new NodeApiError(this.getNode(), {
                            message: error.message,
                            description: error.description || error.message,
                        });
                    }
                }
                return false;
            },
        },
    };

    async webhook(this: IWebhookFunctions) {
        const bodyData = this.getBodyData();
        const onlyFromOthers = this.getNodeParameter('onlyFromOthers', false) as boolean;
        const options = this.getNodeParameter('options', {}) as {
            fromFilter?: string;
            messageFilter?: string;
        };

        if (onlyFromOthers && (bodyData as { fromMe: boolean }).fromMe === true) {
            return {
                noWebhookResponse: true,
            };
        }

        if (options.fromFilter && (bodyData as { from: string }).from) {
            const fromFilter = options.fromFilter;
            const from = (bodyData as { from: string }).from;
            if (!from.includes(fromFilter)) {
                return {
                    noWebhookResponse: true,
                };
            }
        }

        if (options.messageFilter && (bodyData as { message: string }).message) {
            const messageFilter = options.messageFilter;
            const message = (bodyData as { message: string }).message;
            if (!message.includes(messageFilter)) {
                return {
                    noWebhookResponse: true,
                };
            }
        }

        return {
            workflowData: [this.helpers.returnJsonArray([bodyData])],
        };
    }
}