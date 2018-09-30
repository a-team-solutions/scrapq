export type Attr<F extends (attribute: string) => any> = {
	// --- Internal
	_type: "ATTR";
	callback: F;
	// ---Additional
	attribute: string;
	selector: string;
};

export function attrResolve(
	$: CheerioStatic,
	context: Cheerio,
	queryType: Attr<any>
) {
	if (queryType.selector === "") {
		// Get attribute from root element
		const attribute = $(context).attr(queryType.attribute);
		return queryType.callback(attribute);
	} else {
		const el = $(queryType.selector, context);
		const attribute = el.attr(queryType.attribute);
		return queryType.callback(attribute);
	}
};

/**
 * Get html attribute
 * @param selector - css selector
 * @param attribute - html attribute to scrap
 */
export function attrCreator(selector: string, attribute: string, callback?: undefined): Attr<() => string>;
export function attrCreator<F extends (attribute: string) => any>(selector: string, attribute: string, callback: F): Attr<F>;
export function attrCreator<F extends (attribute: string) => any>(selector: string, attribute: string, callback?: undefined | F) {
	return {
		_type: "ATTR",
		selector,
		callback: callback ? callback : (attr: string) => attr,
		attribute
	} as Attr<any>;
}

