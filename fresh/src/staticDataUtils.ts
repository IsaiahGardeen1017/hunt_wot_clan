import { DICT_PATH, EQUIP_INDEX_PATH, EQUIP_PATH, INDEX_PATH } from './build/buildingFuncs.ts';
import { EquipmentDataMap, TankDataMap } from './fetchWotData.ts';

let TankDictionary: TankDataMap;
let EquipDictionary: EquipmentDataMap;
let TanksggIndex: Record<string, string>;
let TanksggEquipInex: Record<string, string>;

export async function getTanksggIndex(): Promise<Record<string, string>> {
	if (TanksggIndex) {
		return TanksggIndex;
	} else {
		TanksggIndex = JSON.parse(await Deno.readTextFileSync(INDEX_PATH)) as Record<string, string>;
		return TanksggIndex;
	}
}

export async function getTankDictionary(): Promise<TankDataMap> {
	if (TankDictionary) {
		return TankDictionary;
	} else {
		TankDictionary = JSON.parse(await Deno.readTextFileSync(DICT_PATH)) as TankDataMap;
		return TankDictionary;
	}
}

export async function getEquipmentDictionary(): Promise<EquipmentDataMap> {
	if (EquipDictionary) {
		return EquipDictionary;
	} else {
		EquipDictionary = JSON.parse(await Deno.readTextFileSync(EQUIP_PATH)) as TankDataMap;
		return EquipDictionary;
	}
}

export async function getEquipmentIndex(): Promise<Record<string, string>> {
	if (TanksggEquipInex) {
		return TanksggEquipInex;
	} else {
		TanksggEquipInex = JSON.parse(await Deno.readTextFileSync(EQUIP_INDEX_PATH)) as Record<string, string>;
		return TanksggEquipInex;
	}
}

export function subDictionary<D = any>(parentDict: Record<string, D>, ids: string[]): Record<string, D> {
	const retDict: Record<string, D> = {};
	for (let i = 0; i < ids.length; i++) {
		retDict[ids[i]] = parentDict[ids[i]];
	}
	return retDict;
}
