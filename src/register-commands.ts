import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { token, clientId, guildId } from "./env-vars.js";

import * as food from "./commands/food.js";
import * as help from "./commands/help.js";
import * as magic from "./commands/magic.js";
import * as ping from "./commands/ping.js";
import * as roll from "./commands/roll.js";
import * as schedule from "./commands/schedule.js";

// List of commands to be registered.
const commands = [
    food.data.toJSON(),
    help.data.toJSON(),
    magic.data.toJSON(),
    ping.data.toJSON(),
    roll.data.toJSON(),
    schedule.data.toJSON(),
];

const rest = new REST({ version: "9" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
