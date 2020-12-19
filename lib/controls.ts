import { AnySelector } from "./selectors";
import { Query } from "./helpers";

export interface ControlTypes<Q> {
    list: Array<Q>;
}

// EXPORTS

export interface ListOf<Q extends AnySelector | AnyControl | Query> {
    type: "list";
    select: string;
    query: Q;
}

export type AnyControl = ListOf<any>;

// DSL

export function list<Q extends Query | AnyControl | AnySelector>(selector: string, query: Q): ListOf<Q> {
    return {
        type: "list",
        select: selector,
        query
    };
}
