import { EquipmentDataMap, TankData } from '../src/fetchWotData.ts';

export type TankEntryProps = {
	tankData: TankData;
};

export function TankEntry(props: TankEntryProps) {
	const tData = props.tankData;

	return (
		<div>
			{tData.name}
			<img src={tData.images?.big_icon}></img>
		</div>
	);
}
