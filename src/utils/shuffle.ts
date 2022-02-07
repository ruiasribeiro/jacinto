/**
 * Shuffles an array in-place, using the Durstenfeld shuffle algorithm.
 *
 * Taken from: https://stackoverflow.com/a/12646864
 *
 * @param array Array to be shuffled.
 */
export function shuffleArray<T>(array: Array<T>): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
