import { useSignal } from '@preact/signals';
import { Head } from 'fresh/runtime';
import { define } from '../utils.ts';
import Counter from '../islands/Counter.tsx';
import { fetchEquipmentMetaData, fetchVehicleDataBase, recordToList, TankData } from '../src/fetchData.ts';
import { TankEntry } from '../components/TankEntry.tsx';

export default async function Index() {
	const tankDatalist = recordToList<TankData>(await fetchVehicleDataBase());
	const equipmentData = await fetchEquipmentMetaData();
	console.log(equipmentData);
	return (
		<div class='px-4 py-8 mx-auto fresh-gradient min-h-screen'>
			<Head>
				<title>HUNT clan recomendations</title>
			</Head>
			<div>
				{tankDatalist.map((tankData) => {
					return <TankEntry tankData={tankData} equipmentData={equipmentData} key={tankData.tank_id} />;
				})}
			</div>
		</div>
	);
}
