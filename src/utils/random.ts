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
