import { getCurrentPrices, getHistoricalPrices } from "./api.js";
import { convertirEnMadParGramme, calculerVariation } from "./calculs.js";
import { afficherPrix, afficherErreur, afficherInfosMarche } from "./render.js";

async function init() {
    try {
        const data = await getCurrentPrices();
        const historiqueOr = await getHistoricalPrices("xau");
        const historiqueArgent = await getHistoricalPrices("silver");
        const prixArgentMad = convertirEnMadParGramme (data.silver_usd_oz, data.fx_rate);
        const variationOr = calculerVariation(historiqueOr.points, data.fx_rate);
        const variationArgent = calculerVariation(historiqueArgent.points, data.fx_rate);
        const metaux = [
            {nom: "Or", prix: data.xau.price, variation: variationOr},
            {nom: "Argent", prix: prixArgentMad, variation: variationArgent}
        ];
        afficherPrix(metaux);
        afficherInfosMarche(data.data_state);
    }
    catch (error) {
        afficherErreur("Impossible de charger les prix. Vérifier votre connexion internet.");
    }
}
init();

