import { IDataObject } from 'n8n-workflow';

export interface IWapisimoWebhook {
	id: string;
	url: string;
	name: string;
	createdAt: string;
	status: string;
	lastSeen: string;
}

export interface IWapisimoApiCredentials {
	apiKey: string;
}

export interface IWapisimoResponse extends IDataObject {
	success?: boolean;
	message?: string;
}

export interface IWapisimoVerifyResponse extends IWapisimoResponse {
	exists: boolean;
	formatted_number: string;
}

export interface IWapisimoQRResponse extends IWapisimoResponse {
	status: string;
	qr_code: string;
}
