import { Attr } from './selectors/attr';
import { Exists } from './selectors/exists';
import { Html } from './selectors/html';
import { List } from './selectors/list';
import { Select } from './selectors/select';
import { Text } from './selectors/text';

export type QueryData = {
    [property: string]: QueryType
};

export type QueryType = Attr
	| Exists
	| Html
	| List<any>
	| Select<any>
	| Text;

export type GetTypeFromQueryType<Q extends QueryType> = Q["convert"] extends (data: any) => infer R
	? R
	: Q["convert"]

export type GetTypeFromQuery<Q extends QueryData> = {
	[P in keyof Q]: GetTypeFromQueryType<Q[P]>
};
