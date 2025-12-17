/*
types.ts
This file contains TypeScript types for commonly used schemas.
Please import them and use them to check your typing in any files that take advantage of these objects.
Feel free to add any types that will be used in more than one file. Changing a preexisting type might not be the best idea, though.
*/

export type wordType = {
    _id: string,
    lang: string,
    en: string,
    targ: string,
    def: string,
    pos: "n" | "p" | "v" | "adj" | "adv" | "c" | "i" | "q",
    gender: "m" | "f" | "n" | null,
    trans: string | null,
    desc: {
        text: Array<string>,
        ex: Array<{
            en: string,
            targ: string
        }>
    }
}

// Since rules and norms store the exact same fields, they'll be represented by the same type
export type ruleNormType = {
    _id: string,
    title: string,
    lang: string,
    def: string,
    notes: Array<string>,
    ex: Array<{
        en: string,
        targ: string,
        positive: boolean
    }>
}
