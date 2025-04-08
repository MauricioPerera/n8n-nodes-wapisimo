import { INodeProperties } from 'n8n-workflow';

// Operaciones existentes
const operationOptions = [
    {
        name: 'Send Message',
        value: 'sendMessage',
        description: 'Send a WhatsApp message',
        action: 'Send a WhatsApp message',
    },
    {
        name: 'Verify Number',
        value: 'verifyNumber',
        description: 'Verify if a number has WhatsApp',
        action: 'Verify if a number has WhatsApp',
    },
    {
        name: 'Get QR Code',
        value: 'getQRCode',
        description: 'Get QR Code to connect WhatsApp',
        action: 'Get QR Code to connect WhatsApp',
    },
    // Añadir nuevas operaciones de webhook
    {
        name: 'List Webhooks',
        value: 'listWebhooks',
        description: 'Get all webhooks configured for a phone',
        action: 'List all webhooks',
    },
    {
        name: 'Add Webhook',
        value: 'addWebhook',
        description: 'Configure a new webhook for receiving message notifications',
        action: 'Add a new webhook',
    },
    {
        name: 'Delete Webhook',
        value: 'deleteWebhook',
        description: 'Remove a configured webhook',
        action: 'Delete a webhook',
    },
];

// Lista de todas las operaciones
export const wapiSimoOperations: INodeProperties[] = [
    // Campo de operación principal
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        default: 'sendMessage',
        options: operationOptions,
    },

    // Campos para Send Message
    {
        displayName: 'Phone ID',
        name: 'phoneId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the WhatsApp account to use',
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
        description: 'The phone number to send the message to',
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
        description: 'The message to send',
        displayOptions: {
            show: {
                operation: ['sendMessage'],
            },
        },
    },

    // Campos para Verify Number
    {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        required: true,
        default: '',
        description: 'The phone number to verify',
        displayOptions: {
            show: {
                operation: ['verifyNumber'],
            },
        },
    },

    // Campos para Get QR Code
    {
        displayName: 'Phone ID',
        name: 'phoneId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the WhatsApp account to get QR code for',
        displayOptions: {
            show: {
                operation: ['getQRCode'],
            },
        },
    },

    // NUEVOS CAMPOS: Lista Webhooks
    {
        displayName: 'Phone ID',
        name: 'phoneId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the phone to list webhooks for',
        displayOptions: {
            show: {
                operation: ['listWebhooks'],
            },
        },
    },

    // NUEVOS CAMPOS: Añadir Webhook
    {
        displayName: 'Phone ID',
        name: 'phoneId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the phone to add a webhook to',
        displayOptions: {
            show: {
                operation: ['addWebhook'],
            },
        },
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

    // NUEVOS CAMPOS: Eliminar Webhook
    {
        displayName: 'Phone ID',
        name: 'phoneId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the phone the webhook belongs to',
        displayOptions: {
            show: {
                operation: ['deleteWebhook'],
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
    }
];