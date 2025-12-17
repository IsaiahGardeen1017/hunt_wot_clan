// deno-lint-ignore no-unversioned-import
import puppeteer from 'puppeteer';
import { getEquipmentDictionary } from '../../staticDataUtils.ts';
import { dir, table } from 'node:console';

const tempPath = 'src\\builtData\\testing\\temp.json';
const finalPath = 'src\\builtData\\testing\\tempF.json';

let potentialDictionary: Record<string, string> = {};

const codedIdsL = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',

	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',

	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',

	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'1A',
	'1B',
	'1C',
	'1D',
	'1E',
	'1F',
	'1G',
	'1H',
	'1I',
	'1J',
	'1K',
	'1L',
	'1M',
	'1N',
	'1O',
];

let totalErrors: string[] = [];

await driver(codedIdsL);

async function driver(arrToUse: string[]) {
	const preExistingConditions = JSON.parse(await Deno.readTextFileSync(tempPath));
	potentialDictionary = preExistingConditions;
	for (let i = 0; i < arrToUse.length; i++) {
		if (!preExistingConditions[arrToUse[i]]) {
			console.log(
				`CHECKING ${arrToUse[i]} (${i} out of ${arrToUse.length}) ${arrToUse[i]} ${arrToUse[i]} ${arrToUse[i]} ${arrToUse[i]}`,
			);
			await delay(1000);
			const html = await callUrl(`https://tanks.gg/tank/is-7?e=${arrToUse[i]}.-1.-1`);
			await delay(1000);
			await checkForHits(html, arrToUse[i]);
			await Deno.writeTextFileSync(tempPath + '.' + Date.now() + '.json', JSON.stringify(potentialDictionary));
			await delay(1000);
		}
	}
	console.log(potentialDictionary);
	try {
		await Deno.removeSync(tempPath);
	} catch (err) {}
	await Deno.writeTextFileSync(tempPath, JSON.stringify(potentialDictionary));
	console.log(totalErrors);
}

async function checkForHits(html: string, code: string) {
	const equip = await getEquipmentDictionary();
	for (const id in equip) {
		const e = equip[id];
		const tag = e.tag;
		const imageName = e.image?.split('/').at(-1);
		if (imageName) {
			if (html.includes(imageName)) {
				if (tag) {
					potentialDictionary[code] = tag;
				}
			}
		}
	}
}
/**
 * Calls a URL using Puppeteer and returns the page's HTML content.
 * It retries up to 5 times on failure, launching a fresh browser for each attempt.
 * This function prioritizes working over efficiency and is suitable for one-time scripts.
 *
 * @param url The URL to navigate to.
 * @returns The HTML content of the page as a string.
 * @throws An Error if the URL cannot be scraped after 5 retries.
 */
async function callUrl(url: string): Promise<string> { // The return type should be Promise<string>
	const MAX_RETRIES = 5;
	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		let browser: puppeteer.Browser | undefined;
		let page: puppeteer.Page | undefined;

		try {
			console.log(`Attempt ${attempt + 1}/${MAX_RETRIES + 1} for URL: ${url}`);

			// Launch a fresh browser for each attempt for maximum isolation and robustness
			browser = await puppeteer.launch();
			page = await browser.newPage();

			// Set a generous timeout for navigation
			await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }); // 60 seconds timeout

			const htmlContent = await page.content();

			// Success! Close everything and return
			await page.close();
			await browser.close();
			return htmlContent;
		} catch (error) {
			console.warn(`Error on attempt ${attempt + 1} for ${url}:`, (error as Error).message);

			// Ensure page and browser are closed even on error
			if (page) {
				try {
					await page.close();
				} catch (e) {
					console.warn(`Error closing page on attempt ${attempt + 1}:`, (e as Error).message);
				}
			}
			if (browser) {
				try {
					await browser.close();
				} catch (e) {
					console.warn(`Error closing browser on attempt ${attempt + 1}:`, (e as Error).message);
				}
			}

			if (attempt < MAX_RETRIES) {
				console.log(`Retrying ${url} in 3 seconds...`);
				await delay(3000); // Wait before the next attempt
			} else {
				// If it's the last attempt and it failed, throw the error
				totalErrors.push(url);
				throw new Error(`Failed to scrape URL: ${url} after ${MAX_RETRIES + 1} attempts. Last error: ${(error as Error).message}`);
			}
		}
	}
	// This line should technically be unreachable if MAX_RETRIES is handled correctly
	// but included for type safety and extreme edge cases.
	throw new Error(`Unexpected failure for URL: ${url}`);
}

async function delay(ms: number): Promise<void> {
	return await new Promise((resolve) => setTimeout(resolve, ms));
}
