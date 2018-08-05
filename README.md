# ScrapQ

[![Greenkeeper badge](https://badges.greenkeeper.io/dderevjanik/scrapq.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/dderevjanik/scrapq.svg?branch=master)](https://travis-ci.org/dderevjanik/scrapq)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Lightweight Typescript library for scrapping html with **type inference** and **intellisense**.

## About

There are plenty scrapping libs out there, but only few with full Typescript support - Typescript will infer type based
on your query. This is small library with only one purpose to provide scrapping in human readable format with full
Typescript support like intellisense and type inference.

## Examples

To see all examples, please visit [./test/basic.test.ts](./test/basic.test.ts)

Hacker news

```typescript
import { scrap, Q } from 'scrapq';

// `fetch` is not included in library, use your own implementation
const html = fetch('https://news.ycombinator.com/').toString();

const data = scrap(html, {
    articles: Q.list('.athing', {
        title: Q.text('.title > a'),
        website: Q.text('.title > span.sitebit'),
        link: Q.attr('.title > a', 'href')
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

Custom

```typescript
import { scrap, Q } from 'scrapq';

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
    title: Q.text('h1.title'),
    items: Q.list('ul>li', {
        text: Q.text('span')
    }),
    link: Q.link('a.link')
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
import { text, list, link } from 'scrapq';

const result = scrap(STR_TO_SCRAP, {
    title: text('h1.title'),
    items: list('ul>li', {
        text: text('span')
    }),
    link: link('a.link')
});
```

## API

`scrap(html: string, query: Query)`

### Query

`Q.text(selector: string): string`

get text from an element

`Q.attr(selector: string, htmlAttribute: string): string`

get attribute from an element

`Q.html(selector: string): string`

get html

`Q.exists(selector: string): boolean`

get `true/false` if element exists

`Q.list(selector: string, query: Query | QueryType, predicate?): Array<query>`

get list of items

`Q.count(selector: string): number`

get elements count
