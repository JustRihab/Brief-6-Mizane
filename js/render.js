const messageErreur = document.getElementById("message-erreur");
const metauxContainer = document.getElementById("metaux-container");
const statutMarche = document.getElementById("statut-marche");
const dateMiseAJour = document.getElementById("date-mise-a-jour");

export function afficherErreur(message) {
    messageErreur.textContent = message;
    messageErreur.classList.remove("hidden");
}

export function cardContainer(nomMetal, prixMetal, variationData) {
    const div = document.createElement("div");
    const divIntern = document.createElement("div");
    const divIcone = document.createElement("div");
    const h3 = document.createElement("h3");
    const pPrixA = document.createElement("p"); 
    const pPrix = document.createElement("p"); 
    const statut = document.createElement("p");
    const pVariation = document.createElement("p"); 
    div.className = "bg-white rounded-2xl p-6 border border-gray-200 shadow-sm";
    divIntern.className = "flex items-center gap-3 mb-4";
    h3.className = "text-lg font-bold text-[#071D36]";
    pPrixA.className = "text-sm text-gray-500";
    pPrix.className = "text-2xl font-bold text-[#071D36] mt-1";
    statut.className = "text-sm text-gray-400 mt-2";
    if (nomMetal === "Or") {
        divIcone.textContent = "🥇";
        divIcone.className = "w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center text-2xl";
    }
    else if (nomMetal === "Argent") {
        divIcone.textContent = "🥈";
        divIcone.className = "w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-2xl";
    }
    else {
        divIcone.textContent = "🏅";
        divIcone.className = "w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-2xl";
    }
    h3.textContent = nomMetal;
    pPrixA.textContent = "Prix actuel";
    pPrix.textContent = prixMetal + " MAD";
    statut.textContent = "Prix actualisé";
    if (variationData) {
        let fleche = "→";
        let couleur = "text-gray-500";
        if (variationData.direction === "hausse") {
            fleche = "↑";
            couleur = "text-green-700";
        }
        else if (variationData.direction === "baisse") {
            fleche = "↓";
            couleur = "text-red-700";
        }
        pVariation.textContent = fleche + " " + variationData.variation.toFixed(2) + " MAD (" + variationData.pourcentage.toFixed(2) + "%)";
        pVariation.className = "text-sm font-semibold mt-2 " + couleur;
    }
    divIntern.append(divIcone, h3);
    div.append(divIntern, pPrixA, pPrix, pVariation, statut);
    metauxContainer.append(div);
}

export function afficherPrix(metaux) {
    messageErreur.classList.add("hidden");
    metauxContainer.textContent = "";
    metaux.forEach(metal => {
        cardContainer(metal.nom, metal.prix, metal.variation)
    });
}

export function afficherInfosMarche(dataState) {
    statutMarche.textContent = dataState.status;
    dateMiseAJour.textContent = new Date(dataState.as_of).toLocaleString("fr-FR");
}
   