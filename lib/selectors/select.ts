export type Select<C extends (el: Cheerio) => any> = {
	// --- Internal ---
	type: "SELECT";
	convert: C;
	// ---Additional---
	selector: string;
};

export const selectResolve = <C extends (el: Cheerio) => any>(
	$: CheerioStatic,
	context: Cheerio,
	queryType: Select<any>
) => {
	if (queryType.selector === "") {
		return queryType.convert($(context));
	} else {
		const el = $(queryType.selector, context);
		return queryType.convert(el);
	}
};

/**
 * Create custom selector
 * @param selector - css selector
 * @param callback - callback with cheerio element
 */
export const selectCreator = <C extends (el: Cheerio) => any>(selector: string, callback: C): Select<C> => ({
	type: "SELECT",
	convert: callback,
	selector: selector
});
