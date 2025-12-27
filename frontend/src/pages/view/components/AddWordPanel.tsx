import React from 'react';
import { useAddWord, useAddRule, useAddNorm } from '@/services/useQueries';
import AddWordInput from './AddWordInput';
import AddWordSelect from './AddWordSelect';
import AddWordNotice from './AddWordNotice';


// default values for each mode
const DEFAULTS = {
    words: {
        lang: "es",
        en: null,
        targ: null,
        def: "[None provided]",
        pos: "n",
        gender: null,
        trans: null,
        desc: "[None provided]",
        ex: []
    },
    rules: {
        lang: "es",
        title: null,
        def: "[None provided]",
        notes: [],
        ex: []
    },
    norms: {
        lang: "es",
        title: null,
        def: "[None provided]",
        notes: [],
        ex: []
    }
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
 * @param {string} props. - The state variable representing the type of data
 * (words, rules, norms) being viewed on the view page
 * @param {Function} props.setMode - The state mutator function that sets
 * the type of data being viewed on the view page. Usage example: setMode("words");
 */
export default function AddWordPanel({lang, setLang, mode, setMode}: {lang: string, setLang: Function, mode: string, setMode: Function}) {
    // ==== state vars ====

    // state var: expanded
    const [expanded, setExpanded] = React.useState(false);
    // state var: word/rule/norm to add
    const [toAdd, setToAdd] = React.useState(DEFAULTS[mode]);
    toAdd.lang = lang;
    console.log(toAdd);
    // state var: addData, adds word/rule/norm to backend
    const mutateResults = {
        words: useAddWord(),
        rules: useAddRule(),
        norms: useAddNorm()
    }
    const { mutate: addData } = mutateResults[mode];
    // state var: notice to display
    const [notice, setNotice]: [{
        type: "loading" | "error" | "success", text: string, key?: any
    }, Function] = React.useState(null);
    


    // ==== helper functions ====

    // makes and displays a new notice
    function makeNotice(type: "loading" | "error" | "success", text: string) {
        setNotice({type, text, key: Date.now()});
    }

    // executes plus button functionality (expand and add data)
    function plusButtonFunc() {
        // if collapsed: expand
        if (!expanded) {
            setExpanded(true);
        } else {
            // else, attempt to add
            if (mode === "words") {
                if (toAdd.en && toAdd.targ) {
                    addData(toAdd, {
                        // function to run when added successfully
                        onSuccess: () => {
                            makeNotice("success", "Word added")
                        },
                        // function to run when error
                        onError: (error) => {
                            makeNotice("error", `Error adding word: ${error.message}`);
                        }
                    });
                    makeNotice("loading", "Loading...")
                }
                else {
                    console.error("Tried to add invalid word");
                    makeNotice("error", "Word must have English and Target");
                }
            }
            else if (mode === "rules") {
                if (toAdd.title) {
                    addData(toAdd, {
                        // function to run when added successfully
                        onSuccess: () => {
                            makeNotice("success", "Rule added")
                        },
                        // function to run when error
                        onError: (error) => {
                            makeNotice("error", `Error adding rule: ${error.message}`);
                        }
                    });
                    makeNotice("loading", "Loading...")
                }
                else {
                    console.error("Tried to add invalid rule");
                    makeNotice("error", "Word must have title");
                }
            }
            else if (mode === "norms") {
                if (toAdd.title) {
                    addData(toAdd, {
                        // function to run when added successfully
                        onSuccess: () => {
                            makeNotice("success", "Norm added")
                        },
                        // function to run when error
                        onError: (error) => {
                            makeNotice("error", `Error adding norm: ${error.message}`);
                        }
                    });
                    makeNotice("loading", "Loading...")
                }
                else {
                    console.error("Tried to add invalid norm");
                    makeNotice("error", "Norm must have title");
                }
            }
        }
    }

    // modifies a field of toAdd. Usage example: setToAddField({targ: "perro""});
    function setToAddField(obj) {
        setToAdd({...toAdd, ...obj});
    }


    // ==== JSX ====

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
                        <AddWordSelect header={true} options={{
                            "Spanish": "es",
                            "French": "fr",
                            "Chinese": "zh",
                            "Russian": "ru"
                        }} stateVar={lang} setStateVar={setLang} />
                        <AddWordSelect header={true} options={{
                            "Word": "words",
                            "Rule": "rules",
                            "Norm": "norms"
                        }} stateVar={mode} setStateVar={setMode} />
                    </div>

                    {/* word/rule/norm fields */}
                    {(mode === "words") ? <div>
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
                    </div>
                    : (mode === "rules") ? <div>
                        <AddWordInput field="title" display="Title" setToAddField={setToAddField} defaultVal={null} />
                        <AddWordInput field="def" display="Definition" setToAddField={setToAddField} defaultVal="[None provided]" />
                    </div>
                    : (mode === "norms") ? <div>
                        <AddWordInput field="title" display="Title" setToAddField={setToAddField} defaultVal={null} />
                        <AddWordInput field="def" display="Definition" setToAddField={setToAddField} defaultVal="[None provided]" />
                    </div>
                    : <p>Mode not implemented: "{mode}"</p>}
                    
                    
                    
                    
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

