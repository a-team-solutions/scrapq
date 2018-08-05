import { Attr } from './selectors/attr';
import { Exists } from './selectors/exists';
import { Html } from './selectors/html';
import { List } from './selectors/list';
import { Select } from './selectors/select';
import { Text } from './selectors/text';
import { If } from './controls/if';

export type Query = {
    [property: string]: Selector;
};

export type Selector = Attr
	| Exists
	| Html
	| List<any>
	| Select<any>
	| Text
	| If<any, any>;

export type TypeOfSelector<Q extends Selector> = Q["convert"] extends (data: any) => infer R
	? R
	: Q["convert"]

export type TypeOfQuery<Q extends Query> = {
	[P in keyof Q]: TypeOfSelector<Q[P]>
};

export type TypeOf<Q extends Query | Selector> = Q extends Query
	? TypeOfQuery<Q>
	: Q extends Selector
		? TypeOfSelector<Q>
		: never;
