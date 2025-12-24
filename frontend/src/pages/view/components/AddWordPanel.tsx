import React from 'react';
import { useAddWord } from '@/services/useQueries';
import AddWordInput from './AddWordInput';
import AddWordSelect from './AddWordSelect';

const defaultWord = {
    lang: "es",
    en: null,
    targ: null,
    def: "[None provided]",
    pos: "n",
    gender: null,
    trans: null,
    desc: "[None provided]",
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
    console.log(toAdd);
    // state vars: add word
    const { mutate: addWord } = useAddWord();

    // executes plus button functionality
    function plusButtonFunc() {
        // if collapsed: expand
        if (!expanded) {
            setExpanded(true);
        } else {
            // else, attempt to add word
            if (toAdd.en && toAdd.targ)
                addWord(toAdd);
            else
                console.log("Tried to add invalid word");
        }
    }

    // modifies a field of toAdd. Usage example: setToAddField({targ: "perro""});
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
                "Spanish": "es",
                "French": "fr",
                "Chinese": "zh",
                "Russian": "ru"
            }}/>
            <AddWordSelect field="pos" display="Part of speech" setToAddField={setToAddField} options={{
                "Noun": "n",
                "Pronoun": "p",
                "Verb": "v",
                "Adjective": "adj",
                "Adverb": "adv",
                "Connector": "c",
                "Interjection": "i",
                "Quantifier": "q"
            }} />
            <AddWordInput field="en" display="English" setToAddField={setToAddField} defaultVal={null} />
            <AddWordInput field="targ" display="Target" setToAddField={setToAddField} defaultVal={null} />
            <AddWordInput field="def" display="Definition" setToAddField={setToAddField} defaultVal="[None provided]" />
            <AddWordSelect field="gender" display="Gender" setToAddField={setToAddField} options={{
                "None": null,
                "Masculine": "m",
                "Feminine": "f",
                "Neuter": "n"
            }} />
            <AddWordInput field="trans" display="Transliteration" setToAddField={setToAddField} defaultVal={null} />
            <AddWordInput field="desc" display="Description" setToAddField={setToAddField} defaultVal="[None provided]" />
            {/* ex */}
            

        </div>

        {/* big plus button */}
        <button
            className="w-96 p-6 mx-auto bg-green-400 block text-3xl cursor-pointer"
            onClick={plusButtonFunc}
        >+</button>
        
    </div> );
}

