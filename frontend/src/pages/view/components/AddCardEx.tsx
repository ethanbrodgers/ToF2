import React from 'react';

/**
 * Represents an example sentence while adding a piece of user data. Lets the user
 * set the fields or delete the sentence.
 * 
 * @param {Object} props - object props
 * 
 * @param {Object} props.toAdd - the state variable holding the word/rule/norm to add
 * from AddCardPanel
 * @param {Function} props.setToAdd - the mutator for toAdd
 */
export default function AddCardEx({toAdd, setToAdd, index}: {toAdd: Object, setToAdd: Function, index: number, key?: any}) {
    const [positive, setPositive] = React.useState(true);

    return ( <div className="flex gap-3 m-2">
        <button
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
                setToAdd({
                    ...toAdd,
                    ex: [...toAdd.ex.slice(0, index), ...toAdd.ex.slice(index + 1)]
                });
            }}
        >
            <img src="/trash.jpg" alt="trash icon" className="h-full w-full" />
        </button>
        <p>English:</p>
        <input
            type="text"
            className="border-b"
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
            className="border-b"
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
        <p>Positive:</p>
        <button
            className="w-6 h-6 border cursor-pointer"
            onClick={() => {
                setToAdd({
                    ...toAdd,
                    ex: toAdd.ex.map(
                        (oldSentence, i) => (i === index)
                            ? {...oldSentence, positive: !positive}
                            : oldSentence
                    )
                });
                setPositive(!positive);
            }}
        >{positive ? "✔" : "✘"}</button>
    </div> );
}
