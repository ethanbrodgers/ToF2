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
        en: "",
        targ: "",
        def: "",
        pos: "",
        gender: "",
        trans: null,
        desc: "",
        ex: []
    },
    rules: {
        title: "",
        def: "",
        notes: [],
        ex: []
    },
    norms: {
        title: "",
        def: "",
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
    // expanded completion index: which word/rule/norm completion is being expanded, used to collapse all others. null for no expanded completion
    const [expandedCompletion, setExpandedCompletion] = React.useState(null);
    // state var: word/rule/norm to add
    const [toAdd, setToAdd] = React.useState(DEFAULTS[mode]);
    toAdd.lang = lang;
    console.log("toAdd", toAdd)
    // special instructions for AI
    const [instructions, setInstructions] = React.useState("");
    // state var: addData, adds word/rule/norm to backend
    const mutateResults = {
        words: useAddWord(),
        rules: useAddRule(),
        norms: useAddNorm()
    }
    const { mutate: addData } = mutateResults[mode];
    // state var: lookup word
    const { mutate: lookupWord, data: lookupWordResult, isPending: lookupWordPending, reset: clearLookupWord } = useLookupWord();
    const lookupPending = (mode === "words" && lookupWordPending);
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

    // pass in the property of some object (ex. missing(toAdd.en)) to see if it is missing.
    // Counts as missing if undefined, empty string, array with no entries or a missing entry,
    // or object with no entries or a missing entry. Recursive. Null does not count as missing.   
    function missing(val: any): boolean {
        if (val === null) return false;
        if (val === undefined || val === "") return true;
        if (typeof val === "string" && val.length === 0) return true;
        if (Array.isArray(val)) {
            if (val.length === 0) return true;
            for (const elem of val) if (missing(elem)) return true;
        }
        if (typeof val === "object") {
            if (Object.entries(val).length === 0) return true;
            for (const [key, subval] of Object.entries(val)) if (missing(subval)) return true;
        }
        return false;
    }

    // makes and displays a new notice
    function makeNotice(type: "loading" | "error" | "success", text: string) {
        setNotice({type, text, key: Date.now()});
    }

    // clears all left-panel fields
    function clearFields() {
        setInstructions("");
        setToAdd(DEFAULTS[mode]);
    }

    // clears all lookup completions, regardless of current mode
    function clearLookup() {
        clearLookupWord()
        setExpandedCompletion(null);
    }

    // looks up current data and displays appropriate notices
    function lookupData() {
        if (mode === "words") {
            lookupWord({desc: instructions, word: toAdd}, {
                // function to run when added successfully
                onSuccess: () => {
                    makeNotice("success", "Lookup complete")
                },
                // function to run when error
                onError: (error) => {
                    makeNotice("error", `Error looking up word: ${error.message}`);
                }
            });
            console.log("called lookupWord...")
            makeNotice("loading", "Loading (typical time: 30sec)");
        }
        else {
            console.error(`Lookup not implemented for mode "${mode}"`);
            makeNotice("error", `Lookup not implemented for mode "${mode}"`);
        }
    }

    // attempts to add the current word/rule/norm and displays corresponding notices
    function attemptAddData() {
        if (mode === "words") {
            if (!missing(toAdd.en) && !missing(toAdd.targ)) {
                addData(toAdd, {
                    // function to run when added successfully
                    onSuccess: () => {
                        makeNotice("success", "Word added");
                        clearFields();
                        clearLookup();
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
            if (!missing(toAdd.title)) {
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
            if (!missing(toAdd.title)) {
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

    // modifies a field of toAdd. Usage example: setToAddField({targ: "perro""});
    function setToAddField(obj) {
        setToAdd({...toAdd, ...obj});
    }


    // ==== Helpful values ====

    // toAdd status: "empty" means not enough information to add or look up, "incomplete" means cannot be added but can be looked up, "partial" means can be added or looked up but missing non-critical fields, "complete" means missing no fields.
    let toAddStatus = "";
    if (mode === "words") {
        if (missing(toAdd.lang) || missing(toAdd.en) || missing(toAdd.targ)) {
            if ((missing(toAdd.en) && missing(toAdd.targ) && missing(toAdd.def) && missing(toAdd.desc) && toAdd.trans == null))
                toAddStatus = "empty";
            else
                toAddStatus = "incomplete";
        }
        else {
            if (missing(toAdd.def) || missing(toAdd.desc) || missing(toAdd.pos) || missing(toAdd.gender) || missing(toAdd.ex))
                toAddStatus = "partial";
            else
                toAddStatus = "complete";
        }
    }
    else if (mode === "rules") {
        toAddStatus = (missing(toAdd.title)) ? "empty" : "complete";
    }
    else if (mode === "norms") {
        toAddStatus = (missing(toAdd.title)) ? "empty" : "complete";
    }

    console.log("toAddStatus: " + toAddStatus);


    // ==== JSX ====

    return ( <div className="w-full relative">
        {/* expandable */}
        <div className="bg-gray-200 overflow-hidden transition-all border-3 border-gray-500 border-t-0" style={{
            height: (expanded) ? "400px" : "0"
        }}>
            <div className="flex h-full items-stretch">
                {/* enter-fields panel (left) */}
                <div className="flex-1 relative p-4 pt-0 min-h-0 overflow-y-auto border-r-2 border-gray-500">
                    {/* clear button */}
                    {!(JSON.stringify(toAdd) === JSON.stringify(DEFAULTS[mode]) && instructions === "") &&
                        <button
                            className="absolute right-4 top-4 bg-red-500 w-6 h-6 cursor-pointer"
                            onClick={clearFields}
                        >X</button>
                    }

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
                        <AddCardInput display="Special instructions" value={instructions} setValue={setInstructions} />
                        <div className="flex justify-between">
                            <AddCardInput field="en" display="English" value={toAdd.en} setToAddField={setToAddField} />
                            <AddCardInput field="targ" display="Target" value={toAdd.targ} setToAddField={setToAddField} />
                        </div>
                        <div className="flex justify-between">
                            <AddCardInput field="def" display="Definition" value={toAdd.def} setToAddField={setToAddField} />
                            <AddCardInput field="desc" display="Description" value={toAdd.desc} setToAddField={setToAddField} />
                        </div>
                        <div className="flex justify-between">
                            <AddCardSelect field="pos" display="Part of speech" value={toAdd.pos} setToAddField={setToAddField} options={{
                                "Don't specify": "",
                                "Noun": "n",
                                "Pronoun": "p",
                                "Verb": "v",
                                "Adjective": "adj",
                                "Adverb": "adv",
                                "Connector": "c",
                                "Interjection": "i",
                                "Quantifier": "q"
                            }} />
                            <AddCardSelect field="gender" display="Gender" value={toAdd.gender} setToAddField={setToAddField} options={{
                                "Don't specify": "",
                                "None": null,
                                "Masculine": "m",
                                "Feminine": "f",
                                "Neuter": "n"
                            }} />
                            <AddCardInput field="trans" display="Transliteration" value={toAdd.trans} setToAddField={setToAddField} defaultVal={null} />
                        </div>
                        <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
                    </div>
                    // rule fields (make sure data is actually a rule by checking title field)
                    : (mode === "rules" && "title" in toAdd) ? <div>
                        <div className="flex justify-between">
                            <AddCardInput field="title" display="Title" value={toAdd.title} setToAddField={setToAddField} />
                            <AddCardInput field="def" display="Definition" value={toAdd.def} setToAddField={setToAddField} />
                        </div>
                        <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
                        <AddCardNotesList toAdd={toAdd} setToAdd={setToAdd} />
                    </div>
                    // norm fields (make sure data is actually a norm by checking title field)
                    : (mode === "norms" && "title" in toAdd) ? <div>
                        <div className="flex justify-between">
                            <AddCardInput field="title" display="Title" value={toAdd.title} setToAddField={setToAddField} />
                            <AddCardInput field="def" display="Definition" value={toAdd.def} setToAddField={setToAddField} />
                        </div>
                        <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
                        <AddCardNotesList toAdd={toAdd} setToAdd={setToAdd} />
                    </div>
                    : <p>Mode not implemented: "{mode}"</p>}
                    
                    
                    {/* notice display */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-8">
                        {notice && <AddCardNotice type={notice.type} key={notice.key}>{notice.text}</AddCardNotice>}
                    </div>
                </div>

                {/* see-completions panel (right) */}
                <div className="flex-1 p-4 min-h-0 overflow-y-scroll border-l border-gray-500">
                    {(lookupPending)
                        ? <p>Looking up...</p>
                        : (lookupWordResult || defaultLookupWordResult).map((opt, i) => <div key={i} className="flex">
                            <p>{opt.desc}</p>
                            <div className="shrink-0">
                                <Word word={opt.word} expanded={i === expandedCompletion} onClick={() => {
                                    setToAdd(opt.word);
                                    setExpandedCompletion((i === expandedCompletion) ? null : i);
                                }} />
                            </div>
                        </div>)
                    }
                </div>
            </div>

        </div>


        {/* bottom buttons */}
        <div className="relative">
            {/* big green button (expand or add word) */}
            {(!expanded || (toAddStatus === "complete")) &&
                <button
                    className="w-full p-6 block text-3xl cursor-pointer bg-green-400"
                    onClick={() => {
                        if (expanded) attemptAddData();
                        else setExpanded(true);
                    }}
                >+</button>
            }
            {/* big blue button (lookup) */}
            {(expanded && (toAddStatus === "incomplete" || toAddStatus === "partial" || (toAddStatus === "empty" && instructions !== ""))) &&
                <button
                    className="w-full p-6 block text-3xl cursor-pointer bg-blue-400"
                    onClick={lookupData}
                >{lookupPending ? "Lookup [in progress]" : "Lookup"}</button>
            }
            {/* big gray button (no action available) */}
            {(expanded && (toAddStatus === "empty" && instructions === "")) &&
                <button
                    className="w-full p-6 block text-3xl bg-gray-500"
                >Add data to look up</button>
            }

            {/* little buttons */}
            {expanded && <div className="absolute left-0 top-0">
                {/* X button */}
                <button
                    className="w-[84px] h-[84px] text-3xl p-6 bg-red-400 cursor-pointer"
                    onClick={() => {
                        setExpanded(false);
                        clearFields();
                        clearLookup();
                    }}
                >X</button>
                {/* little + button: to add a partial word/rule/norm with some nonessential fields missing */}
                {toAddStatus === "partial" && <button
                    className="w-[84px] h-[84px] text-3xl p-6 bg-green-400 cursor-pointer"
                    onClick={attemptAddData}
                >+</button> }
            </div>}
        </div>
    </div> );
}

