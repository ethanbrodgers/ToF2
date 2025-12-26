import React from 'react';

/**
 * Creates a select element for use in the add-word/rule/norm feature
 * 
 * @param {Object} props - object props
 * @param {string} props.field - the field in the word that this input should modify,
 * ex. "targ"
 * @param {boolean} [props.header] - whether or not the field text will be header-sized.
 * Defaults to false.
 * @param {string} [props.display] - the user-friendly name for this input, ex. "Target"
 * @param {Function} props.setToAddField - the state-mutator function that changes a field
 * of the current word/rule/norm to add. Usage example: setToAddField({targ: "perro"});
 * @param {Object} props.options - the options displayed in the select. Formatted as
 * an object where keys are the internal values (ex. "es") and values are the display text
 * (ex. "Spanish")
 */
export default function AddWordInput({field, header=false, display, setToAddField, options}: {field: string, header?: boolean, display?: string, setToAddField: Function, options: Object}) {
    return ( <div>
        {display && <p className="inline mr-2">{display}:</p>}
        <select className={`inline border-b ${(header) ? "text-5xl" : ""}`} onChange={(event) => {
            setToAddField({[field]: event.target.value});
        }}>
            {Object.entries(options).map(([display, val], i) => 
                <option value={val} key={i}>{display}</option>)}
        </select>
    </div> );
}