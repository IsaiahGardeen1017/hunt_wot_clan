import { link } from 'node:fs';
import { EquipmentData, queryString } from './fetchWotData.ts';
import { mapUrlCodeToEquipmentId, tankIdFromLink } from './tanksggMapper.ts';
import { getEquipmentDictionary } from './staticDataUtils.ts';

const BASE_URL = 'https://sheets.googleapis.com/v4';
const sheetId = Deno.env.get('SHEET_ID') || '';
const recTankRange = Deno.env.get('REC_TANK_RANGE') || '';
const equipRange = Deno.env.get('EQUIP_RANGE') || '';
const googleKey = Deno.env.get('GOOGLE_KEY') || '';

if (!sheetId) {
	throw 'Missing SHEET_ID';
}
if (!equipRange) {
	throw 'Missing EQUIP_RANGE';
}
if (!recTankRange) {
	throw 'Missing REC_TANK_RANGE';
}
if (!googleKey) {
	throw 'Missing GOOGLE_KEY';
}

type GoogleSheetsDataReturn = {
	range: string;
	majorDimension: string;
	values: string[][];
};

export type EquipmentLoadout = {
	description: string;
	equipIds: string[];
	tankId: string;
	link: string;
};

export async function getRecommendedTankIds(): Promise<string[]> {
	const queries = {
		key: googleKey,
	};
	const reqUrl = `${BASE_URL}/spreadsheets/${sheetId}/values/${recTankRange}/${queryString(queries)}`;

	const response = await fetch(reqUrl);

	const body = (await response.json()) as GoogleSheetsDataReturn;
	const links = body.values;
	const ids: string[] = [];
	if (!links) {
		throw 'Could not get spreadsheet from google';
	}
	for (let i = 0; i < links.length; i++) {
		if (links[i] && links[i].length > 0) {
			ids.push(await tankIdFromLink(links[i][0]));
		}
	}
	return ids;
}

export async function getLoadouts(): Promise<EquipmentLoadout[]> {
	const queries = {
		key: googleKey,
	};
	const reqUrl = `${BASE_URL}/spreadsheets/${sheetId}/values/${equipRange}/${queryString(queries)}`;

	const response = await fetch(reqUrl);

	const body = (await response.json()) as GoogleSheetsDataReturn;
	const values = body.values;
	if (!values) {
		throw 'Could not get spreadsheet from google';
	}
	let loadouts: EquipmentLoadout[] = [];
	for (let i = 0; i < values.length; i++) {
		if (values[i] && values[i].length > 0) {
			const link = values[i][1];
			const description = values[i][0];

			if (link && description) {
				const url = new URL(link);

				const eParam = url.searchParams.get('e') || '-1.-1.-1';
				const eParts = eParam.split('.');
				if (eParts.length !== 3) {
					throw 'Url e param doesnt have three items';
				}

				const ids = await Promise.all(eParts.map(async (code) => {
					return await mapUrlCodeToEquipmentId(code);
				}));

				loadouts.push({
					description: description,
					equipIds: ids,
					tankId: await tankIdFromLink(link),
					link,
				});
			}
		}
	}
	return loadouts;
}

async function urlToEquipmentList(url: string): Promise<EquipmentData[]> {
	const path = new URL(url);
	const eParam = path.searchParams.get('e') || '-1.-1.-1';
	const eParts = eParam.split('.');
	if (eParts.length !== 3) {
		throw 'Url e param doesnt have three items';
	}
	return await Promise.all(eParts.map(async (code) => {
		const eID = await mapUrlCodeToEquipmentId(code);
		const dict = await getEquipmentDictionary();
		return dict[eID];
	}));
}
