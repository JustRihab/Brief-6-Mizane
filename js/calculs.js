const grammesParOnce = 31.1035;

export function convertirEnMadParGramme(Price, fxRate) {
    return (Price * fxRate) / grammesParOnce;
}

export function calculerVariation(points, fxRate) {
    if (points.length < 2) {
        return null;
    }
    const dernierPoint = points[points.length - 1];
    const precedentPoint = points[points.length - 2];
    const variationUSD = dernierPoint.c - precedentPoint.c;
    const variation = convertirEnMadParGramme(variationUSD, fxRate);
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