import { INodeProperties, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

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
                action: 'Send message',
            },
            {
                name: 'Verify Number',
                value: 'verifyNumber',
                action: 'Verify number',
            },
            {
                name: 'Get QR Code',
                value: 'getQRCode',
                action: 'Get QR code',
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
                action: 'Verify number',
            },
            {
                name: 'Get QR Code',
                value: 'getQRCode',
                description: 'Retrieve the QR code for WhatsApp Web authentication',
                routing: {
                    request: {
                        method: 'GET',
                        url: '={{ "/" + $credentials.phoneOrGroupId + "/qr"}}',
                    },
                },
                action: 'Get QR code',
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
                action: 'List webhooks',
            },
            {
                name: 'Add Webhook',
                value: 'addWebhook',
                action: 'Add webhook',
            },
            {
                name: 'Delete Webhook',
                value: 'deleteWebhook',
                action: 'Delete webhook',
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

export const description: INodeTypeDescription = {
    displayName: 'Wapisimo',
    name: 'wapisimo',
    icon: 'file:wapisimo.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Interact with Wapisimo API',
    defaults: {
        name: 'Wapisimo',
    },
    inputs: [{
        type: NodeConnectionType.Main,
    }],
    outputs: [{
        type: NodeConnectionType.Main,
    }],
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
            options: [
                {
                    name: 'Send Message',
                    value: 'sendMessage',
                    action: 'Send a message',
                },
                {
                    name: 'Verify Number',
                    value: 'verifyNumber',
                    action: 'Verify a phone number',
                },
                {
                    name: 'Get QR Code',
                    value: 'getQRCode',
                    action: 'Get QR code',
                },
            ],
            default: 'sendMessage',
        },
        {
            displayName: 'To',
            name: 'to',
            type: 'string',
            default: '',
            required: true,
            displayOptions: {
                show: {
                    operation: ['sendMessage'],
                },
            },
            placeholder: '+1234567890',
            description: 'Phone number to send the message to',
        },
        {
            displayName: 'Message',
            name: 'message',
            type: 'string',
            default: '',
            required: true,
            displayOptions: {
                show: {
                    operation: ['sendMessage'],
                },
            },
            placeholder: 'Hello from Wapisimo!',
            description: 'Message to send',
        },
        {
            displayName: 'Phone',
            name: 'phone',
            type: 'string',
            default: '',
            required: true,
            displayOptions: {
                show: {
                    operation: ['verifyNumber'],
                },
            },
            placeholder: '+1234567890',
            description: 'Phone number to verify',
        },
    ],
};