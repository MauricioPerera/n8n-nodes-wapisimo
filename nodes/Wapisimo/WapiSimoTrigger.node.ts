import {
    IHookFunctions,
    INodeType,
    INodeTypeDescription,
    IWebhookFunctions,
    IWebhookResponseData,
    NodeApiError,
    NodeConnectionType,
} from 'n8n-workflow';

export class WapiSimoTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Wapisimo Trigger',
        name: 'wapiSimoTrigger',
        icon: 'file:wapisimo.svg',
        group: ['trigger'],
        version: 1,
        description: 'Handle Wapisimo webhook events',
        defaults: {
            name: 'Wapisimo Trigger',
        },
        inputs: [],
        outputs: [
            {
                type: NodeConnectionType.Main,
            }
        ],
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
                displayName: 'Events',
                name: 'events',
                type: 'multiOptions',
                options: [
                    {
                        name: 'Message Received',
                        value: 'messageReceived',
                        description: 'Trigger when a message is received',
                    },
                ],
                default: ['messageReceived'],
                required: true,
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

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const webhookName = this.getWebhookName();
        const bodyData = this.getBodyData();

        if (webhookName === 'default') {
            return {
                webhookResponse: 'OK',
                workflowData: [this.helpers.returnJsonArray([bodyData])],
            };
        }

        return {
            webhookResponse: 'Not Found',
            workflowData: [this.helpers.returnJsonArray([{ error: 'Webhook not found' }])],
        };
    }
}