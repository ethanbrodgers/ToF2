import React from 'react';
import Word from './Word';
import { getWords } from '../data/dataset';

/*
Displays vocabulary words for current language if activated
Show: whether to display. Set to true when viewing vocabulary and false otherwise
lang: 2-letter language code
 */
export default function Vocab({show, lang}) {
    return ( <div className="grow p-8" style={{
        display: show ? "block" : "none"
    }}>
        <h1>Vocabulary</h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,250px)] mx-auto">
            {getWords(lang).map((word, i) => <Word key={i} word={word} />)}
        </div>
    </div> );
}