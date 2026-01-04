import React from 'react';
import {ruleNormType} from '@/types';

/**
 * Represents a note while adding a rule or norm. Lets the user
 * set the text or delete the note.
 * 
 * @param {Object} props - object props
 * 
 * @param {ruleNormType} props.toAdd - the state variable holding the word/rule/norm to add
 * from AddCardPanel
 * @param {Function} props.setToAdd - the mutator for toAdd
 */
export default function AddCardNote({toAdd, setToAdd, index}: {toAdd: ruleNormType, setToAdd: Function, index: number, key?: any}) {
    return ( <div className="flex gap-3 m-2">
        <button
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
                setToAdd({
                    ...toAdd,
                    notes: [...toAdd.notes.slice(0, index), ...toAdd.notes.slice(index + 1)]
                });
            }}
        >
            <img src="/trash.jpg" alt="trash icon" className="h-full w-full" />
        </button>
        <p>Note:</p>
        <input
            type="text"
            className="border-b"
            value={toAdd.notes[index]}
            onChange={e => {
                setToAdd({
                    ...toAdd,
                    notes: toAdd.notes.map(
                        (oldNote, i) => (i === index)
                            ? e.target.value
                            : oldNote
                    )
                })
            }}
        />
    </div> );
}
