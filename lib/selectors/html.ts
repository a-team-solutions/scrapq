export type Html<F extends (html: string) => any> = {
	// --- Internal ---
	_type: "HTML";
	callback: F;
	// ---Additional---
	selector: string;
};

export const htmlResolve = (
	$: CheerioStatic,
	context: Cheerio,
	queryType: Html<any>
) => {
	if (queryType.selector === "") {
		// Get html from root element
		const html = $(context).html();
		return queryType.callback(html);
	} else {
		const el = $(queryType.selector, context)
		const html = el.html();
		return 	queryType.callback(html);
	}
};

/**
 * Get html content
 * @param selector - css selector
 */
export function htmlCreator(selector: string, callback?: undefined): Html<() => string>;
export function htmlCreator<F extends (html: string) => any>(selector: string, callback: F): Html<F>;
export function htmlCreator<F extends (html: string) => any>(selector: string, callback?: undefined | F) {
	return {
		_type: "HTML",
		selector,
		callback: callback ? callback : (html: string) => html
	}
}
