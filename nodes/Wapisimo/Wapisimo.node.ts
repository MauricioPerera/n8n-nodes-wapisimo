import {
	IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeApiError,
	IRequestOptions,
	INodeExecutionData,
	NodeConnectionType,
} from 'n8n-workflow';

export class Wapisimo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wapisimo',
		name: 'wapisimo',
		icon: 'file:wapisimo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume la API de Wapisimo',
		defaults: {
			name: 'Wapisimo',
		},
		credentials: [
			{
				name: 'wapisimoApi',
				required: true,
			},
		],
		inputs: [
			{
				type: NodeConnectionType.Main,
			},
		],
		outputs: [
			{
				type: NodeConnectionType.Main,
			},
		],
		properties: [
			// Resource
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
						name: 'Webhook',
						value: 'webhook',
					},
					{
						name: 'Verification',
						value: 'verification',
					},
				],
				default: 'message',
			},

			// Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						description: 'Enviar un mensaje de WhatsApp',
						action: 'Send a WhatsApp message',
					},
				],
				default: 'send',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Add',
						value: 'add',
						description: 'Agregar un nuevo webhook',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Eliminar un webhook',
					},
					{
						name: 'List',
						value: 'list',
						description: 'Listar todos los webhooks',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['verification'],
					},
				},
				options: [
					{
						name: 'Verify Number',
						value: 'verify',
						description: 'Verificar un número de WhatsApp',
					},
					{
						name: 'Get QR',
						value: 'getQr',
						description: 'Obtener código QR',
					},
				],
				default: 'verify',
			},

			// Fields for Message
			{
				displayName: 'Phone/Group ID',
				name: 'phoneId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				description: 'ID del teléfono o grupo',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				description: 'Número de teléfono destino',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				description: 'Mensaje a enviar',
			},

			// Fields for Webhook
			{
				displayName: 'Phone ID',
				name: 'phoneId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				description: 'ID del teléfono',
			},
			{
				displayName: 'Webhook URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['add'],
					},
				},
				description: 'URL del webhook',
			},
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['delete'],
					},
				},
				description: 'ID del webhook a eliminar',
			},

			// Fields for Verification
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['verification'],
						operation: ['verify'],
					},
				},
				description: 'Número a verificar',
			},
			{
				displayName: 'Phone ID',
				name: 'phoneId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['verification'],
						operation: ['getQr'],
					},
				},
				description: 'ID del teléfono',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const credentials = await this.getCredentials('wapisimoApi') as IDataObject;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'message') {
					if (operation === 'send') {
						const phoneId = this.getNodeParameter('phoneId', i) as string;
						const to = this.getNodeParameter('to', i) as string;
						const message = this.getNodeParameter('message', i) as string;

						const options: IRequestOptions = {
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
							},
							method: 'POST',
							body: {
								to,
								message,
							},
							uri: `https://api.wapisimo.dev/v1/${phoneId}/send`,
							json: true,
						};

						const response = await this.helpers.request(options);
						returnData.push(response as IDataObject);
					}
				}

				if (resource === 'webhook') {
					const phoneId = this.getNodeParameter('phoneId', i) as string;

					if (operation === 'list') {
						const options: IRequestOptions = {
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
							},
							method: 'GET',
							uri: `https://api.wapisimo.dev/v1/${phoneId}/webhook`,
							json: true,
						};

						const response = await this.helpers.request(options);
						returnData.push(...(response as IDataObject[]));
					}

					if (operation === 'add') {
						const url = this.getNodeParameter('url', i) as string;

						const options: IRequestOptions = {
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
							},
							method: 'POST',
							body: {
								url,
							},
							uri: `https://api.wapisimo.dev/v1/${phoneId}/webhook`,
							json: true,
						};

						const response = await this.helpers.request(options);
						returnData.push(response as IDataObject);
					}

					if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;

						const options: IRequestOptions = {
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
							},
							method: 'DELETE',
							uri: `https://api.wapisimo.dev/v1/${phoneId}/webhook/${webhookId}`,
							json: true,
						};

						const response = await this.helpers.request(options);
						returnData.push(response as IDataObject);
					}
				}

				if (resource === 'verification') {
					if (operation === 'verify') {
						const phone = this.getNodeParameter('phone', i) as string;

						const options: IRequestOptions = {
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
							},
							method: 'GET',
							uri: `https://api.wapisimo.dev/v1/verify`,
							qs: {
								phone,
							},
							json: true,
						};

						const response = await this.helpers.request(options);
						returnData.push(response as IDataObject);
					}

					if (operation === 'getQr') {
						const phoneId = this.getNodeParameter('phoneId', i) as string;

						const options: IRequestOptions = {
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
							},
							method: 'GET',
							uri: `https://api.wapisimo.dev/v1/${phoneId}/qr`,
							json: true,
						};

						const response = await this.helpers.request(options);
						returnData.push(response as IDataObject);
					}
				}
			} catch (error) {
				if (error.response) {
					throw new NodeApiError(this.getNode(), error.response.data);
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}