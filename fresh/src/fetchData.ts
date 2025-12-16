const BASE_URL = 'https://api.worldoftanks.com/wot';

export type TankData = {
	name?: string;
	short_name?: string;
	tier?: number;
	tag?: string;
	images?: {
		small_icon: string;
		contour_icon: string;
		big_icon: string;
	};
	type?: string;
	tank_id?: number;
	provisions?: number[];
};

export type EquipmentDataMap = Record<string, {
	image?: string;
	provision_id?: string;
	tag?: string;
	name?: string;
	description?: string;
}>;

export type TankDataMap = Record<string, TankData>;

export type Response<D> = {
	status: string;
	meta: {
		count: number;
		page_total: number;
		total: number;
		limit: number;
		page: any;
	};
	data: D;
};

export async function fetchVehicleDataBase(): Promise<TankDataMap> {
	const queries = {
		application_id: 'd75690e34140cb77b975b505fdb03a2f',
		fields: 'name,short_name,tag,tank_id,tier,type,images,nation,provisions',
		tier: '10',
		nation: 'usa',
	};
	const reqUrl = `${BASE_URL}/encyclopedia/vehicles/${queryString(queries)}`;
	console.log(reqUrl);

	const response = await fetch(reqUrl, { method: 'GET' });

	const body = (await response.json()) as Response<TankDataMap>;
	return body.data;
}

export async function fetchEquipmentMetaData(): Promise<EquipmentDataMap> {
	const queries = {
		application_id: 'd75690e34140cb77b975b505fdb03a2f',
		fields: 'image,provision_id,tag,name',
	};
	const reqUrl = `${BASE_URL}/encyclopedia/provisions/${queryString(queries)}`;
	console.log(reqUrl);

	const response = await fetch(reqUrl, { method: 'GET' });

	const body = (await response.json()) as Response<EquipmentDataMap>;
	return body.data;
}

export function queryString(queries: Record<string, string>): string {
	const args = [];
	for (const key in queries) {
		// URLSearchParams automatically handles encoding (sanitization)
		args.push(`${key}=${encodeURIComponent(queries[key])}`);
	}
	return '?' + args.join('&');
}

export function recordToList<V>(record: Record<string, V>): V[] {
	const arr: V[] = [];
	for (const key in record) {
		arr.push(record[key]);
	}
	return arr;
}

//https://api.worldoftanks.com/wot/encyclopedia/vehicles/?application_id=d75690e34140cb77b975b505fdb03a2f&fields=name%2Cshort_name%2Ctag%2Ctank_id%2Ctier%2Ctype%2Cimages
