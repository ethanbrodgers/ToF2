import React from 'react';
import { useAddWord } from '@/services/useQueries';
import AddWordInput from './AddWordInput';
import AddWordSelect from './AddWordSelect';
import AddWordNotice from './AddWordNotice';

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
 * @param {string} props.lang - The state variable representing the language
 * being viewed on the view page
 * @param {Function} props.setLang - The state mutator function that sets
 * the language being viewed on the view page. Usage example: setLang("es");
 */
export default function AddWordPanel({lang, setLang}: {lang: string, setLang: Function}) {
    // state var: expanded
    const [expanded, setExpanded] = React.useState(false);
    // state var: word to add
    const [toAdd, setToAdd] = React.useState(defaultWord);
    console.log(toAdd);
    // state vars: add word
    const { mutate: addWord, isPending, isError, error, isSuccess } = useAddWord();
    // state var: notice to display
    const [notice, setNotice]: [{
        type: "loading" | "error" | "success", text: string, key?: any
    }, Function] = React.useState(null);
    // makes and displays a new notice
    function makeNotice(type: "loading" | "error" | "success", text: string) {
        setNotice({type, text, key: Date.now()});
    }

    // executes plus button functionality
    function plusButtonFunc() {
        // if collapsed: expand
        if (!expanded) {
            setExpanded(true);
        } else {
            // else, attempt to add word
            if (toAdd.en && toAdd.targ) {
                addWord(toAdd, {
                    // function to run when added successfully
                    onSuccess: () => {
                        makeNotice("success", "Word added")
                    },
                    // function to run when error
                    onError: (error) => {
                        makeNotice("error", `Error adding word: ${error.message}`);
                    }
                });
                // key: Date.now() makes this notice unique from any identical notice that might be
                // created afterward. Important for making the fading behavior work properly.
                makeNotice("loading", "Loading...")
            }
            else {
                console.error("Tried to add invalid word");
                makeNotice("error", "Word must have English and Target");
            }
        }
    }

    // modifies a field of toAdd. Usage example: setToAddField({targ: "perro""});
    function setToAddField(obj) {
        setToAdd({...toAdd, ...obj});
    }

    return ( <div className="w-full">
        {/* expandable */}
        <div className="bg-gray-200 overflow-hidden transition-all border-3 border-gray-500 border-t-0" style={{
            height: (expanded) ? "400px" : "0"
        }}>
            <div className="flex h-full items-stretch">
                {/* enter-fields panel */}
                <div className="flex-1 relative p-4 pt-0">
                    {/* header */}
                    <div className="flex gap-2 items-baseline mx-auto w-fit">
                        <p className="text-5xl">Add a</p>
                        <AddWordSelect field="lang" header={true} setToAddField={setToAddField} options={{
                            "Spanish": "es",
                            "French": "fr",
                            "Chinese": "zh",
                            "Russian": "ru"
                        }} stateVar={lang} setStateVar={setLang} />
                        <p className="text-5xl">word</p>
                    </div>

                    {/* other fields */}
                    <AddWordInput display="Special instructions" />
                    <div className="flex justify-between">
                        <AddWordInput field="en" display="English" setToAddField={setToAddField} defaultVal={null} />
                        <AddWordInput field="targ" display="Target" setToAddField={setToAddField} defaultVal={null} />
                    </div>
                    <div className="flex justify-between">
                        <AddWordInput field="def" display="Definition" setToAddField={setToAddField} defaultVal="[None provided]" />
                        <AddWordInput field="desc" display="Description" setToAddField={setToAddField} defaultVal="[None provided]" />
                    </div>
                    <div className="flex justify-between">
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
                        <AddWordSelect field="gender" display="Gender" setToAddField={setToAddField} options={{
                            "None": null,
                            "Masculine": "m",
                            "Feminine": "f",
                            "Neuter": "n"
                        }} />
                        <AddWordInput field="trans" display="Transliteration" setToAddField={setToAddField} defaultVal={null} />
                    </div>
                    
                    
                    
                    
                    {/* ex */}
                    
                    {/* notice display */}
                    <div className="absolute bottom-0 left-0 h-8">
                        {notice && <AddWordNotice type={notice.type} key={notice.key}>{notice.text}</AddWordNotice>}
                    </div>
                </div>

                {/* see-completions panel */}
                <div className="flex-1 p-4">
                    <p>[See completions goes here]</p>
                </div>
            </div>

        </div>


        {/* big plus button (and x button) */}
        <div className="relative">
            <button
                className="w-full p-6 bg-green-400 block text-3xl cursor-pointer"
                onClick={plusButtonFunc}
            >+</button>
            { expanded && <button
                className="absolute left-0 top-0 w-[84px] h-[84px] text-3xl p-6 bg-red-400 cursor-pointer"
                onClick={() => {setExpanded(false)}}
            >X</button> }
        </div>
        
        
    </div> );
}

