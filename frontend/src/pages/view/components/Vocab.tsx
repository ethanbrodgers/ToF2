import React from 'react';
import Word from './Word';
// "@" has been set up as an alias for frontend/src
import { getWords } from '@/services/api';
import { wordType } from '@/types';

/*
Displays vocabulary words for current language if activated
lang: 2-letter language code
 */
export default function Vocab({lang}: {lang: any}) {
    const [words, setWords]: [Array<wordType>, Function] = React.useState([]);

    // called right after first render and all changes of prop lang
    React.useEffect(() => {
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
    return ( <div className="grow p-8">
        <h1>Vocabulary</h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,250px)] mx-auto">
            {words.map((word, i) => (
                <Word key={i} word={word} />
            ))}
        </div>
    </div> );
}