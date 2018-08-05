import { Attr } from './selectors/attr';
import { Exists } from './selectors/exists';
import { Html } from './selectors/html';
import { List } from './selectors/list';
import { Select } from './selectors/select';
import { Text } from './selectors/text';
import { Count } from './selectors/count';

export type Query = {
    [property: string]: Selector | Query;
};

export type Selector = Attr
	| Exists
	| Html
	| List<any>
	| Select<any>
	| Text
	| Count;

export type TypeOfSelector<Q extends Selector> = Q["convert"] extends (data: any) => infer R
	? R
	: Q["convert"]

export type TypeOfQuery<Q extends Query> = {
	[P in keyof Q]: Q[P] extends Selector
		? TypeOfSelector<Q[P]>
		: Q[P] extends Query
			? TypeOfQuery<Q[P]>
			: never
};

export type TypeOf<Q extends Query | Selector> = Q extends Query
	? TypeOfQuery<Q>
	: Q extends Selector
		? TypeOfSelector<Selector>
		: never;

export function isSelector(q: Query | Selector): q is Selector {
	return !!q.type;
}
