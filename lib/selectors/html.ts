export type Html = {
	// --- Internal ---
	type: "HTML";
	convert: string;
	// ---Additional---
	selector: string;
};

export const htmlResolve = (
	$: CheerioStatic,
	context: string,
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
