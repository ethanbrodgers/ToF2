import React from 'react';
import Rule from './Rule';
import { ruleNormType } from '@/types';
import { getRules } from '@/services/api';

/**
 * Shows the grammar rules for the current language.
 * 
 * @param {Object} props - component props
 * @param {string} [props.lang] - The ISO code for the language that the displayed norms should have
 */
export default function Grammar({lang}: {lang: string}) {
    // rules state variable
    const [rules, setRules]: [Array<ruleNormType>, (value: ruleNormType[]) => void] = React.useState([]);

    // this React effect fetches the rules for the given lang every time lang changes
    React.useEffect(() => {
        // if the cleanup function (see below) is called, mounted will become false,
        // rendering this call of the React effect ineffective (no pun intended)
        let mounted = true;
        // fetch rules
        getRules(lang)
            // set rules if this call of the React effect is still mounted
            .then(newRules => {
                if (mounted) setRules(newRules);
            })
            // error handling
            .catch((e) => {
                console.error(`Error loading grammar rules for lang=${lang}:`, e);
                if (mounted) setRules([]);
            })
        // The "cleanup function" is returned before the call to getRules even finishes since getRules is async.
        // The purpose of the cleanup function is to prevent race conditions by disabling this call of the React 
        // effect if it becomes "stale", i.e. if the effect is called again (due to lang changing) or this 
        // component is removed before the first call finishes. It will only be called if either of these events 
        // happens. 
        return () => { mounted = false; }
    }, [lang]) // specify that this should be called when lang changes

    return ( <div>
        <p>Grammar</p>
        {/* {rules.map(rule => <p key={rule._id}>{rule.title}</p>)} */}
        {rules.map((rule, i) => <Rule rule={rule} key={i} />)}
    </div> );
}




