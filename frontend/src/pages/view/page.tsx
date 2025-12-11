import React from 'react';
import Navbar from '../../components/Navbar.js';
import Options from './components/Options.js';
import Vocab from './components/Vocab.js';

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

// Contains all elements of the view page, which lets you view user data like vocabulary
export default function ViewPage() {
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