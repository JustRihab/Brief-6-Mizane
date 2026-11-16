import { getCurrentPrices, getHistoricalPrices } from "./api.js";
import { convertirEnDeviseParGramme, calculerVariation, calculerValeurEstimee } from "./calculs.js";
import { afficherPrix, afficherErreur, afficherInfosMarche, afficherHistorique, afficherValeurEstimee, afficherErreurPoids, afficherSucces } from "./render.js";
import { sauvegarderDevise, chargerDevise } from "./storage.js";

const currencySelect = document.getElementById("currency");
const historiqueMetal = document.getElementById("historique-metal");
const historiquePeriode = document.getElementById("historique-periode");
const metalSelect = document.getElementById("metal");
const poidsInput = document.getElementById("poids");
const boutonCalculer = document.getElementById("calculer-valeur");
const valeurEstimee = document.getElementById("valeur-estimee");
const erreurPoids = document.getElementById("erreur-poids");
const messageChargement = document.getElementById("message-chargement")
const actualiserButton = document.getElementById("actualiser");
const reessayerButton = document.getElementById("reessayer");
const boutonsRequete = [ actualiserButton, reessayerButton, currencySelect, historiqueMetal, historiquePeriode ];
let prixOrActuel = null;
let prixArgentActuel = null;
const savedCurrency = chargerDevise();
if (savedCurrency) {
    currencySelect.value = savedCurrency;
}
let dernierRequete = null;

async function init() {
    messageChargement.classList.remove("hidden");
    boutonsRequete.forEach(function(bouton) {
        bouton.disabled = true;
    });
    try {
        const currency = currencySelect.value;
        const data = await getCurrentPrices(currency);
        const historiqueOr = await getHistoricalPrices("xau", 5);
        const historiqueArgent = await getHistoricalPrices("silver", 5);
        const prixArgent = convertirEnDeviseParGramme (data.silver_usd_oz, data.fx_rate);
        prixOrActuel = data.xau.price;
        prixArgentActuel = prixArgent;
        const variationOr = calculerVariation(historiqueOr.points, data.fx_rate);
        const variationArgent = calculerVariation(historiqueArgent.points, data.fx_rate);
        const metaux = [
            {nom: "Or", prix: data.xau.price, variation: variationOr},
            {nom: "Argent", prix: prixArgent, variation: variationArgent}
        ];
        afficherPrix(metaux, currency);
        afficherInfosMarche(data.data_state);
        afficherSucces("Les données ont été chargées avec succès.");
    }
    catch (error) {
        dernierRequete = init;
        if (error.type === "offline") {
            afficherErreur("Vous êtes hors ligne. Vérifiez votre connexion internet.");
        }
        else if (error.type === "network") {
            afficherErreur("Erreur réseau. Impossible de contacter le serveur.");
        }
        else if (error.type === "http") {
            afficherErreur("Erreur HTTP : " + error.status);
        }
        else if (error.type === "quota") {
            afficherErreur("Quota API dépassé. Réessayez plus tard.");
        }
        else if (error.type === "json") {
            afficherErreur("La réponse du serveur est illisible.");
        }
        else {
            afficherErreur("Une erreur inattendue est survenue.");
        }  
    }
    finally {
        messageChargement.classList.add("hidden");
        boutonsRequete.forEach(function(bouton) {
            bouton.disabled = false;
        });
    }
}
init();

actualiserButton.addEventListener("click", function() {
    init();
});

reessayerButton.addEventListener("click", function() {
    if (dernierRequete !== null) {
        dernierRequete();
    };
});

async function chargerHistorique() {
    historiqueMetal.disabled = true;
    historiquePeriode.disabled = true;
    try {
        const metal = historiqueMetal.value;
        const period = historiquePeriode.value;
        let symbol = "silver";
        if (metal === "gold") {
            symbol = "xau";
        }
    const historique = await getHistoricalPrices(symbol, period);
    afficherHistorique(historique.points);
    }
    catch (error) {
        dernierRequete = chargerHistorique;
        if (error.type === "offline") {
            afficherErreur("Vous êtes hors ligne. Vérifiez votre connexion internet.");
        }
        else if (error.type === "network") {
            afficherErreur("Erreur réseau. Impossible de contacter le serveur.");
        }
        else if (error.type === "http") {
            afficherErreur("Erreur HTTP : " + error.status);
        }
        else if (error.type === "quota") {
            afficherErreur("Quota API dépassé. Réessayez plus tard.");
        }
        else if (error.type === "json") {
            afficherErreur("La réponse du serveur est illisible.");
        }
        else {
            afficherErreur("Une erreur inattendue est survenue.");
        }
    }
    finally {
        historiqueMetal.disabled = false;
        historiquePeriode.disabled = false;
    }
}

historiqueMetal.addEventListener("change", chargerHistorique);
historiquePeriode.addEventListener("change", chargerHistorique);
chargerHistorique();

currencySelect.addEventListener("change", function() {
    sauvegarderDevise(currencySelect.value);
    init();
});

boutonCalculer.addEventListener("click", function() {
    const poids = Number(poidsInput.value);
    if (poidsInput.value.trim() === "" || !Number.isFinite(poids) || poids < 0) {
        afficherErreurPoids("Veuillez saisir un poids valide.");
        valeurEstimee.textContent = "-- " + currencySelect.value;
        return;
    }
    let prixParGramme = null;
    if (metalSelect.value === "or") {
        prixParGramme = prixOrActuel;
    }
    else if (metalSelect.value === "argent") {
        prixParGramme = prixArgentActuel;
    }
    if (prixParGramme === null) {
        afficherErreurPoids("Veuillez choisir un métal ou attendre le chargement des prix.");
        return;
    }
    erreurPoids.textContent = "";
    erreurPoids.classList.add("hidden");
    const valeur = calculerValeurEstimee(poids, prixParGramme);
    afficherValeurEstimee(valeur, currencySelect.value);
});