export { Query, Selector, TypeOfSelector, TypeOfQuery } from './types';
export { ScrapQuery, ScrapSelector, scrap } from './scrapper';

// Export
export { attrCreator as attr } from './selectors/attr';
export { existsCreator as exists } from './selectors/exists';
export { htmlCreator as html } from './selectors/html';
export { listCreator as list } from './controls/list';
export { textCreator as text } from './selectors/text';
export { selectCreator as select } from "./selectors/select";
export { countCreator as count } from "./selectors/count";
export { linkCreator as link } from "./selectors/link";

// Import
import { attrCreator as attr } from './selectors/attr';
import { existsCreator as exists } from './selectors/exists';
import { htmlCreator as html } from './selectors/html';
import { listCreator as list } from './controls/list';
import { textCreator as text } from './selectors/text';
import { selectCreator as select } from "./selectors/select";
import { countCreator as count } from "./selectors/count";
import { linkCreator as link } from "./selectors/link";

export const Q = {
	attr,
	exists,
	html,
	list,
	text,
	select,
	count,
	link
};

