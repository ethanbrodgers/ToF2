import React from 'react';
import { wordType } from '@/types';
import { useAddWord, useLookupWord, useAddRule, useAddNorm } from '@/services/useQueries';
import AddCardInput from './AddCardInput';
import AddCardSelect from './AddCardSelect';
import AddCardNotice from './AddCardNotice';
import AddCardExList from './AddCardExList';
import AddCardNotesList from './AddCardNotesList';
import Word from './Word';


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
 * The panel that allows you to add a card (a word, rule, or norm).
 * Visible as a plus button when collapsed, and clicking the
 * collapsed button reveals a panel where you enter the fields
 * of the data you want to add.
 * 
 * @param {Object} props - object props
 * @param {string} props.lang - The state variable representing the language
 * being viewed on the view page
 * @param {Function} props.setLang - The state mutator function that sets
 * the language being viewed on the view page. Usage example: setLang("es");
 * @param {string} props.mode - The state variable representing the type of data
 * (words, rules, norms) being viewed on the view page
 * @param {Function} props.setMode - The state mutator function that sets
 * the type of data being viewed on the view page. Usage example: setMode("words");
 */
export default function AddCardPanel({lang, setLang, mode, setMode}: {lang: string, setLang: Function, mode: string, setMode: Function}) {
    // ==== state vars ====

    // state var: expanded
    const [expanded, setExpanded] = React.useState(false);
    // state var: word/rule/norm to add
    const [toAdd, setToAdd] = React.useState(DEFAULTS[mode]);
    toAdd.lang = lang;
    // state var: addData, adds word/rule/norm to backend
    const mutateResults = {
        words: useAddWord(),
        rules: useAddRule(),
        norms: useAddNorm()
    }
    const { mutate: addData } = mutateResults[mode];
    // state var: lookup word
    const { mutate: lookupWord, data: lookupWordResult } = useLookupWord();
    const defaultLookupWordResult: Array<{desc: string, word: wordType}> = [
        {
            desc: "Lawyer — the professional/legal sense; formal and used in legal contexts. Feminine form avocate; distinguishes from the fruit sense by context and by feminine form for people.",
            word: {
                def: "A legal professional who represents or advises clients in legal matters and in court.",
                desc: "Refers to the profession. Feminine form avocate is commonly used for women. Can appear with titles (un avocat, l'avocat de la défense).",
                en: "lawyer",
                ex: [
                    {en: 'He is a lawyer.', positive: true, targ: 'Il est avocat.'},
                    {en: 'She works as a lawyer at a large firm.', positive: true, targ: 'Elle travaille comme avocate dans un grand cabinet.'}
                ],
                gender: "m",
                lang: "fr",
                pos: "n",
                targ: "avocat",
                trans: null
            }
        },
        {
            desc: "Avocado — the fruit sense; culinary contexts. Same spelling but different meaning; always masculine and distinguished from the profession by context.",
            word: {
                def: "A green, creamy fruit commonly used in salads, spreads, and cooking.",
                desc: "Used for the fruit in culinary contexts. Never takes the feminine occupational form (avocate). Plural (les avocats) may be ambiguous without context.",
                en: "avocado",
                ex: [
                    {en: 'The avocado soup is ready.', positive: true, targ: 'La soupe d\'avocat est prète.'}
                ],
                gender: "m",
                lang: "fr",
                pos: "n",
                targ: "avocat",
                trans: null
            }
        }
    ]
    // state var: notice to display
    const [notice, setNotice]: [{
        type: "loading" | "error" | "success", text: string, key?: any
    }, Function] = React.useState(null);
    // effect to switch toAdd value to match a change in mode
    React.useEffect(() => {
        setToAdd(DEFAULTS[mode])
    }, [mode]);
    


    // ==== helper functions ====

    // makes and displays a new notice
    function makeNotice(type: "loading" | "error" | "success", text: string) {
        setNotice({type, text, key: Date.now()});
    }

    // executes plus button functionality (expand, add data, or lookup word)
    function plusButtonFunc() {
        // if collapsed: expand
        if (!expanded) {
            setExpanded(true);
        } else if (false) {
            // else if word is complete, attempt to add
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
                    makeNotice("error", "Rule must have title");
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
        } else {
            lookupWord({desc: "", word: toAdd});
            console.log("called lookupWord...")
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
                <div className="flex-1 relative p-4 pt-0 min-h-0 overflow-y-auto">
                    {/* header */}
                    <div className="flex gap-2 items-baseline mx-auto w-fit">
                        <p className="text-5xl">Add a</p>
                        <AddCardSelect header={true} options={{
                            "Spanish": "es",
                            "French": "fr",
                            "Chinese": "zh",
                            "Russian": "ru"
                        }} stateVar={lang} setStateVar={setLang} />
                        <AddCardSelect header={true} options={{
                            "Word": "words",
                            "Rule": "rules",
                            "Norm": "norms"
                        }} stateVar={mode} setStateVar={setMode} />
                    </div>

                    {/* word/rule/norm fields */}
                    {/* word fields (make sure data is actually a word by checking en field)*/}
                    {(mode === "words" && "en" in toAdd) ? <div>
                        <AddCardInput display="Special instructions" />
                        <div className="flex justify-between">
                            <AddCardInput field="en" display="English" setToAddField={setToAddField} defaultVal={null} />
                            <AddCardInput field="targ" display="Target" setToAddField={setToAddField} defaultVal={null} />
                        </div>
                        <div className="flex justify-between">
                            <AddCardInput field="def" display="Definition" setToAddField={setToAddField} defaultVal="[None provided]" />
                            <AddCardInput field="desc" display="Description" setToAddField={setToAddField} defaultVal="[None provided]" />
                        </div>
                        <div className="flex justify-between">
                            <AddCardSelect field="pos" display="Part of speech" setToAddField={setToAddField} options={{
                                "Noun": "n",
                                "Pronoun": "p",
                                "Verb": "v",
                                "Adjective": "adj",
                                "Adverb": "adv",
                                "Connector": "c",
                                "Interjection": "i",
                                "Quantifier": "q"
                            }} />
                            <AddCardSelect field="gender" display="Gender" setToAddField={setToAddField} options={{
                                "None": null,
                                "Masculine": "m",
                                "Feminine": "f",
                                "Neuter": "n"
                            }} />
                            <AddCardInput field="trans" display="Transliteration" setToAddField={setToAddField} defaultVal={null} />
                        </div>
                        <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
                    </div>
                    // rule fields (make sure data is actually a rule by checking title field)
                    : (mode === "rules" && "title" in toAdd) ? <div>
                        <AddCardInput field="title" display="Title" setToAddField={setToAddField} defaultVal={null} />
                        <AddCardInput field="def" display="Definition" setToAddField={setToAddField} defaultVal="[None provided]" />
                        <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
                        <AddCardNotesList toAdd={toAdd} setToAdd={setToAdd} />
                    </div>
                    // norm fields (make sure data is actually a norm by checking title field)
                    : (mode === "norms" && "title" in toAdd) ? <div>
                        <AddCardInput field="title" display="Title" setToAddField={setToAddField} defaultVal={null} />
                        <AddCardInput field="def" display="Definition" setToAddField={setToAddField} defaultVal="[None provided]" />
                        <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
                        <AddCardNotesList toAdd={toAdd} setToAdd={setToAdd} />
                    </div>
                    : <p>Mode not implemented: "{mode}"</p>}
                    
                    
                    {/* notice display */}
                    <div className="absolute bottom-0 left-0 h-8">
                        {notice && <AddCardNotice type={notice.type} key={notice.key}>{notice.text}</AddCardNotice>}
                    </div>
                </div>

                {/* see-completions panel */}
                <div className="flex-1 p-4">
                    {(lookupWordResult || defaultLookupWordResult).map((opt, i) => <div key={i} className="flex">
                        <p>{opt.desc}</p>
                        <div className="shrink-0">
                            <Word word={opt.word}></Word>
                        </div>
                        {console.log(lookupWordResult)}
                    </div>)}
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

