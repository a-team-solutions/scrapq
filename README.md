# ScrapQ

[![Greenkeeper badge](https://badges.greenkeeper.io/dderevjanik/scrapq.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/dderevjanik/scrapq.svg?branch=master)](https://travis-ci.org/dderevjanik/scrapq)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Lightweight Typescript library for scrapping html.

## About

There are plenty scrapping libs out there, but only few with full Typescript support - Typescript will infer type based
on your query. This is small library with only one purpuse to provide scrapping in human readable format with full
Typescript support like intellisense.

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
`;

const result = scrap(STR_TO_SCRAP, {
    title: Q.text('h1.title'),
    items: Q.list('li', {
        text: Q.text('span')
    })
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

## API

`scrap(html: string, query: Query)`

### Query

`Q.text(selector: string)`

get text from an element


`Q.attr(selector: string, htmlAttribute: string)`

get attribute from an element

`Q.html(selector: string)`

get html

`Q.list(selector: string, query: Query)`

get list of items
