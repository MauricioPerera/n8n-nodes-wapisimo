import { INodeType, INodeTypes } from 'n8n-workflow';
import { WapiSimoApi } from './credentials/WapiSimoApi.credentials';
import { Wapisimo } from './nodes/Wapisimo/Wapisimo.node';
import { WapiSimoTrigger } from './nodes/Wapisimo/WapiSimoTrigger.node';

export {
	WapiSimoApi,
	Wapisimo,
	WapiSimoTrigger,
};

export const nodeTypes: INodeTypes = {
	Wapisimo,
	WapiSimoTrigger,
};

export * from './nodes';
export * from './credentials';
