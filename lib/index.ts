import { load } from "cheerio";
import { Attr, Html, List, Text, QueryData, Exists, If, QueryType } from "./type";

type Query = QueryData;

type GetTypeFromQueryType<Q extends QueryType> = Q["convert"] extends (data: string) => infer R
	? R
	: Q["convert"]

type GetTypeFromQuery<Q extends QueryData> = {
	[P in keyof Q]: GetTypeFromQueryType<Q[P]>
};

function scrapType($: CheerioStatic, queryType: QueryType, context: string): any {
	switch (queryType.type) {
		case "TEXT": {
			if (queryType.selector === "") {
				// Get text from root element
				return $(context).text();
			} else {
				const el = $(queryType.selector, context);
				return el.text();
			}
		}
		case "ATTR": {
			if (queryType.selector === "") {
				// Get attribute from root element
				return $(context).attr(queryType.attribute);
			} else {
				const el = $(queryType.selector, context);
				return el.attr(queryType.attribute);
			}
		}
		case 'HTML': {
			if (queryType.selector === "") {
				// Get html from root element
				return $(context).html();
			} else {
				const el = $(queryType.selector, context);
				return el.html();
			}
		}
		case "EXISTS": {
			// TODO: selector cannot be ""
			const el = $(queryType.selector, context);
			return el.length > 0 ? true : false;
		}
		case "LIST": {
			const result: GetTypeFromQuery<typeof queryType.data>[] = [];
			const els = $(queryType.selector);
			for (let i = 0; i < els.length; i++) {
				const el = els.eq(i);
				const scrapedData = scrapObject($, el as any, queryType.data, {});
				result.push(scrapedData);
			}
			return result;
		}
		// case "IF": {
		// 	const el = $(queryType);
		// 	if (queryType.condition(el)) {
		// 		return scrapType($, queryType.truthy, context)
		// 	} else {
		// 		return scrapType($, queryType.falsey, context)
		// 	}
		// }
		default: {
			throw new Error(`Unexpected property type '${queryType}'`);
		}
	}
}

function scrapObject <Q extends QueryData>(
	$: CheerioStatic,
	context: string,
	queryData: Q,
	ref: any // object
): GetTypeFromQuery<Q> {
	Object.entries(queryData).forEach(([prop, val]) => {
		ref[prop] = scrapType($, val, context);
	});
	return ref as GetTypeFromQuery<Q>;
};

export function scrap <Q extends Query>(
	html: string,
	query: Q
): GetTypeFromQuery<Q> {
	const $ = load(html);
	const result = scrapObject($, "", query, {});
	return result as GetTypeFromQuery<Q>;
};

type DefaultFn = (data: string) => string;
export const Q = {
	/**
     * Get inner text
	 * @param selector - css selector
	 */
	text: (selector: string): Text<DefaultFn> => ({
		type: "TEXT",
		selector,
		convert: (data) => data
	}),

	/**
     * Get html attribute
	 * @param selector - css selector
	 * @param attribute - html attribute to scrap
	 */
	attr: (selector: string, attribute: string): Attr<DefaultFn> => ({
		type: "ATTR",
		selector,
		convert: (data) => data,
		attribute
    }),

    /**
     * Get html content
     * @param selector - css selector
     */
    html: (selector: string): Html<DefaultFn> => ({
        type: "HTML",
        selector,
        convert: (data) => data
	}),

	/**
	 * Check if element exists
	 * @param selector - css selector
	 */
	exists: (selector: string): Exists => ({
		type: "EXISTS",
		selector,
		convert: true
	}),

	/**
     * Get list of items
	 * @param selector - css selector for list of items
	 * @param data - query per item
	 */
	list: <Q extends QueryData>(
		selector: string,
		data: Q
	): List<GetTypeFromQuery<Q>> => ({ type: "LIST", convert: [], selector, data }),
};

