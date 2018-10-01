export type Count<F extends (count: number) => any> = {
	// --- Internal ---
	_type: "COUNT";
	callback: F;
	// ---Additional---
	selector: string;
};

export const countResolve = (
	$: CheerioStatic,
	context: Cheerio,
	queryType: Count<any>
) => {
	// TODO: if element doenst exists, return 0
	// TODO: cannot reference itself !
	const els = $(queryType.selector, context);
	const count = els.length;
	return queryType.callback(count);
};

/**
 * Count elements
 * @param selector - css selector
 */
export function countCreator(
	selector: string,
	callback?: undefined
): Count<() => number>;
export function countCreator<F extends (count: number) => any>(
	selector: string,
	callback: F
): Count<F>;
export function countCreator<F extends (count: number) => any>(
	selector: string,
	callback?: undefined | F
) {
	return {
		_type: "COUNT",
		selector,
		callback: callback ? callback : (count: number) => count
	} as Count<any>;
}
