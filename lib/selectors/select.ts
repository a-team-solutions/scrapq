export type Select<C extends (el: Cheerio) => any> = {
	// --- Internal ---
	type: "SELECT";
	convert: C;
	// ---Additional---
	selector: string;
};

export const selectResolve = <C extends (el: Cheerio) => any>(
	$: CheerioStatic,
	context: string,
	queryType: Select<any>
) => {
	if (queryType.selector === "") {
		return queryType.convert($(context));
	} else {
		const el = $(queryType.selector, context);
		return queryType.convert(el);
	}
};

export const selectCreator = <C extends (el: Cheerio) => any>(selector: string, convert: C): Select<C> => ({
	type: "SELECT",
	convert: convert,
	selector: selector
});
