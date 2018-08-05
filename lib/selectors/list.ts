import { Query, Selector, TypeOfQuery, TypeOfSelector, isSelector } from "../types";
import { ScrapQuery, ScrapSelector } from "../scrapper";

export type List<T extends object> = {
	// --- Internal ---
	type: "LIST";
	convert: Array<T>;
	// ---Additional---
	predicate?: (el: Cheerio, index: number) => boolean;
	selector: string;
	data: Query | Selector;
};

export const listResolve = <Q extends object>(
	$: CheerioStatic,
	context: Cheerio,
	queryType: List<Q>,
	scrapQuery: ScrapQuery,
	scrapSelector: ScrapSelector
) => {
	const result: any[] = [];
	const els = $(queryType.selector, context);
	for (let i = 0; i < els.length; i++) {
		const el = els.eq(i);
		if (queryType.predicate) {
			// If list has predicate, test every element
			if (queryType.predicate(el, i)) {
				const scrapedData = isSelector(queryType.data)
					? scrapSelector($, el, queryType.data)
					: scrapQuery($, el, queryType.data, {});
				result.push(scrapedData);
			}
		} else {
			const scrapedData = isSelector(queryType.data)
				? scrapSelector($, el, queryType.data)
				: scrapQuery($, el, queryType.data, {});
			result.push(scrapedData);
		}

	}
	return result;
};

/**
 * Get list of items
 * @param selector - css selector for list of items
 * @param data - query per item
 * @param predicate - filter elements
 */
export const listCreator = <Q extends Query | Selector>(
	selector: string,
	data: Q,
	predicate?: (el: Cheerio, index: number) => boolean
): List<Q extends Query
	? TypeOfQuery<Q>
	: Q extends Selector
		? TypeOfSelector<Q>
		: never
> => ({ type: "LIST", convert: [], selector, data, predicate });
