import React from 'react';
import Word from './Word';
import Rule from './Rule';
import Norm from './Norm';
// "@" has been set up as an alias for frontend/src
import { getWords, getRules, getNorms } from '@/services/api';
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
    // state variable: stores array of words, rules, etc.
    const [data, setData]: [Array<wordType | ruleNormType>, Function] = React.useState([]);
    // Track which mode/lang the current data belongs to: may not be the same as the mode prop because of the
    // React effect (see below). These state vars help avoid trying to render data with a new mode/lang before
    // the new data has been fetched yet. This is still a pretty bad design; we might
    // start using a library called TanStack to do things like this for us.
    const [dataMode, setDataMode] = React.useState(mode);
    const [dataLang, setDataLang] = React.useState(mode);

    // whether the given mode even exists
    let modeImplemented = true;

    // pick the right function to fetch data
    let fetchData: any;
    if (mode === "words") fetchData = getWords;
    else if (mode === "rules") fetchData = getRules;
    else if (mode === "norms") fetchData = getNorms;
    else {
        // mode not implemented
        console.error(`GridDisplay received non-implemented mode "${mode}"`);
        modeImplemented = false;
    }

    // this React effect fetches the data for the given lang every time lang or mode changes
    React.useEffect(() => {
        if (!modeImplemented) return;

        // if the cleanup function (see below) is called, mounted will become false,
        // rendering this call of the React effect ineffective (no pun intended)
        let mounted = true;
        // fetch data
        fetchData(lang)
            // set data if this call of the React effect is still mounted
            .then(newData => {
                if (mounted) {
                    setData(newData);
                    // let the component know that the data now has the right mode/lang
                    setDataMode(mode);
                    setDataLang(lang);
                }
            })
            // error handling
            .catch((e) => {
                console.error(`Error loading user data for mode=${mode}, lang=${lang}:`, e);
                if (mounted) setData([]);
                setDataMode(mode);
                setDataLang(lang);
            })
        // The "cleanup function" is returned before the call to getWords even finishes since getWords is async.
        // The purpose of the cleanup function is to prevent race conditions by disabling this call of the React 
        // effect if it becomes "stale", i.e. if the effect is called again or this component is removed before 
        // the first call finishes. It will only be called if either of these events happens. 
        return () => { mounted = false; }
    }, [mode, lang]) // specify that this should be called when mode or lang changes

    // jsx
    return ( <div className="grow p-8">
        {/* check whether current mode is even implemented */}
        {modeImplemented 
            // check whether data isn't stale
            ? ( mode === dataMode && lang === dataLang
                // display data
                ? <div className="grid gap-4 grid-cols-[repeat(auto-fit,250px)] mx-auto">
                    {data.map((datum, i) => {
                        // "as" keyword asserts that, based on previous logic, the argument must have the right type. Suppresses warnings.
                        if (mode === "words") return <Word key={i} word={datum as wordType} />
                        else if (mode === "rules") return <Rule key={i} rule={datum as ruleNormType} />
                        else if (mode === "norms") return <Norm key={i} norm={datum as ruleNormType} />
                    })}
                </div>
                // loading screen
                : <p>Loading...</p> )
            // "not implemented" screen
            : <p>Mode "{mode}" not implemented</p>
        }
    </div> );
}

