const API_URL = "https://xaus.com/api/v1/spot?currency=MAD&unit=gram";
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
