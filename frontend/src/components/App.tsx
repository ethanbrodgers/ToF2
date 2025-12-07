import React from 'react';
import Navbar from './Navbar.js';
import Options from './Options.js';
import Vocab from './Vocab.js';
import options from '../data/options.js';

// The main app component
export default function App() {
    // default language: first language in options
    const [lang, setLang] = React.useState(Object.keys(options.lang.options)[0]);

    return ( <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex grow gap-16">
            <Options setLang={setLang} />
            <Vocab show="true" lang={lang}/>
        </div>
    </div> );
}