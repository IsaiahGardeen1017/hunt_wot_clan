import { link } from 'node:fs';
import { queryString } from './fetchWotData.ts';
import { tankIdFromLink } from './tanksggMapper.ts';

const BASE_URL = 'https://sheets.googleapis.com/v4'
const sheetId = '11rTH-mIeZUvZ3oULWg1GGBU6oAJAo0HkcObnjUnf_oI';

type GoogleSheetsDataReturn = {
    range: string,
    majorDimension: string,
    values: string[][]
}

export async function getRecommendedTankIds(): Promise<string[]> {
    const queries = {
		key: Deno.env.get('GOOGLE_KEY') || '',
	};
	const reqUrl = `${BASE_URL}/spreadsheets/${sheetId}/values/C10:C110/${queryString(queries)}`;

	const response = await fetch(reqUrl);

	const body = (await response.json()) as GoogleSheetsDataReturn;
    const links = body.values;
	const ids: string[] = [];
	for(let i = 0; i < links.length; i++){
		if(links[i].length > 0){
			ids.push(await tankIdFromLink(links[i][0]));
		}
	}
	return ids;
}