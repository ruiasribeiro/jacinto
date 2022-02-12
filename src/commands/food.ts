import { SlashCommandBuilder } from "@discordjs/builders";
import * as cheerio from "cheerio";
import {
    CommandInteraction,
    Interaction,
    MessageActionRow,
    MessageSelectMenu,
    SelectMenuInteraction,
} from "discord.js";
import fetch from "node-fetch";

import * as error from "../embeds/error.js";

const name = "food";

export const data = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Replies with the food menu @ UMinho.");

async function replyToCommand(interaction: CommandInteraction) {
    const extractLinks = ($: cheerio.CheerioAPI) => [
        ...new Set(
            $("#_ctl0_myDataList tbody tr")
                .map((_, tr) => {
                    const a = $(tr).find("td ul li a");
                    const [name, date] = a.text().split(" - ");
                    return { name, date, link: a.attr("href") };
                })
                .toArray()
        ),
    ];

    await fetch(
        "http://www.sas.uminho.pt/Default.aspx?tabid=10&pageid=26&lang=pt-PT"
    )
        .then((response) => {
            return response.arrayBuffer();
        })
        .then(async (buffer) => {
            const decoder = new TextDecoder("iso-8859-1");
            const data = decoder.decode(buffer);

            const $ = cheerio.load(data);
            const links = extractLinks($);

            const menus = links.map(({ name, date, link }) => {
                return {
                    label: name,
                    description: date,
                    value: `http://www.sas.uminho.pt/${link}`,
                };
            });

            const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(name)
                    .setPlaceholder("Nothing selected")
                    .addOptions(menus)
            );

            await interaction.reply({
                content: "Pick a menu:",
                components: [row],
            });
        })
        .catch(
            async (err) =>
                await interaction.reply({
                    embeds: [error.create(err)],
                    ephemeral: true,
                })
        );
}

export async function replyToSelectMenu(interaction: SelectMenuInteraction) {
    const link = interaction.values[0];
    await interaction.update({ content: encodeURI(link), components: [] });
}

export async function execute(interaction: Interaction) {
    if (interaction.isCommand()) {
        await replyToCommand(interaction);
    } else if (interaction.isSelectMenu()) {
        await replyToSelectMenu(interaction);
    }
}
