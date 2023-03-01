export interface Data {
	lastUpdate: string;
	date: string;
	city: any[][];
}

export interface Item {
	name: string;
	value: number;
	wind?: string;
	cloud?: number;
	weather?: string;
	code?: string;
	provincialCapital?: string;
}

export interface RootObject {
	msg: string;
	code: number;
	data: Data;
}