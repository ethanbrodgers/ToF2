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
 */
export default function AddWordInput({field, display, setToAddField}: {field: string, display: string, setToAddField: Function}) {
    return ( <div>
        <p className="inline mr-2">{display}:</p>
        <input className="inline border-b" type="text" onChange={(event) => {
            setToAddField({[field]: event.target.value});
        }} />
    </div> );
}


