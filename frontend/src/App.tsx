import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Homepage from './pages/home/page';
import ViewPage from './pages/view/page';
import MemorizePage from './pages/memorize/page';
import PracticePage from './pages/practice/page';

// TanStack QueryClient: stores cached responses and fetching rules to be referenced by all child components
const queryClient = new QueryClient();


/*
Main app component. Mostly serves to define paths on the website and map them to the right
page components.
*/
export default function App() {
    return ( <QueryClientProvider client={queryClient}> {/* provides queryClient (see above) */}
        <BrowserRouter> {/* allows multi-page functionality */}
            <Routes> {/* allows multi-page functionality */}
                <Route path="/" element={<Homepage />} />
                <Route path="/view" element={<ViewPage />} />
                <Route path="/memorize" element={<MemorizePage />} />
                <Route path="/practice" element={<PracticePage />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider> );
}


