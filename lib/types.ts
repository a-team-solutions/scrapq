import { Attr } from './selectors/attr';
import { Exists } from './selectors/exists';
import { Html } from './selectors/html';
import { List } from './selectors/list';
import { Select } from './selectors/select';
import { Text } from './selectors/text';

export type Query = {
    [property: string]: Selector
};

export type Selector = Attr
	| Exists
	| Html
	| List<any>
	| Select<any>
	| Text;

export type TypeOfSelector<Q extends Selector> = Q["convert"] extends (data: any) => infer R
	? R
	: Q["convert"]

export type TypeOfQuery<Q extends Query> = {
	[P in keyof Q]: TypeOfSelector<Q[P]>
};
