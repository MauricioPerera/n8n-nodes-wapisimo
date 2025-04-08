"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WapiSimo = void 0;
const WapiSimoDescription_1 = require("./WapiSimoDescription");
class WapiSimo {
    constructor() {
        this.description = {
            displayName: 'WapiSimo',
            name: 'wapiSimo',
            icon: 'file:wapisimo.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with WapiSimo WhatsApp API',
            defaults: {
                name: 'WapiSimo',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'wapiSimoApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: '={{$credentials.baseUrl}}',
                url: '',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer {{$credentials.apiKey}}',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Message',
                            value: 'message',
                        },
                        {
                            name: 'Phone',
                            value: 'phone',
                        },
                        {
                            name: 'Webhook',
                            value: 'webhook',
                        },
                    ],
                    default: 'message',
                },
                ...WapiSimoDescription_1.wapiSimoOperations,
                ...WapiSimoDescription_1.wapiSimoFields,
            ],
        };
    }
}
exports.WapiSimo = WapiSimo;
//# sourceMappingURL=WapiSimo.node.js.map
