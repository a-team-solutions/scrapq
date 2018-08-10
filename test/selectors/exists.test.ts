import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("exists", () => {

    it("should exists title", () => {
        const result = scrap(html, Q.exists('h1'));
        expect(result).toBe(true);
    });

    it("should not exists h3", () => {
        const result = scrap(html, Q.exists('h3'));
        expect(result).toBe(false);
    });

    it("should exists using query", () => {
        const result = scrap(html, {
            hasFooter: Q.exists('.footer')
        });
        expect(result.hasFooter).toBe(true);
    });

});
