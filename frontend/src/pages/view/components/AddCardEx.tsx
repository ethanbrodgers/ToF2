import React from 'react';

/**
 * Represents an example sentence while adding a piece of user data
 * 
 * @param {Object} props - object props
 * 
 * @param {Object} props.toAdd - the state variable holding the word/rule/norm to add
 * from AddCardPanel
 * @param {Function} props.setToAdd - the mutator for toAdd
 */
export default function AddCardEx({toAdd, setToAdd, index}: {toAdd: Object, setToAdd: Function, index: number, key?: any}) {

    return ( <div>
        <p>English:</p>
        <input
            type="text"
            value={toAdd.ex[index].en}
            onChange={e => {
                setToAdd({
                    ...toAdd,
                    ex: toAdd.ex.map(
                        (oldSentence, i) => (i === index)
                            ? {...oldSentence, en: e.target.value}
                            : oldSentence
                    )
                })
            }}    
        />
        <p>Target:</p>
        <input
            type="text"
            value={toAdd.ex[index].targ}
            onChange={e => {
                setToAdd({
                    ...toAdd,
                    ex: toAdd.ex.map(
                        (oldSentence, i) => (i === index)
                            ? {...oldSentence, targ: e.target.value}
                            : oldSentence
                    )
                })
            }}    
        />
    </div> );
}
