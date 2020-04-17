import { AnySelector } from "./selectors";
import { ListType, AnyControl } from "./controls";

export interface Query {
    [prop: string]: Query | AnySelector | AnyControl;
}

export interface SelectorResultType {
    text: string;
    attr: string;
    count: number;
    html: string;
    exists: boolean;
}

export type TypeOfQuery<Q extends AnySelector | ListType<any> | Query> = {
    0: Q extends AnySelector ? SelectorResultType[Q["type"]] : never;
    1: Q extends ListType<infer T> ? TypeOfQuery<T>[] : never;
    2: Q extends Query ? {
        [prop in keyof Q]: TypeOfQuery<Q[prop]>
    }: never;
}[Q extends AnySelector ? 0
    : Q extends ListType<any> ? 1
    : Q extends Query ? 2 : boolean];
