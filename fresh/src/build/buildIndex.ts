import { TankDataMap, fetchVehicleDataBase } from '../fetchWotData.ts';
import { ggIdFromShortName } from '../tanksggMapper.ts';


export const INDEX_PATH = 'src\\builtData\\tanksGGidToTankId.json';
export const DICT_PATH = 'src\\builtData\\tankDictionary.json';

const dict = await buildTankDictionary();
await buildTangsGGIndex(dict);

async function buildTangsGGIndex(dict: TankDataMap) {
    const index: Record<string, string> = {};
    for (const key in dict) {
        let td = dict[key];
        if(dict[key].short_name){
            index[ggIdFromShortName(dict[key].short_name)] = key;
        }
    }
    try {
        await Deno.removeSync(INDEX_PATH);
    } catch (err) { }
    await Deno.writeTextFileSync(INDEX_PATH, JSON.stringify(index));
}

async function buildTankDictionary(): Promise<TankDataMap> {
    const data = await fetchVehicleDataBase();
    try {
        await Deno.removeSync(DICT_PATH);
    } catch (err) { }
    await Deno.writeTextFileSync(DICT_PATH, JSON.stringify(data));
    return data;
}