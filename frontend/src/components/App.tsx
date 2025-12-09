import React from 'react';
import Navbar from './Navbar.js';
import Options from './Options.js';
import Vocab from './Vocab.js';

const langOptions = {
    "es": {
        display: "Spanish"
    },
    "fr": {
        display: "French"
    },
    "zh": {
        display: "Chinese"
    },
    "ru": {
        display: "Russian"
    }
};
const viewOptions = {
    words: {
        display: "Words"
    },
    rules: {
        display: "Rules"
    },
    norms: {
        display: "Norms"
    },
    passages: {
        display: "Passages"
    }
}

// The main app component
export default function App() {
    // default language: first language in options
    const [lang, setLang] = React.useState(Object.keys(langOptions)[0]);

    return ( <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex grow gap-16">
            <Options setLang={setLang} langOptions={langOptions} viewOptions={viewOptions} />
            <Vocab show="true" lang={lang}/>
        </div>
    </div> );
}