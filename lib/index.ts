import { load } from "cheerio";
import { AnySelector, text, count, attr, html } from "./selectors";
import { Query, GetResult } from "./helpers";
import { AnyControl, list } from "./controls";

function isSelectorOrControl(test: any): test is (AnySelector | AnyControl) {
    if (("type" in test) && ("select" in test)) {
        return true;
    }
    return false;
}

function scrapSelector($: CheerioStatic, context: Cheerio, selector: AnySelector | AnyControl) {
    switch (selector.type) {
        case "text": {
            const text = (selector.select === "")
                ? $(context).text()
                : $(selector.select, context).text();
            return text;
        }
        case "attr": {
            const el = (selector.select === "")
                ? context
                : $(selector.select, context);
            const attr = el.attr(selector.attr);
            return attr.trim();
        }
        case "count": {
            const els = $(selector.select, context);
            const count = els.length;
            return count;
        }
        case "list": {
            const result: any[] = [];
            const els = $(selector.select, context);
            for (let i = 0; i < els.length; i++) {
                const el = els.eq(i);
                const scrapedEl = isSelectorOrControl(selector.query)
                    ? scrapSelector($, el, selector.query)
                    : scrapQuery($, el, selector.query, {});
                result.push(scrapedEl);
            }
            return result;
        }
        case "html": {
            if (selector.select === "") {
                const html = $(context).html();
                return html;
            } else {
                const el = $(selector.select, context);
                const html = el.html();
                return (typeof html === "string")
                    ? html.trim()
                    : html;
            }
        }
        default: {
            throw new Error(`Undefined selector "${JSON.stringify(selector)}"`);
        }
    }
}

function scrapQuery<Q extends Query>($: CheerioStatic, context: Cheerio, query: Q, ref: any): GetResult<Q> {
    Object.keys(query).forEach(prop => {
        const val = query[prop];
		if (isSelectorOrControl(val)) {
			ref[prop] = scrapSelector($, context, val);
		} else {
			ref[prop] = scrapQuery($, context, val, {});
		}
	});
	return ref;
}



export function scrap<Q extends Query | AnyControl | AnySelector>(
    html: string,
    query: Q
): GetResult<Q> {
    const $ = load(html);
    const root = $.root();
    if (isSelectorOrControl(query)) {
        return scrapSelector($, root, query) as any;
    } else {
        return scrapQuery($, root, query as Query, {}) as any;
    }
}

export const $ = {
    attr,
    text,
    count,
    list,
    html
};
