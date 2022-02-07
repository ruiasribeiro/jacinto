import { MessageEmbed } from "discord.js";

/**
 * Create an error embed.
 *
 * @param message Text to be included in the error.
 * @returns A `MessageEmbed` with the given message.
 */
export function create(message: string): MessageEmbed {
    return new MessageEmbed()
        .setTitle("Error")
        .setColor("RED")
        .setDescription(message);
}
