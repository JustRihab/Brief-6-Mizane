import { getCurrentPrices, getHistoricalPrices } from "./api.js";
import { convertirEnDeviseParGramme, calculerVariation } from "./calculs.js";
import { afficherPrix, afficherErreur, afficherInfosMarche } from "./render.js";
import { sauvegarderDevise, chargerDevise } from "./storage.js";

const currencySelect = document.getElementById("currency");
const savedCurrency = chargerDevise();
if (savedCurrency) {
    currencySelect.value = savedCurrency;
}

async function init() {
    try {
        const currency = currencySelect.value;
        const data = await getCurrentPrices(currency);
        const historiqueOr = await getHistoricalPrices("xau");
        const historiqueArgent = await getHistoricalPrices("silver");
        const prixArgent = convertirEnDeviseParGramme (data.silver_usd_oz, data.fx_rate);
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

currencySelect.addEventListener("change", function() {
    sauvegarderDevise(currencySelect.value);
    init();
});

