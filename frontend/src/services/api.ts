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
 * @return A promise resolving to a boolean representing whether the addition was successful
 */
export async function addWord(word: wordType): Promise<boolean> {
    return apiCall("/vocab", "PUT", word, null, null)
    .then(response => response.ok);
}

export async function getRules(lang: string): Promise<Array<ruleNormType>> {
    return apiCall("/grammar", "GET", null, {lang: lang}, null)
    .then(response => response.json())
    .then(response => response.rules)
}

export async function getNorms(lang: string): Promise<Array<ruleNormType>> {
    return apiCall("/style", "GET", null, {lang: lang}, null)
    .then(response => response.json())
    .then(response => response.norms)
}
