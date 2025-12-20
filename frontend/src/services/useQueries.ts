// useQueries.ts: defines TanStack hooks used to query the backend and manage lifecycle

import { useQuery } from '@tanstack/react-query';
import { getWords, getRules, getNorms } from './api';

/**
 * Hook for fetching vocabulary words
 * 
 * @param {string} lang - ISO code for desired language
 */
export function useWords(lang: string) {
    /*
     * TanStack query
     * queryKey: a way of defining which queries are "the same". If two
     *   calls to useQuery both have the queryKey ["words", "es"], TanStack
     *   will return the stored response from the first request for the
     *   second request instead of calling the API again.
     * queryFn: the function to call to get the data when TanStack
     *   determines it's time for a new API call
     * staleTime: the amount of time before data from a request becomes
     *   stale (in milliseconds). If the data requested has become stale,
     *   the stale data will be shown, then replaced by the data from a
     *   new API call a moment later.
     */
    return useQuery({
        queryKey: ["words", lang],
        queryFn: () => getWords(lang),
        staleTime: 5 * 60 * 1000    // 5 minutes
    });
}

export function useRules(lang: string) {
    return useQuery({
        queryKey: ["rules", lang],
        queryFn: () => getRules(lang),
        staleTime: 5 * 60 * 1000
    });
}

export function useNorms(lang: string) {
    return useQuery({
        queryKey: ["norms", lang],
        queryFn: () => getNorms(lang),
        staleTime: 5 * 60 * 1000
    });
}







