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
