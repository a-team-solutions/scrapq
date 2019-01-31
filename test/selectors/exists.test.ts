import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("exists", () => {
	it("should exists title", () => {
		const result = scrap(html, $.exists("h1"));
		expect(result).toBe(true);
	});

	it("should exists title and convert it to string", () => {
		const result = scrap(html, $.exists("h1", exists => "" + exists));
		expect(result).toBe("true");
	});

	it("should not exists h3", () => {
		const result = scrap(html, $.exists("h3"));
		expect(result).toBe(false);
	});

	it("should exists using query", () => {
		const result = scrap(html, {
			hasFooter: $.exists(".footer")
		});
		expect(result.hasFooter).toBe(true);
	});
});
