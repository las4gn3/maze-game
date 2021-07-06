function getRandomInt() {
    const result = Math.floor(Math.random() * Math.floor(100));
    return result;
}
function placeEntities(mapString, percent, type) {
    const map = mapString.split('');
    const newMap = [];
    map.forEach(t => {
        if (['#', '\n', 'o', ' ', 'Z', 'W'].some(e => t === e)) newMap.push(t);
        else {
            getRandomInt() <= percent ? newMap.push(type) : newMap.push('·');
        }
    });
    return newMap.join(' ');
}
export const seedEntities = (mapString, percent = 1) => {
    mapString = placeEntities(mapString, percent, 'W');
    mapString = placeEntities(mapString, percent, 'Z');
    mapString = placeEntities(mapString, percent, 'o');
    return mapString;
};

