import { readFileSync } from "fs";
import { scrap, list, text, link } from "../../lib";

const html = readFileSync('./test/exhaustive/agescx.html').toString();

describe('agescx documentation', () => {

    it('should get all navigation items from agescx', () => {
        const result = scrap(html, {
            navs: list('ul.navbar-nav>li:not(.disabled)', {
                text: text('li > a'),
                link: link('li > a'),
                submenu: list('ul.dropdown-menu>li', {
                    text: text('li > a'),
                    link: link('li > a')
                })
            })
        });
        expect(result.navs.length).toBe(9);
    });

});
