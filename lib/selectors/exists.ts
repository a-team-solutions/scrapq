export type Exists = {
	// --- Internal ---
	type: "EXISTS";
	convert: boolean;
	// ---Additional---
	selector: string;
};

export const existsResolve = (
	$: CheerioStatic,
	context: string,
	queryType: Exists
) => {
	// TODO: selector cannot be ""
	const el = $(queryType.selector, context);
	return el.length > 0 ? true : false;
};

/**
 * Check if element exists
 * @param selector - css selector
 */
export const existsCreator = (selector: string): Exists => ({
	type: "EXISTS",
	selector,
	convert: true
});
