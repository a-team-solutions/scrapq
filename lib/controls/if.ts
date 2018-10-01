import { Query, Selector, TypeOf, isSelector } from "../types";
import { ScrapQuery, ScrapSelector } from "../scrapper";

export type If<
	T extends Query | Selector,
	F extends Query | Selector,
	TR,
	FR
> = {
	// --- Internal ---
	_type: "IF";
	callback: TR | FR;
	selector: string;
	// ---Additional---
	truthy: T;
	falsey: F;
	condition: (el: Cheerio) => boolean;
};

export const ifResolve = <
	T extends Query | Selector,
	F extends Query | Selector
>(
	$: CheerioStatic,
	context: Cheerio,
	queryType: If<T, F, TypeOf<T>, TypeOf<F>>,
	scrapQuery: ScrapQuery,
	ScrapSelector: ScrapSelector
) => {
	const el = $(queryType.selector, context);
	if (queryType.condition(el)) {
		return isSelector(queryType.truthy)
			? ScrapSelector($, $.root(), queryType.truthy)
			: scrapQuery($, $.root(), queryType.truthy as Query, {});
	} else {
		return isSelector(queryType.falsey)
			? ScrapSelector($, $.root(), queryType.falsey)
			: scrapQuery($, $.root(), queryType.falsey as Query, {});
	}
};

/**
 * Get list of items
 * @param selector - css selector for list of items
 * @param data - query per item
 */
export const ifCreator = <
	T extends Query | Selector,
	F extends Query | Selector
>(
	selector: string,
	condition: (el: Cheerio) => boolean,
	truthy: T,
	falsey: F
): If<T, F, TypeOf<T>, TypeOf<F>> => ({
	_type: "IF",
	selector,
	condition,
	truthy,
	falsey,
	callback: {} as any
});
