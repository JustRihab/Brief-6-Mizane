const prixOr = document.getElementById("prix-or");
const statutOr = document.getElementById("statut-or");
const prixArgent = document.getElementById("prix-argent");
const statutArgent = document.getElementById("statut-argent");
const messageErreur = document.getElementById("message-erreur");

export function afficherPrix(data, prixArgentMad) {
    messageErreur.classList.add("hidden");
    prixOr.textContent = data.xau.price + " " + data.xau.currency;
    statutOr.textContent = data.data_state.status + " " + new Date(data.data_state.as_of).toLocaleString("fr-MA");
    prixArgent.textContent = prixArgentMad + " " + " MAD";
    statutArgent.textContent = data.data_state.status + " " + new Date(data.data_state.as_of).toLocaleString("fr-MA");   
}

export function afficherErreur(message) {
    messageErreur.textContent = message;
    messageErreur.classList.remove("hidden");
}