import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import * as help from "../embeds/help.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows the help message.");

export async function execute(interaction: CommandInteraction) {
    await interaction.reply({ embeds: [help.create()] });
}
