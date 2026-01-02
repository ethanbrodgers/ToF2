/*
This file contains all functions necessary for frontend-backend connections.
Any component that needs a backend connection should import a function from this file.
*/

import { wordType, ruleNormType } from "../types";


// ===== Internal use =====

const BACKEND_URL = "http://localhost:5000";

// backend call logic: Input all info for request, outputs promise resolving to response object
async function apiCall(
    endpoint: string,
    httpMethod: string,
    body: object,
    queryParams: {[key: string]: string},
    pathVar: string
): Promise<Response> {
    // construct request
    let urlString = BACKEND_URL + endpoint;
    if (pathVar) urlString += "/" + pathVar;
    if (queryParams) {
        const query = new URLSearchParams(queryParams);
        urlString += "?" + query.toString();
    }
    const configObj = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json"
        },
        body: undefined
    };
    if (body && httpMethod != "GET") configObj.body = JSON.stringify(body);

    // make request
    const response = await fetch(urlString, configObj)

    // log errors
    if (!response.ok) {
        console.log("Errored backend call");
        console.log("endpoint:", endpoint);
        console.log("httpMethod:", httpMethod);
        console.log("body:", body);
        console.log("queryParams:", queryParams);
        console.log("pathVar:", pathVar);
        console.log("response:", response);
    }

    // return
    return response;
}





// ===== Exports =====

export async function getWords(lang: string): Promise<Array<wordType>> {
    return apiCall("/vocab", "GET", null, {lang: lang}, null)
    .then(response => response.json())
    .then(response => response.words)
}

/**
 * Add a word.
 * @param {wordType} word - The word to add
 */
export async function addWord(word: wordType): Promise<void> {
    await apiCall("/vocab", "PUT", word, null, null)
    .then(async response => {
        if (!response.ok) {
            const message = (await response.json()).message;
            throw new Error(message);
        }
    });
}

/**
 * Performs an AI word lookup, returning several possible completions.
 * @param {string} desc: Any special instructions for how to generate the word,
 * such as a specific usage example
 * @param {wordType} word: An incomplete word. Only non-null, non-empty values will be
 * passed along to the AI.
 * @return {Promise<Array<{desc: string, word: wordType}>>} A promise resolving to an array
 * of options, each of which has a desc string describing what makes this option special
 * and a complete word
 */
export async function lookupWord(desc: string, word: wordType): Promise<Array<{desc: string, word: wordType}>> {
    // construct incomplete word
    const incompleteWord = {}
    for (const [key, val] of Object.entries(word)) {
        // if actual value
        if (
            val
            && !(typeof val === "string" && val.length === 0)
            && !(Array.isArray(val) && val.length === 0)
        ) incompleteWord[key] = val;
    }
    console.log("incompleteWord: ", incompleteWord)

    return apiCall("/vocab/lookup", "POST", {desc, word: incompleteWord}, null, null)
    .then(response => response.json())
    .then(response => response.choices);
}

export async function getRules(lang: string): Promise<Array<ruleNormType>> {
    return apiCall("/grammar", "GET", null, {lang: lang}, null)
    .then(response => response.json())
    .then(response => response.rules)
}

/**
 * Add a rule.
 * @param {ruleNormType} rule - The rule to add
 */
export async function addRule(rule: ruleNormType): Promise<void> {
    await apiCall("/grammar", "PUT", rule, null, null)
    .then(async response => {
        if (!response.ok) {
            const message = (await response.json()).message;
            throw new Error(message);
        }
    });
}

export async function getNorms(lang: string): Promise<Array<ruleNormType>> {
    return apiCall("/style", "GET", null, {lang: lang}, null)
    .then(response => response.json())
    .then(response => response.norms)
}

/**
 * Add a norm.
 * @param {ruleNormType} norm - The norm to add
 */
export async function addNorm(norm: ruleNormType): Promise<void> {
    await apiCall("/style", "PUT", norm, null, null)
    .then(async response => {
        if (!response.ok) {
            const message = (await response.json()).message;
            throw new Error(message);
        }
    });
}
