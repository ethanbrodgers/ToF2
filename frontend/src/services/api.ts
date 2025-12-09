/*
This file contains all functions necessary for frontend-backend connections.
Any component that needs a backend connection should import a function from this file.
*/


// ===== Internal use =====

const BACKEND_URL = "http://127.0.0.1:5000/";

// backend call logic: Input all info for request, outputs promise resolving to raw response
function apiCall(
    endpoint: string,
    httpMethod: string,
    body: object,
    queryParams: {[key: string]: string},
    pathVar: string
): Promise<Response> {
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
    return fetch(urlString, configObj);
}





// ===== Exports =====

export function getWords(lang: string) {
    return apiCall("vocab", "GET", null, {lang: lang}, null)
    .then(response => response.json())
    .then(response => response.words)
}
