import { EquipmentLoadout } from '../src/fetchSpreadsheetData.ts';
import { EquipmentData, EquipmentDataMap, getTankDataFromTanksGG, TankData } from '../src/fetchWotData.ts';
import { getEquipmentDictionary } from '../src/staticDataUtils.ts';
import { LoadoutEntry } from './LoadoutEntry.tsx';

export type TankEntryProps = {
	tankData: TankData;
	loadouts: EquipmentLoadout[];
	equipDict: EquipmentDataMap;
};

export function TankEntry(props: TankEntryProps) {
	const tData = props.tankData;
	return (
		<div
			style={{
				padding: '16px',
				margin: '12px 0',
				border: '1px solid #ccc',
				borderRadius: '8px',
			}}
		>
			{tData.name}
			<img src={tData.images?.big_icon}></img>
			{props.loadouts.map((loadout, idx) => {
				return (
					<LoadoutEntry
						tankData={props.tankData}
						loadout={loadout}
						equipDict={props.equipDict}
						key={props.tankData.tank_id + '' + idx}
					/>
				);
			})}
		</div>
	);
}
