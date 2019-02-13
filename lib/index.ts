export { scrap } from './scrapper';

export { Query, Selector, TypeOfSelector, TypeOfQuery } from './types';
export { ScrapQuery, ScrapSelector } from './scrapper';

// Import
import { attrCreator as attr } from './selectors/attr';
import { existsCreator as exists } from './selectors/exists';
import { htmlCreator as html } from './selectors/html';
import { textCreator as text } from './selectors/text';
import { selectCreator as select } from "./selectors/select";
import { countCreator as count } from "./selectors/count";
import { linkCreator as link } from "./selectors/link";

import { listCreator as List } from './controls/list';
import { ifCreator as If } from './controls/if';

export const $ = {
	if: If,
	list: List,
	attr,
	exists,
	html,
	text,
	select,
	count,
	link
};
