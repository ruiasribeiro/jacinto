import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";

import * as chrono from "chrono-node";

export const data = new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Schedule an event.")
    .addStringOption((option) =>
        option
            .setName("date")
            .setDescription("Specify a date in natural language.")
            .setRequired(true)
    );

export async function execute(interaction: CommandInteraction) {
    const input = interaction.options.getString("date");
    const date = chrono.parseDate(input);

    const embed = new MessageEmbed()
        .setTitle("Schedule")
        .setColor("BLUE")
        .setDescription(`Parsed ${date.toLocaleString()}.`);

    await interaction.reply({ embeds: [embed] });
}
