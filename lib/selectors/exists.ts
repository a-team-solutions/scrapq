export type Exists = {
	// --- Internal ---
	type: "EXISTS",
	convert: boolean,
	// ---Additional---
	selector: string;
}

export const existsResolve = ($: CheerioStatic, context: string, queryType: Exists) => {
    // TODO: selector cannot be ""
    const el = $(queryType.selector, context);
    return el.length > 0 ? true : false;
}

