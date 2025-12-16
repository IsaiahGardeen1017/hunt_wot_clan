import { TankData } from '../src/fetchData.ts';

export type TankEntryProps = {
	tankData: TankData;
};

export function TankEntry(props: TankEntryProps) {
	const tData = props.tankData;

	return (
		<div>
			{tData.name}
		</div>
	);
}
