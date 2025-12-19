import { ggIdFromShortName } from './tanksggMapper.ts';

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
	slugName?: string;
	fieldModTree?: string;
};

export type EquipmentData = {
	image?: string;
	provision_id?: number;
	tag?: string;
	name?: string;
	description?: string;
	type?: string;
};

export type EquipmentDataMap = Record<string, EquipmentData>;

export type TankDataMap = Record<string, TankData>;

export type WotApiResponse<D> = {
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

export type FMstep = {
	id: number;
	level: number;
	price: string;
	action_type: string;
	action_value: string;
	unlocks: string;
	min_level: number;
};
export type FMpair = {
	id: string;
	first_name: string;
	first_price: 0;
	second_name: string;
	second_price: 0;
};
export type FMmod = {
	id: 3031;
	name: string;
	name_id: string;
	icon: string;
	mods: string;
	kpi: string;
};
export type FieldModTreeData = {
	id: string;
	root_step: number;
	steps: FMstep[];
	pairs: FMpair[];
	mods: FMmod[];
};

export async function fetchVehicleDataBase(tiers: number[] = [10]): Promise<TankDataMap> {
	const queries = {
		application_id: Deno.env.get('WOT_APP_ID') || '',
		fields: 'name,short_name,tag,tank_id,tier,type,images,nation,provisions',
		tier: tiers.join(','),
	};
	const reqUrl = `${BASE_URL}/encyclopedia/vehicles/${queryString(queries)}`;

	const response = await fetch(reqUrl, { method: 'GET' });

	const body = (await response.json()) as WotApiResponse<TankDataMap>;

	for (const key in body.data) {
		const slugName = ggIdFromShortName(body.data[key].short_name || '');
		body.data[key].slugName = slugName;
		const additionalData = await getTankDataFromTanksGG(slugName);
		body.data[key].fieldModTree = additionalData.field_mod_tree;
	}

	return body.data;
}

type TanksGGData = {
	field_mod_tree: string;
};
export async function getTankDataFromTanksGG(slugName: string): Promise<TanksGGData> {
	const resp = await fetch(`https://tanks.gg/api/tank/${slugName}`);
	const body = (await resp.json()).tank as TanksGGData;
	return body;
}

export async function fetchEquipmentMetaData(): Promise<EquipmentDataMap> {
	const queries = {
		application_id: Deno.env.get('WOT_APP_ID') || '',
		fields: 'image,provision_id,tag,name,type',
		type: 'optionalDevice',
	};
	const reqUrl = `${BASE_URL}/encyclopedia/provisions/${queryString(queries)}`;
	console.log(reqUrl);

	const response = await fetch(reqUrl, { method: 'GET' });

	const body = (await response.json()) as WotApiResponse<EquipmentDataMap>;
	return body.data;
}

export async function getFieldModTree(treeId: string) {
	return (await (await fetch(`https://tanks.gg/api/v20102/fieldmods/${treeId}`)).json()).tree;
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
