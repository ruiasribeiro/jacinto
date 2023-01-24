import { Client, Collection, Events, GatewayIntentBits, Interaction } from "discord.js";

import { token } from "./env-vars.js";

import * as food from "./commands/food.js";
import * as help from "./commands/help.js";
import * as magic from "./commands/magic.js";
import * as roll from "./commands/roll.js";
import * as error from "./embeds/error.js";

// Instantiate a new client with the given intents.
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Set commands to be used on the bot.
// Should be all those that are specified on the register-commands file.
const commands = new Collection<
    string,
    (interaction: Interaction) => Promise<void>
>();
commands.set(food.data.name, food.execute);
commands.set(help.data.name, help.execute);
commands.set(magic.data.name, magic.execute);
commands.set(roll.data.name, roll.execute);

// Defines what should be executed when the bot starts.
client.once(Events.ClientReady, (client) => {
    console.log(`Ready! Logged in as ${client.user.username}.`);
});

// Defines what happens when an interaction is created.
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isCommand() || interaction.isStringSelectMenu()) {
        const name = interaction.isCommand()
            ? interaction.commandName
            : interaction.customId;

        const execute = commands.get(name)!;

        try {
            await execute(interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({
                embeds: [error.create(`Internal Error: ${err}`)],
                ephemeral: true,
            });
        }
    }
});

// Login with the token specified in the environmental variables.
client.login(token);
