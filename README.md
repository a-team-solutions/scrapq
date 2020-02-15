# ScrapQ

Lightweight Typescript library for scrapping html with **type inference** and **intellisense**.

## About

There are plenty scrapping libs out there, but only few with full Typescript support - Typescript will infer type based
on your query. This is small library with only one purpose to provide scrapping in human readable format with full
Typescript support like intellisense and type inference.

### Examples

To see **Basic** examples, please visit [./test/basic.test.ts](./test/basic.test.ts)

Or **Advanced** example, please visit [./test/exhaustive/agescx.test.ts](./test/exhaustive/agescx.test.ts)

### Hacker news

```typescript
import { scrap, $ } from 'scrapq';

// `fetch` is not included in library, use your own implementation
const html = fetch('https://news.ycombinator.com/').toString();

const data = scrap(html, {
    articles: $.list('.athing', {  // for every '.athing' selected element in document
        title: $.text('.title > a'), // get text from '.title > a'
        link: $.link('.title > a'), // get link (href attr) from '.title > a'
        website: $.text('.title > span.sitebit'), // get text
    });
});

console.log(data);
// {
//   articles: [
//       ...,
//       {
//          title: 'The tools humanity will need for living in the year 1 trillion',
//          website: 'phys.org',
//          link: 'https://phys.org/news/2018-06-tools-humanity-year-trillion.html'
//       },
//       ...
//     ]
// }
```

### Custom

```typescript
import { scrap, $ } from 'scrapq';

const STR_TO_SCRAP = `
    <h1 class="title">Hello</h1>
    <ul>
        <li><span>Guten Tag</span></li>
        <li><span>Ciao</span></li>
        <li><span>Bonjour</span></li>
    </ul>
    <a class="link" href="/read-more">read more ...</a>
`;

const result = scrap(STR_TO_SCRAP, {
    title: $.text('h1.title'),
    items: $.list('ul>li', {
        text: $.text('span')
    }),
    link: $.link('a.link')
});

console.log(result);
// {
//   title: 'Hello',
//   items: [
//      { text: 'Guten Tag' },
//      { text: 'Ciao' },
//      { text: 'Bonjour' }
//   ]
// }

```

or just

```typescript
import { scrap, $ } from 'scrapq';

const result = scrap(STR_TO_SCRAP, {
    title: $.text('h1.title'),
    texts: $.list('ul>li', $.text('span')),
    link: $.link('a.link')
});
```

## API

`scrap(html: string, query: Query)`

use to scrap json from html. Structure of your output is defined as `query`.
To define query, use `selectors` or `controls` below/

### Selectors


`Q.text(selector: string): string`

get text from an element

`Q.attr(selector: string, htmlAttribute: string): string`

get attribute from an element

`Q.html(selector: string): string`

get html

`Q.count(selector: string): number`

get elements count

### Controls

`Q.List(selector: string, query: Query | QueryType, predicate?): Array<query>`

get list of items
