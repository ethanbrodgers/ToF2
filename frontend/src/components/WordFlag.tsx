import React from 'react';

/*
In Word.tsx: displays gender or part of speech of the word
attr: "gender" or "pos" ("pos" = part of speech)
val:
    for attr="gender": "m", "f", or "n"
    for attr="pos":
        "n" for noun
        "pro" for pronoun
        "v" for verb
        "adj" for adjective
        "adv" for adverb
        "c" for connector
        "i" for interjection
        "q" for quantifier
*/

// the text for each value
const textMap = {
    gender: {
        m: "masc",
        f: "fem",
        n: "neut"
    },
    pos: {
        n: "noun",
        pro: "pronoun",
        v: "verb",
        adj: "adjective",
        adv: "adverb",
        c: "connector",
        i: "interjection",
        q: "quantifier"
    }
}

// the color for each value as a tailwind class
const colorMap = {
    gender: {
        m: "bg-blue-500",
        f: "bg-pink-500",
        n: "bg-gray-500"
    },
    pos: {
        n: "bg-blue-300",
        pro: "bg-blue-400",
        v: "bg-orange-500",
        adj: "bg-yellow-500",
        adv: "bg-green-500",
        c: "bg-white",
        i: "bg-orange-400",
        q: "bg-purple-500"
    }
}

export default function WordFlag({attr, val}) {
    const text = textMap[attr][val];
    const color = colorMap[attr][val];
    return ( <p
        className={`w-min rounded-xl border border-gray-600 px-1 ${color}`}
    >
        {text}
    </p> );
}
