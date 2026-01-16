import { wordType } from '@/types';
import Card from '@/components/Card'
import WordFlag from "./WordFlag";
import ExSentence from './ExSentence';
import { useDeleteWord } from '@/services/useQueries';

/**
 * Displays a word from user data on the view page. If the word has an _id, a delete
 * icon is rendered via Card and wired to the delete mutation.
 * 
 * @param {Object} props - component props
 * 
 * @param {wordType} props.word - the word to be displayed, following the word schema
 * @param {boolean} [props.expanded] - whether or not this Word should be expanded. Usually
 * tied to a state variable.
 * @param {Function} [props.onClick] - A function to call when the main body of this Card (not the expandable
 * part) is clicked. 
 */
export default function Word({word, expanded, onClick}: {word: wordType, expanded?: boolean, onClick?: Function, key?: any}) {
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
            <p>{word.desc}</p>
            <p>Examples:</p>
            {word.ex.map((ex: any, i: number) =>
                <ExSentence key={i}>{ex}</ExSentence>
            )}
        </div> }
    ]

    // en/targ display (the part with the slash that shows even when collapsed)
    const enTargDisplay = <div className="w-full h-full p-7 flex flex-col justify-between items-center relative">
        <img src="flashcard-slash.png" className="absolute w-full h-full left-0 top-0" />
        <p className="w-full z-1">{word.en}</p>
        <p className="w-full text-right  z-1">{word.targ}</p>
    </div>

    // draw out mutate function as callback and rename it
    const { mutate: deleteWord } = useDeleteWord(); 

    // ==== jsx ====
    return ( <Card tags={tags} details={details} expanded={expanded} onClick={onClick} onDelete={word._id ? () => deleteWord(word._id) : undefined}>
        {enTargDisplay}
    </Card> );
}
