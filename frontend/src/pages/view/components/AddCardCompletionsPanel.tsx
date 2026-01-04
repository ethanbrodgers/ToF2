import React from 'react';
import Word from './Word';

/**
 * The right half of the add-card panel. Displays AI-generated completions
 * for the word/rule/norm being added.
 * 
 * @param {Object} props - component props
 * @param {boolean} props.lookupPending - whether a lookup is currently in progress
 * @param {Array<{desc: string, word: wordType}>} props.lookupWordResult - array of lookup results from AI
 * @param {Array<{desc: string, word: wordType}>} props.defaultLookupWordResult - default/example results
 * @param {number | null} props.expandedCompletion - index of the currently expanded completion, or null
 * @param {Function} props.setExpandedCompletion - setter for expandedCompletion
 * @param {Function} props.setToAdd - setter for toAdd, called when a completion is clicked
 */
export default function AddCardCompletionsPanel({
    lookupPending,
    lookupWordResult,
    defaultLookupWordResult,
    expandedCompletion,
    setExpandedCompletion,
    setToAdd
}: {
    lookupPending: boolean,
    lookupWordResult: Array<{desc: string, word: any}> | undefined,
    defaultLookupWordResult: Array<{desc: string, word: any}>,
    expandedCompletion: number | null,
    setExpandedCompletion: Function,
    setToAdd: Function
}) {
    return ( <div className="flex-1 p-4 min-h-0 overflow-y-scroll border-l border-gray-500">
        {(lookupPending)
            ? <p>Looking up...</p>
            : (lookupWordResult || defaultLookupWordResult).map((opt, i) => <div key={i} className="flex">
                <p>{opt.desc}</p>
                <div className="shrink-0">
                    <Word word={opt.word} expanded={i === expandedCompletion} onClick={() => {
                        setToAdd(opt.word);
                        setExpandedCompletion((i === expandedCompletion) ? null : i);
                    }} />
                </div>
            </div>)
        }
    </div> );
}
