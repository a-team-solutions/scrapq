import { load } from "cheerio";
import { Query, Selector, TypeOfQuery, isSelector, TypeOfSelector } from "./types";
import { attrResolve } from './selectors/attr';
import { existsResolve } from './selectors/exists';
import { htmlResolve } from './selectors/html';
import { listResolve } from './controls/list';
import { textResolve } from './selectors/text';
import { selectResolve } from "./selectors/select";
import { countResolve } from "./selectors/count";
import { linkResolve } from "./selectors/link";

const err = 'Unexpected property type';
const hlp = 'Propably you missplaced one type of query';

export type ScrapSelector = ($: CheerioStatic, context: Cheerio, queryType: Selector) => any;

const scrapSelector: ScrapSelector =  ($: CheerioStatic, context: Cheerio, queryType: Selector) => {
	switch (queryType._type) {
		case "TEXT": return textResolve($, context, queryType);
		case "ATTR": return attrResolve($, context, queryType);
		case 'HTML': return htmlResolve($, context, queryType);
		case "EXISTS": return existsResolve($, context, queryType);
		case "LIST": return listResolve($, context, queryType, scrapQuery, scrapSelector);
		case "SELECT": return selectResolve($, context, queryType);
		case "COUNT": return countResolve($, context, queryType);
		case "LINK": return linkResolve($, context, queryType);
		default: {
			throw new Error(`${err} "${queryType}", \n ${hlp}`);
		}
	}
}

export type ScrapQuery = <Q extends Query>(
	$: CheerioStatic,
	context: Cheerio,
	queryData: Q,
	ref: any // object
) => TypeOfQuery<Q>;

const scrapQuery: ScrapQuery =  <Q extends Query>(
	$: CheerioStatic,
	context: Cheerio,
	queryData: Q,
	ref: any // object
): TypeOfQuery<Q> => {
	Object.entries(queryData).forEach(([prop, val]) => {
		if (isSelector(val)) {
			ref[prop] = scrapSelector($, context, val);
		} else {
			ref[prop] = scrapQuery($, context, val, {});
		}
	});
	return ref as TypeOfQuery<Q>;
}

/**
 * Scrap based on query
 * @param html - html to scrap
 * @param query - query to use
 */
export function scrap <Q extends Query | Selector>(
	html: string,
	query: Q
): Q extends Query ? TypeOfQuery<Q> : Q extends Selector ? TypeOfSelector<Q> : never {
	const $ = load(html);
	const root = $.root();
	const result = isSelector(query)
		? scrapSelector($, root, query)
		: scrapQuery($, root, query as Query, {});
	return result;
};
