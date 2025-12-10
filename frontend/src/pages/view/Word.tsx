import React from 'react';
import WordDefDisplay from "./WordDefDisplay";
import WordDescDisplay from "./WordDescDisplay";
import WordFlag from "./WordFlag";

import { wordType } from '../../types';

/*
Displays a word and all relevant data in Vocab
word: see word schema
*/

// possible attributes of word to display
enum display { DEF = "definition", DESC = "description" };


export default function Word({word}: {word: wordType}) {
    // state
    const [expanded, setExpanded] = React.useState(false);
    const toggleExpanded = () => { setExpanded(!expanded) };
    const [displaying, setDisplaying] = React.useState(display.DEF);

    // jsx
    return ( <div className="w-[250px] m-3 mx-5">
        
        {/* flashcard */}
        <div className="w-full h-[150px] p-7 border-2 border-gray-600 flex flex-col justify-between items-center font-bold italic text-black relative cursor-pointer" onClick={toggleExpanded}>
            <img src="flashcard-slash.png" className="absolute w-full h-full left-0 top-0 -z-1" />
            <p className="w-full">{word.en}</p>
            <p className="w-full text-right">{word.target}</p>
        </div>

        {/* expandable */}
        {expanded && <div className="border-2 border-gray-600 border-t-0">
            {/* flags */}
            <div className="flex p-2 gap-2">
                {word.pos && <WordFlag attr="pos" val={word.pos} />}
                {word.gender && <WordFlag attr="gender" val={word.gender} />}
            </div>

            {/* options bar of info to view, ex. definition */}
            <div className="flex justify-around px-2 py-1 border-y-2 border-gray-600 text-xl bg-amber-600">
                {/* definition */}
                <p 
                    className="cursor-pointer"
                    onClick={() => setDisplaying(display.DEF)} key="0"
                >  
                    📖
                </p>
                {/* description */}
                <p 
                    className="cursor-pointer"
                    onClick={() => setDisplaying(display.DESC)} key="1"
                >
                    💬
                </p>
            </div>

            {/* definition display */}
            {displaying == display.DEF && <WordDefDisplay>{word.def}</WordDefDisplay>}

            {/* description display */}
            {displaying == display.DESC && <WordDescDisplay>{word.desc}</WordDescDisplay>}   
        </div>}
    </div> );
}

