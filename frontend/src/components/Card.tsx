import React from 'react'


// possible attributes of word to display
enum display { DEF = "definition", DESC = "description" };


/**
 * This component represents an expandable card display, which can be used to display
 * words, rules, norms, or passages.
 * 
 * @param {Object} props - Component props
 * @param {Array<React.ReactNode>} [props.tags] - An optional array of JSX elements that will be displayed as tags. 
 * Intended to display things like gender and part of speech of a word. There will be no tag display section if 
 * this is not provided.
 * @param {Array<{icon: string, content: React.ReactNode}>} [props.details] - An optional array of objects representing
 * more information on the data displayed on this card. The icon field should hold an emoji used in a selection
 * bar, and the content field should store JSX that displays the desired information.
 * @param {boolean} [props.expanded] - Whether or not this card should be expanded. Usually linked to a state
 * variable.
 * @param {Function} [props.onClick] - A function to call when the main body of this Card (not the expandable
 * part) is clicked. 
 * @param {Function} [props.onDelete] - Optional delete handler. When provided, a trash icon is shown in the
 * expandable section (aligned with the tags row) and invokes this callback when clicked.
 * @param {React.ReactNode} props.children - The element that will be shown on the front of the card.
 */
export default function Card(
    {
        tags=[], 
        details=[],
        expanded: expandedProp,
        onClick, 
        onDelete,
        children
    }: {
        tags?: Array<React.ReactNode>,
        details?: Array<{icon: string, content: React.ReactNode}>,
        expanded?: boolean,
        onClick?: Function,
        onDelete?: Function,
        children: React.ReactNode
    }
) {
    // ==== state ====

    // expandedState: the main way to track whether Card is expanded. Will always be trumped by expandedProp when the latter is set.
    const [expandedState, setExpandedState] = React.useState(false);
    const toggleExpandedState = () => { setExpandedState(!expandedState) };

    // expanded: whether this component should actually expand. Considers both expandedProp and expandedState.
    const expanded = (expandedProp === undefined) ? expandedState : expandedProp;

    // index of detail being displayed
    const [detailInd, setDetailInd] = React.useState(0);

    // ==== JSX ====
    return ( <div className="w-[250px] m-3 mx-5 bg-white">

        {/* flashcard */}
        <div className="relative w-full h-[150px] border-2 border-gray-600 font-bold italic text-black cursor-pointer" onClick={() => {
            toggleExpandedState();
            if (onClick) onClick();
        }}>
            {children}
        </div>
        
        {/* expandable */}
        {expanded && <div className="border-2 border-gray-600 border-t-0">

            {/* tags */}
            {(tags.length > 0 || onDelete) && (
                <div className="flex items-center justify-between p-2 border-b-2 border-gray-600">
                    <div className="flex gap-2">
                        {tags.map(
                            (tag, i) => <div key={i}>{tag}</div>
                        )}
                    </div>
                    {onDelete && (
                        <img
                            src="/trash.svg"
                            alt="trash icon"
                            className="w-5 h-5 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(); // even though Card.tsx has no knowledge of what is passed in, the function was created with knowledge of the object and _id it should delete
                            }}
                        />
                    )}
                </div>
            )}

            {/* options bar of info to view, ex. definition */}
            {details.length > 0 && <div>
                <div className="flex justify-around px-2 py-1 border-b-2 border-gray-600 text-xl bg-amber-600">
                    {details.map((detail, i) => <p 
                        className="cursor-pointer"
                        onClick={() => setDetailInd(i)} key={i}
                    >  
                        {detail.icon}
                    </p>)}
                </div>
                {details[detailInd].content}
            </div>}
        </div>}
    </div> );
}
