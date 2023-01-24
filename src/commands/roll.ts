import {
    ChatInputCommandInteraction,
    Collection,
    CommandInteraction,
    Interaction,
    SlashCommandBuilder,
} from "discord.js";

import * as error from "../embeds/error.js";
import { randomInRange, shuffle } from "../utils/random.js";

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

async function executeNumber(interaction: ChatInputCommandInteraction) {
    const min = interaction.options.getInteger("min");
    if (min === null) {
        throw new Error("Missing min attribute.");
    }

    const max = interaction.options.getInteger("max");
    if (max === null) {
        throw new Error("Missing max attribute.");
    }

    if (min <= max) {
        const value = randomInRange(min, max);
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
    if (!interaction.inGuild()) {
        await interaction.reply({
            embeds: [
                error.create(
                    "Rolling of user(s) is not available outside of servers."
                ),
            ],
            ephemeral: true,
        });
        return;
    }

    await interaction.guild?.members.fetch();

    const channel = interaction.guild?.channels.cache.get(
        interaction.channelId
    );

    const members = channel?.members;

    if (members instanceof Collection) {
        const users = members.filter((member) => !member.user.bot);
        const array = Array.from(users);

        let content: string;
        if (array.length === 0) {
            content = "No users available for roll.";
        } else if (subcommand === "user") {
            const index = randomInRange(0, array.length - 1);
            content = `The winner is ${array[index][1]}!`;
        } else {
            shuffle(array);
            content = "Ranking: \n";
            for (let i = 1; i <= array.length; i++) {
                content += `\`${i}.\` ${array[i - 1][1]}\n`;
            }
        }

        await interaction.reply({
            content: content,
            allowedMentions: { users: [] },
        });
    } else {
        await interaction.reply({
            embeds: [
                error.create("Internal Error: Unexpected type for members."),
            ],
            ephemeral: true,
        });
    }
}

export async function execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
        throw new Error("Interaction provided isn't a command.");
    }

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
