/**
 * Calculates a pseudorandom number in a given range (inclusive on both ends).
 *
 * @param min Minimum value.
 * @param max Maximum value.
 * @returns Pseudorandom number in the given range.
 */
export function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffles an array in-place, using the Durstenfeld shuffle algorithm.
 *
 * Taken from: https://stackoverflow.com/a/12646864
 *
 * @param array Array to be shuffled.
 */
export function shuffle<T>(array: Array<T>): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
