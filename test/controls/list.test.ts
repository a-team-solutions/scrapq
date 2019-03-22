import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("select", () => {
	it("should scrap items from <span/>", () => {
		const spans = scrap(html, $.list("span", $.text("")));
		expect(spans.length).toBe(3);
		expect(spans[0]).toBe("Guten Tag");
	});

	it("should scrap items from <span/> using query", () => {
		const result = scrap(html, {
			items: $.list("li", {
				text: $.text("span")
			})
		});
		expect(result.items.length).toBe(3);
		expect(result.items[2].text).toBe("Bonjour");
	});
});
