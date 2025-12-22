import React from 'react';
import { wordType } from '@/types';

const defaultWord = {
    lang: "es",
    en: "",
    targ: "",
    def: "",
    pos: "n",
    gender: null,
    trans: null,
    desc: [],
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
    function toggleExpanded() { setExpanded(!expanded); };
    // state var: word to add
    const [toAdd, setToAdd] = React.useState(defaultWord);

    return ( <div className="w-full">
        {/* when expanded */}
        <div className="bg-gray-200 overflow-hidden transition-all" style={{
            height: (expanded) ? "300px" : "0"
        }}>
            <p className="text-5xl">Add a word</p>
            {/* lang */}
            <select onChange={(event) => {
                setToAdd({...toAdd, lang: event.target.value});
                console.log(toAdd);
            }}>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="zh">Chinese</option>
                <option value="ru">Russian</option>
            </select>
            {/* pos */}
            <select onChange={(event) => {
                setToAdd({...toAdd, pos: event.target.value});
                console.log(toAdd);
            }}>
                <option value="n">Noun</option>
                <option value="p">Pronoun</option>
                <option value="v">Verb</option>
                <option value="adj">Adjective</option>
                <option value="adv">Adverb</option>
                <option value="c">Connector</option>
                <option value="i">Interjection</option>
                <option value="q">Quantifier</option>
            </select>
            {/* en */}
            <p>English:</p>
            <input type="text" onChange={(event) => {
                setToAdd({...toAdd, en: event.target.value});
                console.log(toAdd);
            }} />
            {/* targ */}
            <p>Target:</p>
            <input type="text" onChange={(event) => {
                setToAdd({...toAdd, targ: event.target.value});
                console.log(toAdd);
            }} />
            {/* def */}
            <p>Definition:</p>
            <input type="text" onChange={(event) => {
                const def = (event.target.value === "") ? "[None provided]" : event.target.value;
                setToAdd({...toAdd, def});
                console.log(toAdd);
            }} />
            {/* gender */}
            <select onChange={(event) => {
                setToAdd({...toAdd, gender: event.target.value});
                console.log(toAdd);
            }}>
                <option value={null}>None</option>
                <option value="m">Masculine</option>
                <option value="f">Feminine</option>
                <option value="n">Neuter</option>
            </select>
            {/* trans */}
            <p>Transliteration:</p>
            <input type="text" onChange={(event) => {
                const trans = (event.target.value === "") ? null : event.target.value;
                setToAdd({...toAdd, trans});
                console.log(toAdd);
            }} />
            {/* desc */}
            <p>Description:</p>
            <input type="text" onChange={(event) => {
                const desc = (event.target.value === "") ? "[None provided]" : event.target.value;
                setToAdd({...toAdd, desc});
                console.log(toAdd);
            }} />
            {/* ex */}
            

        </div>

        {/* big plus button */}
        <button
            className="w-96 p-6 mx-auto bg-green-400 block text-3xl cursor-pointer"
            onClick={toggleExpanded}
        >+</button>
        
    </div> );
}

