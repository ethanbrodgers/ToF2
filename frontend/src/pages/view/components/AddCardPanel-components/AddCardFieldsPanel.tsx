import React from 'react';
import AddCardSelect from './AddCardSelect';
import AddCardInput from './AddCardInput';
import AddCardExList from './AddCardExList';
import AddCardNotesList from './AddCardNotesList';
import AddCardNotice from './AddCardNotice';

/**
 * The left half of the add-card panel. Lets users set fields of the
 * piece of data they want to add.
 * 
 * @param {Object} props - component props
 * @param {wordType | ruleNormType} props.toAdd - the word/rule/norm currently being edited
 * @param {Function} props.setToAdd - setter for toAdd
 * @param {Object} props.DEFAULTS - the default values for words/rules/norms as stored in AddCardPanel
 * @param {string} props.instructions - special instructions for the AI
 * @param {Function} props.setInstructions - setter for instructions
 * @param {Function} props.clearFields - function that resets toAdd
 * @param {string} props.lang - language state var
 * @param {Function} props.setLang - setter for lang
 * @param {string} props.mode - mode state var (words, rules, norms)
 * @param {Function} props.setMode - setter for mode
 * @param {Object} props.notice - notice to display, as defined in AddCardPanel
 */
export default function AddCardFieldsPanel({
    toAdd,
    setToAdd,
    DEFAULTS,
    instructions,
    setInstructions,
    clearFields,
    lang,
    setLang,
    mode,
    setMode,
    notice
}: {
    toAdd: any,
    setToAdd: Function,
    DEFAULTS: any,
    instructions: string,
    setInstructions: Function,
    clearFields: Function,
    lang: string,
    setLang: Function,
    mode: string,
    setMode: Function,
    notice: any
}) {
    return ( <div className="flex-1 relative p-4 pt-0 min-h-0 overflow-y-auto border-r-2 border-gray-500">
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
            <AddCardSelect header={true} value={lang} setValue={setLang} options={{
                "Spanish": "es",
                "French": "fr",
                "Chinese": "zh",
                "Russian": "ru"
            }} />
            <AddCardSelect header={true} value={mode} setValue={setMode} options={{
                "Word": "words",
                "Rule": "rules",
                "Norm": "norms"
            }} />
        </div>

        {/* word/rule/norm fields */}
        {/* word fields (make sure data is actually a word by checking en field)*/}
        {(mode === "words" && "en" in toAdd) ? <div>
            <AddCardInput display="Special instructions" value={instructions} setValue={setInstructions} />
            <div className="flex justify-between">
                <AddCardInput display="English" value={toAdd.en} setValue={(val) => {
                    setToAdd({...toAdd, en: val});
                }} />
                <AddCardInput display="Target" value={toAdd.targ} setValue={(val) => {
                    setToAdd({...toAdd, targ: val});
                }} />
            </div>
            <div className="flex justify-between">
                <AddCardInput display="Definition" value={toAdd.def} setValue={(val) => {
                    setToAdd({...toAdd, def: val});
                }} />
                <AddCardInput display="Description" value={toAdd.desc} setValue={(val) => {
                    setToAdd({...toAdd, desc: val});
                }} />
            </div>
            <div className="flex justify-between">
                <AddCardSelect display="Part of speech" value={toAdd.pos} setValue={(val) => {
                    setToAdd({...toAdd, pos: val})
                }} options={{
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
                <AddCardSelect display="Gender" value={toAdd.gender} setValue={(val) => {
                    setToAdd({...toAdd, gender: val})
                }} options={{
                    "Don't specify": "",
                    "None": null,
                    "Masculine": "m",
                    "Feminine": "f",
                    "Neuter": "n"
                }} />
                <AddCardInput display="Transliteration" value={toAdd.trans} setValue={(val) => {
                    setToAdd({...toAdd, trans: val});
                }} blankValue={DEFAULTS.words.trans} />
            </div>
            <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
        </div>
        // rule fields (make sure data is actually a rule by checking title field)
        : (mode === "rules" && "title" in toAdd) ? <div>
            <div className="flex justify-between">
                <AddCardInput display="Title" value={toAdd.title} setValue={(val) => {
                    setToAdd({...toAdd, title: val});
                }} />
                <AddCardInput display="Definition" value={toAdd.def} setValue={(val) => {
                    setToAdd({...toAdd, def: val});
                }} />
            </div>
            <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
            <AddCardNotesList toAdd={toAdd} setToAdd={setToAdd} />
        </div>
        // norm fields (make sure data is actually a norm by checking title field)
        : (mode === "norms" && "title" in toAdd) ? <div>
            <div className="flex justify-between">
                <AddCardInput display="Title" value={toAdd.title} setValue={(val) => {
                    setToAdd({...toAdd, title: val});
                }} />
                <AddCardInput display="Definition" value={toAdd.def} setValue={(val) => {
                    setToAdd({...toAdd, def: val});
                }} />
            </div>
            <AddCardExList toAdd={toAdd} setToAdd={setToAdd} />
            <AddCardNotesList toAdd={toAdd} setToAdd={setToAdd} />
        </div>
        : <p>Mode not implemented: "{mode}"</p>}
        
        
        {/* notice display */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-8">
            {notice && <AddCardNotice type={notice.type} key={notice.key}>{notice.text}</AddCardNotice>}
        </div>
    </div> );
}