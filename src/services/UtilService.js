export const UtilService = {
    getRandomInt,
    getHiddenString,
};

function getHiddenString(str) {
    try {
        let strChars = str.split('');
        const hideLettersAmount = Math.floor(str.length / 3);
        const hiddenIndexes = [];

        for (let i = 0; i < hideLettersAmount; i++) {
            const rndIndex = getRandomInt(0, str.length);
            const isHiddenIndex = hiddenIndexes.some(idx => idx === rndIndex);

            if (isHiddenIndex || strChars[rndIndex] === ' ') {
                i--;
                continue;
            }

            strChars[rndIndex] = '_';
        }

        return strChars.join('');
    } catch (err) {
        console.error('Error from getHiddenString', err);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
