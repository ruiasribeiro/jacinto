import * as cheerio from "cheerio";
import {
    ActionRowBuilder,
    CommandInteraction,
    Interaction,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
} from "discord.js";
import fetch from "node-fetch";

import * as error from "../embeds/error.js";

/** Command name. */
const name = "food";

export const data = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Replies with the food menu @ UMinho.");

async function replyToCommand(interaction: CommandInteraction) {
    // Procedure to extract food menu links from the page.
    const extractLinks = ($: cheerio.CheerioAPI) => [
        ...new Set(
            $("#_ctl0_myDataList tbody tr")
                .map((_, tr) => {
                    const a: any = $(tr).find("td ul li a");
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
            // Decode text with the correct encoding.
            const decoder = new TextDecoder("iso-8859-1");
            const data = decoder.decode(buffer);

            // Extract links with Cheerio.
            const $ = cheerio.load(data);
            const links = extractLinks($);

            // Map links to the format expected by discord.js.
            const menus = links.map(({ name, date, link }) => {
                return {
                    label: name,
                    description: date,
                    value: `http://www.sas.uminho.pt/${link}`,
                };
            });

            // Create select menu.
            const row =
                new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(name)
                        .setPlaceholder("Nothing selected")
                        .addOptions(menus)
                );

            // Send message.
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

async function replyToSelectMenu(interaction: StringSelectMenuInteraction) {
    const link = interaction.values[0];
    await interaction.update({ content: encodeURI(link), components: [] });
}

export async function execute(interaction: Interaction) {
    if (interaction.isCommand()) {
        await replyToCommand(interaction);
    } else if (interaction.isStringSelectMenu()) {
        await replyToSelectMenu(interaction);
    }
}
