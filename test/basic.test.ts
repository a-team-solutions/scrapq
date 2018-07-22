import { scrap, Q } from '../lib';

const STR_TO_SCRAP = `
    <h1 class="title">Hello</h1>
    <ul>
        <li><span>Guten Tag</span></li>
        <li><span class="msg">Ciao</span></li>
        <li><span>Bonjour</span></li>
    </ul>
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

});

