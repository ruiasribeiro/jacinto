import { Client, Collection, CommandInteraction, Intents } from "discord.js";

import { token } from "./env-vars.js";

import * as magic from "./commands/magic.js";
import * as ping from "./commands/ping.js";
import * as roll from "./commands/roll.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = new Collection<
    string,
    (interaction: CommandInteraction) => Promise<void>
>();

commands.set(magic.data.name, magic.execute);
commands.set(ping.data.name, ping.execute);
commands.set(roll.data.name, roll.execute);

client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const execute = commands.get(interaction.commandName);

    if (!execute) return;

    try {
        await execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

client.login(token);
