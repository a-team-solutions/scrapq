import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("html", () => {
	it("should get html from <ul/>", () => {
		const result = scrap(html, $.html("ul>li:first-child"));
		expect(result).toBe(`<span>Guten Tag</span>`);
	});

	it("should get html from <ul/> and get lenght", () => {
		const result = scrap(
			html,
			$.html("ul>li:first-child", html => html.length)
		);
		expect(result).toBe(22);
	});

	// it("should not get html from non exists element", () => {
	//     const result = scrap(html, $.html('h3'));
	//     expect(result).toBe(null);
	// });

	it("should count using query", () => {
		const result = scrap(html, {
			footer: $.html("ul>li:last-child")
		});
		expect(result.footer).toBe(`<span>Bonjour</span>`);
	});
});
