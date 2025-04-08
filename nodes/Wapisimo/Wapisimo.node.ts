import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { wapiSimoOperations, wapiSimoFields } from './WapiSimoDescription';

export class Wapisimo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wapisimo',
		name: 'wapisimo',
		icon: 'file:wapisimo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Consume Wapisimo API',
		defaults: {
			name: 'Wapisimo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'wapiSimoApi',
				required: true,
			},
		],
		properties: [
			wapiSimoOperations,
			...wapiSimoFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('wapiSimoApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let response;
				const headers = {
					'Authorization': `Bearer ${credentials.apiKey}`,
					'Content-Type': 'application/json',
				};

				if (operation === 'sendMessage') {
					const phoneOrGroupId = this.getNodeParameter('phoneOrGroupId', i) as string;
					const to = this.getNodeParameter('to', i) as string;
					const message = this.getNodeParameter('message', i) as string;

					response = await this.helpers.request({
						method: 'POST',
						url: `https://api.wapisimo.dev/v1/${phoneOrGroupId}/send`,
						headers,
						body: { to, message },
						json: true,
					});
				} else if (operation === 'verifyNumber') {
					const phone = this.getNodeParameter('phone', i) as string;

					response = await this.helpers.request({
						method: 'GET',
						url: `https://api.wapisimo.dev/v1/verify`,
						headers,
						qs: { phone },
						json: true,
					});
				} else if (operation === 'getQRCode') {
					const phoneId = this.getNodeParameter('phoneId', i) as string;

					response = await this.helpers.request({
						method: 'GET',
						url: `https://api.wapisimo.dev/v1/${phoneId}/qr`,
						headers,
						json: true,
					});
				} else if (operation === 'listWebhooks') {
					const phoneId = this.getNodeParameter('phoneId', i) as string;

					response = await this.helpers.request({
						method: 'GET',
						url: `https://api.wapisimo.dev/v1/${phoneId}/webhook`,
						headers,
						json: true,
					});
				} else if (operation === 'addWebhook') {
					const phoneId = this.getNodeParameter('phoneId', i) as string;
					const url = this.getNodeParameter('url', i) as string;

					response = await this.helpers.request({
						method: 'POST',
						url: `https://api.wapisimo.dev/v1/${phoneId}/webhook`,
						headers,
						body: { url },
						json: true,
					});
				} else if (operation === 'deleteWebhook') {
					const phoneId = this.getNodeParameter('phoneId', i) as string;
					const webhookId = this.getNodeParameter('webhookId', i) as string;

					response = await this.helpers.request({
						method: 'DELETE',
						url: `https://api.wapisimo.dev/v1/${phoneId}/webhook/${webhookId}`,
						headers,
						json: true,
					});
				}

				returnData.push({ json: response });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error);
			}
		}

		return [returnData];
	}
}