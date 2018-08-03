export type Attr = {
	// --- Internal
	type: "ATTR";
	convert: string;
	// ---Additional
	attribute: string;
	selector: string;
};

export const attrResolve = (
	$: CheerioStatic,
	context: string,
	queryType: Attr
) => {
	if (queryType.selector === "") {
		// Get attribute from root element
		return $(context).attr(queryType.attribute);
	} else {
		const el = $(queryType.selector, context);
		return el.attr(queryType.attribute);
	}
};

/**
 * Get html attribute
 * @param selector - css selector
 * @param attribute - html attribute to scrap
 */
export const attrCreator = (selector: string, attribute: string): Attr => ({
	type: "ATTR",
	selector,
	convert: '',
	attribute
});
