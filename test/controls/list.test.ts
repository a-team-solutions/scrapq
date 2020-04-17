import test from "tape";
import { scrap, $ } from "../../lib";
import { html } from "../data";

test("select", (main) => {

	test("should scrap items from <span/>", (t) => {
		const spans = scrap(html, $.list("span", $.text("")));
		t.equal(spans.length, 3);
		t.equal(spans[0], "Guten Tag");
		t.end();
	});

	test("should scrap items from <span/> using query", (t) => {
		const result = scrap(html, {
			items: $.list("li", {
				text: $.text("span")
			})
		});
		t.equal(result.items.length, 3);
		t.equal(result.items[2].text, "Bonjour");
		t.end();
	});

	main.end();
});
