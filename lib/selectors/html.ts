export type Html = {
	// --- Internal ---
	type: "HTML";
	convert: string;
	// ---Additional---
	selector: string;
};

export const htmlResolve = (
	$: CheerioStatic,
	context: Cheerio,
	queryType: Html
) => {
	if (queryType.selector === "") {
		// Get html from root element
		return $(context).html();
	} else {
		const el = $(queryType.selector, context);
		return el.html();
	}
};

/**
 * Get html content
 * @param selector - css selector
 */
export const htmlCreator = (selector: string): Html => ({
	type: "HTML",
	selector,
	convert: "string"
});
