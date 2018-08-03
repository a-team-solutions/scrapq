import { Query, Selector, TypeOfQuery, TypeOfSelector, TypeOf } from "../types";
import { ScrapQuery, ScrapSelector } from "../scrapper";

export type If<T extends Query | Selector, F extends Query | Selector> = {
	// --- Internal ---
	type: "IF";
	convert: TypeOf<T> | TypeOf<F>;
	selector: string;
    // ---Additional---
    truthy: T,
    falsey: F,
    condition: (el: Cheerio) => boolean;
};

export const ifResolve = <T extends Query | Selector, F extends Query | Selector>(
	$: CheerioStatic,
	context: string,
	queryType: If<T, F>,
	scrapQuery: ScrapQuery,
	ScrapSelector: ScrapSelector
) => {
    const el = $(queryType.selector, context);
    if (queryType.condition(el)) {
        if (!queryType.truthy.type) {
            return scrapQuery($, el as any, queryType.truthy as Query, {});
        } else {
            return ScrapSelector($, queryType.truthy as Selector, el as any);
        }
    } else {
        if (!queryType.falsey.type) {
            return scrapQuery($, el as any, queryType.falsey as Query, {})
        } else {
            return ScrapSelector($, queryType.falsey as Selector, el as any);
        }
    }
};

/**
 * Get list of items
 * @param selector - css selector for list of items
 * @param data - query per item
 */
export const ifCreator = <T extends Query | Selector, F extends Query | Selector>(
	selector: string,
    condition: (el: Cheerio) => boolean,
    truthy: T,
    falsey: F
): If<T, F> => ({
    type: "IF",
    selector,
    condition,
    truthy,
    falsey,
    convert: {} as any
});
