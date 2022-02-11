import { MessageEmbed } from "discord.js";

/**
 * Create an help embed.
 *
 * @returns A `MessageEmbed` with the help information.
 */
export function create(): MessageEmbed {
    return new MessageEmbed()
        .setTitle("Help")
        .setColor("BLUE")
        .addField("/help", "Shows this message")
        .addField("/magic", "Shows a random magic 8-ball answer")
        .addField("/roll", "Picks a random number/user/users");
}
