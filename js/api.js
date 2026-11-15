const API_URL = "https://xaus.com/api/v1/spot?currency=MAD&unit=gram";
const HISTORICAL_API_URL = "https://xaus.com/api/v1/chart";

export async function getCurrentPrices() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Erreur serveur");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Une erreur est survenue :", error);
        throw error;
    }
}

export async function getHistoricalPrices(symbol) {
    try {
        const response = await fetch(`${HISTORICAL_API_URL}?symbol=${symbol}&range=5d&interval=1d`);
        if (!response.ok) {
            throw new Error("Erreur serveur");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Erreur :", error);
        throw error;
    }
}