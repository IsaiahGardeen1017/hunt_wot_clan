import { DICT_PATH, INDEX_PATH } from './build/buildIndex.ts';
import { TankDataMap } from './fetchWotData.ts';

let TankDictionary: TankDataMap;
let TanksggIndex: Record<string, string>

export async function getTanksggIndex(): Promise<Record<string, string>>{
    if(TanksggIndex){
        return TanksggIndex;
    }else{
        TanksggIndex = JSON.parse(await Deno.readTextFileSync(INDEX_PATH)) as Record<string, string>;
        return TanksggIndex;
    }
}

export async function getTankDictionary(): Promise<TankDataMap>{
    if(TankDictionary){
        return TankDictionary;
    }else{
        TankDictionary = JSON.parse(await Deno.readTextFileSync(DICT_PATH)) as TankDataMap;
        return TankDictionary;
    }
}

export function subDictionary<D = any>(parentDict: Record<string, D>, ids: string[]): Record<string, D>{
    const retDict: Record<string, D> = {};
    for(let i = 0; i < ids.length; i++){
        retDict[ids[i]] = parentDict[ids[i]];
    }
    return retDict;
}