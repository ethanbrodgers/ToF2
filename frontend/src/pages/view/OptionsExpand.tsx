import React from 'react';

/*
The button used to expand and collapse the options menu

setParentExpanded: the state modifier function for the parent's boolean expanded state
*/
export default function OptionsExpand({setParentExpanded}: {setParentExpanded: any}) {
    const [expanded, setExpanded] = React.useState(false);
    function toggleExpanded() {
        setParentExpanded(!expanded);        
        setExpanded(!expanded);
    }
    return ( <button onClick={toggleExpanded} className="absolute -right-10 w-10">
        <img
            src={(expanded) ? "/arrow-left.png" : "/arrow-right.png"} 
            alt={(expanded) ? "Collapse" : "Expand"} 
        />
    </button> );
}
