import React from 'react';
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png"

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
            src={(expanded) ? arrowLeft : arrowRight} 
            alt={(expanded) ? "Collapse" : "Expand"} 
        />
    </button> );
}
