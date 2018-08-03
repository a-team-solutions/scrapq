import { load } from "cheerio";
import { QueryData, QueryType, GetTypeFromQuery } from "./types";
import { Attr, attrResolve } from './selectors/attr';
import { Exists, existsResolve } from './selectors/exists';
import { Html, htmlResolve } from './selectors/html';
import { List, listResolve } from './selectors/list';
import { Text, textResolve } from './selectors/text';
import { Select, selectResolve } from "./selectors/select";

export type ScrapType = ($: CheerioStatic, queryType: QueryType, context: string) => any;

const scrapType: ScrapType =  ($: CheerioStatic, queryType: QueryType, context: string) => {
	switch (queryType.type) {
		case "TEXT": return textResolve($, context, queryType)
		case "ATTR": return attrResolve($, context, queryType)
		case 'HTML': return htmlResolve($, context, queryType)
		case "EXISTS": return existsResolve($, context, queryType)
		case "LIST": return listResolve($, queryType, scrapObject)
		case "SELECT": return selectResolve($, context, queryType)
		default: {
			throw new Error(`Unexpected property type '${queryType}'`);
		}
	}
}

export type ScrapObject = <Q extends QueryData>(
	$: CheerioStatic,
	context: string,
	queryData: Q,
	ref: any // object
) => GetTypeFromQuery<Q>;

const scrapObject: ScrapObject =  <Q extends QueryData>(
	$: CheerioStatic,
	context: string,
	queryData: Q,
	ref: any // object
): GetTypeFromQuery<Q> => {
	Object.entries(queryData).forEach(([prop, val]) => {
		ref[prop] = scrapType($, val, context);
	});
	return ref as GetTypeFromQuery<Q>;
};

export function scrap <Q extends QueryData>(
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
	text: (selector: string): Text => ({
		type: "TEXT",
		selector,
		convert: ''
	}),

	/**
     * Get html attribute
	 * @param selector - css selector
	 * @param attribute - html attribute to scrap
	 */
	attr: (selector: string, attribute: string): Attr => ({
		type: "ATTR",
		selector,
		convert: '',
		attribute
    }),

    /**
     * Get html content
     * @param selector - css selector
     */
    html: (selector: string): Html => ({
        type: "HTML",
        selector,
        convert: "string"
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

	select: <C extends (el: Cheerio) => any>(selector: string, convert: C): Select<C> => ({
		type: "SELECT",
		convert: convert,
		selector: selector
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

