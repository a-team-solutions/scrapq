import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("attr", () => {
	it("should scrap href attr from an <a/>", () => {
		const result = scrap(html, $.attr("a", "href"));
		expect(result).toBe("/read-more");
	});

	it("should scrap data-extra from <div/>", () => {
		const result = scrap(html, $.attr(".footer", "data-extra"));
		expect(result).toBe("footer");
	});

	it("should scrap data using query", () => {
		const result = scrap(html, {
			footer: $.attr(".footer", "data-extra")
		});
		expect(result.footer).toBe("footer");
	});
});
