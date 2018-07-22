export type ConvertFn<R> = (data: string) => R;

export type QueryData = {
    [property: string]: QueryType
};

export type QueryType = Text<ConvertFn<any>>
	| Attr<ConvertFn<any>>
	| Html<ConvertFn<any>>
	| Exists
	| List<any>
	| If<any, any>;

export type Text<C extends ConvertFn<any>> = {
	// --- Internal ---
	type: "TEXT";
	convert: C;
	// ---Additional---
	selector: string;
};

export type Attr<C extends ConvertFn<any>> = {
    // --- Internal
	type: "ATTR";
	convert: C;
    // ---Additional
	attribute: string;
	selector: string;
};

export type Html<C extends ConvertFn<any>> = {
	// --- Internal ---
	type: "HTML";
	convert: C;
	// ---Additional---
	selector: string;
};

export type List<T extends object> = {
	// --- Internal ---
	type: "LIST";
	convert: Array<T>;
	// ---Additional---
	selector: string;
	data: QueryData;
};

export type If<Q1 extends QueryType, Q2 extends QueryType> = {
	// --- Internal ---
	type: "IF",
	convert: Q1 | Q2;
	// ---Additional---
	condition: (el: Cheerio) => boolean,
	truthy: Q1,
	falsey: Q2
	// selector: string;
}

export type Exists = {
	// --- Internal ---
	type: "EXISTS",
	convert: boolean,
	// ---Additional---
	selector: string;
}
