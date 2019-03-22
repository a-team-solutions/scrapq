import { scrap, $ } from '../lib';

const STR_TO_SCRAP = `
    <h1 class="title">Hello</h1>
    <ul>
        <li><span>Guten Tag</span></li>
        <li><span class="msg">Ciao</span></li>
        <li><span>Bonjour</span></li>
    </ul>
    <a href="/read-more">read more ...</a>
`;

describe('Basic', () => {

    it('should scrap <h1/> text from string', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.text('h1.title')
        });
        expect(result).toEqual({ title: 'Hello'});
    });

    it('should scrap attributes from <h1/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.attr('h1.title', 'class')
		});
        expect(result).toEqual({ title: 'title'});
    });

    it('should scrap items from <span/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('li', {
                text: $.text('span')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should scrap text from <li><span/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('li', {
                text: $.text('span')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should scrap text from <span/> by omitting <li/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('span', {
                text: $.text('')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should get list of texts', () => {
        const result = scrap(STR_TO_SCRAP, {
            texts: $.list('li', $.text('span'))
        });
        expect(result.texts).toEqual([
            'Guten Tag',
            'Ciao',
            'Bonjour'
        ]);
    });

    it('should user deep query', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.text('.title'),
            data: {
                msg: $.text('.msg')
            }
        });
        expect(result.title).toBe('Hello');
        expect(result.data.msg).toBe('Ciao');
    });

    it('should count <span/> elements', () => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: $.count('span')
        });
        expect(result.spanCount).toBe(3);
    });

    it('should count not exists element', () => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: $.count('table')
        });
        expect(result.spanCount).toBe(0);
    });

    it('should use only selector to scrap title', () => {
        const title = scrap(STR_TO_SCRAP, $.text('.title'));
        expect(title).toBe('Hello');
    });

    it('should use only selector to scrap <span/>', () => {
        const spans = scrap(STR_TO_SCRAP, $.list('span', $.text('')));
        expect(spans.length).toBe(3);
        expect(spans[0]).toBe('Guten Tag');
    });

});
