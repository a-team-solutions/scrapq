export type Link = {
	// --- Internal ---
	type: "LINK";
	convert: string;
	// ---Additional---
	selector: string;
};

export const linkResolve = (
	$: CheerioStatic,
	context: string,
	queryType: Link
) => {
	if (queryType.selector === "") {
		// Get link from root element
		return $(context).attr('href');
	} else {
		const el = $(queryType.selector, context);
		return el.attr('href');
	}
};

/**
 * Get link from `href` attribute
 * @param selector - css selector
 */
export const  linkCreator = (selector: string): Link => ({
	type: "LINK",
	selector,
	convert: ''
});
