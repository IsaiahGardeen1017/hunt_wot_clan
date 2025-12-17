import { KeyObject } from 'node:crypto';
import { getEquipmentDictionary, getEquipmentIndex, getTanksggIndex } from './staticDataUtils.ts';

export function ggIdFromShortName(shortName: string): string {
	const lc = shortName.toLocaleLowerCase();
	const letters = lc.split('');
	const final = letters.map((char) => {
		if ([' '].includes(char)) {
			return '-';
		} else if (['ł', '.', '/', '(', ')'].includes(char)) {
			return '';
		} else if (char === 'á') {
			return 'a';
		} else if (char === 'ö') {
			return 'o';
		} else {
			return char;
		}
	}).join('');
	return final;
}

export async function mapUrlCodeToEquipmentId(codedId: string): Promise<string> {
	const equipcodeIndex = await getEquipmentIndex();
	const equipcodeDict = await getEquipmentDictionary();
	const tag = equipcodeIndex[codedId];
	for (const key in equipcodeDict) {
		if (equipcodeDict[key].tag === tag) {
			return key;
		}
	}
	return '0';
}

export async function mapEquipmentIdToUrlCode(equipId: number): Promise<string> {
	const equipcodeDict = await getEquipmentDictionary();
	const tag = equipcodeDict[equipId].tag;
	const equipcodeIndex = await getEquipmentIndex();
	for (const key in equipcodeIndex) {
		if (equipcodeIndex[key] === tag) {
			return key;
		}
	}
	return '-1';
}

export async function tankIdFromGGid(id: string): Promise<string> {
	const index = await getTanksggIndex();
	return index[id];
}

export async function tankIdFromLink(link: string): Promise<string> {
	const tanksggName = link.split('tank/')[1].split('?')[0];
	const id = await tankIdFromGGid(tanksggName);
	return id;
}
