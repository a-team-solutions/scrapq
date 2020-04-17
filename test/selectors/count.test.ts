import test from "tape";
import { scrap, $ } from "../../lib";
import { html } from "../data";

test("count", (main) => {

	test("should count <li/> elements", (t) => {
		const result = scrap(html, $.count("li"));
		t.equal(result, 3);
		t.end();
	});

	test("should count <h1/>", (t) => {
		const result = scrap(html, $.count("h1"));
		t.equal(result, 1);
		t.end();
	});

	test("should count non-existing element", (t) => {
		const result = scrap(html, $.count("h3"));
		t.equal(result, 0);
		t.end();
	});

	test("should count using query", (t) => {
		const result = scrap(html, {
			liCounts: $.count("li")
		});
		t.equal(result.liCounts, 3);
		t.end();
	});

	main.end();
});
