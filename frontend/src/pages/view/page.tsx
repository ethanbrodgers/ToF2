import React from 'react';
import Navbar from '../../components/Navbar';
import Options from './components/OptionsBar';
// import Vocab from './components/Vocab';
import GridDisplay from './components/GridDisplay';
import AddWordPanel from './components/AddWordPanel';

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

    return ( <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex grow gap-16 min-h-0">
            <Options langOptions={langOptions} setLang={setLang} viewOptions={viewOptions} setView={setView} />
            <div className="grow flex flex-col min-h-0 justify-between">
                <div className="overflow-y-auto min-h-0 border-3 border-gray-500">
                    <GridDisplay mode={view} lang={lang} />
                </div>
                <AddWordPanel lang={lang} setLang={setLang} mode={view} setMode={setView} />
            </div>
        </div>
    </div> );
}