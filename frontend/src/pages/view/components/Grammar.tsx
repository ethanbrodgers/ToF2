import React from 'react';
import { ruleNormType } from '@/types';
import { getRules } from '@/services/api';

/**
 * Shows the grammar rules for the current language.
 * 
 * @param {string} lang - The ISO code for the language that the displayed norms should have
 */
export default function Grammar({lang}: {lang: string}) {
    // rules state variable
    const [rules, setRules]: [Array<ruleNormType>, (value: ruleNormType[]) => void] = React.useState([]);

    // this React effect fetches the words for the given lang every time lang changes
    React.useEffect(() => {
        getRules(lang)
        .then(setRules)
    }, [lang])

    return ( <div>
        <p>{lang} Grammar goes here</p>
        {rules.map(rule => <p key={rule._id}>{rule.title}</p>)}
    </div> );
}




