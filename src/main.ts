import { Client, Collection, CommandInteraction, Intents } from "discord.js";

import { token } from "./env-vars.js";

import * as magic from "./commands/magic.js";
import * as ping from "./commands/ping.js";
import * as roll from "./commands/roll.js";

// Instantiate a new client with the given intents.
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});

// Set commands to be used on the bot.
// Should be all those that are specified on the register-commands file.
const commands = new Collection<
    string,
    (interaction: CommandInteraction) => Promise<void>
>();
commands.set(magic.data.name, magic.execute);
commands.set(ping.data.name, ping.execute);
commands.set(roll.data.name, roll.execute);

// Defines what should be executed when the bot starts.
client.once("ready", (client) => {
    console.log(`Ready! Logged in as ${client.user.username}.`);
});

// Defines what happens when an interaction (a slash command execution, in this
// case) is created.
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

// Login with the token specified in the environmental variables.
client.login(token);
