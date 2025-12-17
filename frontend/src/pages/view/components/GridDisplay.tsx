import React from 'react';
import Word from './Word';
import Rule from './Rule';
// "@" has been set up as an alias for frontend/src
import { getWords } from '@/services/api';
import { getRules } from '@/services/api';
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
    // the new data has been fetched yet
    const [dataMode, setDataMode] = React.useState(mode);
    const [dataLang, setDataLang] = React.useState(mode);

    // this React effect fetches the data for the given lang every time lang or mode changes
    React.useEffect(() => {
        // pick the right function to fetch data
        let fetchData: any;
        if (mode == "words") fetchData = getWords;
        else if (mode == "rules") fetchData = getRules;
        else {
            console.error(`GridDisplay received invalid mode "${mode}"`);
            return;
        }
        
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
            })
        // The "cleanup function" is returned before the call to getWords even finishes since getWords is async.
        // The purpose of the cleanup function is to prevent race conditions by disabling this call of the React 
        // effect if it becomes "stale", i.e. if the effect is called again or this component is removed before 
        // the first call finishes. It will only be called if either of these events happens. 
        return () => { mounted = false; }
    }, [mode, lang]) // specify that this should be called when mode or lang changes

    // jsx
    return ( <div className="grow p-8">
        {dataMode === mode && dataLang === lang
            ? <div className="grid gap-4 grid-cols-[repeat(auto-fit,250px)] mx-auto">
                {data.map((datum, i) => {
                    // "as" keyword asserts that, based on previous logic, the argument must have the right type. Suppresses warnings.
                    if (mode == "words") return <Word key={i} word={datum as wordType} />
                    else if (mode == "rules") return <Rule key={i} rule={datum as ruleNormType} />
                })}
            </div>
            : <p>Loading...</p>}

    </div> );
}

