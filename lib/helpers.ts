import { AnySelector, SelectorTypes } from "./selectors";
import { ListType, AnyControl } from "./controls";

export interface Query {
    [prop: string]: Query | AnySelector | AnyControl;
}

export type GetResult<Q extends AnySelector | ListType<any> | Query> = {
    0: Q extends AnySelector ? SelectorTypes[Q["type"]] : never;
    1: Q extends ListType<infer T> ? GetResult<T>[] : never;
    2: Q extends Query ? {
        [prop in keyof Q]: GetResult<Q[prop]>
    }: never;
}[Q extends AnySelector ? 0
    : Q extends ListType<any> ? 1
    : Q extends Query ? 2 : boolean];
