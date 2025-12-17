import { buildEquipmentDictionary, buildTangsGGIndex, buildTankDictionary, buildTanksggEquipmentIndex } from './buildingFuncs.ts';

const dict = await buildTankDictionary();
await buildTangsGGIndex(dict);
await buildEquipmentDictionary();
await buildTanksggEquipmentIndex();
