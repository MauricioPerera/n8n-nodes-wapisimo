import { INodeType } from 'n8n-workflow';
import { WapiSimoApi } from './credentials/WapiSimoApi.credentials';
import { Wapisimo } from './nodes/Wapisimo/Wapisimo.node';
import { WapiSimoTrigger } from './nodes/Wapisimo/WapiSimoTrigger.node';
import { WapiSimoWebhook } from './nodes/Wapisimo/WapiSimoWebhook.node';

export {
	WapiSimoApi,
	Wapisimo,
	WapiSimoTrigger,
	WapiSimoWebhook,
};

export const nodeTypes: { [key: string]: INodeType } = {
	Wapisimo,
	WapiSimoTrigger,
	WapiSimoWebhook,
};

export * from './nodes';
export * from './credentials';
