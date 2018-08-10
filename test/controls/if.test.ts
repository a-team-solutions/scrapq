import { scrap, Q } from "../../lib";
import { html } from "../data";

describe('if', () => {

    it('should use truthy condition', () => {
        const result = scrap(html, Q.If('.title', (el) => !!el, Q.text('.title'), Q.text('.msg')));
        expect(result).toBe('Hello');
    });

    it('should use falsey condition', () => {
        const result = scrap(html, Q.If('.notexisting', (el) => !el, Q.text('.title'), { msg: Q.text('.msg') }));
        expect(result).toEqual({ msg: 'Ciao' });
    });

});
