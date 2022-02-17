import { SlashCommandBuilder } from "@discordjs/builders";
import { Interaction } from "discord.js";

import * as help from "../embeds/help.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows the help message.");

export async function execute(interaction: Interaction) {
    if (!interaction.isCommand()) {
        throw new Error("Interaction provided isn't a command.");
    }

    await interaction.reply({ embeds: [help.create()] });
}
