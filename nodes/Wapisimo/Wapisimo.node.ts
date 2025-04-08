import type { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

// Importar directamente la descripción del nodo
import { description } from './WapiSimoDescription';

export class Wapisimo implements INodeType {
	description: INodeTypeDescription = description;

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'sendMessage') {
					const to = this.getNodeParameter('to', i) as string;
					const message = this.getNodeParameter('message', i) as string;

					const credentials = await this.getCredentials('wapiSimoApi');

					const response = await fetch('https://api.wapisimo.dev/v1/send', {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${credentials.apiKey as string}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ to, message }),
					});

					const data = await response.json();
					returnData.push(data as IDataObject);
				}
				// Implementar otros casos según las operaciones definidas en WapiSimoDescription
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}