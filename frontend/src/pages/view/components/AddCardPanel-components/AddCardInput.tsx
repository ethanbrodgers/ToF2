import React from 'react';

/**
 * Creates a text input for use in the add-word/rule/norm feature
 * 
 * @param {Object} props - object props
 * @param {string} props.display - the user-friendly name for this input, ex. "Target"
 * @param {string | null} [props.value] - the value this input should take. Tie this to a
 * state variable to programatically change the value of this input. Can be null.
 * @param {Function} [props.setValue] - the mutator to change props.value when this input's value
 * is modified manually. Must accept the value of this input as the first argument.
 * @param {any} [props.blankValue] - the value to set the given field to if the value of
 * this input is empty (""). Set to "" by default.
 */
export default function AddCardInput({display, value, setValue, blankValue}: {display: string, value?: any, setValue?: Function, blankValue?: any}) {
    return ( <div>
        <p className="inline mr-2">{display}:</p>
        <input className="inline border-b" type="text" value={(value === null) ? "" : value} onChange={(event) => {
            if (setValue) setValue((event.target.value === "") ? blankValue : event.target.value);
        }} />
    </div> );
}


