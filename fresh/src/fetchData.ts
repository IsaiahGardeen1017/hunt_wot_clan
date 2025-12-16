console.log('starting');

const BASE_URL = 'https://api.worldoftanks.com/wot';

export type TankData = {
	name: string;
	short_name: string;
	tier: number;
	tag: string;
	images: {
		small_icon: string;
		contour_icon: string;
		big_icon: string;
	};
	type: string;
	tank_id: number;
};

export type TankDataResponse = {
	status: string;
	meta: {
		count: number;
		page_total: number;
		total: number;
		limit: number;
		page: any;
	};
	data: Record<string, TankData>;
};

export async function fetchVehicleDataBase(): Promise<Record<string, TankData>> {
	const queries = {
		application_id: 'd75690e34140cb77b975b505fdb03a2f',
		fields: 'name,short_name,tag,tank_id,tier,type,images,nation',
		tier: '10',
		nation: 'usa',
	};
	const reqUrl = `${BASE_URL}/encyclopedia/vehicles/${queryString(queries)}`;
	console.log(reqUrl);
	console.log(
		'https://api.worldoftanks.com/wot/encyclopedia/vehicles/?application_id=d75690e34140cb77b975b505fdb03a2f&fields=name%2Cshort_name%2Ctag%2Ctank_id%2Ctier%2Ctype%2Cimages&tier=10',
	);
	const response = await fetch(reqUrl, { method: 'GET' });

	const body = (await response.json()) as TankDataResponse;
	return body.data;
}

function queryString(queries: Record<string, string>): string {
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
