import React from 'react';
import Card from '@/components/Card';
import ExSentence from './ExSentence';
import { ruleNormType } from '@/types';
import { useDeleteRule } from '@/services/useQueries';

/**
 * Displays a rule from user data on the view page. If the rule has an _id, a delete
 * icon is rendered via Card and wired to the delete mutation.
 * 
 * @param {Object} props - component props
 * 
 * @param {ruleNormType} props.rule - the rule to be displayed, following the rule schema
 */
export default function Rule({ rule }: {rule: ruleNormType, key?: any}) {
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

    const { mutate: deleteRule } = useDeleteRule();

    return ( <Card details={details} onDelete={rule._id ? () => {deleteRule(rule._id)} : undefined}>
        <div className="w-full h-full flex justify-center items-center">
            <p className="text-center p-2">{rule.title}</p>
        </div>
    </Card> );
}
