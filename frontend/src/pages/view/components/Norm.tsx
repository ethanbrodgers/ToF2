import React from 'react';
import Card from '@/components/Card';
import ExSentence from './ExSentence';
import { ruleNormType } from '@/types';

/**
 * Displays a norm from user data on the view page.
 * 
 * @param {Object} props - component props
 * 
 * @param {ruleNormType} props.norm - the norm to be displayed, following the norm schema
 */
export default function Norm({ norm }: {norm: ruleNormType, key?: any}) {
    const details = [
        { icon: "📖", content: <div>
            <p>Definition:</p>
            <p>{norm.def}</p>
        </div> },
        { icon: "📌", content: <div>
            <p>Notes:</p>
            {norm.notes.map((note, i) => <p key={i}>- {note}</p>)}
        </div> },
        { icon: "💬", content: <div>
            <p>Example sentences:</p>
            {norm.ex.map((ex, i) => <ExSentence key={i}>{ex}</ExSentence>)}
        </div> }
    ]

    return ( <Card details={details}>
        <div className="w-full h-full flex justify-center items-center">
            <p className="text-center p-2">{norm.title}</p>
        </div>
    </Card> );
}
