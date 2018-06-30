import { scrap, Q } from '../lib/Index';

const STR_TO_SCRAP = `
    <h1 class="title">Hello</h1>
    <ul>
        <li><span>Guten Tag</span></li>
        <li><span>Ciao</span></li>
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

