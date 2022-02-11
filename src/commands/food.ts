import { SlashCommandBuilder } from "@discordjs/builders";
import * as cheerio from "cheerio";
import {
    CommandInteraction,
    MessageActionRow,
    MessageSelectMenu,
} from "discord.js";
import fetch from "node-fetch";

import * as error from "../embeds/error.js";

export const data = new SlashCommandBuilder()
    .setName("food")
    .setDescription("Replies with the food menu @ UMinho.");

export async function execute(interaction: CommandInteraction) {
    const extractLinks = ($: cheerio.CheerioAPI) => [
        ...new Set(
            $("#_ctl0_myDataList tbody tr")
                .map((_, tr) => {
                    const a = $(tr).find("td ul li a");
                    return { name: a.text(), link: a.attr("href") };
                })
                .toArray()
        ),
    ];

    await fetch(
        "http://www.sas.uminho.pt/Default.aspx?tabid=10&pageid=26&lang=pt-PT"
    )
        .then((response) => response.text())
        .then(async (data) => {
            const $ = cheerio.load(data);
            const links = extractLinks($);

            const menus = links.map(({ name, link }) => {
                return {
                    label: name,
                    // description: "This is a description",
                    value: `http://www.sas.uminho.pt/${link}\n`,
                };
            });

            const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Nothing selected")
                    .addOptions(menus)
            );

            await interaction.reply({ content: "Menus", components: [row] });
        })
        .catch(
            async (err) =>
                await interaction.reply({
                    embeds: [error.create(err)],
                    ephemeral: true,
                })
        );
}
