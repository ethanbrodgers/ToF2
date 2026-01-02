import React from 'react';

/**
 * Creates a text input for use in the add-word/rule/norm feature
 * 
 * @param {Object} props - object props
 * @param {string} [props.field] - the field in the word that this input should modify,
 * ex. "targ". This input will not modify the given word if this is not provided.
 * @param {string} props.display - the user-friendly name for this input, ex. "Target"
 * @param {string | null} [props.value] - the value this input should take. Tie this to a
 * state variable to programatically change the value of this input.
 * @param {Function} [props.setValue] - the mutator to change props.value when this input's value
 * is modified manually. Must accept the value of this input as the first argument.
 * @param {Function} [props.setToAddField] - the state-mutator function that changes a field
 * of the current word/rule/norm to add. Only required if props.field is provided.
 * Usage example: setToAddField({targ: "perro"});
 * @param {any} [props.defaultVal] - (optional) the value to set the given field to if the value of
 * this input is empty (""). Set to "" by default
 */
export default function AddCardInput({field, display, value, setValue, setToAddField, defaultVal=""}: {field?: string, display: string, value?: string | null, setValue?: Function, setToAddField?: Function, defaultVal?: any}) {
    return ( <div>
        <p className="inline mr-2">{display}:</p>
        <input className="inline border-b" type="text" value={(value === null) ? "" : value} onChange={(event) => {
            if (field) setToAddField({
                [field]: (event.target.value.length > 0) ? event.target.value : defaultVal
            });
            if (setValue) setValue(event.target.value);
        }} />
    </div> );
}


