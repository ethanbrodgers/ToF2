import React from 'react';
import Option from './Option';

/*
The collapsable options menu
setLang: state modifier for language
*/
export default function OptionsBar({langOptions, setLang, modeOptions, setMode}: {langOptions: any, setLang: any, modeOptions: any, setMode: any}) {
    return ( <div className="bg-slate-200 transition-all duration-150 relative w-5 hover:w-[600px]">
        <div className="overflow-hidden">
            {/* language */}
            <Option
                displayText="Language"
                options={langOptions}
                setOption={setLang}
            />
            {/* mode / data type */}
            <Option
                displayText="Data type"
                options={modeOptions}
                setOption={setMode}
            />
        </div>
        {/* icon to make it clear this is expandable */}
        <img src="/arrow-right.png" alt="expand arrow icon" className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-20" />
    </div> );
}