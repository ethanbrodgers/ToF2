import React, { useEffect, useState } from 'react';
import Word from './Word';
import { getWords } from '../data/dataset';

/*
Displays vocabulary words for current language if activated
Show: whether to display. Set to true when viewing vocabulary and false otherwise
lang: 2-letter language code
 */
export default function Vocab({show, lang}: {show: any, lang: any}) {
    const [words, setWords] = useState([]);

    // called right after first render and all changes of prop lang
    useEffect(() => {
        // avoid race condition: var mounted prevents two calls of this func from running at once
        let mounted = true;
        getWords(lang)
            .then(result => {
                if (!mounted) return;
                setWords(result || []);
            })
            .catch(err => {
                console.error('Failed to load words for', lang, err);
                if (mounted) setWords([]);
            });
        return () => { mounted = false; };
    }, [lang]);

    // jsx
    return ( <div className="grow p-8" style={{
        display: show ? "block" : "none"
    }}>
        <h1>Vocabulary</h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,250px)] mx-auto">
            {words.map((word, i) => (
                <Word key={i} word={word} />
            ))}
        </div>
    </div> );
}