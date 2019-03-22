import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("html", () => {
	it("should get html from <ul/>", () => {
		const result = scrap(html, $.html("ul>li:first-child"));
		expect(result).toBe(`<span>Guten Tag</span>`);
	});

	it("should count using query", () => {
		const result = scrap(html, {
			footer: $.html("ul>li:last-child")
		});
		expect(result.footer).toBe(`<span>Bonjour</span>`);
	});
});
