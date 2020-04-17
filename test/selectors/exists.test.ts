import test from "tape";
import { scrap, $ } from "../../lib";
import { html } from "../data";

test("exists", (main) => {

	test("should exists <li/> element", (t) => {
		const result = scrap(html, $.exists("li"));
        t.equal(result, true);
        t.end();
	});

	test("should not exists <h4> element", (t) => {
		const result = scrap(html, $.exists("h4"));
        t.equal(result, false);
        t.end();
	});

	test("should exists using query", (t) => {
		const result = scrap(html, {
            hasTitle: $.exists("h1"),
            hasSubtitle: $.exists("h4"),

		});
        t.equal(result.hasTitle, true);
        t.equal(result.hasSubtitle, false);
        t.end();
    });

    main.end();
});
