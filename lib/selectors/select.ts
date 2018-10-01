export type Select<F extends (el: Cheerio) => any> = {
	// --- Internal ---
	_type: "SELECT";
	callback: F;
	// ---Additional---
	selector: string;
};

export const selectResolve = <C extends (el: Cheerio) => any>(
	$: CheerioStatic,
	context: Cheerio,
	queryType: Select<C>
) => {
	if (queryType.selector === "") {
		return queryType.callback($(context));
	} else {
		const el = $(queryType.selector, context);
		return queryType.callback(el);
	}
};

/**
 * Create custom selector
 * @param selector - css selector
 * @param callback - callback with cheerio element
 */
export function selectCreator<F extends (el: Cheerio) => any>(
	selector: string,
	callback: F
): Select<F> {
	return {
		_type: "SELECT",
		callback: callback ? callback : (el: Cheerio) => el,
		selector
	} as Select<F>;
}
