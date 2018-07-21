export type ConvertFn<R> = (data: string) => R;

export type QueryData = {
    [property: string]: Text<ConvertFn<any>>
        | Attr<ConvertFn<any>>
		| Html<ConvertFn<any>>
		| Exists
        | List<any>;
};

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

export type List<T extends object> = {
	// --- Internal ---
	type: "LIST";
	convert: Array<T>;
	// ---Additional---
	selector: string;
	data: QueryData;
};

export type Html<C extends ConvertFn<any>> = {
	// --- Internal ---
	type: "HTML";
	convert: C;
	// ---Additional---
	selector: string;
};


export type Exists = {
	// --- Internal ---
	type: "EXISTS",
	convert: boolean,
	// ---Additional---
	selector: string;
}
