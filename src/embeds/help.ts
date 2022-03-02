import { MessageEmbed } from "discord.js";

/**
 * Create an help embed.
 *
 * @returns A `MessageEmbed` with the help information.
 */
export function create(): MessageEmbed {
    return new MessageEmbed()
        .setTitle("📚 Help")
        .setColor("BLURPLE")
        .addField("🥞 /food", "Shows the food menu @ UMinho", true)
        .addField("🎱 /magic", "Shows a random magic 8-ball answer", true)
        .addField(
            "📊 /poll (in servers)",
            "Creates a poll with the given options",
            true
        )
        .addField(
            "🎲 /roll (in servers)",
            "Picks a random number/user/users",
            true
        );
}
