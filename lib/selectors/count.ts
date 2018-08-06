export type Count = {
    // --- Internal ---
	type: "COUNT";
	convert: number;
	// ---Additional---
	selector: string;
}

export const countResolve = (
    $: CheerioStatic,
    context: Cheerio,
    queryType: Count
) => {
    // TODO: cannot reference itself !
    const els = $(queryType.selector, context);
    return els.length;
}

/**
 * Count elements
 * @param selector - css selector
 */
export const countCreator = (selector: string): Count => ({
    type: "COUNT",
    selector,
    convert: 0
});
