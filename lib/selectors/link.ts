export type Link<F extends (link: string) => any> = {
	// --- Internal ---
	_type: "LINK";
	callback: F;
	// ---Additional---
	selector: string;
};

export const linkResolve = (
	$: CheerioStatic,
	context: Cheerio,
	queryType: Link<any>
) => {
	if (queryType.selector === "") {
		// Get link from root element
		const link = $(context).attr("href");
		return queryType.callback(link);
	} else {
		const el = $(queryType.selector, context);
		const link = el.attr("href");
		return queryType.callback(link);
	}
};

/**
 * Get link from `href` attribute
 * @param selector - css selector
 */
export function linkCreator(selector: string, callback?: undefined): Link<() => string>;
export function linkCreator<F extends (link: string) => any>(selector: string, callback: F): Link<F>;
export function linkCreator<F extends (link: string) => any>(selector: string, callback?: undefined | F) {
	return {
		_type: "LINK",
		selector,
		callback: callback ? callback : (link: string) => link
	} as Link<any>;
}
