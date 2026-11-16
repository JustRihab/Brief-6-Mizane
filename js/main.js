import { getCurrentPrices, getHistoricalPrices } from "./api.js";
import { convertirEnDeviseParGramme, calculerVariation, calculerValeurEstimee } from "./calculs.js";
import { afficherPrix, afficherErreur, afficherInfosMarche, afficherHistorique, afficherValeurEstimee, afficherErreurPoids } from "./render.js";
import { sauvegarderDevise, chargerDevise } from "./storage.js";

const currencySelect = document.getElementById("currency");
const historiqueMetal = document.getElementById("historique-metal");
const historiquePeriode = document.getElementById("historique-periode");
const metalSelect = document.getElementById("metal");
const poidsInput = document.getElementById("poids");
const boutonCalculer = document.getElementById("calculer-valeur");
const valeurEstimee = document.getElementById("valeur-estimee");
const erreurPoids = document.getElementById("erreur-poids");
let prixOrActuel = null;
let prixArgentActuel = null;
const savedCurrency = chargerDevise();
if (savedCurrency) {
    currencySelect.value = savedCurrency;
}

async function init() {
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
    }
    catch (error) {
        afficherErreur("Impossible de charger les prix. Vérifier votre connexion internet.");
    }
}
init();

async function chargerHistorique() {
    const metal = historiqueMetal.value;
    const period = historiquePeriode.value;
    let symbol = "silver";
    if (metal === "gold") {
        symbol = "xau";
    }
    const historique = await getHistoricalPrices(symbol, period);
    afficherHistorique(historique.points);
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