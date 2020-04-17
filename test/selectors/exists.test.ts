import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("exists", () => {
	it("should exists <li/> element", () => {
		const result = scrap(html, $.exists("li"));
		expect(result).toBe(true);
	});

	it("should not exists <h4> element", () => {
		const result = scrap(html, $.exists("h4"));
		expect(result).toBe(false);
	});

	it("should exists using query", () => {
		const result = scrap(html, {
            hasTitle: $.exists("h1"),
            hasSubtitle: $.exists("h4"),

		});
        expect(result.hasTitle).toBe(true);
		expect(result.hasSubtitle).toBe(false);
	});
});
