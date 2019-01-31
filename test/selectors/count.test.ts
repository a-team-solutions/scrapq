import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("count", () => {
	it("should count <li/> elements", () => {
		const result = scrap(html, $.count("li"));
		expect(result).toBe(3);
	});

	it("should count <li/> elements and convert it to string", () => {
		const result = scrap(html, $.count("li", count => count.toString()));
		expect(result).toBe("3");
	});

	it("should count <h1/>", () => {
		const result = scrap(html, $.count("h1"));
		expect(result).toBe(1);
	});

	it("should count non-existing element", () => {
		const result = scrap(html, $.count("h3"));
		expect(result).toBe(0);
	});

	it("should count using query", () => {
		const result = scrap(html, {
			liCounts: $.count("li")
		});
		expect(result.liCounts).toBe(3);
	});
});
