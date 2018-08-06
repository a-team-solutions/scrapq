import { readFileSync } from "fs";
import { scrap, list, text, link, html } from "../../lib";

const shtml = readFileSync('./test/exhaustive/agescx.html').toString();

describe('agescx documentation', () => {

    it('should get all navigation items from agescx', () => {
        const result = scrap(shtml, {
            navs: list('ul.navbar-nav>li:not(.disabled)', {
                text: text('li > a'),
                link: link('li > a'),
                submenu: list('ul.dropdown-menu>li', {
                    text: text('li > a'),
                    link: link('li > a')
                })
            }),
            title: text('h1'),
            content: html('div[role="main"]')
        });
        
        expect(result.navs.length).toBe(9);
        expect(result.navs[2].submenu.length).toBe(2);
        expect(result.navs[2].submenu[0].text).toBe('Adding new unit');
        expect(result.content.length).toBeGreaterThan(30);
        expect(result.title).toBe('Agescx Documentation');
    });

});
