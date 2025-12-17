import React from 'react';
import OptionsExpand from './OptionsExpand';
import Option from './Option';

/*
The collapsable options menu
setLang: state modifier for language
*/
export default function OptionsBar({langOptions, setLang, viewOptions, setView}: {langOptions: any, setLang: any, viewOptions: any, setView: any}) {
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
            {/* view */}
            <Option
                displayText="View"
                options={viewOptions}
                setOption={setView}
            />
        </div>
    </div> );
}