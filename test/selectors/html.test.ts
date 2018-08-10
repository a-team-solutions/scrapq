import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("html", () => {

    it("should get html from <ul/>", () => {
        const result = scrap(html, Q.html('ul>li:first-child'));
        expect(result).toBe(`<span>Guten Tag</span>`);
    });

    // it("should not get html from non exists element", () => {
    //     const result = scrap(html, Q.html('h3'));
    //     expect(result).toBe(null);
    // });

    it("should count using query", () => {
        const result = scrap(html, {
            footer: Q.html('ul>li:last-child')
        });
        expect(result.footer).toBe(`<span>Bonjour</span>`);
    });

});
