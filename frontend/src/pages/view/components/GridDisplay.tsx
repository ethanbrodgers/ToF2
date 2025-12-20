import React from 'react';
import Word from './Word';
import Rule from './Rule';
import Norm from './Norm';
// "@" has been set up as an alias for frontend/src
import { useWords, useRules, useNorms } from '@/services/useQueries';
import { wordType } from '@/types';
import { ruleNormType } from '@/types';




/**
 * Displays user data, such as words and rules, in a grid with a responsive number of columns
 * 
 * @param {Object} props - component props
 * 
 * @param {str} props.mode - What kind of data is displayed. Possible values: "words", "rules"
 * 
 * @param {str} props.lang - the ISO language code for the target language to display
 */
export default function GridDisplay({mode, lang}: {mode: string, lang: string}) {
    // ==== get data ====

    // call all hooks (React requires the hook calls to be the same every time)
    const queryResults = {
        words: useWords(lang),
        rules: useRules(lang),
        norms: useNorms(lang)
    }

    // handle non-implemented mode
    const implementedModes = ["words", "rules", "norms"]
    if (!(implementedModes.includes(mode))) {
        console.error(`GridDisplay received non-implemented mode "${mode}"`);
        return <p>Mode "{mode}" not implemented</p>
    }
    
    // state variable: stores array of words, rules, etc.
    const { data, isLoading, isError, error } = queryResults[mode];



    // ==== jsx ====
    // error
    if (isError) {
        console.error("error in GridDisplay:", error);
        return <p className="text-red-400">Error ({error.name || "[no name]"}): {error.message || "[no message]"}</p>
    }
    // loading
    else if (isLoading) {
        return <p>Loading...</p>
    }
    // display
    else {
        return <div className="grid w-full gap-4 grid-cols-[repeat(auto-fit,250px)] mx-auto">
            {data?.map((datum, i) => {
                // "as" keyword asserts that, based on previous logic, the argument must have the right type. Suppresses warnings.
                if (mode === "words") return <Word key={i} word={datum as wordType} />
                else if (mode === "rules") return <Rule key={i} rule={datum as ruleNormType} />
                else if (mode === "norms") return <Norm key={i} norm={datum as ruleNormType} />
            })}
        </div>
    }
}
