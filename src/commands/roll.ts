import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Picks a random number in a range.")
    .addIntegerOption((option) =>
        option
            .setName("min")
            .setDescription("Mininum value on the range (inclusive)")
            .setRequired(true)
    )
    .addIntegerOption((option) =>
        option
            .setName("max")
            .setDescription("Maximum value on the range (inclusive)")
            .setRequired(true)
    );

export async function execute(interaction: CommandInteraction) {
    const min = interaction.options.getInteger("min");
    const max = interaction.options.getInteger("max");

    const value = Math.floor(Math.random() * (max - min + 1)) + min;

    await interaction.reply(`The answer is ${value}!`);
}
