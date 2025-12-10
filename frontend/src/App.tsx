import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import ViewPage from './pages/view/ViewPage';
import MemorizePage from './pages/memorize/MemorizePage';
import PracticePage from './pages/practice/PracticePage';


/*
Main app component. Mostly serves to define paths on the website and map them to the right
page components.
*/
export default function App() {
    return ( <BrowserRouter>
        <Routes>
            <Route path="/view" element={<ViewPage />} />
            <Route path="/memorize" element={<MemorizePage />} />
            <Route path="/practice" element={<PracticePage />} />
        </Routes>
    </BrowserRouter> );
}


