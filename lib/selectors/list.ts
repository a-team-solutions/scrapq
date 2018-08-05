import { Query, Selector, TypeOfQuery, TypeOfSelector, isSelector } from "../types";
import { ScrapQuery, ScrapSelector } from "../scrapper";

export type List<T extends object> = {
	// --- Internal ---
	type: "LIST";
	convert: Array<T>;
	// ---Additional---
	selector: string;
	data: Query | Selector;
};

export const listResolve = <Q extends object>(
	$: CheerioStatic,
	context: string,
	queryType: List<Q>,
	scrapQuery: ScrapQuery,
	ScrapSelector: ScrapSelector
) => {
	const result: any[] = [];
	const els = $(queryType.selector, context);
	for (let i = 0; i < els.length; i++) {
		const el = els.eq(i);
		const scrapedData = isSelector(queryType.data)
			 // TODO: Fix me, el should be string, not any!
			? ScrapSelector($, queryType.data as Selector, el as any)
			: scrapQuery($, el as any, queryType.data as Query, {});
		result.push(scrapedData);
	}
	return result;
};

/**
 * Get list of items
 * @param selector - css selector for list of items
 * @param data - query per item
 */
export const listCreator = <Q extends Query | Selector>(
	selector: string,
	data: Q
): List<Q extends Query
	? TypeOfQuery<Q>
	: Q extends Selector
		? TypeOfSelector<Q>
		: never
> => ({ type: "LIST", convert: [], selector, data });
