import React from 'react';

/*
A single option in the options menu, ex. Spanish

children: the text to display, ex. "Spanish"
val: the internal value of this option, ex. "es"
setOption: the state modifier function for this setting
*/
export default function OptionEntry({children, val, setOption, key}: {children: any, val: any, setOption: any, key?: any}) {
    return ( <p
        className="text-green-600 cursor-pointer"
        onClick={() => {setOption(val)}}>
            {children}
        </p> );
}