import { INodeTypes } from 'n8n-workflow';
import { Wapisimo } from './nodes/Wapisimo/Wapisimo.node';
import { WapiSimoTrigger } from './nodes/Wapisimo/WapiSimoTrigger.node';

export const nodeTypes: INodeTypes = {
	Wapisimo,
	WapiSimoTrigger,
};

export * from './nodes';
export * from './credentials';
