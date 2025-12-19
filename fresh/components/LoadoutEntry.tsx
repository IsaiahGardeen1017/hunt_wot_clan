import { EquipmentLoadout } from '../src/fetchSpreadsheetData.ts';
import { EquipmentData, EquipmentDataMap, TankData } from '../src/fetchWotData.ts';

export type LoadoutProps = {
	tankData: TankData;
	loadout: EquipmentLoadout;
	equipDict: EquipmentDataMap;
};

export function LoadoutEntry(props: LoadoutProps) {
	const loadout = props.loadout;
	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '8px' }}>
				<a href={loadout.link} style={{ verticalAlign: 'top' }}>{loadout.description}</a>

				<div style={{ display: 'inline-flex', gap: '4px', marginLeft: '8px', alignItems: 'flex-start' }}>
					{loadout.equipIds.map((eqId, eqIdx) => {
						return <img key={eqIdx} src={props.equipDict[eqId].image} style={{ verticalAlign: 'top' }}></img>;
					})}
				</div>
			</div>
		</div>
	);
}
