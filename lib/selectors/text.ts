export type Text<F extends (text: string) => any> = {
	// --- Internal ---
	_type: "TEXT";
	callback: F;
	// ---Additional---
	selector: string;
};

export const textResolve = (
	$: CheerioStatic,
	context: Cheerio,
	queryType: Text<any>
) => {
	if (queryType.selector === "") {
		// Get text from root element
		const text = $(context).text();
		return queryType.callback(text);
	} else {
		const el = $(queryType.selector, context);
		const text = el.text();
		return queryType.callback(text);
	}
};

/**
 * Get inner text
 * @param selector - css selector
 */
export function textCreator(
	selector: string,
	callback?: undefined
): Text<() => string>;
export function textCreator<F extends (text: string) => any>(
	selector: string,
	callback: F
): Text<F>;
export function textCreator<F extends (text: string) => any>(
	selector: string,
	callback?: undefined | F
) {
	return {
		_type: "TEXT",
		selector,
		callback: callback ? callback : (text: string) => text
	} as Text<any>;
}
