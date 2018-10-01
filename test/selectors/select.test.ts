import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("select", () => {
	it("should get text using a selector", () => {
		const result = scrap(html, {
			title: Q.select("h1", el => el.text())
		});
		expect(result.title).toBe("Hello");
	});
});
