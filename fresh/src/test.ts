import { queryString } from './fetchData.ts';

console.log(await getaData());

const BASE_URL = 'https://api.worldoftanks.com/wot';
async function getaData(): Promise<any> {
	const queries = {
		application_id: 'd75690e34140cb77b975b505fdb03a2f',
		fields: 'name,short_name,tag,tank_id,tier,type,images,nation',
		tier: '10',
		nation: 'usa',
	};
	const reqUrl = `${BASE_URL}/encyclopedia/vehicles/${queryString(queries)}`;
	console.log(reqUrl);
	console.log(
		'https://api.worldoftanks.com/wot/encyclopedia/vehicles/?application_id=d75690e34140cb77b975b505fdb03a2f&fields=name%2Cshort_name%2Ctag%2Ctank_id%2Ctier%2Ctype%2Cimages&tier=10',
	);
	const response = await fetch(reqUrl, { method: 'GET' });

	const body = await response.json();
	return body.data;
}
