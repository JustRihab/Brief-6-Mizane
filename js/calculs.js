const grammesParOnce = 31.1035;

export function convertirArgent(silverPrice, fxRate) {
    return (silverPrice * fxRate) / grammesParOnce;
}