import { Colors, EmbedBuilder } from "discord.js";

/**
 * Create an help embed.
 *
 * @returns A `EmbedBuilder` with the help information.
 */
export function create(): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle("📚 Help")
        .setColor(Colors.Blurple)
        .addFields([
            {
                name: "🥞 /food",
                value: "Shows the food menu @ UMinho",
            },
            {
                name: "🎱 /magic",
                value: "Shows a random magic 8-ball answer",
            },
            {
                name: "🎲 /roll (in servers)",
                value: "Picks a random number/user/users",
            },
        ]);
}
