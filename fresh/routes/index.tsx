import { useSignal } from '@preact/signals';
import { Head } from 'fresh/runtime';
import { define } from '../utils.ts';
import Counter from '../islands/Counter.tsx';
import { fetchEquipmentMetaData, fetchVehicleDataBase, recordToList, TankData } from '../src/fetchWotData.ts';
import { TankEntry } from '../components/TankEntry.tsx';
import { getTankDictionary, subDictionary } from '../src/staticDataUtils.ts';
import { getRecommendedTankIds } from '../src/fetchSpreadsheetData.ts';

export default async function Index() {
	const recommendedTankIds = await getRecommendedTankIds();
	const tankDictionary = await getTankDictionary();

	return (
		<div class='px-4 py-8 mx-auto fresh-gradient min-h-screen'>
			<Head>
				<title>HUNT clan recomendations</title>
			</Head>
			<div>
				{recommendedTankIds.map((tankId) => {
					const tankData = tankDictionary[tankId];
					return <TankEntry tankData={tankData} key={tankData.tank_id} />;
				})}
			</div>
		</div>
	);
}
