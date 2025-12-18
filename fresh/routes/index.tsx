import { Head } from 'fresh/runtime';
import { TankEntry } from '../components/TankEntry.tsx';
import { getEquipmentDictionary, getTankDictionary } from '../src/staticDataUtils.ts';
import { EquipmentLoadout, getLoadouts, getRecommendedTankIds } from '../src/fetchSpreadsheetData.ts';

export default async function Index() {
	return (
		<div class='px-4 py-8 mx-auto hunt-gradient min-h-screen'>
			<Head>
				<title>HUNT</title>
			</Head>
			<div>
				<a href="/tanks">Recommended Tanks</a>
			</div>
		</div>
	);
}
