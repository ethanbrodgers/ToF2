import React from 'react';
import Option from './OptionsBar-components/Option';

/*
The collapsable options menu
setLang: state modifier for language
*/
export default function OptionsBar({langOptions, setLang, modeOptions, setMode}: {langOptions: any, setLang: any, modeOptions: any, setMode: any}) {
    const [expanded, setExpanded] = React.useState(false);

    // event handlers for expand-on-hover feature
    function onMouseEnter(e) {
        setExpanded(true);
    }
    function onMouseLeave(e) {
        // checks for positive x position because some browsers have a little border to the left of the website, and hovering over this border (x < 0) triggers onMouseLeave
        if (e.clientX >= 0) setExpanded(false);
    }
    return ( <div className="bg-slate-200 transition-all duration-150 relative" style={{
        width: (expanded) ? "600px" : "20px"
    }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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