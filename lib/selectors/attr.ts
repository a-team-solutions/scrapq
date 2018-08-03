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
