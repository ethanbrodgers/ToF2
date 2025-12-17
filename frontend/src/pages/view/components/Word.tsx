import { wordType } from '@/types';
import Card from '@/components/Card'
import WordFlag from "./WordFlag";
import ExSentence from './ExSentence';

/**
 * Displays a word from user data on the view page.
 * 
 * @param {Object} props - component props
 * 
 * @param {wordType} props.word - the word to be displayed, following the word schema
 */
export default function Word({word}: {word: wordType, key?: any}) {
    // ==== create pieces ====

    // tags
    const tags = []
    if (word.pos) tags.push(<WordFlag attr="pos" val={word.pos} />)
    if (word.gender) tags.push(<WordFlag attr="gender" val={word.gender} />)

    // details
    const details = [
        { icon: "📖", content: <div>
            <p>Definition:</p>
            <p>{word.def}</p>
        </div> },
        { icon: "💬", content: <div>
            <p>Description:</p>
            <p>{word.desc.text}</p>
            <p>Examples:</p>
            {word.desc.ex.map((ex: any, i: number) =>
                <ExSentence key={i}>{ex}</ExSentence>
            )}
        </div> }
    ]

    // en/targ display (the part with the slash that shows even when collapsed)
    const enTargDisplay = <div className="w-full h-full p-7 flex flex-col justify-between items-center relative">
        <img src="flashcard-slash.png" className="absolute w-full h-full left-0 top-0 -z-1" />
        <p className="w-full">{word.en}</p>
        <p className="w-full text-right">{word.targ}</p>
    </div>



    // ==== jsx ====
    return ( <Card tags={tags} details={details}>
        {enTargDisplay}
    </Card> );
}

