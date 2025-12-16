import { getTanksggIndex } from './staticDataUtils.ts';

export function ggIdFromShortName(shortName: string): string{
    const lc = shortName.toLocaleLowerCase();
    const letters = lc.split('');
    const final = letters.map((char) => {
        if([' '].includes(char)){
            return '-';
        }else if(['ł', '.', '/','(',')'].includes(char)){
            return '';
        }else if(char === 'á'){
            return 'a';
        }else if(char === 'ö'){
            return 'o';
        }else{
            return char;
        }
    }).join('');
    return final;
}

export async function tankIdFromGGid(id: string): Promise<string>{
    const index = await getTanksggIndex();
    return index[id];
}

export async function tankIdFromLink(link: string): Promise<string>{
    const tanksggName = link.split('tank/')[1];
    const id = await tankIdFromGGid(tanksggName);
    return id;
}