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
    console.log("toAddNotesList, toAdd:", toAdd)

    return ( <div>
        <p>Notes:</p>
        {toAdd.notes.map((note, i) => <AddCardNote toAdd={toAdd} setToAdd={setToAdd} index={i} key={i} />)}
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
