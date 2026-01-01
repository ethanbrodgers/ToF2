import React from 'react';
import OptionsExpand from './OptionsExpand';
import Option from './Option';

/*
The collapsable options menu
setLang: state modifier for language
*/
export default function OptionsBar({langOptions, setLang, modeOptions, setMode}: {langOptions: any, setLang: any, modeOptions: any, setMode: any}) {
    const [expanded, setExpanded] = React.useState(false);

    return ( <div className="bg-slate-200 transition-all duration-150 relative" style={{
        width: (expanded) ? "600px" : "0"
    }}>
        <OptionsExpand setParentExpanded={setExpanded} />
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
    </div> );
}