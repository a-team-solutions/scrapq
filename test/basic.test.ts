import test from "tape";
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

test('Basic', (main) => {

    test('should scrap <h1/> text from string', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.text('h1.title')
        });
        t.equal(result, { title: 'Hello'});
        t.end();
    });

    test('should scrap attributes from <h1/>', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.attr('h1.title', 'class')
		});
        t.equal(result, { title: 'title'});
        t.end();
    });

    test('should scrap items from <span/>', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('li', {
                text: $.text('span')
            })
        });
        t.equal(result.items.length, 3);
        t.equal(result.items[2].text, 'Bonjour');
        t.end();
    });

    test('should scrap text from <li><span/>', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('li', {
                text: $.text('span')
            })
        });
        t.equal(result.items.length, 3);
        t.equal(result.items[2].text, 'Bonjour');
        t.end();
    });

    test('should scrap text from <span/> by omitting <li/>', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            items: $.list('span', {
                text: $.text('')
            })
        });
        t.equal(result.items.length, 3);
        t.equal(result.items[2].text, 'Bonjour');
        t.end();
    });

    test('should get list of texts', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            texts: $.list('li', $.text('span'))
        });
        t.equals(result.texts, [
            'Guten Tag',
            'Ciao',
            'Bonjour'
        ]);
        t.end();
    });

    test('should user deep query', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            title: $.text('.title'),
            data: {
                msg: $.text('.msg')
            }
        });
        t.equal(result.title, 'Hello');
        t.equal(result.data.msg, 'Ciao');
        t.end();
    });

    test('should count <span/> elements', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: $.count('span')
        });
        t.equal(result.spanCount, 3);
        t.end();
    });

    test('should count not exists element', (t) => {
        const result = scrap(STR_TO_SCRAP, {
            spanCount: $.count('table')
        });
        t.equal(result.spanCount, 0);
        t.end();
    });

    test('should use only selector to scrap title', (t) => {
        const title = scrap(STR_TO_SCRAP, $.text('.title'));
        t.equal(title, 'Hello');
    });

    test('should use only selector to scrap <span/>', (t) => {
        const spans = scrap(STR_TO_SCRAP, $.list('span', $.text('')));
        t.equal(spans.length, 3);
        t.equal(spans[0], 'Guten Tag');
        t.end();
    });

    main.end();
});
