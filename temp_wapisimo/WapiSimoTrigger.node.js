"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WapiSimoTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class WapiSimoTrigger {
    constructor() {
        this.description = {
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
            outputs: ['main'],
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
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const phoneId = this.getNodeParameter('phoneId');
                    const credentials = await this.getCredentials('wapiSimoApi');
                    try {
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `/v1/${phoneId}/webhook`,
                            baseURL: credentials.baseUrl,
                            headers: {
                                Authorization: `Bearer ${credentials.apiKey}`,
                            },
                        });
                        const webhooks = response;
                        for (const webhook of webhooks) {
                            if (webhook.url === webhookUrl) {
                                const webhookData = this.getWorkflowStaticData('node');
                                webhookData.webhookId = webhook.id;
                                return true;
                            }
                        }
                        return false;
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: error.message });
                    }
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const phoneId = this.getNodeParameter('phoneId');
                    const credentials = await this.getCredentials('wapiSimoApi');
                    try {
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `/v1/${phoneId}/webhook`,
                            baseURL: credentials.baseUrl,
                            headers: {
                                Authorization: `Bearer ${credentials.apiKey}`,
                            },
                            body: {
                                url: webhookUrl,
                            },
                        });
                        if (response.id) {
                            const webhookData = this.getWorkflowStaticData('node');
                            webhookData.webhookId = response.id;
                            return true;
                        }
                        return false;
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: error.message });
                    }
                },
                async delete() {
                    const phoneId = this.getNodeParameter('phoneId');
                    const credentials = await this.getCredentials('wapiSimoApi');
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId) {
                        try {
                            await this.helpers.request({
                                method: 'DELETE',
                                url: `/v1/${phoneId}/webhook/${webhookData.webhookId}`,
                                baseURL: credentials.baseUrl,
                                headers: {
                                    Authorization: `Bearer ${credentials.apiKey}`,
                                },
                            });
                            delete webhookData.webhookId;
                            return true;
                        }
                        catch (error) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: error.message });
                        }
                    }
                    return false;
                },
            },
        };
    }
    async webhook() {
        const bodyData = this.getBodyData();
        const onlyFromOthers = this.getNodeParameter('onlyFromOthers', false);
        const options = this.getNodeParameter('options', {});
        if (onlyFromOthers && bodyData.fromMe === true) {
            return {
                noWebhookResponse: true,
            };
        }
        if (options.fromFilter && bodyData.from) {
            const fromFilter = options.fromFilter;
            const from = bodyData.from;
            if (!from.includes(fromFilter)) {
                return {
                    noWebhookResponse: true,
                };
            }
        }
        if (options.messageFilter && bodyData.message) {
            const messageFilter = options.messageFilter;
            const message = bodyData.message;
            if (!message.includes(messageFilter)) {
                return {
                    noWebhookResponse: true,
                };
            }
        }
        return {
            workflowData: [
                this.helpers.returnJsonArray([bodyData]),
            ],
        };
    }
}
exports.WapiSimoTrigger = WapiSimoTrigger;
//# sourceMappingURL=WapiSimoTrigger.node.js.map