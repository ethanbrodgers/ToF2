import React from 'react';

/**
 * Creates a select element for use in the add-word/rule/norm feature
 * 
 * @param {Object} props - object props
 * @param {Object} props.options - the options displayed in the select. Formatted as
 * an object where keys are the display text
 * (ex. "Spanish") and values are the internal values (ex. "es"). Designed to handle a desired value
 * of null without erroring.
 * @param {string} [props.display] - the user-friendly name for this select, ex. "Target". Don't include a colon.
 * @param {boolean} [props.header] - whether or not the field text will be header-sized.
 * Defaults to false.
 * @param {string | null} [props.value] - the value this select should take. Use this to make the
 * select controlled. Can be null; the component will correctly handle this case.
 * @param {function} [props.setValue] - setter for props.value. Called on manual change
 * of this select's value. Example: setValue("adj");
 */
export default function AddCardSelect({options, display, header, value, setValue}: {options: Object, display?: string, header?: boolean, value?: string | null, setValue: Function}) {
    // anywhere you see weird clauses with null and "null", that is intended to respond to an attempt to give an
    // option the value of null by instead storing the value "null". Selects can't have value={null}, so we 
    // convert between null and "null" to avoid errors. The connected state variable in the parent component can 
    // still be set to null.
    return ( <div>
        {display && <p className="inline mr-2">{display}:</p>}
        <select
            className={`inline border-b ${(header) ? "text-5xl" : ""}`}
            onChange={(event) => {
                setValue((event.target.value === "null") ? null : event.target.value);
            }}
            value={(value === null) ? "null" : value}
        >
            {Object.entries(options).map(([optDisplay, optVal], i) => 
                <option value={(optVal === null) ? "null" : optVal} key={i}>{optDisplay}</option>)}
        </select>
    </div> );
}