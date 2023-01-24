import { REST, Routes } from "discord.js";

import { token, clientId, guildId } from "./env-vars.js";

import * as food from "./commands/food.js";
import * as help from "./commands/help.js";
import * as magic from "./commands/magic.js";
import * as roll from "./commands/roll.js";

// Check if bot token exists in the environmental variables.
if (!token) {
    console.error("Token not found.");
    process.exit(1);
}

// Check if client ID exists in the environmental variables.
if (!clientId) {
    console.error("Client ID not found.");
    process.exit(1);
}

// List of commands to be registered.
const commands = [
    food.data.toJSON(),
    help.data.toJSON(),
    magic.data.toJSON(),
    roll.data.toJSON(),
];

const rest = new REST({ version: "10" }).setToken(token);

// Check if guild ID exists in the environmental variables.
if (!guildId) {
    console.error("Guild ID not found.");
    process.exit(1);
}

// Register commands for a single guild (useful for development, since it has a
// faster update rate).
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() =>
        console.log("Successfully registered application guild commands.")
    )
    .catch(console.error);

// Register global commands.
rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
