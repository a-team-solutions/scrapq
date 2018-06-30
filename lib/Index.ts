import { load } from "cheerio";

type QueryData = {
	[property: string]: Text | Attr | Html | List<any>;
};

type Text = {
	// --- Internal ---
	type: "TEXT";
	result: string;
	// ---Additional---
	selector: string;
};

type Attr = {
	type: "ATTR";
	result: string;

	attribute: string;
	selector: string;
};

type List<T extends object> = {
	// --- Internal ---
	type: "LIST";
	result: Array<T>;
	// ---Additional---
	selector: string;
	data: QueryData;
};

type Html = {
	// --- Internal ---
	type: "HTML";
	result: string;
	// ---Additional---
	selector: string;
};

type Query = QueryData;

type GetTypeFromQuery<Q extends QueryData> = { [P in keyof Q]: Q[P]["result"] };

const scrapObject = <Q extends QueryData>(
	$: CheerioStatic,
	context: string,
	queryData: Q,
	ref: any // object
): GetTypeFromQuery<Q> => {
	Object.entries(queryData).forEach(([prop, val]) => {
		switch (val.type) {
			case "TEXT": {
				if (val.selector === "") {
					// Get text from root item
					ref[prop] = $(context).text();
				} else {
					const el = $(val.selector, context);
					ref[prop] = el.text();
				}
				break;
			}
			case "ATTR": {
                if (val.selector === "") {
                    ref[prop] = $(context).attr(val.attribute);
                } else {
                    const el = $(val.selector, context);
                    ref[prop] = el.attr(val.attribute);
                }
				break;
            }
            case 'HTML': {
                if (val.selector === "") {
                    ref[prop] = $(context).html();
                } else {
                    const el = $(val.selector, context);
                    ref[prop] = el.html();
                }
                break;
            }
			case "LIST": {
				const result: GetTypeFromQuery<typeof val.data>[] = [];
				const els = $(val.selector);
				for (let i = 0; i < els.length; i++) {
					const el = els.eq(i);
					const scrapedData = scrapObject($, el as any, val.data, {});
					result.push(scrapedData);
				}
				ref[prop] = result;
				break;
			}
			default: {
				throw new Error(`Unexpected property type '${val}'`);
			}
		}
	});
	return ref as GetTypeFromQuery<Q>;
};

export const scrap = <Q extends Query>(
	html: string,
	query: Q
): GetTypeFromQuery<Q> => {
	const $ = load(html);
	const result = scrapObject($, "", query, {});
	return result as GetTypeFromQuery<Q>;
};

export const Q = {
	/**
     * Get inner text
	 * @param selector - css selector
	 */
	text: (selector: string): Text => ({ type: "TEXT", selector, result: "" }),

	/**
     * Get html attribute
	 * @param selector - css selector
	 * @param attribute - html attribute to scrap
	 */
	attr: (selector: string, attribute: string): Attr => ({
		type: "ATTR",
		selector,
		result: "",
		attribute
    }),
    
    /**
     * Get html content
     * @param selector - css selector
     */
    html: (selector: string): Html => ({
        type: 'HTML',
        selector,
        result: ""
    }),

	/**
     * Get list of items
	 * @param selector - css selector for list of items
	 * @param data - query per item
	 */
	list: <Q extends QueryData>(
		selector: string,
		data: Q
	): List<GetTypeFromQuery<Q>> => ({ type: "LIST", result: [], selector, data })
};
