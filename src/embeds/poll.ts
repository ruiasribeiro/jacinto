import { EmbedFieldData, MessageEmbed } from "discord.js";

/**
 * Create a poll embed.
 *
 * @returns A `MessageEmbed` with the poll information.
 */
export function create(
    title: string,
    questions: EmbedFieldData[]
): MessageEmbed {
    return new MessageEmbed()
        .setTitle(title)
        .setColor("BLUE")
        .addFields(questions);
}
