import React from 'react';
import AddCardEx from './AddCardEx';

/**
 * A component that allows the user to add, edit, and remove example sentences from
 * a piece of user data
 * 
 * @param {Object} props - object props
 * @param {Object} props.toAdd - the state variable holding the word/rule/norm to add
 * from AddCardPanel
 * @param {Function} props.setToAdd - the mutator for toAdd
 */
export default function AddCardExList({toAdd, setToAdd}: {toAdd: Object, setToAdd: Function}) {
    console.log("toAdd", toAdd)

    return ( <div>
        <p>Example sentences:</p>
        {toAdd.ex.map((sentence, i) => <AddCardEx toAdd={toAdd} setToAdd={setToAdd} index={i} key={i} />)}
        <button
            className="bg-blue-400 w-6 h-6 cursor-pointer"
            onClick={() => {
                setToAdd({
                    ...toAdd,
                    ex: [...toAdd.ex, {en: "", targ: "", positive: true}]
                })
            }}
        >+</button>

    </div> );
}
