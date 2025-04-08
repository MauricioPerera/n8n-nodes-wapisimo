import { INodeProperties, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

// Un solo objeto para las operaciones
const operationField: INodeProperties = {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    default: 'sendMessage',
    options: [
        {
            name: 'Send Message',
            value: 'sendMessage',
            description: 'Send a WhatsApp message',
        },
        {
            name: 'Verify Number',
            value: 'verifyNumber',
            description: 'Check if a phone number is registered on WhatsApp',
        },
        {
            name: 'Get QR Code',
            value: 'getQRCode',
            description: 'Retrieve the QR code for WhatsApp Web authentication',
        },
        {
            name: 'List Webhooks',
            value: 'listWebhooks',
            description: 'Get all webhooks configured for a phone',
        },
        {
            name: 'Add Webhook',
            value: 'addWebhook',
            description: 'Configure a new webhook for receiving message notifications',
        },
        {
            name: 'Delete Webhook',
            value: 'deleteWebhook',
            description: 'Remove a configured webhook',
        },
    ],
};

// Los campos para cada operación
const fields: INodeProperties[] = [
    // Send Message
    {
        displayName: 'Phone or Group ID',
        name: 'phoneOrGroupId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['sendMessage'],
            },
        },
    },
    {
        displayName: 'To',
        name: 'to',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['sendMessage'],
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
                operation: ['sendMessage'],
            },
        },
    },

    // Verify Number
    {
        displayName: 'Phone Number',
        name: 'phone',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['verifyNumber'],
            },
        },
    },

    // QR Code and Webhooks
    {
        displayName: 'Phone ID',
        name: 'phoneId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['getQRCode', 'listWebhooks', 'addWebhook', 'deleteWebhook'],
            },
        },
    },

    // Add Webhook
    {
        displayName: 'Webhook URL',
        name: 'url',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['addWebhook'],
            },
        },
    },

    // Delete Webhook
    {
        displayName: 'Webhook ID',
        name: 'webhookId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['deleteWebhook'],
            },
        },
    },
];

// Exportamos todo junto
export const wapiSimoOperations = [operationField, ...fields];

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