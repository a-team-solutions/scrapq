import { scrap, Q } from '../lib';

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
            title: Q.text('h1.title')
        });
        expect(result).toEqual({ title: 'Hello'});
    });

    it('should scrap attributes from <h1/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: Q.attr('h1.title', 'class')
		});
        expect(result).toEqual({ title: 'title'});
    });

    it('should scrap items from <span/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: Q.list('li', {
                text: Q.text('span')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should exists .title', () => {
        const result = scrap(STR_TO_SCRAP, {
            hasTitle: Q.exists('h1.title')
        });
        expect(result.hasTitle).toBe(true);
    });

    it('should not exists .castle', () => {
        const result = scrap(STR_TO_SCRAP, {
            hasCastle: Q.exists('.castle')
        });
        expect(result.hasCastle).toBe(false);
    });

    it('should exists .msg inside list', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: Q.list('li', {
                hasMsg: Q.exists('span.msg')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[0].hasMsg).toBe(false);
        expect(result.items[1].hasMsg).toBe(true);
        expect(result.items[2].hasMsg).toBe(false);
    });

    it('should scrap text from <li><span/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: Q.list('li', {
                text: Q.text('span')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should scrap text from <span/> by omitting <li/>', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: Q.list('span', {
                text: Q.text('')
            })
        });
        expect(result.items.length).toBe(3);
        expect(result.items[2].text).toBe('Bonjour')
    });

    it('should use custom selector', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: Q.select('h1', (el) => el.text())
        });
        expect(result.title).toBe('Hello');
    });

    it('should get list of texts', () => {
        const result = scrap(STR_TO_SCRAP, {
            texts: Q.list('li', Q.text('span'))
        })
        expect(result.texts).toEqual([
            'Guten Tag',
            'Ciao',
            'Bonjour'
        ])
    });

    it('should user deep query', () => {
        const result = scrap(STR_TO_SCRAP, {
            title: Q.text('.title'),
            data: {
                msg: Q.text('.msg')
            }
        });
        expect(result.title).toBe('Hello');
        expect(result.data.msg).toBe('Ciao');
    });

    it('should count <span/> elements', () => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: Q.count('span')
        });
        expect(result.spanCount).toBe(3);
    });

    it('should count not exists element', () => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: Q.count('table')
        });
        expect(result.spanCount).toBe(0);
    });

    it('should get link from an <a/> element', () => {
        const result = scrap(STR_TO_SCRAP, {
            link: Q.link('a')
        });
        expect(result.link).toBe('/read-more');
    });

    it('should not get link from non-existing element', () => {
        const result = scrap(STR_TO_SCRAP, {
            link: Q.link('tr')
        });
        expect(result.link).toBeUndefined();
    });

    it('should use predicate filter on list selector', () => {
        const result = scrap(STR_TO_SCRAP, {
            items: Q.list('span', {
                msg: Q.text('')
            }, (el) => el.hasClass('msg'))
        });
        expect(result.items[0].msg).toBe('Ciao');
    });

});
