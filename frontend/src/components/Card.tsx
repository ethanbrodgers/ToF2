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
 * @param {React.ReactNode} props.children - The element that will be shown on the front of the card.
 */
export default function Card(
    {
        tags=[], 
        details=[], 
        children
    }: {
        tags?: Array<React.ReactNode>,
        details?: Array<{icon: string, content: React.ReactNode}>,
        children: React.ReactNode
    }
) {
    // state
    const [expanded, setExpanded] = React.useState(false);
    const toggleExpanded = () => { setExpanded(!expanded) };
    // index of detail being displayed
    const [detailInd, setDetailInd] = React.useState(0);

    return ( <div className="w-[250px] m-3 mx-5">

        {/* flashcard */}
        <div className="w-full h-[150px] border-2 border-gray-600 font-bold italic text-black cursor-pointer" onClick={toggleExpanded}>
            {children}
        </div>
        
        {/* expandable */}
        {expanded && <div className="border-2 border-gray-600 border-t-0">

            {/* tags */}
            {tags.length > 0 && <div className="flex p-2 gap-2 border-b-2 border-gray-600">
                {tags.map(
                    (tag, i) => <div key={i}>{tag}</div>
                )}
            </div>}

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
