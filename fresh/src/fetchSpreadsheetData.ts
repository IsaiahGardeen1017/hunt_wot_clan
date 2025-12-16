import { link } from 'node:fs';
import { queryString } from './fetchWotData.ts';
import { tankIdFromLink } from './tanksggMapper.ts';

const BASE_URL = 'https://sheets.googleapis.com/v4';
const sheetId = Deno.env.get('SHEET_ID') || '';
const recTankRange = Deno.env.get('REC_TANK_RANGE') || '';
const googleKey = Deno.env.get('GOOGLE_KEY') || '';

if (!sheetId) {
	throw 'Missing SHEET_ID';
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
