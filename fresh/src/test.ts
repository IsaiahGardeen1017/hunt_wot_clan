import { EquipmentData } from './fetchWotData.ts';
import { getEquipmentDictionary, getEquipmentIndex } from './staticDataUtils.ts';
import { mapEquipmentIdToUrlCode, mapUrlCodeToEquipmentId } from './tanksggMapper.ts';

const tggindex = await getEquipmentIndex();
const equipDiction = await getEquipmentDictionary();

for (const key in tggindex) {
	const val = tggindex[key];

	let found: EquipmentData = {};
	for (const k in equipDiction) {
		const v = equipDiction[k];
		if (v.tag === val) {
			found = v;
		}
	}
}

const testIds = [
	'-1',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',

	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',

	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'1A',
	'1B',
	'1C',
	'1D',
	'1E',
	'1F',
	'1G',
	'1H',
	'1I',
	'1J',
	'1K',
	'1L',
	'1M',
	'1N',
	'1O',
];

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

let success = 0;
let fails = 0;
for (let i = 0; i < 100; i++) {
	const url = `https://tanks.gg/tank/121?e=${rArray(testIds)}.${rArray(testIds)}.${rArray(testIds)}`;
	const equipments = await urlToEquipmentList(url);
	const eParts = await Promise.all(equipments.map(async (equip) => {
		const code = await mapEquipmentIdToUrlCode(equip.provision_id || 0);
		return code;
	}));
	const rebuiltUrl = `https://tanks.gg/tank/121?e=${eParts.join('.')}`;

	if (url !== rebuiltUrl) {
		fails++;
		console.log('FAIL: ');
		console.log(`   ${url}`);
		console.log(`   ${rebuiltUrl}`);
	} else {
		success++;
	}
}
console.log(`wins: ${success} | fails: ${fails}`);

function rArray(arr: string[]) {
	// Generate a random index within the bounds of the array length
	const randomIndex = Math.floor(Math.random() * arr.length);

	// Return the item at the random index
	return arr[randomIndex];
}
