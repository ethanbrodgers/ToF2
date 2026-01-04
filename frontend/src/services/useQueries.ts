// useQueries.ts: defines TanStack hooks used to query the backend and manage lifecycle

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWords, addWord, lookupWord, getRules, addRule, getNorms, addNorm } from './api';
import { wordType } from '@/types';

/**
 * Hook for fetching vocabulary words
 * 
 * @param {string} lang - ISO code for desired language
 * 
 * @returns {Object} Query result object
 * @returns {Array<wordType>} returns.data - The data returned from the call
 * @returns {boolean} returns.isLoading - Whether the call is pending
 * @returns {boolean} returns.isError - Whether the call has errored
 * @returns {Error} returns.error - Error object if the call failed
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

/**
 * Hook for adding vocabulary words. Returns a function that can be used to
 * make the mutation.
 * 
 * Usage example: const { mutate } = useAddWord(); mutate(wordObject);
 * 
 * @returns {Object} Mutation result object
 * @returns {Function} returns.mutate - Function to execute the mutation
 * @returns {wordType} returns.mutate.word - The word object to add
 * @returns {boolean} returns.isPending - Whether the mutation is in progress
 * @returns {boolean} returns.isError - Whether the mutation has errored
 * @returns {Error} returns.error - Error object if the mutation failed
 * @returns {boolean} returns.isSuccess - Whether the mutation succeeded
 */
export function useAddWord() {
    // access main queryClient for whole site; allows us to invalidate old cached data
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addWord,
        // after query finishes, invalidate all cached words (regardless of lang) so the new words are fetched
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["words"]});
        }
    })
}

/**
 * Hook for looking up AI word completions
 * 
 * Usage: 
 *   const { mutate, data, isPending } = useLookupWord();
 * 
 * @returns {Object} Mutation result object
 * @returns {Function} returns.mutate - Function to execute the lookup. Usage example:
 * mutate({desc: "formal greeting", word: incompleteWordObject});
 * @returns {Object} returns.mutate.params - Parameters for the lookup
 * @returns {string} returns.mutate.params.desc - Special instructions for word generation
 * @returns {wordType} returns.mutate.params.word - Incomplete word object
 * @returns {Array<{desc: string, word: wordType}>} returns.data - Array of completion options
 * @returns {boolean} returns.isPending - Whether the lookup is in progress
 * @returns {boolean} returns.isError - Whether the lookup has errored
 * @returns {Error} returns.error - Error object if the lookup failed
 * @returns {boolean} returns.isSuccess - Whether the lookup succeeded
 */
export function useLookupWord() {
    return useMutation({
        mutationFn: ({desc, word}: {desc: string, word: wordType}) => lookupWord(desc, word)
    });
}

/**
 * Hook for fetching grammar rules
 * 
 * @param {string} lang - ISO code for desired language
 * 
 * @returns {Object} Query result object
 * @returns {Array<wordType>} returns.data - The data returned from the call
 * @returns {boolean} returns.isLoading - Whether the call is pending
 * @returns {boolean} returns.isError - Whether the call has errored
 * @returns {Error} returns.error - Error object if the call failed
 */
export function useRules(lang: string) {
    return useQuery({
        queryKey: ["rules", lang],
        queryFn: () => getRules(lang),
        staleTime: 5 * 60 * 1000
    });
}

/**
 * Hook for adding grammar rules. Returns a function that can be used to
 * make the mutation.
 * 
 * Usage example: const { mutate } = useAddRule(); mutate(ruleObject);
 * 
 * @returns {Object} Mutation result object
 * @returns {Function} returns.mutate - Function to execute the mutation
 * @returns {wordType} returns.mutate.word - The word object to add
 * @returns {boolean} returns.isPending - Whether the mutation is in progress
 * @returns {boolean} returns.isError - Whether the mutation has errored
 * @returns {Error} returns.error - Error object if the mutation failed
 * @returns {boolean} returns.isSuccess - Whether the mutation succeeded
 */
export function useAddRule() {
    // access main queryClient for whole site; allows us to invalidate old cached data
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addRule,
        // after query finishes, invalidate all cached rules (regardless of lang) so the new rules are fetched
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["rules"]});
        }
    })
}

/**
 * Hook for fetching style norms
 * 
 * @param {string} lang - ISO code for desired language
 * 
 * @returns {Object} Query result object
 * @returns {Array<wordType>} returns.data - The data returned from the call
 * @returns {boolean} returns.isLoading - Whether the call is pending
 * @returns {boolean} returns.isError - Whether the call has errored
 * @returns {Error} returns.error - Error object if the call failed
 */
export function useNorms(lang: string) {
    return useQuery({
        queryKey: ["norms", lang],
        queryFn: () => getNorms(lang),
        staleTime: 5 * 60 * 1000
    });
}

/**
 * Hook for adding style norms. Returns a function that can be used to
 * make the mutation.
 * 
 * Usage example: const { mutate } = useAddNorm(); mutate(normObject);
 * 
 * @returns {Object} Mutation result object
 * @returns {Function} returns.mutate - Function to execute the mutation
 * @returns {wordType} returns.mutate.word - The word object to add
 * @returns {boolean} returns.isPending - Whether the mutation is in progress
 * @returns {boolean} returns.isError - Whether the mutation has errored
 * @returns {Error} returns.error - Error object if the mutation failed
 * @returns {boolean} returns.isSuccess - Whether the mutation succeeded
 */
export function useAddNorm() {
    // access main queryClient for whole site; allows us to invalidate old cached data
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addNorm,
        // after query finishes, invalidate all cached norms (regardless of lang) so the new norms are fetched
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["norms"]});
        }
    })
}

