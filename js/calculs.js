const grammesParOnce = 31.1035;

export function convertirEnDeviseParGramme(price, fxRate) {
    return (price * fxRate) / grammesParOnce;
}

export function calculerVariation(points, fxRate) {
    if (points.length < 2) {
        return null;
    }
    const dernierPoint = points[points.length - 1];
    const precedentPoint = points[points.length - 2];
    const variationUSD = dernierPoint.c - precedentPoint.c;
    const variation = convertirEnDeviseParGramme(variationUSD, fxRate);
    const pourcentage = (variationUSD / precedentPoint.c) * 100;
    let direction = "stable";
    if (variationUSD > 0) {
        direction = "hausse";
    }
    else if (variationUSD < 0) {
        direction = "baisse";
    }
    return { variation, pourcentage, direction};
}

export function calculerValeurEstimee(poids, prixParGramme) {
    return poids * prixParGramme;
}