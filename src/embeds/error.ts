import { Colors, EmbedBuilder } from "discord.js";

/**
 * Create an error embed.
 *
 * @param message Text to be included in the error.
 * @returns A `EmbedBuilder` with the given message.
 */
export function create(message: string): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle("Error")
        .setColor(Colors.Red)
        .setDescription(message);
}
