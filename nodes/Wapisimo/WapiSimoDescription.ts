import { INodeProperties } from 'n8n-workflow';

export const wapiSimoOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['message'],
            },
        },
        options: [
            {
                name: 'Send Message',
                value: 'sendMessage',
                description: 'Send a WhatsApp message to a specific number',
                routing: {
                    request: {
                        method: 'POST',
                        url: '={{ "/" + $credentials.phoneOrGroupId + "/send"}}',
                    },
                },
            },
        ],
        default: 'sendMessage',
    },
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['phone'],
            },
        },
        options: [
            {
                name: 'Verify Number',
                value: 'verifyNumber',
                description: 'Check if a phone number is registered on WhatsApp',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/verify',
                    },
                },
            },
            {
                name: 'Get QR Code',
                value: 'getQrCode',
                description: 'Retrieve the QR code for WhatsApp Web authentication',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{ "/" + $credentials.phoneOrGroupId + "/qr"}}',
                    },
                },
            },
        ],
        default: 'verifyNumber',
    },
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['webhook'],
            },
        },
        options: [
            {
                name: 'List Webhooks',
                value: 'listWebhooks',
                description: 'Get all webhooks configured for a phone',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{ "/" + $credentials.phoneOrGroupId + "/webhook"}}',
                    },
                },
            },
            {
                name: 'Add Webhook',
                value: 'addWebhook',
                description: 'Configure a new webhook for receiving message notifications',
                routing: {
                    request: {
                        method: 'POST',
                        url: '={{ "/" + $credentials.phoneOrGroupId + "/webhook"}}',
                    },
                },
            },
            {
                name: 'Delete Webhook',
                value: 'deleteWebhook',
                description: 'Remove a configured webhook',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '={{ "/" + $credentials.phoneOrGroupId + "/webhook/" + $parameter["webhookId"]}}',
                    },
                },
            },
        ],
        default: 'listWebhooks',
    },
];

export const wapiSimoFields: INodeProperties[] = [
    {
        displayName: 'To',
        name: 'to',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendMessage'],
            },
        },
        description: 'The phone number to send the message to',
        routing: {
            send: {
                type: 'body',
                property: 'to',
            },
        },
    },
    {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendMessage'],
            },
        },
        description: 'The message to send',
        routing: {
            send: {
                type: 'body',
                property: 'message',
            },
        },
    },
    {
        displayName: 'Phone Number',
        name: 'phone',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['phone'],
                operation: ['verifyNumber'],
            },
        },
        description: 'The phone number to verify',
        routing: {
            send: {
                type: 'query',
                property: 'phone',
            },
        },
    },
    {
        displayName: 'Webhook URL',
        name: 'url',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['webhook'],
                operation: ['addWebhook'],
            },
        },
        description: 'The URL of the webhook',
        routing: {
            send: {
                type: 'body',
                property: 'url',
            },
        },
    },
    {
        displayName: 'Webhook ID',
        name: 'webhookId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['webhook'],
                operation: ['deleteWebhook'],
            },
        },
        description: 'The ID of the webhook to delete',
    },
];