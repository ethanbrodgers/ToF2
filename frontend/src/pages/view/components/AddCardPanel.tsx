import React from 'react';
import { wordType } from '@/types';
import { useAddWord, useLookupWord, useAddRule, useAddNorm } from '@/services/useQueries';
import AddCardFieldsPanel from './AddCardFieldsPanel';
import AddCardCompletionsPanel from './AddCardCompletionsPanel';
import AddCardButtonsBar from './AddCardButtonsBar';


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

    // expanded
    const [expanded, setExpanded] = React.useState(false);
    // expanded completion index: which word/rule/norm completion is being expanded, used to collapse all others. null for no expanded completion
    const [expandedCompletion, setExpandedCompletion] = React.useState(null);
    // word/rule/norm to add
    const [toAdd, setToAdd] = React.useState(DEFAULTS[mode]);
    toAdd.lang = lang;
    console.log("toAdd", toAdd)
    // effect to switch toAdd value to match a change in mode
    React.useEffect(() => {
        setToAdd(DEFAULTS[mode])
    }, [mode]); 
    // special instructions for AI
    const [instructions, setInstructions] = React.useState("");
    /// add-data mutators
    const { mutate: addWord } = useAddWord();
    const { mutate: addRule } = useAddRule();
    const { mutate: addNorm } = useAddNorm();
    // lookup word
    const { mutate: lookupWord, data: lookupWordResult, isPending: lookupWordPending, reset: clearLookupWord } = useLookupWord();
    // notice to display
    const [notice, setNotice]: [{
        type: "loading" | "error" | "success", text: string, key?: any
    }, Function] = React.useState(null);
    


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

        // looks up current data and displays appropriate notices
    function lookupData() {
        if (mode === "words") {
            lookupWord({desc: instructions, word: toAdd}, {
                // function to run when added successfully
                onSuccess: () => {
                    makeNotice("success", "Lookup complete")
                    setExpandedCompletion(null);
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

    // clears all lookup completions, regardless of current mode
    function clearLookup() {
        clearLookupWord()
        setExpandedCompletion(null);
    }

    // attempts to add the current word/rule/norm and displays corresponding notices
    function addData() {
        if (mode === "words") {
            if (!missing(toAdd.en) && !missing(toAdd.targ)) {
                addWord(toAdd, {
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
                addRule(toAdd, {
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
                addNorm(toAdd, {
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


    // ==== JSX ====

    return ( <div className="w-full relative">
        {/* expandable */}
        <div className="bg-gray-200 overflow-hidden transition-all border-3 border-gray-500 border-t-0" style={{
            height: (expanded) ? "400px" : "0"
        }}>
            <div className="flex h-full items-stretch">
                {/* enter-fields panel (left) */}
                <AddCardFieldsPanel
                    toAdd={toAdd}
                    setToAdd={setToAdd}
                    DEFAULTS={DEFAULTS}
                    instructions={instructions}
                    setInstructions={setInstructions}
                    clearFields={clearFields}
                    lang={lang}
                    setLang={setLang}
                    mode={mode}
                    setMode={setMode}
                    notice={notice}
                />

                {/* see-completions panel (right) */}
                <AddCardCompletionsPanel
                    lookupPending={lookupWordPending}
                    lookupWordResult={lookupWordResult}
                    defaultLookupWordResult={defaultLookupWordResult}
                    expandedCompletion={expandedCompletion}
                    setExpandedCompletion={setExpandedCompletion}
                    setToAdd={setToAdd}
                />
            </div>

        </div>


        {/* bottom buttons */}
        <AddCardButtonsBar
            expanded={expanded}
            setExpanded={setExpanded}
            toAddStatus={toAddStatus}
            addData={addData}
            lookupData={lookupData}
            lookupPending={lookupPending}
            instructions={instructions}
            clearFields={clearFields}
            clearLookup={clearLookup}
        />
    </div> );
}

