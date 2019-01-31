import { scrap, $ } from "../../lib";
import { html } from "../data";

describe("if", () => {
	it("should use truthy condition", () => {
		const result = scrap(
			html,
			$.if(".title", el => !!el, $.text(".title"), $.text(".msg"))
		);
		expect(result).toBe("Hello");
	});

	it("should use falsey condition", () => {
		const result = scrap(
			html,
			$.if(".notexisting", el => !el, $.text(".title"), { msg: $.text(".msg") })
		);
		expect(result).toEqual({ msg: "Ciao" });
	});

	it("should use truthy condition and get length", () => {
		const result = scrap(
			html,
			$.if(
				".title",
				el => !!el,
				$.text(".title", text => text.length),
				$.text(".msg")
			)
		);
		expect(result).toBe(5);
	});
});
