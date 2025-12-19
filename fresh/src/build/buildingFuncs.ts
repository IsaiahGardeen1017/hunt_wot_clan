import { fetchEquipmentMetaData, fetchVehicleDataBase, FieldModTreeData, getFieldModTree, TankDataMap } from '../fetchWotData.ts';
import { ggIdFromShortName } from '../tanksggMapper.ts';

export const INDEX_PATH = 'src\\builtData\\tanksGGidToTankId.json';
export const DICT_PATH = 'src\\builtData\\tankDictionary.json';
export const EQUIP_PATH = 'src\\builtData\\equipmentDictionary.json';
export const EQUIP_INDEX_PATH = 'src\\builtData\\equipmentIndex.json';
export const FM_TREE_PATH = 'src\\builtData\\fieldModTreePath.json';

export async function buildTangsGGIndex(dict: TankDataMap) {
	const index: Record<string, string> = {};
	for (const key in dict) {
		let td = dict[key];
		if (dict[key].short_name) {
			index[ggIdFromShortName(dict[key].short_name)] = key;
		}
	}
	try {
		await Deno.removeSync(INDEX_PATH);
	} catch (err) {}
	await Deno.writeTextFileSync(INDEX_PATH, JSON.stringify(index));
}

export async function buildTankDictionary(): Promise<TankDataMap> {
	const data = await fetchVehicleDataBase();
	try {
		await Deno.removeSync(DICT_PATH);
	} catch (err) {}
	await Deno.writeTextFileSync(DICT_PATH, JSON.stringify(data));
	return data;
}

export async function buildEquipmentDictionary() {
	const data = await fetchEquipmentMetaData();
	data['0'] = {
		provision_id: 0,
		type: 'optionalDevice',
		name: 'Nothing',
		tag: 'nothing',
	};
	for (const key in data) {
		let img = data[key].image;
		if (img?.includes('artefact/artefact')) {
			data[key].image = data[key].image?.replace('artefact/artefact', 'artefact');
		}
	}
	try {
		await Deno.removeSync(EQUIP_PATH);
	} catch (err) {}
	await Deno.writeTextFileSync(EQUIP_PATH, JSON.stringify(data));
	return data;
}

export async function buildTanksggEquipmentIndex() {
	const data = {
		'0': 'improvedVentilation_tier1',
		'1': 'improvedVentilation_tier1',
		'2': 'improvedVentilation_tier1',
		'3': 'deluxeImprovedRotationMechanism',
		'4': 'deluxeImprovedRotationMechanism',
		'5': 'enhancedAimDrives_tier1',
		'6': 'enhancedAimDrives_tier1',
		'7': 'enhancedAimDrives_tier1',
		'8': 'tankRammer_tier1',
		'9': 'tankRammer_tier1',
		'10': 'trophyUpgradedTurbocharger',
		'11': 'trophyUpgradedExtraHealthReserve',
		'12': 'trophyUpgradedImprovedConfiguration',
		'13': 'improvedVentilation_tier1',
		'14': 'tankRammer_tier1',
		'15': 'coatedOptics_tier1',
		'16': 'aimingStabilizer_tier1',
		'17': 'enhancedAimDrives_tier1',
		'18': 'trophyUpgradedTurbocharger',
		'19': 'trophyUpgradedExtraHealthReserve',
		'A': 'deluxeImprovedSights',
		'B': 'deluxeImprovedSights',
		'C': 'aimingStabilizer_tier1',
		'D': 'aimingStabilizer_tier1',
		'E': 'antifragmentationLining_tier1',
		'F': 'antifragmentationLining_tier1',
		'G': 'antifragmentationLining_tier1',
		'H': 'antifragmentationLining_tier1',
		'I': 'trophyUpgradedExtraHealthReserve',
		'J': 'trophyUpgradedExtraHealthReserve',
		'K': 'trophyUpgradedExtraHealthReserve',
		'L': 'trophyUpgradedImprovedConfiguration',
		'M': 'trophyUpgradedImprovedConfiguration',
		'N': 'grousers_tier1',
		'O': 'grousers_tier1',
		'P': 'grousers_tier1',
		'Q': 'trophyUpgradedTurbocharger',
		'R': 'trophyUpgradedTurbocharger',
		'S': 'trophyUpgradedTurbocharger',
		'T': 'camouflageNet_tier2',
		'U': 'camouflageNet_tier2',
		'V': 'stereoscope_tier1',
		'W': 'stereoscope_tier1',
		'X': 'stereoscope_tier1',
		'Y': 'coatedOptics_tier1',
		'Z': 'coatedOptics_tier1',
		'a': 'coatedOptics_tier1',
		'b': 'commandersView',
		'c': 'improvedRadioCommunication',
		'd': 'deluxeAdditionalInvisibilityDevice',
		'e': 'deluxeAdditionalInvisibilityDevice',
		'f': 'deluxeAdditionalInvisibilityDevice',
		'g': 'enhancedAimDrives_tier1',
		'h': 'tankRammer_tier1',
		'i': 'improvedVentilation_tier1',
		'j': 'aimingStabilizer_tier1',
		'k': 'coatedOptics_tier1',
		'l': 'trophyUpgradedImprovedConfiguration',
		'm': 'deluxeImprovedRotationMechanism',
		'n': 'deluxeImprovedSights',
		'o': 'deluxeAdditionalInvisibilityDevice',
		'p': 'trophyUpgradedTurbocharger',
		'q': 'trophyUpgradedExtraHealthReserve',
		'r': 'enhancedAimDrives_tier1',
		's': 'tankRammer_tier1',
		't': 'improvedVentilation_tier1',
		'u': 'aimingStabilizer_tier1',
		'v': 'coatedOptics_tier1',
		'w': 'trophyUpgradedImprovedConfiguration',
		'x': 'deluxeImprovedRotationMechanism',
		'y': 'deluxeImprovedSights',
		'z': 'deluxeAdditionalInvisibilityDevice',
		'1A': 'deluxeImprovedRotationMechanism',
		'1B': 'deluxeImprovedSights',
		'1C': 'deluxeAdditionalInvisibilityDevice',
		'1D': 'modernizedAimDrivesAimingStabilizer3',
		'1E': 'modernizedTurbochargerRotationMechanism3',
		'1F': 'modernizedExtraHealthReserveAntifragmentationLining3',
		'1G': 'modernizedImprovedSightsEnhancedAimDrives3',
		'1H': 'modernizedAimDrivesAimingStabilizer3',
		'1I': 'modernizedTurbochargerRotationMechanism3',
		'1J': 'modernizedExtraHealthReserveAntifragmentationLining3',
		'1K': 'modernizedImprovedSightsEnhancedAimDrives3',
		'1L': 'modernizedAimDrivesAimingStabilizer3',
		'1M': 'modernizedTurbochargerRotationMechanism3',
		'1N': 'modernizedExtraHealthReserveAntifragmentationLining3',
		'1O': 'modernizedImprovedSightsEnhancedAimDrives3',
	};
	try {
		await Deno.removeSync(EQUIP_INDEX_PATH);
	} catch (err) {}
	await Deno.writeTextFileSync(EQUIP_INDEX_PATH, JSON.stringify(data));
}

export async function buildFieldModDatabase(dict: TankDataMap): Promise<Record<string, FieldModTreeData>> {
	let fieldModTrees = [];
	for (const tankId in dict) {
		fieldModTrees.push(dict[tankId].fieldModTree);
	}
	let fieldModDictionary: Record<string, FieldModTreeData> = {};
	for (let i = 0; i < fieldModTrees.length; i++) {
		let id = fieldModTrees[i];
		if (id) {
			const fmTree = await getFieldModTree(id);
			fieldModDictionary[id] = fmTree;
		}
	}
	try {
		await Deno.removeSync(FM_TREE_PATH);
	} catch (err) {}
	await Deno.writeTextFileSync(FM_TREE_PATH, JSON.stringify(fieldModDictionary));

	return fieldModDictionary;
}
