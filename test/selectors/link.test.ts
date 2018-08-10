import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("link", () => {

    it("should get link from <a/>", () => {
        const result = scrap(html, Q.link('a'));
        expect(result).toBe("/read-more");
    });

    // it("should not get link from title", () => {
    //     const result = scrap(html, Q.link('h1'));
    //     expect(result).toBe("");
    // });

    // it("should not get link non existing element", () => {
    //     const result = scrap(html, Q.link('h3'));
    //     expect(result).toBe("");
    // });

    it("should link using query", () => {
        const result = scrap(html, {
            href: Q.link('a')
        });
        expect(result.href).toBe("/read-more");
    });

});
