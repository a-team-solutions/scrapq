interface CountType {
    type: "count";
    select: string;
}

interface TextType {
    type: "text";
    select: string;
}

interface AttrType {
    type: "attr";
    select: string;
    attr: string;
}

interface HtmlType {
    type: "html";
    select: string;
}

interface ExistsType {
    type: "exists",
    select: string;
}

// EXPORTS

export type AnySelector = TextType | AttrType | CountType | HtmlType | ExistsType;

// DSL

export function attr(selector: string, attribute: string): AttrType {
    return {
        type: "attr",
        select: selector,
        attr: attribute
    }
}

export function text(selector: string): TextType {
    return {
        type: "text",
        select: selector
    };
}

export function count(selector: string): CountType {
    return {
        type: "count",
        select: selector
    };
}

export function html(selector: string): HtmlType {
    return {
        type: "html",
        select: selector
    };
}

export function exists(selector: string): ExistsType {
    return {
        type: "exists",
        select: selector
    };
}
