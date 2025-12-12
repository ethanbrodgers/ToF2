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
