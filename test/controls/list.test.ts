import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("select", () => {
	it("should scrap items from <span/>", () => {
		const spans = scrap(html, Q.List("span", Q.text("")));
		expect(spans.length).toBe(3);
		expect(spans[0]).toBe("Guten Tag");
	});

	it("should scrap items from <span/> using query", () => {
		const result = scrap(html, {
			items: Q.List("li", {
				text: Q.text("span")
			})
		});
		expect(result.items.length).toBe(3);
		expect(result.items[2].text).toBe("Bonjour");
	});

	it("should use predicate to only scrap .msg", () => {
		const result = scrap(
			html,
			Q.List("span", Q.text(""), el => el.hasClass("msg"))
		);
		expect(result.length).toBe(1);
		expect(result).toEqual(["Ciao"]);
	});
});
