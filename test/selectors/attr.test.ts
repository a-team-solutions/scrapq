import test from "tape";
import { scrap, $ } from "../../lib";
import { html } from "../data";

test("attr", (main) => {

	test("should scrap href attr from an <a/>", (t) => {
		const result = scrap(html, $.attr("a", "href"));
		t.equal(result, "/read-more");
		t.end();
	});

	test("should scrap data-extra from <div/>", (t) => {
		const result = scrap(html, $.attr(".footer", "data-extra"));
		t.equal(result, "footer");
		t.end();
	});

	test("should scrap data using query", (t) => {
		const result = scrap(html, {
			footer: $.attr(".footer", "data-extra")
		});
		t.equal(result.footer, "footer");
		t.end();
	});

	main.end();
});
