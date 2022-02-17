import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction, MessageEmbed } from "discord.js";
import * as chrono from "chrono-node";

import * as error from "../embeds/error.js";

export const data = new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Schedule an event.")
    .addStringOption((option) =>
        option
            .setName("date")
            .setDescription("Specify a date in natural language.")
            .setRequired(true)
    );

export async function execute(interaction: Interaction) {
    if (!interaction.isCommand()) {
        throw new Error("Interaction provided isn't a command.");
    }

    const input = interaction.options.getString("date");
    if (input === null) {
        throw new Error("Missing input attribute.");
    }

    const date = chrono.parseDate(input);

    if (date !== null) {
        const embed = new MessageEmbed()
            .setTitle("Schedule")
            .setColor("BLUE")
            .setDescription(`Parsed ${date.toLocaleString()}.`);

        await interaction.reply({ embeds: [embed] });
    } else {
        await interaction.reply({
            embeds: [error.create("Invalid date.")],
            ephemeral: true,
        });
    }
}
