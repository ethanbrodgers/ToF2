import React from 'react';
import Card from '@/components/Card';
import ExSentence from './ExSentence';
import { ruleNormType } from '@/types';

/**
 * Displays a rule from user data on the view page.
 * 
 * @param {Object} props - component props
 * 
 * @param {ruleNormType} props.rule - the rule to be displayed, following the rule schema
 */
export default function Rule({rule, key}: {rule: ruleNormType, key?: any}) {
    const details = [
        { icon: "📖", content: <div>
            <p>Definition:</p>
            <p>{rule.def}</p>
        </div> },
        { icon: "📌", content: <div>
            <p>Notes:</p>
            {rule.notes.map((note, i) => <p key={i}>- {note}</p>)}
        </div> },
        { icon: "💬", content: <div>
            <p>Example sentences:</p>
            {rule.ex.map((ex, i) => <ExSentence key={i}>{ex}</ExSentence>)}
        </div> }
    ]

    return ( <Card details={details}>
        <div className="w-full h-full flex justify-center items-center">
            <p>{rule.title}</p>
        </div>
    </Card> );
}
