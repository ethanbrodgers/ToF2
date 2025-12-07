export function getWords(lang) {
    const params = new URLSearchParams({lang: lang});

    return fetch(`http://127.0.0.1:5000/vocab?${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(response => response.words)
}




