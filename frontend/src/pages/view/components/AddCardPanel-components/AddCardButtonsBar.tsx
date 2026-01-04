import React from 'react';

/**
 * The bottom button bar of the add-card panel. Contains the main action button
 * (expand/add/lookup) and utility buttons (close, partial add).
 * 
 * @param {Object} props - component props
 * @param {boolean} props.expanded - whether the add-card panel is expanded
 * @param {Function} props.setExpanded - setter for expanded
 * @param {string} props.toAddStatus - status of the data being added ("empty", "partial", "incomplete", "complete")
 * @param {Function} props.addData - function to add the current word/rule/norm
 * @param {Function} props.lookupData - function to lookup completions
 * @param {boolean} props.lookupPending - whether a lookup is in progress
 * @param {string} props.instructions - special instructions for AI
 * @param {Function} props.clearFields - function to clear all input fields
 * @param {Function} props.clearLookup - function to clear lookup results
 */
export default function AddCardButtonsBar({
    expanded,
    setExpanded,
    toAddStatus,
    addData,
    lookupData,
    lookupPending,
    instructions,
    clearFields,
    clearLookup
}: {
    expanded: boolean,
    setExpanded: Function,
    toAddStatus: string,
    addData: Function,
    lookupData: Function,
    lookupPending: boolean,
    instructions: string,
    clearFields: Function,
    clearLookup: Function
}) {
    return ( <div className="relative">
        {/* big green button (expand or add word) */}
        {(!expanded || (toAddStatus === "complete")) &&
            <button
                className="w-full p-6 block text-3xl cursor-pointer bg-green-400"
                onClick={() => {
                    if (expanded) addData();
                    else setExpanded(true);
                }}
            >+</button>
        }
        {/* big blue button (lookup) */}
        {(expanded && (toAddStatus === "incomplete" || toAddStatus === "partial" || (toAddStatus === "empty" && instructions !== ""))) &&
            <button
                className="w-full p-6 block text-3xl cursor-pointer bg-blue-400"
                onClick={lookupData}
            >{lookupPending ? "Lookup [in progress]" : "Lookup"}</button>
        }
        {/* big gray button (no action available) */}
        {(expanded && (toAddStatus === "empty" && instructions === "")) &&
            <button
                className="w-full p-6 block text-3xl bg-gray-500"
            >Add data to look up</button>
        }

        {/* little buttons */}
        {expanded && <div className="absolute left-0 top-0">
            {/* X button */}
            <button
                className="w-[84px] h-[84px] text-3xl p-6 bg-red-400 cursor-pointer"
                onClick={() => {
                    setExpanded(false);
                    clearFields();
                    clearLookup();
                }}
            >X</button>
            {/* little + button: to add a partial word/rule/norm with some nonessential fields missing */}
            {toAddStatus === "partial" && <button
                className="w-[84px] h-[84px] text-3xl p-6 bg-green-400 cursor-pointer"
                onClick={addData}
            >+</button> }
        </div>}
    </div> );
}
