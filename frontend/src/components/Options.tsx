import React from 'react';
import OptionsExpand from './OptionsExpand';
import Option from './Option';
import options from '../data/options';

/*
The collapsable options menu
setLang: state modifier for language
*/
export default function Options({setLang}) {
    const [expanded, setExpanded] = React.useState(false);

    return ( <div className="bg-slate-200 transition-all duration-150 relative" style={{
        width: (expanded) ? "600px" : "0"
    }}>
        <OptionsExpand setParentExpanded={setExpanded} />
        <div className="overflow-hidden">
            {Object.entries(options).map(
                ([key, val], i) => <Option
                    displayText={val.display}
                    options={val.options}
                    setOption={key == "lang" ? setLang : console.log}
                    key={i}    
                />
            )}
        </div>
    </div> );
}