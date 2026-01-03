import React from 'react';

/**
 * Creates a select element for use in the add-word/rule/norm feature
 * 
 * @param {Object} props - object props
 * @param {string} [props.field] - the field in the word that this input should modify,
 * ex. "targ". Pass in if this will edit a word field.
 * @param {boolean} [props.header] - whether or not the field text will be header-sized.
 * Defaults to false.
 * @param {string} [props.display] - the user-friendly name for this select, ex. "Target"
 * @param {string | null} [props.value] - the value this select should take. Tie this to a
 * state variable to programatically change the value of this select.
 * @param {Function} [props.setToAddField] - the state-mutator function that changes a field
 * of the current word/rule/norm to add. Usage example: setToAddField({targ: "perro"}); Pass
 * in if props.field is also passed in.
 * @param {Object} props.options - the options displayed in the select. Formatted as
 * an object where keys are the display text
 * (ex. "Spanish") and values are the internal values (ex. "es"). Designed to handle a desired value
 * of null without erroring.
 * @param {string} [props.stateVar] - A state variable that will be bound to this select. A change
 * in the variable will change the value of the select and vice versa. props.setStateVar is required
 * if this is provided.
 * @param {Function} [props.setStateVar] - The setter function for stateVar. Will be used to link
 * this select's value to the value of the state variable.
 */
export default function AddCardSelect({field, header=false, display, value, setToAddField, options, stateVar, setStateVar}: {field?: string, header?: boolean, display?: string, value?: string | null, setToAddField?: Function, options: Object, stateVar?: string, setStateVar?: Function}) {
    // anywhere you see weird clauses with null and "null", that is intended to respond to an attempt to give an
    // option the value of null by instead storing the value "null". Selects can't have value={null}, so we convert
    // between null and "null" to avoid errors. The connected state variable in the parent component can still be
    // set to null.
    return ( <div>
        {display && <p className="inline mr-2">{display}:</p>}
        <select
            className={`inline border-b ${(header) ? "text-5xl" : ""}`}
            onChange={(event) => {
                if (field) setToAddField({[field]: event.target.value});
                if (stateVar) setStateVar((event.target.value === "null") ? null : event.target.value);
            }}
            value={(value === null) ? "null" : value}
        >
            {Object.entries(options).map(([display, val], i) => 
                <option value={(val === null) ? "null" : val} key={i}>{display}</option>)}
        </select>
    </div> );
}