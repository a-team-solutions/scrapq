export type Exists<F extends (exists: boolean) => any> = {
	// --- Internal ---
	_type: "EXISTS";
	callback: F;
	// ---Additional---
	selector: string;
};

export const existsResolve = (
	$: CheerioStatic,
	context: Cheerio,
	queryType: Exists<any>
) => {
	// TODO: selector cannot be ""
	const el = $(queryType.selector, context);
	const result = el.length > 0 ? true : false;
	return queryType.callback(result);
};

/**
 * Check if element exists
 * @param selector - css selector
 */
export function existsCreator(
	selector: string,
	callback?: undefined
): Exists<() => boolean>;
export function existsCreator<F extends (exists: boolean) => any>(
	selector: string,
	callback: F
): Exists<F>;
export function existsCreator<F extends (exists: boolean) => any>(
	selector: string,
	callback?: undefined | F
) {
	return {
		_type: "EXISTS",
		selector,
		callback: callback ? callback : (exists: boolean) => exists
	} as Exists<any>;
}
