import test from "tape";
import { scrap, $ } from "../../lib";
import { html } from "../data";

test("text", (main) => {

	test("should get text from .msg", (t) => {
		const result = scrap(html, $.text(".msg"));
		t.equal(result, "Ciao");
        t.end();
	});

	test("should not get text from non existing element", (t) => {
		const result = scrap(html, $.text("h3"));
		t.equal(result, "");
        t.end();
	});

	test("should count using query", (t) => {
		const result = scrap(html, {
			link: $.text("a")
		});
		t.equal(result.link, "read more ...");
        t.end();
	});

	main.end();
});
