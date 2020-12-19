import { AnySelector } from "./selectors";
import { ListOf, AnyControl } from "./controls";

export interface Query {
    [prop: string]: Query | AnySelector | AnyControl;
}

export interface SelectorResultType {
    text: string;
    attr: string;
    count: number;
    html: string;
    exist: boolean;
}

export type QueryOf<Q extends AnySelector | ListOf<any> | Query> = {
    0: Q extends AnySelector ? SelectorResultType[Q["type"]] : never;
    1: Q extends ListOf<infer T> ? QueryOf<T>[] : never;
    2: Q extends Query ? {
        [prop in keyof Q]: QueryOf<Q[prop]>
    }: never;
}[Q extends AnySelector ? 0
    : Q extends ListOf<any> ? 1
    : Q extends Query ? 2 : boolean];
