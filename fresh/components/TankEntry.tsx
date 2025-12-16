import { EquipmentDataMap, TankData } from '../src/fetchData.ts';

export type TankEntryProps = {
	tankData: TankData;
	equipmentData: EquipmentDataMap;
};

export function TankEntry(props: TankEntryProps) {
	const tData = props.tankData;

	return (
		<div>
			<img src={tData.images?.big_icon}></img>
			{tData.provisions?.join('|')}
			<img src={tData.images?.contour_icon}></img>
			{tData.provisions?.map((provid) => {
				return (
					<div>
						{props.equipmentData['' + provid].name}
						{props.equipmentData['' + provid].provision_id}
						<img src={props.equipmentData['' + provid].image}></img>
					</div>
				);
			})}
			{tData.name} {tData.short_name} {}
			<img src={tData.images?.small_icon}></img>
		</div>
	);
}
