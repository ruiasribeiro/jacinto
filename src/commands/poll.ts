import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedFieldData, Interaction, Message } from "discord.js";

import * as error from "../embeds/error.js";
import * as poll from "../embeds/poll.js";

const NUMBER_TO_EMOJI_MAPPING = new Map([
    [1, "1️⃣"],
    [2, "2️⃣"],
    [3, "3️⃣"],
    [4, "4️⃣"],
    [5, "5️⃣"],
    [6, "6️⃣"],
    [7, "7️⃣"],
    [8, "8️⃣"],
    [9, "9️⃣"],
]);

export const data = new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Makes a poll with the given options.")
    .addStringOption((option) =>
        option
            .setName("title")
            .setDescription("Title of the poll.")
            .setRequired(true)
    )
    .addStringOption((op) =>
        op.setName("option1").setDescription("An option.").setRequired(true)
    )
    .addStringOption((op) =>
        op.setName("option2").setDescription("An option.").setRequired(true)
    )
    .addStringOption((op) =>
        op.setName("option3").setDescription("An option.").setRequired(false)
    )
    .addStringOption((op) =>
        op.setName("option4").setDescription("An option.").setRequired(false)
    )
    .addStringOption((op) =>
        op.setName("option5").setDescription("An option.").setRequired(false)
    )
    .addStringOption((op) =>
        op.setName("option6").setDescription("An option.").setRequired(false)
    )
    .addStringOption((op) =>
        op.setName("option7").setDescription("An option.").setRequired(false)
    )
    .addStringOption((op) =>
        op.setName("option8").setDescription("An option.").setRequired(false)
    )
    .addStringOption((op) =>
        op.setName("option9").setDescription("An option.").setRequired(false)
    );

export async function execute(interaction: Interaction) {
    if (!interaction.isCommand()) {
        throw new Error("Interaction provided isn't a command.");
    }

    if (!interaction.inGuild()) {
        await interaction.reply({
            embeds: [
                error.create("Polls are not available outside of servers."),
            ],
            ephemeral: true,
        });
        return;
    }

    const options: EmbedFieldData[] = [];
    const emoji: string[] = [];

    const title = interaction.options.getString("title");
    if (title === null) {
        throw new Error("Title wasn't provided.");
    }

    for (let i = 1; i <= 9; i++) {
        const option = interaction.options.getString(`option${i}`);

        if (option !== null) {
            options.push({ name: `${i}.`, value: option, inline: true });

            const emote = NUMBER_TO_EMOJI_MAPPING.get(i);
            if (emote !== undefined) {
                emoji.push(emote);
            }
        }
    }

    const message = await interaction.reply({
        embeds: [poll.create(`📊 ${title}`, options)],
        fetchReply: true,
    });
    if (message instanceof Message) {
        emoji.forEach((emote) => message.react(emote));
    }




}
