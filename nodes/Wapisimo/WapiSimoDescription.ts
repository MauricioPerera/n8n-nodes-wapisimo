import { INodeProperties, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export const wapiSimoOperations: INodeProperties = {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    default: 'sendMessage',
    options: [
        {
            name: 'Send Message',
            value: 'sendMessage',
            description: 'Send a WhatsApp message to a specific number',
            action: 'Send a WhatsApp message',
        },
        {
            name: 'Verify Number',
            value: 'verifyNumber',
            description: 'Check if a phone number is registered on WhatsApp',
            action: 'Verify a phone number',
        },
        {
            name: 'Get QR Code',
            value: 'getQRCode',
            description: 'Retrieve the QR code for WhatsApp Web authentication',
            action: 'Get QR code',
        },
        {
            name: 'List Webhooks',
            value: 'listWebhooks',
            description: 'Get all webhooks configured for a phone',
            action: 'List webhooks',
        },
        {
            name: 'Add Webhook',
            value: 'addWebhook',
            description: 'Configure a new webhook for receiving message notifications',
            action: 'Add webhook',
        },
        {
            name: 'Delete Webhook',
            value: 'deleteWebhook',
            description: 'Remove a configured webhook',
            action: 'Delete webhook',
        },
    ],
};

export const wapiSimoFields: INodeProperties[] = [
    // Fields for Send Message
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
        description: 'The phone ID or group ID to send the message from',
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
        description: 'The phone number to send the message to',
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
        description: 'The message to send',
    },

    // Fields for Verify Number
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
        description: 'The phone number to verify',
    },

    // Fields for QR Code
    {
        displayName: 'Phone ID',
        name: 'phoneId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['getQRCode', 'listWebhooks', 'addWebhook'],
            },
        },
        description: 'The phone ID to get the QR code for',
    },

    // Fields for Webhook operations
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
        description: 'The URL to send webhook events to',
    },
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