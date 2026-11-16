const messageErreur = document.getElementById("message-erreur");
const metauxContainer = document.getElementById("metaux-container");
const statutMarche = document.getElementById("statut-marche");
const dateMiseAJour = document.getElementById("date-mise-a-jour");
const historiqueGraphique = document.getElementById("historique-graphique");
const valeurEstimee = document.getElementById("valeur-estimee");
const erreurPoids = document.getElementById("erreur-poids");
const messageSucces = document.getElementById("message-succes");
const reessayerButton = document.getElementById("reessayer");

export function afficherErreur(message) {
    messageSucces.classList.add("hidden");
    messageErreur.textContent = message;
    messageErreur.classList.remove("hidden");
    reessayerButton.classList.remove("hidden");
}

export function afficherSucces(message) {
    messageErreur.classList.add("hidden");
    messageSucces.textContent = message;
    messageSucces.classList.remove("hidden");
    setTimeout(function () {
        messageSucces.classList.add("hidden");
    }, 3000);
    reessayerButton.classList.add("hidden");
}

export function cardContainer(nomMetal, prixMetal, variationData, currency) {
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
    pPrix.textContent = prixMetal.toFixed(2) + " " + currency;
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
        pVariation.textContent = fleche + " " + variationData.variation.toFixed(2) + " " + currency + " (" + variationData.pourcentage.toFixed(2) + "%)";
        pVariation.className = "text-sm font-semibold mt-2 " + couleur;
    }
    divIntern.append(divIcone, h3);
    div.append(divIntern, pPrixA, pPrix, pVariation, statut);
    metauxContainer.append(div);
}

export function afficherPrix(metaux, currency) {
    messageErreur.classList.add("hidden");
    messageSucces.classList.add("hidden");
    metauxContainer.textContent = "";
    metaux.forEach(metal => {
        cardContainer(metal.nom, metal.prix, metal.variation, currency)
    });
}

export function afficherInfosMarche(dataState) {
    dateMiseAJour.textContent = new Date(dataState.as_of).toLocaleString("fr-FR");
}
   
export function afficherHistorique(points) {
    historiqueGraphique.textContent = "";
    historiqueGraphique.classList.add("overflow-x-auto");
    if (points.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Aucune donnée historique disponible.";
        message.className = "text-sm text-gray-500";
        historiqueGraphique.append(message);
        return;
    }
    const prix = points.map(point => point.c);
    const prixMin = Math.min(...prix);
    const prixMax = Math.max(...prix);
    const barresContainer = document.createElement("div");
    barresContainer.className = "flex items-end gap-3 h-52 w-max min-w-full";
    points.forEach(point => {
        const colonne = document.createElement("div");
        colonne.className = "flex flex-col items-center justify-end gap-2 flex-none h-full";
        const barre = document.createElement("div");
        barre.className = "bg-[#D99A16] w-3 flex-none rounded-t-lg";
        let hauteur;
        if (prixMax === prixMin) {
            hauteur = 50;
        }
        else {
            hauteur = ((point.c - prixMin) / (prixMax - prixMin)) * 100;
        }
        if (hauteur < 5) {
            hauteur = 5;
        }
        // style.height js property used to set the bar's CSS height
        barre.style.height = (hauteur * 1.5 + 10) + "px";
        const date = document.createElement("p");
        const dateComplete = new Date(point.t * 1000);
        date.textContent = dateComplete.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit"
        });
        date.className = "text-xs text-gray-500";
        colonne.append(barre, date);
        barresContainer.append(colonne);
    });
    historiqueGraphique.append(barresContainer);
}

export function afficherValeurEstimee(valeur, currency) {
    const resultat = valeur.toFixed(2) + " " + currency;
    valeurEstimee.textContent = resultat;
}

export function afficherErreurPoids(message) {
    erreurPoids.textContent = message;
    erreurPoids.classList.remove("hidden");
}