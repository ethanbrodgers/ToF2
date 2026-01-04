import React from 'react';
import AddCardNote from './AddCardNote';
import { ruleNormType } from '@/types';

/**
 * A component that allows the user to add, edit, and remove notes from
 * a rule or norm
 * 
 * @param {Object} props - object props
 * @param {ruleNormType} props.toAdd - the state variable holding the word/rule/norm to add
 * from AddCardPanel
 * @param {Function} props.setToAdd - the mutator for toAdd
 */
export default function AddCardNotesList({toAdd, setToAdd}: {toAdd: ruleNormType, setToAdd: Function}) {
    return ( <div>
        <p>Notes:</p>
        <div className="h-24 min-h-0 overflow-y-auto border-l-2 border-gray-500">
            {toAdd.notes.map((note, i) => <AddCardNote toAdd={toAdd} setToAdd={setToAdd} index={i} key={i} />)}
        </div>
        <button
            className="bg-blue-400 w-6 h-6 cursor-pointer"
            onClick={() => {
                setToAdd({
                    ...toAdd,
                    notes: [...toAdd.notes, ""]
                })
            }}
        >+</button>

    </div> );
}
