import { SlashCommandBuilder } from "@discordjs/builders";
import { Collection, CommandInteraction } from "discord.js";

import * as error from "../embeds/error.js";
import { shuffleArray } from "../utils/shuffle.js";

export const data = new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Picks a random something.")
    .addSubcommand((subc) =>
        subc
            .setName("number")
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
            )
    )
    .addSubcommand((subc) =>
        subc
            .setName("user")
            .setDescription("Picks a random user in the current channel.")
    )
    .addSubcommand((subc) =>
        subc
            .setName("users")
            .setDescription("Picks a random user order in the current channel.")
    );

async function executeNumber(interaction: CommandInteraction) {
    const min = interaction.options.getInteger("min");
    const max = interaction.options.getInteger("max");

    if (min <= max) {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        await interaction.reply(`The answer is ${value}!`);
    } else {
        await interaction.reply({
            embeds: [error.create("`min` must be smaller or equal to `max`")],
            ephemeral: true,
        });
    }
}

async function executeUser(
    interaction: CommandInteraction,
    subcommand: string
) {
    await interaction.guild.members.fetch();

    const members = interaction.guild.channels.cache.get(
        interaction.channelId
    ).members;

    if (members instanceof Collection) {
        const users = members.filter((member) => !member.user.bot);
        const array = Array.from(users);

        if (subcommand === "user") {
            await interaction.reply(
                `The winner is ${
                    array[Math.floor(Math.random() * array.length)][1]
                }!`
            );
        } else {
            shuffleArray(array);

            let response = "The results are: \n";
            for (let i = 1; i <= array.length; i++) {
                response += `${i}. ${array[i - 1][1]}\n`;
            }

            await interaction.reply(response);
        }
    } else {
        await interaction.reply({
            embeds: [
                error.create("Internal Error: Unexpected type for members."),
            ],
            ephemeral: true,
        });
    }
}

export async function execute(interaction: CommandInteraction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case "number":
            executeNumber(interaction);
            break;
        case "user":
        case "users":
            executeUser(interaction, subcommand);
            break;
        default:
            await interaction.reply({
                embeds: [error.create("Not implemented.")],
                ephemeral: true,
            });
            break;
    }
}
