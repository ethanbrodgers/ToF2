import React from 'react';

/**
 * Creates a text input for use in the add-word/rule/norm feature
 * 
 * @param {Object} props - object props
 * @param {string} props.field - the field in the word that this input should modify,
 * ex. "targ"
 * @param {string} props.display - the user-friendly name for this input, ex. "Target"
 * @param {Function} props.setToAddField - the state-mutator function that changes a field
 * of the current word/rule/norm to add. Usage example: setToAddField({targ: "perro"});
 * @param {any} [props.defaultVal] - (optional) the value to set the given field to if the value of
 * this select is empty (""). Set to "" by default
 */
export default function AddWordInput({field, display, setToAddField, defaultVal=""}: {field: string, display: string, setToAddField: Function, defaultVal?: any}) {
    return ( <div>
        <p className="inline mr-2">{display}:</p>
        <input className="inline border-b" type="text" onChange={(event) => {
            setToAddField({
                [field]: (event.target.value.length > 0) ? event.target.value : defaultVal
            });
        }} />
    </div> );
}


