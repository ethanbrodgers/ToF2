import React from 'react';
import OptionEntry from './OptionEntry';


/*
A single option parameter in the options menu, ex. language

displayText: the name of the option to be displayed, ex. "Language"
options: an object of the format { "optionValueHere": { display: "optionDisplayNameHere"} }
    ex. { "es": { display: "Spanish" } }
setOption: the state modifier function for this setting
*/
export default function Option(
    {
        displayText,
        options,
        setOption,
        key
    }: {
        displayText: any,
        options: {
            [key: string]: {
                display: string
            }
        },
        setOption: any,
        key?: any
    }
) {
    return ( <div className="m-6">
        <p className="text-xl">{displayText}</p>
        <div className="flex gap-5">
            {Object.entries(options).map(
                ([key, val], i) => <OptionEntry val={key} setOption={setOption} key={i}>{val.display}</OptionEntry>
            )}
        </div>
    </div> );
}