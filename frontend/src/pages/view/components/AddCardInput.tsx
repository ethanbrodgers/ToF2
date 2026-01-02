import React from 'react';

/**
 * Creates a text input for use in the add-word/rule/norm feature
 * 
 * @param {Object} props - object props
 * @param {string} [props.field] - the field in the word that this input should modify,
 * ex. "targ". This select will not modify the given word if this is not provided.
 * @param {string} props.display - the user-friendly name for this input, ex. "Target"
 * @param {string | null} [props.value] - the value this input should take. Tie this to a
 * state variable to programatically change the value of this input.
 * @param {Function} [props.setToAddField] - the state-mutator function that changes a field
 * of the current word/rule/norm to add. Only required if props.field is provided.
 * Usage example: setToAddField({targ: "perro"});
 * @param {any} [props.defaultVal] - (optional) the value to set the given field to if the value of
 * this select is empty (""). Set to "" by default
 */
export default function AddCardInput({field, display, value, setToAddField, defaultVal=""}: {field?: string, display: string, value?: string | null, setToAddField?: Function, defaultVal?: any}) {
    return ( <div>
        <p className="inline mr-2">{display}:</p>
        <input className="inline border-b" type="text" value={(value === null) ? "" : value} onChange={(event) => {
            if (field) setToAddField({
                [field]: (event.target.value.length > 0) ? event.target.value : defaultVal
            });
        }} />
    </div> );
}


