export function sauvegarderDevise(currency) {
    localStorage.setItem("currency", currency);
}

export function chargerDevise() {
    return localStorage.getItem("currency");
}