import { Head } from 'fresh/runtime';
import { TankEntry } from '../components/TankEntry.tsx';
import { getEquipmentDictionary, getTankDictionary } from '../src/staticDataUtils.ts';
import { EquipmentLoadout, getLoadouts, getRecommendedTankIds } from '../src/fetchSpreadsheetData.ts';

export default async function Index() {
	const recommendedTankIds = await getRecommendedTankIds();
	const tankDictionary = await getTankDictionary();
	const allLoadouts = await getLoadouts();
	const equipDict = await getEquipmentDictionary();

	return (
		<div class='px-4 py-8 mx-auto fresh-gradient min-h-screen'>
			<Head>
				<title>HUNT</title>
			</Head>
			<div>
				{recommendedTankIds.map((tankId) => {
					const tankData = tankDictionary[tankId];
					const loadouts: EquipmentLoadout[] = [];
					for (let i = 0; i < allLoadouts.length; i++) {
						if (allLoadouts[i].tankId === tankId) {
							loadouts.push(allLoadouts[i]);
						}
					}
					return <TankEntry tankData={tankData} key={tankData.tank_id} loadouts={loadouts} equipDict={equipDict} />;
				})}
			</div>
		</div>
	);
}
