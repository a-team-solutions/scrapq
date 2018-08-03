export type Text = {
	// --- Internal ---
	type: "TEXT";
	convert: string;
	// ---Additional---
	selector: string;
};

export const textResolve = (
	$: CheerioStatic,
	context: string,
	queryType: Text
) => {
	if (queryType.selector === "") {
		// Get text from root element
		return $(context).text();
	} else {
		const el = $(queryType.selector, context);
		return el.text();
	}
};

/**
 * Get inner text
 * @param selector - css selector
 */
export const  textCreator = (selector: string): Text => ({
	type: "TEXT",
	selector,
	convert: ''
});
