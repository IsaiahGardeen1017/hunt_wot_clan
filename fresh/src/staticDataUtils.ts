import { DICT_PATH, EQUIP_INDEX_PATH, EQUIP_PATH, INDEX_PATH } from './build/buildingFuncs.ts';
import { EquipmentDataMap, TankDataMap } from './fetchWotData.ts';

import TankDictionary from '../src/builtData/tankDictionary.json' with { type: 'json' };
import EquipDictionary from '../src/builtData/equipmentDictionary.json' with { type: 'json' };
import TanksggIndex from '../src/builtData/tanksGGidToTankId.json' with { type: 'json' };
import TanksggEquipInex from '../src/builtData/equipmentIndex.json' with { type: 'json' };

export function getTanksggIndex(): Record<string, string> {
	return TanksggIndex;
}

export function getTankDictionary(): TankDataMap {
	return TankDictionary;
}

export function getEquipmentDictionary(): EquipmentDataMap {
	return EquipDictionary;
}

export function getEquipmentIndex(): Record<string, string> {
	return TanksggEquipInex;
}
