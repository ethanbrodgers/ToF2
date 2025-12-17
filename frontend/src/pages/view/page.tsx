import React from 'react';
import Navbar from '../../components/Navbar';
import Options from './components/Options';
// import Vocab from './components/Vocab';
import GridDisplay from './components/GridDisplay';
import Grammar from './components/Grammar'

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
    // language state variable: default value is first language in options
    const [lang, setLang] = React.useState(Object.keys(langOptions)[0]);
    // view state variable: default is first option
    const [view, setView] = React.useState(Object.keys(viewOptions)[0]);

    return ( <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex grow gap-16">
            <Options langOptions={langOptions} setLang={setLang} viewOptions={viewOptions} setView={setView} />
            <GridDisplay mode={view} lang={lang} />
        </div>
    </div> );
}