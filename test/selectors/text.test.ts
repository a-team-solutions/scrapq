import { scrap, Q } from "../../lib";
import { html } from "../data";

describe("text", () => {

    it("should get text from .msg", () => {
        const result = scrap(html, Q.text('.msg'));
        expect(result).toBe("Ciao");
    });

    // it("should get text from <ul/>", () => {
    //     const result = scrap(html, Q.text('ul'));
    //     expect(result).toBe('');
    // });

    it("should not get text from non existing element", () => {
        const result = scrap(html, Q.text('h3'));
        expect(result).toBe("");
    });

    it("should count using query", () => {
        const result = scrap(html, {
            link: Q.text('a')
        });
        expect(result.link).toBe("read more ...");
    });

});
