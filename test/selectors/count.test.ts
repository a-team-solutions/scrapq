import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("count", () => {

    it("should count <li/> elements", () => {
        const result = scrap(html, Q.count('li'));
        expect(result).toBe(3);
    });

    it("should count <h1/>", () => {
        const result = scrap(html, Q.count('h1'));
        expect(result).toBe(1);
    });

    it("should count non-existing element", () => {
        const result = scrap(html, Q.count('h3'));
        expect(result).toBe(0);
    });

    it("should count using query", () => {
        const result = scrap(html, {
            liCounts: Q.count('li')
        });
        expect(result.liCounts).toBe(3);
    });

});