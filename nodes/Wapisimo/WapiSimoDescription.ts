import { INodeProperties } from 'n8n-workflow';

export const wapiSimoOperations: INodeProperties[] = [
    {
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
    },
    // Campos para cada operación
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