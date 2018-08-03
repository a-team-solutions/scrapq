import { QueryData, GetTypeFromQuery } from "../types";
import { ScrapObject } from "..";

export type List<T extends object> = {
	// --- Internal ---
	type: "LIST";
	convert: Array<T>;
	// ---Additional---
	selector: string;
	data: QueryData;
};

export const listResolve = <Q extends object>(
	$: CheerioStatic,
	queryType: List<Q>,
	scrapObject: ScrapObject
) => {
	const result: GetTypeFromQuery<typeof queryType.data>[] = [];
	const els = $(queryType.selector);
	for (let i = 0; i < els.length; i++) {
		const el = els.eq(i);
		const scrapedData = scrapObject($, el as any, queryType.data, {});
		result.push(scrapedData);
	}
	return result;
};
