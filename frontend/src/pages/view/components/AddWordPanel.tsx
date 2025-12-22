import React from 'react';
import { useAddWord } from '@/services/useQueries';
import AddWordInput from './AddWordInput';
import AddWordSelect from './AddWordSelect';

const defaultWord = {
    lang: "es",
    en: "",
    targ: "",
    def: "",
    pos: "n",
    gender: null,
    trans: null,
    desc: "",
    ex: []
}

/**
 * The panel that allows you to add a word.
 * Visible as a plus button when collapsed, and clicking the
 * collapsed button reveals a panel where you enter the fields
 * of the data you want to add.
 * 
 * @param {Object} props - object props
 */
export default function AddWordPanel() {
    // state var: expanded
    const [expanded, setExpanded] = React.useState(false);
    // state var: word to add
    const [toAdd, setToAdd] = React.useState(defaultWord);
    // state vars: add word
    const { mutate: addWord } = useAddWord();

    // executes plus button functionality
    function plusButtonFunc() {
        // if collapsed: expand
        if (!expanded) {
            setExpanded(true);
        } else {
            // else, add word and collapse
            addWord(toAdd);
            setExpanded(false);
        }
    }

    // modifies a field of toAdd. Usage example: setToAddField({targ: "perro"});
    function setToAddField(obj) {
        setToAdd({...toAdd, ...obj});
    }

    return ( <div className="w-full">
        {/* expandable */}
        <div className="bg-gray-200 overflow-hidden transition-all" style={{
            height: (expanded) ? "500px" : "0"
        }}>
            <p className="text-5xl">Add a word</p>
            <AddWordSelect field="lang" display="Language" setToAddField={setToAddField} options={{
                es: "Spanish",
                fr: "French",
                zh: "Chinese",
                ru: "Russian"
            }} />
            <AddWordSelect field="pos" display="Part of speech" setToAddField={setToAddField} options={{
                n: "Noun",
                p: "Pronoun",
                v: "Verb",
                adj: "Adjective",
                adv: "Adverb",
                c: "Connector",
                i: "Interjection",
                q: "Quantifier"
            }} />
            <AddWordInput field="en" display="English" setToAddField={setToAddField} />
            <AddWordInput field="targ" display="Target" setToAddField={setToAddField} />
            <AddWordInput field="def" display="Definition" setToAddField={setToAddField} />
            <AddWordSelect field="gender" display="Gender" setToAddField={setToAddField} options={{
                "": "None",
                m: "Masculine",
                f: "Feminine",
                n: "Neuter"
            }} />
            <AddWordInput field="trans" display="Transliteration" setToAddField={setToAddField} />
            <AddWordInput field="desc" display="Description" setToAddField={setToAddField} />
            {/* ex */}
            

        </div>

        {/* big plus button */}
        <button
            className="w-96 p-6 mx-auto bg-green-400 block text-3xl cursor-pointer"
            onClick={plusButtonFunc}
        >+</button>
        
    </div> );
}

