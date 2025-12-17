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

    // this React effect fetches the words for the given lang every time lang changes
    React.useEffect(() => {
        // if the cleanup function (see below) is called, mounted will become false,
        // rendering this call of the React effect ineffective (no pun intended)
        let mounted = true;
        // fetch rules
        getWords(lang)
            // set rules if this call of the React effect is still mounted
            .then(newWords => {
                if (mounted) setWords(newWords);
            })
            // error handling
            .catch((e) => {
                console.error(`Error loading vocabulary words for lang=${lang}:`, e);
                if (mounted) setWords([]);
            })
        // The "cleanup function" is returned before the call to getWords even finishes since getWords is async.
        // The purpose of the cleanup function is to prevent race conditions by disabling this call of the React 
        // effect if it becomes "stale", i.e. if the effect is called again or this component is removed before 
        // the first call finishes. It will only be called if either of these events happens. 
        return () => { mounted = false; }
    }, [lang]) // specify that this should be called when lang changes

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