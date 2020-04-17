import test from "tape";
import { scrap, $ } from "../../lib";
import { html } from "../data";

test("html", (main) => {

	test("should get html from <ul/>", (t) => {
		const result = scrap(html, $.html("ul>li:first-child"));
		t.equal(result, `<span>Guten Tag</span>`);
		t.end();
	});

	test("should count using query", (t) => {
		const result = scrap(html, {
			footer: $.html("ul>li:last-child")
		});
		t.equal(result.footer, `<span>Bonjour</span>`);
		t.end();
	});

	main.end();
});
