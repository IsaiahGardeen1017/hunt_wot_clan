import { EquipmentLoadout } from '../src/fetchSpreadsheetData.ts';
import { EquipmentData, EquipmentDataMap, TankData } from '../src/fetchWotData.ts';
import { getEquipmentDictionary } from '../src/staticDataUtils.ts';

export type TankEntryProps = {
	tankData: TankData;
	loadouts: EquipmentLoadout[];
	equipDict: EquipmentDataMap;
};

export function TankEntry(props: TankEntryProps) {
	const tData = props.tankData;
	return (
		<div style={{ 
			padding: '16px', 
			margin: '12px 0', 
			border: '1px solid #ccc', 
			borderRadius: '8px' 
		}}>
			{tData.name}
			<img src={tData.images?.big_icon}></img>
			{props.loadouts.map((loadout, idx) => {
				return (
					<div key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginTop: '8px' }}>
						<a href={loadout.link} style={{ verticalAlign: 'top' }}>{loadout.description}</a>
						<div style={{ display: 'inline-flex', gap: '4px', marginLeft: '8px', alignItems: 'flex-start' }}>
							{loadout.equipIds.map((eqId, eqIdx) => {
								return <img key={eqIdx} src={props.equipDict[eqId].image} style={{ verticalAlign: 'top' }}></img>;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
