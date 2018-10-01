import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("attr", () => {
	it("should scrap href attr from an <a/>", () => {
		const result = scrap(html, Q.attr("a", "href"));
		expect(result).toBe("/read-more");
	});

	it("should scrap href attr from an <a/> and split it by -", () => {
		const result = scrap(html, Q.attr("a", "href", attr => attr.split("-")));
		expect(result).toEqual(["/read", "more"]);
	});

	it("should scrap data-extra from <div/>", () => {
		const result = scrap(html, Q.attr(".footer", "data-extra"));
		expect(result).toBe("footer");
	});

	it("should scrap data using query", () => {
		const result = scrap(html, {
			footer: Q.attr(".footer", "data-extra")
		});
		expect(result.footer).toBe("footer");
	});
});
