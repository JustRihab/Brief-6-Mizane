const API_URL = "https://xaus.com/api/v1/spot";
const HISTORICAL_API_URL = "https://xaus.com/api/v1/chart";

export async function getCurrentPrices(currency) {
    try {
        const response = await fetch(`${API_URL}?currency=${currency}&unit=gram`);
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

export async function getHistoricalPrices(symbol, period) {
    try {
        let range = "5d";
        if (period === "30") {
            range = "1mo";
        }
        const response = await fetch(`${HISTORICAL_API_URL}?symbol=${symbol}&range=${range}&interval=1d`);
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