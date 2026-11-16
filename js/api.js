const API_URL = "https://xaus.com/api/v1/spot";
const HISTORICAL_API_URL = "https://xaus.com/api/v1/chart";

function creerErreur(type, message, status = null) {
    const error = new Error(message);
    error.type = type;
    error.status = status;

    return error;
}

async function lireJSON(response) {
    try {
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw creerErreur("json", "Réponse JSON illisible");
    }
}

export async function getCurrentPrices(currency) {
    try {
        const response = await fetch(`${API_URL}?currency=${currency}&unit=gram`);
        if (!response.ok) {
            if (response.status === 429) {
                throw creerErreur("quota", "Quota dépassé", response.status);
            }
            throw creerErreur("http", "Erreur HTTP", response.status);
        }
        const data = await lireJSON(response);
        return data;
    }
    catch (error) {
        if (error.type !== undefined) {
            throw error;
        }
        if (!navigator.onLine) {
            throw creerErreur("offline", "Vous êtes hors ligne");
        }
        throw creerErreur("network", "Erreur réseau");
    }
}

export async function getHistoricalPrices(symbol, period) {
    try {
        let range = "5d";
        if (period === "30") {
            range = "1mo";
        }
        const response = await fetch(`${HISTORICAL_API_URL}?symbol=${symbol}&range=${range}&interval=1d`);
        if (!response.ok) {
            if (response.status === 429) {
                throw creerErreur("quota", "Quota dépassé", response.status);
            }
            throw creerErreur("http", "Erreur HTTP", response.status);
        }
        const data = await lireJSON(response);
        return data;
    }
    catch (error) {
        if (error.type !== undefined) {
            throw error;
        }
        if (!navigator.onLine) {
            throw creerErreur("offline", "Vous êtes hors ligne");
        }
        throw creerErreur("network", "Erreur réseau");
    }
}