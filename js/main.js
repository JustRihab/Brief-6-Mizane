import { getCurrentPrices } from "./api.js";
import { convertirArgent } from "./calculs.js";
import { afficherPrix, afficherErreur } from "./render.js";

async function init() {
    try {
        const data = await getCurrentPrices();
        const prixArgentMad = convertirArgent (data.silver_usd_oz, data.fx_rate);
        afficherPrix(data, prixArgentMad);
    }
    catch (error) {
        afficherErreur("Impossible de charger les prix. Vérifier votre connexion internet.");
    }
}
init();

