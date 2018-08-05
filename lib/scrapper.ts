import { load } from "cheerio";
import { Query, Selector, TypeOfQuery, TypeOfSelector, isSelector } from "./types";
import { attrResolve } from './selectors/attr';
import { existsResolve } from './selectors/exists';
import { htmlResolve } from './selectors/html';
import { listResolve } from './selectors/list';
import { textResolve } from './selectors/text';
import { selectResolve } from "./selectors/select";

export type ScrapSelector = ($: CheerioStatic, queryType: Selector, context: string) => any;

const scrapSelector: ScrapSelector =  ($: CheerioStatic, queryType: Selector, context: string) => {
	switch (queryType.type) {
		case "TEXT": return textResolve($, context, queryType)
		case "ATTR": return attrResolve($, context, queryType)
		case 'HTML': return htmlResolve($, context, queryType)
		case "EXISTS": return existsResolve($, context, queryType)
		case "LIST": return listResolve($, context, queryType, scrapQuery, scrapSelector)
		case "SELECT": return selectResolve($, context, queryType)
		default: {
			throw new Error(`Unexpected property type '${queryType}'`);
		}
	}
}

export type ScrapQuery = <Q extends Query>(
	$: CheerioStatic,
	context: string,
	queryData: Q,
	ref: any // object
) => TypeOfQuery<Q>;

const scrapQuery: ScrapQuery =  <Q extends Query>(
	$: CheerioStatic,
	context: string,
	queryData: Q,
	ref: any // object
): TypeOfQuery<Q> => {
	Object.entries(queryData).forEach(([prop, val]) => {
		if (isSelector(val)) {
			ref[prop] = scrapSelector($, val, context);
		} else {
			ref[prop] = scrapQuery($, context, val, {});
		}
	});
	return ref as TypeOfQuery<Q>;
};

export function scrap <Q extends Query>(
	html: string,
	query: Q
): TypeOfQuery<Q> {
	const $ = load(html);
	const result = scrapQuery($, "", query, {});
	return result as TypeOfQuery<Q>;
};
